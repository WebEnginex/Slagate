import { openDB, DBSchema, IDBPDatabase } from 'idb';

// 📋 Interface pour le schéma de la base de données
interface ImageCacheDB extends DBSchema {
  images: {
    key: string; // URL de l'image
    value: {
      url: string;
      blob: Blob;
      cachedAt: number;
      expiresAt: number;
    };
  };
}

// ⚙️ Configuration
const DB_NAME = 'slagate-image-cache';
const DB_VERSION = 1;
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 semaine en millisecondes
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_BASE = 100; // milliseconds

let dbPromise: Promise<IDBPDatabase<ImageCacheDB>> | null = null;
let dbInstance: IDBPDatabase<ImageCacheDB> | null = null;

/**
 * 🔧 Initialise et retourne la base de données IDB avec gestion robuste des connexions
 */
async function getDB(): Promise<IDBPDatabase<ImageCacheDB>> {
  if (dbInstance && !dbInstance.close) {
    return dbInstance;
  }

  if (!dbPromise) {
    dbPromise = openDB<ImageCacheDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Création du store pour les images
        if (!db.objectStoreNames.contains('images')) {
          db.createObjectStore('images', { keyPath: 'url' });
        }
      },
      blocked() {
        console.warn('📦 IndexedDB: Base de données bloquée - fermeture des anciennes connexions...');
      },
      blocking() {
        console.warn('📦 IndexedDB: Cette connexion bloque une mise à jour...');
      },
      terminated() {
        console.warn('📦 IndexedDB: Connexion terminée de manière inattendue');
        dbInstance = null;
        dbPromise = null;
      },
    });
  }

  try {
    dbInstance = await dbPromise;
    return dbInstance;
  } catch (error) {
    // Réinitialiser les promesses en cas d'erreur
    dbPromise = null;
    dbInstance = null;
    throw error;
  }
}

/**
 * 🔄 Fonction utilitaire pour retry avec backoff exponentiel
 * @param fn - Fonction à exécuter
 * @param maxAttempts - Nombre maximum de tentatives
 * @returns Résultat de la fonction ou lance la dernière erreur
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxAttempts: number = MAX_RETRY_ATTEMPTS
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      // Si c'est une erreur de connexion fermée, réinitialiser
      if (error.name === 'InvalidStateError' || error.name === 'InvalidAccessError') {
        dbInstance = null;
        dbPromise = null;
      }
      
      // Si c'est la dernière tentative, lancer l'erreur
      if (attempt === maxAttempts) {
        throw lastError;
      }
      
      // Attendre avec backoff exponentiel
      const delay = RETRY_DELAY_BASE * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      if (process.env.NODE_ENV === 'development') {
        console.warn(`📦 IndexedDB: Tentative ${attempt}/${maxAttempts} échouée, retry dans ${delay}ms...`);
      }
    }
  }
  
  throw lastError!;
}

/**
 * 📸 Récupère une image depuis le cache IDB avec transaction explicite
 * @param imageUrl - URL de l'image à récupérer
 * @returns Blob de l'image ou null si pas trouvée/expirée
 */
export async function getImageFromCache(imageUrl: string): Promise<Blob | null> {
  let db: IDBPDatabase<ImageCacheDB>;
  
  try {
    db = await getDB();
    
    // Utiliser une transaction explicite en lecture seule
    const tx = db.transaction('images', 'readonly');
    const store = tx.objectStore('images');
    const cached = await store.get(imageUrl);
    
    await tx.done;
    
    if (!cached) {
      return null;
    }
    
    // Vérification de l'expiration
    if (Date.now() > cached.expiresAt) {
      // Image expirée, on la supprime avec une nouvelle transaction
      try {
        const deleteTx = db.transaction('images', 'readwrite');
        const deleteStore = deleteTx.objectStore('images');
        await deleteStore.delete(imageUrl);
        await deleteTx.done;
      } catch (deleteError) {
        console.warn('Erreur lors de la suppression de l\'image expirée:', deleteError);
      }
      return null;
    }
    
    return cached.blob;
  } catch (error) {
    console.error('Erreur lors de la récupération depuis le cache:', error);
    return null;
  }
}

/**
 * 💾 Sauvegarde une image dans le cache IDB avec transaction explicite
 * @param imageUrl - URL de l'image
 * @param blob - Blob de l'image à sauvegarder
 */
export async function saveImageToCache(imageUrl: string, blob: Blob): Promise<void> {
  let db: IDBPDatabase<ImageCacheDB>;
  
  try {
    db = await getDB();
    
    // Utiliser une transaction explicite en écriture
    const tx = db.transaction('images', 'readwrite');
    const store = tx.objectStore('images');
    
    const now = Date.now();
    
    await store.put({
      url: imageUrl,
      blob,
      cachedAt: now,
      expiresAt: now + CACHE_DURATION,
    });
    
    await tx.done;
  } catch (error) {
    console.error(`[IndexedDB] Erreur lors de la sauvegarde de l'image: ${imageUrl}`, error);
    
    // En cas d'erreur de connexion fermée, essayer de réinitialiser
    if (error.name === 'InvalidStateError') {
      dbInstance = null;
      dbPromise = null;
      console.warn('📦 IndexedDB: Réinitialisation de la connexion suite à InvalidStateError');
    }
  }
}

/**
 * 🚀 Récupère une image (depuis le cache ou en ligne) et retourne une URL utilisable
 * @param imageUrl - URL de l'image à récupérer
 * @returns URL blob utilisable dans un <img>
 */
export async function fetchAndCacheImage(imageUrl: string): Promise<string> {
  try {
    // 1️⃣ Vérifier le cache d'abord avec retry
    const cachedBlob = await retryWithBackoff(() => getImageFromCache(imageUrl));
    if (cachedBlob) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`🗄️ IndexedDB: CACHE HIT pour ${imageUrl.split('/').pop()}`);
      }
      return URL.createObjectURL(cachedBlob);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`📡 IndexedDB: TÉLÉCHARGEMENT depuis réseau pour ${imageUrl.split('/').pop()}`);
    }

    // 2️⃣ Si pas en cache, fetch depuis le réseau
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();

    // 3️⃣ Sauvegarder en cache pour la prochaine fois avec retry
    try {
      await retryWithBackoff(() => saveImageToCache(imageUrl, blob));
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`💾 IndexedDB: Image sauvegardée en cache pour ${imageUrl.split('/').pop()}`);
      }
    } catch (saveError) {
      // L'erreur de sauvegarde ne doit pas empêcher d'afficher l'image
      console.warn(`Impossible de sauvegarder ${imageUrl} en cache:`, saveError);
    }

    // 4️⃣ Retourner l'URL blob
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error(`[IndexedDB] Erreur lors du fetch de l'image: ${imageUrl}`, error);
    // En cas d'erreur, retourner l'URL originale comme fallback
    return imageUrl;
  }
}

/**
 * 🧹 Nettoie les images expirées du cache avec transaction robuste
 */
export async function cleanExpiredImages(): Promise<void> {
  try {
    const db = await getDB();
    const tx = db.transaction('images', 'readwrite');
    const store = tx.objectStore('images');
    
    const now = Date.now();
    let cursor = await store.openCursor();
    
    while (cursor) {
      if (cursor.value.expiresAt < now) {
        await cursor.delete();
      }
      cursor = await cursor.continue();
    }
    
    await tx.done;
  } catch (error) {
    console.error('Erreur lors du nettoyage du cache:', error);
  }
}

/**
 * 📊 Obtient des statistiques sur le cache avec transaction sécurisée
 */
export async function getCacheStats(): Promise<{
  totalImages: number;
  cacheSize: number;
}> {
  try {
    const db = await getDB();
    const tx = db.transaction('images', 'readonly');
    const store = tx.objectStore('images');
    const allImages = await store.getAll();
    
    await tx.done;
    
    const totalImages = allImages.length;
    const cacheSize = allImages.reduce((total, item) => total + item.blob.size, 0);
    
    return { totalImages, cacheSize };
  } catch (error) {
    console.error('Erreur lors de la récupération des stats:', error);
    return { totalImages: 0, cacheSize: 0 };
  }
}

/**
 * 🩺 Diagnostic du cache IndexedDB
 * @returns État détaillé du cache
 */
export async function diagnoseCache(): Promise<{
  isHealthy: boolean;
  dbName: string;
  dbVersion: number;
  connectionStatus: string;
  stats: { totalImages: number; cacheSize: number };
  errors: string[];
}> {
  const errors: string[] = [];
  let isHealthy = true;
  let stats = { totalImages: 0, cacheSize: 0 };
  let connectionStatus = 'unknown';

  try {
    // Tester la connexion
    const db = await getDB();
    connectionStatus = 'connected';

    // Obtenir les statistiques
    stats = await getCacheStats();

    // Tester une opération simple
    await retryWithBackoff(async () => {
      const tx = db.transaction('images', 'readonly');
      await tx.done;
    });

  } catch (error) {
    isHealthy = false;
    connectionStatus = 'error';
    errors.push(`Erreur de connexion: ${error.message}`);
  }

  return {
    isHealthy,
    dbName: DB_NAME,
    dbVersion: DB_VERSION,
    connectionStatus,
    stats,
    errors,
  };
}

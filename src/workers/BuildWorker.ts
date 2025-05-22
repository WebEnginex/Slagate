// BuildWorker.ts - Web Worker pour la gestion des images avec IndexedDB

// Variables pour contrôler les logs
let isDevelopment = false;
let logLevel: 'none' | 'minimal' | 'verbose' = 'minimal'; // Par défaut: logs minimaux

// Variable pour stocker le contexte de page actuel
let currentPageContext: string | null = null;
let currentPageImages: string[] = [];

// Structure pour grouper les logs par page et par opération
interface LogStats {
  hits: number;
  misses: number;
  errors: number;
  totalSize: number; // en Ko
  lastReset: number; // timestamp du dernier reset
}

const pageStats: Record<string, LogStats> = {};

// Initialiser les stats pour une page
function initPageStats(pageId: string, reset: boolean = false) {
  if (!pageId) return;
  
  if (!pageStats[pageId] || reset) {
    pageStats[pageId] = {
      hits: 0,
      misses: 0,
      errors: 0,
      totalSize: 0,
      lastReset: Date.now()
    };
  }
}

// Fonction de log conditionnelle simplifiée
const devLog = (message: string, ...args: any[]) => {
  if (isDevelopment && logLevel === 'verbose') {
    console.log(message, ...args);
  }
};

// Fonction de log filtrée par page - version optimisée
const pageLog = (url: string, message: string, ...args: any[]) => {
  // Ne rien faire si logs complètement désactivés
  if (logLevel === 'none' || !isDevelopment) return;
  
  // En mode minimal, ne pas logger les opérations individuelles
  if (logLevel === 'minimal') return;
  
  // En mode verbose, vérifier si l'URL est pertinente pour la page courante
  const filename = url.split('/').pop() || url;
  const isRelevantForCurrentPage = currentPageImages.length === 0 || 
    currentPageImages.some(img => img.includes(filename)) || 
    (currentPageContext && url.includes(currentPageContext));
    
  if (isRelevantForCurrentPage) {
    const prefix = currentPageContext ? `[${currentPageContext}] ` : '';
    console.log(prefix + message, ...args);
  }
};

// Fonction d'erreur conditionnelle - toujours afficher les erreurs importantes
const devError = (message: string, ...args: any[]) => {
  // Les erreurs critiques sont toujours affichées
  console.error(message, ...args);
  
  // Incrémenter le compteur d'erreurs si nous avons un contexte de page
  if (currentPageContext) {
    initPageStats(currentPageContext);
    pageStats[currentPageContext].errors++;
  }
};

// Nom de la base IndexedDB
const DB_NAME = "slagate_image_cache_v1";  // Nouveau nom pour éviter tout conflit
const STORE_NAME = "images";
// Suppression de la constante CACHE_EXPIRATION - les images persisteront indéfiniment
// Liste des noms de fichier qui doivent être invalidés (seront rechargés même s'ils sont dans le cache)
const INVALID_IMAGES: Record<string, boolean> = {};
const DB_VERSION = 1;

// Variables globales de statistiques (pour compatibilité et total)
let cacheHits = 0;
let cacheMisses = 0;
let cacheErrors = 0;
let cacheTotalSize = 0;
let cacheLastReset = Date.now();

// Variables pour regrouper les statistiques
let lastLogTime = 0;
const LOG_INTERVAL = 10000; // 10 secondes entre les logs de statistiques

// Fonction pour calculer le taux de hits
function calculateHitRate(hits: number, misses: number): number {
  const total = hits + misses;
  return total > 0 ? Math.round((hits / total) * 100) : 0;
}

// Fonction pour calculer le temps écoulé depuis le dernier reset
function getElapsedTimeSeconds(lastResetTime: number): number {
  return Math.round((Date.now() - lastResetTime) / 1000);
}

// Fonction pour journaliser les statistiques de cache de manière groupée et simplifiée
function logCacheStats() {
  // Ne rien faire si les logs sont désactivés
  if (logLevel === 'none' || !isDevelopment) return;
  
  const now = Date.now();
  
  // N'afficher que selon l'intervalle défini pour éviter de surcharger la console
  if (now - lastLogTime > LOG_INTERVAL) {
    lastLogTime = now;
    
    // Si nous avons un contexte de page, mettre à jour ses stats
    if (currentPageContext) {
      initPageStats(currentPageContext);
      
      // Afficher les statistiques pour la page actuelle
      const stats = pageStats[currentPageContext];
      const total = stats.hits + stats.misses;
      const hitRate = calculateHitRate(stats.hits, stats.misses);
      const elapsedTime = getElapsedTimeSeconds(stats.lastReset);
      
      // Afficher un log concis même en mode minimal
      if (logLevel === 'minimal') {
        console.log(`📊 [${currentPageContext}] Cache: ${hitRate}% hits (${stats.hits}/${total}) - ${Math.round(stats.totalSize/1024)}MB - ${elapsedTime}s`);
      } else {
        // Message plus détaillé en mode verbose
        console.log(`📊 [${currentPageContext}] Cache stats:
          - Hits: ${stats.hits} images depuis IndexedDB
          - Misses: ${stats.misses} chargées depuis le réseau
          - Hit rate: ${hitRate}%
          - Taille totale: ${Math.round(stats.totalSize/1024)}MB
          - Durée: ${elapsedTime} secondes`);
      }
      
      // Réinitialiser les compteurs d'erreurs après affichage
      if (stats.errors > 0) {
        console.warn(`⚠️ [${currentPageContext}] ${stats.errors} erreurs de chargement d'images`);
      }
    } else {
      // Statistiques globales si pas de contexte de page
      const total = cacheHits + cacheMisses;
      const hitRate = calculateHitRate(cacheHits, cacheMisses);
      const elapsedTime = getElapsedTimeSeconds(cacheLastReset);
      
      if (logLevel === 'minimal' && total > 0) {
        console.log(`📊 Cache global: ${hitRate}% hits (${cacheHits}/${total}) - ${Math.round(cacheTotalSize/1024)}MB - ${elapsedTime}s`);
      } else if (logLevel === 'verbose' && total > 0) {
        console.log(`📊 Cache global:
          - Hits: ${cacheHits} images depuis IndexedDB
          - Misses: ${cacheMisses} chargées depuis le réseau
          - Hit rate: ${hitRate}%
          - Taille totale: ${Math.round(cacheTotalSize/1024)}MB
          - Durée: ${elapsedTime} secondes`);
      }
        // Afficher les erreurs globales
      if (cacheErrors > 0 && (logLevel === 'minimal' || logLevel === 'verbose')) {
        console.warn(`⚠️ Global: ${cacheErrors} erreurs de chargement d'images`);
      }
    }
  }
}

// Utiliser des clés simplifiées (seulement le nom du fichier)
function getSimpleKey(url: string): string {
  try {
    // Extraire uniquement le nom du fichier de l'URL
    const filename = url.split('/').pop() || url;
    // Suppression du log détaillé pour la génération de clé
    return filename;
  } catch (e) {
    return url;
  }
}

// Au début du fichier, ajoutez ces variables pour optimiser les connexions
let dbConnection: IDBDatabase | null = null;
let dbConnectionPromise: Promise<IDBDatabase> | null = null;

// Variable pour suivre si la vérification a été effectuée
let hasCheckedCacheOnStartup = false;

self.addEventListener("message", async (event) => {
  const { type, url, isDev, pageContext, pageImages, logConfig } = event.data;
  
  // Si le message contient l'information sur l'environnement, la stocker
  if (isDev !== undefined) {
    isDevelopment = isDev;
  }
  
  // Si le message contient une configuration de logs, l'appliquer
  if (logConfig !== undefined && ['none', 'minimal', 'verbose'].includes(logConfig)) {
    logLevel = logConfig as 'none' | 'minimal' | 'verbose';
    devLog(`🔧 Worker: Niveau de log défini à '${logConfig}'`);
  }
  
  // Si le message contient le contexte de page, le stocker
  if (pageContext !== undefined) {
    currentPageContext = pageContext;
    // Initialiser les statistiques pour cette page
    initPageStats(pageContext);
  }
  
  // Si le message contient les images de la page, les stocker
  if (pageImages !== undefined) {
    currentPageImages = pageImages;
  }
  
  // Logs seulement en mode verbose
  if (logLevel === 'verbose') {
    if (type === "getImage" && currentPageContext) {
      pageLog(url, `📋 Requête d'image pour ${url.split('/').pop()}`);
    } else {
      devLog("🔧 Requête reçue: " + (type === "getImage" ? url.split('/').pop() : type));
    }
    
    // Si nous avons reçu un contexte de page, l'afficher
    if (pageContext && type === "getImage") {
      devLog(`📋 Page: ${pageContext} (${pageImages?.length || 0} images)`);
    }
  }

  // Ajouter cette ligne au début pour vérifier le contenu du cache au premier message
  if (type === "getImage" && !hasCheckedCacheOnStartup) {
    hasCheckedCacheOnStartup = true;
    await checkCacheStatus();
  }  // Ajouter un type de message pour réinitialiser le système de cache
  if (type === "resetCache") {
    try {
      devLog("🧹 Worker: Réinitialisation du cache...");
      
      // Fermer toute connexion existante
      if (dbConnection) {
        dbConnection.close();
        dbConnection = null;
      }
      
      dbConnectionPromise = null;
      
      // Supprimer la base de données existante avec gestion des erreurs améliorée
      await new Promise<void>((resolve, reject) => {
        const deleteRequest = indexedDB.deleteDatabase(DB_NAME);
        
        deleteRequest.onsuccess = () => {
          devLog("✅ Worker: Base de données supprimée avec succès");
          resolve();
        };
        
        deleteRequest.onerror = () => {
          devError("❌ Worker: Erreur lors de la suppression de la base");
          reject(new Error("Échec de la suppression de la base de données"));
        };
        
        deleteRequest.onblocked = () => {
          devLog("⚠️ Worker: Suppression bloquée - fermeture des connexions");
          // La suppression se poursuivra une fois que toutes les connexions seront fermées
          // Nous avons déjà fermé notre connexion, mais il pourrait y en avoir d'autres
        };
        
        // Timeout pour éviter de bloquer trop longtemps
        setTimeout(() => {
          reject(new Error("Timeout lors de la suppression de la base de données"));
        }, 5000);
      });
      
      // Recréer une nouvelle connexion
      devLog("🔄 Worker: Création d'une nouvelle connexion...");
      const db = await openDatabase();
      
      devLog("✅ Worker: Cache réinitialisé avec succès");
      self.postMessage({ type: "resetCache", success: true });
    } catch (error) {
      devError("❌ Worker: Erreur lors de la réinitialisation:", error);
      self.postMessage({ type: "resetCache", success: false, error: String(error) });
    }
    return;
  }
  if (type === "getImage") {
    try {
      // Vérifier si IndexedDB est disponible et accessible
      if (!indexedDB) {
        throw new Error("IndexedDB n'est pas disponible dans ce navigateur");
      }
      
      // Ouvrir la base de données en premier pour vérifier si elle est accessible
      try {
        const db = await openDatabase();
        devLog("🔐 Worker: Base de données accessible: " + db.name);
      } catch (dbError) {
        devError("❗ Worker: Impossible d'accéder à IndexedDB:", dbError);
        // Fallback au téléchargement sans mise en cache
        const fallbackBlob = await fetchImageWithoutCache(url);
        self.postMessage({ url, imageBlob: fallbackBlob, fromCache: false });
        return;
      }      // Essayer de récupérer l'image du cache
      const cachedImage = await getImageFromCache(url);
        if (cachedImage) {
        // Incrémenter les compteurs globaux et par page
        cacheHits++;
        cacheTotalSize += cachedImage.blob.size / 1024; // Ko
        
        if (currentPageContext) {
          initPageStats(currentPageContext);
          pageStats[currentPageContext].hits++;
          pageStats[currentPageContext].totalSize += cachedImage.blob.size / 1024; // Ko
        }
        
        // Afficher les statistiques regroupées à intervalles réguliers
        logCacheStats();
        self.postMessage({ url, imageBlob: cachedImage.blob, fromCache: true });
      } else {
        // Incrémenter les compteurs globaux et par page
        cacheMisses++;
        
        if (currentPageContext) {
          initPageStats(currentPageContext);
          pageStats[currentPageContext].misses++;
        }
        
        try {
          const downloadedBlob = await fetchAndCacheImage(url);
          if (downloadedBlob) {
            // Mettre à jour les statistiques de taille
            const blobSizeKb = downloadedBlob.size / 1024;
            cacheTotalSize += blobSizeKb;
            
            if (currentPageContext) {
              pageStats[currentPageContext].totalSize += blobSizeKb;
            }
            
            // Afficher les statistiques regroupées à intervalles réguliers
            logCacheStats();
            self.postMessage({ url, imageBlob: downloadedBlob, fromCache: false });
          } else {
            // Incrémenter le compteur d'erreurs
            if (currentPageContext) {
              pageStats[currentPageContext].errors++;
            }
            
            devError("❌ Échec du téléchargement de l'image");
            self.postMessage({ url, imageBlob: null, error: "Échec du téléchargement" });
          }
        } catch (error) {
          devError("❌ Worker: Erreur de traitement d'image:", error);
          self.postMessage({ url, imageBlob: null, error: String(error) });
        }
      }
    } catch (error) {
      devError("❌ Worker: Erreur globale:", error);
      self.postMessage({ url, imageBlob: null, error: String(error) });
    }  } else if (type === "checkAccess") {
    // Vérifier si la base de données est accessible
    try {
      const db = await openDatabase();
      self.postMessage({ type: "checkAccessResult", success: true });
    } catch (error) {
      self.postMessage({ type: "checkAccessResult", success: false, error: String(error) });
    }} else if (type === "invalidateImage") {
    // Commande pour invalider une image spécifique
    try {
      const { imageUrl } = event.data;
      const simpleKey = getSimpleKey(imageUrl);
      
      devLog("🔄 Worker: Marquage de l'image pour invalidation: " + simpleKey);
      
      // Marquer l'image comme invalide
      INVALID_IMAGES[simpleKey] = true;
      
      self.postMessage({ 
        type: "invalidateImage", 
        success: true, 
        imageUrl, 
        message: `Image ${simpleKey} marquée pour rechargement au prochain accès`
      });
    } catch (error) {
      self.postMessage({ 
        type: "invalidateImage", 
        success: false, 
        error: String(error)
      });
    }  } else if (type === "removeImage") {
    // Commande pour supprimer directement une image du cache
    try {
      const { imageUrl } = event.data;
      const simpleKey = getSimpleKey(imageUrl);
      
      devLog("🗑️ Worker: Suppression de l'image du cache: " + simpleKey);
      
      // Supprimer l'image du cache
      const success = await removeImageFromCache(simpleKey);
      
      self.postMessage({ 
        type: "removeImage", 
        success, 
        imageUrl, 
        message: success 
          ? `Image ${simpleKey} supprimée du cache avec succès` 
          : `Échec de la suppression de l'image ${simpleKey}`
      });
    } catch (error) {
      self.postMessage({ 
        type: "removeImage", 
        success: false, 
        error: String(error)
      });
    }
  }  else if (type === "updateImage") {
    // Commande pour forcer la mise à jour d'une image dans le cache
    try {
      const { imageUrl } = event.data;
      const simpleKey = getSimpleKey(imageUrl);
      
      devLog("🔄 Worker: Mise à jour de l'image dans le cache: " + simpleKey);
      
      // D'abord supprimer l'ancienne version du cache
      await removeImageFromCache(simpleKey);
      
      // Ensuite télécharger et stocker la nouvelle version
      const downloadedBlob = await fetchAndCacheImage(imageUrl);
      
      if (downloadedBlob) {
        self.postMessage({
          type: "updateImage",
          success: true,
          imageUrl,
          message: `Image ${simpleKey} mise à jour avec succès dans le cache`
        });
      } else {
        self.postMessage({
          type: "updateImage",
          success: false,
          imageUrl,
          message: `Échec du téléchargement de la nouvelle version de l'image ${simpleKey}`
        });
      }
    } catch (error) {
      self.postMessage({
        type: "updateImage",
        success: false,
        error: String(error)
      });
    }
  } else if (type === "debugCache") {
    // Commande pour déboguer le cache
    try {
      const stats = await collectCacheStats();
      self.postMessage({ type: "debugCache", stats });
      
      // Afficher aussi dans la console du worker si en mode développement
      if (isDevelopment) {
        await debugCache();
      }
    } catch (error) {
      self.postMessage({ type: "debugCache", error: String(error) });
    }  } else if (type === "setLogConfig") {
    // Commande pour configurer le niveau de journalisation
    try {
      const { logConfig } = event.data;
        if (logConfig && ['none', 'minimal', 'verbose'].includes(logConfig)) {
        logLevel = logConfig;
        
        if (logLevel === 'minimal' || logLevel === 'verbose') {
          console.log(`🔧 Worker: Niveau de log défini à '${logConfig}'`);
        }
        
        self.postMessage({
          type: "logConfigSet",
          success: true,
          level: logConfig
        });
      } else {
        throw new Error("Configuration de log invalide");
      }
    } catch (error) {
      self.postMessage({
        type: "logConfigSet",
        success: false,
        error: String(error)
      });
    }
  } else if (type === "resetStats") {
    // Réinitialisation des statistiques
    const { pageId } = event.data;
    
    if (pageId) {
      // Réinitialiser uniquement les stats de la page spécifiée
      initPageStats(pageId, true);
      devLog(`🔄 Statistiques réinitialisées pour la page: ${pageId}`);
      
      self.postMessage({
        type: "statsReset",
        success: true,
        pageId,
        message: `Statistiques réinitialisées pour ${pageId}`
      });
    } else {
      // Réinitialiser toutes les statistiques
      cacheHits = 0;
      cacheMisses = 0;
      cacheErrors = 0;
      cacheTotalSize = 0;
      cacheLastReset = Date.now();
      
      // Réinitialiser les stats de chaque page
      Object.keys(pageStats).forEach(id => {
        initPageStats(id, true);
      });
      
      devLog(`🔄 Toutes les statistiques ont été réinitialisées`);
      
      self.postMessage({
        type: "statsReset",
        success: true,
        global: true,
        message: "Toutes les statistiques ont été réinitialisées"
      });
    }
  }
});

interface CachedImage {
  blob: Blob;
  timestamp: number;
  url: string; // Conserver l'URL complète pour référence
}

// Version simplifiée pour les environnements qui posent problème avec IndexedDB
async function fetchImageWithoutCache(url: string): Promise<Blob | null> {
  try {
    devLog(`🔄 Tentative de téléchargement direct (sans cache): ${url}`);
    
    const response = await fetch(url, { 
      cache: 'no-store', // Important : ne pas utiliser le cache du navigateur
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Accept': 'image/webp,image/png,image/jpeg,image/gif,image/*',
        'Origin': self.location.origin,
      }
    });
    
    if (!response.ok) {
      devError(`❌ Erreur HTTP ${response.status} pour ${url}`);
      throw new Error(`Erreur HTTP ${response.status}`);
    }
    
    // Vérifier le type de contenu
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('image')) {
      devError(`❌ Type de contenu invalide: ${contentType} pour ${url}`);
      throw new Error(`Type de contenu invalide: ${contentType}`);
    }
    
    return await response.blob();
  } catch (error) {
    devError("❌ Worker: Erreur lors du téléchargement sans cache:", error);
    return null;
  }
}

// Optimisation de getImageFromCache avec des promesses plus efficaces
async function getImageFromCache(url: string): Promise<CachedImage | null> {  try {
    const simpleKey = getSimpleKey(url);
    pageLog(url, "🔍 Worker: Recherche dans le cache: " + simpleKey);
    
    const db = await openDatabase();
    
    // Utiliser une fonction auxiliaire avec un timeout intégré
    return await promiseWithTimeout(
      new Promise<CachedImage | null>((resolve, reject) => {
        try {
          const tx = db.transaction(STORE_NAME, "readonly");
          const store = tx.objectStore(STORE_NAME);
          
          // Vérifier si le store est vide rapidement (optionnel)
          const countRequest = store.count();
          countRequest.onsuccess = () => {
            if (countRequest.result === 0) {
              devLog("ℹ️ Worker: Cache vide");
              resolve(null);
              return;
            }
          };
          
          // Chercher l'image par sa clé
          const getRequest = store.get(simpleKey);
          
          getRequest.onsuccess = () => {
            const result = getRequest.result as CachedImage;
            
            if (!result) {
              resolve(null);
              return;
            }
            
            // Vérifier si l'image est dans la liste des images à invalider
            if (INVALID_IMAGES[simpleKey]) {
              devLog("🔄 Worker: Image invalidée: " + simpleKey);
              // Supprimer de la liste après l'avoir invalidée une fois
              delete INVALID_IMAGES[simpleKey];              resolve(null);
              return;
            }
            
            pageLog(url, "🎯 Worker: Image trouvée en cache");
            resolve(result);
          };
          
          getRequest.onerror = () => {
            devError("❌ Worker: Erreur de lecture:", getRequest.error);
            reject(getRequest.error);
          };
          
          // Gérer les erreurs de transaction
          tx.oncomplete = () => {
            // La transaction s'est terminée normalement
          };
          
          tx.onerror = () => {
            devError("❌ Worker: Erreur de transaction:", tx.error);
            reject(tx.error);
          };
        } catch (innerError) {
          devError("❌ Worker: Erreur d'accès au cache:", innerError);
          reject(innerError);
        }
      }),
      3000, // Timeout de 3 secondes
      "Récupération de l'image en cache"
    );
  } catch (error) {
    devError("❌ Worker: Erreur lors de la lecture du cache:", error);
    return null;
  }
}

async function fetchAndCacheImage(url: string): Promise<Blob | null> {
  try {
    const simpleKey = getSimpleKey(url);
    
    // Ajouter un log détaillé pour le débogage
    devLog(`🔄 Tentative de téléchargement: ${url}`);
    
    const response = await fetch(url, { 
      cache: 'no-store',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Accept': 'image/webp,image/png,image/jpeg,image/gif,image/*',
        'Origin': self.location.origin,
      }
    });    if (!response.ok) {
      devError(`❌ Erreur HTTP ${response.status} : ${response.statusText} pour ${url}`);
      throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`);
    }
    
    // Vérifier si le contenu est valide en examinant le type MIME
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('image')) {
      devError(`❌ Type de contenu invalide: ${contentType} pour ${url}`);
      throw new Error(`Type de contenu invalide: ${contentType}`);
    }
    
    const blob = await response.blob();
    const cachedImage: CachedImage = {
      blob: blob,
      timestamp: Date.now(),
      url: url // Conserver l'URL complète pour référence
    };

    try {
      // Attendre explicitement que toute la transaction soit terminée
      await storeImageInDB(simpleKey, cachedImage);
        // Vérifier dans une transaction séparée
      const isStored = await verifyImageInDB(simpleKey);
      if (isStored) {
        pageLog(url, "✅ Worker: Image correctement stockée");
      } else {
        pageLog(url, "⚠️ Worker: Image non trouvée après stockage");
      }
      
      pageLog(url, `📊 Worker: Image stockée (${Math.round(blob.size / 1024)} KB): ` + url.split("/").pop());
      
      // Forcer un test du cache uniquement en mode développement
      if (isDevelopment) {
        await debugCache();
      }
      
      return blob;
    } catch (dbError) {
      devError("❌ Worker: Erreur de stockage en cache:", dbError);
      return blob;
    }
  } catch (error) {
    devError("❌ Worker: Erreur lors du téléchargement:", error);
    return null;
  }
}

// Fonction optimisée pour ouvrir la connexion une seule fois
async function openDatabase(): Promise<IDBDatabase> {
  // Si nous avons déjà une connexion, la réutiliser
  if (dbConnection) {
    return dbConnection;
  }
  
  // Si nous avons une promesse en cours, la réutiliser
  if (dbConnectionPromise) {
    return dbConnectionPromise;
  }
  
  // Sinon, créer une nouvelle promesse de connexion
  dbConnectionPromise = new Promise((resolve, reject) => {
    try {
      devLog("🔌 Worker: Connexion à IndexedDB...");
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onupgradeneeded = (event) => {
        devLog("🔄 Worker: Création/mise à jour de la base IndexedDB");
        const db = request.result;
        
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
          devLog("✅ Worker: Object Store créé");
        } else {
          devLog("✅ Worker: Object Store existant");
        }
      };
      
      request.onsuccess = () => {
        devLog("🔗 Worker: Connexion établie à IndexedDB");
        dbConnection = request.result;
        
        // Réinitialiser la promesse si la connexion est fermée
        dbConnection.onclose = () => {
          devLog("🔌 Worker: Connexion fermée");
          dbConnection = null;
          dbConnectionPromise = null;
        };
        
        resolve(dbConnection);
      };
      
      request.onerror = () => {
        devError("❌ Worker: Erreur d'ouverture IndexedDB:", request.error);
        dbConnectionPromise = null;
        reject(request.error);
      };
      
      // Ajouter un timeout pour éviter de bloquer indéfiniment
      setTimeout(() => {
        if (!dbConnection) {
          devError("⏱️ Worker: Timeout de connexion à IndexedDB");
          dbConnectionPromise = null;
          reject(new Error("Timeout lors de la connexion à IndexedDB"));
        }
      }, 5000);
    } catch (error) {
      devError("❌ Worker: Exception d'accès à IndexedDB:", error);
      dbConnectionPromise = null;
      reject(error);
    }
  });
  
  return dbConnectionPromise;
}

// Fonction utilitaire pour ajouter un timeout à une promesse
function promiseWithTimeout<T>(promise: Promise<T>, timeoutMs: number, operation: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Timeout pour l'opération: ${operation}`));
      }, timeoutMs);
    })
  ]);
}

// Fonction de débogage complète pour inspecter le contenu du cache
async function debugCache(): Promise<void> {
  try {
    devLog("🔍 Worker: Inspection du cache");
    
    const db = await openDatabase();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    
    const request = store.getAllKeys();
    const keys = await new Promise<IDBValidKey[]>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    devLog(`📋 Worker: ${keys.length} images en cache`);
    
    // N'afficher que les 5 premières entrées pour ne pas encombrer la console
    const samplesToShow = Math.min(keys.length, 5);
    for (let i = 0; i < samplesToShow; i++) {
      const getRequest = store.get(keys[i]);
      const item = await new Promise<CachedImage>((resolve, reject) => {
        getRequest.onsuccess = () => resolve(getRequest.result);
        getRequest.onerror = () => reject(getRequest.error);
      });
      
      if (item) {
        const age = Math.round((Date.now() - item.timestamp) / (1000 * 60 * 60)); // en heures
        devLog(`   - ${String(keys[i])} (${Math.round(item.blob.size / 1024)} KB, âge: ${age}h)`);
      }
    }
    
    if (keys.length > samplesToShow) {
      devLog(`   - ... et ${keys.length - samplesToShow} autres images`);
    }
  } catch (error) {
    devError("❌ Worker: Erreur d'inspection du cache:", error);
  }
}

// Fonction d'aide pour stocker l'image - attendre explicitement la fin de la transaction
async function storeImageInDB(key: string, cachedImage: CachedImage): Promise<void> {
  const db = await openDatabase();
  
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    
    const request = store.put(cachedImage, key);
    
    request.onsuccess = () => {
      devLog("🔄 Worker: Stockage demandé pour: " + key);
    };
    
    request.onerror = () => {
      devError("❌ Worker: Erreur de stockage pour: " + key, request.error);
      reject(request.error);
    };
    
    // IMPORTANT: Attendre que la transaction soit COMPLÈTEMENT terminée
    tx.oncomplete = () => {
      devLog("✅ Worker: Stockage terminé pour: " + key);
      resolve();
    };
    
    tx.onerror = () => {
      devError("❌ Worker: Erreur de transaction pour: " + key, tx.error);
      reject(tx.error);
    };
    
    tx.onabort = () => {
      devError("❌ Worker: Transaction annulée pour: " + key);
      reject(new Error("Transaction annulée"));
    };
  });
}

// Fonction d'aide pour vérifier si l'image est bien stockée
async function verifyImageInDB(key: string): Promise<boolean> {
  const db = await openDatabase();
  
  return new Promise<boolean>((resolve) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    
    const request = store.get(key);
    
    request.onsuccess = () => {
      resolve(!!request.result);
    };
    
    request.onerror = () => {
      devError("❌ Worker: Erreur de vérification pour: " + key);
      resolve(false);
    };
  });
}

// Fonction pour vérifier l'état du cache au démarrage
async function checkCacheStatus(): Promise<void> {
  try {
    devLog("🔍 Worker: Vérification du cache au démarrage...");
    
    const db = await openDatabase();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    
    const countRequest = store.count();
    
    const count = await new Promise<number>((resolve) => {
      countRequest.onsuccess = () => resolve(countRequest.result);
      countRequest.onerror = () => {
        devError("❌ Worker: Erreur de comptage des éléments");
        resolve(0);
      };
    });
    
    if (count > 0) {
      devLog(`✅ Worker: Cache OK - ${count} images en cache`);
    } else {
      devLog("⚠️ Worker: Cache vide - aucune image stockée");
    }
  } catch (error) {
    devError("❌ Worker: Erreur de vérification du cache:", error);
  }
}

// Fonction pour collecter des statistiques sur le cache
// Interface pour les statistiques de cache
interface CacheStats {
  dbAvailable: boolean;
  totalItems: number;
  totalSizeBytes: number;
  totalSizeMB?: number;
  averageItemSizeKB?: number;
  oldestItem: number | null;
  newestItem: number | null;
  oldestItemAge?: number;
  newestItemAge?: number;
  keys: string[];
  error?: string;
}

async function collectCacheStats(): Promise<CacheStats> {
  try {
    const stats: CacheStats = {
      dbAvailable: false,
      totalItems: 0,
      totalSizeBytes: 0,
      oldestItem: null,
      newestItem: null,
      keys: []
    };
    
    try {
      // Essayer d'ouvrir la base
      const db = await openDatabase();
      stats.dbAvailable = true;
      
      // Collecter les statistiques
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      
      // Compter les éléments
      const countRequest = store.count();
      stats.totalItems = await new Promise<number>((resolve) => {
        countRequest.onsuccess = () => resolve(countRequest.result);
        countRequest.onerror = () => resolve(0);
      });
      
      if (stats.totalItems === 0) {
        return stats;
      }
      
      // Récupérer toutes les clés
      const keysRequest = store.getAllKeys();
      const keys = await new Promise<IDBValidKey[]>((resolve) => {
        keysRequest.onsuccess = () => resolve(keysRequest.result);
        keysRequest.onerror = () => resolve([]);
      });
      
      stats.keys = keys.map(k => String(k)).slice(0, 20); // Limiter à 20 clés
      
      // Parcourir tous les éléments pour calculer la taille et les dates
      const allRequest = store.getAll();
      const items = await new Promise<CachedImage[]>((resolve) => {
        allRequest.onsuccess = () => resolve(allRequest.result);
        allRequest.onerror = () => resolve([]);
      });
      
      // Calculer la taille totale et les dates
      for (const item of items) {
        stats.totalSizeBytes += item.blob.size;
        
        if (stats.oldestItem === null || item.timestamp < stats.oldestItem) {
          stats.oldestItem = item.timestamp;
        }
        
        if (stats.newestItem === null || item.timestamp > stats.newestItem) {
          stats.newestItem = item.timestamp;
        }
      }
      
      // Ajouter quelques informations supplémentaires
      stats.totalSizeMB = Math.round(stats.totalSizeBytes / (1024 * 1024) * 100) / 100;
      stats.averageItemSizeKB = Math.round(stats.totalSizeBytes / stats.totalItems / 1024 * 100) / 100;
      
      if (stats.oldestItem) {
        const ageMs = Date.now() - stats.oldestItem;
        stats.oldestItemAge = Math.round(ageMs / (1000 * 60 * 60 * 24) * 10) / 10; // en jours
      }
      
      if (stats.newestItem) {
        const ageMs = Date.now() - stats.newestItem;
        stats.newestItemAge = Math.round(ageMs / (1000 * 60) * 10) / 10; // en minutes
      }
      
      return stats;
    } catch (error) {
      console.error("❌ Worker: Erreur lors de la collecte des statistiques", error);
      stats.error = String(error);
      return stats;
    }  } catch (error) {
    console.error("❌ Worker: Erreur critique lors de la collecte des statistiques", error);
    // Retourner un objet complet conforme à l'interface CacheStats
    return {
      dbAvailable: false,
      totalItems: 0,
      totalSizeBytes: 0,
      oldestItem: null,
      newestItem: null,
      keys: [],
      error: String(error)
    };
  }
}

// Fonction pour supprimer une image spécifique du cache
async function removeImageFromCache(key: string): Promise<boolean> {
  try {
    const db = await openDatabase();
    
    return new Promise<boolean>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      
      const deleteRequest = store.delete(key);
      
      deleteRequest.onsuccess = () => {
        devLog("🗑️ Worker: Image supprimée du cache: " + key);
        resolve(true);
      };
      
      deleteRequest.onerror = () => {
        devError("❌ Worker: Erreur de suppression de l'image: " + key, deleteRequest.error);
        reject(deleteRequest.error);
      };
      
      tx.oncomplete = () => {
        devLog("✅ Worker: Suppression terminée pour: " + key);
      };
      
      tx.onerror = () => {
        devError("❌ Worker: Erreur de transaction pour la suppression: " + key, tx.error);
        reject(tx.error);
      };
    });
  } catch (error) {
    devError("❌ Worker: Erreur lors de la suppression du cache:", error);
    return false;
  }
}
// BuildWorker.ts - Web Worker pour la gestion des images avec IndexedDB

// Nom de la base IndexedDB
const DB_NAME = "slagate_image_cache_v1";  // Nouveau nom pour éviter tout conflit
const STORE_NAME = "images";
// Suppression de la constante CACHE_EXPIRATION - les images persisteront indéfiniment
// Liste des noms de fichier qui doivent être invalidés (seront rechargés même s'ils sont dans le cache)
const INVALID_IMAGES: Record<string, boolean> = {};
const DB_VERSION = 1;

// Log des statistiques globales
let cacheHits = 0;
let cacheMisses = 0;

// Utiliser des clés simplifiées (seulement le nom du fichier)
function getSimpleKey(url: string): string {
  try {
    // Extraire uniquement le nom du fichier de l'URL
    const filename = url.split('/').pop() || url;
    console.log("🔑 Worker: Clé simplifiée générée:", filename);
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
  const { type, url } = event.data;
  console.log("🔧 Worker: Requête reçue pour", type === "getImage" ? url : type);

  // Ajouter cette ligne au début pour vérifier le contenu du cache au premier message
  if (type === "getImage" && !hasCheckedCacheOnStartup) {
    hasCheckedCacheOnStartup = true;
    await checkCacheStatus();
  }
  // Ajouter un type de message pour réinitialiser le système de cache
  if (type === "resetCache") {
    try {
      console.log("🧹 Worker: Réinitialisation du cache...");
      
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
          console.log("✅ Worker: Base de données supprimée avec succès");
          resolve();
        };
        
        deleteRequest.onerror = () => {
          console.error("❌ Worker: Erreur lors de la suppression de la base");
          reject(new Error("Échec de la suppression de la base de données"));
        };
        
        deleteRequest.onblocked = () => {
          console.warn("⚠️ Worker: Suppression bloquée - fermeture de toutes les connexions");
          // La suppression se poursuivra une fois que toutes les connexions seront fermées
          // Nous avons déjà fermé notre connexion, mais il pourrait y en avoir d'autres
        };
        
        // Timeout pour éviter de bloquer trop longtemps
        setTimeout(() => {
          reject(new Error("Timeout lors de la suppression de la base de données"));
        }, 5000);
      });
      
      // Recréer une nouvelle connexion
      console.log("🔄 Worker: Création d'une nouvelle connexion...");
      const db = await openDatabase();
      
      console.log("✅ Worker: Cache réinitialisé avec succès");
      self.postMessage({ type: "resetCache", success: true });
    } catch (error) {
      console.error("❌ Worker: Erreur lors de la réinitialisation:", error);
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
        console.log("🔐 Worker: Base de données accessible:", db.name);
      } catch (dbError) {
        console.error("❗ Worker: Impossible d'accéder à IndexedDB:", dbError);
        // Fallback au téléchargement sans mise en cache
        const fallbackBlob = await fetchImageWithoutCache(url);
        self.postMessage({ url, imageBlob: fallbackBlob, fromCache: false });
        return;
      }
      
      // Essayer de récupérer l'image du cache
      const cachedImage = await getImageFromCache(url);
      
      if (cachedImage) {
        cacheHits++;
        console.log("✅ Worker: Image chargée depuis IndexedDB:", url.split("/").pop());
        console.log(`📊 STATISTIQUES: ${cacheHits} images depuis le cache, ${cacheMisses} images téléchargées`);
        self.postMessage({ url, imageBlob: cachedImage.blob, fromCache: true });
      } else {
        cacheMisses++;
        console.log("🌐 Worker: Image absente du cache, téléchargement en cours:", url.split("/").pop());
        try {
          const downloadedBlob = await fetchAndCacheImage(url);
          if (downloadedBlob) {
            console.log("💾 Worker: Image téléchargée et stockée en cache:", url.split("/").pop());
            console.log(`📊 STATISTIQUES: ${cacheHits} images depuis le cache, ${cacheMisses} images téléchargées`);
            self.postMessage({ url, imageBlob: downloadedBlob, fromCache: false });
          } else {
            console.error("❌ Worker: Échec du téléchargement, aucune image retournée pour:", url);
            self.postMessage({ url, imageBlob: null, error: "Échec du téléchargement" });
          }
        } catch (error) {
          console.error("❌ Worker: Erreur pendant le traitement de l'image:", error);
          self.postMessage({ url, imageBlob: null, error: String(error) });
        }
      }
    } catch (error) {
      console.error("❌ Worker: Erreur globale:", error);
      self.postMessage({ url, imageBlob: null, error: String(error) });
    }  } else if (type === "checkAccess") {
    // Vérifier si la base de données est accessible
    try {
      const db = await openDatabase();
      self.postMessage({ type: "checkAccess", success: true });
    } catch (error) {
      self.postMessage({ type: "checkAccess", success: false, error: String(error) });
    }  } else if (type === "invalidateImage") {
    // Commande pour invalider une image spécifique
    try {
      const { imageUrl } = event.data;
      const simpleKey = getSimpleKey(imageUrl);
      
      console.log("🔄 Worker: Marquage de l'image pour invalidation:", simpleKey);
      
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
      
      console.log("🗑️ Worker: Demande de suppression de l'image du cache:", simpleKey);
      
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
  } else if (type === "updateImage") {
    // Commande pour forcer la mise à jour d'une image dans le cache
    try {
      const { imageUrl } = event.data;
      const simpleKey = getSimpleKey(imageUrl);
      
      console.log("🔄 Worker: Demande de mise à jour de l'image dans le cache:", simpleKey);
      
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
      
      // Afficher aussi dans la console du worker
      await debugCache();
    } catch (error) {
      self.postMessage({ type: "debugCache", error: String(error) });
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
    const response = await fetch(url, { cache: 'default' }); // Utiliser le cache du navigateur
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }
    return await response.blob();
  } catch (error) {
    console.error("❌ Worker: Erreur lors du téléchargement sans cache:", error);
    return null;
  }
}

// Optimisation de getImageFromCache avec des promesses plus efficaces
async function getImageFromCache(url: string): Promise<CachedImage | null> {
  try {
    const simpleKey = getSimpleKey(url);
    console.log("🔍 Worker: Recherche dans le cache avec clé:", simpleKey);
    
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
              console.log("ℹ️ Worker: Cache vide, aucune image stockée");
              resolve(null);
              return;
            }
          };
          
          // Chercher l'image par sa clé
          const getRequest = store.get(simpleKey);
          
          getRequest.onsuccess = () => {
            const result = getRequest.result as CachedImage;
            console.log("🔄 Worker: Résultat de la recherche:", result ? "Trouvé" : "Non trouvé");
            
            if (!result) {
              resolve(null);
              return;
            }
              // Vérifier si l'image est dans la liste des images à invalider
            if (INVALID_IMAGES[simpleKey]) {
              console.log("🔄 Worker: Image invalidée explicitement:", simpleKey);
              // Supprimer de la liste après l'avoir invalidée une fois
              delete INVALID_IMAGES[simpleKey];
              resolve(null);
              return;
            }
            
            console.log("🎯 Worker: Image trouvée dans le cache avec timestamp:", new Date(result.timestamp).toLocaleString());
            resolve(result);
          };
          
          getRequest.onerror = () => {
            console.error("❌ Worker: Erreur de lecture:", getRequest.error);
            reject(getRequest.error);
          };
          
          // Gérer les erreurs de transaction
          tx.oncomplete = () => {
            // La transaction s'est terminée normalement
          };
          
          tx.onerror = () => {
            console.error("❌ Worker: Erreur de transaction:", tx.error);
            reject(tx.error);
          };
        } catch (innerError) {
          console.error("❌ Worker: Erreur interne lors de l'accès au cache:", innerError);
          reject(innerError);
        }
      }),
      3000, // Timeout de 3 secondes
      "Récupération de l'image en cache"
    );
  } catch (error) {
    console.error("❌ Worker: Erreur lors de la lecture du cache:", error);
    return null;
  }
}

async function fetchAndCacheImage(url: string): Promise<Blob | null> {
  try {
    const simpleKey = getSimpleKey(url);
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`);
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
        console.log("✅ Worker: Vérification réussie - Image correctement stockée");
      } else {
        console.warn("⚠️ Worker: Vérification échouée - Image non trouvée après stockage");
      }
      
      console.log(`📊 Worker: Image stockée (${Math.round(blob.size / 1024)} KB):`, url.split("/").pop());
      
      // Forcer un test du cache pour s'assurer qu'il fonctionne
      await debugCache();
      
      return blob;
    } catch (dbError) {
      console.error("❌ Worker: Erreur lors du stockage en cache:", dbError);
      return blob;
    }
  } catch (error) {
    console.error("❌ Worker: Erreur lors du téléchargement:", error);
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
      console.log("🔌 Worker: Tentative de connexion à IndexedDB...");
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onupgradeneeded = (event) => {
        console.log("🔄 Worker: Mise à jour/création de la base IndexedDB");
        const db = request.result;
        
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
          console.log("✅ Worker: Object Store créé dans IndexedDB");
        } else {
          console.log("✅ Worker: Object Store existe déjà dans IndexedDB");
        }
      };
      
      request.onsuccess = () => {
        console.log("🔗 Worker: Connexion à IndexedDB établie");
        dbConnection = request.result;
        
        // Loguer les informations de la base
        console.log("📋 Worker: Base IndexedDB ouverte:", dbConnection.name, "version", dbConnection.version);
        
        // Réinitialiser la promesse si la connexion est fermée
        dbConnection.onclose = () => {
          console.log("🔌 Worker: Connexion à IndexedDB fermée");
          dbConnection = null;
          dbConnectionPromise = null;
        };
        
        resolve(dbConnection);
      };
      
      request.onerror = () => {
        console.error("❌ Worker: Erreur lors de l'ouverture d'IndexedDB:", request.error);
        dbConnectionPromise = null;
        reject(request.error);
      };
      
      // Ajouter un timeout pour éviter de bloquer indéfiniment
      setTimeout(() => {
        if (!dbConnection) {
          console.error("⏱️ Worker: Timeout lors de la connexion à IndexedDB");
          dbConnectionPromise = null;
          reject(new Error("Timeout lors de la connexion à IndexedDB"));
        }
      }, 5000);
    } catch (error) {
      console.error("❌ Worker: Exception lors de l'accès à IndexedDB:", error);
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
    console.log("🔍 Worker: DEBUG - Inspection du cache...");
    
    const db = await openDatabase();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    
    const request = store.getAllKeys();
    const keys = await new Promise<IDBValidKey[]>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    console.log(`📋 Worker: DEBUG - ${keys.length} images en cache:`);
    for (const key of keys) {
      const getRequest = store.get(key);
      const item = await new Promise<CachedImage>((resolve, reject) => {
        getRequest.onsuccess = () => resolve(getRequest.result);
        getRequest.onerror = () => reject(getRequest.error);
      });
      
      if (item) {
        const age = Math.round((Date.now() - item.timestamp) / (1000 * 60 * 60)); // en heures
        console.log(`   - ${String(key)} (${Math.round(item.blob.size / 1024)} KB, âge: ${age} heures)`);
      }
    }
    
    console.log("📋 Worker: DEBUG - Fin de l'inspection du cache");
  } catch (error) {
    console.error("❌ Worker: DEBUG - Erreur lors de l'inspection du cache:", error);
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
      console.log("🔄 Worker: Demande de stockage réussie pour la clé:", key);
    };
    
    request.onerror = () => {
      console.error("❌ Worker: Erreur lors du stockage avec la clé:", key, request.error);
      reject(request.error);
    };
    
    // IMPORTANT: Attendre que la transaction soit COMPLÈTEMENT terminée
    tx.oncomplete = () => {
      console.log("✅ Worker: Transaction de stockage terminée pour:", key);
      resolve();
    };
    
    tx.onerror = () => {
      console.error("❌ Worker: Erreur de transaction pour:", key, tx.error);
      reject(tx.error);
    };
    
    tx.onabort = () => {
      console.error("❌ Worker: Transaction annulée pour:", key);
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
      console.error("❌ Worker: Erreur lors de la vérification pour:", key);
      resolve(false);
    };
  });
}

// Fonction pour vérifier l'état du cache au démarrage
async function checkCacheStatus(): Promise<void> {
  try {
    console.log("🔍 Worker: Vérification du cache au démarrage...");
    
    const db = await openDatabase();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    
    const countRequest = store.count();
    
    const count = await new Promise<number>((resolve) => {
      countRequest.onsuccess = () => resolve(countRequest.result);
      countRequest.onerror = () => {
        console.error("❌ Worker: Erreur de comptage des éléments");
        resolve(0);
      };
    });
    
    if (count > 0) {
      console.log(`✅ Worker: Cache OK - ${count} images trouvées dans le cache`);
      
      // Optionnel: lister les clés disponibles
      const keysRequest = store.getAllKeys();
      keysRequest.onsuccess = () => {
        console.log("🔑 Worker: Clés disponibles dans le cache:", 
          keysRequest.result.slice(0, 5).join(", ") + 
          (keysRequest.result.length > 5 ? "..." : "")
        );
      };
    } else {
      console.log("⚠️ Worker: Cache vide - aucune image stockée");
    }
  } catch (error) {
    console.error("❌ Worker: Erreur lors de la vérification du cache:", error);
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
        console.log("🗑️ Worker: Image supprimée du cache:", key);
        resolve(true);
      };
      
      deleteRequest.onerror = () => {
        console.error("❌ Worker: Erreur lors de la suppression de l'image:", key, deleteRequest.error);
        reject(deleteRequest.error);
      };
      
      tx.oncomplete = () => {
        console.log("✅ Worker: Transaction de suppression terminée pour:", key);
      };
      
      tx.onerror = () => {
        console.error("❌ Worker: Erreur de transaction pour la suppression:", key, tx.error);
        reject(tx.error);
      };
    });
  } catch (error) {
    console.error("❌ Worker: Erreur lors de la suppression du cache:", error);
    return false;
  }
}
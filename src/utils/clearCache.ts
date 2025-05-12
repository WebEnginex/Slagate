/**
 * Utilitaire pour nettoyer et gérer tous les caches de l'application
 */

// Constantes reprises du worker
const DB_NAME = "slagate_image_cache_v1";

/**
 * Réinitialise tous les caches de l'application (localStorage et IndexedDB)
 */
export const resetAllCaches = async (): Promise<boolean> => {
  try {
    console.log("🧹 Nettoyage complet des caches...");
    
    // Réinitialiser les flags de localStorage
    localStorage.setItem("indexedDBFailed", "false");
    
    // Supprimer les entrées de cache d'image dans localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('image_cache_')) {
        localStorage.removeItem(key);
      }
    });
    
    // Supprimer la base IndexedDB
    try {
      await new Promise<void>((resolve, reject) => {
        const deleteRequest = indexedDB.deleteDatabase(DB_NAME);
        
        deleteRequest.onsuccess = () => {
          console.log("✅ Base IndexedDB supprimée avec succès");
          resolve();
        };
        
        deleteRequest.onerror = () => {
          console.error("❌ Erreur lors de la suppression de la base IndexedDB");
          reject(new Error("Échec de la suppression de la base IndexedDB"));
        };

        deleteRequest.onblocked = () => {
          console.warn("⚠️ Suppression de la base IndexedDB bloquée - fermeture de toutes les connexions d'abord");
          // La base de données sera supprimée une fois toutes les connexions fermées
        };
      });
      
      return true;
    } catch (error) {
      console.error("❌ Échec de la réinitialisation du cache IndexedDB", error);
      return false;
    }
  } catch (error) {
    console.error("❌ Erreur globale lors de la réinitialisation des caches", error);
    return false;
  }
};

/**
 * Vérifie l'état du cache IndexedDB
 * @returns {Promise<boolean>} true si IndexedDB est fonctionnel
 */
export const checkIndexedDBStatus = async (): Promise<boolean> => {
  try {
    // Tenter d'ouvrir une connexion temporaire à IndexedDB
    const openRequest = indexedDB.open("_temp_check_db", 1);
    
    return await new Promise<boolean>((resolve) => {
      openRequest.onsuccess = (event) => {
        const db = openRequest.result;
        db.close();
        // Supprimer la base temporaire
        indexedDB.deleteDatabase("_temp_check_db");
        resolve(true);
      };
      
      openRequest.onerror = () => {
        resolve(false);
      };
      
      // Ajouter un timeout pour éviter d'attendre indéfiniment
      setTimeout(() => {
        resolve(false);
      }, 3000);
    });
  } catch (error) {
    return false;
  }
};

/**
 * Synchronise l'état du cache entre localStorage et la réalité
 * Corrige le problème où indexedDBFailed restait bloqué à "true"
 */
export const syncCacheStatus = async (): Promise<boolean> => {
  const currentFlag = localStorage.getItem("indexedDBFailed") === "true";
  const actualStatus = await checkIndexedDBStatus();
  
  // Mettre à jour le drapeau si nécessaire
  if (currentFlag && actualStatus) {
    localStorage.setItem("indexedDBFailed", "false");
    console.log("🔄 Flag indexedDBFailed corrigé: false");
    return true;
  } 
  else if (!currentFlag && !actualStatus) {
    localStorage.setItem("indexedDBFailed", "true");
    console.log("🔄 Flag indexedDBFailed corrigé: true");
    return true;
  }
  
  return false; // Aucune correction nécessaire
};

/**
 * Affiche les statistiques de cache dans la console
 */
export const displayCacheStats = async () => {
  try {
    // Vérifier l'état actuel
    const isAvailable = await checkIndexedDBStatus();
    const flagValue = localStorage.getItem("indexedDBFailed") === "true";
    
    console.group("📊 Statistiques du cache");
    console.log(`IndexedDB disponible: ${isAvailable ? "✅ Oui" : "❌ Non"}`);
    console.log(`Flag indexedDBFailed: ${flagValue ? "⚠️ true (cache désactivé)" : "✅ false (cache actif)"}`);
    
    // Vérifier la cohérence
    if ((isAvailable && flagValue) || (!isAvailable && !flagValue)) {
      console.warn("⚠️ Incohérence détectée entre l'état réel et le flag");
    } else {
      console.log("✅ État cohérent");
    }
    
    // Compter les entrées dans localStorage
    let localStorageImageCount = 0;
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('image_cache_')) {
        localStorageImageCount++;
      }
    });
    console.log(`Entrées dans localStorage: ${localStorageImageCount}`);
    
    // Essayer de compter les entrées dans IndexedDB si disponible
    if (isAvailable) {
      try {
        const db = await new Promise<IDBDatabase>((resolve, reject) => {
          const request = indexedDB.open(DB_NAME);
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
        
        const tx = db.transaction("images", "readonly");
        const store = tx.objectStore("images");
        const countRequest = store.count();
        
        const count = await new Promise<number>((resolve) => {
          countRequest.onsuccess = () => resolve(countRequest.result);
          countRequest.onerror = () => resolve(0);
        });
        
        console.log(`Entrées dans IndexedDB: ${count}`);
        db.close();
      } catch (error) {
        console.log(`Impossible de compter les entrées dans IndexedDB: ${error}`);
      }
    }
    
    console.groupEnd();
  } catch (error) {
    console.error("Erreur lors de l'affichage des statistiques:", error);
  }
};
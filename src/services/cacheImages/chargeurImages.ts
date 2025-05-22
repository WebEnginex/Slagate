// imageWorkerUtils.ts - Utilitaires pour utiliser le BuildWorker pour le chargement d'images
import { syncCacheStatus } from "./nettoyageCache";

// Types pour le niveau de journalisation
export type LogLevel = 'none' | 'minimal' | 'verbose';

// Configuration par défaut du niveau de journalisation
let logLevel: LogLevel = 'minimal';

// Instance persistante du worker pour améliorer les performances et maintenir les réglages
let imageWorker: Worker | null = null;

// Initialiser le worker avec les paramètres actuels
const initWorker = () => {
  if (imageWorker !== null) {
    return imageWorker;
  }
  
  try {
    imageWorker = new Worker(
      new URL("../../workers/BuildWorker.ts", import.meta.url)
    );
    
    // Initialiser le worker avec les paramètres courants
    imageWorker.postMessage({ 
      type: "init", 
      isDev: import.meta.env.DEV,
      logConfig: logLevel
    });
    
    // Exposer le worker globalement pour le panneau de configuration
    if (typeof window !== 'undefined') {
      // @ts-ignore - Ajouter l'instance du worker comme propriété globale
      window.__imageWorker = imageWorker;
    }
    
    devLog("🔄 Worker d'images initialisé");
    
    return imageWorker;
  } catch (error) {
    devError("❌ Erreur lors de l'initialisation du worker:", error);
    return null;
  }
};

// Fonction pour définir le niveau de journalisation
export const setLogLevel = (level: LogLevel): void => {
  logLevel = level;
  
  // Si le worker existe, lui envoyer également la configuration
  if (imageWorker) {
    imageWorker.postMessage({ 
      type: 'setLogConfig', 
      logConfig: level 
    });
    
    if (import.meta.env.DEV) {
      console.log(`📝 Niveau de log défini à '${level}'`);
    }
  }
};

// Fonction de log conditionnelle
const devLog = (message: string, ...args: any[]) => {
  if (import.meta.env.DEV && logLevel === 'verbose') {
    console.log(message, ...args);
  }
};

// Fonction d'erreur conditionnelle - les erreurs sont toujours importantes
const devError = (message: string, ...args: any[]) => {
  console.error(message, ...args);
};

// Fonction d'avertissement conditionnelle
const devWarn = (message: string, ...args: any[]) => {
  if (import.meta.env.DEV && logLevel !== 'none') {
    console.warn(message, ...args);
  }
};

/**
 * Charge une image via le worker IndexedDB.
 * Si l'image est dans le cache, la récupère, sinon la télécharge et la met en cache.
 * 
 * @param url - L'URL de l'image à charger
 * @param setCacheAvailable - La fonction setState pour mettre à jour l'état de disponibilité du cache
 * @returns Une URL blob si l'image est chargée avec succès, ou l'URL originale en cas d'erreur
 */
export const fetchImageFromWorker = async (
  url: string,
  setCacheAvailable?: (isAvailable: boolean) => void,
  pageContext?: string,
  pageImages?: string[]
): Promise<{ url: string; fromCache: boolean } | string> => {
  // Essayer de synchroniser l'état du cache
  await syncCacheStatus();

  // Vérifier l'état du cache IndexedDB
  const indexedDBFailed = localStorage.getItem("indexedDBFailed") === "true";

  // Si IndexedDB a échoué précédemment et que l'état n'a pas été réinitialisé, utiliser directement l'URL
  if (indexedDBFailed) {
    // Mise à jour de l'état du cache pour la cohérence de l'UI (si la fonction est fournie)
    if (setCacheAvailable) {
      setCacheAvailable(false);
    }
    return url;
  }
  return new Promise((resolve) => {
    // Obtenir ou initialiser le worker persistant
    const worker = initWorker();
    
    // Si l'initialisation échoue, utiliser l'URL directe
    if (!worker) {
      if (setCacheAvailable) {
        setCacheAvailable(false);
      }
      resolve(url);
      return;
    }
    
    // Définir un timeout (5 secondes)
    const timeoutId = setTimeout(() => {
      devWarn("⏱️ Timeout du worker - utilisation de l'URL directe");
      // Ne pas terminer le worker permanent, juste annuler cette requête
      localStorage.setItem("indexedDBFailed", "true");
      if (setCacheAvailable) {
        setCacheAvailable(false);
      }
      resolve(url);
    }, 5000);

    // Créer un gestionnaire spécifique pour cette requête
    const messageHandler = async (event: MessageEvent) => {
      // Vérifier que c'est bien la réponse à notre requête spécifique
      if (event.data.url === url || event.data.type === 'error') {
        clearTimeout(timeoutId);
        worker.removeEventListener('message', messageHandler);
        
        const { imageBlob, fromCache, error } = event.data;
        const filename = url.split("/").pop() || url;
  
        if (error) {
          devError(
            `❌ Erreur: ${error.substring(0, 100)}${
              error.length > 100 ? "..." : ""
            }`
          );
          resolve(url);
          return;
        }
        
        if (imageBlob) {
          try {
            // Importer le gestionnaire de Blob URLs ici pour éviter de le charger globalement
            const { createTrackedBlobUrl } = await import('./blobUrlManager');
            const blobUrl = createTrackedBlobUrl(imageBlob);
            // Si nous avons réussi à obtenir une image, le cache fonctionne
            localStorage.setItem("indexedDBFailed", "false");
            if (setCacheAvailable) {
              setCacheAvailable(true);
            }
            resolve({ url: blobUrl, fromCache: fromCache });
          } catch (error) {
            devError("❌ Erreur lors de la création de l'URL Blob:", error);
            resolve(url);
          }
        } else {
          devWarn(`⚠️ Aucune image reçue pour: ${filename}`);
          resolve(url);
        }
      }
    };
    
    // Transmettre l'état de développement, le contexte de page et le niveau de log au worker
    worker.postMessage({ 
      type: "getImage", 
      url, 
      isDev: import.meta.env.DEV,
      pageContext,
      pageImages,
      logConfig: logLevel // Transmettre le niveau de log configuré
    });

    // Ajouter le gestionnaire spécifique
    worker.addEventListener('message', messageHandler);

    // Gestionnaire d'erreur global
    worker.addEventListener('error', () => {
      clearTimeout(timeoutId);
      devError("❌ Erreur du worker");
      worker.removeEventListener('message', messageHandler);
      resolve(url);
    });
  });
};

/**
 * Vérifie si IndexedDB est accessible et fonctionnel.
 * Utile au démarrage d'un composant pour mettre à jour l'état du cache.
 * 
 * @param setCacheAvailable - La fonction setState pour mettre à jour l'état de disponibilité du cache
 */
export const checkIndexedDBSupport = async (
  setCacheAvailable: (isAvailable: boolean) => void
): Promise<void> => {
  try {
    // D'abord synchroniser l'état du cache pour corriger un éventuel drapeau bloqué
    const wasFixed = await syncCacheStatus();
    if (wasFixed) {
      devLog("🔄 État du cache corrigé au démarrage");
      setCacheAvailable(localStorage.getItem("indexedDBFailed") !== "true");
    }
    
    // Obtenir ou initialiser le worker persistant
    const worker = initWorker();
    
    if (!worker) {
      setCacheAvailable(false);
      return;
    }
    
    // Transmettre la demande de vérification d'accès
    worker.postMessage({ 
      type: "checkAccess"
    });    // Créer un gestionnaire spécifique pour cette requête
    const messageHandler = (event: MessageEvent) => {
      // Vérifier que c'est bien la réponse à notre vérification d'accès
      if (event.data.type === 'checkAccessResult') {
        worker.removeEventListener('message', messageHandler);
        
        const { success } = event.data;
        if (success) {
          devLog("✅ Cache IndexedDB opérationnel");
          localStorage.setItem("indexedDBFailed", "false");
          setCacheAvailable(true);
        } else {
          devLog("⚠️ Cache IndexedDB désactivé");
          localStorage.setItem("indexedDBFailed", "true");
          setCacheAvailable(false);
        }
      }
    };

    // Ajouter le gestionnaire spécifique
    worker.addEventListener('message', messageHandler);

    // Gestionnaire d'erreur temporaire
    const errorHandler = () => {
      devWarn("⚠️ IndexedDB: Worker non supporté");
      localStorage.setItem("indexedDBFailed", "true");
      setCacheAvailable(false);
      worker.removeEventListener('message', messageHandler);
      worker.removeEventListener('error', errorHandler);
    };
    
    worker.addEventListener('error', errorHandler);
  } catch (error) {
    devError("❌ IndexedDB: Inaccessible");
    setCacheAvailable(false);
  }
};

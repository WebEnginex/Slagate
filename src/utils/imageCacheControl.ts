/**
 * Utilitaires pour contrôler précisément le cache d'images via le BuildWorker
 * Permet d'invalider ou de mettre à jour sélectivement des images dans le cache
 * sans avoir à tout réinitialiser
 */

// Référence au worker
let worker: Worker | null = null;

// Initialiser le worker si ce n'est pas déjà fait
const getWorker = (): Worker => {
  if (!worker) {
    worker = new Worker(new URL('../workers/BuildWorker.ts', import.meta.url), { type: 'module' });
    
    // Log pour déboguer
    worker.onmessage = (e) => {
      console.log(`📦 Réponse du cache worker: ${e.data.type}`, e.data);
    };
  }
  return worker;
};

/**
 * Invalide une image spécifique dans le cache 
 * L'image sera rechargée la prochaine fois qu'elle sera demandée
 */
export const invalidateImageInCache = (imageUrl: string): void => {
  try {
    const w = getWorker();
    w.postMessage({
      type: "invalidateImage",
      imageUrl
    });
  } catch (error) {
    console.error("❌ Erreur lors de l'invalidation de l'image:", error);
  }
};

/**
 * Supprime directement une image du cache
 */
export const removeImageFromCache = (imageUrl: string): void => {
  try {
    const w = getWorker();
    w.postMessage({
      type: "removeImage",
      imageUrl
    });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression de l'image:", error);
  }
};

/**
 * Force la mise à jour immédiate d'une image dans le cache
 * Utile lorsque vous savez qu'une image a changé sur le serveur
 */
export const updateImageInCache = (imageUrl: string): void => {
  try {
    const w = getWorker();
    w.postMessage({
      type: "updateImage",
      imageUrl
    });
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour de l'image:", error);
  }
};

/**
 * Affiche les statistiques du cache dans la console
 */
export const showCacheDebugInfo = (): void => {
  try {
    const w = getWorker();
    w.postMessage({
      type: "debugCache"
    });
  } catch (error) {
    console.error("❌ Erreur lors de l'affichage des stats du cache:", error);
  }
};

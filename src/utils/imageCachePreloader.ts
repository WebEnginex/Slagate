/**
 * Utilitaire pour précharger des images dans le cache IndexedDB
 * Optimisé pour le chargement initial de l'application
 */

// Constante pour limiter le nombre de téléchargements simultanés
const MAX_CONCURRENT_DOWNLOADS = 5;

/**
 * Précharge un ensemble d'URLs d'images dans le cache IndexedDB
 * Utilise une file d'attente pour limiter le nombre de téléchargements simultanés
 */
export const preloadImagesInCache = async (
  urls: string[], 
  progressCallback?: (completed: number, total: number) => void
): Promise<void> => {
  // Si le tableau est vide, ne rien faire
  if (!urls || urls.length === 0) return;
  
  console.log(`🔄 Préchargement de ${urls.length} images...`);
  
  // Créer un worker dédié pour le cache
  const worker = new Worker(new URL('../workers/BuildWorker.ts', import.meta.url), { type: 'module' });
  
  // Compteurs pour le suivi de progression
  let completed = 0;
  let inProgress = 0;
  const total = urls.length;
  
  // Fonction pour mettre à jour la progression
  const updateProgress = () => {
    if (progressCallback) {
      progressCallback(completed, total);
    }
  };
  
  // Traiter la file d'attente des images à télécharger
  const queue = [...urls];
  
  // Fonction pour traiter le prochain élément de la file d'attente
  const processNext = () => {
    if (queue.length === 0 || inProgress >= MAX_CONCURRENT_DOWNLOADS) return;
    
    const url = queue.shift();
    if (!url) return;
    
    inProgress++;
    
    worker.postMessage({
      type: "getImage",
      url: url
    });
  };
  
  // Gestionnaire d'événements pour les réponses du worker
  worker.onmessage = (e) => {
    const { type, url, imageBlob, fromCache } = e.data;
    
    if (type === "getImage" || !type) {
      inProgress--;
      completed++;
      
      // Log du statut
      if (completed % 10 === 0 || completed === total) {
        console.log(`📦 Préchargement: ${completed}/${total} images (${Math.round(completed/total*100)}%)`);
      }
      
      updateProgress();
      
      // Continuer avec la file d'attente
      processNext();
      
      // Si tout est terminé, fermer le worker
      if (completed === total) {
        console.log(`✅ Préchargement terminé: ${completed} images dans le cache`);
        worker.terminate();
      }
    }
  };
  
  // Gérer les erreurs
  worker.onerror = (error) => {
    console.error("❌ Erreur dans le worker de préchargement:", error);
    // Continuer malgré l'erreur
    inProgress--;
    completed++;
    updateProgress();
    processNext();
  };
  
  // Démarrer le traitement initial
  for (let i = 0; i < MAX_CONCURRENT_DOWNLOADS; i++) {
    processNext();
  }
  
  // Retourner une promesse qui se résout lorsque tout est terminé
  return new Promise<void>((resolve) => {
    const checkInterval = setInterval(() => {
      if (completed === total) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 100);
  });
};
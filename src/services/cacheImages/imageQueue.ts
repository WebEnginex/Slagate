/**
 * Service de gestion de files d'attente d'images
 * Permet de limiter le nombre de requêtes d'images simultanées
 * pour éviter la surcharge du worker et améliorer les performances
 */

// Type pour les éléments de la file d'attente
interface QueueItem {
  url: string;
  pageId: string;
  priority: number; // 0 = haute priorité, 1 = normale, 2 = basse
  resolve: (value: string) => void;
  reject: (reason: any) => void;
  addedAt: number;
}

// Configuration
const CONCURRENT_REQUESTS_LIMIT = 3;
const REQUEST_INTERVAL_MS = 100;
const REQUEST_TIMEOUT_MS = 15000;

// File d'attente des images à charger
let queue: QueueItem[] = [];
// Nombre de requêtes en cours
let activeRequests = 0;
// Timer pour le traitement de la file d'attente
let queueTimer: ReturnType<typeof setInterval> | null = null;
// Indicateur d'initialisation
let isInitialized = false;

/**
 * Initialise le service de file d'attente
 */
const initializeQueue = () => {
  if (isInitialized) return;
  
  // Démarrer le timer de traitement de la file d'attente
  queueTimer = setInterval(processQueue, REQUEST_INTERVAL_MS);
  isInitialized = true;
  
  // Nettoyer lors du déchargement de la page
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      if (queueTimer) clearInterval(queueTimer);
    });
  }
  
  console.log('🔄 Service de file d\'attente d\'images initialisé');
};

/**
 * Traite les éléments de la file d'attente selon la priorité et la disponibilité
 */
const processQueue = () => {
  if (queue.length === 0 || activeRequests >= CONCURRENT_REQUESTS_LIMIT) return;
  
  // Trier la file d'attente par priorité puis par ordre d'ajout (FIFO)
  queue.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.addedAt - b.addedAt;
  });
  
  // Traiter les éléments tant qu'il y a de la place
  while (queue.length > 0 && activeRequests < CONCURRENT_REQUESTS_LIMIT) {
    const item = queue.shift();
    if (!item) break;
    
    // Vérifier si l'élément a expiré (après 15 secondes dans la file)
    const timeInQueue = Date.now() - item.addedAt;
    if (timeInQueue > REQUEST_TIMEOUT_MS) {
      console.warn(`⏱️ Timeout de la file d'attente pour: ${item.url}`);
      item.resolve(item.url); // Résoudre avec l'URL originale
      continue;
    }
    
    processQueueItem(item);
  }
};

/**
 * Traite un élément spécifique de la file d'attente
 */
const processQueueItem = async (item: QueueItem) => {
  activeRequests++;
  
  try {
    // Importer dynamiquement le service de chargement d'images
    const { loadPageImage } = await import('./pageImageLoader');
    
    // Ajouter un timeout pour éviter les attentes infinies
    const timeoutPromise = new Promise<string>((_, reject) => {
      setTimeout(() => reject(new Error('Image loading timeout')), REQUEST_TIMEOUT_MS);
    });
    
    // Exécuter avec timeout
    const result = await Promise.race([
      loadPageImage(item.url, item.pageId),
      timeoutPromise
    ]);
    
    item.resolve(result);
  } catch (error) {
    console.warn(`⚠️ Erreur lors du chargement de l'image: ${item.url}`, error);
    item.resolve(item.url); // Fallback à l'URL originale en cas d'erreur
  } finally {
    activeRequests--;
    // Traiter immédiatement le prochain élément si possible
    if (queue.length > 0 && activeRequests < CONCURRENT_REQUESTS_LIMIT) {
      setTimeout(processQueue, 0);
    }
  }
};

/**
 * Ajoute une requête d'image à la file d'attente
 * 
 * @param url URL de l'image à charger
 * @param pageId Identifiant de la page
 * @param priority Priorité (0 = haute, 1 = normale, 2 = basse)
 * @returns Promise qui sera résolue avec l'URL de l'image (blob ou originale)
 */
export const queueImageLoad = (url: string, pageId: string, priority: number = 1): Promise<string> => {
  // Initialiser la file d'attente si nécessaire
  if (!isInitialized) {
    initializeQueue();
  }
  
  // Si l'URL est vide, résoudre immédiatement
  if (!url) return Promise.resolve('');
  
  return new Promise<string>((resolve, reject) => {
    // Ajouter à la file d'attente
    queue.push({
      url,
      pageId,
      priority,
      resolve,
      reject,
      addedAt: Date.now()
    });
    
    // Traiter immédiatement si possible
    if (activeRequests < CONCURRENT_REQUESTS_LIMIT) {
      setTimeout(processQueue, 0);
    }
  });
};

/**
 * Ajoute un lot d'images à la file d'attente avec une priorité définie
 * 
 * @param urls Liste des URLs à charger
 * @param pageId Identifiant de la page
 * @param priority Priorité (0 = haute, 1 = normale, 2 = basse)
 * @returns Un objet avec les URLs des images (blob ou originales)
 */
export const queueBatchImageLoad = async (
  urls: string[],
  pageId: string,
  priority: number = 1
): Promise<Record<string, string>> => {
  const result: Record<string, string> = {};
  
  // Filtrer les URLs vides
  const validUrls = urls.filter(url => !!url);
  
  // Charger chaque image en utilisant la file d'attente
  await Promise.all(validUrls.map(async (url) => {
    try {
      const cachedUrl = await queueImageLoad(url, pageId, priority);
      result[url] = cachedUrl;
    } catch (error) {
      console.warn(`⚠️ Erreur lors du chargement de l'image en lot: ${url}`, error);
      result[url] = url; // Fallback à l'URL originale
    }
  }));
  
  return result;
};

/**
 * Charge une image avec priorité "visible" (haute)
 * À utiliser pour les images actuellement visibles à l'écran
 * 
 * @param url URL de l'image à charger
 * @param pageId Identifiant de la page
 * @returns Promise qui sera résolue avec l'URL de l'image (blob ou originale)
 */
export const loadVisibleImage = (url: string, pageId: string): Promise<string> => {
  return queueImageLoad(url, pageId, 0); // Priorité 0 = haute
};

/**
 * Précharge des images avec priorité "future" (basse)
 * À utiliser pour précharger les images qui seront probablement nécessaires plus tard
 * 
 * @param urls Liste des URLs à précharger
 * @param pageId Identifiant de la page
 * @returns Un objet avec les URLs des images (blob ou originales)
 */
export const preloadFutureImages = (urls: string[], pageId: string): Promise<Record<string, string>> => {
  return queueBatchImageLoad(urls, pageId, 2); // Priorité 2 = basse
};

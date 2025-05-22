/**
 * Service pour charger les images spécifiques à une page avec contexte
 * Utilise le système de cache centralisé avec suivi des pages
 */

import { fetchImageFromWorker } from './chargeurImages';

/**
 * Charge une image pour une page spécifique, en utilisant le contexte de page
 * pour améliorer les logs et le suivi de performance
 * 
 * @param url L'URL de l'image à charger
 * @param pageId Identifiant de la page (ex: "PromoCodes", "Creators")
 * @param pageImages Liste des images associées à cette page pour le filtrage des logs
 * @returns L'URL de l'image (Blob URL si chargée depuis le cache, URL originale sinon)
 */
export const loadPageImage = async (
  url: string, 
  pageId: string,
  pageImages?: string[]
): Promise<string> => {
  // Si l'URL est vide, retourner une chaîne vide immédiatement
  if (!url) return '';
  
  // Importer la stratégie de réessai à la demande
  const { withRetry, DEFAULT_RETRY_CONFIG } = await import('./retryStrategy');
  
  try {
    // Utiliser le système de cache avec réessais
    const result = await withRetry(
      async () => fetchImageFromWorker(url, undefined, pageId, pageImages),
      { ...DEFAULT_RETRY_CONFIG, maxAttempts: 2 } // Configuration personnalisée: seulement 2 tentatives max
    );
    
    // Gérer le résultat selon son type
    if (typeof result === 'object' && result.url) {
      return result.url;
    } else {
      return url; // Fallback à l'URL originale
    }
  } catch (error) {
    console.error(`Erreur lors du chargement de l'image pour ${pageId}:`, error);
    return url; // En cas d'erreur, utiliser l'URL originale
  }
};

/**
 * Convertit une image en Base64 pour une page spécifique
 * Utile pour les composants qui ont besoin de l'image en Base64 plutôt qu'en URL
 * 
 * @param url L'URL de l'image à charger et convertir
 * @param pageId Identifiant de la page
 * @param pageImages Liste des images associées à cette page
 * @returns L'image encodée en Base64 ou null en cas d'erreur
 */
export const loadPageImageAsBase64 = async (
  url: string,
  pageId: string,
  pageImages?: string[]
): Promise<string | null> => {  try {
    // Utiliser d'abord le système de cache centralisé pour récupérer l'image
    const imageUrl = await loadPageImage(url, pageId, pageImages);
    
    // Si l'URL retournée est la même que l'originale, c'est que l'image n'était pas en cache
    // Dans ce cas, on fetch directement
    const response = await fetch(imageUrl !== url ? imageUrl : url, {
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Accept': 'image/webp,image/png,image/jpeg,image/gif,image/*',
      }
    });
    if (!response.ok) throw new Error("Image fetch failed");
    
    const blob = await response.blob();
    
    // Convertir en base64
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error(`Erreur lors de la conversion en Base64 pour ${pageId}:`, error);
    return null;
  }
};

/**
 * Précharge plusieurs images pour une page spécifique
 * 
 * @param urls Liste des URLs d'images à précharger
 * @param pageId Identifiant de la page
 * @returns Un objet Record contenant les URLs ou Base64 des images chargées
 */
export const preloadPageImages = async (
  urls: string[],
  pageId: string
): Promise<Record<string, string>> => {
  const cache: Record<string, string> = {};
  
  // Filtrer les URLs vides
  const validUrls = urls.filter(u => !!u);
  
  try {
    // Informer le worker du contexte de page actuel et des images à précharger
    // pour optimiser les logs et le suivi
    await Promise.all(validUrls.map(async (url) => {
      const result = await loadPageImage(url, pageId, validUrls);
      if (result) {
        cache[url] = result;
      }
    }));
    
    return cache;
  } catch (error) {
    console.error(`Erreur lors du préchargement des images pour ${pageId}:`, error);
    return cache;
  }
};

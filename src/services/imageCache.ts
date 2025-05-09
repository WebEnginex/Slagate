/**
 * Service pour gérer le cache d'images en base64
 */

/**
 * Télécharge une image depuis une URL et la convertit en base64
 * Si l'image est déjà en cache, renvoie directement la version mise en cache
 */
export const fetchImageAsBase64 = async (url: string): Promise<string> => {
  try {
    // Si c'est déjà une data URL, on la retourne directement
    if (url.startsWith('data:')) {
      return url;
    }
    
    // Vérifier d'abord si l'image est déjà en cache
    const imageCache = localStorage.getItem(`image_cache_${url}`);
    if (imageCache) {
      return imageCache;
    }

    // Si pas en cache, télécharger l'image
    const response = await fetch(url);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        // Mettre en cache l'image encodée
        try {
          localStorage.setItem(`image_cache_${url}`, base64data);
        } catch (e) {
          console.warn(`⚠️ Image trop grande pour être mise en cache: ${url}`);
          // On continue quand même en retournant l'image
        }
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error(`❌ Erreur lors du chargement de l'image: ${url}`, error);
    return url; // Fallback à l'URL originale en cas d'erreur
  }
};

/**
 * Nettoie le cache d'images qui n'ont pas été utilisées depuis un certain temps
 */
export const cleanupImageCache = (maxAgeDays = 14) => {
  const currentTime = Date.now();
  const maxAge = maxAgeDays * 24 * 60 * 60 * 1000;
  
  // Parcourir toutes les clés du localStorage
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('image_cache_')) {
      const lastUsed = Number(localStorage.getItem(`${key}_lastUsed`)) || 0;
      
      // Si l'image n'a pas été utilisée récemment, la supprimer du cache
      if (currentTime - lastUsed > maxAge) {
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}_lastUsed`);
      }
    }
  });
};

/**
 * Marque une image comme utilisée récemment
 */
export const markImageAsUsed = (url: string) => {
  try {
    localStorage.setItem(`image_cache_${url}_lastUsed`, Date.now().toString());
  } catch (e) {
    // Ignorer les erreurs de stockage
  }
};

/**
 * Précharge un ensemble d'images et les met en cache
 */
export const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.allSettled(
    urls.map(url => fetchImageAsBase64(url))
  );
};

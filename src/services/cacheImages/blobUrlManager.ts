/**
 * Service pour gérer les URLs Blob et éviter les fuites mémoire
 */

// Un registre des URLs Blob créées et leur état
const blobUrlRegistry = new Map<string, boolean>();

/**
 * Crée une URL Blob et l'enregistre pour le suivi
 * @param blob Le Blob à partir duquel créer l'URL
 * @returns URL Blob créée
 */
export const createTrackedBlobUrl = (blob: Blob): string => {
  const url = URL.createObjectURL(blob);
  blobUrlRegistry.set(url, true);
  return url;
};

/**
 * Libère une URL Blob spécifique
 * @param url L'URL Blob à libérer
 */
export const revokeBlobUrl = (url: string): void => {
  if (blobUrlRegistry.has(url)) {
    URL.revokeObjectURL(url);
    blobUrlRegistry.delete(url);
  }
};

/**
 * Libère toutes les URLs Blob qui sont encore en mémoire
 * Utile lors du nettoyage (par exemple lors du démontage d'un composant)
 */
export const revokeAllBlobUrls = (): void => {
  blobUrlRegistry.forEach((_, url) => {
    try {
      URL.revokeObjectURL(url);
    } catch (e) {
      console.warn('Erreur lors de la libération de l\'URL Blob:', e);
    }
  });
  blobUrlRegistry.clear();
};

/**
 * Remplace une URL Blob existante par une nouvelle et libère l'ancienne
 * @param oldUrl L'ancienne URL Blob à remplacer et libérer
 * @param blob Le nouveau Blob pour créer une nouvelle URL
 * @returns Nouvelle URL Blob
 */
export const replaceBlobUrl = (oldUrl: string | null, blob: Blob): string => {
  if (oldUrl && blobUrlRegistry.has(oldUrl)) {
    revokeBlobUrl(oldUrl);
  }
  return createTrackedBlobUrl(blob);
};

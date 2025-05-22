/**
 * Types et interfaces pour le système de cache d'images
 */

/**
 * Type pour une image mise en cache
 */
export interface CachedImage {
  blob: Blob;
  timestamp: number;
  url: string;
}

/**
 * Type pour la réponse du worker lors du chargement d'une image
 */
export interface ImageResponse {
  url: string;
  fromCache: boolean;
}

/**
 * Statistiques du cache d'images
 */
export interface CacheStats {
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

/**
 * Type pour la fonction de callback de progression
 */
export type ProgressCallback = (completed: number, total: number) => void;

/**
 * Type pour la fonction de mise à jour de l'état de disponibilité du cache
 */
export type CacheAvailabilitySetter = (isAvailable: boolean) => void;

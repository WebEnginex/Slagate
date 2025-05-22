/**
 * Module de cache d'images
 * 
 * Ce module fournit toutes les fonctionnalités liées au cache d'images
 * avec IndexedDB et Web Workers, regroupées dans une API unifiée.
 */

// Exporter les types publics
export type {
  CachedImage,
  ImageResponse,
  CacheStats,
  ProgressCallback,
  CacheAvailabilitySetter
} from './types';

// Exporter les fonctions de chargement d'images
export {
  fetchImageFromWorker,
  checkIndexedDBSupport
} from './chargeurImages';

// Exporter les fonctions de préchargement
export {
  preloadImagesInCache
} from './prechargeurImages';

// Exporter les fonctions pour le chargement d'images avec contexte de page
export {
  loadPageImage,
  loadPageImageAsBase64,
  preloadPageImages
} from './pageImageLoader';

// Exporter les fonctions de contrôle du cache
export {
  invalidateImageInCache,
  removeImageFromCache,
  updateImageInCache,
  showCacheDebugInfo
} from './controleurCache';

// Exporter les fonctions de nettoyage et de gestion du cache
export {
  resetAllCaches,
  checkIndexedDBStatus,
  syncCacheStatus,
  displayCacheStats
} from './nettoyageCache';

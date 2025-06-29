// 📦 Exports principaux pour toute la lib
// IDB - Cache d'images
export {
  getImageFromCache,
  saveImageToCache,
  fetchAndCacheImage,
  cleanExpiredImages,
  getCacheStats,
} from './idb';

// SWR - Cache de données Supabase
export {
  useSupabaseFetch,
  useSupabasePaginated,
  useSupabaseSingle,
  useSupabaseRealtime,
  cacheKeys,
} from './swr';

// Lazy Loading - Images paresseuses
export { LazyImage } from './lazy';

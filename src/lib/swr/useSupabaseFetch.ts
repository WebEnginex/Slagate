import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

// 📋 Types génériques pour le hook
interface UseSupabaseFetchOptions<T> extends SWRConfiguration<T> {
  refreshInterval?: number;
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  dedupingInterval?: number;
}

interface UseSupabaseFetchResult<T> extends SWRResponse<T> {
  loading: boolean;
}

/**
 * 🚀 Hook générique pour utiliser SWR avec Supabase
 * 
 * @param key - Clé unique pour le cache SWR (string ou null pour désactiver)
 * @param fetcher - Fonction qui retourne une Promise avec les données
 * @param options - Options SWR + quelques options personnalisées
 * @returns Objet avec { data, error, loading, mutate, isValidating }
 * 
 * @example
 * ```tsx
 * // Dans un composant
 * const { data: profiles, loading, error } = useSupabaseFetch(
 *   'profiles', 
 *   () => supabase.from('profiles').select('*'),
 *   { refreshInterval: 30000 }
 * );
 * ```
 */
export function useSupabaseFetch<T>(
  key: string | null,
  fetcher: () => Promise<T>,
  options: UseSupabaseFetchOptions<T> = {}
): UseSupabaseFetchResult<T> {
  // ⚙️ Configuration par défaut
  const defaultOptions: UseSupabaseFetchOptions<T> = {
    revalidateOnFocus: false, // Pas de revalidation au focus par défaut
    revalidateOnReconnect: true, // Revalider quand on se reconnecte
    dedupingInterval: 5000, // Éviter les requêtes en double pendant 5s
    refreshInterval: 0, // Pas de refresh automatique par défaut
    ...options,
  };

  // 🔄 Utilisation de SWR
  const swrResult = useSWR<T>(
    key, // Clé du cache
    key ? fetcher : null, // Fetcher seulement si key existe
    defaultOptions
  );

  // 📊 État de chargement dérivé
  const loading = !swrResult.data && !swrResult.error;

  if (swrResult.error) {
    console.error(`[SWR] Erreur pour la clé: ${key}`, swrResult.error);
  }

  return {
    ...swrResult,
    loading,
  };
}

/**
 * 🔄 Hook spécialisé pour les requêtes Supabase avec pagination
 * 
 * @param key - Clé unique pour le cache
 * @param fetcher - Fonction qui retourne une Promise avec les données paginées
 * @param options - Options SWR
 */
export function useSupabasePaginated<T>(
  key: string | null,
  fetcher: () => Promise<{ data: T[]; count: number | null }>,
  options: UseSupabaseFetchOptions<{ data: T[]; count: number | null }> = {}
): UseSupabaseFetchResult<{ data: T[]; count: number | null }> {
  return useSupabaseFetch(key, fetcher, {
    dedupingInterval: 10000, // Cache plus long pour les données paginées
    ...options,
  });
}

/**
 * 📱 Hook spécialisé pour une seule entité Supabase
 * 
 * @param key - Clé unique pour le cache
 * @param fetcher - Fonction qui retourne une Promise avec une seule entité
 * @param options - Options SWR
 */
export function useSupabaseSingle<T>(
  key: string | null,
  fetcher: () => Promise<T | null>,
  options: UseSupabaseFetchOptions<T | null> = {}
): UseSupabaseFetchResult<T | null> {
  return useSupabaseFetch(key, fetcher, {
    dedupingInterval: 30000, // Cache plus long pour une entité unique
    ...options,
  });
}

/**
 * ⚡ Hook pour les données en temps réel avec refresh automatique
 * 
 * @param key - Clé unique pour le cache
 * @param fetcher - Fonction qui retourne une Promise avec les données
 * @param refreshInterval - Intervalle de refresh en millisecondes
 * @param options - Options SWR additionnelles
 */
export function useSupabaseRealtime<T>(
  key: string | null,
  fetcher: () => Promise<T>,
  refreshInterval: number = 10000,
  options: UseSupabaseFetchOptions<T> = {}
): UseSupabaseFetchResult<T> {
  return useSupabaseFetch(key, fetcher, {
    refreshInterval,
    revalidateOnFocus: true, // Revalider au focus pour les données temps réel
    ...options,
  });
}

/**
 * 🛠️ Utilitaires pour construire des clés de cache cohérentes
 */
export const cacheKeys = {
  /**
   * Génère une clé pour une table Supabase
   */
  table: (tableName: string, filters?: Record<string, unknown>) => {
    if (!filters || Object.keys(filters).length === 0) {
      return `supabase:${tableName}`;
    }
    const filterString = Object.entries(filters)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}:${value}`)
      .join(',');
    return `supabase:${tableName}:${filterString}`;
  },

  /**
   * Génère une clé pour une entité unique
   */
  single: (tableName: string, id: string | number) => {
    return `supabase:${tableName}:${id}`;
  },

  /**
   * Génère une clé pour une requête paginée
   */
  paginated: (tableName: string, page: number, limit: number, filters?: Record<string, unknown>) => {
    const baseKey = cacheKeys.table(tableName, filters);
    return `${baseKey}:page:${page}:limit:${limit}`;
  },
};

export default useSupabaseFetch;

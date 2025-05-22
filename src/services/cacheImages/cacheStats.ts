/**
 * Service de gestion des statistiques pour le système de cache d'images
 * Permet de suivre et d'analyser les performances du cache par page
 */

// Types pour les statistiques de cache
export interface CacheStats {
  hits: number;          // Nombre d'images servies depuis le cache
  misses: number;        // Nombre d'images chargées depuis le réseau
  errors: number;        // Nombre d'erreurs rencontrées
  totalSize: number;     // Taille totale en Ko
  lastReset: number;     // Timestamp du dernier reset
}

// Structure pour stocker les statistiques par page
const pageStats: Record<string, CacheStats> = {};

// Statistiques globales (toutes pages confondues)
const globalStats: CacheStats = {
  hits: 0,
  misses: 0,
  errors: 0,
  totalSize: 0,
  lastReset: Date.now()
};

/**
 * Initialise ou réinitialise les statistiques pour une page spécifique
 * @param pageId Identifiant de la page
 * @param reset Si true, réinitialise les statistiques existantes
 */
export function initPageStats(pageId: string, reset: boolean = false): void {
  if (!pageId) return;
  
  if (!pageStats[pageId] || reset) {
    pageStats[pageId] = {
      hits: 0,
      misses: 0,
      errors: 0,
      totalSize: 0,
      lastReset: Date.now()
    };
  }
}

/**
 * Enregistre un hit de cache pour une page
 * @param pageId Identifiant de la page
 * @param sizeKb Taille de l'image en Ko (optionnel)
 */
export function recordCacheHit(pageId: string | null, sizeKb: number = 0): void {
  // Toujours mettre à jour les statistiques globales
  globalStats.hits++;
  globalStats.totalSize += sizeKb;
  
  // Si un pageId est fourni, mettre à jour les statistiques de la page
  if (pageId) {
    initPageStats(pageId);
    pageStats[pageId].hits++;
    pageStats[pageId].totalSize += sizeKb;
  }
}

/**
 * Enregistre un miss de cache pour une page
 * @param pageId Identifiant de la page
 * @param sizeKb Taille de l'image en Ko (optionnel)
 */
export function recordCacheMiss(pageId: string | null, sizeKb: number = 0): void {
  // Toujours mettre à jour les statistiques globales
  globalStats.misses++;
  globalStats.totalSize += sizeKb;
  
  // Si un pageId est fourni, mettre à jour les statistiques de la page
  if (pageId) {
    initPageStats(pageId);
    pageStats[pageId].misses++;
    pageStats[pageId].totalSize += sizeKb;
  }
}

/**
 * Enregistre une erreur de cache pour une page
 * @param pageId Identifiant de la page
 */
export function recordCacheError(pageId: string | null): void {
  // Toujours mettre à jour les statistiques globales
  globalStats.errors++;
  
  // Si un pageId est fourni, mettre à jour les statistiques de la page
  if (pageId) {
    initPageStats(pageId);
    pageStats[pageId].errors++;
  }
}

/**
 * Récupère les statistiques pour une page spécifique
 * @param pageId Identifiant de la page
 * @returns Les statistiques de la page ou undefined si la page n'existe pas
 */
export function getPageStats(pageId: string): CacheStats | undefined {
  return pageStats[pageId];
}

/**
 * Récupère les statistiques globales
 * @returns Les statistiques globales
 */
export function getGlobalStats(): CacheStats {
  return { ...globalStats };
}

/**
 * Réinitialise les statistiques d'une page spécifique
 * @param pageId Identifiant de la page
 */
export function resetPageStats(pageId: string): void {
  if (pageId) {
    initPageStats(pageId, true); // Force la réinitialisation
  }
}

/**
 * Réinitialise toutes les statistiques (globales et par page)
 */
export function resetAllStats(): void {
  // Réinitialiser les statistiques globales
  globalStats.hits = 0;
  globalStats.misses = 0;
  globalStats.errors = 0;
  globalStats.totalSize = 0;
  globalStats.lastReset = Date.now();
  
  // Réinitialiser les statistiques de chaque page
  Object.keys(pageStats).forEach(pageId => {
    resetPageStats(pageId);
  });
}

/**
 * Calcule le pourcentage de hits pour les statistiques données
 * @param stats Statistiques à analyser
 * @returns Pourcentage de hits (0-100)
 */
export function calculateHitRate(stats: CacheStats): number {
  const total = stats.hits + stats.misses;
  return total > 0 ? Math.round((stats.hits / total) * 100) : 0;
}

/**
 * Calcule le temps écoulé depuis le dernier reset
 * @param stats Statistiques à analyser
 * @returns Durée en secondes
 */
export function getStatsDuration(stats: CacheStats): number {
  return Math.round((Date.now() - stats.lastReset) / 1000);
}

/**
 * Formate les statistiques pour l'affichage
 * @param stats Statistiques à formater
 * @param pageId Identifiant de la page (optionnel)
 * @returns Chaîne formatée pour l'affichage
 */
export function formatStats(stats: CacheStats, pageId?: string): string {
  const total = stats.hits + stats.misses;
  const hitRate = calculateHitRate(stats);
  const prefix = pageId ? `[${pageId}] ` : '';
  
  const sizeMB = Math.round(stats.totalSize / 1024 * 10) / 10; // en MB avec 1 décimale
  const duration = getStatsDuration(stats);
  
  return `${prefix}Cache: ${hitRate}% hits (${stats.hits}/${total}) - ${sizeMB}MB - ${duration}s`;
}

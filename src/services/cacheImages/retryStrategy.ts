/**
 * Service pour gérer les tentatives de réessai et la récupération après erreur
 */

/**
 * Configuration par défaut pour les tentatives de réessai
 */
export interface RetryConfig {
  maxAttempts: number;  // Nombre maximal de tentatives
  baseDelay: number;    // Délai de base en ms
  maxDelay: number;     // Délai maximal en ms
  useJitter: boolean;   // Ajouter un facteur aléatoire pour éviter les tempêtes de requêtes
}

/**
 * Configuration par défaut
 */
export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  baseDelay: 300,
  maxDelay: 5000,
  useJitter: true
};

/**
 * Fonction pour calculer le délai avant le prochain essai (backoff exponentiel)
 * @param attempt Numéro de tentative actuelle (commence à 1)
 * @param config Configuration des réessais
 * @returns Délai en ms avant le prochain essai
 */
export const calculateBackoff = (attempt: number, config: RetryConfig = DEFAULT_RETRY_CONFIG): number => {
  const { baseDelay, maxDelay, useJitter } = config;
  
  // Calcul du délai exponentiel (2^n * baseDelay)
  let delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
  
  // Ajouter un facteur aléatoire (jitter) pour éviter les tempêtes de requêtes
  if (useJitter) {
    // Ajouter un jitter de +/- 25%
    const jitter = delay * 0.25;
    delay = delay - jitter + (Math.random() * jitter * 2);
  }
  
  return Math.floor(delay);
};

/**
 * Exécute une fonction avec une stratégie de réessai
 * @param fn Fonction à exécuter qui renvoie une promesse
 * @param config Configuration des réessais
 * @returns Résultat de la fonction
 * @throws Erreur si toutes les tentatives échouent
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Si c'est la dernière tentative, ne pas attendre
      if (attempt >= config.maxAttempts) {
        break;
      }
      
      // Calculer le délai avant le prochain essai
      const delay = calculateBackoff(attempt, config);
      
      // Attendre avant de réessayer
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError || new Error('Toutes les tentatives ont échoué');
}

# Documentation du système de cache d'images avec Worker

## Vue d'ensemble

Le système de cache d'images utilise un Web Worker et IndexedDB pour stocker et récupérer efficacement les images, tout en évitant de bloquer l'interface utilisateur. Cette architecture permet un chargement rapide des pages, une utilisation hors ligne, et une interface fluide.

## Architecture du système
<img alt="Architecture du système" src="https://via.placeholder.com/800x400?text=Architecture+du+système+de+cache+d'images">

## Composants principaux

### 1. Worker (BuildWorker.ts)
**Rôle**: Gère toutes les opérations IndexedDB dans un thread séparé.

**Fonctionnalités principales**:
- Stockage et récupération d'images dans IndexedDB
- Téléchargement des images manquantes
- Gestion des statistiques de cache par page
- Contrôle détaillé des logs

**Types de messages acceptés**:
- `getImage`: Récupère une image (du cache ou télécharge)
- `checkAccess`: Vérifie la disponibilité d'IndexedDB
- `setLogLevel`: Configure le niveau de verbosité des logs
- `resetStats`: Réinitialise les statistiques de cache

### 2. Services de cache (services/cacheImages)

#### chargeurImages.ts
**Rôle**: Interface principale entre l'application et le Worker.

**Fonctions clés**:
- `fetchImageFromWorker`: Récupère une image via le Worker
- `setLogLevel`: Configure le niveau de détail des logs
- `getImageWorker`: Fournit une instance persistante du Worker

#### pageImageLoader.ts
**Rôle**: Simplifie l'utilisation du cache avec contexte de page.

**Fonctions clés**:
- `loadPageImage`: Charge une image avec identifiant de page
- `loadPageImageAsBase64`: Charge et convertit une image en base64
- `preloadPageImages`: Précharge un lot d'images pour une page

#### blobUrlManager.ts
**Rôle**: Gère les URL Blob pour éviter les fuites mémoire.

**Fonctions clés**:
- `createTrackedBlobUrl`: Crée une URL Blob suivie
- `revokeBlobUrl`: Libère une URL spécifique
- `revokeAllBlobUrls`: Nettoie toutes les URLs en fin de session

#### retryStrategy.ts
**Rôle**: Implémente des stratégies de réessai robustes.

**Fonctions clés**:
- `withRetry`: Exécute une fonction avec réessais automatiques
- `DEFAULT_RETRY_CONFIG`: Configuration par défaut (backoff exponentiel)

## Flux de données

1. **Demande d'image**:
   - Un composant appelle `loadPageImage(url, pageId)`
   - Le service transmet la demande au Worker avec le contexte de page

2. **Traitement par le Worker**:
   - Vérifie si l'image existe dans IndexedDB
   - Si présente: retourne l'image depuis le cache (hit)
   - Si absente: télécharge l'image, la stocke, puis la retourne (miss)

3. **Réception de l'image**:
   - L'image est convertie en URL Blob ou base64
   - Le composant affiche l'image
   - Les statistiques sont mises à jour

## Gestion du contexte de page

Le système utilise un identifiant de page (`PAGE_ID`) pour:
- Regrouper les logs par page
- Calculer des statistiques spécifiques par page
- Optimiser le préchargement d'images similaires

## Contrôle des logs

Trois niveaux de logs sont disponibles:
- `none`: Aucun log (production)
- `minimal`: Statistiques agrégées uniquement (par défaut)
- `verbose`: Logs détaillés pour chaque opération (débogage)

Le niveau peut être changé via le panneau `LogSettingsPanel` disponible en mode développement.

## Utilisation dans les composants

```jsx
// 1. Définir un identifiant unique pour la page
const PAGE_ID = "MaPage";

// 2. Charger une image individuelle
const CachedImage = ({ src, alt, ...props }) => {
  const [imageSrc, setImageSrc] = useState("");
  
  useEffect(() => {
    loadPageImage(src, PAGE_ID)
      .then(url => setImageSrc(url))
      .catch(() => setImageSrc(src));
  }, [src]);
  
  return <img src={imageSrc || src} alt={alt} {...props} />;
};

// 3. Précharger un lot d'images
useEffect(() => {
  if (imageUrls.length > 0) {
    preloadPageImages(imageUrls, PAGE_ID);
  }
}, [imageUrls]);
```

## Gestion des erreurs

Le système est conçu pour être robuste:
- Réessais automatiques avec backoff exponentiel
- Fallback vers les URLs originales en cas d'échec
- Détection des problèmes d'IndexedDB
- Libération automatique des ressources
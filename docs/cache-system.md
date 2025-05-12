# Système de Cache d'Images Amélioré

## Résumé des changements

1. Les images sont désormais conservées indéfiniment dans le cache IndexedDB, au lieu d'expirer après 7 jours.
   
2. Un nouveau système d'invalidation sélective a été ajouté pour permettre:
   - L'invalidation d'une image spécifique pour forcer son rechargement
   - La suppression directe d'une image du cache
   - La mise à jour forcée d'une image dans le cache

3. De nouvelles fonctions utilitaires ont été ajoutées dans `imageCacheControl.ts`:
   - `invalidateImageInCache(imageUrl)`: Marque une image pour être rechargée à sa prochaine utilisation
   - `removeImageFromCache(imageUrl)`: Supprime immédiatement une image du cache 
   - `updateImageInCache(imageUrl)`: Force le téléchargement et la mise à jour immédiate d'une image

## Comment utiliser le nouveau système

### Pour les images qui changent rarement ou jamais

La plupart des images seront maintenant téléchargées une seule fois et resteront dans le cache indéfiniment. Aucune action particulière n'est nécessaire, le système fonctionne automatiquement.

### Pour les images qui sont mises à jour périodiquement

Lorsqu'une image est mise à jour sur le serveur, vous pouvez:

```typescript
import { invalidateImageInCache } from '../utils/imageCacheControl';

// Option 1: Invalider l'image (sera rechargée à sa prochaine utilisation)
invalidateImageInCache('/chemin/vers/image.webp');

// Option 2: Forcer une mise à jour immédiate de l'image
import { updateImageInCache } from '../utils/imageCacheControl';
updateImageInCache('/chemin/vers/image.webp');
```

### Déboguer le cache

Pour afficher des statistiques sur le cache:

```typescript
import { showCacheDebugInfo } from '../utils/imageCacheControl';
showCacheDebugInfo();
```

### Réinitialisation complète du cache

La fonction existante `resetAllCaches()` dans `clearCache.ts` continue de fonctionner comme avant et peut être utilisée pour réinitialiser complètement le cache si nécessaire.

## Avantages

1. **Réduction du trafic réseau**: Les images ne sont téléchargées qu'une seule fois, sauf si elles sont explicitement invalidées.
   
2. **Chargement plus rapide**: Les utilisateurs récurrents bénéficient d'un chargement quasi-instantané des images.
   
3. **Contrôle précis**: Possibilité d'invalider ou de mettre à jour des images spécifiques sans affecter le reste du cache.
   
4. **Économie de bande passante**: Réduit la consommation de données pour les utilisateurs mobiles.

## Mise en œuvre technique

Le système utilise IndexedDB pour stocker les images sous forme de Blobs, avec un système de clés simplifié basé sur le nom du fichier. L'expiration du cache a été supprimée, et un mécanisme d'invalidation sélective a été mis en place via l'objet `INVALID_IMAGES`.

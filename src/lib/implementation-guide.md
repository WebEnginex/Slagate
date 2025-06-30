
# ✅ Guide d'implémentation pour les pages – Slagate

## 🎯 Objectif

Ce guide décrit les étapes nécessaires pour intégrer :

- le cache d’images via **IndexedDB**
- le chargement d’images via **Lazy Loading**
- la récupération de données via **SWR**

Objectif : **limiter les requêtes et chargements inutiles**, optimiser les performances, et uniformiser l’implémentation dans tout le site.

---

## 1. 🗂 IndexedDB (IDB)

### 📌 Utilisation
Utiliser le module `@/lib/idb/imageCache` pour gérer la mise en cache locale des images.

### ✅ Fonctions disponibles :
- `fetchAndCacheImage(imageUrl: string)` : retourne une URL locale (cache ou téléchargement)
- `getImageFromCache(imageUrl: string)` : retourne le blob depuis IndexedDB
- `saveImageToCache(imageUrl: string, blob: Blob)` : stocke une image manuellement

### ⚠️ Important
Ne pas utiliser `fetchAndCacheImage` avec `LazyImage` sur la même image — ce composant gère déjà le lazy loading.

### 🧪 Exemple
```ts
import { fetchAndCacheImage } from '@/lib/idb/imageCache';

const cachedUrl = await fetchAndCacheImage('https://example.com/image.png');
```

---

## 2. 🖼 Lazy Loading d’images

### 📌 Utilisation
Utiliser le composant `LazyImage` situé dans `@/lib/lazy/LazyImage`.  
Il repose sur `react-intersection-observer` pour ne charger l’image **que lorsqu’elle est visible**.

### ✅ Props disponibles :
- `src` : URL de l’image
- `alt` : Texte alternatif
- `fallbackClassName` : classes CSS pour l’espace réservé
- `showSpinner` : spinner animé pendant le chargement
- `onError` *(optionnel)* : fallback personnalisé

### 🧪 Exemple
```tsx
import LazyImage from '@/lib/lazy';

<LazyImage
  src="https://example.com/image.png"
  alt="Image"
  fallbackClassName="bg-gray-800"
  showSpinner={true}
  onError={() => console.warn("Image introuvable")}
/>
```

---

## 3. 🔁 SWR – Requêtes conditionnelles

### 📌 Utilisation
Utiliser le hook `useSupabaseFetch` depuis `@/lib/swr`.

> Ce hook encapsule `useSWR` avec une clé conditionnelle et un fetcher async.

### ✅ Fonctionnalités :
- Mise en cache automatique
- Revalidation en arrière-plan
- Déclenchement conditionnel via `null` en clé

### 🧪 Exemple de base
```ts
import { useSupabaseFetch } from '@/lib';

const { data, error } = useSupabaseFetch('supabase:chasseurs', async () => {
  const { data } = await supabase.from('chasseurs').select('*');
  return data;
});
```

### 🧪 Exemple conditionnel (si onglet ouvert)
```ts
const isOngletOuvert = ongletActif === chasseur.id;

const { data: build } = useSupabaseFetch(
  isOngletOuvert ? `supabase:build:${chasseur.id}` : null,
  async () => {
    const { data } = await supabase.from('builds').select('*').eq('chasseur_id', chasseur.id);
    return data;
  }
);
```

---

## 4. ⏳ Spinner personnalisé

### 📌 Utilisation
Composant Tailwind stylé compatible avec `LazyImage`.

### 🧪 Exemple
```tsx
const Spinner = ({ className = '' }) => (
  <div className={`animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 ${className}`}>
    <span className="sr-only">Chargement…</span>
  </div>
);

<Spinner className="w-8 h-8" />
```

---

## 5. 👁 Chargement d’un build uniquement si affiché

### 📌 Utilisation
Encapsule les images et la requête dans une condition liée à l’état de l’onglet.

### 🧪 Exemple :
```tsx
{isOngletOuvert && (
  <LazyImage
    src={artefact.image}
    alt={artefact.nom}
    fallbackClassName="bg-gray-800"
    showSpinner={true}
  />
)}
```

---

## 6. 📦 Intégration standard

### ✅ Étapes à suivre
1. **Importer les modules depuis `@/lib`** :
```ts
import { fetchAndCacheImage, useSupabaseFetch } from '@/lib';
import LazyImage from '@/lib/lazy';
```

2. **Remplacer tous les `<img>` par `<LazyImage>`**

3. **Remplacer les `useEffect` par `useSupabaseFetch`**

4. **Limiter les requêtes aux éléments visibles**  
   → ne pas fetch tant que l’onglet n’est pas actif (`key = null`)

5. **Ne pas utiliser `fetchAndCacheImage` avec `LazyImage` pour la même image**

---

## 7. 🧩 Exemple complet

```tsx
import LazyImage from '@/lib/lazy';
import { useSupabaseFetch } from '@/lib';

const BuildsChasseur = ({ chasseurId, isOngletOuvert }) => {
  const { data: build } = useSupabaseFetch(
    isOngletOuvert ? `supabase:build:${chasseurId}` : null,
    async () => {
      const { data } = await supabase
        .from('builds')
        .select('id, artefacts(image, nom)')
        .eq('chasseur_id', chasseurId)
        .single();
      return data;
    }
  );

  if (!isOngletOuvert || !build) return null;

  return (
    <div className="space-y-4">
      {build.artefacts?.map((artefact) => (
        <LazyImage
          key={artefact.nom}
          src={artefact.image}
          alt={artefact.nom}
          fallbackClassName="bg-gray-800"
          showSpinner={true}
        />
      ))}
    </div>
  );
};

export default BuildsChasseur;
```

---

## ✅ Résultat final

| Composant             | Fonction                            |
|-----------------------|-------------------------------------|
| `LazyImage.tsx`       | Lazy loading + spinner intégré      |
| `useSupabaseFetch.ts` | Requêtes conditionnelles optimisées |
| `imageCache.ts`       | Cache IndexedDB (hors lazy)         |
| `index.ts`            | Centralise tous les imports         |

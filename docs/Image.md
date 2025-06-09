# Composant Image avec gestion des états de chargement

Ce composant Image personnalisé optimise l'expérience utilisateur en remplaçant les placeholders par défaut du navigateur par des effets de chargement professionnels.

## Fonctionnalités

- **Mise en cache** : utilise le système de cache d'images existant pour un chargement optimal
- **Skeleton UI** : affiche un placeholder gris pendant le chargement
- **Animation Shimmer** : ajoute un effet de brillance qui traverse le placeholder
- **Transition en fondu** : fait apparaître l'image en douceur une fois chargée
- **Effet de flou** : option pour appliquer un effet de flou qui se dissipe lors du chargement
- **Gestion des erreurs** : affiche un message si l'image ne peut pas être chargée (désactivable)
- **Timeout automatique** : évite les états de chargement infinis
- **Contrôle des messages d'erreur** : option pour masquer les messages d'erreur si nécessaire

## Utilisation

```tsx
import { Image } from "@/components/ui/Image";

// Utilisation basique
<Image 
  src="/chemin/vers/image.webp" 
  alt="Description de l'image" 
/>

// Avec toutes les options
<Image 
  src="/chemin/vers/image.webp" 
  alt="Description de l'image"
  pageId="NomDeLaPage"   // Pour le suivi dans les logs
  skeleton={true}        // Activer l'effet de placeholder (défaut: true)
  shimmer={true}         // Activer l'effet de brillance (défaut: true)
  blur={true}            // Activer l'effet de flou lors du chargement (défaut: false)
  showErrorMessage={true} // Afficher ou non le message d'erreur (défaut: true)
  className="w-32 h-32 rounded-full" // Classes Tailwind supplémentaires
/>
```

## Comparaison

### Avant
- Chargement par défaut du navigateur
- Emplacement vide jusqu'au chargement complet
- Changement brutal lors de l'affichage

### Après
- Placeholder visuel immédiat
- Animation pendant le chargement
- Transition en douceur lors de l'affichage
- Expérience visuelle professionnelle

## Intégration

Le composant est conçu pour fonctionner avec le système de cache d'images existant et s'intègre avec Tailwind CSS.

Vous pouvez le personnaliser selon vos besoins en modifiant les propriétés ou en étendant les classes CSS dans le composant.

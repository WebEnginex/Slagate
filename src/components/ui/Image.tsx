import * as React from "react";
import { cn } from '@/lib/utils';
import { loadPageImage } from '@/services/cacheImages/pageImageLoader';
import { loadVisibleImage } from '@/services/cacheImages/imageQueue';

export interface ImageProps {
  src: string;
  alt: string;
  pageId?: string;
  className?: string;
  skeleton?: boolean; // Activer/désactiver l'effet squelette pendant le chargement
  shimmer?: boolean; // Activer/désactiver l'effet shimmer pendant le chargement
  blur?: boolean; // Activer l'effet de flou au chargement
  showErrorMessage?: boolean; // Afficher ou non le message d'erreur si l'image ne charge pas
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  onClick?: () => void; // Ajout de la propriété onClick
  maxRetries?: number; // Nombre maximal de tentatives de chargement en cas d'erreur
  // Autres propriétés HTML de l'élément img que nous voulons supporter
  width?: number | string;
  height?: number | string;
  loading?: "lazy" | "eager";
  style?: React.CSSProperties;
  draggable?: boolean;
  id?: string;
}

/**
 * Composant Image amélioré avec gestion des états de chargement
 * 
 * Supporte:
 * - Chargement via le cache d'images
 * - État squelette pendant le chargement
 * - Animation shimmer pendant le chargement
 * - Transition en fondu lors de l'affichage
 * - Affichage conditionnel des messages d'erreur
 * - Timeout automatique pour éviter les chargements infinis
 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(({ 
  src, 
  alt, 
  pageId = "global", 
  className, 
  skeleton = true, 
  shimmer = true,
  blur = false,
  showErrorMessage = true,
  onLoad: externalOnLoad,
  onError: externalOnError,
  onClick,
  maxRetries = 2,
  ...imgProps 
}, ref) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [cachedSrc, setCachedSrc] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);
  const [retryCount, setRetryCount] = React.useState(0);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    React.useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setError(true);
      return;
    }

    // Ne pas réinitialiser complètement l'état si la seule différence est un paramètre de cache-busting
    // Cela évite le clignotement inutile quand l'URL de base reste la même
    const baseUrl = src.split('?')[0];
    const prevBaseUrl = cachedSrc?.split('?')[0];
    
    // Réinitialiser les états seulement si l'URL de base change ou si l'image était en erreur
    if (baseUrl !== prevBaseUrl || error) {
      setIsLoading(true);
      setError(false);
      
      // Réinitialiser les tentatives uniquement si l'URL de base change vraiment
      if (baseUrl !== prevBaseUrl) {
        setRetryCount(0);
      }
    }
    
    // Ajouter un timeout pour éviter que l'image reste indéfiniment en état de chargement
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 15000); // 15 secondes maximum pour le chargement
    
    const loadImg = async () => {
      try {
        // Ne jamais ajouter de paramètre de timestamp ici pour éviter les clignotements
        const urlToLoad = src;
        
        // Utiliser la file d'attente pour charger l'image avec priorité visible
        const cachedUrl = await loadVisibleImage(urlToLoad, pageId);
        
        if (cachedUrl) {
          setCachedSrc(cachedUrl);
          setIsLoading(false);
        } else {
          // Si pas d'URL en cache, utiliser l'URL d'origine sans paramètres
          setCachedSrc(urlToLoad);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(`Erreur lors du chargement de l'image ${src}:`, err);
        setCachedSrc(src); // Fallback à l'URL originale
        setIsLoading(false);
      }
    };
    
    loadImg();
    
    // Nettoyage du timeout si le composant est démonté ou si src change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [src, pageId, error, cachedSrc]);// Gérer l'événement onLoad pour s'assurer que l'image est bien chargée  // Gérer l'événement onLoad pour s'assurer que l'image est bien chargée
  const handleImageLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
    setIsLoading(false);
    setError(false); // S'assurer que l'état d'erreur est réinitialisé lorsque l'image charge correctement
    setRetryCount(0); // Réinitialiser le compteur de tentatives lorsque l'image charge correctement
    
    // Appeler le gestionnaire externe s'il existe
    if (externalOnLoad) externalOnLoad(e);
    
    // Vérifier si l'image a réellement une taille valide
    const img = e.target as HTMLImageElement;
    if (img.naturalWidth === 0 || img.naturalHeight === 0) {
      // L'image n'a pas de dimensions réelles, donc elle n'est pas vraiment chargée
      console.warn(`Image sans dimensions: ${src}`);
      if (retryCount < maxRetries) {
        console.log(`Tentative de rechargement de l'image sans dimensions (${retryCount + 1}/${maxRetries})...`);
        setRetryCount(prevCount => prevCount + 1);
        setIsLoading(true);
        
        // Utiliser l'URL originale sans paramètres de timestamp pour éviter le clignotement
        setCachedSrc(src);
      } else {
        setError(true);
        console.error(`Image invalide après ${maxRetries} tentatives: ${src}`);
      }
    }
  };  // Gérer les erreurs de chargement d'image
  const handleImageError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    console.warn(`Erreur de chargement d'image: ${src}`);
    
    // Vérifier si l'URL est vide
    if (!src || src === '') {
      setError(true);
      setIsLoading(false);
      if (externalOnError) externalOnError(e);
      return;
    }
    
    // Tenter de recharger l'image si nous n'avons pas atteint le nombre maximal de tentatives
    if (retryCount < maxRetries) {
      console.log(`Tentative de rechargement de l'image (${retryCount + 1}/${maxRetries})...`);
      setRetryCount(prevCount => prevCount + 1);
      setIsLoading(true);
      
      // Utiliser un timeout pour éviter des rechargements trop rapides qui causent du clignotement
      setTimeout(() => {
        // Utiliser l'URL originale sans paramètres supplémentaires
        setCachedSrc(src);
      }, 1000); // Délai plus long pour stabiliser le chargement
    } else {
      setError(true);
      setIsLoading(false);
      console.error(`Échec définitif du chargement de l'image après ${maxRetries} tentatives: ${src}`);
      
      // Appeler le gestionnaire externe s'il existe
      if (externalOnError) externalOnError(e);
    }
  };return (
    <div className={cn(
      "relative overflow-hidden",
      className
    )}>
      {/* État de chargement simplifié - suppression de l'animation shimmer qui cause du clignotement */}
      {isLoading && skeleton && (
        <div 
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-muted/30", // Réduit l'opacité pour moins de contraste visuel pendant les transitions
            "rounded-[inherit]"
          )}
        />
      )}
      
      {/* Image réelle avec meilleure gestion de l'opacité */}
      <img
        ref={ref}
        src={cachedSrc || src}
        alt={alt}
        className={cn(
          "w-full h-full",
          // Transition plus douce pour éviter le clignotement
          "transition-all duration-300",
          // Commencer avec une légère opacité même pendant le chargement plutôt que complètement transparent
          isLoading ? "opacity-60" : "opacity-100",
          error && showErrorMessage ? "opacity-40" : "",
          blur && !isLoading && !error && "animate-blur-in"
        )}
        onLoad={handleImageLoad}
        onError={handleImageError}
        onClick={onClick}
        width={imgProps.width}
        height={imgProps.height}
        loading={imgProps.loading || "lazy"} // Privilégier le lazy loading par défaut
        style={imgProps.style}
        draggable={imgProps.draggable}
        id={imgProps.id}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        data-page-id={pageId}
        data-cached-image="true"
      />

      {/* État d'erreur - uniquement affiché si pas en chargement et showErrorMessage=true */}
      {error && !isLoading && showErrorMessage && (!src || retryCount >= maxRetries) && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/30 rounded-[inherit]">
          <span className="text-muted-foreground text-xs">Image non disponible</span>
        </div>
      )}
    </div>
  );
});

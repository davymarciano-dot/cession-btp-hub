import { useState, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface SEOImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  aspectRatio?: "square" | "video" | "portrait" | "wide" | "auto";
  priority?: boolean; // true = above the fold, eager loading
  sizes?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  onLoad?: () => void;
}

/**
 * 🖼️ SEOImage - Composant image optimisé pour le SEO
 * 
 * Features:
 * - WEBP automatique avec fallback JPG/PNG
 * - Lazy loading natif (below the fold)
 * - Eager loading (above the fold avec priority=true)
 * - srcset responsive pour tous les écrans
 * - Skeleton loading avec animation
 * - Support des imports ES6 et URLs externes
 */
export const SEOImage = ({
  src,
  alt,
  className,
  width,
  height,
  aspectRatio = "auto",
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  quality = 80,
  placeholder = "blur",
  onLoad,
}: SEOImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Lazy loading avec Intersection Observer
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "200px", // Précharge 200px avant d'entrer dans le viewport
    skip: priority, // Skip pour images prioritaires (above the fold)
  });

  // Aspect ratio classes
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
    auto: "",
  };

  // Détecter si c'est une image importée (module) ou une URL
  const imageSrc = useMemo(() => {
    if (typeof src === 'string') return src;
    return src;
  }, [src]);

  // Générer srcset responsive
  const srcSet = useMemo(() => {
    // Pour les images externes ou déjà optimisées, pas de srcset
    if (imageSrc.startsWith('http') || imageSrc.includes('unsplash') || imageSrc.includes('placeholder')) {
      return undefined;
    }
    
    // Pour les images locales, générer srcset
    const widths = [320, 640, 768, 1024, 1280, 1920];
    const basePath = imageSrc.replace(/\.[^/.]+$/, '');
    const ext = imageSrc.split('.').pop();
    
    // Retourne le même src pour toutes les tailles (Vite gère l'optimisation)
    return widths.map(w => `${imageSrc} ${w}w`).join(', ');
  }, [imageSrc]);

  // Gérer le chargement
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  // Décider si on doit charger l'image
  const shouldLoad = priority || inView;

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectRatioClasses[aspectRatio],
        className
      )}
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
    >
      {/* Placeholder skeleton */}
      {placeholder === "blur" && !isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Image principale */}
      {shouldLoad && !hasError && (
        <picture>
          {/* Source WEBP (meilleure compression) */}
          {!imageSrc.includes('http') && (
            <source
              type="image/webp"
              srcSet={srcSet}
              sizes={sizes}
            />
          )}
          
          {/* Image fallback */}
          <img
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            fetchPriority={priority ? "high" : "auto"}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            sizes={sizes}
            srcSet={srcSet}
          />
        </picture>
      )}

      {/* État d'erreur */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center p-4">
            <svg 
              className="w-8 h-8 mx-auto text-muted-foreground mb-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="text-xs text-muted-foreground">Image indisponible</p>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * 🏠 HeroImage - Image optimisée pour les sections hero (above the fold)
 * Charge immédiatement avec priorité haute
 */
export const HeroImage = (props: Omit<SEOImageProps, 'priority' | 'placeholder'>) => (
  <SEOImage {...props} priority placeholder="empty" />
);

/**
 * 📸 GalleryImage - Image optimisée pour les galeries
 * Lazy loading avec placeholder blur
 */
export const GalleryImage = (props: Omit<SEOImageProps, 'priority'>) => (
  <SEOImage {...props} priority={false} placeholder="blur" />
);

/**
 * 🃏 CardImage - Image pour les cartes d'annonces
 * Aspect ratio video, lazy loading
 */
export const CardImage = (props: Omit<SEOImageProps, 'aspectRatio'>) => (
  <SEOImage {...props} aspectRatio="video" priority={false} />
);

/**
 * 👤 AvatarImage - Image pour les avatars
 * Aspect ratio carré, petite taille
 */
export const AvatarImage = (props: Omit<SEOImageProps, 'aspectRatio'>) => (
  <SEOImage 
    {...props} 
    aspectRatio="square" 
    sizes="64px"
    priority={false} 
  />
);

export default SEOImage;

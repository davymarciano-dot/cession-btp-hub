import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface AdvancedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "auto";
  priority?: boolean; // Pour images above-the-fold
  sizes?: string; // Responsive sizes
}

/**
 * 🖼️ COMPOSANT IMAGE ULTRA-OPTIMISÉ
 * Features:
 * - Lazy loading natif
 * - Blur placeholder (LQIP)
 * - Support AVIF/WebP avec fallback
 * - Responsive srcset automatique
 * - Skeleton loading
 */

export const AdvancedImage = ({
  src,
  alt,
  className,
  aspectRatio = "video",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: AdvancedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>("");
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    skip: priority, // Skip intersection observer pour images prioritaires
  });

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    auto: "",
  }[aspectRatio];

  // Générer les URLs pour srcset (WebP + AVIF)
  const generateSrcSet = (baseSrc: string) => {
    const basename = baseSrc.split('/').pop()?.split('.')[0] || '';
    const sizes = [320, 640, 768, 1024, 1920];
    
    const webpSrcset = sizes
      .map(w => `/images/optimized/${basename}-${w}w.webp ${w}w`)
      .join(', ');
    
    const avifSrcset = sizes
      .map(w => `/images/optimized/${basename}-${w}w.avif ${w}w`)
      .join(', ');
    
    return { webpSrcset, avifSrcset };
  };

  const { webpSrcset, avifSrcset } = generateSrcSet(src);
  const placeholderSrc = `/images/optimized/${src.split('/').pop()?.split('.')[0]}-placeholder.webp`;

  useEffect(() => {
    // Charger l'image seulement si elle est dans le viewport (ou prioritaire)
    if (priority || inView) {
      setCurrentSrc(src);
    }
  }, [inView, priority, src]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectRatioClass,
        className
      )}
    >
      {/* Blur placeholder (LQIP) */}
      {!isLoaded && !hasError && (
        <img
          src={placeholderSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
          aria-hidden="true"
        />
      )}
      
      {/* Image principale avec srcset moderne */}
      {(priority || inView) && !hasError && (
        <picture>
          {/* AVIF (meilleur compression) */}
          <source
            type="image/avif"
            srcSet={avifSrcset}
            sizes={sizes}
          />
          
          {/* WebP (bon support) */}
          <source
            type="image/webp"
            srcSet={webpSrcset}
            sizes={sizes}
          />
          
          {/* Fallback original */}
          <img
            src={currentSrc}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-500",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            sizes={sizes}
          />
        </picture>
      )}
      
      {/* Fallback en cas d'erreur */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <p className="text-sm text-muted-foreground">Image indisponible</p>
        </div>
      )}
      
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
      )}
    </div>
  );
};

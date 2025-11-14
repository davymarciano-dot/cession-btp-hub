import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait";
  fallback?: React.ReactNode;
}

export const OptimizedImage = ({
  src,
  alt,
  className,
  aspectRatio,
  fallback,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  }[aspectRatio || "video"];

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectRatioClass,
        className
      )}
    >
      {!inView ? (
        <Skeleton className="absolute inset-0" />
      ) : hasError ? (
        fallback || (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <p className="text-sm text-muted-foreground">Image indisponible</p>
          </div>
        )
      ) : (
        <>
          {!isLoaded && <Skeleton className="absolute inset-0" />}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
          />
        </>
      )}
    </div>
  );
};
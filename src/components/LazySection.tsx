import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  threshold?: number;
}

/**
 * Lazy section component that only renders children when in viewport
 * Useful for heavy components below the fold
 */
export const LazySection = ({
  children,
  fallback,
  className,
  threshold = 0.1,
}: LazySectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
  });

  return (
    <div ref={ref} className={className}>
      {inView ? (
        children
      ) : (
        fallback || (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        )
      )}
    </div>
  );
};
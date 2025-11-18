import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedGradientProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "orange" | "mesh";
}

export const AnimatedGradient = ({ 
  children, 
  className, 
  variant = "primary" 
}: AnimatedGradientProps) => {
  const gradientClasses = {
    primary: "bg-gradient-to-br from-primary via-primary-600 to-primary-800",
    orange: "bg-gradient-to-br from-secondary via-secondary-600 to-secondary-800",
    mesh: "bg-[image:var(--gradient-mesh)]"
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className={cn(
        "absolute inset-0 opacity-90",
        gradientClasses[variant]
      )}>
        {/* Animated overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

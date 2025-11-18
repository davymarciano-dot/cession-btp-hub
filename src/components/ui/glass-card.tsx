import { cn } from "@/lib/utils";
import { ReactNode, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const GlassCard = ({ children, className, hover = true, glow = false, ...props }: GlassCardProps) => {
  return (
    <div
      {...props}
      className={cn(
        "backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6",
        "shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",
        hover && "transition-all duration-300 hover:bg-white/20 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] hover:scale-105",
        glow && "animate-glow",
        className
      )}
    >
      {children}
    </div>
  );
};

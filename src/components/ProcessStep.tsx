import { Badge } from "@/components/ui/badge";

interface ProcessStepProps {
  number: number;
  badge: string;
  title: string;
  description: string;
  isLast?: boolean;
}

const ProcessStep = ({ number, badge, title, description, isLast }: ProcessStepProps) => {
  return (
    <div className="relative pl-24 group animate-fade-in mb-12" style={{ animationDelay: `${number * 0.1}s` }}>
      {/* Animated connecting line */}
      {!isLast && (
        <div className="absolute left-12 top-20 bottom-0 w-0.5 overflow-hidden">
          <div className="h-full bg-gradient-to-b from-primary via-secondary to-transparent opacity-30 group-hover:opacity-60 transition-opacity"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent animate-shimmer"></div>
        </div>
      )}
      
      {/* Premium number circle with glow */}
      <div className="absolute left-0 top-0 w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-heading font-black text-white transform group-hover:scale-110 transition-all duration-300 shadow-[0_20px_60px_hsl(262_100%_70%/0.4)] group-hover:shadow-[0_20px_80px_hsl(262_100%_70%/0.6)]">
        <span className="relative z-10">{number}</span>
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-3xl"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
      </div>
      
      {/* Content card with modern styling */}
      <div className="pb-4 ml-8">
        <Badge className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-primary/20 mb-3 shadow-sm hover:shadow-md transition-shadow font-semibold">
          {badge}
        </Badge>
        <h3 className="text-3xl font-heading font-bold mb-3 text-foreground group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent transition-all">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-lg">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep;

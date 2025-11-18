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
    <div className="relative pl-20 group animate-slide-up" style={{ animationDelay: `${number * 0.1}s` }}>
      {/* Animated Line connecting steps */}
      {!isLast && (
        <div className="absolute left-8 top-16 bottom-0 w-1 bg-gradient-to-b from-primary via-primary-400 to-transparent -translate-x-1/2 opacity-30 group-hover:opacity-60 transition-opacity">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent animate-shimmer"></div>
        </div>
      )}
      
      {/* Enhanced Circle with number and glow effect */}
      <div className="absolute left-0 top-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-700 text-white flex items-center justify-center text-2xl font-bold shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all animate-glow">
        <span className="relative z-10">{number}</span>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
      </div>
      
      {/* Content with enhanced styling */}
      <div className="pb-16 backdrop-blur-sm">
        <Badge className="bg-gradient-to-r from-secondary to-secondary-600 text-white border-0 mb-3 shadow-md hover:shadow-lg transition-shadow">
          {badge}
        </Badge>
        <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep;

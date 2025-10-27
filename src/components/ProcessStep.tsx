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
    <div className="relative pl-12">
      {/* Line connecting steps */}
      {!isLast && (
        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />
      )}
      
      {/* Circle with number */}
      <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shadow-lg">
        {number}
      </div>
      
      {/* Content */}
      <div className="pb-12">
        <Badge className="bg-secondary text-white mb-2">{badge}</Badge>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep;

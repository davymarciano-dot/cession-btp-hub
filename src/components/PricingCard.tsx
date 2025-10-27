import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  variant?: "default" | "primary";
}

const PricingCard = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  isPopular,
  variant = "default",
}: PricingCardProps) => {
  const isPrimary = variant === "primary" || isPopular;
  
  return (
    <div className={`rounded-xl p-8 ${isPrimary ? 'border-2 border-primary shadow-lg' : 'border border-border'} bg-card relative hover:shadow-xl transition-all duration-300`}>
      {isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white">
          POPULAIRE
        </Badge>
      )}
      
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      
      <div className="mb-4">
        <span className="text-4xl font-bold text-primary">{price}</span>
        {period && <span className="text-muted-foreground ml-2">{period}</span>}
      </div>
      
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        className={`w-full ${isPrimary ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-secondary hover:bg-secondary/90 text-white'}`}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;

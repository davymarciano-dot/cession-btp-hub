import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { analyticsEvents } from "@/lib/analytics";

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  variant?: "default" | "primary";
  userType?: "vendeur" | "acheteur";
  isHovered?: boolean;
  onHover?: (hovered: boolean) => void;
  anyCardHovered?: boolean;
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
  userType = "acheteur",
  isHovered = false,
  onHover,
  anyCardHovered = false,
}: PricingCardProps) => {
  const isPrimary = variant === "primary" || isPopular;
  
  const handleClick = () => {
    analyticsEvents.selectSubscription(title, userType);
  };
  
  const handleMouseEnter = () => {
    onHover?.(true);
  };
  
  const handleMouseLeave = () => {
    onHover?.(false);
  };
  
  // Déterminer si cette carte doit avoir le style "actif" (contour bleu + bouton bleu)
  // - Si cette carte est survolée → active
  // - Si c'est la carte populaire ET qu'aucune autre carte n'est survolée → active
  // - Sinon → pas active
  const isActive = isHovered || (isPrimary && !anyCardHovered && !isHovered);
  
  return (
    <div 
      className={`h-full flex flex-col rounded-2xl p-8 ${
        isActive
          ? 'border-2 border-blue-500 shadow-xl scale-[1.02]' 
          : 'border-2 border-slate-200'
      } bg-card relative transition-all duration-300`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white">
          POPULAIRE
        </Badge>
      )}
      
      {/* Header - hauteur fixe */}
      <div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        
        <div className="mb-4">
          <span className="text-4xl font-bold text-primary">{price}</span>
          {period && <span className="text-muted-foreground ml-2">{period}</span>}
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">{description}</p>
      </div>
      
      {/* Features - flex-1 pour prendre l'espace disponible */}
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* Bouton - toujours en bas */}
      <Button 
        onClick={handleClick}
        className={`w-full ${
          isActive
            ? 'bg-blue-500 hover:bg-blue-600 text-white' 
            : 'bg-orange-500 hover:bg-orange-600 text-white'
        } transition-colors duration-300`}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;

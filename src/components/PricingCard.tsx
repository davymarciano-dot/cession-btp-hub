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
  badgeText?: string;
  badgeColor?: string;
  badgeAnimate?: boolean;
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
  badgeText,
  badgeColor,
  badgeAnimate = false,
}: PricingCardProps) => {
  const isPrimary = variant === "primary" || isPopular;
  
  const handleClick = () => {
    analyticsEvents.selectSubscription(title, userType);
  };
  
  // Déterminer la couleur du bouton selon le titre de la carte
  const isOrangeButton = ["Découverte", "Premium", "Exclusif", "Prime"].includes(title);
  const isBlueButton = ["Essentiel", "Pro", "Dossier"].includes(title);
  
  return (
    <div 
      className={`h-full flex flex-col rounded-2xl p-8 border-2 ${
        isPopular ? 'border-blue-500' : 'border-slate-200 hover:border-blue-500'
      } hover:shadow-xl hover:scale-105 bg-card relative transition-all duration-300`}
    >
      {(badgeText || isPopular) && (
        <Badge className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
          badgeColor || 'bg-gradient-to-r from-blue-500 to-blue-600'
        } ${badgeAnimate ? 'animate-pulse' : ''}`}>
          {badgeText || 'POPULAIRE'}
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
          isOrangeButton
            ? 'bg-orange-500 hover:bg-blue-500 text-white' 
            : isBlueButton
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-orange-500 hover:bg-blue-500 text-white'
        } transition-colors duration-300`}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;

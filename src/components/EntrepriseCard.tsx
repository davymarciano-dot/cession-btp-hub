import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { analyticsEvents } from "@/lib/analytics";
import { useState } from "react";

interface EntrepriseCardProps {
  id?: string;
  type: "orange" | "blue";
  certification: string;
  status: "vendu" | "disponible";
  title: string;
  location: string;
  creation: string;
  ca: string;
  effectif: string;
  secteur: string;
  description?: string;
  price?: string;
  financement?: boolean;
  timeAgo?: string;
  certifications?: string[];
  onCompareToggle?: (listing: any) => void;
  isSelected?: boolean;
  compareCount?: number;
}

const EntrepriseCard = ({
  id,
  type,
  certification,
  status,
  title,
  location,
  creation,
  ca,
  effectif,
  secteur,
  description,
  price,
  financement,
  timeAgo,
  certifications,
  onCompareToggle,
  isSelected = false,
  compareCount = 0,
}: EntrepriseCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCompareToggle && id) {
      onCompareToggle({
        id,
        title,
        location,
        ca,
        effectif,
        secteur,
        price,
        certifications
      });
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border-0 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Comparison Checkbox */}
      {onCompareToggle && (
        <div className={`absolute top-4 right-4 z-10 transition-opacity ${
          isHovered || isSelected ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={handleCompareClick}
            className={`w-9 h-9 rounded-lg border-2 flex items-center justify-center transition-all ${
              isSelected 
                ? 'bg-primary border-primary' 
                : 'bg-white border-border hover:border-primary hover:bg-primary/5'
            } ${compareCount >= 3 && !isSelected ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={compareCount >= 3 && !isSelected}
            title={
              compareCount >= 3 && !isSelected 
                ? 'Max 3 entreprises' 
                : isSelected 
                ? 'Retirer de la comparaison' 
                : 'Ajouter à la comparaison'
            }
          >
            {isSelected ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
            ) : (
              <span className="text-foreground/60 text-xs font-semibold">VS</span>
            )}
          </button>
        </div>
      )}
      
      {/* Image Placeholder */}
      <div className="h-56 bg-gradient-to-br from-primary/10 to-primary/5 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20">🏗️</div>
        </div>
        
        {/* Badges on Image */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {status === "disponible" && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-3 py-1 font-medium">
              Disponible
            </Badge>
          )}
          {certifications && certifications.length > 0 && (
            <Badge className="bg-success hover:bg-success/90 text-white rounded-lg px-3 py-1 font-medium">
              <span className="text-xs">✓</span> RGE
            </Badge>
          )}
        </div>
        
        {timeAgo && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 backdrop-blur-sm text-[#64748B] border-0 rounded-lg px-3 py-1">
              {timeAgo}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-[#64748B]">
          <span>📍</span>
          <span>{location}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#1E293B] group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-[#64748B] text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {/* Stats Row */}
        <div className="flex items-center justify-between py-4 border-y border-gray-100 text-sm">
          <div>
            <p className="text-[#64748B] text-xs mb-1">CA annuel</p>
            <p className="font-semibold text-[#1E293B]">{ca}</p>
          </div>
          <div>
            <p className="text-[#64748B] text-xs mb-1">Effectif</p>
            <p className="font-semibold text-[#1E293B]">{effectif}</p>
          </div>
          <div>
            <p className="text-[#64748B] text-xs mb-1">Création</p>
            <p className="font-semibold text-[#1E293B]">{creation}</p>
          </div>
        </div>

        {/* Secteur Badge */}
        <Badge className="bg-secondary/10 text-secondary border-0 hover:bg-secondary/20 rounded-lg px-3 py-1">
          {secteur}
        </Badge>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-2">
          <div>
            {price && (
              <>
                <p className="text-xs text-[#64748B] mb-1">Prix</p>
                <p className="text-2xl font-bold text-primary">{price}</p>
              </>
            )}
          </div>
          
          <Button 
            className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6"
            onClick={() => {
              if (id) {
                const priceValue = price ? parseFloat(price.replace(/[^\d]/g, '')) : 0;
                analyticsEvents.viewEnterpriseDetails(id, priceValue);
                navigate(`/entreprises/${id}`);
              }
            }}
            disabled={!id}
          >
            Voir
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {financement && (
          <Badge className="w-full bg-success/10 text-success border-0 hover:bg-success/20 rounded-lg px-3 py-2 flex items-center justify-center gap-1">
            <span className="text-xs">✓</span> Financement possible
          </Badge>
        )}
      </div>
    </div>
  );
};

export default EntrepriseCard;

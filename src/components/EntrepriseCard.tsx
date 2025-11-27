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
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-primary/20 group relative"
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
      <div className="h-56 bg-gradient-to-br from-primary/8 to-primary/3 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-10">🏗️</div>
        </div>
        
        {/* Badges on Image */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {status === "disponible" && (
            <Badge className="bg-primary hover:bg-primary text-white rounded-md px-2.5 py-1 text-xs font-semibold shadow-sm">
              À vendre
            </Badge>
          )}
          {certifications && certifications.length > 0 && (
            <Badge className="bg-primary hover:bg-primary text-white rounded-md px-2.5 py-1 text-xs font-semibold shadow-sm">
              Certifié RGE
            </Badge>
          )}
        </div>
      </div>

      <div className="p-5 space-y-3">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <span className="text-base">📍</span>
          <span className="font-medium">{location}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-gray-600">
            <span className="text-base">💼</span>
            <span>{effectif}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <span className="text-base">📊</span>
            <span>{ca}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <span className="text-base">📅</span>
            <span>{creation}</span>
          </div>
        </div>

        {/* Price */}
        <div className="pt-2 pb-1 border-t border-gray-100 flex items-center justify-between">
          {price && (
            <div>
              <p className="text-2xl font-bold text-gray-900">{price}</p>
            </div>
          )}
          <Button 
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white rounded-lg px-5 font-medium"
            onClick={() => {
              if (id) {
                const priceValue = price ? parseFloat(price.replace(/[^\d]/g, '')) : 0;
                analyticsEvents.viewEnterpriseDetails(id, priceValue);
                navigate(`/entreprises/${id}`);
              }
            }}
            disabled={!id}
          >
            Voir détails
            <ArrowRight className="w-4 h-4 ml-1.5" />
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

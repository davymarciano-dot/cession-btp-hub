import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { analyticsEvents } from "@/lib/analytics";
import RGEBadge from "./RGEBadge";
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
  const isOrange = type === "orange";
  const bgClass = isOrange
    ? "bg-gradient-to-br from-secondary via-secondary-600 to-primary"
    : "bg-gradient-to-br from-primary via-primary-600 to-secondary";

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
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-border group"
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
      
      {/* RGE Badge */}
      {certifications && <RGEBadge certifications={certifications} />}
      
      {/* Top Badges */}
      <div className="flex gap-2 mb-3">
        {status === "disponible" && (
          <Badge className="bg-primary text-white">
            Disponible
          </Badge>
        )}
        {certification && (
          <Badge variant="outline" className="border-border">
            {certification}
          </Badge>
        )}
        {timeAgo && (
          <Badge variant="secondary">
            {timeAgo}
          </Badge>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      {/* Location */}
      <p className="text-muted-foreground mb-4 flex items-center gap-1">
        <span>📍</span> {location}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="bg-muted/50 p-2 rounded-lg">
          <span className="text-muted-foreground block text-xs">Création</span> 
          <span className="font-semibold text-foreground">{creation}</span>
        </div>
        <div className="bg-muted/50 p-2 rounded-lg">
          <span className="text-muted-foreground block text-xs">CA</span> 
          <span className="font-semibold text-foreground">{ca}</span>
        </div>
        <div className="col-span-2 bg-muted/50 p-2 rounded-lg">
          <span className="text-muted-foreground block text-xs">Effectif</span> 
          <span className="font-semibold text-foreground">{effectif}</span>
        </div>
      </div>

      {/* Description (for blue cards) */}
      {description && (
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
      )}

      {/* Secteur Badge */}
      <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
        {secteur}
      </Badge>

      {/* Price */}
      {price && (
        <div className="mb-4">
          <p className="text-3xl font-bold text-foreground">{price}</p>
          {financement && (
            <Badge className="bg-success/10 text-success border-success/20 mt-2">
              Financement possible
            </Badge>
          )}
        </div>
      )}

      {/* Button */}
      <Button 
        className="w-full bg-primary hover:bg-primary/90 text-white"
        onClick={() => {
          if (id) {
            const priceValue = price ? parseFloat(price.replace(/[^\d]/g, '')) : 0;
            analyticsEvents.viewEnterpriseDetails(id, priceValue);
            navigate(`/entreprises/${id}`);
          }
        }}
        disabled={!id}
      >
        Voir les détails
      </Button>
    </div>
  );
};

export default EntrepriseCard;

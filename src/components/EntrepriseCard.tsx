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
    ? "bg-gradient-to-br from-orange-400 to-orange-500"
    : "bg-gradient-to-br from-blue-500 to-blue-600";

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
      className={`${bgClass} rounded-2xl p-6 text-white relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group ${
        isSelected ? 'ring-4 ring-white scale-105' : 'hover:scale-105'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      {/* Comparison Checkbox */}
      {onCompareToggle && (
        <div className={`absolute top-3 right-3 z-10 transition-opacity ${
          isHovered || isSelected ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={handleCompareClick}
            className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all ${
              isSelected 
                ? 'bg-white border-white scale-110' 
                : 'bg-white/20 border-white/50 hover:border-white hover:bg-white/30 hover:scale-105'
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
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
            ) : (
              <span className="text-white text-sm font-semibold">VS</span>
            )}
          </button>
        </div>
      )}
      
      {/* RGE Badge */}
      {certifications && <RGEBadge certifications={certifications} />}
      
      {/* Top Badges */}
      <div className="flex justify-between items-start mb-4">
        <Badge className="bg-white/20 text-white border-0 hover:bg-white/30">
          {certification}
        </Badge>
        {status === "vendu" ? (
          <Badge className="bg-blue-600 text-white border-0 rotate-12 absolute top-4 right-4">
            VENDU
          </Badge>
        ) : (
          timeAgo && (
            <Badge className="bg-secondary text-white border-0">
              {timeAgo}
            </Badge>
          )
        )}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>

      {/* Location */}
      <p className="text-white/90 mb-4">📍 {location}</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        <div>
          <span className="text-white/80">Création:</span> <span className="font-semibold">{creation}</span>
        </div>
        <div>
          <span className="text-white/80">CA:</span> <span className="font-semibold">{ca}</span>
        </div>
        <div className="col-span-2">
          <span className="text-white/80">Effectif:</span> <span className="font-semibold">{effectif}</span>
        </div>
      </div>

      {/* Description (for blue cards) */}
      {description && (
        <p className="text-white/90 mb-4 text-sm leading-relaxed">
          {description}
        </p>
      )}

      {/* Secteur Badge */}
      <Badge className={`mb-4 ${isOrange ? 'bg-orange-600' : 'bg-blue-700'} text-white border-0 hover:opacity-90`}>
        {secteur}
      </Badge>

      {/* Price (for blue cards) */}
      {price && (
        <div className="mb-4">
          <p className="text-4xl font-bold text-green-400">{price}</p>
          {financement && (
            <Badge className="bg-green-500/20 text-green-200 border-0 mt-2">
              Financement possible
            </Badge>
          )}
        </div>
      )}

      {/* Button */}
      <Button 
        className={`w-full ${isOrange ? 'bg-white/10 hover:bg-white/20' : 'bg-secondary hover:bg-secondary/90'} text-white border-0`}
        onClick={() => {
          if (id) {
            const priceValue = price ? parseFloat(price.replace(/[^\d]/g, '')) : 0;
            analyticsEvents.viewEnterpriseDetails(id, priceValue);
            navigate(`/entreprises/${id}`);
          }
        }}
        disabled={!id}
      >
        Reprendre cette entreprise →
      </Button>
    </div>
  );
};

export default EntrepriseCard;

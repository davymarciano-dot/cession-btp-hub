import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

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
}: EntrepriseCardProps) => {
  const navigate = useNavigate();
  const isOrange = type === "orange";
  const bgClass = isOrange
    ? "bg-gradient-to-br from-orange-400 to-orange-500"
    : "bg-gradient-to-br from-blue-500 to-blue-600";

  return (
    <div className={`${bgClass} rounded-xl p-6 text-white relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300`}>
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
        onClick={() => id && navigate(`/entreprises/${id}`)}
        disabled={!id}
      >
        Voir détails →
      </Button>
    </div>
  );
};

export default EntrepriseCard;

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, TrendingUp, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MatchCardProps {
  match: {
    id: string;
    score: number;
    location_match: boolean;
    budget_match: boolean;
    sector_match: boolean;
    size_match: boolean;
    status: string;
    listing: {
      id: string;
      raison_sociale?: string;
      secteur_activite: string;
      ville: string;
      departement: string;
      prix_vente: number;
      nombre_salaries: number;
    };
  };
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const navigate = useNavigate();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-orange-600 bg-orange-50";
    return "text-blue-600 bg-blue-50";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">
            {match.listing.raison_sociale || "Entreprise confidentielle"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {match.listing.secteur_activite}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full font-bold ${getScoreColor(match.score)}`}>
          {match.score}%
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{match.listing.ville}, {match.listing.departement}</span>
          {match.location_match && (
            <CheckCircle2 className="h-4 w-4 text-green-600 ml-auto" />
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <span>{formatPrice(match.listing.prix_vente)}</span>
          {match.budget_match && (
            <CheckCircle2 className="h-4 w-4 text-green-600 ml-auto" />
          )}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{match.listing.nombre_salaries} salariés</span>
          {match.size_match && (
            <CheckCircle2 className="h-4 w-4 text-green-600 ml-auto" />
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {match.location_match && <Badge variant="secondary">📍 Localisation</Badge>}
        {match.budget_match && <Badge variant="secondary">💰 Budget</Badge>}
        {match.sector_match && <Badge variant="secondary">🏗️ Secteur</Badge>}
        {match.size_match && <Badge variant="secondary">👥 Taille</Badge>}
      </div>

      <Button
        onClick={() => navigate(`/entreprises/${match.listing.id}`)}
        className="w-full"
      >
        Voir l'annonce
      </Button>
    </Card>
  );
};
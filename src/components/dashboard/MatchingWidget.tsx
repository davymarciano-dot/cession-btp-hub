import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, MapPin, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Match {
  id: number;
  name: string;
  score: number;
  budget: string;
  location: string;
  sector: string;
  status: string;
}

export const MatchingWidget = () => {
  const navigate = useNavigate();

  // Données mockées pour l'instant
  const matches: Match[] = [
    {
      id: 1,
      name: "Investisseur Professionnel A",
      score: 92,
      budget: "500k-1M€",
      location: "Paris (75)",
      sector: "Maçonnerie",
      status: "Très intéressé"
    },
    {
      id: 2,
      name: "Groupe BTP National",
      score: 85,
      budget: "1M-2M€",
      location: "Lyon (69)",
      sector: "Multi-activités",
      status: "Intéressé"
    },
    {
      id: 3,
      name: "Repreneur Individuel",
      score: 78,
      budget: "300k-500k€",
      location: "Marseille (13)",
      sector: "Général",
      status: "À qualifier"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300';
    if (score >= 80) return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
    return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
  };

  const getStatusColor = (status: string) => {
    if (status === "Très intéressé") return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300';
    if (status === "Intéressé") return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Acheteurs Matchés
          <Badge variant="secondary" className="ml-auto">
            IA Matching
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.map(match => (
            <div
              key={match.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{match.name}</span>
                    <Badge className={getScoreColor(match.score)}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {match.score}% match
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      <span>Budget: {match.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{match.location} • {match.sector}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(match.status)}>
                  {match.status}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => navigate('/messages')}
              >
                Contacter
              </Button>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          className="w-full mt-4"
          onClick={() => navigate('/matches')}
        >
          Voir tous les matchs →
        </Button>

        <div className="mt-4 p-3 bg-muted/30 rounded-lg text-sm text-muted-foreground text-center">
          💡 Le matching est calculé selon la localisation, le budget, le secteur et la taille de l'entreprise
        </div>
      </CardContent>
    </Card>
  );
};

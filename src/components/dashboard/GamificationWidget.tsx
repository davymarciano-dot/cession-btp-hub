import { Trophy, Target, Zap, Star, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Mission {
  id: string;
  title: string;
  description: string;
  reward: string;
  completed: boolean;
  icon: JSX.Element;
}

export const GamificationWidget = () => {
  const level = 3;
  const xp = 750;
  const nextLevelXP = 1000;
  const progress = (xp / nextLevelXP) * 100;

  const missions: Mission[] = [
    {
      id: "1",
      title: "Ajouter 3 photos de qualité",
      description: "+10% de visibilité",
      reward: "50 XP",
      completed: false,
      icon: <Target className="w-5 h-5 text-blue-600" />,
    },
    {
      id: "2",
      title: "Répondre aux messages en -2h",
      description: "Badge 'Vendeur réactif'",
      reward: "100 XP",
      completed: true,
      icon: <Zap className="w-5 h-5 text-yellow-600" />,
    },
    {
      id: "3",
      title: "Compléter votre profil à 100%",
      description: "Boost gratuit 7 jours",
      reward: "200 XP",
      completed: false,
      icon: <Star className="w-5 h-5 text-purple-600" />,
    },
  ];

  const badges = [
    { name: "Vendeur Pro", earned: true, icon: "🏆" },
    { name: "Réactif", earned: true, icon: "⚡" },
    { name: "Expert RGE", earned: false, icon: "🌱" },
    { name: "Top 10%", earned: false, icon: "🎯" },
  ];

  return (
    <div className="space-y-6">
      {/* Level Card */}
      <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-6 h-6" />
              <h3 className="text-2xl font-bold">Niveau {level}</h3>
            </div>
            <p className="text-white/80 text-sm">Vendeur Expert</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{xp}</div>
            <div className="text-white/80 text-sm">/ {nextLevelXP} XP</div>
          </div>
        </div>
        
        <Progress value={progress} className="h-3 bg-white/20" />
        
        <p className="text-sm text-white/80 mt-3">
          Plus que {nextLevelXP - xp} XP pour devenir Vendeur Premium 🎖️
        </p>
      </Card>

      {/* Daily Missions */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg">Missions du jour</h3>
        </div>
        
        <div className="space-y-3">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                mission.completed
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-gray-200 hover:border-primary"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">{mission.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{mission.title}</h4>
                    {mission.completed && (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {mission.description}
                  </p>
                  <Badge
                    variant="secondary"
                    className="text-xs"
                  >
                    {mission.reward}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Badges Collection */}
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4">Vos badges</h3>
        <div className="grid grid-cols-4 gap-3">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={`text-center p-3 rounded-lg border-2 transition-all ${
                badge.earned
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-gray-50 border-gray-200 opacity-50"
              }`}
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <p className="text-xs font-semibold">{badge.name}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Leaderboard Preview */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Votre classement</h3>
          <Trophy className="w-5 h-5 text-yellow-600" />
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">#12</div>
          <p className="text-sm text-muted-foreground">
            Top 15% des vendeurs actifs
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            🔥 Montez de 3 places pour débloquer un boost gratuit !
          </p>
        </div>
      </Card>
    </div>
  );
};

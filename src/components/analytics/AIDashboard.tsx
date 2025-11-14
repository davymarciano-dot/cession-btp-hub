import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface AIDashboardProps {
  listingId: string;
}

export const AIDashboard = ({ listingId }: AIDashboardProps) => {
  const [predictions, setPredictions] = useState<any>(null);

  useEffect(() => {
    // Simuler une analyse IA
    setPredictions({
      saleProbability: 78,
      timeToSale: 45,
      optimalPrice: 485000,
      recommendations: [
        'Ajouter une vidéo de présentation (+15% de chances)',
        'Réduire le prix de 5% pour vendre plus vite',
        'Mettre à jour les photos de l\'atelier'
      ]
    });
  }, [listingId]);

  if (!predictions) return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">🤖 Analyse Prédictive IA</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/20 rounded-lg p-4">
          <p className="text-sm opacity-90">Probabilité de vente</p>
          <p className="text-3xl font-bold mb-2">{predictions.saleProbability}%</p>
          <Progress value={predictions.saleProbability} className="bg-white/30" />
        </div>
        
        <div className="bg-white/20 rounded-lg p-4">
          <p className="text-sm opacity-90">Temps estimé</p>
          <p className="text-3xl font-bold">{predictions.timeToSale} jours</p>
        </div>
      </div>

      <div className="bg-white/10 rounded-lg p-4">
        <h4 className="font-semibold mb-3">🎯 Actions recommandées</h4>
        {predictions.recommendations.map((rec: string, i: number) => (
          <div key={i} className="flex items-start gap-2 mb-2">
            <span className="text-green-300">✓</span>
            <p className="text-sm">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

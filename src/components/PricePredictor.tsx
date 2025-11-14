import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, AlertCircle } from "lucide-react";
import { predictPrice, getPricePredictionExplanation, isPriceRealistic } from "@/lib/pricePredictor";

interface PricePredictorProps {
  companyData: {
    revenue: number;
    ebitda?: number;
    hasRGE: boolean;
    location: string;
    sector: string;
    urgent?: boolean;
    employees?: number;
    assetsValue?: number;
  };
  currentPrice?: number;
  onPriceUpdate?: (price: number) => void;
}

export const PricePredictor = ({ companyData, currentPrice, onPriceUpdate }: PricePredictorProps) => {
  const [showPrediction, setShowPrediction] = useState(false);
  const prediction = predictPrice(companyData);
  const priceCheck = currentPrice ? isPriceRealistic(currentPrice, prediction) : null;

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Estimation IA du prix de vente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showPrediction ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Notre IA analyse votre entreprise pour estimer le prix optimal de vente
            </p>
            <Button 
              onClick={() => setShowPrediction(true)}
              className="bg-gradient-to-r from-primary to-primary/80"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Obtenir l'estimation IA
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Main prediction */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  Confiance: {prediction.confidence}%
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-2">Fourchette estimée</div>
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="text-lg font-semibold text-muted-foreground">
                  {prediction.min.toLocaleString()}€
                </div>
                <div className="text-sm text-muted-foreground">-</div>
                <div className="text-lg font-semibold text-muted-foreground">
                  {prediction.max.toLocaleString()}€
                </div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {prediction.estimate.toLocaleString()}€
              </div>
              <div className="text-xs text-muted-foreground mt-1">Prix optimal recommandé</div>
            </div>

            {/* Current price check */}
            {priceCheck && (
              <div className={`flex items-start gap-2 p-4 rounded-lg ${
                priceCheck.realistic 
                  ? 'bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800'
                  : 'bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800'
              }`}>
                {priceCheck.realistic ? (
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1">
                    Votre prix: {currentPrice?.toLocaleString()}€
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {priceCheck.reason}
                  </div>
                </div>
              </div>
            )}

            {/* Breakdown */}
            <div className="space-y-2">
              <div className="text-sm font-semibold">Détail du calcul:</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prix de base (CA × 0.8)</span>
                  <span className="font-semibold">{prediction.breakdown.basePrice.toLocaleString()}€</span>
                </div>
                {prediction.breakdown.rgeBonus && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>+ Certification RGE</span>
                    <span className="font-semibold">+{prediction.breakdown.rgeBonus.toLocaleString()}€</span>
                  </div>
                )}
                {prediction.breakdown.profitabilityBonus && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>+ Forte rentabilité</span>
                    <span className="font-semibold">+{prediction.breakdown.profitabilityBonus.toLocaleString()}€</span>
                  </div>
                )}
                {prediction.breakdown.locationBonus && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>+ Localisation premium</span>
                    <span className="font-semibold">+{prediction.breakdown.locationBonus.toLocaleString()}€</span>
                  </div>
                )}
                {prediction.breakdown.urgencyDiscount && (
                  <div className="flex justify-between text-orange-600 dark:text-orange-400">
                    <span>- Vente urgente</span>
                    <span className="font-semibold">-{prediction.breakdown.urgencyDiscount.toLocaleString()}€</span>
                  </div>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="text-sm font-semibold">💡 Recommandations:</div>
              <ul className="space-y-1">
                {prediction.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            {onPriceUpdate && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => onPriceUpdate(prediction.min)}
                >
                  Utiliser le min
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => onPriceUpdate(prediction.estimate)}
                >
                  Utiliser l'estimation
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => onPriceUpdate(prediction.max)}
                >
                  Utiliser le max
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, CheckCircle, AlertCircle } from "lucide-react";

interface EstimationResult {
  estimation_basse: number;
  estimation_haute: number;
  estimation_moyenne: number;
  multiple_valorisation: number;
  analyse_detaillee: string;
  points_forts: string[];
  recommandations: string[];
}

interface EstimationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  estimation: EstimationResult | null;
  isLoading: boolean;
}

const EstimationDialog = ({ open, onOpenChange, estimation, isLoading }: EstimationDialogProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Estimation de Valorisation
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="py-12 text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
            <p className="text-lg text-muted-foreground">Analyse en cours par nos experts IA...</p>
          </div>
        ) : estimation ? (
          <div className="space-y-6">
            {/* Fourchette d'estimation */}
            <div className="bg-gradient-to-br from-primary/10 to-blue-100 dark:from-primary/20 dark:to-blue-900/20 p-6 rounded-xl">
              <div className="text-center mb-4">
                <Badge className="bg-primary text-white mb-2">Estimation Confidentielle</Badge>
                <h3 className="text-xl font-bold mb-4">Fourchette de Valorisation</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Estimation Basse</p>
                  <p className="text-xl font-bold text-orange-600">{formatPrice(estimation.estimation_basse)}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center border-2 border-primary">
                  <p className="text-sm text-muted-foreground mb-1">Estimation Moyenne</p>
                  <p className="text-2xl font-bold text-primary">{formatPrice(estimation.estimation_moyenne)}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Estimation Haute</p>
                  <p className="text-xl font-bold text-success">{formatPrice(estimation.estimation_haute)}</p>
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>Multiple de valorisation : <span className="font-semibold">{estimation.multiple_valorisation.toFixed(2)}x le CA</span></p>
              </div>
            </div>

            {/* Analyse détaillée */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Analyse Détaillée
              </h4>
              <p className="text-muted-foreground leading-relaxed">{estimation.analyse_detaillee}</p>
            </div>

            {/* Points forts */}
            <div>
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Points forts identifiés
              </h4>
              <ul className="space-y-2">
                {estimation.points_forts.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-success mt-1">✓</span>
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommandations */}
            <div>
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                Recommandations pour Optimiser la Valorisation
              </h4>
              <ul className="space-y-2">
                {estimation.recommandations.map((reco, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-secondary mt-1">→</span>
                    <span className="text-muted-foreground">{reco}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary to-blue-600 p-6 rounded-xl text-white text-center">
              <h4 className="font-bold text-xl mb-2">Prêt à vendre au meilleur prix ?</h4>
              <p className="mb-4 text-white/90">
                Nos experts BTP vous accompagnent pour maximiser la valeur de votre entreprise
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => {
                    // TODO: Lien vers page de création d'annonce
                    window.location.href = '/vendre';
                  }}
                >
                  Créer mon annonce
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => {
                    // TODO: Lien vers contact
                    window.location.href = '/contact';
                  }}
                >
                  Parler à un expert
                </Button>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground text-center">
              * Cette estimation est indicative et basée sur les informations fournies. 
              Une valorisation définitive nécessite un audit complet par nos experts.
            </p>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default EstimationDialog;

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, TrendingUp, AlertCircle, Download, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EstimationData {
  id: string;
  estimationBasse: number;
  estimationMoyenne: number;
  estimationHaute: number;
  multipleValorisation: number;
  analyseDetaillee: string;
  pointsForts: string[];
  recommandations: string[];
  secteur: string;
  ca_n1: number;
}

const ResultatEstimation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [estimation, setEstimation] = useState<EstimationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const estimationId = searchParams.get("id");

  useEffect(() => {
    const fetchEstimation = async () => {
      if (!estimationId) {
        toast({
          title: "Erreur",
          description: "ID d'estimation manquant",
          variant: "destructive",
        });
        navigate("/estimation");
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("estimations")
          .select("*")
          .eq("id", estimationId)
          .single();

        if (error) throw error;

        if (data) {
          setEstimation({
            id: data.id,
            estimationBasse: data.estimation_basse,
            estimationMoyenne: data.estimation_moyenne,
            estimationHaute: data.estimation_haute,
            multipleValorisation: data.multiple_valorisation,
            analyseDetaillee: data.analyse_detaillee,
            pointsForts: data.points_forts as string[],
            recommandations: data.recommandations as string[],
            secteur: data.secteur,
            ca_n1: data.ca_n1,
          });
        }
      } catch (error: any) {
        console.error("Error fetching estimation:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger l'estimation",
          variant: "destructive",
        });
        navigate("/estimation");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEstimation();
  }, [estimationId, navigate, toast]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Chargement de votre estimation...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!estimation) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Estimation introuvable</h1>
            <Button onClick={() => navigate("/estimation")}>Retour à l'estimation</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Check className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Votre Estimation de Valorisation
            </h1>
            <p className="text-xl text-white/90">
              Analyse détaillée • Recommandations personnalisées • 100% confidentiel
            </p>
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Fourchette de valorisation */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Fourchette de Valorisation
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-6 bg-slate-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Estimation Basse</p>
                  <p className="text-3xl font-bold text-blue-600">{formatPrice(estimation.estimationBasse)}</p>
                </div>
                
                <div className="text-center p-6 bg-primary/10 rounded-lg border-2 border-primary">
                  <p className="text-sm text-muted-foreground mb-2">Estimation Moyenne</p>
                  <p className="text-4xl font-bold text-primary">{formatPrice(estimation.estimationMoyenne)}</p>
                  <p className="text-xs text-muted-foreground mt-2">Valeur la plus probable</p>
                </div>
                
                <div className="text-center p-6 bg-slate-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Estimation Haute</p>
                  <p className="text-3xl font-bold text-green-600">{formatPrice(estimation.estimationHaute)}</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm">
                  <strong>Multiple de valorisation :</strong> {estimation.multipleValorisation.toFixed(2)}x le CA
                  <br />
                  <span className="text-muted-foreground">
                    Basé sur votre CA N-1 de {formatPrice(estimation.ca_n1)}
                  </span>
                </p>
              </div>
            </Card>

            {/* Analyse détaillée */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Analyse Détaillée</h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-muted-foreground whitespace-pre-line">{estimation.analyseDetaillee}</p>
              </div>
            </Card>

            {/* Points forts */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Check className="w-6 h-6 text-green-600" />
                Points forts identifiés
              </h2>
              <ul className="space-y-3">
                {estimation.pointsForts.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Recommandations */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-orange-600" />
                Recommandations
              </h2>
              <ul className="space-y-3">
                {estimation.recommandations.map((reco, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-orange-600">{index + 1}</span>
                    </div>
                    <span>{reco}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Actions */}
            <Card className="p-8 bg-gradient-to-br from-primary to-blue-700 text-white">
              <h2 className="text-2xl font-bold mb-4">Prochaines Étapes</h2>
              <p className="mb-6 text-white/90">
                Vous souhaitez vendre votre entreprise ? Créez votre annonce sur CessionBTP et accédez à notre réseau de 2000+ repreneurs qualifiés.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => navigate("/vendre")}
                >
                  Créer Mon Annonce
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate("/tarifs")}
                >
                  Voir les Tarifs
                </Button>
              </div>
            </Card>

            {/* Disclaimer */}
            <div className="text-center text-sm text-muted-foreground">
              <p>
                ⚠️ Cette estimation est fournie à titre indicatif et ne constitue pas un engagement de prix.
                Elle est basée sur les informations communiquées et l'analyse de notre algorithme IA.
                Pour une valorisation définitive, nous recommandons un audit approfondi par un expert-comptable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResultatEstimation;
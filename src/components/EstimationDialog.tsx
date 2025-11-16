import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface EstimationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  estimation: any;
  isLoading: boolean;
  formData?: any;
}

const EstimationDialog = ({ open, onOpenChange, estimation, isLoading, formData }: EstimationDialogProps) => {
  const [step, setStep] = useState(1);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const calculerEstimationRealiste = () => {
    if (!estimation || !formData) return null;

    const ca = parseInt(formData.ca || estimation.ca || 0);
    const secteur = formData.secteur || estimation.secteur || "";
    
    const multiplesParSecteur: { [key: string]: { min: number; max: number } } = {
      "Maçonnerie": { min: 0.35, max: 0.75 },
      "Maçonnerie générale": { min: 0.35, max: 0.75 },
      "Plomberie": { min: 0.45, max: 0.95 },
      "Plomberie-Chauffage": { min: 0.45, max: 0.95 },
      "Électricité": { min: 0.55, max: 1.15 },
      "Électricité générale": { min: 0.55, max: 1.15 },
      "Électricien d'équipement": { min: 0.55, max: 1.15 },
      "Chauffage": { min: 0.45, max: 0.95 },
      "Installation thermique": { min: 0.45, max: 0.95 },
      "Menuiserie": { min: 0.35, max: 0.85 },
      "Peinture": { min: 0.25, max: 0.65 },
      "Revêtements de sols": { min: 0.30, max: 0.70 },
      "Couverture": { min: 0.45, max: 0.95 },
      "Terrassement": { min: 0.35, max: 0.75 },
      "Charpente": { min: 0.45, max: 0.85 },
      "default": { min: 0.35, max: 0.85 }
    };

    let multipleBase = multiplesParSecteur["default"];
    
    for (const [key, value] of Object.entries(multiplesParSecteur)) {
      if (secteur.toLowerCase().includes(key.toLowerCase())) {
        multipleBase = value;
        break;
      }
    }

    let bonusMultiple = 0;
    if (ca > 2000000) bonusMultiple += 0.15;
    else if (ca > 1000000) bonusMultiple += 0.12;
    else if (ca > 500000) bonusMultiple += 0.08;
    else if (ca > 300000) bonusMultiple += 0.05;

    const multipleMin = Math.max(0.2, multipleBase.min + bonusMultiple * 0.3);
    const multipleMax = Math.min(1.5, multipleBase.max + bonusMultiple);
    const multipleMoyen = (multipleMin + multipleMax) / 2;

    const valeurMin = Math.round(ca * multipleMin);
    const valeurMax = Math.round(ca * multipleMax);
    const valeurMoyenne = Math.round(ca * multipleMoyen);

    return {
      valeurMin,
      valeurMax,
      valeurMoyenne,
      multipleMin: multipleMin.toFixed(2),
      multipleMax: multipleMax.toFixed(2),
      multipleMoyen: multipleMoyen.toFixed(2),
      ca,
      secteur
    };
  };

  const estimationRealiste = calculerEstimationRealiste();

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nom || !email || !telephone) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires (*)",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }

    const telRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
    const cleanTel = telephone.replace(/\s/g, '');
    if (!telRegex.test(cleanTel)) {
      toast({
        title: "Téléphone invalide",
        description: "Format : 06 12 34 56 78",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('leads_estimation')
        .insert([
          {
            nom: nom.trim(),
            email: email.trim().toLowerCase(),
            telephone: cleanTel,
            ca: estimationRealiste?.ca,
            secteur: estimationRealiste?.secteur,
            departement: formData?.departement,
            estimation_min: estimationRealiste?.valeurMin,
            estimation_max: estimationRealiste?.valeurMax,
            estimation_moyenne: estimationRealiste?.valeurMoyenne,
            multiple_ca: parseFloat(estimationRealiste?.multipleMoyen || "0")
          }
        ]);

      if (error) {
        console.error("Erreur lead:", error);
      }

      setStep(2);
      
      toast({
        title: "✅ Merci !",
        description: "Votre estimation détaillée va vous être envoyée par email.",
      });

    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Calcul de votre estimation...</p>
            <p className="text-sm text-muted-foreground mt-2">Notre IA analyse vos données</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!estimationRealiste) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        {step === 1 ? (
          <>
            <DialogHeader>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Votre estimation préliminaire</h2>
                <p className="text-muted-foreground">Calcul simplifié basé sur vos données</p>
              </div>
            </DialogHeader>

            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-8 text-center mb-6">
              <p className="text-sm mb-2 opacity-90">Fourchette estimée</p>
              <div className="text-4xl font-bold mb-2">
                {estimationRealiste.valeurMin.toLocaleString('fr-FR')} € - {estimationRealiste.valeurMax.toLocaleString('fr-FR')} €
              </div>
            </div>

            <div className="bg-accent/50 border-2 border-accent rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Recevez le rapport détaillé complet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Entrez votre email pour recevoir l'estimation complète par IA avec analyse comparative, 
                points forts identifiés et conseils personnalisés pour maximiser la valeur de votre entreprise.
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Valorisation complète par IA (Google Gemini 2.5 Flash)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Analyse détaillée de votre marché et secteur BTP</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Points forts et axes d'amélioration identifiés</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Recommandations personnalisées pour maximiser la valeur</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>100% gratuit • Sans engagement • Confidentiel</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitContact} className="space-y-4">
              <div>
                <Label htmlFor="nom">Nom <span className="text-destructive">*</span></Label>
                <Input
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Dupont"
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <Label htmlFor="email">Email professionnel <span className="text-destructive">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jean.dupont@entreprise.fr"
                  required
                  maxLength={255}
                />
              </div>

              <div>
                <Label htmlFor="telephone">Téléphone <span className="text-destructive">*</span></Label>
                <Input
                  id="telephone"
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="06 12 34 56 78"
                  required
                  maxLength={20}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
                disabled={isSaving}
              >
                {isSaving ? "⏳ Envoi en cours..." : "📊 Obtenir le Rapport Détaillé Gratuit"}
              </Button>
            </form>

            <button
              onClick={() => onOpenChange(false)}
              className="text-sm text-muted-foreground hover:text-foreground text-center w-full mt-4"
            >
              ← Retour au formulaire
            </button>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Votre Estimation par IA</h2>
                <p className="text-muted-foreground">Basée sur notre IA et 500+ transactions BTP</p>
              </div>
            </DialogHeader>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-8 text-center mb-6">
              <p className="text-sm mb-2 opacity-90">Valeur estimée</p>
              <div className="text-5xl font-bold mb-4">{estimationRealiste.valeurMoyenne.toLocaleString('fr-FR')} €</div>
              <p className="text-sm opacity-90">
                Fourchette : {estimationRealiste.valeurMin.toLocaleString('fr-FR')} € - {estimationRealiste.valeurMax.toLocaleString('fr-FR')} €
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-accent/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{estimationRealiste.valeurMin.toLocaleString('fr-FR')} €</p>
                <p className="text-xs text-muted-foreground mt-1">Estimation basse</p>
              </div>
              <div className="bg-primary/10 border-2 border-primary rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-primary">{estimationRealiste.valeurMoyenne.toLocaleString('fr-FR')} €</p>
                <p className="text-xs text-muted-foreground mt-1">Prix optimal</p>
              </div>
              <div className="bg-accent/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{estimationRealiste.valeurMax.toLocaleString('fr-FR')} €</p>
                <p className="text-xs text-muted-foreground mt-1">Estimation haute</p>
              </div>
            </div>

            <div className="bg-accent/50 border-l-4 border-blue-500 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Analyse détaillée par IA
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                L'entreprise spécialisée en {estimationRealiste.secteur} présente un profil intéressant. 
                Le chiffre d'affaires de {estimationRealiste.ca.toLocaleString('fr-FR')} € positionne l'entreprise 
                dans une fourchette de valorisation entre {estimationRealiste.multipleMin}x et {estimationRealiste.multipleMax}x 
                le CA annuel, soit {estimationRealiste.valeurMin.toLocaleString('fr-FR')} € à {estimationRealiste.valeurMax.toLocaleString('fr-FR')} €.
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">🚀 Prochaines Étapes</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                  <p><strong>Un expert vous contacte sous 24h</strong> pour affiner votre estimation</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                  <p><strong>Rapport détaillé envoyé par email</strong> avec recommandations personnalisées</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                  <p><strong>Publication gratuite</strong> sur CessionBTP si vous le souhaitez</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="flex-1"
              >
                Fermer
              </Button>
              <Button
                onClick={() => window.location.href = '/vendre'}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Publier mon annonce
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EstimationDialog;

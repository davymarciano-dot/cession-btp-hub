import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { debounce } from "lodash";
import FormSection1 from "@/components/vendre/FormSection1";
import FormSection2Combined from "@/components/vendre/FormSection2Combined";
import FormSection4 from "@/components/vendre/FormSection4";
import FormSection5 from "@/components/vendre/FormSection5";
import FormSection5Combined from "@/components/vendre/FormSection5Combined";
import FormSection8 from "@/components/vendre/FormSection8";
import FormSection7Combined from "@/components/vendre/FormSection7Combined";
import FormSection8Combined from "@/components/vendre/FormSection8Combined";
import FormSection9Combined from "@/components/vendre/FormSection9Combined";
import FormSection15 from "@/components/vendre/FormSection15";
import { ArrowLeft, ArrowRight, Save, Trash2 } from "lucide-react";

const STORAGE_KEY = 'cessionBTP_form_draft';
const STORAGE_STEP_KEY = 'cessionBTP_step';

const Vendre = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const totalSteps = 10; // Réduit de 15 à 10

  const [formData, setFormData] = useState({
    // Section 1
    civilite: "M",
    nomPrenom: "",
    email: "",
    telephone: "",
    preferenceContact: "email",
    
    // Section 2
    raisonSociale: "",
    formeJuridique: "",
    siret: "",
    secteurActivite: "",
    anneeCreation: "",
    departement: "",
    ville: "",
    codePostal: "",
    
    // Section 3
    descriptionActivite: "",
    specialites: "",
    certifications: [],
    clienteleParticuliers: undefined,
    clienteleProfessionnels: undefined,
    clientelePublics: undefined,
    clientelePromoteurs: undefined,
    rayonIntervention: "",
    departementsCouverts: "",
    
    // Section 4
    caN3: "",
    caN2: "",
    caN1: "",
    caPrevisionnel: "",
    ebeN1: "",
    resultatNetN1: "",
    prixVente: "",
    prixNegociable: false,
    margeNegociation: "",
    
    // Section 5
    nombreSalaries: "",
    nombreCDI: "",
    nombreCDD: "",
    nombreApprentis: "",
    ancienneteMoyenne: "",
    competencesEquipe: "",
    masseSalariale: "",
    accompagnementVendeur: false,
    dureeAccompagnement: "",
    
    // Section 6-14 (placeholders)
    situationLocaux: "locataire",
    loyerMensuel: "",
    dureeBail: "",
    surfaceLocaux: "",
    valeurLocaux: "",
    locauxInclusVente: false,
    materielPrincipal: "",
    nombreVehicules: "",
    valeurMateriel: "",
    etatMateriel: "bon",
    valeurStock: "",
    siteWeb: false,
    nombreClientsActifs: "",
    valeurPortefeuille: "",
    contratsEnCours: "",
    marqueDeposee: false,
    dettesTotales: "",
    detteURSSAF: "",
    detteTVA: "",
    detteFournisseurs: "",
    detteBanques: "",
    creditsEnCours: false,
    montantCredits: "",
    creditsTransferables: false,
    litigesEnCours: false,
    natureLitiges: "",
    motifVente: "",
    precisionsVente: "",
    atoutsPrincipaux: "",
    potentielDeveloppement: "",
    clienteleFidelePct: "",
    reputationLocale: 3,
    presenceDigitale: [],
    elementsDifferenciants: "",
    typeTransmission: "",
    accompagnementPropose: {},
    delaiVente: "",
    conditionsParticulieres: "",
    niveauAnonymat: "semi-anonyme",
    documentsDisponibles: [],
    ndaRequis: false,
    photosEntreprise: [],
    photosMateriel: [],
    photosRealisations: [],
    videoPresentation: "",
    financementBancaire: "oui",
    complementVendeur: false,
    complementVendeurMontant: "",
    complementVendeurDuree: "",
    apportRequis: "",
    infosComplementaires: "",
    commentairesAcheteurs: "",
    visitesPossibles: "sur-rdv",
    
    // Section 15
    formuleAbonnement: "essentiel",
    montantAbonnement: 290,
    stripePriceId: "price_1SS7lN2ItaOC3ukRjM2C8ZTd",
    accepteCGU: false,
    accepteContact: false,
    certifieExactitude: false,
    newsletter: false,
  });

  // Restaurer le brouillon au chargement
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setHasDraft(true);
        toast({
          title: "Brouillon trouvé",
          description: "Nous avons retrouvé votre brouillon. Cliquez sur 'Restaurer' pour continuer.",
          duration: 10000,
          action: (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  localStorage.removeItem(STORAGE_KEY);
                  setHasDraft(false);
                }}
              >
                Ignorer
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setFormData(parsedDraft.formData);
                  setCurrentStep(parsedDraft.currentStep || 1);
                  setHasDraft(false);
                  toast({
                    title: "Brouillon restauré",
                    description: "Vous pouvez continuer là où vous vous étiez arrêté.",
                  });
                }}
              >
                Restaurer
              </Button>
            </div>
          ),
        });
      } catch (error) {
        console.error("Erreur lors de la lecture du brouillon:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Sauvegarde automatique avec debounce optimisé
  const autoSave = useCallback(
    debounce((data: any, step: number) => {
      setIsSaving(true);
      const draftData = {
        formData: data,
        currentStep: step,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draftData));
      localStorage.setItem(STORAGE_STEP_KEY, step.toString());
      
      toast({
        description: "✓ Sauvegarde automatique",
        duration: 1500,
      });
      
      setTimeout(() => setIsSaving(false), 1000);
    }, 1000),
    []
  );

  useEffect(() => {
    if (!hasDraft) {
      autoSave(formData, currentStep);
    }
  }, [formData, currentStep, hasDraft, autoSave]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: "Brouillon effacé",
      description: "Votre brouillon a été supprimé.",
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    // Validation finale
    if (!formData.accepteCGU || !formData.accepteContact || !formData.certifieExactitude) {
      toast({
        title: "Validation requise",
        description: "Veuillez accepter les conditions requises pour continuer.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Authentification requise",
          description: "Veuillez vous connecter pour publier une annonce.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      // Calculer la date d'expiration
      const dureeMap: Record<string, number> = {
        "decouverte": 30,
        "essentiel": 90,
        "prime": 90,
        "exclusif": 90,
      };
      const dureeDays = dureeMap[formData.formuleAbonnement] || 90;
      const dateExpiration = new Date();
      dateExpiration.setDate(dateExpiration.getDate() + dureeDays);

      // Préparer les données
      const annonceData = {
        user_id: user.id,
        civilite: formData.civilite,
        nom_prenom: formData.nomPrenom,
        email: formData.email,
        telephone: formData.telephone,
        preference_contact: formData.preferenceContact,
        raison_sociale: formData.raisonSociale || null,
        forme_juridique: formData.formeJuridique,
        siret: formData.siret || null,
        secteur_activite: formData.secteurActivite,
        annee_creation: parseInt(formData.anneeCreation) || 2020,
        departement: formData.departement,
        ville: formData.ville,
        code_postal: formData.codePostal,
        description_activite: formData.descriptionActivite || "Description à compléter",
        specialites: formData.specialites ? [formData.specialites] : null,
        certifications: formData.certifications.length > 0 ? formData.certifications : null,
        type_clientele: {
          particuliers: formData.clienteleParticuliers,
          professionnels: formData.clienteleProfessionnels,
          publics: formData.clientelePublics,
          promoteurs: formData.clientelePromoteurs,
        },
        zone_intervention: {
          rayon: formData.rayonIntervention,
          departements: formData.departementsCouverts,
        },
        ca_n3: formData.caN3 ? parseFloat(formData.caN3) : null,
        ca_n2: formData.caN2 ? parseFloat(formData.caN2) : null,
        ca_n1: parseFloat(formData.caN1) || 0,
        ca_previsionnel: formData.caPrevisionnel ? parseFloat(formData.caPrevisionnel) : null,
        ebe_n1: formData.ebeN1 ? parseFloat(formData.ebeN1) : null,
        resultat_net_n1: parseFloat(formData.resultatNetN1) || 0,
        prix_vente: parseFloat(formData.prixVente) || 0,
        prix_negociable: formData.prixNegociable,
        marge_negociation: formData.margeNegociation ? parseFloat(formData.margeNegociation) : null,
        nombre_salaries: parseInt(formData.nombreSalaries) || 0,
        nombre_cdi: formData.nombreCDI ? parseInt(formData.nombreCDI) : null,
        nombre_cdd: formData.nombreCDD ? parseInt(formData.nombreCDD) : null,
        nombre_apprentis: formData.nombreApprentis ? parseInt(formData.nombreApprentis) : null,
        anciennete_moyenne: formData.ancienneteMoyenne ? parseFloat(formData.ancienneteMoyenne) : null,
        competences_equipe: formData.competencesEquipe || null,
        masse_salariale: formData.masseSalariale ? parseFloat(formData.masseSalariale) : null,
        accompagnement_vendeur: formData.accompagnementVendeur,
        duree_accompagnement: formData.dureeAccompagnement || null,
        situation_locaux: formData.situationLocaux,
        loyer_mensuel: formData.loyerMensuel ? parseFloat(formData.loyerMensuel) : null,
        duree_bail: formData.dureeBail || null,
        surface_locaux: formData.surfaceLocaux ? parseFloat(formData.surfaceLocaux) : null,
        valeur_locaux: formData.valeurLocaux ? parseFloat(formData.valeurLocaux) : null,
        locaux_inclus_vente: formData.locauxInclusVente,
        materiel_principal: formData.materielPrincipal || null,
        nombre_vehicules: formData.nombreVehicules ? parseInt(formData.nombreVehicules) : null,
        valeur_materiel: formData.valeurMateriel ? parseFloat(formData.valeurMateriel) : null,
        etat_materiel: formData.etatMateriel || null,
        valeur_stock: formData.valeurStock ? parseFloat(formData.valeurStock) : null,
        site_web: formData.siteWeb,
        nombre_clients_actifs: formData.nombreClientsActifs ? parseInt(formData.nombreClientsActifs) : null,
        valeur_portefeuille: formData.valeurPortefeuille ? parseFloat(formData.valeurPortefeuille) : null,
        contrats_en_cours: formData.contratsEnCours ? { data: formData.contratsEnCours } : null,
        marque_deposee: formData.marqueDeposee,
        dettes_totales: parseFloat(formData.dettesTotales) || 0,
        dette_urssaf: formData.detteURSSAF ? parseFloat(formData.detteURSSAF) : null,
        dette_tva: formData.detteTVA ? parseFloat(formData.detteTVA) : null,
        dette_fournisseurs: formData.detteFournisseurs ? parseFloat(formData.detteFournisseurs) : null,
        dette_banques: formData.detteBanques ? parseFloat(formData.detteBanques) : null,
        credits_en_cours: formData.creditsEnCours,
        montant_credits: formData.montantCredits ? parseFloat(formData.montantCredits) : null,
        credits_transferables: formData.creditsTransferables,
        litiges_en_cours: formData.litigesEnCours,
        nature_litiges: formData.natureLitiges || null,
        motif_vente: formData.motifVente || "Autre",
        precisions_vente: formData.precisionsVente || null,
        atouts_principaux: formData.atoutsPrincipaux || "À compléter",
        potentiel_developpement: formData.potentielDeveloppement || null,
        clientele_fidele_pct: formData.clienteleFidelePct ? parseFloat(formData.clienteleFidelePct) : null,
        reputation_locale: formData.reputationLocale,
        presence_digitale: formData.presenceDigitale.length > 0 ? formData.presenceDigitale : null,
        elements_differenciants: formData.elementsDifferenciants || null,
        type_transmission: formData.typeTransmission || "Cession de parts sociales",
        accompagnement_propose: Object.keys(formData.accompagnementPropose).length > 0 ? formData.accompagnementPropose : null,
        delai_vente: formData.delaiVente || "Moyen terme (6-12 mois)",
        conditions_particulieres: formData.conditionsParticulieres || null,
        niveau_anonymat: formData.niveauAnonymat,
        documents_disponibles: formData.documentsDisponibles.length > 0 ? formData.documentsDisponibles : null,
        nda_requis: formData.ndaRequis,
        photos_entreprise: formData.photosEntreprise.length > 0 ? formData.photosEntreprise : null,
        photos_materiel: formData.photosMateriel.length > 0 ? formData.photosMateriel : null,
        photos_realisations: formData.photosRealisations.length > 0 ? formData.photosRealisations : null,
        video_presentation: formData.videoPresentation || null,
        financement_bancaire: formData.financementBancaire,
        complement_vendeur: formData.complementVendeur,
        complement_vendeur_montant: formData.complementVendeurMontant ? parseFloat(formData.complementVendeurMontant) : null,
        complement_vendeur_duree: formData.complementVendeurDuree || null,
        apport_requis: formData.apportRequis ? parseFloat(formData.apportRequis) : null,
        infos_complementaires: formData.infosComplementaires || null,
        commentaires_acheteurs: formData.commentairesAcheteurs || null,
        visites_possibles: formData.visitesPossibles,
        formule_abonnement: formData.formuleAbonnement,
        montant_abonnement: formData.montantAbonnement,
        date_expiration: dateExpiration.toISOString(),
        accepte_cgu: formData.accepteCGU,
        accepte_contact: formData.accepteContact,
        certifie_exactitude: formData.certifieExactitude,
        newsletter: formData.newsletter,
        statut: 'brouillon',
      };

      // If free plan, create annonce directly
      if (formData.montantAbonnement === 0) {
        annonceData.statut = 'publiee';
        
        const { data, error } = await supabase
          .from('annonces')
          .insert(annonceData)
          .select()
          .single();

        if (error) throw error;

        // Effacer le brouillon après succès
        localStorage.removeItem(STORAGE_KEY);

        toast({
          title: "Annonce créée !",
          description: "Votre annonce gratuite a été publiée avec succès.",
        });

        navigate(`/entreprises`);
      } else {
        // Paid plan - redirect to Stripe Checkout
        const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment', {
          body: { 
            price_id: formData.stripePriceId,
            annonce_data: annonceData
          }
        });

        if (paymentError) throw paymentError;

        if (paymentData?.url) {
          // Effacer le brouillon avant la redirection vers le paiement
          localStorage.removeItem(STORAGE_KEY);
          window.location.href = paymentData.url;
        } else {
          throw new Error("No checkout URL received");
        }
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const renderCurrentSection = () => {
    switch (currentStep) {
      case 1:
        return <FormSection1 formData={formData} handleInputChange={handleInputChange} />;
      case 2:
        return <FormSection2Combined formData={formData} handleInputChange={handleInputChange} />;
      case 3:
        return <FormSection4 formData={formData} handleInputChange={handleInputChange} />;
      case 4:
        return <FormSection5 formData={formData} handleInputChange={handleInputChange} />;
      case 5:
        return <FormSection5Combined formData={formData} handleInputChange={handleInputChange} />;
      case 6:
        return <FormSection8 formData={formData} handleInputChange={handleInputChange} />;
      case 7:
        return <FormSection7Combined formData={formData} handleInputChange={handleInputChange} />;
      case 8:
        return <FormSection8Combined formData={formData} handleInputChange={handleInputChange} />;
      case 9:
        return <FormSection9Combined formData={formData} handleInputChange={handleInputChange} />;
      case 10:
        return <FormSection15 formData={formData} handleInputChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Vendre Votre Entreprise BTP
            </h1>
            <p className="text-xl text-white/90">
              Formulaire complet • Publication rapide • Paiement sécurisé
            </p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Étape {currentStep} sur {totalSteps}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              {renderCurrentSection()}

              {/* Navigation Buttons */}
              <div className="space-y-4 mt-8 pt-8 border-t">
                {/* Bouton Effacer brouillon */}
                <div className="flex justify-end">
                  <Button
                    onClick={clearDraft}
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3 mr-2" />
                    Effacer le brouillon
                  </Button>
                </div>

                <div className="flex gap-4">
                  {currentStep > 1 && (
                    <Button
                      onClick={handlePrevious}
                      variant="outline"
                      size="lg"
                      className="flex-1"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Précédent
                    </Button>
                  )}
                  
                  {currentStep < totalSteps ? (
                    <Button
                      onClick={handleNext}
                      size="lg"
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      Suivant
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      size="lg"
                      className="flex-1 bg-secondary hover:bg-secondary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          {formData.montantAbonnement === 0 ? "Publication..." : "Redirection paiement..."}
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          {formData.montantAbonnement === 0 ? "Publier Gratuitement" : `Payer ${formData.montantAbonnement}€ et Publier`}
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Vendre;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import FormSection1 from "@/components/vendre/FormSection1";
import FormSection2 from "@/components/vendre/FormSection2";
import FormSection3 from "@/components/vendre/FormSection3";
import FormSection4 from "@/components/vendre/FormSection4";
import FormSection5 from "@/components/vendre/FormSection5";
import FormSection15 from "@/components/vendre/FormSection15";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";

const Vendre = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 15;

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
    
    // Section 6
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
    
    // Section 7
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
    
    // Section 8
    motifVente: "",
    precisionsVente: "",
    
    // Section 9
    atoutsPrincipaux: "",
    potentielDeveloppement: "",
    clienteleFidelePct: "",
    reputationLocale: 3,
    presenceDigitale: [],
    elementsDifferenciants: "",
    
    // Section 10
    typeTransmission: "",
    accompagnementPropose: {},
    delaiVente: "",
    conditionsParticulieres: "",
    
    // Section 11
    niveauAnonymat: "semi-anonyme",
    documentsDisponibles: [],
    ndaRequis: false,
    
    // Section 12
    photosEntreprise: [],
    photosMateriel: [],
    photosRealisations: [],
    videoPresentation: "",
    
    // Section 13
    financementBancaire: "oui",
    complementVendeur: false,
    complementVendeurMontant: "",
    complementVendeurDuree: "",
    apportRequis: "",
    
    // Section 14
    infosComplementaires: "",
    commentairesAcheteurs: "",
    visitesPossibles: "sur-rdv",
    
    // Section 15
    formuleAbonnement: "essentiel",
    montantAbonnement: 290,
    accepteCGU: false,
    accepteContact: false,
    certifieExactitude: false,
    newsletter: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

      // Calculer la date d'expiration basée sur la formule choisie
      const dureeMap: Record<string, number> = {
        "decouverte": 30,
        "essentiel": 90,
        "prime": 90,
        "exclusif": 90,
      };
      const dureeDays = dureeMap[formData.formuleAbonnement] || 90;
      const dateExpiration = new Date();
      dateExpiration.setDate(dateExpiration.getDate() + dureeDays);

      // Préparer les données pour la base de données
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
        annee_creation: parseInt(formData.anneeCreation),
        departement: formData.departement,
        ville: formData.ville,
        code_postal: formData.codePostal,
        description_activite: formData.descriptionActivite,
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
        ca_n1: parseFloat(formData.caN1),
        ca_previsionnel: formData.caPrevisionnel ? parseFloat(formData.caPrevisionnel) : null,
        ebe_n1: formData.ebeN1 ? parseFloat(formData.ebeN1) : null,
        resultat_net_n1: parseFloat(formData.resultatNetN1),
        prix_vente: parseFloat(formData.prixVente),
        prix_negociable: formData.prixNegociable,
        marge_negociation: formData.margeNegociation ? parseFloat(formData.margeNegociation) : null,
        nombre_salaries: parseInt(formData.nombreSalaries),
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
        dettes_totales: parseFloat(formData.dettesTotales),
        dette_urssaf: formData.detteURSSAF ? parseFloat(formData.detteURSSAF) : null,
        dette_tva: formData.detteTVA ? parseFloat(formData.detteTVA) : null,
        dette_fournisseurs: formData.detteFournisseurs ? parseFloat(formData.detteFournisseurs) : null,
        dette_banques: formData.detteBanques ? parseFloat(formData.detteBanques) : null,
        credits_en_cours: formData.creditsEnCours,
        montant_credits: formData.montantCredits ? parseFloat(formData.montantCredits) : null,
        credits_transferables: formData.creditsTransferables,
        litiges_en_cours: formData.litigesEnCours,
        nature_litiges: formData.natureLitiges || null,
        motif_vente: formData.motifVente,
        precisions_vente: formData.precisionsVente || null,
        atouts_principaux: formData.atoutsPrincipaux,
        potentiel_developpement: formData.potentielDeveloppement || null,
        clientele_fidele_pct: formData.clienteleFidelePct ? parseFloat(formData.clienteleFidelePct) : null,
        reputation_locale: formData.reputationLocale,
        presence_digitale: formData.presenceDigitale.length > 0 ? formData.presenceDigitale : null,
        elements_differenciants: formData.elementsDifferenciants || null,
        type_transmission: formData.typeTransmission,
        accompagnement_propose: Object.keys(formData.accompagnementPropose).length > 0 ? formData.accompagnementPropose : null,
        delai_vente: formData.delaiVente,
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
        statut: 'publiee',
      };

      const { data, error } = await supabase
        .from('annonces')
        .insert(annonceData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Annonce créée !",
        description: "Votre annonce a été publiée avec succès.",
      });

      navigate(`/entreprises`);
    } catch (error: any) {
      console.error('Error creating annonce:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création de l'annonce.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const renderCurrentSection = () => {
    switch (currentStep) {
      case 1:
        return <FormSection1 formData={formData} handleInputChange={handleInputChange} />;
      case 2:
        return <FormSection2 formData={formData} handleInputChange={handleInputChange} />;
      case 3:
        return <FormSection3 formData={formData} handleInputChange={handleInputChange} />;
      case 4:
        return <FormSection4 formData={formData} handleInputChange={handleInputChange} />;
      case 5:
        return <FormSection5 formData={formData} handleInputChange={handleInputChange} />;
      case 15:
        return <FormSection15 formData={formData} handleInputChange={handleInputChange} />;
      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Section {currentStep} - En développement</p>
            <p className="text-sm text-muted-foreground mt-2">
              Cette section sera complétée prochainement. Vous pouvez passer à l'étape suivante.
            </p>
          </div>
        );
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
              Formulaire complet • Publication rapide • Accompagnement expert
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
              <div className="flex gap-4 mt-8 pt-8 border-t">
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
                        Publication...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Publier l'Annonce
                      </>
                    )}
                  </Button>
                )}
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
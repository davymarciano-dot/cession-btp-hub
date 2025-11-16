import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { debounce } from "lodash";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  Trash2,
  Upload,
  X,
  CheckCircle2,
  Building2,
  User,
  Euro,
  Users,
  Camera,
  FileText,
  Eye,
  AlertCircle,
  Crown,
  Zap,
  Star,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";

const STORAGE_KEY = "cessionBTP_form_draft";

// Types
interface FormData {
  // Section 1: Contact
  civilite: string;
  nomPrenom: string;
  email: string;
  telephone: string;
  preferenceContact: string;

  // Section 2: Entreprise
  raisonSociale: string;
  formeJuridique: string;
  siret: string;
  secteurActivite: string;
  anneeCreation: string;
  departement: string;
  ville: string;
  codePostal: string;

  // Section 3: Activité
  descriptionActivite: string;
  specialites: string;
  certifications: string[];
  clienteleParticuliers: boolean | undefined;
  clienteleProfessionnels: boolean | undefined;

  // Section 4: Financier
  caN1: string;
  caN2: string;
  caN3: string;
  ebeN1: string;
  resultatNetN1: string;
  prixVente: string;
  prixNegociable: boolean;

  // Section 5: Équipe
  nombreSalaries: string;
  nombreCDI: string;
  masseSalariale: string;
  accompagnementVendeur: boolean;

  // Section 6: Photos
  photosEntreprise: File[];
  photosMateriel: File[];
  photosRealisations: File[];

  // Section 7: Publication
  formuleAbonnement: string;
  montantAbonnement: number;
  stripePriceId: string;
  accepteCGU: boolean;
  certifieExactitude: boolean;
}

// Steps Configuration avec icônes
const STEPS = [
  {
    id: 1,
    title: "Vos coordonnées",
    subtitle: "Informations de contact",
    icon: User,
    fields: ["civilite", "nomPrenom", "email", "telephone"],
  },
  {
    id: 2,
    title: "Votre entreprise",
    subtitle: "Informations légales",
    icon: Building2,
    fields: ["raisonSociale", "formeJuridique", "siret", "secteurActivite"],
  },
  {
    id: 3,
    title: "Activité",
    subtitle: "Secteur et spécialités",
    icon: FileText,
    fields: ["descriptionActivite", "specialites"],
  },
  {
    id: 4,
    title: "Financier",
    subtitle: "CA et prix de vente",
    icon: Euro,
    fields: ["caN1", "prixVente"],
  },
  {
    id: 5,
    title: "Équipe",
    subtitle: "Effectifs et salaires",
    icon: Users,
    fields: ["nombreSalaries", "nombreCDI"],
  },
  {
    id: 6,
    title: "Photos",
    subtitle: "Visuels de l'entreprise",
    icon: Camera,
    fields: ["photosEntreprise"],
  },
  {
    id: 7,
    title: "Formule",
    subtitle: "Choisissez votre offre",
    icon: FileText,
    fields: ["formuleAbonnement"],
  },
  {
    id: 8,
    title: "Récapitulatif",
    subtitle: "Vérification avant publication",
    icon: Eye,
    fields: ["accepteCGU", "certifieExactitude"],
  },
];

const Vendre = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoPreviews, setPhotoPreviews] = useState<{
    photosEntreprise: string[];
    photosMateriel: string[];
    photosRealisations: string[];
  }>({
    photosEntreprise: [],
    photosMateriel: [],
    photosRealisations: [],
  });

  const [formData, setFormData] = useState<FormData>({
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

    // Section 4
    caN1: "",
    caN2: "",
    caN3: "",
    ebeN1: "",
    resultatNetN1: "",
    prixVente: "",
    prixNegociable: false,

    // Section 5
    nombreSalaries: "",
    nombreCDI: "",
    masseSalariale: "",
    accompagnementVendeur: false,

    // Section 6
    photosEntreprise: [],
    photosMateriel: [],
    photosRealisations: [],

    // Section 7
    formuleAbonnement: "essentiel",
    montantAbonnement: 290,
    stripePriceId: "price_1SS7lN2ItaOC3ukRjM2C8ZTd",
    accepteCGU: false,
    certifieExactitude: false,
  });

  // Restaurer le brouillon
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        toast({
          title: "📋 Brouillon trouvé",
          description: "Voulez-vous reprendre où vous vous êtes arrêté ?",
          duration: 10000,
          action: (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  localStorage.removeItem(STORAGE_KEY);
                }}
              >
                Non
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setFormData(parsedDraft.formData);
                  setCurrentStep(parsedDraft.currentStep || 1);
                  toast({
                    title: "✅ Brouillon restauré",
                    description: "Vous pouvez continuer votre saisie.",
                  });
                }}
              >
                Oui
              </Button>
            </div>
          ),
        });
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Sauvegarde automatique
  const autoSave = useCallback(
    debounce((data: FormData, step: number) => {
      setIsSaving(true);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          formData: data,
          currentStep: step,
          savedAt: new Date().toISOString(),
        }),
      );

      setTimeout(() => {
        setIsSaving(false);
        toast({
          description: "✓ Sauvegarde automatique",
          duration: 1500,
        });
      }, 500);
    }, 2000),
    [],
  );

  useEffect(() => {
    autoSave(formData, currentStep);
  }, [formData, currentStep, autoSave]);

  // Validation d'une étape
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    const currentStepConfig = STEPS[step - 1];

    currentStepConfig.fields.forEach((field) => {
      const value = formData[field as keyof FormData];

      if (field === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value as string)) {
          newErrors[field] = "Email invalide";
        }
      }

      if (field === "telephone" && value) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test((value as string).replace(/\s/g, ""))) {
          newErrors[field] = "Téléphone invalide (10 chiffres)";
        }
      }

      if (field === "siret" && value) {
        const siretRegex = /^[0-9]{14}$/;
        if (!siretRegex.test((value as string).replace(/\s/g, ""))) {
          newErrors[field] = "SIRET invalide (14 chiffres)";
        }
      }

      // Champs requis pour certaines étapes
      if (!value && ["nomPrenom", "email", "raisonSociale", "prixVente"].includes(field)) {
        newErrors[field] = "Ce champ est requis";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      toast({
        title: "⚠️ Attention",
        description: "Veuillez corriger les erreurs avant de continuer.",
        variant: "destructive",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Upload de photos
  const handlePhotoUpload = (
    category: "photosEntreprise" | "photosMateriel" | "photosRealisations",
    files: FileList,
  ) => {
    const newFiles = Array.from(files);
    const currentFiles = formData[category] as File[];

    if (currentFiles.length + newFiles.length > 10) {
      toast({
        title: "⚠️ Limite atteinte",
        description: "Maximum 10 photos par catégorie",
        variant: "destructive",
      });
      return;
    }

    // Mise à jour des fichiers
    const updatedFiles = [...currentFiles, ...newFiles];
    setFormData((prev) => ({ ...prev, [category]: updatedFiles }));

    // Création des previews
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreviews((prev) => ({
          ...prev,
          [category]: [...prev[category], reader.result as string],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (category: "photosEntreprise" | "photosMateriel" | "photosRealisations", index: number) => {
    const currentFiles = formData[category] as File[];
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [category]: updatedFiles }));

    setPhotoPreviews((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  // Soumission
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      toast({
        title: "⚠️ Formulaire incomplet",
        description: "Veuillez accepter les CGU et certifier l'exactitude des informations.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Confetti !
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Simulation de soumission (à remplacer par votre logique)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      localStorage.removeItem(STORAGE_KEY);

      toast({
        title: "🎉 Annonce créée !",
        description: "Votre annonce a été publiée avec succès.",
      });

      navigate("/entreprises");
    } catch (error: any) {
      toast({
        title: "❌ Erreur",
        description: error.message || "Une erreur est survenue.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ si elle existe
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const clearDraft = () => {
    if (window.confirm("Êtes-vous sûr de vouloir effacer le brouillon ?")) {
      localStorage.removeItem(STORAGE_KEY);
      toast({
        title: "🗑️ Brouillon effacé",
        description: "Votre brouillon a été supprimé.",
      });
    }
  };

  const progressPercentage = (currentStep / STEPS.length) * 100;
  const currentStepConfig = STEPS[currentStep - 1];
  const StepIcon = currentStepConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEOHead page="vendre" />
      <Header />

      {/* Hero avec gradient moderne */}
      <section className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">Vendez Votre Entreprise BTP</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">Un formulaire simple, rapide et sécurisé</p>
            <div className="flex items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Sauvegarde auto</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Validation en temps réel</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Paiement sécurisé</span>
              </div>
            </div>
          </div>
        </div>
        {/* Vague décorative */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgb(248 250 252)"
            />
          </svg>
        </div>
      </section>

      {/* Progress Bar Sticky - Design moderne avec étapes circulaires */}
      <div className="bg-white border-b sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            {/* Steps indicators */}
            <div className="flex items-center justify-between mb-4">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                const isAccessible = currentStep >= step.id;

                return (
                  <div key={step.id} className="flex-1 relative">
                    {/* Ligne de connexion */}
                    {index !== 0 && (
                      <div
                        className={`absolute left-0 right-1/2 top-5 h-0.5 -ml-[50%] ${
                          isCompleted ? "bg-orange-500" : "bg-gray-200"
                        }`}
                        style={{ zIndex: 0 }}
                      />
                    )}

                    {/* Icône de l'étape */}
                    <button
                      onClick={() => isAccessible && setCurrentStep(step.id)}
                      disabled={!isAccessible}
                      className={`relative flex flex-col items-center group ${
                        !isAccessible ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative z-10 ${
                          isCompleted
                            ? "bg-orange-500 border-orange-500 text-white"
                            : isCurrent
                              ? "bg-white border-orange-500 text-orange-500 shadow-lg scale-110"
                              : "bg-white border-gray-300 text-gray-400"
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                      </div>

                      <div
                        className={`mt-2 text-center hidden md:block transition-all ${isCurrent ? "scale-105" : ""}`}
                      >
                        <p className={`text-xs font-semibold ${isCurrent ? "text-orange-600" : "text-gray-600"}`}>
                          {step.title}
                        </p>
                        <p className="text-[10px] text-gray-400">{step.subtitle}</p>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Progress bar moderne */}
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">
                Étape {currentStep} sur {STEPS.length}
              </span>
              <span
                className={`font-medium flex items-center gap-2 ${isSaving ? "text-orange-600" : "text-green-600"}`}
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-orange-600 border-t-transparent" />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Sauvegardé
                  </>
                )}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Content avec animation */}
      <section className="py-12 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header de section avec icône */}
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-8 text-white">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur">
                    <StepIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{currentStepConfig.title}</h2>
                    <p className="text-white/80 text-lg">{currentStepConfig.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Contenu du formulaire */}
              <div className="p-8 md:p-12">
                {/* ÉTAPE 1: Coordonnées */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Civilité *</label>
                        <select
                          value={formData.civilite}
                          onChange={(e) => handleInputChange("civilite", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        >
                          <option value="M">M.</option>
                          <option value="Mme">Mme</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom et Prénom *</label>
                        <input
                          type="text"
                          value={formData.nomPrenom}
                          onChange={(e) => handleInputChange("nomPrenom", e.target.value)}
                          placeholder="Ex: Jean Dupont"
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ${
                            errors.nomPrenom ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.nomPrenom && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.nomPrenom}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="votre@email.com"
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                        <input
                          type="tel"
                          value={formData.telephone}
                          onChange={(e) => handleInputChange("telephone", e.target.value)}
                          placeholder="06 12 34 56 78"
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ${
                            errors.telephone ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.telephone && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.telephone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Préférence de contact</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="preferenceContact"
                            value="email"
                            checked={formData.preferenceContact === "email"}
                            onChange={(e) => handleInputChange("preferenceContact", e.target.value)}
                            className="w-4 h-4 text-orange-500"
                          />
                          <span>Email</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="preferenceContact"
                            value="telephone"
                            checked={formData.preferenceContact === "telephone"}
                            onChange={(e) => handleInputChange("preferenceContact", e.target.value)}
                            className="w-4 h-4 text-orange-500"
                          />
                          <span>Téléphone</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* ÉTAPE 2: Entreprise */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Raison sociale *</label>
                      <input
                        type="text"
                        value={formData.raisonSociale}
                        onChange={(e) => handleInputChange("raisonSociale", e.target.value)}
                        placeholder="Ex: SARL Dupont Maçonnerie"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ${
                          errors.raisonSociale ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.raisonSociale && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.raisonSociale}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Forme juridique *</label>
                        <select
                          value={formData.formeJuridique}
                          onChange={(e) => handleInputChange("formeJuridique", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        >
                          <option value="">Sélectionnez</option>
                          <option value="SARL">SARL</option>
                          <option value="SAS">SAS</option>
                          <option value="SASU">SASU</option>
                          <option value="EURL">EURL</option>
                          <option value="SA">SA</option>
                          <option value="SNC">SNC</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SIRET *</label>
                        <input
                          type="text"
                          value={formData.siret}
                          onChange={(e) => handleInputChange("siret", e.target.value)}
                          placeholder="14 chiffres"
                          maxLength={14}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ${
                            errors.siret ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.siret && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.siret}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité *</label>
                      <select
                        value={formData.secteurActivite}
                        onChange={(e) => handleInputChange("secteurActivite", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                      >
                        <option value="">Sélectionnez</option>
                        <option value="Maçonnerie">Maçonnerie</option>
                        <option value="Plomberie">Plomberie</option>
                        <option value="Électricité">Électricité</option>
                        <option value="Charpente">Charpente</option>
                        <option value="Couverture">Couverture</option>
                        <option value="Menuiserie">Menuiserie</option>
                        <option value="Peinture">Peinture</option>
                        <option value="Terrassement">Terrassement</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Année de création</label>
                        <input
                          type="number"
                          value={formData.anneeCreation}
                          onChange={(e) => handleInputChange("anneeCreation", e.target.value)}
                          placeholder="2010"
                          min="1900"
                          max={new Date().getFullYear()}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Département</label>
                        <input
                          type="text"
                          value={formData.departement}
                          onChange={(e) => handleInputChange("departement", e.target.value)}
                          placeholder="75"
                          maxLength={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Code postal</label>
                        <input
                          type="text"
                          value={formData.codePostal}
                          onChange={(e) => handleInputChange("codePostal", e.target.value)}
                          placeholder="75001"
                          maxLength={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                      <input
                        type="text"
                        value={formData.ville}
                        onChange={(e) => handleInputChange("ville", e.target.value)}
                        placeholder="Paris"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>
                )}

                {/* ÉTAPE 3: Activité */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description de l'activité *
                      </label>
                      <textarea
                        value={formData.descriptionActivite}
                        onChange={(e) => handleInputChange("descriptionActivite", e.target.value)}
                        rows={6}
                        placeholder="Décrivez votre activité, vos spécialités, votre savoir-faire..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                      />
                      <p className="mt-1 text-sm text-gray-500">{formData.descriptionActivite.length} caractères</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Spécialités (séparées par des virgules)
                      </label>
                      <input
                        type="text"
                        value={formData.specialites}
                        onChange={(e) => handleInputChange("specialites", e.target.value)}
                        placeholder="Ex: Rénovation, Extension, Construction neuve"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Types de clientèle</label>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition">
                          <input
                            type="checkbox"
                            checked={formData.clienteleParticuliers || false}
                            onChange={(e) => handleInputChange("clienteleParticuliers", e.target.checked)}
                            className="w-5 h-5 text-orange-500 rounded"
                          />
                          <div>
                            <p className="font-medium">Particuliers</p>
                            <p className="text-sm text-gray-500">Travaux pour les particuliers</p>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition">
                          <input
                            type="checkbox"
                            checked={formData.clienteleProfessionnels || false}
                            onChange={(e) => handleInputChange("clienteleProfessionnels", e.target.checked)}
                            className="w-5 h-5 text-orange-500 rounded"
                          />
                          <div>
                            <p className="font-medium">Professionnels</p>
                            <p className="text-sm text-gray-500">Entreprises et professionnels</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* ÉTAPE 4: Financier */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">Informations financières</p>
                          <p>
                            Ces données sont confidentielles et ne seront visibles qu'après signature d'un accord de
                            confidentialité.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CA N-3</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={formData.caN3}
                            onChange={(e) => handleInputChange("caN3", e.target.value)}
                            placeholder="150000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition pr-8"
                          />
                          <span className="absolute right-4 top-3.5 text-gray-500">€</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CA N-2</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={formData.caN2}
                            onChange={(e) => handleInputChange("caN2", e.target.value)}
                            placeholder="180000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition pr-8"
                          />
                          <span className="absolute right-4 top-3.5 text-gray-500">€</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CA N-1 *</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={formData.caN1}
                            onChange={(e) => handleInputChange("caN1", e.target.value)}
                            placeholder="200000"
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition pr-8 ${
                              errors.caN1 ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          <span className="absolute right-4 top-3.5 text-gray-500">€</span>
                        </div>
                        {errors.caN1 && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.caN1}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">EBE N-1</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={formData.ebeN1}
                            onChange={(e) => handleInputChange("ebeN1", e.target.value)}
                            placeholder="50000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition pr-8"
                          />
                          <span className="absolute right-4 top-3.5 text-gray-500">€</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Résultat net N-1</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={formData.resultatNetN1}
                            onChange={(e) => handleInputChange("resultatNetN1", e.target.value)}
                            placeholder="30000"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition pr-8"
                          />
                          <span className="absolute right-4 top-3.5 text-gray-500">€</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prix de vente souhaité *</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={formData.prixVente}
                            onChange={(e) => handleInputChange("prixVente", e.target.value)}
                            placeholder="250000"
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition pr-8 text-lg font-semibold ${
                              errors.prixVente ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          <span className="absolute right-4 top-3.5 text-gray-500 font-semibold">€</span>
                        </div>
                        {errors.prixVente && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.prixVente}
                          </p>
                        )}
                      </div>

                      <div className="mt-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.prixNegociable}
                            onChange={(e) => handleInputChange("prixNegociable", e.target.checked)}
                            className="w-5 h-5 text-orange-500 rounded"
                          />
                          <span className="font-medium">Prix négociable</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* ÉTAPE 5: Équipe */}
                {currentStep === 5 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de salariés *</label>
                        <input
                          type="number"
                          value={formData.nombreSalaries}
                          onChange={(e) => handleInputChange("nombreSalaries", e.target.value)}
                          placeholder="5"
                          min="0"
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ${
                            errors.nombreSalaries ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.nombreSalaries && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.nombreSalaries}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">dont en CDI *</label>
                        <input
                          type="number"
                          value={formData.nombreCDI}
                          onChange={(e) => handleInputChange("nombreCDI", e.target.value)}
                          placeholder="4"
                          min="0"
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ${
                            errors.nombreCDI ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.nombreCDI && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.nombreCDI}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Masse salariale annuelle</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.masseSalariale}
                          onChange={(e) => handleInputChange("masseSalariale", e.target.value)}
                          placeholder="150000"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition pr-8"
                        />
                        <span className="absolute right-4 top-3.5 text-gray-500">€</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <label className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition">
                        <input
                          type="checkbox"
                          checked={formData.accompagnementVendeur}
                          onChange={(e) => handleInputChange("accompagnementVendeur", e.target.checked)}
                          className="w-5 h-5 text-orange-500 rounded mt-0.5"
                        />
                        <div>
                          <p className="font-medium">Accompagnement du vendeur</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Je suis disponible pour accompagner le repreneur pendant une période de transition
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* ÉTAPE 6: Photos */}
                {currentStep === 6 && (
                  <div className="space-y-8 animate-fade-in">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Photos de l'entreprise (max 10)
                      </label>
                      <div className="mt-2">
                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200 group">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                              <Upload className="w-8 h-8 text-orange-600" />
                            </div>
                            <p className="mb-2 text-sm text-gray-600">
                              <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, JPEG jusqu'à 10MB</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={(e) => e.target.files && handlePhotoUpload("photosEntreprise", e.target.files)}
                          />
                        </label>
                      </div>

                      {photoPreviews.photosEntreprise.length > 0 && (
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                          {photoPreviews.photosEntreprise.map((preview, index) => (
                            <div key={index} className="relative group rounded-xl overflow-hidden">
                              <img src={preview} alt={`Photo ${index + 1}`} className="w-full h-40 object-cover" />
                              <button
                                onClick={() => removePhoto("photosEntreprise", index)}
                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                <p className="text-white text-sm font-medium">Photo {index + 1}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Camera className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">Conseils pour de bonnes photos</p>
                          <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>Prenez des photos en bonne lumière naturelle</li>
                            <li>Montrez vos locaux, équipements, et réalisations</li>
                            <li>Évitez les photos floues ou mal cadrées</li>
                            <li>Les photos de qualité augmentent vos chances de vente</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ÉTAPE 7: Choix de la formule */}
                {currentStep === 7 && (
                  <div className="space-y-8 animate-fade-in">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Choisissez votre formule</h3>
                      <p className="text-gray-600">Sélectionnez l'offre qui correspond le mieux à vos besoins</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Formule Gratuite */}
                      <button
                        onClick={() => {
                          handleInputChange("formuleAbonnement", "gratuit");
                          handleInputChange("montantAbonnement", 0);
                          handleInputChange("stripePriceId", "");
                        }}
                        className={`relative p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                          formData.formuleAbonnement === "gratuit"
                            ? "border-orange-500 bg-orange-50 shadow-lg scale-105"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                            <Zap className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">Gratuit</h4>
                            <p className="text-sm text-gray-500">Offre de base</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-gray-900">0€</span>
                            <span className="text-gray-500">/3 mois</span>
                          </div>
                        </div>

                        <ul className="space-y-3 mb-6">
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Annonce visible 3 mois</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Jusqu'à 5 photos</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>Messagerie avec acheteurs</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm text-gray-400">
                            <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>Pas de badge premium</span>
                          </li>
                        </ul>

                        {formData.formuleAbonnement === "gratuit" && (
                          <div className="absolute top-4 right-4">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        )}
                      </button>

                      {/* Formule Essentiel */}
                      <button
                        onClick={() => {
                          handleInputChange("formuleAbonnement", "essentiel");
                          handleInputChange("montantAbonnement", 290);
                          handleInputChange("stripePriceId", "price_1SS7lN2ItaOC3ukRjM2C8ZTd");
                        }}
                        className={`relative p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                          formData.formuleAbonnement === "essentiel"
                            ? "border-orange-500 bg-orange-50 shadow-xl scale-105"
                            : "border-orange-300 hover:border-orange-400 hover:shadow-md"
                        }`}
                      >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            POPULAIRE
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Star className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">Essentiel</h4>
                            <p className="text-sm text-gray-500">Le plus choisi</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-orange-600">290€</span>
                            <span className="text-gray-500">/6 mois</span>
                          </div>
                        </div>

                        <ul className="space-y-3 mb-6">
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="font-medium">Annonce visible 6 mois</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="font-medium">Jusqu'à 10 photos</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="font-medium">Badge "Annonce Premium"</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="font-medium">Mise en avant dans les résultats</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="font-medium">Statistiques de vues</span>
                          </li>
                        </ul>

                        {formData.formuleAbonnement === "essentiel" && (
                          <div className="absolute top-4 right-4">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        )}
                      </button>

                      {/* Formule Premium */}
                      <button
                        onClick={() => {
                          handleInputChange("formuleAbonnement", "premium");
                          handleInputChange("montantAbonnement", 490);
                          handleInputChange("stripePriceId", "price_premium_example");
                        }}
                        className={`relative p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                          formData.formuleAbonnement === "premium"
                            ? "border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-xl scale-105"
                            : "border-yellow-300 hover:border-yellow-400 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center">
                            <Crown className="w-6 h-6 text-yellow-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">Premium</h4>
                            <p className="text-sm text-gray-500">Visibilité maximale</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-yellow-600">490€</span>
                            <span className="text-gray-500">/12 mois</span>
                          </div>
                        </div>

                        <ul className="space-y-3 mb-6">
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="font-medium">Annonce visible 12 mois</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="font-medium">Photos illimitées</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="font-medium">Badge "TOP Annonce"</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="font-medium">Toujours en haut des résultats</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="font-medium">Statistiques avancées</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="font-medium">Support prioritaire</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="font-medium">Accompagnement personnalisé</span>
                          </li>
                        </ul>

                        {formData.formuleAbonnement === "premium" && (
                          <div className="absolute top-4 right-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">💡 Conseil</p>
                          <p>
                            Les annonces premium sont vendues <strong>3x plus rapidement</strong> que les annonces
                            gratuites grâce à leur visibilité accrue.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ÉTAPE 8: Récapitulatif */}
                {currentStep === 8 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Vérifiez vos informations</h3>
                          <p className="text-gray-600">
                            Assurez-vous que toutes les informations sont correctes avant de publier votre annonce.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Récapitulatif des données */}
                    <div className="space-y-4">
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <User className="w-5 h-5 text-orange-500" />
                          Vos coordonnées
                        </h4>
                        <dl className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <dt className="text-gray-500">Nom</dt>
                            <dd className="font-medium text-gray-900">{formData.nomPrenom}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-500">Email</dt>
                            <dd className="font-medium text-gray-900">{formData.email}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-500">Téléphone</dt>
                            <dd className="font-medium text-gray-900">{formData.telephone}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-orange-500" />
                          Votre entreprise
                        </h4>
                        <dl className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <dt className="text-gray-500">Raison sociale</dt>
                            <dd className="font-medium text-gray-900">{formData.raisonSociale}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-500">Forme juridique</dt>
                            <dd className="font-medium text-gray-900">{formData.formeJuridique}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-500">Secteur</dt>
                            <dd className="font-medium text-gray-900">{formData.secteurActivite}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-500">Localisation</dt>
                            <dd className="font-medium text-gray-900">
                              {formData.ville} ({formData.departement})
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Euro className="w-5 h-5 text-orange-500" />
                          Informations financières
                        </h4>
                        <dl className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <dt className="text-gray-500">CA N-1</dt>
                            <dd className="font-medium text-gray-900">{formData.caN1} €</dd>
                          </div>
                          <div>
                            <dt className="text-gray-500">Prix de vente</dt>
                            <dd className="font-semibold text-orange-600 text-lg">{formData.prixVente} €</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          {formData.formuleAbonnement === "premium" && <Crown className="w-5 h-5 text-yellow-500" />}
                          {formData.formuleAbonnement === "essentiel" && <Star className="w-5 h-5 text-orange-500" />}
                          {formData.formuleAbonnement === "gratuit" && <Zap className="w-5 h-5 text-gray-500" />}
                          Formule sélectionnée
                        </h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-lg capitalize">{formData.formuleAbonnement}</p>
                            <p className="text-sm text-gray-500">
                              {formData.formuleAbonnement === "gratuit" && "3 mois de visibilité"}
                              {formData.formuleAbonnement === "essentiel" && "6 mois de visibilité"}
                              {formData.formuleAbonnement === "premium" && "12 mois de visibilité"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-orange-600">{formData.montantAbonnement}€</p>
                            {formData.montantAbonnement === 0 && (
                              <p className="text-xs text-green-600 font-medium">Gratuit</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {photoPreviews.photosEntreprise.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Camera className="w-5 h-5 text-orange-500" />
                            Photos ({photoPreviews.photosEntreprise.length})
                          </h4>
                          <div className="grid grid-cols-4 gap-2">
                            {photoPreviews.photosEntreprise.slice(0, 4).map((preview, index) => (
                              <img
                                key={index}
                                src={preview}
                                alt={`Photo ${index + 1}`}
                                className="w-full h-20 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* CGU et conditions */}
                    <div className="space-y-4 pt-6 border-t border-gray-200">
                      <label
                        className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition ${
                          formData.accepteCGU ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.accepteCGU}
                          onChange={(e) => handleInputChange("accepteCGU", e.target.checked)}
                          className="w-5 h-5 text-orange-500 rounded mt-0.5"
                        />
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">
                            J'accepte les Conditions Générales d'Utilisation *
                          </p>
                          <p className="text-gray-500 mt-1">
                            En cochant cette case, vous acceptez nos{" "}
                            <a href="/cgu" className="text-orange-600 hover:underline">
                              conditions générales
                            </a>
                          </p>
                        </div>
                      </label>

                      <label
                        className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition ${
                          formData.certifieExactitude
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.certifieExactitude}
                          onChange={(e) => handleInputChange("certifieExactitude", e.target.checked)}
                          className="w-5 h-5 text-orange-500 rounded mt-0.5"
                        />
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">
                            Je certifie l'exactitude des informations fournies *
                          </p>
                          <p className="text-gray-500 mt-1">
                            Les informations que vous avez fournies sont exactes et à jour
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-green-800">
                          <p className="font-medium mb-1">Prêt à publier ?</p>
                          <p>
                            Votre annonce sera visible par des milliers d'acheteurs potentiels dès sa publication.
                            {formData.montantAbonnement > 0 && (
                              <>
                                {" "}
                                Vous serez redirigé vers le paiement sécurisé de{" "}
                                <strong>{formData.montantAbonnement}€</strong>.
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="p-8 pt-0">
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <Button onClick={clearDraft} variant="ghost" size="sm" className="text-gray-500 hover:text-red-600">
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
                        className="flex-1 border-2 border-gray-300 hover:border-gray-400"
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Précédent
                      </Button>
                    )}

                    {currentStep < STEPS.length ? (
                      <Button
                        onClick={handleNext}
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg"
                      >
                        Suivant
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                        disabled={isSubmitting || !formData.accepteCGU || !formData.certifieExactitude}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                            {formData.montantAbonnement === 0 ? "Publication..." : "Redirection..."}
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            {formData.montantAbonnement === 0
                              ? "Publier Gratuitement"
                              : `Payer ${formData.montantAbonnement}€ et Publier`}
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Vendre;

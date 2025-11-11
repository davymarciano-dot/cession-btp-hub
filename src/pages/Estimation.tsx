import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Calculator, TrendingUp, Users, FileText, CreditCard, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BTPMetiersSelect } from "@/data/btp-metiers";
import { useToast } from "@/hooks/use-toast";

const Estimation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    // Section 1: Informations Générales
    secteur: "",
    departement: "",
    anneeCreation: "",
    
    // Section 2: Chiffre d'Affaires
    caN2: "",
    caN1: "",
    caN: "",
    
    // Section 3: Résultats
    resultatN1Type: "positif",
    resultatN1: "",
    resultatN2Type: "positif",
    resultatN2: "",
    
    // Section 4: Personnel
    nombreEmployes: "",
    nombreCDI: "",
    nombreCDD: "",
    nombreApprentis: "",
    
    // Section 5: Dettes
    aDettes: "non",
    detteURSSAF: "",
    detteTVA: "",
    detteLoyer: "",
    detteFournisseurs: "",
    detteAutres: "",
    montantPassif: "",
    
    // Section 6: Crédits
    aCredits: "non",
    creditProfessionnel: "",
    creditMateriel: "",
    creditImmobilier: "",
    
    // Section 7: Actifs
    valeurMateriel: "",
    valeurStock: "",
    situationLocaux: "locataire",
    valeurLocaux: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  const handleInputChange = (field: string, value: string) => {
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

  const handleSubmit = () => {
    // Calcul simplifié de l'estimation
    const ca = parseFloat(formData.caN1) || 0;
    const resultat = parseFloat(formData.resultatN1) || 0;
    const passif = parseFloat(formData.montantPassif) || 0;
    const actifs = (parseFloat(formData.valeurMateriel) || 0) + (parseFloat(formData.valeurStock) || 0);
    
    // Formule simplifiée: (CA × 0.6) + Résultat - Passif + Actifs
    const estimation = Math.round((ca * 0.6) + resultat - passif + actifs);
    
    toast({
      title: "✅ Estimation calculée !",
      description: `Valeur estimée : ${estimation.toLocaleString('fr-FR')} €`,
    });
    
    // Rediriger vers la page de résultat ou vendre
    setTimeout(() => {
      navigate("/vendre");
    }, 2000);
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Calculator className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Estimez la Valeur de Votre Entreprise BTP
            </h1>
            <p className="text-xl text-white/90">
              Estimation gratuite en 48h • Valorisation par IA • 100% confidentiel
            </p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-white border-b sticky top-0 z-40">
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
              
              {/* Step 1: Informations Générales */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold">Informations Générales</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="secteur">Secteur d'activité BTP *</Label>
                      <Select value={formData.secteur} onValueChange={(value) => handleInputChange("secteur", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre secteur" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          <BTPMetiersSelect />
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="departement">Département *</Label>
                      <Input
                        id="departement"
                        placeholder="Ex: 75, 69, 13..."
                        value={formData.departement}
                        onChange={(e) => handleInputChange("departement", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="anneeCreation">Année de création de l'entreprise *</Label>
                      <Input
                        id="anneeCreation"
                        type="number"
                        placeholder="Ex: 2010"
                        value={formData.anneeCreation}
                        onChange={(e) => handleInputChange("anneeCreation", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Chiffre d'Affaires */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold">Chiffre d'Affaires</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="caN2">CA année N-2 (il y a 2 ans) *</Label>
                      <Input
                        id="caN2"
                        type="number"
                        placeholder="Ex: 500000"
                        value={formData.caN2}
                        onChange={(e) => handleInputChange("caN2", e.target.value)}
                      />
                      <p className="text-sm text-gray-500 mt-1">En euros</p>
                    </div>

                    <div>
                      <Label htmlFor="caN1">CA année N-1 (l'année dernière) *</Label>
                      <Input
                        id="caN1"
                        type="number"
                        placeholder="Ex: 650000"
                        value={formData.caN1}
                        onChange={(e) => handleInputChange("caN1", e.target.value)}
                      />
                      <p className="text-sm text-gray-500 mt-1">En euros</p>
                    </div>

                    <div>
                      <Label htmlFor="caN">CA année N (en cours ou estimé)</Label>
                      <Input
                        id="caN"
                        type="number"
                        placeholder="Ex: 700000"
                        value={formData.caN}
                        onChange={(e) => handleInputChange("caN", e.target.value)}
                      />
                      <p className="text-sm text-gray-500 mt-1">En euros (optionnel)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Résultats */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Calculator className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold">Résultats Financiers</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Résultat N-1 */}
                    <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                      <h3 className="font-semibold">Résultat net N-1 (l'année dernière)</h3>
                      
                      <RadioGroup 
                        value={formData.resultatN1Type} 
                        onValueChange={(value) => handleInputChange("resultatN1Type", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="positif" id="resultatN1-positif" />
                          <Label htmlFor="resultatN1-positif">Positif (bénéfice)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="negatif" id="resultatN1-negatif" />
                          <Label htmlFor="resultatN1-negatif">Négatif (perte)</Label>
                        </div>
                      </RadioGroup>

                      <div>
                        <Label htmlFor="resultatN1">Montant *</Label>
                        <Input
                          id="resultatN1"
                          type="number"
                          placeholder="Ex: 50000"
                          value={formData.resultatN1}
                          onChange={(e) => handleInputChange("resultatN1", e.target.value)}
                        />
                        <p className="text-sm text-gray-500 mt-1">En euros (valeur absolue)</p>
                      </div>
                    </div>

                    {/* Résultat N-2 */}
                    <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                      <h3 className="font-semibold">Résultat net N-2 (il y a 2 ans)</h3>
                      
                      <RadioGroup 
                        value={formData.resultatN2Type} 
                        onValueChange={(value) => handleInputChange("resultatN2Type", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="positif" id="resultatN2-positif" />
                          <Label htmlFor="resultatN2-positif">Positif (bénéfice)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="negatif" id="resultatN2-negatif" />
                          <Label htmlFor="resultatN2-negatif">Négatif (perte)</Label>
                        </div>
                      </RadioGroup>

                      <div>
                        <Label htmlFor="resultatN2">Montant *</Label>
                        <Input
                          id="resultatN2"
                          type="number"
                          placeholder="Ex: 45000"
                          value={formData.resultatN2}
                          onChange={(e) => handleInputChange("resultatN2", e.target.value)}
                        />
                        <p className="text-sm text-gray-500 mt-1">En euros (valeur absolue)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Personnel */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold">Personnel</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nombreEmployes">Nombre total d'employés *</Label>
                      <Input
                        id="nombreEmployes"
                        type="number"
                        placeholder="Ex: 8"
                        value={formData.nombreEmployes}
                        onChange={(e) => handleInputChange("nombreEmployes", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="nombreCDI">Dont CDI</Label>
                        <Input
                          id="nombreCDI"
                          type="number"
                          placeholder="Ex: 6"
                          value={formData.nombreCDI}
                          onChange={(e) => handleInputChange("nombreCDI", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="nombreCDD">Dont CDD</Label>
                        <Input
                          id="nombreCDD"
                          type="number"
                          placeholder="Ex: 1"
                          value={formData.nombreCDD}
                          onChange={(e) => handleInputChange("nombreCDD", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="nombreApprentis">Dont Apprentis</Label>
                        <Input
                          id="nombreApprentis"
                          type="number"
                          placeholder="Ex: 1"
                          value={formData.nombreApprentis}
                          onChange={(e) => handleInputChange("nombreApprentis", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Dettes */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertCircle className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold">Dettes & Passif</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label>Avez-vous des dettes ? *</Label>
                      <RadioGroup 
                        value={formData.aDettes} 
                        onValueChange={(value) => handleInputChange("aDettes", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="oui" id="dettes-oui" />
                          <Label htmlFor="dettes-oui">Oui</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="non" id="dettes-non" />
                          <Label htmlFor="dettes-non">Non</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.aDettes === "oui" && (
                      <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-4">Détaillez vos dettes :</p>
                        
                        <div>
                          <Label htmlFor="detteURSSAF">URSSAF</Label>
                          <Input
                            id="detteURSSAF"
                            type="number"
                            placeholder="Montant en €"
                            value={formData.detteURSSAF}
                            onChange={(e) => handleInputChange("detteURSSAF", e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="detteTVA">TVA</Label>
                          <Input
                            id="detteTVA"
                            type="number"
                            placeholder="Montant en €"
                            value={formData.detteTVA}
                            onChange={(e) => handleInputChange("detteTVA", e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="detteLoyer">Loyer impayé</Label>
                          <Input
                            id="detteLoyer"
                            type="number"
                            placeholder="Montant en €"
                            value={formData.detteLoyer}
                            onChange={(e) => handleInputChange("detteLoyer", e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="detteFournisseurs">Fournisseurs</Label>
                          <Input
                            id="detteFournisseurs"
                            type="number"
                            placeholder="Montant en €"
                            value={formData.detteFournisseurs}
                            onChange={(e) => handleInputChange("detteFournisseurs", e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="detteAutres">Autres dettes</Label>
                          <Input
                            id="detteAutres"
                            type="number"
                            placeholder="Montant en €"
                            value={formData.detteAutres}
                            onChange={(e) => handleInputChange("detteAutres", e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="montantPassif">Montant total du passif *</Label>
                      <Input
                        id="montantPassif"
                        type="number"
                        placeholder="Ex: 150000"
                        value={formData.montantPassif}
                        onChange={(e) => handleInputChange("montantPassif", e.target.value)}
                      />
                      <p className="text-sm text-gray-500 mt-1">Total de toutes vos dettes en euros</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Crédits */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold">Crédits en Cours</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label>Avez-vous des crédits en cours ? *</Label>
                      <RadioGroup 
                        value={formData.aCredits} 
                        onValueChange={(value) => handleInputChange("aCredits", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="oui" id="credits-oui" />
                          <Label htmlFor="credits-oui">Oui</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="non" id="credits-non" />
                          <Label htmlFor="credits-non">Non</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.aCredits === "oui" && (
                      <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-4">Montants restants dus :</p>
                        
                        <div>
                          <Label htmlFor="creditProfessionnel">Crédit professionnel</Label>
                          <Input
                            id="creditProfessionnel"
                            type="number"
                            placeholder="Montant restant en €"
                            value={formData.creditProfessionnel}
                            onChange={(e) => handleInputChange("creditProfessionnel", e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="creditMateriel">Crédit matériel</Label>
                          <Input
                            id="creditMateriel"
                            type="number"
                            placeholder="Montant restant en €"
                            value={formData.creditMateriel}
                            onChange={(e) => handleInputChange("creditMateriel", e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="creditImmobilier">Crédit immobilier professionnel</Label>
                          <Input
                            id="creditImmobilier"
                            type="number"
                            placeholder="Montant restant en €"
                            value={formData.creditImmobilier}
                            onChange={(e) => handleInputChange("creditImmobilier", e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 7: Actifs */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold">Actifs de l'Entreprise</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="valeurMateriel">Valeur du matériel & véhicules</Label>
                      <Input
                        id="valeurMateriel"
                        type="number"
                        placeholder="Estimation en €"
                        value={formData.valeurMateriel}
                        onChange={(e) => handleInputChange("valeurMateriel", e.target.value)}
                      />
                      <p className="text-sm text-gray-500 mt-1">Valeur actuelle du matériel, outillage, véhicules</p>
                    </div>

                    <div>
                      <Label htmlFor="valeurStock">Valeur du stock</Label>
                      <Input
                        id="valeurStock"
                        type="number"
                        placeholder="Estimation en €"
                        value={formData.valeurStock}
                        onChange={(e) => handleInputChange("valeurStock", e.target.value)}
                      />
                      <p className="text-sm text-gray-500 mt-1">Marchandises, matières premières</p>
                    </div>

                    <div>
                      <Label>Situation des locaux *</Label>
                      <RadioGroup 
                        value={formData.situationLocaux} 
                        onValueChange={(value) => handleInputChange("situationLocaux", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="proprietaire" id="locaux-proprio" />
                          <Label htmlFor="locaux-proprio">Propriétaire</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="locataire" id="locaux-locataire" />
                          <Label htmlFor="locaux-locataire">Locataire</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.situationLocaux === "proprietaire" && (
                      <div>
                        <Label htmlFor="valeurLocaux">Valeur des locaux</Label>
                        <Input
                          id="valeurLocaux"
                          type="number"
                          placeholder="Estimation en €"
                          value={formData.valeurLocaux}
                          onChange={(e) => handleInputChange("valeurLocaux", e.target.value)}
                        />
                        <p className="text-sm text-gray-500 mt-1">Valeur immobilière estimée</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-green-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-green-900 mb-2">Formulaire complété !</h3>
                        <p className="text-sm text-green-700">
                          Vous êtes prêt à recevoir votre estimation gratuite. Notre algorithme d'IA va analyser toutes les données et vous envoyer un rapport détaillé sous 48h.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8 pt-8 border-t">
                {currentStep > 1 && (
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    ← Précédent
                  </Button>
                )}
                
                {currentStep < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Suivant →
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    size="lg"
                    className="flex-1 bg-secondary hover:bg-secondary/90"
                  >
                    💰 Obtenir Mon Estimation Gratuite
                  </Button>
                )}
              </div>

              {/* Security Notice */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Résultat immédiat par IA • Sans engagement • 100% confidentiel</span>
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

export default Estimation;
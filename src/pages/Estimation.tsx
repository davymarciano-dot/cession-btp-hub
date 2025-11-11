import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Calculator, TrendingUp, Check, Award, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BTPMetiersSelect } from "@/data/btp-metiers";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Estimation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    secteur: "",
    departement: "",
    anneeCreation: "",
    caN1: "",
    caN2: "",
    resultatN1Type: "positif",
    resultatN1: "",
    nombreEmployes: "",
    valeurMateriel: "",
    dettesTotales: "",
    typeClientele: "particuliers",
    certificationRGE: "non",
    rgeSecteursIsolation: false,
    rgeSecteursPAC: false,
    rgeSecteursPhotovoltaique: false,
    rgeSecteursChauffageBois: false,
    rgeSecteursFenetres: false,
    rgeSecteursVentilation: false,
    rgeSecteursAudit: false,
    rgeSecteursAutre: false,
    partenaireFinancement: "non",
    partenairesListe: [] as string[],
  });

  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [estimation, setEstimation] = useState<{
    min: number;
    max: number;
    moyenne: number;
    analyse?: string;
    pointsForts?: string[];
    recommandations?: string[];
  }>({ min: 0, max: 0, moyenne: 0 });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const handlePartenaireToggle = (partenaire: string) => {
    setFormData(prev => {
      const currentList = prev.partenairesListe;
      const isSelected = currentList.includes(partenaire);
      
      return {
        ...prev,
        partenairesListe: isSelected
          ? currentList.filter(p => p !== partenaire)
          : [...currentList, partenaire]
      };
    });
  };

  const calculateEstimation = async () => {
    try {
      toast({
        title: "⏳ Analyse en cours...",
        description: "Notre IA analyse votre entreprise (cela peut prendre 10-20 secondes)",
      });

      const { data, error } = await supabase.functions.invoke('generate-estimation', {
        body: formData
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      const { estimation: aiEstimation } = data;
      
      setEstimation({ 
        min: aiEstimation.estimationBasse, 
        max: aiEstimation.estimationHaute, 
        moyenne: aiEstimation.estimationMoyenne,
        analyse: aiEstimation.analyseDetaillee,
        pointsForts: aiEstimation.pointsForts,
        recommandations: aiEstimation.recommandations
      });
      setShowResults(true);
      
      toast({
        title: "✅ Estimation IA calculée !",
        description: `Valeur estimée : ${aiEstimation.estimationMoyenne.toLocaleString('fr-FR')} €`,
      });
    } catch (error: any) {
      console.error('Estimation error:', error);
      toast({
        title: "❌ Erreur",
        description: error.message || "Impossible de générer l'estimation. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation minimale
    if (!formData.secteur || !formData.caN1 || !formData.resultatN1) {
      toast({
        title: "❌ Champs manquants",
        description: "Veuillez remplir tous les champs obligatoires (*)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await calculateEstimation();
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Calculator className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Estimez la Valeur de Votre Entreprise BTP
            </h1>
            <p className="text-xl text-white/90 mb-2">
              Estimation gratuite par IA • Valorisation détaillée • 100% confidentiel
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <Check className="w-4 h-4" />
              <span>Résultat en 2 minutes • Sans engagement • Confidentiel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {!showResults ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <TrendingUp className="w-7 h-7 text-primary" />
                  Estimation Gratuite par IA
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Question 1: Secteur */}
                  <div>
                    <Label htmlFor="secteur" className="text-base">
                      1. Secteur d'activité BTP <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.secteur} onValueChange={(value) => handleInputChange("secteur", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Sélectionnez votre secteur" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] overflow-y-auto">
                        <BTPMetiersSelect />
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Question 2: Département */}
                  <div>
                    <Label htmlFor="departement" className="text-base">
                      2. Département <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="departement"
                      placeholder="Ex: 75, 69, 13..."
                      value={formData.departement}
                      onChange={(e) => handleInputChange("departement", e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>

                  {/* Question 3: Année création */}
                  <div>
                    <Label htmlFor="anneeCreation" className="text-base">
                      3. Année de création <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="anneeCreation"
                      type="number"
                      placeholder="Ex: 2010"
                      value={formData.anneeCreation}
                      onChange={(e) => handleInputChange("anneeCreation", e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-lg mb-4">Données Financières</h3>
                    
                    {/* Question 4: CA N-1 */}
                    <div className="mb-4">
                      <Label htmlFor="caN1" className="text-base">
                        4. Chiffre d'affaires année dernière (N-1) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="caN1"
                        type="number"
                        placeholder="Ex: 650000"
                        value={formData.caN1}
                        onChange={(e) => handleInputChange("caN1", e.target.value)}
                        className="mt-2"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">En euros</p>
                    </div>

                    {/* Question 5: CA N-2 */}
                    <div className="mb-4">
                      <Label htmlFor="caN2" className="text-base">
                        5. Chiffre d'affaires il y a 2 ans (N-2) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="caN2"
                        type="number"
                        placeholder="Ex: 500000"
                        value={formData.caN2}
                        onChange={(e) => handleInputChange("caN2", e.target.value)}
                        className="mt-2"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">En euros (pour calculer la tendance)</p>
                    </div>

                    {/* Question 6: Résultat */}
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <Label className="text-base mb-3 block">
                        6. Résultat net année dernière (N-1) <span className="text-red-500">*</span>
                      </Label>
                      
                      <RadioGroup 
                        value={formData.resultatN1Type} 
                        onValueChange={(value) => handleInputChange("resultatN1Type", value)}
                        className="mb-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="positif" id="resultat-positif" />
                          <Label htmlFor="resultat-positif">Positif (bénéfice)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="negatif" id="resultat-negatif" />
                          <Label htmlFor="resultat-negatif">Négatif (perte)</Label>
                        </div>
                      </RadioGroup>

                      <Input
                        id="resultatN1"
                        type="number"
                        placeholder="Ex: 50000"
                        value={formData.resultatN1}
                        onChange={(e) => handleInputChange("resultatN1", e.target.value)}
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">Montant en euros (valeur absolue)</p>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-lg mb-4">Structure de l'Entreprise</h3>
                    
                    {/* Question 7: Nombre employés */}
                    <div className="mb-4">
                      <Label htmlFor="nombreEmployes" className="text-base">
                        7. Nombre de salariés <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="nombreEmployes"
                        type="number"
                        placeholder="Ex: 8"
                        value={formData.nombreEmployes}
                        onChange={(e) => handleInputChange("nombreEmployes", e.target.value)}
                        className="mt-2"
                        required
                      />
                    </div>

                    {/* Question 8: Type clientèle */}
                    <div>
                      <Label className="text-base mb-3 block">
                        8. Type de clientèle principale <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup 
                        value={formData.typeClientele} 
                        onValueChange={(value) => handleInputChange("typeClientele", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="particuliers" id="client-particuliers" />
                          <Label htmlFor="client-particuliers">Particuliers (B2C)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="professionnels" id="client-pro" />
                          <Label htmlFor="client-pro">Professionnels / Entreprises (B2B)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="public" id="client-public" />
                          <Label htmlFor="client-public">Marchés publics</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mixte" id="client-mixte" />
                          <Label htmlFor="client-mixte">Mixte</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-lg mb-4">Actifs & Passifs</h3>
                    
                    {/* Question 9: Valeur matériel */}
                    <div className="mb-4">
                      <Label htmlFor="valeurMateriel" className="text-base">
                        9. Valeur du matériel & véhicules <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="valeurMateriel"
                        type="number"
                        placeholder="Ex: 150000"
                        value={formData.valeurMateriel}
                        onChange={(e) => handleInputChange("valeurMateriel", e.target.value)}
                        className="mt-2"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">Estimation en euros</p>
                    </div>

                    {/* Question 10: Dettes */}
                    <div>
                      <Label htmlFor="dettesTotales" className="text-base">
                        10. Dettes totales <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="dettesTotales"
                        type="number"
                        placeholder="Ex: 80000"
                        value={formData.dettesTotales}
                        onChange={(e) => handleInputChange("dettesTotales", e.target.value)}
                        className="mt-2"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">URSSAF, TVA, fournisseurs, crédits, etc.</p>
                    </div>
                  </div>

                  {/* NOUVEAU: Question 11 - Certification RGE */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Award className="w-6 h-6 text-green-600" />
                      Certifications & Qualifications
                    </h3>
                    
                    <div>
                      <Label className="text-base mb-3 block">
                        11. Êtes-vous certifié RGE ? <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup 
                        value={formData.certificationRGE} 
                        onValueChange={(value) => handleInputChange("certificationRGE", value)}
                        className="mb-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="oui" id="rge-oui" />
                          <Label htmlFor="rge-oui">Oui</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="non" id="rge-non" />
                          <Label htmlFor="rge-non">Non</Label>
                        </div>
                      </RadioGroup>

                      {formData.certificationRGE === "oui" && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Dans quel(s) secteur(s) RGE ?</p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="rge-isolation"
                                checked={formData.rgeSecteursIsolation}
                                onCheckedChange={(checked) => handleCheckboxChange("rgeSecteursIsolation", checked as boolean)}
                              />
                              <Label htmlFor="rge-isolation" className="font-normal">
                                RGE Isolation thermique (ITE, ITI)
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="rge-pac"
                                checked={formData.rgeSecteursPAC}
                                onCheckedChange={(checked) => handleCheckboxChange("rgeSecteursPAC", checked as boolean)}
                              />
                              <Label htmlFor="rge-pac" className="font-normal">
                                RGE Pompes à chaleur (QualiPAC)
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="rge-pv"
                                checked={formData.rgeSecteursPhotovoltaique}
                                onCheckedChange={(checked) => handleCheckboxChange("rgeSecteursPhotovoltaique", checked as boolean)}
                              />
                              <Label htmlFor="rge-pv" className="font-normal">
                                RGE Photovoltaïque (QualiPV)
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="rge-chauffage"
                                checked={formData.rgeSecteursChauffageBois}
                                onCheckedChange={(checked) => handleCheckboxChange("rgeSecteursChauffageBois", checked as boolean)}
                              />
                              <Label htmlFor="rge-chauffage" className="font-normal">
                                RGE Chauffage bois (Qualibois)
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="rge-fenetres"
                                checked={formData.rgeSecteursFenetres}
                                onCheckedChange={(checked) => handleCheckboxChange("rgeSecteursFenetres", checked as boolean)}
                              />
                              <Label htmlFor="rge-fenetres" className="font-normal">
                                RGE Fenêtres et menuiseries
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="rge-ventilation"
                                checked={formData.rgeSecteursVentilation}
                                onCheckedChange={(checked) => handleCheckboxChange("rgeSecteursVentilation", checked as boolean)}
                              />
                              <Label htmlFor="rge-ventilation" className="font-normal">
                                RGE Ventilation (VMC)
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="rge-audit"
                                checked={formData.rgeSecteursAudit}
                                onCheckedChange={(checked) => handleCheckboxChange("rgeSecteursAudit", checked as boolean)}
                              />
                              <Label htmlFor="rge-audit" className="font-normal">
                                RGE Audit énergétique
                              </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="rge-autre"
                                checked={formData.rgeSecteursAutre}
                                onCheckedChange={(checked) => handleCheckboxChange("rgeSecteursAutre", checked as boolean)}
                              />
                              <Label htmlFor="rge-autre" className="font-normal">
                                Autre secteur RGE
                              </Label>
                            </div>
                          </div>

                          <div className="mt-3 p-3 bg-white rounded border border-green-300">
                            <p className="text-sm text-green-700 flex items-center gap-2">
                              <Award className="w-4 h-4" />
                              <span className="font-medium">Bonus valorisation : +10% pour certification RGE</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* NOUVEAU: Question 12 - Partenariats Financement */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Building2 className="w-6 h-6 text-blue-600" />
                      Partenariats Financiers
                    </h3>
                    
                    <div>
                      <Label className="text-base mb-3 block">
                        12. Êtes-vous en partenariat avec des organismes de financement ? <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup 
                        value={formData.partenaireFinancement} 
                        onValueChange={(value) => handleInputChange("partenaireFinancement", value)}
                        className="mb-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="oui" id="financement-oui" />
                          <Label htmlFor="financement-oui">Oui</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="non" id="financement-non" />
                          <Label htmlFor="financement-non">Non</Label>
                        </div>
                      </RadioGroup>

                      {formData.partenaireFinancement === "oui" && (
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Avec quel(s) organisme(s) ?</p>
                          
                          <div className="space-y-2">
                            {["Domofinance", "Sofinco", "Franfinance", "Cofidis", "Cetelem", "Financo", "Autre"].map((partenaire) => (
                              <div key={partenaire} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`part-${partenaire.toLowerCase()}`}
                                  checked={formData.partenairesListe.includes(partenaire)}
                                  onCheckedChange={() => handlePartenaireToggle(partenaire)}
                                />
                                <Label htmlFor={`part-${partenaire.toLowerCase()}`} className="font-normal">
                                  {partenaire === "Autre" ? "Autre organisme" : partenaire}
                                </Label>
                              </div>
                            ))}
                          </div>

                          {formData.partenairesListe.length > 0 && (
                            <div className="mt-3 p-3 bg-white rounded border border-blue-300">
                              <p className="text-sm text-blue-700 flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                <span className="font-medium">Bonus valorisation : +5% pour partenariats financement</span>
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-secondary hover:bg-secondary/90 text-white text-lg py-6"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Analyse IA en cours...
                        </>
                      ) : (
                        <>💰 Obtenir Mon Estimation Gratuite par IA</>
                      )}
                    </Button>
                    
                    <div className="mt-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Powered by Lovable AI • Sans engagement • 100% confidentiel</span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              // Results Section
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Votre Estimation par IA</h2>
                    <p className="text-gray-600">Basée sur notre IA et 500+ transactions BTP</p>
                  </div>

                  <div className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-xl p-8 mb-6">
                    <div className="text-center">
                      <p className="text-lg mb-2 opacity-90">Valeur estimée</p>
                      <div className="text-5xl font-bold mb-4">
                        {estimation.moyenne.toLocaleString('fr-FR')} €
                      </div>
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <span className="opacity-90">
                          Fourchette : {estimation.min.toLocaleString('fr-FR')} € - {estimation.max.toLocaleString('fr-FR')} €
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">
                        {estimation.min.toLocaleString('fr-FR')} €
                      </div>
                      <p className="text-sm text-gray-600">Estimation basse</p>
                    </div>
                    <div className="bg-secondary/10 p-4 rounded-lg text-center border-2 border-secondary">
                      <div className="text-2xl font-bold text-secondary">
                        {estimation.moyenne.toLocaleString('fr-FR')} €
                      </div>
                      <p className="text-sm text-gray-600 font-semibold">Prix optimal</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">
                        {estimation.max.toLocaleString('fr-FR')} €
                      </div>
                      <p className="text-sm text-gray-600">Estimation haute</p>
                    </div>
                  </div>

                  {estimation.analyse && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        Analyse détaillée par IA
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                        {estimation.analyse}
                      </p>
                      
                      {estimation.pointsForts && estimation.pointsForts.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-sm mb-2">✅ Points forts identifiés</h4>
                          <ul className="space-y-1">
                            {estimation.pointsForts.map((point, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {estimation.recommandations && estimation.recommandations.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-blue-200">
                          <h4 className="font-medium text-sm mb-2">💡 Recommandations</h4>
                          <ul className="space-y-1">
                            {estimation.recommandations.map((reco, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-blue-600 flex-shrink-0">→</span>
                                <span>{reco}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-4">
                    <Button
                      onClick={() => navigate("/vendre")}
                      size="lg"
                      className="w-full bg-secondary hover:bg-secondary/90 text-white"
                    >
                      📝 Publier Mon Annonce Maintenant
                    </Button>
                    <Button
                      onClick={() => setShowResults(false)}
                      size="lg"
                      variant="outline"
                      className="w-full"
                    >
                      🔄 Faire Une Nouvelle Estimation
                    </Button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">💡 Prochaines Étapes</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                      <div>
                        <p className="font-medium">Créez votre annonce complète</p>
                        <p className="text-sm text-gray-600">Ajoutez plus de détails pour attirer les meilleurs acheteurs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                      <div>
                        <p className="font-medium">Recevez des contacts qualifiés</p>
                        <p className="text-sm text-gray-600">Notre IA matche votre entreprise avec les bons repreneurs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                      <div>
                        <p className="font-medium">Vendez en 45 jours</p>
                        <p className="text-sm text-gray-600">Accompagnement expert jusqu'à la signature</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Estimation;
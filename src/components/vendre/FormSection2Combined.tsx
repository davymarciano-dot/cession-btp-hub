import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Search, Loader2 } from "lucide-react";
import { BTPMetiersSelect } from "@/data/btp-metiers";
import { DepartementsSelect } from "@/data/departements";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface FormSection2CombinedProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection2Combined = ({ formData, handleInputChange }: FormSection2CombinedProps) => {
  const [isLoadingSiret, setIsLoadingSiret] = useState(false);
  const { toast } = useToast();
  
  const certifications = [
    "RGE", "Qualibat", "Qualipac", "QualiPV", "Handibat", "Autre"
  ];

  const fetchSiretData = async (siret: string) => {
    if (siret.length !== 14) return;

    setIsLoadingSiret(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-siret-data', {
        body: { siret }
      });

      if (error) throw error;

      if (data) {
        // Remplir automatiquement les champs
        if (data.raisonSociale) handleInputChange("raisonSociale", data.raisonSociale);
        if (data.anneeCreation) handleInputChange("anneeCreation", data.anneeCreation);
        if (data.ville) handleInputChange("ville", data.ville);
        if (data.codePostal) handleInputChange("codePostal", data.codePostal);
        if (data.departement) handleInputChange("departement", data.departement);

        toast({
          title: "✓ Données récupérées",
          description: "Les informations de l'entreprise ont été chargées automatiquement.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur SIRET",
        description: error.message || "Impossible de récupérer les données. Vérifiez le numéro SIRET.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSiret(false);
    }
  };

  const toggleCertification = (cert: string) => {
    const current = formData.certifications || [];
    if (current.includes(cert)) {
      handleInputChange("certifications", current.filter((c: string) => c !== cert));
    } else {
      handleInputChange("certifications", [...current, cert]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Building2 className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Entreprise & Activité</h2>
      </div>

      {/* Informations Entreprise */}
      <div className="space-y-4 p-6 bg-slate-50 rounded-lg">
        <h3 className="font-semibold text-lg">Informations Générales</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="raisonSociale">Raison sociale (optionnel)</Label>
            <Input
              id="raisonSociale"
              value={formData.raisonSociale}
              onChange={(e) => handleInputChange("raisonSociale", e.target.value)}
              placeholder="Mon Entreprise BTP SARL"
            />
          </div>

          <div>
            <Label htmlFor="formeJuridique">Forme juridique *</Label>
            <Select 
              value={formData.formeJuridique} 
              onValueChange={(value) => handleInputChange("formeJuridique", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SARL">SARL</SelectItem>
                <SelectItem value="SAS">SAS</SelectItem>
                <SelectItem value="EURL">EURL</SelectItem>
                <SelectItem value="SCI">SCI</SelectItem>
                <SelectItem value="SASU">SASU</SelectItem>
                <SelectItem value="SA">SA</SelectItem>
                <SelectItem value="auto-entrepreneur">Auto-entrepreneur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="siret">Numéro SIRET (optionnel)</Label>
            <div className="flex gap-2">
              <Input
                id="siret"
                value={formData.siret}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 14);
                  handleInputChange("siret", value);
                }}
                placeholder="123 456 789 00012"
                maxLength={14}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => fetchSiretData(formData.siret)}
                disabled={formData.siret?.length !== 14 || isLoadingSiret}
              >
                {isLoadingSiret ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Cliquez sur la loupe pour remplir automatiquement les informations
            </p>
          </div>

          <div>
            <Label htmlFor="anneeCreation">Année de création *</Label>
            <Input
              id="anneeCreation"
              type="number"
              value={formData.anneeCreation}
              onChange={(e) => handleInputChange("anneeCreation", e.target.value)}
              placeholder="2010"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>

          <div>
            <Label htmlFor="secteurActivite">Secteur d'activité BTP *</Label>
            <Select 
              value={formData.secteurActivite} 
              onValueChange={(value) => handleInputChange("secteurActivite", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto">
                <BTPMetiersSelect />
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="departement">Département *</Label>
            <Select 
              value={formData.departement} 
              onValueChange={(value) => handleInputChange("departement", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto">
                <DepartementsSelect />
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="ville">Ville *</Label>
            <Input
              id="ville"
              value={formData.ville}
              onChange={(e) => handleInputChange("ville", e.target.value)}
              placeholder="Paris"
            />
          </div>

          <div>
            <Label htmlFor="codePostal">Code postal *</Label>
            <Input
              id="codePostal"
              value={formData.codePostal}
              onChange={(e) => handleInputChange("codePostal", e.target.value)}
              placeholder="75001"
              maxLength={5}
            />
          </div>
        </div>
      </div>

      {/* Description Activité */}
      <div className="space-y-4 p-6 bg-slate-50 rounded-lg">
        <h3 className="font-semibold text-lg">Activité & Spécialisation</h3>
        
        <div>
          <Label htmlFor="descriptionActivite">Description de l'activité * (min 200 car.)</Label>
          <Textarea
            id="descriptionActivite"
            value={formData.descriptionActivite}
            onChange={(e) => handleInputChange("descriptionActivite", e.target.value)}
            placeholder="Décrivez votre activité, expertises, références..."
            rows={4}
            minLength={200}
          />
          <p className="text-sm text-muted-foreground mt-1">
            {formData.descriptionActivite?.length || 0} / 200 caractères minimum
          </p>
        </div>

        <div>
          <Label htmlFor="specialites">Spécialités principales</Label>
          <Input
            id="specialites"
            value={formData.specialites}
            onChange={(e) => handleInputChange("specialites", e.target.value)}
            placeholder="Ex: Isolation thermique, Pompes à chaleur..."
          />
        </div>

        <div>
          <Label>Certifications et labels</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center space-x-2">
                <Checkbox
                  id={`cert-${cert}`}
                  checked={(formData.certifications || []).includes(cert)}
                  onCheckedChange={() => toggleCertification(cert)}
                />
                <Label htmlFor={`cert-${cert}`} className="cursor-pointer">{cert}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Type de clientèle *</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="client-particuliers"
                checked={formData.clienteleParticuliers !== undefined}
                onCheckedChange={(checked) => {
                  handleInputChange("clienteleParticuliers", checked ? 50 : undefined);
                }}
              />
              <Label htmlFor="client-particuliers">Particuliers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="client-professionnels"
                checked={formData.clienteleProfessionnels !== undefined}
                onCheckedChange={(checked) => {
                  handleInputChange("clienteleProfessionnels", checked ? 50 : undefined);
                }}
              />
              <Label htmlFor="client-professionnels">Professionnels</Label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rayonIntervention">Rayon d'intervention (km)</Label>
            <Input
              id="rayonIntervention"
              value={formData.rayonIntervention}
              onChange={(e) => handleInputChange("rayonIntervention", e.target.value)}
              placeholder="50"
            />
          </div>
          <div>
            <Label htmlFor="departementsCouverts">Départements couverts</Label>
            <Input
              id="departementsCouverts"
              value={formData.departementsCouverts}
              onChange={(e) => handleInputChange("departementsCouverts", e.target.value)}
              placeholder="75, 77, 78, 91, 92..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection2Combined;

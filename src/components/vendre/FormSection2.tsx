import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2 } from "lucide-react";
import { BTPMetiersSelect } from "@/data/btp-metiers";
import { DepartementsSelect } from "@/data/departements";

interface FormSection2Props {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection2 = ({ formData, handleInputChange }: FormSection2Props) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Building2 className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Informations Entreprise</h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="raisonSociale">Raison sociale (optionnel pour anonymat)</Label>
          <Input
            id="raisonSociale"
            value={formData.raisonSociale}
            onChange={(e) => handleInputChange("raisonSociale", e.target.value)}
            placeholder="Mon Entreprise BTP SARL"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Laissez vide si vous souhaitez rester anonyme
          </p>
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
          <Input
            id="siret"
            value={formData.siret}
            onChange={(e) => handleInputChange("siret", e.target.value)}
            placeholder="123 456 789 00012"
            maxLength={14}
          />
        </div>

        <div>
          <Label htmlFor="secteurActivite">Secteur d'activité BTP *</Label>
          <Select 
            value={formData.secteurActivite} 
            onValueChange={(value) => handleInputChange("secteurActivite", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre secteur" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              <BTPMetiersSelect />
            </SelectContent>
          </Select>
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
  );
};

export default FormSection2;
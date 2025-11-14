import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, Info } from "lucide-react";

interface FormSection9CombinedProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection9Combined = ({ formData, handleInputChange }: FormSection9CombinedProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Image className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Médias & Financement</h2>
      </div>

      {/* Médias */}
      <div className="space-y-4 p-6 bg-slate-50 rounded-lg">
        <h3 className="font-semibold text-lg">Contenu Visuel (optionnel)</h3>
        
        <div>
          <Label htmlFor="videoPresentation">Lien vidéo de présentation</Label>
          <Input
            id="videoPresentation"
            value={formData.videoPresentation}
            onChange={(e) => handleInputChange("videoPresentation", e.target.value)}
            placeholder="https://youtube.com/..."
          />
          <p className="text-xs text-muted-foreground mt-1">
            YouTube, Vimeo ou autre plateforme
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            📸 Les photos et documents peuvent être ajoutés après la création de l'annonce via votre espace membre.
          </p>
        </div>
      </div>

      {/* Financement */}
      <div className="space-y-4 p-6 bg-slate-50 rounded-lg">
        <h3 className="font-semibold text-lg">Conditions de Financement</h3>
        
        <div>
          <Label>Financement bancaire possible *</Label>
          <RadioGroup 
            value={formData.financementBancaire} 
            onValueChange={(value) => handleInputChange("financementBancaire", value)}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oui" id="finance-oui" />
              <Label htmlFor="finance-oui">Oui</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="non" id="finance-non" />
              <Label htmlFor="finance-non">Non</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="partiel" id="finance-partiel" />
              <Label htmlFor="finance-partiel">Partiel</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="complementVendeur"
            checked={formData.complementVendeur}
            onCheckedChange={(checked) => handleInputChange("complementVendeur", checked)}
          />
          <Label htmlFor="complementVendeur">
            Complément de prix vendeur accepté
          </Label>
        </div>

        {formData.complementVendeur && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="complementVendeurMontant">Montant max (€)</Label>
              <Input
                id="complementVendeurMontant"
                type="number"
                value={formData.complementVendeurMontant}
                onChange={(e) => handleInputChange("complementVendeurMontant", e.target.value)}
                placeholder="50000"
              />
            </div>
            <div>
              <Label htmlFor="complementVendeurDuree">Durée de remboursement</Label>
              <Input
                id="complementVendeurDuree"
                value={formData.complementVendeurDuree}
                onChange={(e) => handleInputChange("complementVendeurDuree", e.target.value)}
                placeholder="24 mois"
              />
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="apportRequis">Apport personnel requis (€)</Label>
          <Input
            id="apportRequis"
            type="number"
            value={formData.apportRequis}
            onChange={(e) => handleInputChange("apportRequis", e.target.value)}
            placeholder="100000"
          />
        </div>
      </div>

      {/* Informations complémentaires */}
      <div className="space-y-4 p-6 bg-slate-50 rounded-lg">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          Informations Complémentaires
        </h3>
        
        <div>
          <Label htmlFor="infosComplementaires">Informations importantes</Label>
          <Textarea
            id="infosComplementaires"
            value={formData.infosComplementaires}
            onChange={(e) => handleInputChange("infosComplementaires", e.target.value)}
            placeholder="Éléments supplémentaires à connaître..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="commentairesAcheteurs">Message aux acheteurs potentiels</Label>
          <Textarea
            id="commentairesAcheteurs"
            value={formData.commentairesAcheteurs}
            onChange={(e) => handleInputChange("commentairesAcheteurs", e.target.value)}
            placeholder="Votre message personnalisé..."
            rows={3}
          />
        </div>

        <div>
          <Label>Visites possibles *</Label>
          <RadioGroup 
            value={formData.visitesPossibles} 
            onValueChange={(value) => handleInputChange("visitesPossibles", value)}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oui" id="visite-oui" />
              <Label htmlFor="visite-oui">Oui</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sur-rdv" id="visite-rdv" />
              <Label htmlFor="visite-rdv">Sur RDV</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="non" id="visite-non" />
              <Label htmlFor="visite-non">Non</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <p className="text-sm text-blue-800">
            ✓ Vos informations sont en sécurité et ne seront partagées qu'aux acheteurs qualifiés.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormSection9Combined;

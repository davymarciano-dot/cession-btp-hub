import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Banknote } from "lucide-react";

interface FormSection13Props {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection13 = ({ formData, handleInputChange }: FormSection13Props) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Banknote className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Financement</h2>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Financement bancaire possible *</Label>
          <RadioGroup 
            value={formData.financementBancaire} 
            onValueChange={(value) => handleInputChange("financementBancaire", value)}
            className="flex flex-col gap-3 mt-2"
          >
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="oui" id="financement-oui" />
              <div>
                <Label htmlFor="financement-oui" className="cursor-pointer font-medium">
                  Oui, financement bancaire envisageable
                </Label>
                <p className="text-sm text-muted-foreground">
                  Santé financière permettant un financement classique
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="difficile" id="financement-difficile" />
              <div>
                <Label htmlFor="financement-difficile" className="cursor-pointer font-medium">
                  Difficile
                </Label>
                <p className="text-sm text-muted-foreground">
                  Nécessite un apport important ou des garanties
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="non" id="financement-non" />
              <div>
                <Label htmlFor="financement-non" className="cursor-pointer font-medium">
                  Non
                </Label>
                <p className="text-sm text-muted-foreground">
                  Apport cash uniquement
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-start space-x-2 mb-4">
            <Checkbox
              id="complementVendeur"
              checked={formData.complementVendeur}
              onCheckedChange={(checked) => handleInputChange("complementVendeur", checked)}
            />
            <div>
              <Label htmlFor="complementVendeur" className="cursor-pointer font-medium">
                Complément de prix vendeur possible *
              </Label>
              <p className="text-sm text-muted-foreground">
                Acceptez-vous d'accorder un crédit vendeur au repreneur ?
              </p>
            </div>
          </div>

          {formData.complementVendeur && (
            <div className="space-y-4 ml-6">
              <div>
                <Label htmlFor="complementVendeurMontant">Montant du complément (€)</Label>
                <Input
                  id="complementVendeurMontant"
                  type="number"
                  value={formData.complementVendeurMontant}
                  onChange={(e) => handleInputChange("complementVendeurMontant", e.target.value)}
                  placeholder="Ex: 30000"
                />
              </div>

              <div>
                <Label htmlFor="complementVendeurDuree">Durée du crédit vendeur</Label>
                <Select 
                  value={formData.complementVendeurDuree} 
                  onValueChange={(value) => handleInputChange("complementVendeurDuree", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-an">1 an</SelectItem>
                    <SelectItem value="2-ans">2 ans</SelectItem>
                    <SelectItem value="3-ans">3 ans</SelectItem>
                    <SelectItem value="5-ans">5 ans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="apportRequis">Apport personnel minimum requis (€)</Label>
          <Input
            id="apportRequis"
            type="number"
            value={formData.apportRequis}
            onChange={(e) => handleInputChange("apportRequis", e.target.value)}
            placeholder="Ex: 50000"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Montant minimum d'apport que vous estimez nécessaire pour le repreneur
          </p>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-900">
          <strong>💡 À savoir :</strong> La flexibilité sur les modalités de paiement (crédit vendeur, 
          étalement) augmente significativement vos chances de vente rapide.
        </p>
      </div>
    </div>
  );
};

export default FormSection13;
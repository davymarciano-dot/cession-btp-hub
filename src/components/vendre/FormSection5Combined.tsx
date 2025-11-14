import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building2 } from "lucide-react";

interface FormSection5CombinedProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection5Combined = ({ formData, handleInputChange }: FormSection5CombinedProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Building2 className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Locaux & Matériel</h2>
      </div>

      {/* Locaux */}
      <div className="space-y-4 p-6 bg-slate-50 rounded-lg">
        <h3 className="font-semibold text-lg">Locaux professionnels</h3>
        
        <div>
          <Label>Situation des locaux *</Label>
          <RadioGroup 
            value={formData.situationLocaux} 
            onValueChange={(value) => handleInputChange("situationLocaux", value)}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="locataire" id="situation-locataire" />
              <Label htmlFor="situation-locataire">Locataire</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="proprietaire" id="situation-proprietaire" />
              <Label htmlFor="situation-proprietaire">Propriétaire</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.situationLocaux === "locataire" && (
            <>
              <div>
                <Label htmlFor="loyerMensuel">Loyer mensuel (€)</Label>
                <Input
                  id="loyerMensuel"
                  type="number"
                  value={formData.loyerMensuel}
                  onChange={(e) => handleInputChange("loyerMensuel", e.target.value)}
                  placeholder="1500"
                />
              </div>
              <div>
                <Label htmlFor="dureeBail">Durée bail restante</Label>
                <Input
                  id="dureeBail"
                  value={formData.dureeBail}
                  onChange={(e) => handleInputChange("dureeBail", e.target.value)}
                  placeholder="5 ans"
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="surfaceLocaux">Surface locaux (m²)</Label>
            <Input
              id="surfaceLocaux"
              type="number"
              value={formData.surfaceLocaux}
              onChange={(e) => handleInputChange("surfaceLocaux", e.target.value)}
              placeholder="250"
            />
          </div>

          {formData.situationLocaux === "proprietaire" && (
            <>
              <div>
                <Label htmlFor="valeurLocaux">Valeur locaux (€)</Label>
                <Input
                  id="valeurLocaux"
                  type="number"
                  value={formData.valeurLocaux}
                  onChange={(e) => handleInputChange("valeurLocaux", e.target.value)}
                  placeholder="350000"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="locauxInclusVente"
                  checked={formData.locauxInclusVente}
                  onCheckedChange={(checked) => handleInputChange("locauxInclusVente", checked)}
                />
                <Label htmlFor="locauxInclusVente">Locaux inclus dans la vente</Label>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Matériel */}
      <div className="space-y-4 p-6 bg-slate-50 rounded-lg">
        <h3 className="font-semibold text-lg">Matériel & Équipements</h3>
        
        <div>
          <Label htmlFor="materielPrincipal">Matériel principal</Label>
          <Textarea
            id="materielPrincipal"
            value={formData.materielPrincipal}
            onChange={(e) => handleInputChange("materielPrincipal", e.target.value)}
            placeholder="Liste du matériel et équipements..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="nombreVehicules">Nombre de véhicules</Label>
            <Input
              id="nombreVehicules"
              type="number"
              value={formData.nombreVehicules}
              onChange={(e) => handleInputChange("nombreVehicules", e.target.value)}
              placeholder="3"
            />
          </div>

          <div>
            <Label htmlFor="valeurMateriel">Valeur matériel (€)</Label>
            <Input
              id="valeurMateriel"
              type="number"
              value={formData.valeurMateriel}
              onChange={(e) => handleInputChange("valeurMateriel", e.target.value)}
              placeholder="45000"
            />
          </div>

          <div>
            <Label htmlFor="valeurStock">Valeur stock (€)</Label>
            <Input
              id="valeurStock"
              type="number"
              value={formData.valeurStock}
              onChange={(e) => handleInputChange("valeurStock", e.target.value)}
              placeholder="15000"
            />
          </div>
        </div>

        <div>
          <Label>État général du matériel</Label>
          <RadioGroup 
            value={formData.etatMateriel || "bon"} 
            onValueChange={(value) => handleInputChange("etatMateriel", value)}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="excellent" id="etat-excellent" />
              <Label htmlFor="etat-excellent">Excellent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bon" id="etat-bon" />
              <Label htmlFor="etat-bon">Bon</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moyen" id="etat-moyen" />
              <Label htmlFor="etat-moyen">Moyen</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default FormSection5Combined;

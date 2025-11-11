import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2 } from "lucide-react";

interface FormSection6Props {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection6 = ({ formData, handleInputChange }: FormSection6Props) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Building2 className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Moyens & Actifs</h2>
      </div>

      <div className="space-y-6">
        {/* Locaux */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Locaux professionnels</h3>
          
          <div className="space-y-4">
            <div>
              <Label>Situation des locaux *</Label>
              <RadioGroup 
                value={formData.situationLocaux} 
                onValueChange={(value) => handleInputChange("situationLocaux", value)}
                className="flex flex-col gap-2 mt-2"
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

            {formData.situationLocaux === "locataire" && (
              <>
                <div>
                  <Label htmlFor="loyerMensuel">Loyer mensuel (€)</Label>
                  <Input
                    id="loyerMensuel"
                    type="number"
                    value={formData.loyerMensuel}
                    onChange={(e) => handleInputChange("loyerMensuel", e.target.value)}
                    placeholder="Ex: 1500"
                  />
                </div>
                <div>
                  <Label htmlFor="dureeBail">Durée du bail restante</Label>
                  <Input
                    id="dureeBail"
                    value={formData.dureeBail}
                    onChange={(e) => handleInputChange("dureeBail", e.target.value)}
                    placeholder="Ex: 5 ans"
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="surfaceLocaux">Surface des locaux (m²)</Label>
              <Input
                id="surfaceLocaux"
                type="number"
                value={formData.surfaceLocaux}
                onChange={(e) => handleInputChange("surfaceLocaux", e.target.value)}
                placeholder="Ex: 250"
              />
            </div>

            {formData.situationLocaux === "proprietaire" && (
              <>
                <div>
                  <Label htmlFor="valeurLocaux">Valeur estimée des locaux (€)</Label>
                  <Input
                    id="valeurLocaux"
                    type="number"
                    value={formData.valeurLocaux}
                    onChange={(e) => handleInputChange("valeurLocaux", e.target.value)}
                    placeholder="Ex: 350000"
                  />
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="locauxInclusVente"
                    checked={formData.locauxInclusVente}
                    onCheckedChange={(checked) => handleInputChange("locauxInclusVente", checked)}
                  />
                  <Label htmlFor="locauxInclusVente" className="cursor-pointer">
                    Locaux inclus dans la vente
                  </Label>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Matériel */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Matériel & Véhicules</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="materielPrincipal">Matériel principal possédé</Label>
              <Textarea
                id="materielPrincipal"
                value={formData.materielPrincipal}
                onChange={(e) => handleInputChange("materielPrincipal", e.target.value)}
                placeholder="Liste du matériel et équipements importants..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="nombreVehicules">Nombre de véhicules</Label>
              <Input
                id="nombreVehicules"
                type="number"
                value={formData.nombreVehicules}
                onChange={(e) => handleInputChange("nombreVehicules", e.target.value)}
                placeholder="Ex: 5"
              />
            </div>

            <div>
              <Label htmlFor="valeurMateriel">Valeur totale du matériel (€)</Label>
              <Input
                id="valeurMateriel"
                type="number"
                value={formData.valeurMateriel}
                onChange={(e) => handleInputChange("valeurMateriel", e.target.value)}
                placeholder="Ex: 80000"
              />
            </div>

            <div>
              <Label htmlFor="etatMateriel">État général du matériel</Label>
              <Select 
                value={formData.etatMateriel} 
                onValueChange={(value) => handleInputChange("etatMateriel", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="bon">Bon</SelectItem>
                  <SelectItem value="moyen">Moyen</SelectItem>
                  <SelectItem value="a-renouveler">À renouveler</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Actifs immatériels */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Actifs immatériels</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="valeurStock">Valeur du stock (€)</Label>
              <Input
                id="valeurStock"
                type="number"
                value={formData.valeurStock}
                onChange={(e) => handleInputChange("valeurStock", e.target.value)}
                placeholder="Ex: 15000"
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="siteWeb"
                checked={formData.siteWeb}
                onCheckedChange={(checked) => handleInputChange("siteWeb", checked)}
              />
              <Label htmlFor="siteWeb" className="cursor-pointer">
                Site web professionnel
              </Label>
            </div>

            <div>
              <Label htmlFor="nombreClientsActifs">Nombre de clients actifs</Label>
              <Input
                id="nombreClientsActifs"
                type="number"
                value={formData.nombreClientsActifs}
                onChange={(e) => handleInputChange("nombreClientsActifs", e.target.value)}
                placeholder="Ex: 120"
              />
            </div>

            <div>
              <Label htmlFor="valeurPortefeuille">Valeur estimée du portefeuille clients (€)</Label>
              <Input
                id="valeurPortefeuille"
                type="number"
                value={formData.valeurPortefeuille}
                onChange={(e) => handleInputChange("valeurPortefeuille", e.target.value)}
                placeholder="Ex: 50000"
              />
            </div>

            <div>
              <Label htmlFor="contratsEnCours">Contrats en cours</Label>
              <Textarea
                id="contratsEnCours"
                value={formData.contratsEnCours}
                onChange={(e) => handleInputChange("contratsEnCours", e.target.value)}
                placeholder="Décrivez les contrats en cours significatifs..."
                rows={3}
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="marqueDeposee"
                checked={formData.marqueDeposee}
                onCheckedChange={(checked) => handleInputChange("marqueDeposee", checked)}
              />
              <Label htmlFor="marqueDeposee" className="cursor-pointer">
                Marque déposée / Nom commercial protégé
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection6;
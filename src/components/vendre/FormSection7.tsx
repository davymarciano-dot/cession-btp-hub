import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";

interface FormSection7Props {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection7 = ({ formData, handleInputChange }: FormSection7Props) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <AlertCircle className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Passif & Engagements</h2>
      </div>

      <div className="space-y-6">
        {/* Dettes */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Dettes</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="dettesTotales">Montant total des dettes (€) *</Label>
              <Input
                id="dettesTotales"
                type="number"
                value={formData.dettesTotales}
                onChange={(e) => handleInputChange("dettesTotales", e.target.value)}
                placeholder="Ex: 25000"
                required
              />
              <p className="text-sm text-muted-foreground mt-1">Mettre 0 si aucune dette</p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <p className="text-sm font-medium">Détail des dettes :</p>
              
              <div>
                <Label htmlFor="detteURSSAF">Dette URSSAF (€)</Label>
                <Input
                  id="detteURSSAF"
                  type="number"
                  value={formData.detteURSSAF}
                  onChange={(e) => handleInputChange("detteURSSAF", e.target.value)}
                  placeholder="Ex: 5000"
                />
              </div>

              <div>
                <Label htmlFor="detteTVA">Dette TVA (€)</Label>
                <Input
                  id="detteTVA"
                  type="number"
                  value={formData.detteTVA}
                  onChange={(e) => handleInputChange("detteTVA", e.target.value)}
                  placeholder="Ex: 3000"
                />
              </div>

              <div>
                <Label htmlFor="detteFournisseurs">Dette fournisseurs (€)</Label>
                <Input
                  id="detteFournisseurs"
                  type="number"
                  value={formData.detteFournisseurs}
                  onChange={(e) => handleInputChange("detteFournisseurs", e.target.value)}
                  placeholder="Ex: 12000"
                />
              </div>

              <div>
                <Label htmlFor="detteBanques">Dette banques (€)</Label>
                <Input
                  id="detteBanques"
                  type="number"
                  value={formData.detteBanques}
                  onChange={(e) => handleInputChange("detteBanques", e.target.value)}
                  placeholder="Ex: 5000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Crédits */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Crédits en cours</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="creditsEnCours"
                checked={formData.creditsEnCours}
                onCheckedChange={(checked) => handleInputChange("creditsEnCours", checked)}
              />
              <Label htmlFor="creditsEnCours" className="cursor-pointer">
                Crédits en cours *
              </Label>
            </div>

            {formData.creditsEnCours && (
              <>
                <div>
                  <Label htmlFor="montantCredits">Montant total des crédits restants (€)</Label>
                  <Input
                    id="montantCredits"
                    type="number"
                    value={formData.montantCredits}
                    onChange={(e) => handleInputChange("montantCredits", e.target.value)}
                    placeholder="Ex: 45000"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="creditsTransferables"
                    checked={formData.creditsTransferables}
                    onCheckedChange={(checked) => handleInputChange("creditsTransferables", checked)}
                  />
                  <Label htmlFor="creditsTransferables" className="cursor-pointer">
                    Crédits transférables au repreneur
                  </Label>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Litiges */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Litiges</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="litigesEnCours"
                checked={formData.litigesEnCours}
                onCheckedChange={(checked) => handleInputChange("litigesEnCours", checked)}
              />
              <Label htmlFor="litigesEnCours" className="cursor-pointer">
                Litiges en cours *
              </Label>
            </div>

            {formData.litigesEnCours && (
              <div>
                <Label htmlFor="natureLitiges">Nature des litiges</Label>
                <Textarea
                  id="natureLitiges"
                  value={formData.natureLitiges}
                  onChange={(e) => handleInputChange("natureLitiges", e.target.value)}
                  placeholder="Décrivez brièvement les litiges en cours..."
                  rows={4}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection7;
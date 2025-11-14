import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { TrendingUp } from "lucide-react";
import { PricePredictor } from "@/components/PricePredictor";

interface FormSection4Props {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection4 = ({ formData, handleInputChange }: FormSection4Props) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Données Financières</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="caN3">CA année N-3</Label>
            <Input
              id="caN3"
              type="number"
              value={formData.caN3}
              onChange={(e) => handleInputChange("caN3", e.target.value)}
              placeholder="Ex: 400000"
            />
          </div>

          <div>
            <Label htmlFor="caN2">CA année N-2</Label>
            <Input
              id="caN2"
              type="number"
              value={formData.caN2}
              onChange={(e) => handleInputChange("caN2", e.target.value)}
              placeholder="Ex: 450000"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="caN1">CA année N-1 * (obligatoire)</Label>
            <Input
              id="caN1"
              type="number"
              value={formData.caN1}
              onChange={(e) => handleInputChange("caN1", e.target.value)}
              placeholder="Ex: 500000"
              required
            />
          </div>

          <div>
            <Label htmlFor="caPrevisionnel">CA prévisionnel année N</Label>
            <Input
              id="caPrevisionnel"
              type="number"
              value={formData.caPrevisionnel}
              onChange={(e) => handleInputChange("caPrevisionnel", e.target.value)}
              placeholder="Ex: 550000"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="ebeN1">EBE N-1</Label>
            <Input
              id="ebeN1"
              type="number"
              value={formData.ebeN1}
              onChange={(e) => handleInputChange("ebeN1", e.target.value)}
              placeholder="Ex: 80000"
            />
          </div>

          <div>
            <Label htmlFor="resultatNetN1">Résultat net N-1 *</Label>
            <Input
              id="resultatNetN1"
              type="number"
              value={formData.resultatNetN1}
              onChange={(e) => handleInputChange("resultatNetN1", e.target.value)}
              placeholder="Ex: 50000"
              required
            />
          </div>
        </div>

        <div className="border-t pt-4 mt-6">
          <div>
            <Label htmlFor="prixVente">Prix de vente souhaité * (€)</Label>
            <Input
              id="prixVente"
              type="number"
              value={formData.prixVente}
              onChange={(e) => handleInputChange("prixVente", e.target.value)}
              placeholder="Ex: 750000"
              required
              className="text-lg font-semibold"
            />
          </div>

          <div className="flex items-start space-x-2 mt-4">
            <Checkbox
              id="prixNegociable"
              checked={formData.prixNegociable}
              onCheckedChange={(checked) => handleInputChange("prixNegociable", checked)}
            />
            <Label htmlFor="prixNegociable" className="cursor-pointer">
              Prix négociable
            </Label>
          </div>

          {formData.prixNegociable && (
            <div className="mt-3">
              <Label htmlFor="margeNegociation">Marge de négociation (%)</Label>
              <Input
                id="margeNegociation"
                type="number"
                value={formData.margeNegociation}
                onChange={(e) => handleInputChange("margeNegociation", e.target.value)}
                placeholder="Ex: 10"
                min="0"
                max="100"
              />
            </div>
          )}
        </div>

        {/* AI Price Predictor */}
        {formData.caN1 && formData.secteurActivite && (
          <PricePredictor 
            companyData={{
              revenue: parseFloat(formData.caN1) || 0,
              ebitda: parseFloat(formData.ebeN1) || undefined,
              hasRGE: formData.certifications?.some((c: string) => 
                c.toLowerCase().includes('quali') || c.toLowerCase().includes('rge')
              ) || false,
              location: formData.departement || '',
              sector: formData.secteurActivite || '',
              urgent: formData.delaiVente === 'immediat',
              employees: parseInt(formData.nombreSalaries) || 0,
              assetsValue: (parseFloat(formData.valeurMateriel) || 0) + 
                          (parseFloat(formData.valeurStock) || 0) + 
                          (parseFloat(formData.valeurLocaux) || 0),
            }}
            currentPrice={parseFloat(formData.prixVente) || undefined}
            onPriceUpdate={(price) => handleInputChange("prixVente", price.toString())}
          />
        )}
      </div>
    </div>
  );
};

export default FormSection4;
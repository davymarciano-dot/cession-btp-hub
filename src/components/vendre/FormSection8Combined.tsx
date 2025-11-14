import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Shield } from "lucide-react";

interface FormSection8CombinedProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection8Combined = ({ formData, handleInputChange }: FormSection8CombinedProps) => {
  const accompagnementOptions = [
    "Formation du repreneur",
    "Transition auprès des clients",
    "Formation de l'équipe",
    "Conseil en gestion",
    "Appui commercial"
  ];

  const documentsOptions = [
    "Bilans 3 dernières années",
    "Comptes de résultat",
    "Liasse fiscale",
    "Contrats clients principaux",
    "Baux commerciaux",
    "Contrats fournisseurs",
    "Registre du personnel",
    "Statuts société"
  ];

  const toggleAccompagnement = (option: string) => {
    const current = formData.accompagnementPropose || {};
    handleInputChange("accompagnementPropose", {
      ...current,
      [option]: !current[option]
    });
  };

  const toggleDocument = (doc: string) => {
    const current = formData.documentsDisponibles || [];
    if (current.includes(doc)) {
      handleInputChange("documentsDisponibles", current.filter((d: string) => d !== doc));
    } else {
      handleInputChange("documentsDisponibles", [...current, doc]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Transmission & Confidentialité</h2>
      </div>

      {/* Modalités de transmission */}
      <div className="space-y-4 p-6 bg-slate-50 rounded-lg">
        <h3 className="font-semibold text-lg">Modalités de Transmission</h3>
        
        <div>
          <Label>Type de transmission *</Label>
          <RadioGroup 
            value={formData.typeTransmission} 
            onValueChange={(value) => handleInputChange("typeTransmission", value)}
            className="flex flex-col gap-2 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="parts-sociales" id="type-parts" />
              <Label htmlFor="type-parts">Cession de parts sociales</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fonds-commerce" id="type-fonds" />
              <Label htmlFor="type-fonds">Cession de fonds de commerce</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="actions" id="type-actions" />
              <Label htmlFor="type-actions">Cession d'actions</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Accompagnement proposé</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {accompagnementOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`accomp-${option}`}
                  checked={formData.accompagnementPropose?.[option] || false}
                  onCheckedChange={() => toggleAccompagnement(option)}
                />
                <Label htmlFor={`accomp-${option}`} className="text-sm">{option}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="delaiVente">Délai souhaité *</Label>
          <Select 
            value={formData.delaiVente} 
            onValueChange={(value) => handleInputChange("delaiVente", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urgent">Urgent (moins de 3 mois)</SelectItem>
              <SelectItem value="court">Court terme (3-6 mois)</SelectItem>
              <SelectItem value="moyen">Moyen terme (6-12 mois)</SelectItem>
              <SelectItem value="long">Long terme (plus de 12 mois)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="conditionsParticulieres">Conditions particulières</Label>
          <Textarea
            id="conditionsParticulieres"
            value={formData.conditionsParticulieres}
            onChange={(e) => handleInputChange("conditionsParticulieres", e.target.value)}
            placeholder="Clauses spécifiques, conditions de reprise..."
            rows={2}
          />
        </div>
      </div>

      {/* Confidentialité et Documents */}
      <div className="space-y-4 p-6 bg-slate-50 rounded-lg">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Confidentialité & Documents
        </h3>
        
        <div>
          <Label>Niveau d'anonymat *</Label>
          <RadioGroup 
            value={formData.niveauAnonymat} 
            onValueChange={(value) => handleInputChange("niveauAnonymat", value)}
            className="flex flex-col gap-2 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="anonyme-complet" id="anonymat-complet" />
              <Label htmlFor="anonymat-complet">Anonymat complet</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="semi-anonyme" id="anonymat-semi" />
              <Label htmlFor="anonymat-semi">Semi-anonyme (après accord)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="anonymat-public" />
              <Label htmlFor="anonymat-public">Public</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Documents disponibles</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {documentsOptions.map((doc) => (
              <div key={doc} className="flex items-center space-x-2">
                <Checkbox
                  id={`doc-${doc}`}
                  checked={(formData.documentsDisponibles || []).includes(doc)}
                  onCheckedChange={() => toggleDocument(doc)}
                />
                <Label htmlFor={`doc-${doc}`} className="text-sm">{doc}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="ndaRequis"
            checked={formData.ndaRequis}
            onCheckedChange={(checked) => handleInputChange("ndaRequis", checked)}
          />
          <Label htmlFor="ndaRequis">
            Accord de confidentialité (NDA) requis avant accès aux détails
          </Label>
        </div>
      </div>
    </div>
  );
};

export default FormSection8Combined;

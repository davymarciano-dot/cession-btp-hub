import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";

interface FormSection10Props {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection10 = ({ formData, handleInputChange }: FormSection10Props) => {
  const accompagnementOptions = [
    { id: "formation-repreneur", label: "Formation du repreneur" },
    { id: "transition-clients", label: "Transition auprès des clients" },
    { id: "formation-equipe", label: "Formation de l'équipe" },
    { id: "conseil-gestion", label: "Conseil en gestion" },
    { id: "appui-commercial", label: "Appui commercial" },
  ];

  const toggleAccompagnement = (option: string) => {
    const current = formData.accompagnementPropose || {};
    handleInputChange("accompagnementPropose", {
      ...current,
      [option]: !current[option]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Modalités de Transmission</h2>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Type de transmission *</Label>
          <RadioGroup 
            value={formData.typeTransmission} 
            onValueChange={(value) => handleInputChange("typeTransmission", value)}
            className="flex flex-col gap-3 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="parts-sociales" id="type-parts" />
              <Label htmlFor="type-parts" className="cursor-pointer">Cession de parts sociales</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fonds-commerce" id="type-fonds" />
              <Label htmlFor="type-fonds" className="cursor-pointer">Cession de fonds de commerce</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="actions" id="type-actions" />
              <Label htmlFor="type-actions" className="cursor-pointer">Cession d'actions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="location-gerance" id="type-location" />
              <Label htmlFor="type-location" className="cursor-pointer">Location-gérance</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Accompagnement proposé au repreneur</Label>
          <div className="grid grid-cols-1 gap-3 mt-2">
            {accompagnementOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-2">
                <Checkbox
                  id={option.id}
                  checked={formData.accompagnementPropose?.[option.id] || false}
                  onCheckedChange={() => toggleAccompagnement(option.id)}
                />
                <Label htmlFor={option.id} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="delaiVente">Délai souhaité pour la vente *</Label>
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
            placeholder="Conditions spécifiques pour la transmission (maintien de l'emploi, respect de la marque, etc.)"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default FormSection10;
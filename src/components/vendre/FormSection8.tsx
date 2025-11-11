import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HelpCircle } from "lucide-react";

interface FormSection8Props {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection8 = ({ formData, handleInputChange }: FormSection8Props) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Raison de la Vente</h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Motif principal de la vente *</Label>
          <RadioGroup 
            value={formData.motifVente} 
            onValueChange={(value) => handleInputChange("motifVente", value)}
            className="flex flex-col gap-3 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="retraite" id="motif-retraite" />
              <Label htmlFor="motif-retraite" className="cursor-pointer">Départ à la retraite</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="reconversion" id="motif-reconversion" />
              <Label htmlFor="motif-reconversion" className="cursor-pointer">Reconversion professionnelle</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sante" id="motif-sante" />
              <Label htmlFor="motif-sante" className="cursor-pointer">Raisons de santé</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nouveau-projet" id="motif-nouveau-projet" />
              <Label htmlFor="motif-nouveau-projet" className="cursor-pointer">Nouveau projet entrepreneurial</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="personnel" id="motif-personnel" />
              <Label htmlFor="motif-personnel" className="cursor-pointer">Raisons personnelles / familiales</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="difficultes" id="motif-difficultes" />
              <Label htmlFor="motif-difficultes" className="cursor-pointer">Difficultés économiques</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="autre" id="motif-autre" />
              <Label htmlFor="motif-autre" className="cursor-pointer">Autre</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="precisionsVente">Précisions sur votre situation</Label>
          <Textarea
            id="precisionsVente"
            value={formData.precisionsVente}
            onChange={(e) => handleInputChange("precisionsVente", e.target.value)}
            placeholder="Apportez des précisions complémentaires sur votre motivation de vente..."
            rows={5}
          />
          <p className="text-sm text-muted-foreground mt-1">
            Ces informations aident les repreneurs à mieux comprendre le contexte de la cession
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormSection8;
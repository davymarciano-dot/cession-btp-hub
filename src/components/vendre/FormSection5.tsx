import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from "lucide-react";

interface FormSection5Props {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection5 = ({ formData, handleInputChange }: FormSection5Props) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Ressources Humaines</h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="nombreSalaries">Nombre total de salariés *</Label>
          <Input
            id="nombreSalaries"
            type="number"
            value={formData.nombreSalaries}
            onChange={(e) => handleInputChange("nombreSalaries", e.target.value)}
            placeholder="Ex: 8"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="nombreCDI">Dont CDI</Label>
            <Input
              id="nombreCDI"
              type="number"
              value={formData.nombreCDI}
              onChange={(e) => handleInputChange("nombreCDI", e.target.value)}
              placeholder="Ex: 6"
            />
          </div>

          <div>
            <Label htmlFor="nombreCDD">Dont CDD</Label>
            <Input
              id="nombreCDD"
              type="number"
              value={formData.nombreCDD}
              onChange={(e) => handleInputChange("nombreCDD", e.target.value)}
              placeholder="Ex: 1"
            />
          </div>

          <div>
            <Label htmlFor="nombreApprentis">Dont Apprentis/Alternants</Label>
            <Input
              id="nombreApprentis"
              type="number"
              value={formData.nombreApprentis}
              onChange={(e) => handleInputChange("nombreApprentis", e.target.value)}
              placeholder="Ex: 1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="ancienneteMoyenne">Ancienneté moyenne des salariés (en années)</Label>
          <Input
            id="ancienneteMoyenne"
            type="number"
            step="0.1"
            value={formData.ancienneteMoyenne}
            onChange={(e) => handleInputChange("ancienneteMoyenne", e.target.value)}
            placeholder="Ex: 5.5"
          />
        </div>

        <div>
          <Label htmlFor="competencesEquipe">Compétences clés de l'équipe</Label>
          <Textarea
            id="competencesEquipe"
            value={formData.competencesEquipe}
            onChange={(e) => handleInputChange("competencesEquipe", e.target.value)}
            placeholder="Décrivez les principales compétences et expertises de votre équipe..."
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="masseSalariale">Masse salariale annuelle (€)</Label>
          <Input
            id="masseSalariale"
            type="number"
            value={formData.masseSalariale}
            onChange={(e) => handleInputChange("masseSalariale", e.target.value)}
            placeholder="Ex: 250000"
          />
        </div>

        <div className="border-t pt-4 mt-6">
          <div className="flex items-start space-x-2 mb-4">
            <Checkbox
              id="accompagnementVendeur"
              checked={formData.accompagnementVendeur}
              onCheckedChange={(checked) => handleInputChange("accompagnementVendeur", checked)}
            />
            <Label htmlFor="accompagnementVendeur" className="cursor-pointer">
              Le dirigeant/vendeur reste pour accompagnement *
            </Label>
          </div>

          {formData.accompagnementVendeur && (
            <div>
              <Label htmlFor="dureeAccompagnement">Durée d'accompagnement proposée</Label>
              <Select 
                value={formData.dureeAccompagnement} 
                onValueChange={(value) => handleInputChange("dureeAccompagnement", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-mois">1 mois</SelectItem>
                  <SelectItem value="3-mois">3 mois</SelectItem>
                  <SelectItem value="6-mois">6 mois</SelectItem>
                  <SelectItem value="1-an">1 an</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormSection5;
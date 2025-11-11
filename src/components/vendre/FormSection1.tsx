import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "lucide-react";

interface FormSection1Props {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection1 = ({ formData, handleInputChange }: FormSection1Props) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Vos Coordonnées</h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Civilité *</Label>
          <RadioGroup 
            value={formData.civilite} 
            onValueChange={(value) => handleInputChange("civilite", value)}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="M" id="civilite-m" />
              <Label htmlFor="civilite-m">M.</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Mme" id="civilite-mme" />
              <Label htmlFor="civilite-mme">Mme</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="nomPrenom">Nom / Prénom *</Label>
          <Input
            id="nomPrenom"
            value={formData.nomPrenom}
            onChange={(e) => handleInputChange("nomPrenom", e.target.value)}
            placeholder="Jean Dupont"
          />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="jean.dupont@email.com"
          />
        </div>

        <div>
          <Label htmlFor="telephone">Téléphone *</Label>
          <Input
            id="telephone"
            type="tel"
            value={formData.telephone}
            onChange={(e) => handleInputChange("telephone", e.target.value)}
            placeholder="06 12 34 56 78"
          />
        </div>

        <div>
          <Label htmlFor="preferenceContact">Préférence de contact *</Label>
          <Select 
            value={formData.preferenceContact} 
            onValueChange={(value) => handleInputChange("preferenceContact", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisissez votre préférence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="telephone">Téléphone</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FormSection1;
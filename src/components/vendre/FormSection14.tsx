import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Info } from "lucide-react";

interface FormSection14Props {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection14 = ({ formData, handleInputChange }: FormSection14Props) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Info className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Informations Complémentaires</h2>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="infosComplementaires">Informations complémentaires importantes</Label>
          <Textarea
            id="infosComplementaires"
            value={formData.infosComplementaires}
            onChange={(e) => handleInputChange("infosComplementaires", e.target.value)}
            placeholder="Ajoutez toute information importante qui n'a pas été mentionnée dans les sections précédentes..."
            rows={6}
          />
          <p className="text-sm text-muted-foreground mt-1">
            Projets en cours, opportunités spécifiques, particularités de votre activité...
          </p>
        </div>

        <div>
          <Label htmlFor="commentairesAcheteurs">Message personnalisé aux acheteurs potentiels</Label>
          <Textarea
            id="commentairesAcheteurs"
            value={formData.commentairesAcheteurs}
            onChange={(e) => handleInputChange("commentairesAcheteurs", e.target.value)}
            placeholder="Un message pour présenter votre entreprise et attirer les bons repreneurs..."
            rows={5}
          />
          <p className="text-sm text-muted-foreground mt-1">
            Ce message apparaîtra en introduction de votre annonce
          </p>
        </div>

        <div>
          <Label>Visites possibles *</Label>
          <RadioGroup 
            value={formData.visitesPossibles} 
            onValueChange={(value) => handleInputChange("visitesPossibles", value)}
            className="flex flex-col gap-3 mt-2"
          >
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="oui" id="visites-oui" />
              <div>
                <Label htmlFor="visites-oui" className="cursor-pointer font-medium">
                  Oui, visites possibles
                </Label>
                <p className="text-sm text-muted-foreground">
                  Vous êtes disponible pour organiser des visites
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="sur-rdv" id="visites-rdv" />
              <div>
                <Label htmlFor="visites-rdv" className="cursor-pointer font-medium">
                  Sur rendez-vous uniquement
                </Label>
                <p className="text-sm text-muted-foreground">
                  Après qualification du candidat
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="non" id="visites-non" />
              <div>
                <Label htmlFor="visites-non" className="cursor-pointer font-medium">
                  Non, pas de visite pour l'instant
                </Label>
                <p className="text-sm text-muted-foreground">
                  Contact et échanges d'informations uniquement
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>🎯 Dernière étape !</strong> Vous êtes presque prêt à publier votre annonce. 
          Vérifiez que toutes les informations importantes ont été renseignées pour maximiser 
          vos chances de trouver le bon repreneur rapidement.
        </p>
      </div>
    </div>
  );
};

export default FormSection14;
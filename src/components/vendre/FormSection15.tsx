import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Check } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FormSection15Props {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection15 = ({ formData, handleInputChange }: FormSection15Props) => {
  const formules = [
    {
      id: "decouverte",
      name: "Découverte",
      price: 0,
      duration: "30 jours",
      features: ["10 vues maximum", "Annonce standard", "Support email"]
    },
    {
      id: "essentiel",
      name: "Essentiel",
      price: 290,
      duration: "3 mois",
      features: ["Vues illimitées", "Mise en avant", "Support prioritaire", "Badge \"Recommandé\""],
      recommended: true
    },
    {
      id: "prime",
      name: "Prime",
      price: 490,
      duration: "3 mois",
      features: ["Toutes les fonctionnalités Essentiel", "Photos illimitées", "Top des résultats", "Statistiques avancées"]
    },
    {
      id: "exclusif",
      name: "Exclusif",
      price: 990,
      duration: "3 mois",
      features: ["Toutes les fonctionnalités Prime", "Agent dédié", "Promotion réseaux sociaux", "Valorisation gratuite"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Abonnement & Publication</h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Choisir une formule *</Label>
          <RadioGroup 
            value={formData.formuleAbonnement} 
            onValueChange={(value) => {
              const formule = formules.find(f => f.id === value);
              handleInputChange("formuleAbonnement", value);
              handleInputChange("montantAbonnement", formule?.price || 0);
            }}
            className="space-y-4 mt-4"
          >
            {formules.map((formule) => (
              <Card 
                key={formule.id} 
                className={`p-6 cursor-pointer transition-all ${
                  formData.formuleAbonnement === formule.id 
                    ? 'border-primary border-2 bg-primary/5' 
                    : 'hover:border-primary/50'
                } ${formule.recommended ? 'border-secondary border-2' : ''}`}
                onClick={() => {
                  handleInputChange("formuleAbonnement", formule.id);
                  handleInputChange("montantAbonnement", formule.price);
                }}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem value={formule.id} id={`formule-${formule.id}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor={`formule-${formule.id}`} className="text-xl font-bold cursor-pointer">
                        {formule.name}
                        {formule.recommended && (
                          <span className="ml-2 text-sm bg-secondary text-white px-3 py-1 rounded-full">
                            Recommandé
                          </span>
                        )}
                      </Label>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {formule.price === 0 ? 'Gratuit' : `${formule.price}€`}
                        </p>
                        <p className="text-sm text-muted-foreground">{formule.duration}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 mt-4">
                      {formule.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </RadioGroup>
        </div>

        <div className="border-t pt-6 space-y-4">
          <h3 className="font-semibold text-lg mb-4">Validation finale</h3>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="accepteCGU"
                checked={formData.accepteCGU}
                onCheckedChange={(checked) => handleInputChange("accepteCGU", checked)}
              />
              <Label htmlFor="accepteCGU" className="cursor-pointer">
                J'accepte les CGU et la politique de confidentialité *
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="accepteContact"
                checked={formData.accepteContact}
                onCheckedChange={(checked) => handleInputChange("accepteContact", checked)}
              />
              <Label htmlFor="accepteContact" className="cursor-pointer">
                J'autorise CessionBTP à me contacter *
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="certifieExactitude"
                checked={formData.certifieExactitude}
                onCheckedChange={(checked) => handleInputChange("certifieExactitude", checked)}
              />
              <Label htmlFor="certifieExactitude" className="cursor-pointer">
                Je certifie l'exactitude des informations *
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="newsletter"
                checked={formData.newsletter}
                onCheckedChange={(checked) => handleInputChange("newsletter", checked)}
              />
              <Label htmlFor="newsletter" className="cursor-pointer">
                Je souhaite recevoir la newsletter CessionBTP (optionnel)
              </Label>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-6">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Check className="w-5 h-5 text-blue-600" />
            Récapitulatif
          </h4>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Formule choisie :</strong>{" "}
              {formules.find(f => f.id === formData.formuleAbonnement)?.name || "Aucune"}
            </p>
            <p>
              <strong>Montant :</strong>{" "}
              {formData.montantAbonnement === 0 
                ? "Gratuit" 
                : `${formData.montantAbonnement}€ TTC`}
            </p>
            <p>
              <strong>Durée :</strong>{" "}
              {formules.find(f => f.id === formData.formuleAbonnement)?.duration || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection15;
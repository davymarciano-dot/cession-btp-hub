import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";

interface FormSection9Props {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection9 = ({ formData, handleInputChange }: FormSection9Props) => {
  const presenceDigitaleOptions = [
    { id: "site-web", label: "Site web" },
    { id: "google-business", label: "Google Business" },
    { id: "facebook", label: "Facebook" },
    { id: "instagram", label: "Instagram" },
    { id: "linkedin", label: "LinkedIn" },
    { id: "annuaires", label: "Annuaires professionnels" },
  ];

  const togglePresenceDigitale = (option: string) => {
    const current = formData.presenceDigitale || [];
    if (current.includes(option)) {
      handleInputChange("presenceDigitale", current.filter((item: string) => item !== option));
    } else {
      handleInputChange("presenceDigitale", [...current, option]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Star className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Points Forts & Potentiel</h2>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="atoutsPrincipaux">3 atouts principaux de votre entreprise *</Label>
          <Textarea
            id="atoutsPrincipaux"
            value={formData.atoutsPrincipaux}
            onChange={(e) => handleInputChange("atoutsPrincipaux", e.target.value)}
            placeholder="Ex: Clientèle fidèle depuis 15 ans, équipe technique expérimentée, certifications RGE..."
            rows={5}
            required
          />
          <p className="text-sm text-muted-foreground mt-1">
            Mettez en avant ce qui rend votre entreprise attractive
          </p>
        </div>

        <div>
          <Label htmlFor="potentielDeveloppement">Potentiel de développement</Label>
          <Textarea
            id="potentielDeveloppement"
            value={formData.potentielDeveloppement}
            onChange={(e) => handleInputChange("potentielDeveloppement", e.target.value)}
            placeholder="Opportunités de croissance, nouveaux marchés, développement possible..."
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="clienteleFidelePct">Pourcentage de clientèle fidèle (%)</Label>
          <Input
            id="clienteleFidelePct"
            type="number"
            min="0"
            max="100"
            value={formData.clienteleFidelePct}
            onChange={(e) => handleInputChange("clienteleFidelePct", e.target.value)}
            placeholder="Ex: 70"
          />
        </div>

        <div>
          <Label>Réputation locale</Label>
          <div className="flex items-center gap-4 mt-2">
            <Slider
              value={[formData.reputationLocale || 3]}
              onValueChange={(value) => handleInputChange("reputationLocale", value[0])}
              min={1}
              max={5}
              step={1}
              className="flex-1"
            />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < (formData.reputationLocale || 3)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Évaluez votre notoriété dans votre zone d'activité
          </p>
        </div>

        <div>
          <Label>Présence digitale</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {presenceDigitaleOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-2">
                <Checkbox
                  id={option.id}
                  checked={(formData.presenceDigitale || []).includes(option.id)}
                  onCheckedChange={() => togglePresenceDigitale(option.id)}
                />
                <Label htmlFor={option.id} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="elementsDifferenciants">Éléments différenciants</Label>
          <Textarea
            id="elementsDifferenciants"
            value={formData.elementsDifferenciants}
            onChange={(e) => handleInputChange("elementsDifferenciants", e.target.value)}
            placeholder="Ce qui vous distingue de la concurrence (savoir-faire unique, zone exclusive, partenariats...)"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default FormSection9;
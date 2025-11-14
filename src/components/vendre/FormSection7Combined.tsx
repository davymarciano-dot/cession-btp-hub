import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { AlertCircle, Star } from "lucide-react";

interface FormSection7CombinedProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection7Combined = ({ formData, handleInputChange }: FormSection7CombinedProps) => {
  const presenceDigitaleOptions = [
    "Site web", "Google Business", "Facebook", "Instagram", "LinkedIn", "Annuaires pro"
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
        <AlertCircle className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Passif & Atouts</h2>
      </div>

      {/* Dettes */}
      <div className="space-y-4 p-6 bg-slate-50 rounded-lg">
        <h3 className="font-semibold text-lg">Dettes et Engagements</h3>
        
        <div>
          <Label htmlFor="dettesTotales">Montant total des dettes (€) *</Label>
          <Input
            id="dettesTotales"
            type="number"
            value={formData.dettesTotales}
            onChange={(e) => handleInputChange("dettesTotales", e.target.value)}
            placeholder="Mettre 0 si aucune dette"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="detteURSSAF">URSSAF (€)</Label>
            <Input
              id="detteURSSAF"
              type="number"
              value={formData.detteURSSAF}
              onChange={(e) => handleInputChange("detteURSSAF", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="detteTVA">TVA (€)</Label>
            <Input
              id="detteTVA"
              type="number"
              value={formData.detteTVA}
              onChange={(e) => handleInputChange("detteTVA", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="detteFournisseurs">Fournisseurs (€)</Label>
            <Input
              id="detteFournisseurs"
              type="number"
              value={formData.detteFournisseurs}
              onChange={(e) => handleInputChange("detteFournisseurs", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="detteBanques">Banques (€)</Label>
            <Input
              id="detteBanques"
              type="number"
              value={formData.detteBanques}
              onChange={(e) => handleInputChange("detteBanques", e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="creditsEnCours"
            checked={formData.creditsEnCours}
            onCheckedChange={(checked) => handleInputChange("creditsEnCours", checked)}
          />
          <Label htmlFor="creditsEnCours">Crédits en cours</Label>
        </div>

        {formData.creditsEnCours && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="montantCredits">Montant crédits (€)</Label>
              <Input
                id="montantCredits"
                type="number"
                value={formData.montantCredits}
                onChange={(e) => handleInputChange("montantCredits", e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="creditsTransferables"
                checked={formData.creditsTransferables}
                onCheckedChange={(checked) => handleInputChange("creditsTransferables", checked)}
              />
              <Label htmlFor="creditsTransferables">Crédits transférables</Label>
            </div>
          </div>
        )}

        <div className="flex items-start space-x-2">
          <Checkbox
            id="litigesEnCours"
            checked={formData.litigesEnCours}
            onCheckedChange={(checked) => handleInputChange("litigesEnCours", checked)}
          />
          <Label htmlFor="litigesEnCours">Litiges en cours</Label>
        </div>

        {formData.litigesEnCours && (
          <div>
            <Label htmlFor="natureLitiges">Nature des litiges</Label>
            <Textarea
              id="natureLitiges"
              value={formData.natureLitiges}
              onChange={(e) => handleInputChange("natureLitiges", e.target.value)}
              rows={2}
            />
          </div>
        )}
      </div>

      {/* Atouts */}
      <div className="space-y-4 p-6 bg-slate-50 rounded-lg">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Star className="w-5 h-5 text-primary" />
          Points forts & Potentiel
        </h3>
        
        <div>
          <Label htmlFor="atoutsPrincipaux">Atouts principaux *</Label>
          <Textarea
            id="atoutsPrincipaux"
            value={formData.atoutsPrincipaux}
            onChange={(e) => handleInputChange("atoutsPrincipaux", e.target.value)}
            placeholder="Clientèle fidèle, équipe expérimentée, certifications..."
            rows={3}
            required
          />
        </div>

        <div>
          <Label htmlFor="potentielDeveloppement">Potentiel de développement</Label>
          <Textarea
            id="potentielDeveloppement"
            value={formData.potentielDeveloppement}
            onChange={(e) => handleInputChange("potentielDeveloppement", e.target.value)}
            placeholder="Opportunités de croissance..."
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="clienteleFidelePct">Clientèle fidèle (%)</Label>
            <Input
              id="clienteleFidelePct"
              type="number"
              min="0"
              max="100"
              value={formData.clienteleFidelePct}
              onChange={(e) => handleInputChange("clienteleFidelePct", e.target.value)}
              placeholder="70"
            />
          </div>

          <div>
            <Label>Réputation locale</Label>
            <div className="flex items-center gap-2 mt-2">
              <Slider
                value={[formData.reputationLocale || 3]}
                onValueChange={(value) => handleInputChange("reputationLocale", value[0])}
                min={1}
                max={5}
                step={1}
                className="flex-1"
              />
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < (formData.reputationLocale || 3)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label>Présence digitale</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {presenceDigitaleOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`digital-${option}`}
                  checked={(formData.presenceDigitale || []).includes(option)}
                  onCheckedChange={() => togglePresenceDigitale(option)}
                />
                <Label htmlFor={`digital-${option}`} className="text-sm">{option}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection7Combined;

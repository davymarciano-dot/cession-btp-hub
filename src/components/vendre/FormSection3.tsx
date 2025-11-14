import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Briefcase, Shield } from "lucide-react";

interface FormSection3Props {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection3 = ({ formData, handleInputChange }: FormSection3Props) => {
  const certifications = [
    "RGE",
    "Qualibat",
    "Qualipac",
    "QualiPV",
    "Qualipac+",
    "Qualibois",
    "Qualisol",
    "QualiCharge IRVE",
    "RGE Études",
    "Eco-Artisan",
    "Handibat",
    "Autre"
  ];

  const toggleCertification = (cert: string) => {
    const current = formData.certifications || [];
    if (current.includes(cert)) {
      handleInputChange("certifications", current.filter((c: string) => c !== cert));
    } else {
      handleInputChange("certifications", [...current, cert]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Activité & Spécialisation</h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="descriptionActivite">Description détaillée de l'activité * (minimum 500 caractères)</Label>
          <Textarea
            id="descriptionActivite"
            value={formData.descriptionActivite}
            onChange={(e) => handleInputChange("descriptionActivite", e.target.value)}
            placeholder="Décrivez en détail les activités de votre entreprise, vos domaines d'expertise, vos références..."
            rows={6}
            minLength={500}
          />
          <p className="text-sm text-muted-foreground mt-1">
            {formData.descriptionActivite?.length || 0} / 500 caractères minimum
          </p>
        </div>

        <div>
          <Label htmlFor="specialites">Spécialités principales</Label>
          <Input
            id="specialites"
            value={formData.specialites}
            onChange={(e) => handleInputChange("specialites", e.target.value)}
            placeholder="Ex: Isolation thermique, Pompes à chaleur, Maçonnerie..."
          />
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <Label className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Certifications RGE et Labels (2026)
          </Label>
          <p className="text-sm text-green-600 mb-4">
            Les certifications RGE valorisent votre entreprise de +30% en moyenne
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center space-x-2">
                <Checkbox
                  id={`cert-${cert}`}
                  checked={(formData.certifications || []).includes(cert)}
                  onCheckedChange={() => toggleCertification(cert)}
                />
                <Label htmlFor={`cert-${cert}`} className="cursor-pointer text-sm">
                  {cert}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Type de clientèle * (répartition en %)</Label>
          <div className="space-y-3 mt-2">
            <div className="flex items-center gap-3">
              <Checkbox
                id="client-particuliers"
                checked={formData.clienteleParticuliers !== undefined}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange("clienteleParticuliers", 0);
                  } else {
                    handleInputChange("clienteleParticuliers", undefined);
                  }
                }}
              />
              <Label htmlFor="client-particuliers">Particuliers</Label>
              {formData.clienteleParticuliers !== undefined && (
                <Input
                  type="number"
                  value={formData.clienteleParticuliers}
                  onChange={(e) => handleInputChange("clienteleParticuliers", parseInt(e.target.value))}
                  placeholder="%"
                  className="w-20"
                  min="0"
                  max="100"
                />
              )}
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="client-professionnels"
                checked={formData.clienteleProfessionnels !== undefined}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange("clienteleProfessionnels", 0);
                  } else {
                    handleInputChange("clienteleProfessionnels", undefined);
                  }
                }}
              />
              <Label htmlFor="client-professionnels">Professionnels/Entreprises</Label>
              {formData.clienteleProfessionnels !== undefined && (
                <Input
                  type="number"
                  value={formData.clienteleProfessionnels}
                  onChange={(e) => handleInputChange("clienteleProfessionnels", parseInt(e.target.value))}
                  placeholder="%"
                  className="w-20"
                  min="0"
                  max="100"
                />
              )}
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="client-publics"
                checked={formData.clientelePublics !== undefined}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange("clientelePublics", 0);
                  } else {
                    handleInputChange("clientelePublics", undefined);
                  }
                }}
              />
              <Label htmlFor="client-publics">Marchés publics</Label>
              {formData.clientelePublics !== undefined && (
                <Input
                  type="number"
                  value={formData.clientelePublics}
                  onChange={(e) => handleInputChange("clientelePublics", parseInt(e.target.value))}
                  placeholder="%"
                  className="w-20"
                  min="0"
                  max="100"
                />
              )}
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="client-promoteurs"
                checked={formData.clientelePromoteurs !== undefined}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleInputChange("clientelePromoteurs", 0);
                  } else {
                    handleInputChange("clientelePromoteurs", undefined);
                  }
                }}
              />
              <Label htmlFor="client-promoteurs">Promoteurs immobiliers</Label>
              {formData.clientelePromoteurs !== undefined && (
                <Input
                  type="number"
                  value={formData.clientelePromoteurs}
                  onChange={(e) => handleInputChange("clientelePromoteurs", parseInt(e.target.value))}
                  placeholder="%"
                  className="w-20"
                  min="0"
                  max="100"
                />
              )}
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="rayonIntervention">Rayon d'intervention (en km) *</Label>
          <Input
            id="rayonIntervention"
            type="number"
            value={formData.rayonIntervention}
            onChange={(e) => handleInputChange("rayonIntervention", e.target.value)}
            placeholder="50"
          />
        </div>

        <div>
          <Label htmlFor="departementsCouverts">Départements couverts (séparés par des virgules)</Label>
          <Input
            id="departementsCouverts"
            value={formData.departementsCouverts}
            onChange={(e) => handleInputChange("departementsCouverts", e.target.value)}
            placeholder="75, 77, 78, 91, 92, 93, 94, 95"
          />
        </div>
      </div>
    </div>
  );
};

export default FormSection3;
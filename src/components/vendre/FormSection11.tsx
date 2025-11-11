import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield } from "lucide-react";

interface FormSection11Props {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection11 = ({ formData, handleInputChange }: FormSection11Props) => {
  const documentsOptions = [
    { id: "bilans-3ans", label: "Bilans des 3 dernières années" },
    { id: "comptes-resultats", label: "Comptes de résultats" },
    { id: "liasse-fiscale", label: "Liasse fiscale" },
    { id: "inventaire-materiel", label: "Inventaire du matériel" },
    { id: "liste-contrats", label: "Liste des contrats en cours" },
    { id: "extrait-kbis", label: "Extrait Kbis" },
    { id: "bail-commercial", label: "Bail commercial" },
    { id: "contrats-travail", label: "Contrats de travail" },
  ];

  const toggleDocument = (docId: string) => {
    const current = formData.documentsDisponibles || [];
    if (current.includes(docId)) {
      handleInputChange("documentsDisponibles", current.filter((item: string) => item !== docId));
    } else {
      handleInputChange("documentsDisponibles", [...current, docId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Documents & Confidentialité</h2>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Niveau d'anonymat souhaité *</Label>
          <RadioGroup 
            value={formData.niveauAnonymat} 
            onValueChange={(value) => handleInputChange("niveauAnonymat", value)}
            className="flex flex-col gap-3 mt-2"
          >
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="anonyme-complet" id="anonymat-complet" />
              <div>
                <Label htmlFor="anonymat-complet" className="cursor-pointer font-medium">
                  Anonymat complet
                </Label>
                <p className="text-sm text-muted-foreground">
                  Aucune information identifiable (ville générale, secteur uniquement)
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="semi-anonyme" id="anonymat-semi" />
              <div>
                <Label htmlFor="anonymat-semi" className="cursor-pointer font-medium">
                  Semi-anonyme (Recommandé)
                </Label>
                <p className="text-sm text-muted-foreground">
                  Ville et département visibles, raison sociale masquée
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="public" id="anonymat-public" />
              <div>
                <Label htmlFor="anonymat-public" className="cursor-pointer font-medium">
                  Public
                </Label>
                <p className="text-sm text-muted-foreground">
                  Toutes les informations visibles (accélère la vente)
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Documents disponibles pour les acheteurs qualifiés</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {documentsOptions.map((doc) => (
              <div key={doc.id} className="flex items-start space-x-2">
                <Checkbox
                  id={doc.id}
                  checked={(formData.documentsDisponibles || []).includes(doc.id)}
                  onCheckedChange={() => toggleDocument(doc.id)}
                />
                <Label htmlFor={doc.id} className="cursor-pointer">
                  {doc.label}
                </Label>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Ces documents seront accessibles uniquement après signature d'un accord de confidentialité
          </p>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="ndaRequis"
            checked={formData.ndaRequis}
            onCheckedChange={(checked) => handleInputChange("ndaRequis", checked)}
          />
          <div>
            <Label htmlFor="ndaRequis" className="cursor-pointer font-medium">
              Accord de confidentialité (NDA) requis *
            </Label>
            <p className="text-sm text-muted-foreground">
              Les acheteurs devront signer un NDA avant d'accéder aux informations détaillées
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection11;
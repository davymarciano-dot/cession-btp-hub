import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { z } from "zod";

const registrationSchema = z.object({
  profil: z.string().min(1, "Le profil est requis"),
  email: z.string().email("Email invalide").max(255),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  telephone: z.string().min(6, "Le téléphone est requis"),
  phoneCountry: z.string(),
  nom: z.string().min(1, "Le nom est requis"),
  prenom: z.string().min(1, "Le prénom est requis"),
  societe: z.string().optional(),
  pays: z.string().min(1, "Le pays est requis"),
  ville: z.string().min(1, "La ville est requise"),
  adresse: z.string().min(1, "L'adresse est requise"),
  acceptCgu: z.boolean().refine(val => val === true, "Vous devez accepter les CGU"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const countriesWithDialCode = [
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "BE", name: "Belgique", dial: "+32", flag: "🇧🇪" },
  { code: "CH", name: "Suisse", dial: "+41", flag: "🇨🇭" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "US", name: "États-Unis", dial: "+1", flag: "🇺🇸" },
  { code: "GB", name: "Royaume-Uni", dial: "+44", flag: "🇬🇧" },
  { code: "DE", name: "Allemagne", dial: "+49", flag: "🇩🇪" },
  { code: "ES", name: "Espagne", dial: "+34", flag: "🇪🇸" },
  { code: "IT", name: "Italie", dial: "+39", flag: "🇮🇹" },
  { code: "PT", name: "Portugal", dial: "+351", flag: "🇵🇹" },
  { code: "LU", name: "Luxembourg", dial: "+352", flag: "🇱🇺" },
  { code: "MC", name: "Monaco", dial: "+377", flag: "🇲🇨" },
  { code: "AD", name: "Andorre", dial: "+376", flag: "🇦🇩" },
  { code: "MA", name: "Maroc", dial: "+212", flag: "🇲🇦" },
  { code: "DZ", name: "Algérie", dial: "+213", flag: "🇩🇿" },
  { code: "TN", name: "Tunisie", dial: "+216", flag: "🇹🇳" },
  { code: "SN", name: "Sénégal", dial: "+221", flag: "🇸🇳" },
  { code: "CI", name: "Côte d'Ivoire", dial: "+225", flag: "🇨🇮" },
];

const countries = [
  "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", 
  "Angola", "Antigua-et-Barbuda", "Arabie saoudite", "Argentine", "Arménie", 
  "Australie", "Autriche", "Azerbaïdjan", "Bahamas", "Bahreïn", "Bangladesh", 
  "Barbade", "Belgique", "Belize", "Bénin", "Bhoutan", "Biélorussie", "Birmanie", 
  "Bolivie", "Bosnie-Herzégovine", "Botswana", "Brésil", "Brunei", "Bulgarie", 
  "Burkina Faso", "Burundi", "Cambodge", "Cameroun", "Canada", "Cap-Vert", 
  "Centrafrique", "Chili", "Chine", "Chypre", "Colombie", "Comores", 
  "Congo-Brazzaville", "Congo-Kinshasa", "Corée du Nord", "Corée du Sud", 
  "Costa Rica", "Côte d'Ivoire", "Croatie", "Cuba", "Danemark", "Djibouti", 
  "Dominique", "Égypte", "Émirats arabes unis", "Équateur", "Érythrée", 
  "Espagne", "Estonie", "Eswatini", "États-Unis", "Éthiopie", "Fidji", 
  "Finlande", "France", "Gabon", "Gambie", "Géorgie", "Ghana", "Grèce", 
  "Grenade", "Guatemala", "Guinée", "Guinée équatoriale", "Guinée-Bissau", 
  "Guyana", "Haïti", "Honduras", "Hongrie", "Inde", "Indonésie", "Irak", 
  "Iran", "Irlande", "Islande", "Israël", "Italie", "Jamaïque", "Japon", 
  "Jordanie", "Kazakhstan", "Kenya", "Kirghizistan", "Kiribati", "Koweït", 
  "Laos", "Lesotho", "Lettonie", "Liban", "Liberia", "Libye", "Liechtenstein", 
  "Lituanie", "Luxembourg", "Macédoine du Nord", "Madagascar", "Malaisie", 
  "Malawi", "Maldives", "Mali", "Malte", "Maroc", "Marshall", "Maurice", 
  "Mauritanie", "Mexique", "Micronésie", "Moldavie", "Monaco", "Mongolie", 
  "Monténégro", "Mozambique", "Namibie", "Nauru", "Népal", "Nicaragua", 
  "Niger", "Nigeria", "Norvège", "Nouvelle-Zélande", "Oman", "Ouganda", 
  "Ouzbékistan", "Pakistan", "Palaos", "Palestine", "Panama", 
  "Papouasie-Nouvelle-Guinée", "Paraguay", "Pays-Bas", "Pérou", "Philippines", 
  "Pologne", "Portugal", "Qatar", "République dominicaine", "République tchèque", 
  "Roumanie", "Royaume-Uni", "Russie", "Rwanda", "Saint-Christophe-et-Niévès", 
  "Sainte-Lucie", "Saint-Marin", "Saint-Vincent-et-les-Grenadines", 
  "Salomon", "Salvador", "Samoa", "Sao Tomé-et-Principe", "Sénégal", "Serbie", 
  "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", "Somalie", 
  "Soudan", "Soudan du Sud", "Sri Lanka", "Suède", "Suisse", "Suriname", 
  "Syrie", "Tadjikistan", "Tanzanie", "Tchad", "Thaïlande", "Timor oriental", 
  "Togo", "Tonga", "Trinité-et-Tobago", "Tunisie", "Turkménistan", "Turquie", 
  "Tuvalu", "Ukraine", "Uruguay", "Vanuatu", "Vatican", "Venezuela", "Viêt Nam", 
  "Yémen", "Zambie", "Zimbabwe"
];

export default function RegistrationForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<RegistrationFormData>>({
    profil: "",
    email: "",
    password: "",
    telephone: "",
    phoneCountry: "FR",
    nom: "",
    prenom: "",
    societe: "",
    pays: "France",
    ville: "",
    adresse: "",
    acceptCgu: false,
  });

  const handleInputChange = (field: keyof RegistrationFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validated = registrationSchema.parse(formData);

      const redirectUrl = `${window.location.origin}/`;
      const selectedCountry = countriesWithDialCode.find(c => c.code === validated.phoneCountry);
      const fullPhoneNumber = `${selectedCountry?.dial || "+33"} ${validated.telephone}`;

      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: validated.email,
        password: validated.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            profil: validated.profil,
            telephone: fullPhoneNumber,
            nom: validated.nom,
            prenom: validated.prenom,
            societe: validated.societe || null,
            pays: validated.pays,
            ville: validated.ville,
            adresse: validated.adresse,
          }
        }
      });

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          toast({
            title: "Compte existant",
            description: "Cet email est déjà utilisé. Veuillez vous connecter.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erreur d'inscription",
            description: signUpError.message,
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "✅ Compte créé !",
        description: "Votre compte vient d'être créé, consultez votre boite mail pour l'activer.",
      });

      setTimeout(() => {
        navigate("/auth?tab=confirmation");
      }, 1500);

    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation échouée",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'inscription.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profil */}
      <div className="space-y-2">
        <Label htmlFor="profil">Profil *</Label>
        <Select value={formData.profil} onValueChange={(value) => handleInputChange("profil", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez votre profil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="porteur">
              <div className="py-1">
                <div className="font-medium">Porteur de projet</div>
                <div className="text-xs text-muted-foreground">(Acquéreur recherchant une affaire à la vente ou en location)</div>
              </div>
            </SelectItem>
            <SelectItem value="cedant">
              <div className="py-1">
                <div className="font-medium">Cédant propriétaire</div>
                <div className="text-xs text-muted-foreground">(Chef d'entreprise souhaitant céder ou louer son bien)</div>
              </div>
            </SelectItem>
            <SelectItem value="franchise">
              <div className="py-1">
                <div className="font-medium">Enseigne de la franchise</div>
                <div className="text-xs text-muted-foreground">(Souhaitant diffuser des annonces de cession d'entreprise)</div>
              </div>
            </SelectItem>
            <SelectItem value="immobilier">
              <div className="py-1">
                <div className="font-medium">Professionnel de l'immobilier</div>
                <div className="text-xs text-muted-foreground">(Agence, cabinet d'affaire souhaitant diffuser des annonces)</div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Email et Téléphone */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email de contact *</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email de contact"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telephone">Téléphone *</Label>
          <div className="flex gap-2">
            <Select value={formData.phoneCountry} onValueChange={(value) => handleInputChange("phoneCountry", value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {countriesWithDialCode.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.flag} {country.dial}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="telephone"
              type="tel"
              placeholder="Téléphone"
              value={formData.telephone}
              onChange={(e) => handleInputChange("telephone", e.target.value)}
              required
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {/* Mot de passe */}
      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe *</Label>
        <Input
          id="password"
          type="password"
          placeholder="Mot de passe (6 caractères minimum)"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          required
        />
      </div>

      {/* Nom et Prénom */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nom">Nom *</Label>
          <Input
            id="nom"
            type="text"
            placeholder="Nom"
            value={formData.nom}
            onChange={(e) => handleInputChange("nom", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prenom">Prénom *</Label>
          <Input
            id="prenom"
            type="text"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={(e) => handleInputChange("prenom", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Société */}
      <div className="space-y-2">
        <Label htmlFor="societe">Société</Label>
        <Input
          id="societe"
          type="text"
          placeholder="Société"
          value={formData.societe}
          onChange={(e) => handleInputChange("societe", e.target.value)}
        />
      </div>

      {/* Pays et Ville */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pays">Pays *</Label>
          <Select value={formData.pays} onValueChange={(value) => handleInputChange("pays", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ville">Ville *</Label>
          <Input
            id="ville"
            type="text"
            placeholder="Ville"
            value={formData.ville}
            onChange={(e) => handleInputChange("ville", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Adresse */}
      <div className="space-y-2">
        <Label htmlFor="adresse">Adresse *</Label>
        <Input
          id="adresse"
          type="text"
          placeholder="Adresse"
          value={formData.adresse}
          onChange={(e) => handleInputChange("adresse", e.target.value)}
          required
        />
      </div>

      {/* CGU Checkbox */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="acceptCgu"
          checked={formData.acceptCgu}
          onCheckedChange={(checked) => handleInputChange("acceptCgu", checked as boolean)}
        />
        <label htmlFor="acceptCgu" className="text-sm leading-tight cursor-pointer">
          En cochant cette case, j'accepte et je reconnais avoir pris connaissance des{" "}
          <a href="/cgv" className="text-primary underline">conditions générales d'utilisation</a>{" "}
          et de la{" "}
          <a href="/mentions-legales" className="text-primary underline">politique de données personnelles</a>.
        </label>
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isLoading || !formData.acceptCgu} className="w-full h-12 text-base">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Création en cours...
          </>
        ) : (
          "Créer mon compte →"
        )}
      </Button>

      <p className="text-sm text-muted-foreground text-right">* Champs obligatoires</p>

      {/* Link to login */}
      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground">
          Déjà inscrit ?{" "}
          <button type="button" onClick={() => navigate("/auth")} className="text-primary underline font-medium hover:text-primary/80">
            Connectez-vous
          </button>
        </p>
      </div>
    </form>
  );
}

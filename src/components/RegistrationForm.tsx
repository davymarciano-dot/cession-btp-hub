import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock, User, Phone, Building2, MapPin, Home, Shield, Check } from "lucide-react";
import { z } from "zod";
import { Card } from "@/components/ui/card";

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
  codePostal: z.string().min(1, "Le code postal est requis"),
  acceptCgu: z.boolean().refine(val => val === true, "Vous devez accepter les CGU"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface AddressSuggestion {
  properties: {
    label: string;
    name: string;
    city: string;
    postcode: string;
    country: string;
  };
}

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
  "France", "Belgique", "Suisse", "Canada", "États-Unis", "Royaume-Uni",
  "Allemagne", "Espagne", "Italie", "Portugal", "Luxembourg", "Monaco",
  "Andorre", "Maroc", "Algérie", "Tunisie", "Sénégal", "Côte d'Ivoire",
  "Australie", "Autriche", "Brésil", "Chine", "Danemark", "Finlande",
  "Grèce", "Inde", "Irlande", "Israël", "Japon", "Mexique", "Pays-Bas",
  "Nouvelle-Zélande", "Norvège", "Pologne", "Russie", "Singapour", "Suède", "Turquie"
];

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
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
    codePostal: "",
    acceptCgu: false,
  });
  
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddressChange = async (value: string) => {
    setFormData(prev => ({ ...prev, adresse: value }));
    setAddressError(null);
    
    console.log('🔍 Recherche adresse:', value, 'longueur:', value.length);
    
    if (value.length > 2) {
      setIsLoadingAddress(true);
      try {
        const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(value)}&limit=5`;
        console.log('📡 Appel API:', url);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`Erreur API: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('✅ Résultats API:', data.features?.length || 0, 'suggestions');
        console.log('📍 Suggestions:', data.features);
        
        if (data.features && data.features.length > 0) {
          setAddressSuggestions(data.features);
          setShowSuggestions(true);
          setAddressError(null);
        } else {
          setAddressSuggestions([]);
          setShowSuggestions(false);
          setAddressError('Aucune adresse trouvée');
        }
      } catch (error) {
        console.error('❌ Erreur lors de la recherche d\'adresse:', error);
        setAddressSuggestions([]);
        setShowSuggestions(false);
        if (error instanceof Error && error.name === 'AbortError') {
          setAddressError('Recherche trop longue, veuillez réessayer');
        } else {
          setAddressError('Service temporairement indisponible');
        }
      } finally {
        setIsLoadingAddress(false);
      }
    } else {
      console.log('⏸️ Recherche trop courte, attente de plus de 2 caractères');
      setAddressSuggestions([]);
      setShowSuggestions(false);
      setIsLoadingAddress(false);
    }
  };

  const selectAddress = (suggestion: AddressSuggestion) => {
    const props = suggestion.properties;
    
    setFormData(prev => ({
      ...prev,
      adresse: props.name || props.label,
      ville: props.city || '',
      codePostal: props.postcode || '',
      pays: 'France'
    }));
    
    setAddressSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      registrationSchema.parse(formData);

      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            profil: formData.profil,
            nom: formData.nom,
            prenom: formData.prenom,
            telephone: `${countriesWithDialCode.find(c => c.code === formData.phoneCountry)?.dial} ${formData.telephone}`,
            societe: formData.societe || null,
            pays: formData.pays,
            ville: formData.ville,
            adresse: formData.adresse,
            code_postal: formData.codePostal,
          },
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast({
            title: "Email déjà utilisé",
            description: "Un compte existe déjà avec cet email. Veuillez vous connecter.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erreur",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "✅ Inscription réussie !",
        description: "Bienvenue sur CessionBTP.",
      });

      navigate("/?tab=login");
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
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Profil */}
      <div className="space-y-2">
        <Label htmlFor="profil" className="text-sm font-medium flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          Profil <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.profil}
          onValueChange={(value) => setFormData(prev => ({ ...prev, profil: value }))}
        >
          <SelectTrigger className="h-11 bg-background border-2 hover:border-primary/50 transition-all">
            <SelectValue placeholder="Sélectionnez votre profil" />
          </SelectTrigger>
          <SelectContent className="bg-background border-2">
            <SelectItem value="porteur" className="cursor-pointer">
              <div className="py-1">
                <div className="font-semibold text-foreground">Porteur de projet</div>
                <div className="text-xs text-muted-foreground">Je souhaite acheter une entreprise</div>
              </div>
            </SelectItem>
            <SelectItem value="cedant" className="cursor-pointer">
              <div className="py-1">
                <div className="font-semibold text-foreground">Cédant propriétaire</div>
                <div className="text-xs text-muted-foreground">Je souhaite vendre mon entreprise</div>
              </div>
            </SelectItem>
            <SelectItem value="franchise" className="cursor-pointer">
              <div className="py-1">
                <div className="font-semibold text-foreground">Enseigne de la franchise</div>
                <div className="text-xs text-muted-foreground">Je représente un réseau de franchise</div>
              </div>
            </SelectItem>
            <SelectItem value="professionnel" className="cursor-pointer">
              <div className="py-1">
                <div className="font-semibold text-foreground">Professionnel de l'immobilier</div>
                <div className="text-xs text-muted-foreground">Agent, courtier ou consultant</div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Email et Téléphone - 2 colonnes */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            Email de contact <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="h-11 bg-background border-2 focus:border-primary transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telephone" className="text-sm font-medium flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            Téléphone <span className="text-destructive">*</span>
          </Label>
          <div className="flex gap-2">
            <Select
              value={formData.phoneCountry}
              onValueChange={(value) => setFormData(prev => ({ ...prev, phoneCountry: value }))}
            >
              <SelectTrigger className="w-[120px] h-11 bg-background border-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-2">
                {countriesWithDialCode.map((country) => (
                  <SelectItem key={country.code} value={country.code} className="cursor-pointer">
                    {country.flag} {country.dial}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="telephone"
              type="tel"
              placeholder="06 12 34 56 78"
              value={formData.telephone}
              onChange={(e) => setFormData(prev => ({ ...prev, telephone: e.target.value }))}
              className="flex-1 h-11 bg-background border-2 focus:border-primary transition-all"
              required
            />
          </div>
        </div>
      </div>

      {/* Mot de passe */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary" />
          Mot de passe <span className="text-destructive">*</span>
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          className="h-11 bg-background border-2 focus:border-primary transition-all"
          required
        />
        <p className="text-xs text-muted-foreground">Minimum 6 caractères</p>
      </div>

      {/* Nom et Prénom - 2 colonnes */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nom" className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Nom <span className="text-destructive">*</span>
          </Label>
          <Input
            id="nom"
            type="text"
            placeholder="Dupont"
            value={formData.nom}
            onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
            className="h-11 bg-background border-2 focus:border-primary transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prenom" className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Prénom <span className="text-destructive">*</span>
          </Label>
          <Input
            id="prenom"
            type="text"
            placeholder="Jean"
            value={formData.prenom}
            onChange={(e) => setFormData(prev => ({ ...prev, prenom: e.target.value }))}
            className="h-11 bg-background border-2 focus:border-primary transition-all"
            required
          />
        </div>
      </div>

      {/* Société - pleine largeur */}
      <div className="space-y-2">
        <Label htmlFor="societe" className="text-sm font-medium flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" />
          Société <span className="text-muted-foreground text-xs">(optionnel)</span>
        </Label>
        <Input
          id="societe"
          type="text"
          placeholder="Nom de votre société"
          value={formData.societe}
          onChange={(e) => setFormData(prev => ({ ...prev, societe: e.target.value }))}
          className="h-11 bg-background border-2 focus:border-primary transition-all"
        />
      </div>

      {/* Pays - pleine largeur */}
      <div className="space-y-2">
        <Label htmlFor="pays" className="text-sm font-medium flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Pays <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.pays}
          onValueChange={(value) => setFormData(prev => ({ ...prev, pays: value }))}
        >
          <SelectTrigger className="h-11 bg-background border-2 hover:border-primary/50 transition-all">
            <SelectValue placeholder="France" />
          </SelectTrigger>
          <SelectContent className="bg-background border-2 max-h-[300px]">
            {countries.map((country) => (
              <SelectItem key={country} value={country} className="cursor-pointer">
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Adresse - pleine largeur avec autocomplete */}
      <div className="space-y-2 relative" ref={suggestionsRef}>
        <Label htmlFor="adresse" className="text-sm font-medium flex items-center gap-2">
          <Home className="w-4 h-4 text-primary" />
          Adresse <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <Input
            id="adresse"
            type="text"
            placeholder="12 rue de la République"
            value={formData.adresse}
            onChange={(e) => handleAddressChange(e.target.value)}
            onFocus={() => addressSuggestions.length > 0 && setShowSuggestions(true)}
            className="h-11 bg-background border-2 focus:border-primary transition-all pr-10"
            required
            autoComplete="off"
          />
          {isLoadingAddress && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </div>
          )}
        </div>
        
        {addressError && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <span>⚠️</span> {addressError}
          </p>
        )}
        
        {showSuggestions && addressSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border-2 border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
            {addressSuggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => selectAddress(suggestion)}
                className="px-4 py-3 hover:bg-muted cursor-pointer transition-colors border-b border-border last:border-0 flex items-start gap-2"
              >
                <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {suggestion.properties.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Code Postal et Ville - 2 colonnes */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="codePostal" className="text-sm font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Code postal <span className="text-destructive">*</span>
          </Label>
          <Input
            id="codePostal"
            type="text"
            placeholder="75001"
            value={formData.codePostal}
            onChange={(e) => setFormData(prev => ({ ...prev, codePostal: e.target.value }))}
            className="h-11 bg-background border-2 focus:border-primary transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ville" className="text-sm font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Ville <span className="text-destructive">*</span>
          </Label>
          <Input
            id="ville"
            type="text"
            placeholder="Paris"
            value={formData.ville}
            onChange={(e) => setFormData(prev => ({ ...prev, ville: e.target.value }))}
            className="h-11 bg-background border-2 focus:border-primary transition-all"
            required
          />
        </div>
      </div>

      {/* CGU */}
      <Card className="p-4 bg-muted/30 border-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="acceptCgu"
            checked={formData.acceptCgu}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, acceptCgu: checked === true }))
            }
            className="mt-1"
          />
          <Label 
            htmlFor="acceptCgu" 
            className="text-sm leading-relaxed cursor-pointer flex-1"
          >
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary shrink-0" />
              <span>
                J'accepte les{" "}
                <a href="/cgv" target="_blank" className="text-primary hover:underline font-semibold underline-offset-2">
                  Conditions Générales d'Utilisation
                </a>
                {" "}et la{" "}
                <a href="/mentions-legales" target="_blank" className="text-primary hover:underline font-semibold underline-offset-2">
                  Politique de confidentialité
                </a>
                <span className="text-destructive"> *</span>
              </span>
            </span>
          </Label>
        </div>
      </Card>

      <Button 
        type="submit" 
        size="lg"
        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Création en cours...
          </>
        ) : (
          <>
            <Check className="mr-2 h-5 w-5" />
            Créer mon compte gratuitement
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        En créant un compte, vous rejoignez la communauté CessionBTP et accédez à toutes les opportunités du BTP
      </p>
    </form>
  );
};

export default RegistrationForm;

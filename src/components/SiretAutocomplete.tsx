import { useState } from 'react';
import { Check, AlertCircle, Loader } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface SiretAutocompleteProps {
  onDataFetched: (data: any) => void;
  initialValue?: string;
}

interface CompanyData {
  raisonSociale: string;
  formeJuridique: string;
  anneeCreation: string;
  secteurActivite: string;
  ville: string;
  codePostal: string;
  departement: string;
  adresse: string;
  nombreSalaries: string;
}

const SiretAutocomplete = ({ onDataFetched, initialValue = '' }: SiretAutocompleteProps) => {
  const [siret, setSiret] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const { toast } = useToast();

  // Validation du format SIRET avec algorithme de Luhn
  const validateSiret = (value: string): boolean => {
    const cleaned = value.replace(/\s/g, '');
    
    if (!/^\d{14}$/.test(cleaned)) {
      return false;
    }

    // Algorithme de Luhn pour valider le SIRET
    let sum = 0;
    for (let i = 0; i < 14; i++) {
      let digit = parseInt(cleaned[i]);
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  // Formater le SIRET pour l'affichage (XXX XXX XXX XXXXX)
  const formatSiret = (value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{5})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
    return value;
  };

  // Récupérer les données de l'entreprise via l'edge function
  const fetchCompanyData = async (siretNumber: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      const { data, error: fetchError } = await supabase.functions.invoke('fetch-siret-data', {
        body: { siret: siretNumber.replace(/\s/g, '') }
      });

      if (fetchError) {
        throw new Error(fetchError.message || 'SIRET non trouvé');
      }

      if (data) {
        setCompanyData(data);
        
        // Passer les données au formulaire parent
        onDataFetched({
          siret: siretNumber.replace(/\s/g, ''),
          raisonSociale: data.raisonSociale || '',
          formeJuridique: data.formeJuridique || '',
          anneeCreation: data.anneeCreation || '',
          secteurActivite: data.secteurActivite || '',
          ville: data.ville || '',
          codePostal: data.codePostal || '',
          departement: data.departement || '',
          adresse: data.adresse || '',
          nombreSalaries: data.nombreSalaries || ''
        });

        setIsValid(true);
        toast({
          title: "Entreprise trouvée !",
          description: "Les informations ont été récupérées avec succès.",
        });
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la récupération des données');
      setIsValid(false);
      toast({
        title: "Erreur",
        description: err.message || 'SIRET non trouvé',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer les changements de l'input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d\s]/g, '');
    
    if (value.replace(/\s/g, '').length <= 14) {
      setSiret(value);
      
      const cleanedValue = value.replace(/\s/g, '');
      
      if (cleanedValue.length === 14) {
        const valid = validateSiret(cleanedValue);
        setIsValid(valid);
        
        if (valid) {
          fetchCompanyData(cleanedValue);
        } else {
          setError('SIRET invalide (vérification de la clé)');
          setCompanyData(null);
        }
      } else {
        setIsValid(null);
        setError('');
        setCompanyData(null);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Label htmlFor="siret">
          Numéro SIRET *
        </Label>
        
        <div className="relative mt-2">
          <Input
            id="siret"
            type="text"
            value={formatSiret(siret)}
            onChange={handleChange}
            placeholder="123 456 789 00012"
            className={`pr-10 ${
              isValid === true ? 'border-green-500 focus-visible:ring-green-500' : ''
            } ${
              isValid === false ? 'border-destructive focus-visible:ring-destructive' : ''
            }`}
          />
          
          {/* Icône de statut */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {isLoading && <Loader className="w-5 h-5 text-primary animate-spin" />}
            {isValid === true && !isLoading && <Check className="w-5 h-5 text-green-500" />}
            {isValid === false && !isLoading && <AlertCircle className="w-5 h-5 text-destructive" />}
          </div>
        </div>

        {/* Message d'erreur */}
        {error && (
          <p className="mt-2 text-sm text-destructive">{error}</p>
        )}

        {/* Infos récupérées */}
        {companyData && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">
              ✓ Entreprise trouvée
            </p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p><span className="font-medium">Nom :</span> {companyData.raisonSociale}</p>
              <p><span className="font-medium">Activité :</span> {companyData.secteurActivite}</p>
              <p><span className="font-medium">Adresse :</span> {companyData.ville} ({companyData.codePostal})</p>
              {companyData.anneeCreation && (
                <p><span className="font-medium">Création :</span> {companyData.anneeCreation}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-muted-foreground">
        <p>💡 Le SIRET sera vérifié automatiquement via l'API publique data.gouv.fr</p>
      </div>
    </div>
  );
};

export default SiretAutocomplete;

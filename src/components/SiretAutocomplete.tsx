import { useState, useEffect, useRef } from 'react';
import { Check, AlertCircle, Loader, Search } from 'lucide-react';
// import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from './ui/command';

interface SiretAutocompleteProps {
  onDataFetched: (data: any) => void;
  initialValue?: string;
}

interface CompanyData {
  siret?: string;
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
  const [searchResults, setSearchResults] = useState<CompanyData[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Rechercher des entreprises via l'API du gouvernement
  const searchCompanies = async (query: string) => {
    if (query.length < 3) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(query)}&per_page=5`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la recherche');
      }

      const data = await response.json();
      
      const results = data.results?.map((result: any) => ({
        siret: result.siege?.siret || '',
        raisonSociale: result.nom_complet || result.nom_raison_sociale || '',
        formeJuridique: result.nature_juridique || '',
        anneeCreation: result.date_creation ? new Date(result.date_creation).getFullYear().toString() : '',
        secteurActivite: result.activite_principale || '',
        ville: result.siege?.commune || '',
        codePostal: result.siege?.code_postal || '',
        departement: result.siege?.code_postal?.substring(0, 2) || '',
        adresse: result.siege?.libelle_voie || '',
        nombreSalaries: result.tranche_effectif_salarie || '0',
      })) || [];
      
      setSearchResults(results);
      setShowDropdown(results.length > 0);
    } catch (err: any) {
      console.error('Search error:', err);
      setSearchResults([]);
      setShowDropdown(false);
    } finally {
      setIsSearching(false);
    }
  };

  // Sélectionner une entreprise depuis les résultats
  const selectCompany = (company: CompanyData) => {
    setSiret(company.siret);
    setCompanyData(company);
    setIsValid(true);
    setShowDropdown(false);
    setSearchResults([]);

    onDataFetched({
      siret: company.siret,
      raisonSociale: company.raisonSociale,
      formeJuridique: company.formeJuridique,
      anneeCreation: company.anneeCreation,
      secteurActivite: company.secteurActivite,
      ville: company.ville,
      codePostal: company.codePostal,
      departement: company.departement,
      adresse: company.adresse,
      nombreSalaries: company.nombreSalaries
    });

    toast({
      title: "Entreprise sélectionnée !",
      description: company.raisonSociale,
    });
  };

  // Récupérer les données de l'entreprise via l'API du gouvernement
  const fetchCompanyData = async (siretNumber: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://recherche-entreprises.api.gouv.fr/search?q=${siretNumber}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error('SIRET non trouvé');
      }

      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const company = data.results[0];
        const companyInfo: CompanyData = {
          siret: company.siege?.siret || siretNumber,
          raisonSociale: company.nom_complet || company.nom_raison_sociale || '',
          formeJuridique: company.nature_juridique || '',
          anneeCreation: company.date_creation ? new Date(company.date_creation).getFullYear().toString() : '',
          secteurActivite: company.activite_principale || '',
          ville: company.siege?.commune || '',
          codePostal: company.siege?.code_postal || '',
          departement: company.siege?.code_postal?.substring(0, 2) || '',
          adresse: company.siege?.libelle_voie || '',
          nombreSalaries: company.tranche_effectif_salarie || '0',
        };
        
        setCompanyData(companyInfo);
        setIsValid(true);
        
        onDataFetched(companyInfo);
        
        toast({
          title: "✅ Entreprise trouvée",
          description: companyInfo.raisonSociale,
        });
      } else {
        throw new Error('Entreprise non trouvée');
      }
    } catch (err: any) {
      console.log('SIRET error:', err);
      setError(err.message || 'SIRET non trouvé. Vous pouvez continuer en remplissant les champs manuellement.');
      setIsValid(false);
      setCompanyData(null);
      
      toast({
        title: "Erreur",
        description: err.message || "SIRET non trouvé",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer les changements de l'input avec recherche en temps réel
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d\s]/g, '');
    
    if (value.replace(/\s/g, '').length <= 14) {
      setSiret(value);
      setCompanyData(null);
      setIsValid(null);
      setError('');
      
      const cleanedValue = value.replace(/\s/g, '');
      
      // Recherche dès 3 caractères
      if (cleanedValue.length >= 3 && cleanedValue.length < 14) {
        searchCompanies(cleanedValue);
      } else if (cleanedValue.length === 14) {
        setShowDropdown(false);
        const valid = validateSiret(cleanedValue);
        setIsValid(valid);
        
        if (valid) {
          fetchCompanyData(cleanedValue);
        } else {
          setError('SIRET invalide (vérification de la clé)');
        }
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }
  };

  return (
    <div className="space-y-4" ref={dropdownRef}>
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
            placeholder="Tapez un SIRET ou raison sociale..."
            className={`pr-10 ${
              isValid === true ? 'border-green-500 focus-visible:ring-green-500' : ''
            } ${
              isValid === false ? 'border-destructive focus-visible:ring-destructive' : ''
            }`}
          />
          
          {/* Icône de statut */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {(isLoading || isSearching) && <Loader className="w-5 h-5 text-primary animate-spin" />}
            {isValid === true && !isLoading && <Check className="w-5 h-5 text-green-500" />}
            {isValid === false && !isLoading && <AlertCircle className="w-5 h-5 text-destructive" />}
            {!isLoading && !isSearching && !isValid && siret.length >= 3 && <Search className="w-5 h-5 text-muted-foreground" />}
          </div>
        </div>

        {/* Dropdown des résultats */}
        {showDropdown && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            <Command>
              <CommandList>
                <CommandGroup>
                  {searchResults.map((company, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => selectCompany(company)}
                      className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 p-3"
                    >
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm">{company.raisonSociale}</span>
                          <span className="text-xs text-muted-foreground">{company.siret}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {company.secteurActivite}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {company.ville} {company.codePostal && `(${company.codePostal})`}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
                {searchResults.length === 0 && (
                  <CommandEmpty>Aucun résultat trouvé</CommandEmpty>
                )}
              </CommandList>
            </Command>
          </div>
        )}

        {/* Message d'erreur ou info */}
        {error && (
          <p className="mt-2 text-sm text-amber-600 dark:text-amber-400">{error}</p>
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
        <p>💡 Tapez au moins 3 caractères pour rechercher une entreprise</p>
        <p className="mt-1">Vous pouvez aussi saisir manuellement un SIRET de 14 chiffres.</p>
      </div>
    </div>
  );
};

export default SiretAutocomplete;

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { siret } = await req.json();

    if (!siret || siret.length !== 14) {
      throw new Error("SIRET invalide. Le numéro doit contenir 14 chiffres.");
    }

    // Appel à l'API publique gratuite
    const response = await fetch(
      `https://api-siret.vercel.app/siret/${siret}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Entreprise non trouvée");
      }
      throw new Error("Erreur lors de la récupération des données");
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error("SIRET non trouvé");
    }

    // Extraire et formater les données
    const companyData = {
      raisonSociale: data.denomination || data.nom_raison_sociale || '',
      formeJuridique: data.categorie_juridique || '',
      anneeCreation: data.date_creation ? new Date(data.date_creation).getFullYear().toString() : '',
      secteurActivite: data.libelle_activite || data.activite_principale || '',
      ville: data.libelle_commune || '',
      codePostal: data.code_postal || '',
      departement: data.code_postal ? data.code_postal.substring(0, 2) : '',
      adresse: data.adresse ? `${data.adresse.numero_voie || ''} ${data.adresse.type_voie || ''} ${data.adresse.libelle_voie || ''}`.trim() : '',
      nombreSalaries: data.tranche_effectifs || '',
    };

    return new Response(
      JSON.stringify(companyData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in fetch-siret-data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la récupération des données SIRET';
    return new Response(
      JSON.stringify({ 
        error: errorMessage
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});

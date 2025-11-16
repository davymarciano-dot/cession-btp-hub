import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    if (!query || query.length < 3) {
      return new Response(
        JSON.stringify({ results: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Utiliser l'API gratuite data.gouv.fr pour la recherche
    const searchUrl = `https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(query)}&per_page=10`;
    
    console.log('Searching data.gouv.fr API with query:', query);
    
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      console.error('Data.gouv.fr API error:', response.status, response.statusText);
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    
    // Transformer les résultats en format utilisable
    const results = (data.results || []).map((entreprise: any) => {
      const siege = entreprise.siege || {};
      const codePostal = siege.code_postal || '';
      const departement = codePostal.substring(0, 2);
      
      return {
        siret: entreprise.siret || '',
        raisonSociale: entreprise.nom_complet || entreprise.nom_raison_sociale || '',
        formeJuridique: entreprise.nature_juridique || '',
        anneeCreation: entreprise.date_creation ? entreprise.date_creation.substring(0, 4) : '',
        secteurActivite: entreprise.activite_principale || '',
        ville: siege.commune || '',
        codePostal: codePostal,
        departement: departement,
        adresse: siege.libelle_voie || '',
        nombreSalaries: entreprise.tranche_effectif_salarie || ''
      };
    });

    console.log('Found', results.length, 'results');

    return new Response(
      JSON.stringify({ results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in search-siret function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

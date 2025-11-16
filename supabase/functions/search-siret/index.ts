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

    const PAPPERS_API_TOKEN = Deno.env.get('PAPPERS_API_TOKEN');
    if (!PAPPERS_API_TOKEN) {
      console.error('PAPPERS_API_TOKEN not configured');
      return new Response(
        JSON.stringify({ error: 'API token not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Recherche par SIRET ou raison sociale via API Pappers
    const searchUrl = `https://api.pappers.fr/v2/recherche?api_token=${PAPPERS_API_TOKEN}&q=${encodeURIComponent(query)}&par_page=10`;
    
    console.log('Searching Pappers API with query:', query);
    
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      console.error('Pappers API error:', response.status, response.statusText);
      throw new Error(`Pappers API returned ${response.status}`);
    }

    const data = await response.json();
    
    // Transformer les résultats en format utilisable
    const results = (data.resultats || []).map((entreprise: any) => {
      const siege = entreprise.siege || {};
      const codePostal = siege.code_postal || '';
      const departement = codePostal.substring(0, 2);
      
      return {
        siret: entreprise.siret || '',
        raisonSociale: entreprise.nom_entreprise || entreprise.denomination || '',
        formeJuridique: entreprise.forme_juridique || '',
        anneeCreation: entreprise.date_creation ? new Date(entreprise.date_creation).getFullYear().toString() : '',
        secteurActivite: entreprise.libelle_code_naf || '',
        ville: siege.ville || '',
        codePostal: codePostal,
        departement: departement,
        adresse: siege.adresse_ligne_1 || '',
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

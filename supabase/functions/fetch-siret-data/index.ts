import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { checkRateLimit, getClientIP } from '../_shared/rateLimit.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Rate limiting - 10 requests per minute per IP
    const clientIP = getClientIP(req);
    const rateLimitResult = checkRateLimit(clientIP, { windowMs: 60000, maxRequests: 10 });
    
    if (rateLimitResult.limited) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: 'Trop de requêtes. Veuillez réessayer dans quelques instants.',
          retryAfter: rateLimitResult.retryAfter 
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': String(rateLimitResult.retryAfter)
          } 
        }
      );
    }

    const { siret } = await req.json();

    if (!siret || siret.length !== 14) {
      throw new Error("SIRET invalide. Le numéro doit contenir 14 chiffres.");
    }

    // Appel à l'API publique gouvernementale (gratuite et fiable)
    const response = await fetch(
      `https://recherche-entreprises.api.gouv.fr/search?q=${siret}&limite=1`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('API response not OK:', response.status);
      throw new Error('Entreprise non trouvée');
    }

    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      console.log('No results found for SIRET:', siret);
      throw new Error('SIRET non trouvé');
    }

    const entreprise = data.results[0];
    
    // Extraire et formater les données
    const companyData = {
      raisonSociale: entreprise.nom_complet || entreprise.nom_raison_sociale || '',
      formeJuridique: entreprise.nature_juridique || '',
      anneeCreation: entreprise.date_creation ? new Date(entreprise.date_creation).getFullYear().toString() : '',
      secteurActivite: entreprise.activite_principale || '',
      ville: entreprise.siege?.libelle_commune || '',
      codePostal: entreprise.siege?.code_postal || '',
      departement: entreprise.siege?.code_postal ? entreprise.siege.code_postal.substring(0, 2) : '',
      adresse: entreprise.siege?.adresse || '',
      nombreSalaries: entreprise.tranche_effectif_salarie || '',
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
    
    // Retourner une erreur plus claire
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        message: 'SIRET non trouvé dans la base. Vous pouvez continuer en remplissant les champs manuellement.'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404
      }
    );
  }
});

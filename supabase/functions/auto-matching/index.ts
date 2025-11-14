import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { corsHeaders } from '../_shared/cors.ts';

interface MatchResult {
  buyer_alert_id: string;
  email: string;
  score: number;
  location_match: boolean;
  budget_match: boolean;
  sector_match: boolean;
  size_match: boolean;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      throw new Error('Not authenticated');
    }

    const { listingId } = await req.json();

    if (!listingId) {
      throw new Error('Listing ID is required');
    }

    console.log('Starting auto-matching for listing:', listingId);

    // Get listing details
    const { data: listing, error: listingError } = await supabaseClient
      .from('annonces')
      .select('*')
      .eq('id', listingId)
      .single();

    if (listingError || !listing) {
      throw new Error('Listing not found');
    }

    // Verify user owns this listing
    if (listing.user_id !== user.id) {
      throw new Error('Unauthorized - you do not own this listing');
    }

    console.log('Found listing:', listing.raison_sociale);

    // Get all active buyer alerts
    const { data: buyerAlerts, error: alertsError } = await supabaseClient
      .from('buyer_alerts')
      .select('*')
      .eq('active', true);

    if (alertsError) {
      throw new Error('Error fetching buyer alerts: ' + alertsError.message);
    }

    console.log(`Found ${buyerAlerts?.length || 0} active buyer alerts`);

    // Calculate match scores
    const matches: MatchResult[] = [];

    for (const alert of buyerAlerts || []) {
      let score = 0;
      let location_match = false;
      let budget_match = false;
      let sector_match = false;
      let size_match = false;

      // Location match (30 points)
      if (alert.departements.includes(listing.departement)) {
        score += 30;
        location_match = true;
      }

      // Budget match (25 points) - Check if listing price is within 10% of buyer's max budget
      if (listing.prix_vente && alert.ca_max >= listing.prix_vente * 0.9) {
        score += 25;
        budget_match = true;
      }

      // Sector match (20 points)
      if (alert.secteurs.includes(listing.secteur_activite)) {
        score += 20;
        sector_match = true;
      }

      // Size match (15 points) - Check if number of employees matches
      const listingEmployees = listing.nombre_salaries || 0;
      if (
        listingEmployees >= alert.effectif_min &&
        listingEmployees <= alert.effectif_max
      ) {
        score += 15;
        size_match = true;
      }

      // Revenue match bonus (10 points)
      if (listing.ca_n1 >= alert.ca_min && listing.ca_n1 <= alert.ca_max) {
        score += 10;
      }

      // Only keep matches with score >= 50 (at least 2 major criteria)
      if (score >= 50) {
        matches.push({
          buyer_alert_id: alert.id,
          email: alert.email,
          score,
          location_match,
          budget_match,
          sector_match,
          size_match,
        });
      }
    }

    // Sort by score descending
    matches.sort((a, b) => b.score - a.score);

    console.log(`Generated ${matches.length} matches with score >= 50`);

    // Store top 10 matches in database
    const topMatches = matches.slice(0, 10);
    const matchRecords = topMatches.map((match) => ({
      listing_id: listingId,
      buyer_id: null, // We don't have buyer_id from alerts, will be null
      seller_id: listing.user_id,
      score: match.score,
      location_match: match.location_match,
      budget_match: match.budget_match,
      sector_match: match.sector_match,
      size_match: match.size_match,
      status: 'pending',
    }));

    if (matchRecords.length > 0) {
      const { error: insertError } = await supabaseClient
        .from('matches')
        .insert(matchRecords);

      if (insertError) {
        console.error('Error inserting matches:', insertError);
        throw new Error('Error saving matches: ' + insertError.message);
      }

      console.log(`Saved ${matchRecords.length} matches to database`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        totalMatches: matches.length,
        topMatches: topMatches.length,
        matches: topMatches.map(m => ({
          email: m.email,
          score: m.score,
          criteria: {
            location: m.location_match,
            budget: m.budget_match,
            sector: m.sector_match,
            size: m.size_match,
          }
        })),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in auto-matching:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { checkRateLimit, getClientIP } from '../_shared/rateLimit.ts';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting - 5 requests per minute per IP to prevent AI credit abuse
    const clientIP = getClientIP(req);
    const rateLimitResult = checkRateLimit(clientIP, { windowMs: 60000, maxRequests: 5 });
    
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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    console.log("🤖 Démarrage du matching automatique IA...");

    // Récupérer toutes les annonces actives
    const { data: listings, error: listingsError } = await supabase
      .from('annonces')
      .select('*')
      .eq('statut', 'publiee');

    if (listingsError) throw listingsError;
    console.log(`📋 ${listings?.length || 0} annonces actives trouvées`);

    // Récupérer toutes les alertes actives
    const { data: alerts, error: alertsError } = await supabase
      .from('buyer_alerts')
      .select('*')
      .eq('active', true);

    if (alertsError) throw alertsError;
    console.log(`🔔 ${alerts?.length || 0} alertes actives trouvées`);

    let matchesCreated = 0;
    let emailsSent = 0;

    // Pour chaque annonce, trouver les acheteurs matchés
    for (const listing of listings || []) {
      const matches = findMatches(listing, alerts || []);
      
      console.log(`Annonce ${listing.id}: ${matches.length} matches trouvés`);

      // Créer les matchs dans la base
      for (const match of matches) {
        const { error: matchError } = await supabase
          .from('matches')
          .upsert({
            listing_id: listing.id,
            buyer_id: match.buyer.user_id,
            seller_id: listing.user_id,
            score: match.score,
            location_match: match.criteria.location,
            budget_match: match.criteria.budget,
            sector_match: match.criteria.sector,
            status: 'pending'
          }, {
            onConflict: 'listing_id,buyer_id',
            ignoreDuplicates: false
          });

        if (!matchError) {
          matchesCreated++;
          
          // Envoyer email de notification (asynchrone)
          await sendMatchNotification(match.buyer.email, listing, match.score);
          emailsSent++;
        }
      }

      // Mettre à jour le nombre de vues/matches de l'annonce
      await supabase
        .from('annonces')
        .update({ 
          nombre_vues: (listing.nombre_vues || 0) + matches.length 
        })
        .eq('id', listing.id);
    }

    console.log(`✅ Matching terminé: ${matchesCreated} matchs créés, ${emailsSent} emails envoyés`);

    return new Response(
      JSON.stringify({ 
        success: true,
        matchesCreated,
        emailsSent,
        listingsProcessed: listings?.length || 0
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Auto-matching error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});

interface Match {
  buyer: any;
  score: number;
  criteria: {
    location: boolean;
    budget: boolean;
    sector: boolean;
  };
}

function findMatches(listing: any, alerts: any[]): Match[] {
  const weights = {
    location: 0.30,
    budget: 0.35,
    sector: 0.25,
    certification: 0.10
  };

  return alerts
    .map(alert => {
      let score = 0;
      const criteria = {
        location: false,
        budget: false,
        sector: false
      };

      // Match localisation (30%)
      if (alert.departements && listing.departement) {
        if (alert.departements.includes(listing.departement)) {
          score += weights.location * 100;
          criteria.location = true;
        }
      }

      // Match budget (35%)
      const prixVente = parseFloat(listing.prix_vente) || 0;
      const caMin = parseFloat(alert.ca_min) || 0;
      const caMax = parseFloat(alert.ca_max) || 0;
      
      // Estimation prix ~= 0.7x CA
      const estimatedBudget = prixVente / 0.7;
      
      if (estimatedBudget >= caMin && estimatedBudget <= caMax) {
        score += weights.budget * 100;
        criteria.budget = true;
      } else if (estimatedBudget >= caMin * 0.8 && estimatedBudget <= caMax * 1.2) {
        // Tolérance 20%
        score += weights.budget * 70;
        criteria.budget = true;
      }

      // Match secteur (25%)
      if (alert.secteurs && listing.secteur_activite) {
        if (alert.secteurs.includes(listing.secteur_activite)) {
          score += weights.sector * 100;
          criteria.sector = true;
        }
      }

      // Bonus certifications (10%)
      if (listing.certifications && Array.isArray(listing.certifications)) {
        const hasCertification = listing.certifications.length > 0;
        if (hasCertification) {
          score += weights.certification * 100;
        }
      }

      return {
        buyer: alert,
        score: Math.round(score),
        criteria
      };
    })
    .filter(match => match.score >= 60) // Minimum 60% de compatibilité
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // Top 5 matches par annonce
}

async function sendMatchNotification(email: string, listing: any, score: number) {
  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.log("RESEND_API_KEY not configured, skipping email");
      return;
    }

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CessionBTP <notifications@cessionbtp.fr>",
        to: [email],
        subject: `🎯 Nouvelle opportunité : ${listing.secteur_activite} (${score}% match)`,
        html: `
          <h2>Nouvelle entreprise correspondant à vos critères !</h2>
          <p>Nous avons trouvé une entreprise qui correspond à <strong>${score}%</strong> à vos critères de recherche.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>${listing.raison_sociale || 'Entreprise confidentielle'}</h3>
            <p><strong>Secteur :</strong> ${listing.secteur_activite}</p>
            <p><strong>Localisation :</strong> ${listing.ville} (${listing.departement})</p>
            <p><strong>CA :</strong> ${(listing.ca_n1 / 1000).toFixed(0)}k€</p>
            <p><strong>Prix :</strong> ${(listing.prix_vente / 1000).toFixed(0)}k€</p>
            ${listing.certifications && listing.certifications.length > 0 ? 
              `<p><strong>Certifications :</strong> ${listing.certifications.join(', ')}</p>` : ''}
          </div>
          
          <a href="https://cessionbtp.fr/entreprises/${listing.id}" 
             style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Voir l'annonce complète
          </a>
          
          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            Vous recevez cet email car une annonce correspond à vos critères de recherche.
            <a href="https://cessionbtp.fr/mes-alertes">Gérer mes alertes</a>
          </p>
        `,
      }),
    });
    
    console.log(`✉️ Email envoyé à ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

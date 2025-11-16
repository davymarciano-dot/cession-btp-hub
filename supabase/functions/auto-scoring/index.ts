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
    // Rate limiting - 20 requests per minute per IP
    const clientIP = getClientIP(req);
    const rateLimitResult = checkRateLimit(clientIP, { windowMs: 60000, maxRequests: 20 });
    
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

    const { userId, userType } = await req.json();
    
    // Validate userId is provided
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'userId est requis' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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

    console.log(`🎯 Calcul du score pour user ${userId} (${userType})`);

    let score = 0;
    let badges: string[] = [];
    let scoreDetails = {};

    if (userType === 'seller') {
      // Récupérer les annonces du vendeur
      const { data: listings } = await supabase
        .from('annonces')
        .select('*')
        .eq('user_id', userId);

      if (listings && listings.length > 0) {
        const listing = listings[0]; // Prendre la première annonce
        
        // Revenue (20 points)
        const revenue = parseFloat(listing.ca_n1) || 0;
        const revenueScore = revenue > 500000 ? 20 : (revenue > 300000 ? 15 : 10);
        score += revenueScore;
        
        // Profit (20 points)
        const profit = parseFloat(listing.resultat_net_n1) || 0;
        const profitScore = profit > 50000 ? 20 : (profit > 30000 ? 15 : 10);
        score += profitScore;
        
        // Certifications RGE (30 points)
        const hasCertifications = listing.certifications && 
          Array.isArray(listing.certifications) && 
          listing.certifications.length > 0;
        const certificationScore = hasCertifications ? 30 : 0;
        score += certificationScore;
        
        if (hasCertifications) {
          badges.push('RGE');
        }
        
        // Années d'expérience (10 points)
        const yearCreated = parseInt(listing.annee_creation) || new Date().getFullYear();
        const yearsInBusiness = new Date().getFullYear() - yearCreated;
        const experienceScore = yearsInBusiness > 5 ? 10 : (yearsInBusiness > 3 ? 5 : 0);
        score += experienceScore;
        
        // Effectif (10 points)
        const employees = parseInt(listing.nombre_salaries) || 0;
        const employeeScore = employees > 5 ? 10 : (employees > 2 ? 5 : 0);
        score += employeeScore;
        
        // Urgence (10 points) - pas urgent = meilleur
        const urgencyScore = listing.delai_vente === 'flexable' ? 10 : 
                           listing.delai_vente === '3-6-mois' ? 7 : 5;
        score += urgencyScore;

        scoreDetails = {
          revenueScore,
          profitScore,
          certificationScore,
          experienceScore,
          employeeScore,
          urgencyScore
        };

        // Badges basés sur le score
        if (score >= 90) badges.push('Premium Seller');
        if (score >= 70) badges.push('Verified');
        if (employees >= 5) badges.push('Established');
        if (listing.documents_disponibles && listing.documents_disponibles.length > 5) {
          badges.push('Complete Profile');
        }
      }

    } else if (userType === 'buyer') {
      // Récupérer les alertes de l'acheteur
      const { data: alerts } = await supabase
        .from('buyer_alerts')
        .select('*')
        .eq('user_id', userId)
        .limit(1);

      const alert = alerts?.[0];

      if (alert) {
        // Budget prêt (40 points) - simulé pour l'exemple
        // Dans la vraie vie, vérifier si financement approuvé
        const budgetScore = 30; // À améliorer avec vraies données
        score += budgetScore;

        // Expérience (20 points) - À renseigner dans profil
        const experienceScore = 15; // À améliorer
        score += experienceScore;

        // Réactivité (10 points) - Mesurer temps de réponse moyen
        const responseScore = 10;
        score += responseScore;

        // Critères précis (20 points)
        const criteriaScore = alert.secteurs.length > 0 && 
                             alert.departements.length > 0 ? 20 : 10;
        score += criteriaScore;

        // Alertes actives (10 points)
        const alertsScore = alert.active ? 10 : 0;
        score += alertsScore;

        scoreDetails = {
          budgetScore,
          experienceScore,
          responseScore,
          criteriaScore,
          alertsScore
        };

        // Badges acheteur
        if (score >= 80) badges.push('Serious Buyer');
        if (alert.active) badges.push('Active Search');
        if (criteriaScore === 20) badges.push('Clear Criteria');
      }
    }

    // Sauvegarder le score dans la base
    const { error: upsertError } = await supabase
      .from('user_scores')
      .upsert({
        user_id: userId,
        user_type: userType,
        score: Math.min(score, 100), // Cap à 100
        badges: badges,
        ...scoreDetails
      }, {
        onConflict: 'user_id'
      });

    if (upsertError) throw upsertError;

    console.log(`✅ Score calculé: ${score}/100, Badges: ${badges.join(', ')}`);

    return new Response(
      JSON.stringify({ 
        score,
        badges,
        details: scoreDetails
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Auto-scoring error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});

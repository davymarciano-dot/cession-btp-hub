import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from 'https://esm.sh/resend@2.0.0';
import { corsHeaders } from '../_shared/cors.ts';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

interface Seller {
  id: string;
  user_id: string | null;
  email: string;
  raison_sociale: string | null;
  departement: string;
  secteur_activite: string;
  prix_vente: number;
  nombre_salaries: number;
  ca_n1: number;
  certifications: any;
}

interface Buyer {
  id: string;
  email: string;
  departements: string[];
  secteurs: string[];
  ca_min: number;
  ca_max: number;
  effectif_min: number;
  effectif_max: number;
}

interface Match {
  seller: Seller;
  buyer: Buyer;
  score: number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🤖 Starting daily matching process...');

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch active sellers
    const { data: sellers, error: sellersError } = await supabaseClient
      .from('annonces')
      .select('id, user_id, email, raison_sociale, departement, secteur_activite, prix_vente, nombre_salaries, ca_n1, certifications')
      .eq('statut', 'publiee');

    if (sellersError) throw sellersError;

    // Fetch active buyers
    const { data: buyers, error: buyersError } = await supabaseClient
      .from('buyer_alerts')
      .select('id, email, departements, secteurs, ca_min, ca_max, effectif_min, effectif_max')
      .eq('active', true);

    if (buyersError) throw buyersError;

    if (!sellers || sellers.length === 0) {
      console.log('No active sellers found');
      return new Response(
        JSON.stringify({ success: true, matches: 0, message: 'No active sellers' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!buyers || buyers.length === 0) {
      console.log('No active buyers found');
      return new Response(
        JSON.stringify({ success: true, matches: 0, message: 'No active buyers' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${sellers.length} sellers and ${buyers.length} buyers`);

    const matches: Match[] = [];
    let emailsSent = 0;

    // Match sellers with buyers
    for (const seller of sellers) {
      if (!seller.raison_sociale || !seller.user_id) continue;

      const potentialBuyers = buyers.filter(buyer => {
        // Location match
        const locationMatch = buyer.departements && buyer.departements.includes(seller.departement);
        
        // Budget match (within 20% flexibility)
        const budgetMatch = seller.prix_vente >= (buyer.ca_min || 0) * 0.8 && 
                           seller.prix_vente <= (buyer.ca_max || 10000000) * 1.2;
        
        // Sector match
        const sectorMatch = buyer.secteurs && buyer.secteurs.includes(seller.secteur_activite);
        
        // Size match
        const sizeMatch = seller.nombre_salaries >= (buyer.effectif_min || 0) && 
                         seller.nombre_salaries <= (buyer.effectif_max || 100);
        
        // Must match at least location + one other criteria
        return locationMatch && (budgetMatch || sectorMatch || sizeMatch);
      });

      // Calculate scores and keep top 5
      const scoredMatches = potentialBuyers.map(buyer => {
        let score = 0;
        
        // Budget (40 points)
        const budgetRatio = (buyer.ca_max || 10000000) / seller.prix_vente;
        if (budgetRatio >= 1) score += 40;
        else if (budgetRatio >= 0.8) score += 30;
        
        // Location (30 points)
        if (buyer.departements.includes(seller.departement)) score += 30;
        
        // Sector (20 points)
        if (buyer.secteurs.includes(seller.secteur_activite)) score += 20;
        
        // RGE bonus (10 points)
        const hasRGE = seller.certifications && Array.isArray(seller.certifications) && 
                      seller.certifications.some((cert: string) => 
                        cert.toLowerCase().includes('quali') || cert.toLowerCase().includes('rge')
                      );
        if (hasRGE) score += 10;
        
        return { seller, buyer, score };
      }).sort((a, b) => b.score - a.score).slice(0, 5);

      matches.push(...scoredMatches);

      // Send email to seller if matches found
      if (scoredMatches.length > 0) {
        try {
          await resend.emails.send({
            from: 'CessionBTP <noreply@cessionbtp.fr>',
            to: [seller.email],
            subject: `🎯 ${scoredMatches.length} acheteur${scoredMatches.length > 1 ? 's' : ''} intéressé${scoredMatches.length > 1 ? 's' : ''} par votre entreprise`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2563eb;">Bonne nouvelle !</h2>
                <p>Notre algorithme de matching a trouvé ${scoredMatches.length} acheteur${scoredMatches.length > 1 ? 's' : ''} potentiel${scoredMatches.length > 1 ? 's' : ''} pour <strong>${seller.raison_sociale}</strong>.</p>
                
                <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
                  <h3>Top match (${scoredMatches[0].score}% de compatibilité) :</h3>
                  <ul style="list-style: none; padding: 0;">
                    <li>📍 Localisation : ${scoredMatches[0].buyer.departements.join(', ')}</li>
                    <li>💰 Budget : ${(scoredMatches[0].buyer.ca_min || 0).toLocaleString()}€ - ${(scoredMatches[0].buyer.ca_max || 0).toLocaleString()}€</li>
                    <li>🏢 Secteurs : ${scoredMatches[0].buyer.secteurs.join(', ')}</li>
                  </ul>
                </div>
                
                <a href="https://cessionbtp.fr/dashboard-vendeur" 
                   style="background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; margin: 20px 0;">
                  Voir tous les matchs
                </a>
                
                <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                  💡 Astuce : Les annonces boostées obtiennent 5x plus de contacts. 
                  <a href="https://cessionbtp.fr/tarifs" style="color: #2563eb;">Booster mon annonce</a>
                </p>
              </div>
            `,
          });
          emailsSent++;
        } catch (error) {
          console.error('Error sending email to seller:', error);
        }
      }

      // Send email to top buyers (score > 70)
      for (const match of scoredMatches.filter(m => m.score > 70)) {
        try {
          const hasRGE = seller.certifications && Array.isArray(seller.certifications) && 
                        seller.certifications.some((cert: string) => 
                          cert.toLowerCase().includes('quali') || cert.toLowerCase().includes('rge')
                        );

          await resend.emails.send({
            from: 'CessionBTP <noreply@cessionbtp.fr>',
            to: [match.buyer.email],
            subject: `🔥 Nouvelle entreprise ${seller.secteur_activite} dans le ${seller.departement}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #10b981;">Opportunité à saisir !</h2>
                <p>Une entreprise correspondant à ${match.score}% à vos critères vient d'être mise en vente.</p>
                
                <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
                  <h3 style="margin-top: 0;">${seller.raison_sociale}</h3>
                  <ul style="list-style: none; padding: 0;">
                    <li><strong>Secteur :</strong> ${seller.secteur_activite}</li>
                    <li><strong>Localisation :</strong> ${seller.departement}</li>
                    <li><strong>Prix :</strong> ${seller.prix_vente.toLocaleString()}€</li>
                    <li><strong>CA :</strong> ${seller.ca_n1.toLocaleString()}€</li>
                    <li><strong>Effectif :</strong> ${seller.nombre_salaries} salariés</li>
                    ${hasRGE ? '<li style="color: #10b981; font-weight: bold;">✅ Certifié RGE</li>' : ''}
                  </ul>
                </div>
                
                <a href="https://cessionbtp.fr/annonce/${seller.id}" 
                   style="background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; margin: 20px 0;">
                  Voir l'annonce complète
                </a>
                
                <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                  Cette entreprise correspond à vos critères de recherche. 
                  <a href="https://cessionbtp.fr/acheter/mes-alertes" style="color: #2563eb;">Gérer mes alertes</a>
                </p>
              </div>
            `,
          });
          emailsSent++;
        } catch (error) {
          console.error('Error sending email to buyer:', error);
        }
      }
    }

    console.log(`✅ Matching complete: ${matches.length} matches found, ${emailsSent} emails sent`);

    return new Response(
      JSON.stringify({
        success: true,
        matches: matches.length,
        emailsSent,
        sellers: sellers.length,
        buyers: buyers.length,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in daily-matching:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

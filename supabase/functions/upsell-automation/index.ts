import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendKey = Deno.env.get('RESEND_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);
    const resend = new Resend(resendKey);

    console.log('🚀 Starting upsell automation...');

    // 1. Annonces avec peu de vues (< 10 vues après 7 jours)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    
    const { data: lowViewListings, error: listingsError } = await supabase
      .from('annonces')
      .select('*')
      .eq('statut', 'publiee')
      .lt('nombre_vues', 10)
      .gte('created_at', sevenDaysAgo);

    if (listingsError) throw listingsError;

    console.log(`Found ${lowViewListings?.length || 0} low-view listings`);

    // Envoyer emails pour chaque annonce
    for (const listing of lowViewListings || []) {
      try {
        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'CessionBTP <notifications@cessionbtp.fr>',
          to: listing.email,
          subject: '🚀 Votre annonce mérite plus de visibilité',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0;">Boostez votre annonce !</h1>
              </div>
              
              <div style="padding: 30px; background: #f8f9fa;">
                <p>Bonjour ${listing.nom_prenom},</p>
                
                <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #e74c3c;">
                  <h2 style="color: #e74c3c; margin-top: 0;">⚠️ Votre annonce n'est pas assez visible</h2>
                  <p style="font-size: 18px;">Seulement <strong>${listing.nombre_vues || 0} vues</strong> en 7 jours</p>
                  <p style="color: #7f8c8d;">Moyenne du marché : <strong>47 vues</strong> par semaine</p>
                </div>
                
                <div style="background: linear-gradient(135deg, #27ae60 0%, #229954 100%); color: white; padding: 25px; border-radius: 10px; margin: 20px 0; text-align: center;">
                  <h3 style="margin-top: 0;">🎁 Offre exclusive : -30% sur le Boost</h3>
                  <p style="font-size: 32px; margin: 15px 0;">
                    <span style="text-decoration: line-through; opacity: 0.7; font-size: 24px;">49€</span> 
                    <strong> 34€</strong>
                  </p>
                  <p style="margin-bottom: 0;">Multipliez vos contacts par 5 !</p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://cessionbtp.fr/boost/${listing.id}?discount=30" 
                     style="background: #e74c3c; color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-size: 18px; font-weight: bold; display: inline-block; box-shadow: 0 4px 12px rgba(231,76,60,0.3);">
                    Booster maintenant →
                  </a>
                </div>
                
                <p style="text-align: center; color: #7f8c8d; font-size: 12px;">
                  ⏰ Offre valable 48h seulement
                </p>
              </div>
            </div>
          `
        });

        if (emailError) {
          console.error(`Error sending email to ${listing.email}:`, emailError);
          continue;
        }

        // Logger l'envoi
        await supabase.from('email_campaigns').insert({
          user_id: listing.user_id,
          campaign_type: 'boost_upsell',
          status: 'sent',
          sent_at: new Date().toISOString(),
          metadata: { listing_id: listing.id, message_id: emailData?.id || 'unknown' }
        });

        console.log(`✅ Upsell email sent to ${listing.email}`);
      } catch (error) {
        console.error(`Failed to process listing ${listing.id}:`, error);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: lowViewListings?.length || 0 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in upsell automation:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
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

    console.log('🛒 Starting cart recovery automation...');

    // Récupérer les paniers abandonnés non récupérés
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    
    const { data: abandonedCarts, error: cartsError } = await supabase
      .from('abandoned_carts')
      .select('*')
      .eq('recovered', false)
      .lte('created_at', oneHourAgo);

    if (cartsError) throw cartsError;

    console.log(`Found ${abandonedCarts?.length || 0} abandoned carts`);

    for (const cart of abandonedCarts || []) {
      const hoursSinceAbandoned = (Date.now() - new Date(cart.created_at).getTime()) / (1000 * 60 * 60);
      
      let discount = 0;
      let shouldSend = false;
      let subject = '';

      // Logique d'envoi progressif
      if (hoursSinceAbandoned >= 1 && hoursSinceAbandoned < 24 && cart.recovery_emails_sent === 0) {
        discount = 0;
        shouldSend = true;
        subject = '🛒 Vous avez oublié quelque chose';
      } else if (hoursSinceAbandoned >= 24 && hoursSinceAbandoned < 72 && cart.recovery_emails_sent === 1) {
        discount = 10;
        shouldSend = true;
        subject = '⏰ -10% valable 24h sur votre boost';
      } else if (hoursSinceAbandoned >= 72 && cart.recovery_emails_sent === 2) {
        discount = 20;
        shouldSend = true;
        subject = '🎁 Dernière chance : -20% pour booster votre annonce';
      }

      if (!shouldSend) continue;

      try {
        const finalPrice = Math.round(Number(cart.price) * (1 - discount / 100));
        
        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'CessionBTP <support@cessionbtp.fr>',
          to: cart.user_id, // Assuming user_id contains email, adjust if needed
          subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="padding: 30px; background: #fff;">
                <h2 style="color: #2c3e50;">Finalisez votre achat</h2>
                <p style="color: #7f8c8d; font-size: 16px;">Vous étiez à 1 clic de booster votre annonce !</p>
                
                ${discount > 0 ? `
                  <div style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%); padding: 20px; border-radius: 10px; margin: 25px 0; color: white;">
                    <h3 style="margin-top: 0; font-size: 24px;">🎁 Réduction exclusive : -${discount}%</h3>
                    <p style="font-size: 18px; margin-bottom: 0;">Valable uniquement pendant 24h</p>
                  </div>
                ` : ''}
                
                <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin: 25px 0;">
                  <h3 style="color: #2c3e50; margin-top: 0;">${cart.product_type}</h3>
                  <div style="display: flex; align-items: baseline; gap: 10px;">
                    <p style="font-size: 36px; color: #27ae60; font-weight: bold; margin: 0;">
                      ${finalPrice}€
                    </p>
                    ${discount > 0 ? `
                      <span style="color: #95a5a6; font-size: 20px; text-decoration: line-through;">
                        ${cart.price}€
                      </span>
                    ` : ''}
                  </div>
                  ${discount > 0 ? `
                    <p style="color: #27ae60; font-size: 18px; margin-top: 10px;">
                      💰 Vous économisez ${Math.round(Number(cart.price) - finalPrice)}€
                    </p>
                  ` : ''}
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://cessionbtp.fr/checkout/recover/${cart.id}?discount=${discount}" 
                     style="background: #27ae60; color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-size: 18px; font-weight: bold; display: inline-block; box-shadow: 0 4px 12px rgba(39,174,96,0.3);">
                    Finaliser mon achat →
                  </a>
                </div>
                
                <p style="text-align: center; color: #95a5a6; font-size: 12px;">
                  Cette offre expire dans ${discount === 20 ? '24h' : discount === 10 ? '48h' : '72h'}
                </p>
              </div>
            </div>
          `
        });

        if (emailError) {
          console.error(`Error sending recovery email:`, emailError);
          continue;
        }

        // Mettre à jour le compteur d'emails
        await supabase
          .from('abandoned_carts')
          .update({ recovery_emails_sent: cart.recovery_emails_sent + 1 })
          .eq('id', cart.id);

        // Logger l'envoi
        await supabase.from('email_campaigns').insert({
          user_id: cart.user_id,
          campaign_type: 'cart_recovery',
          status: 'sent',
          sent_at: new Date().toISOString(),
          metadata: { cart_id: cart.id, discount, message_id: emailData?.id || 'unknown' }
        });

        console.log(`✅ Recovery email sent for cart ${cart.id} with ${discount}% discount`);
      } catch (error) {
        console.error(`Failed to process cart ${cart.id}:`, error);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: abandonedCarts?.length || 0 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in cart recovery:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
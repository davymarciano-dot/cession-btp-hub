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

    const { action, userId, email, referralCode, newUserId } = await req.json();

    console.log(`Processing referral action: ${action}`);

    if (action === 'create_code') {
      // Générer un code unique
      const code = 'CESS' + userId.substring(0, 8).toUpperCase();
      
      // Créer ou mettre à jour le referral
      const { data, error } = await supabase
        .from('referrals')
        .upsert({
          referrer_id: userId,
          referral_code: code,
        }, {
          onConflict: 'referrer_id'
        })
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({ 
          success: true, 
          referralCode: code,
          referralLink: `https://cessionbtp.fr?ref=${code}`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'send_invite') {
      // Récupérer les infos du parrain
      const { data: referral, error: referralError } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', userId)
        .single();

      if (referralError) throw referralError;

      // Envoyer l'email d'invitation
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'CessionBTP <parrainage@cessionbtp.fr>',
        to: email,
        subject: 'Vous avez été invité à rejoindre CessionBTP - 50% de réduction !',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0;">🎉 Vous êtes invité !</h1>
            </div>
            
            <div style="padding: 30px; background: #fff;">
              <p style="font-size: 18px; color: #2c3e50;">Un ami vous recommande CessionBTP</p>
              
              <div style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%); padding: 25px; border-radius: 10px; margin: 25px 0; color: white; text-align: center;">
                <h2 style="margin-top: 0; font-size: 28px;">🎁 50% de réduction</h2>
                <p style="font-size: 16px; margin-bottom: 20px;">sur votre première annonce</p>
                
                <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="color: #7f8c8d; margin: 0; font-size: 14px;">Votre code promo :</p>
                  <p style="color: #2c3e50; font-size: 36px; font-weight: bold; margin: 10px 0; letter-spacing: 2px;">
                    ${referral.referral_code}
                  </p>
                </div>
              </div>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 25px 0;">
                <h3 style="color: #2c3e50; margin-top: 0;">✨ Pourquoi CessionBTP ?</h3>
                <ul style="color: #7f8c8d; line-height: 1.8;">
                  <li>🎯 Matching automatique acheteurs/vendeurs</li>
                  <li>💰 Commission uniquement à la vente</li>
                  <li>📊 Tableau de bord complet</li>
                  <li>🤖 Estimation IA instantanée</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://cessionbtp.fr?ref=${referral.referral_code}" 
                   style="background: #3498db; color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; font-size: 18px; font-weight: bold; display: inline-block; box-shadow: 0 4px 12px rgba(52,152,219,0.3);">
                  Créer mon compte →
                </a>
              </div>
              
              <p style="text-align: center; color: #95a5a6; font-size: 12px;">
                Offre valable pour les nouveaux utilisateurs uniquement
              </p>
            </div>
          </div>
        `
      });

      if (emailError) throw emailError;

      // Logger l'invitation
      await supabase
        .from('referrals')
        .update({ referred_email: email })
        .eq('id', referral.id);

      return new Response(
        JSON.stringify({ success: true, invited: email }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'process_referral') {
      // Récupérer le referral par code
      const { data: referral, error: referralError } = await supabase
        .from('referrals')
        .select('*')
        .eq('referral_code', referralCode)
        .single();

      if (referralError || !referral) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid referral code' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Mettre à jour le referral
      await supabase
        .from('referrals')
        .update({
          referred_id: newUserId,
          status: 'active'
        })
        .eq('id', referral.id);

      // Créer un événement de revenue pour le parrain (50€)
      await supabase.from('revenue_events').insert({
        user_id: referral.referrer_id,
        event_type: 'referral_bonus',
        amount: 5000, // 50€ en centimes
        source: 'referral',
        metadata: { referred_id: newUserId, referral_code: referralCode }
      });

      // Mettre à jour le total de commission
      await supabase
        .from('referrals')
        .update({ 
          commission_earned: (Number(referral.commission_earned) || 0) + 5000 
        })
        .eq('id', referral.id);

      return new Response(
        JSON.stringify({ success: true, bonus: 5000 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in referral system:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
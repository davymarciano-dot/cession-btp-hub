import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
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

    const { data: { user } } = await supabaseClient.auth.getUser();
    const { method, criteria, alertId } = await req.json();

    console.log('Managing alert:', { method, user: user?.id, criteria, alertId });

    switch (method) {
      case 'CREATE': {
        const { data, error } = await supabaseClient
          .from('buyer_alerts')
          .insert({
            user_id: user?.id || null,
            email: user?.email || criteria.email,
            secteurs: criteria.sectors || [],
            departements: criteria.departments || [],
            ca_min: criteria.minRevenue || 0,
            ca_max: criteria.maxRevenue || 10000000,
            effectif_min: criteria.minEmployees || 0,
            effectif_max: criteria.maxEmployees || 100,
            active: true,
          })
          .select()
          .single();

        if (error) throw error;

        console.log('Alert created:', data);
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'LIST': {
        let query = supabaseClient
          .from('buyer_alerts')
          .select('*')
          .eq('active', true)
          .order('created_at', { ascending: false });

        if (user) {
          query = query.eq('user_id', user.id);
        } else if (criteria?.email) {
          query = query.eq('email', criteria.email);
        }

        const { data, error } = await query;
        if (error) throw error;

        console.log('Alerts fetched:', data?.length);
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'DELETE': {
        const { error } = await supabaseClient
          .from('buyer_alerts')
          .delete()
          .eq('id', alertId);

        if (error) throw error;

        console.log('Alert deleted:', alertId);
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'UPDATE': {
        const { error } = await supabaseClient
          .from('buyer_alerts')
          .update({ active: criteria.active })
          .eq('id', alertId);

        if (error) throw error;

        console.log('Alert updated:', alertId);
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        throw new Error('Invalid method');
    }
  } catch (error) {
    console.error('Error managing alert:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
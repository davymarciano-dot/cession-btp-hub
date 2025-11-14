import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('🤖 Running revenue automation orchestrator...');

    // Invoquer les différentes fonctions d'automatisation
    const results = await Promise.allSettled([
      // Upsell automation
      supabase.functions.invoke('upsell-automation'),
      // Cart recovery
      supabase.functions.invoke('cart-recovery'),
    ]);

    const processedResults = results.map((result, index) => {
      const functionName = ['upsell-automation', 'cart-recovery'][index];
      if (result.status === 'fulfilled') {
        console.log(`✅ ${functionName} completed successfully`);
        return { function: functionName, status: 'success', data: result.value };
      } else {
        console.error(`❌ ${functionName} failed:`, result.reason);
        return { function: functionName, status: 'error', error: result.reason };
      }
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        timestamp: new Date().toISOString(),
        results: processedResults
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in revenue automation orchestrator:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
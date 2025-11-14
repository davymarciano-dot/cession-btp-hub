import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🧪 Test cart recovery lancé...');
    
    const { test_mode } = await req.json();
    
    // Simuler le processus de récupération
    const result = {
      success: true,
      test_mode,
      abandonedCarts: 23,
      emailsSent: 23,
      cartsRecovered: 5,
      recoveryRate: 21.7,
      revenueRecovered: 345,
      timestamp: new Date().toISOString()
    };
    
    console.log('✅ Test cart recovery terminé:', result);
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Erreur test cart recovery:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

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
    console.log('🧪 Test upsell emails lancé...');
    
    const { test_mode } = await req.json();
    
    // Simuler le processus d'upsell
    const result = {
      success: true,
      test_mode,
      listingsAnalyzed: 45,
      lowViewListings: 12,
      emailsSent: 12,
      expectedRevenue: 588, // 49€ * 12
      timestamp: new Date().toISOString()
    };
    
    console.log('✅ Test upsell terminé:', result);
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Erreur test upsell:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

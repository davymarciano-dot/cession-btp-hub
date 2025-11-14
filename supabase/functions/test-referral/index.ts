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
    console.log('🧪 Test referral system lancé...');
    
    const { test_mode } = await req.json();
    
    // Simuler le système de parrainage
    const result = {
      success: true,
      test_mode,
      activeReferrals: 45,
      pendingCommissions: 12,
      completedCommissions: 33,
      totalCommissionsEarned: 1650, // 50€ * 33
      pendingValue: 600, // 50€ * 12
      conversionRate: 42,
      avgReferralsPerUser: 2.3,
      timestamp: new Date().toISOString()
    };
    
    console.log('✅ Test referral terminé:', result);
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Erreur test referral:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

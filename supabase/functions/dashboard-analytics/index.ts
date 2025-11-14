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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(req.url);
    const listingId = url.searchParams.get('listingId');
    const period = url.searchParams.get('period') || '7d';

    if (!listingId) {
      return new Response(JSON.stringify({ error: 'Missing listingId' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Vérifier la propriété de l'annonce
    const { data: listing } = await supabase
      .from('annonces')
      .select('user_id')
      .eq('id', listingId)
      .single();

    if (!listing || listing.user_id !== user.id) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Récupérer les métriques via RPC
    const { data: metrics } = await supabase.rpc('calculate_listing_metrics', {
      p_listing_id: listingId,
      p_period: period
    });

    // Calculer la date de début selon la période
    const periodStart = getPeriodStart(period);

    // Récupérer toutes les données en parallèle
    const [performance, visitors, sources, competition] = await Promise.all([
      supabase
        .from('listing_performance')
        .select('*')
        .eq('listing_id', listingId)
        .gte('date', periodStart)
        .order('date', { ascending: true }),
      
      supabase
        .from('visitor_analytics')
        .select('*')
        .eq('listing_id', listingId)
        .gte('created_at', periodStart),
      
      supabase
        .from('traffic_sources')
        .select('*')
        .eq('listing_id', listingId)
        .gte('date', periodStart),
      
      supabase
        .from('competition_analysis')
        .select('*')
        .eq('listing_id', listingId)
        .gte('date', periodStart)
        .limit(5)
    ]);

    // Analyser les visiteurs
    const visitorAnalysis = analyzeVisitors(visitors.data || []);
    const trafficAnalysis = analyzeTraffic(sources.data || []);

    return new Response(
      JSON.stringify({
        metrics: metrics?.[0] || {},
        performance: performance.data || [],
        visitors: visitorAnalysis,
        traffic: trafficAnalysis,
        competition: competition.data || []
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Analytics error:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function getPeriodStart(period: string): string {
  const now = new Date();
  let daysAgo = 7;
  
  switch (period) {
    case '24h':
      daysAgo = 1;
      break;
    case '7d':
      daysAgo = 7;
      break;
    case '30d':
      daysAgo = 30;
      break;
    case '90d':
      daysAgo = 90;
      break;
  }
  
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return date.toISOString();
}

function analyzeVisitors(visitors: any[]) {
  if (!visitors || visitors.length === 0) return { total: 0, types: [], sources: [], topLocations: [] };
  
  const types: Record<string, number> = {};
  const sources: Record<string, number> = {};
  const locations: Record<string, number> = {};
  
  visitors.forEach(v => {
    if (v.visitor_type) types[v.visitor_type] = (types[v.visitor_type] || 0) + 1;
    if (v.source) sources[v.source] = (sources[v.source] || 0) + 1;
    if (v.location_city && v.location_country) {
      const loc = `${v.location_city}, ${v.location_country}`;
      locations[loc] = (locations[loc] || 0) + 1;
    }
  });
  
  return {
    total: visitors.length,
    types: Object.entries(types).map(([name, value]) => ({ name, value })),
    sources: Object.entries(sources).map(([name, value]) => ({ name, value })),
    topLocations: Object.entries(locations)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([city, count]) => ({ city, count }))
  };
}

function analyzeTraffic(sources: any[]) {
  if (!sources || sources.length === 0) return [];
  
  const grouped: Record<string, { visits: number; conversions: number }> = {};
  
  sources.forEach(s => {
    if (!grouped[s.source]) {
      grouped[s.source] = { visits: 0, conversions: 0 };
    }
    grouped[s.source].visits += s.visits || 0;
    grouped[s.source].conversions += s.conversions || 0;
  });
  
  return Object.entries(grouped).map(([source, data]) => ({
    source,
    ...data,
    conversionRate: data.visits > 0 ? ((data.conversions / data.visits) * 100).toFixed(2) : '0'
  }));
}

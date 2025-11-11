import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[VERIFY-PAYMENT] Function started");

    const { session_id } = await req.json();
    console.log("[VERIFY-PAYMENT] Session ID:", session_id);

    if (!session_id) {
      throw new Error("session_id is required");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log("[VERIFY-PAYMENT] Session retrieved", { 
      status: session.payment_status,
      amount: session.amount_total 
    });

    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({ 
        paid: false,
        status: session.payment_status 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Payment successful - create the annonce
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get annonce data from metadata
    const annonceDataStr = session.metadata?.annonce_data;
    if (!annonceDataStr) {
      throw new Error("No annonce data in session metadata");
    }

    const annonceData = JSON.parse(annonceDataStr);
    console.log("[VERIFY-PAYMENT] Creating annonce for user", { user_id: session.metadata?.user_id });

    // Insert annonce into database
    const { data, error } = await supabaseClient
      .from('annonces')
      .insert(annonceData)
      .select()
      .single();

    if (error) {
      console.error("[VERIFY-PAYMENT] Database error:", error);
      throw error;
    }

    console.log("[VERIFY-PAYMENT] Annonce created successfully", { annonce_id: data.id });

    return new Response(JSON.stringify({ 
      paid: true,
      annonce_id: data.id,
      annonce: data
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("[VERIFY-PAYMENT] Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
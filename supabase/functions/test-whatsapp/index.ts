import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, message } = await req.json();

    const endpoint = Deno.env.get('WHATSAPP_API_ENDPOINT');
    const token = Deno.env.get('WHATSAPP_API_TOKEN');

    if (!endpoint || !token) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'WhatsApp credentials not configured. Please add WHATSAPP_API_ENDPOINT and WHATSAPP_API_TOKEN to your secrets.' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Sending WhatsApp message to:', to);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: to.replace('+', ''),
        type: 'text',
        text: {
          body: message || 'Test WhatsApp depuis CessionBTP 🚀'
        }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('WhatsApp error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data.error?.message || 'Failed to send WhatsApp message' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('WhatsApp message sent successfully:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: data.messages?.[0]?.id,
        status: 'sent'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('WhatsApp test error:', error);
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

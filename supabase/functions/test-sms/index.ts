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

    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const fromNumber = Deno.env.get('TWILIO_PHONE_NUMBER');

    if (!accountSid || !authToken || !fromNumber) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Twilio credentials not configured. Please add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER to your secrets.' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Sending SMS to:', to);
    
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: to,
          From: fromNumber,
          Body: message || 'Test SMS depuis CessionBTP 🚀',
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Twilio error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data.message || 'Failed to send SMS' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('SMS sent successfully:', data.sid);

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: data.sid,
        status: data.status,
        to: data.to,
        from: data.from
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('SMS test error:', error);
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

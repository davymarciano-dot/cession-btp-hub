import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AlertData {
  userId: string;
  type: string;
  title: string;
  message: string;
  actionUrl?: string;
  data?: any;
}

// Input validation schema
const alertSchema = z.object({
  userId: z.string().uuid("Invalid user ID format"),
  type: z.string().min(1).max(50),
  title: z.string().min(1).max(200, "Title must be less than 200 characters"),
  message: z.string().min(1).max(1000, "Message must be less than 1000 characters"),
  actionUrl: z.string().url("Invalid URL format").optional(),
  data: z.any().optional()
});

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

    const body = await req.json();
    
    // Validate input
    const validationResult = alertSchema.safeParse(body);
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error);
      return new Response(
        JSON.stringify({ error: "Invalid input data", details: validationResult.error.issues }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const alertData: AlertData = validationResult.data;
    const { userId, type, title, message, actionUrl, data } = alertData;

    // Récupérer les préférences de l'utilisateur
    const { data: preferences, error: prefError } = await supabase
      .from('alert_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (prefError || !preferences) {
      console.log('No alert preferences found for user:', userId);
      return new Response(
        JSON.stringify({ error: 'No preferences found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Vérifier les heures silencieuses
    if (isQuietHours(preferences.preferences?.quietHours)) {
      console.log('Alert delayed: quiet hours');
      await scheduleForLater(supabase, userId, alertData, preferences);
      return new Response(
        JSON.stringify({ success: true, status: 'scheduled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const results: Record<string, any> = {};
    const channels = preferences.preferences?.channels || {};

    // Récupérer l'email de l'utilisateur
    const { data: userData } = await supabase.auth.admin.getUserById(userId);
    const userEmail = userData?.user?.email;

    // Envoi Email
    if (channels.email && userEmail) {
      results.email = await sendEmail(userEmail, title, message, actionUrl);
    }

    // Envoi SMS
    if (channels.sms && preferences.phone_number) {
      results.sms = await sendSMS(preferences.phone_number, title, message, actionUrl);
    }

    // Envoi WhatsApp
    if (channels.whatsapp && preferences.whatsapp_number) {
      results.whatsapp = await sendWhatsApp(preferences.whatsapp_number, title, message);
    }

    // Envoi Push (enregistrement seulement, le push réel se fait côté client)
    if (channels.push && preferences.push_subscription) {
      results.push = { success: true, note: 'Push notification queued' };
    }

    // Enregistrer les alertes envoyées
    await logAlerts(supabase, userId, type, title, message, data, results);

    return new Response(
      JSON.stringify({ success: true, results }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Alert system error:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function sendEmail(to: string, title: string, message: string, actionUrl?: string) {
  try {
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${title}</h1>
            </div>
            <div class="content">
              <p>${message}</p>
              ${actionUrl ? `<a href="${actionUrl}" class="button">Voir les détails</a>` : ''}
            </div>
          </div>
        </body>
      </html>
    `;

    const response = await resend.emails.send({
      from: 'CessionBTP <notifications@cessionbtp.fr>',
      to: [to],
      subject: title,
      html: emailHtml,
    });

    return { success: true, messageId: response.data?.id };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: (error as Error).message };
  }
}

async function sendSMS(to: string, title: string, message: string, actionUrl?: string) {
  try {
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const fromNumber = Deno.env.get('TWILIO_PHONE_NUMBER');

    if (!accountSid || !authToken || !fromNumber) {
      return { success: false, error: 'Twilio credentials not configured' };
    }

    const smsBody = `${title}\n${message}${actionUrl ? `\n${actionUrl}` : ''}`;
    
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
          Body: smsBody,
        }),
      }
    );

    const data = await response.json();
    return { success: response.ok, messageId: data.sid };
  } catch (error) {
    console.error('SMS error:', error);
    return { success: false, error: (error as Error).message };
  }
}

async function sendWhatsApp(to: string, title: string, message: string) {
  try {
    const endpoint = Deno.env.get('WHATSAPP_API_ENDPOINT');
    const token = Deno.env.get('WHATSAPP_API_TOKEN');

    if (!endpoint || !token) {
      return { success: false, error: 'WhatsApp credentials not configured' };
    }

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
          body: `${title}\n\n${message}`
        }
      }),
    });

    return { success: response.ok };
  } catch (error) {
    console.error('WhatsApp error:', error);
    return { success: false, error: (error as Error).message };
  }
}

function isQuietHours(quietHours: any): boolean {
  if (!quietHours?.enabled) return false;
  
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const [startHour, startMin] = quietHours.start.split(':').map(Number);
  const [endHour, endMin] = quietHours.end.split(':').map(Number);
  
  const startTime = startHour * 60 + startMin;
  const endTime = endHour * 60 + endMin;
  
  if (startTime < endTime) {
    return currentTime >= startTime && currentTime < endTime;
  } else {
    return currentTime >= startTime || currentTime < endTime;
  }
}

async function scheduleForLater(supabase: any, userId: string, alert: AlertData, preferences: any) {
  const quietHours = preferences.preferences?.quietHours;
  const [endHour, endMin] = quietHours.end.split(':').map(Number);
  
  const scheduledTime = new Date();
  scheduledTime.setHours(endHour, endMin, 0, 0);
  
  if (scheduledTime < new Date()) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }
  
  // Note: Cette table doit être créée dans une migration future
  console.log('Alert scheduled for:', scheduledTime);
}

async function logAlerts(
  supabase: any,
  userId: string,
  alertType: string,
  title: string,
  message: string,
  data: any,
  results: Record<string, any>
) {
  for (const [channel, result] of Object.entries(results)) {
    await supabase.from('sent_alerts').insert({
      user_id: userId,
      alert_type: alertType,
      channel: channel,
      title: title,
      message: message,
      data: data,
      status: result.success ? 'sent' : 'failed',
      sent_at: new Date().toISOString()
    });
  }
}

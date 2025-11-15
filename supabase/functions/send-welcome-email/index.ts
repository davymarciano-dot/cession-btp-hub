import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  name: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name }: WelcomeEmailRequest = await req.json();

    if (!email || !name) {
      throw new Error("Email and name are required");
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "CessionBTP <onboarding@resend.dev>",
        to: [email],
        subject: "Bienvenue sur CessionBTP ! 🏗️",
        html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .button {
                display: inline-block;
                background: #667eea;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
              }
              .features {
                background: white;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
              }
              .feature-item {
                margin: 10px 0;
                padding-left: 25px;
                position: relative;
              }
              .feature-item:before {
                content: "✓";
                position: absolute;
                left: 0;
                color: #667eea;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🏗️ Bienvenue sur CessionBTP !</h1>
            </div>
            <div class="content">
              <h2>Bonjour ${name},</h2>
              <p>Merci de votre inscription sur <strong>CessionBTP</strong>, la plateforme leader de transmission d'entreprises du BTP.</p>
              
              <div class="features">
                <h3>Ce que vous pouvez faire dès maintenant :</h3>
                <div class="feature-item">Parcourir plus de 500 entreprises à vendre</div>
                <div class="feature-item">Obtenir une évaluation gratuite de votre entreprise</div>
                <div class="feature-item">Configurer vos alertes personnalisées</div>
                <div class="feature-item">Contacter directement les vendeurs/acheteurs</div>
              </div>

              <center>
                <a href="${Deno.env.get("VITE_SUPABASE_URL")}" class="button">
                  Accéder à mon compte
                </a>
              </center>

              <p style="margin-top: 30px;">
                <strong>Besoin d'aide ?</strong><br>
                Notre équipe est à votre disposition pour vous accompagner dans votre projet.
              </p>

              <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
                Vous recevez cet email car vous vous êtes inscrit sur CessionBTP.fr<br>
                <a href="#">Se désinscrire</a>
              </p>
            </div>
          </body>
        </html>
      `,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      throw new Error(`Resend API error: ${error}`);
    }

    const result = await emailResponse.json();
    console.log("Welcome email sent successfully:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

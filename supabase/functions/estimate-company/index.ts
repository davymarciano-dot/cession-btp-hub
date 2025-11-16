import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { checkRateLimit, getClientIP } from "../_shared/rateLimit.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const estimateSchema = z.object({
  ca: z.number().positive().max(100000000, "CA must be less than 100M€"),
  secteur: z.string().min(1).max(100).regex(/^[a-zA-Z0-9\s\-éèêëàâäôöùûüçîï]+$/, "Invalid sector format"),
  departement: z.string().regex(/^[0-9]{2,3}$/, "Invalid department format")
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting: 10 requests per minute per IP
    const clientIP = getClientIP(req);
    const rateLimitCheck = checkRateLimit(clientIP, { windowMs: 60000, maxRequests: 10 });
    
    if (rateLimitCheck.limited) {
      return new Response(
        JSON.stringify({ 
          error: "Trop de demandes. Veuillez réessayer dans quelques instants.",
          retryAfter: rateLimitCheck.retryAfter 
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": String(rateLimitCheck.retryAfter)
          } 
        }
      );
    }
    
    const body = await req.json();
    
    // Validate input
    const validationResult = estimateSchema.safeParse(body);
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error);
      return new Response(
        JSON.stringify({ error: "Invalid input data", details: validationResult.error.issues }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { ca, secteur, departement } = validationResult.data;
    
    // Sanitized logging - only metadata, no sensitive values
    console.log("Estimation request received");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Construire le prompt pour l'IA
    const systemPrompt = `Tu es un expert en valorisation d'entreprises BTP avec 20 ans d'expérience. 
Tu dois fournir une estimation détaillée et professionnelle basée sur les données fournies.

Utilise les multiples de valorisation standards du secteur BTP :
- Très petites entreprises (CA < 500K€) : 0.3 à 0.5x le CA
- Petites entreprises (CA 500K-2M€) : 0.5 à 0.8x le CA
- Moyennes entreprises (CA 2M-5M€) : 0.8 à 1.2x le CA
- Grandes entreprises (CA > 5M€) : 1 à 1.5x le CA

Ajuste selon :
- Le secteur (spécialités techniques valorisées +20%)
- La localisation (grandes villes +15%, zones rurales -10%)
- Les certifications potentielles (RGE, Qualibat : +10-15%)

Format de réponse JSON STRICT :
{
  "estimation_basse": nombre,
  "estimation_haute": nombre,
  "estimation_moyenne": nombre,
  "multiple_valorisation": nombre,
  "analyse_detaillee": "Texte détaillé en français",
  "points_forts": ["point 1", "point 2", "point 3"],
  "recommandations": ["reco 1", "reco 2", "reco 3"]
}`;

    const userPrompt = `Donne-moi une estimation de valorisation pour cette entreprise BTP :
- Chiffre d'affaires annuel : ${ca}€
- Secteur d'activité : ${secteur}
- Département : ${departement}

Fournis une estimation professionnelle et détaillée au format JSON strict demandé.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Trop de demandes, veuillez réessayer dans quelques instants." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(
          JSON.stringify({ error: "Service temporairement indisponible. Veuillez réessayer plus tard." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Erreur lors de la génération de l'estimation");
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;
    
    console.log("AI Response:", aiResponse);

    if (!aiResponse) {
      throw new Error("Réponse invalide de l'IA");
    }

    // Extraire le JSON de la réponse
    let estimation;
    try {
      // Chercher le JSON dans la réponse (au cas où il y a du texte autour)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        estimation = JSON.parse(jsonMatch[0]);
      } else {
        estimation = JSON.parse(aiResponse);
      }
    } catch (parseError) {
      console.error("JSON parsing error:", parseError, "Response:", aiResponse);
      
      // Fallback : créer une estimation basique si l'IA ne retourne pas du JSON valide
      const caNum = ca;
      const multiple = caNum < 500000 ? 0.4 : caNum < 2000000 ? 0.65 : caNum < 5000000 ? 1.0 : 1.25;
      
      estimation = {
        estimation_basse: Math.round(caNum * multiple * 0.8),
        estimation_haute: Math.round(caNum * multiple * 1.2),
        estimation_moyenne: Math.round(caNum * multiple),
        multiple_valorisation: multiple,
        analyse_detaillee: `Estimation basée sur un chiffre d'affaires de ${ca}€ dans le secteur ${secteur}. Le multiple de valorisation appliqué est de ${multiple}x le CA, ce qui est standard pour ce type d'entreprise BTP dans le département ${departement}.`,
        points_forts: [
          "Entreprise dans un secteur porteur",
          "Positionnement géographique intéressant",
          "Potentiel de développement"
        ],
        recommandations: [
          "Optimiser la présentation des données financières",
          "Mettre en avant les certifications",
          "Préparer un dossier complet pour les repreneurs"
        ]
      };
    }

    return new Response(JSON.stringify(estimation), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Estimation error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Erreur lors de l'estimation" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

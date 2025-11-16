import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { checkRateLimit, getClientIP } from "../_shared/rateLimit.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Input validation schema
const chatbotSchema = z.object({
  message: z.string().min(1).max(5000, "Message must be less than 5000 characters"),
  sessionId: z.string().uuid("Invalid session ID format"),
  userId: z.string().uuid("Invalid user ID format").optional()
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting: 20 requests per minute per IP for chatbot
    const clientIP = getClientIP(req);
    const rateLimitCheck = checkRateLimit(clientIP, { windowMs: 60000, maxRequests: 20 });
    
    if (rateLimitCheck.limited) {
      return new Response(
        JSON.stringify({ 
          error: "Trop de messages. Attendez quelques secondes.",
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
    const validationResult = chatbotSchema.safeParse(body);
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error);
      return new Response(
        JSON.stringify({ error: "Invalid input data", details: validationResult.error.issues }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { message, sessionId, userId } = validationResult.data;
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Détecter l'intention du message
    const intent = detectIntent(message);
    // Sanitized logging - intent only, no message content
    console.log("Intent detected:", intent);

    // Construire le système prompt contextuel
    const systemPrompt = buildSystemPrompt(intent);

    // Appel à Lovable AI
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI error:", response.status, errorText);
      throw new Error(`Lovable AI error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const botMessage = aiResponse.choices[0]?.message?.content || "Désolé, je n'ai pas pu traiter votre demande.";

    // Store interaction log (messages stored in DB only, not console)
    await supabase.from('chatbot_logs').insert({
      user_id: userId || null,
      session_id: sessionId,
      intent,
      message, // Stored securely in DB, not logged to console
      response: botMessage,
      action_taken: getActionForIntent(intent)
    });

    return new Response(
      JSON.stringify({ 
        message: botMessage,
        intent,
        action: getActionForIntent(intent),
        quickReplies: getQuickReplies(intent)
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Chatbot error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});

function detectIntent(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  const intents = {
    'vendre': ['vendre', 'céder', 'vente', 'estimation', 'valorisation', 'prix'],
    'acheter': ['acheter', 'reprendre', 'cherche', 'acquisition', 'reprise'],
    'prix': ['combien', 'coute', 'tarif', 'valeur', 'prix'],
    'rge': ['rge', 'qualibat', 'certification', 'qualipac', 'qualipv'],
    'financement': ['financement', 'prêt', 'banque', 'crédit', 'apport'],
    'urgent': ['urgent', 'vite', 'rapidement', 'maintenant'],
    'info': ['comment', 'pourquoi', 'quand', 'quoi']
  };

  for (const [intent, keywords] of Object.entries(intents)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      return intent;
    }
  }

  return 'general';
}

function buildSystemPrompt(intent: string): string {
  const basePrompt = `Tu es un expert en cession d'entreprises BTP chez CessionBTP.fr. 
Tu es amical, professionnel et tu donnes des réponses concises (max 3 phrases).
Tu utilises des émojis de manière appropriée. Tu tutoyez l'utilisateur.`;

  const intentPrompts: Record<string, string> = {
    'vendre': `${basePrompt}
L'utilisateur veut vendre son entreprise BTP. Guide-le vers l'estimation gratuite.
Demande son secteur d'activité et encourage-le à remplir le formulaire.
Mentionne que la vente prend en moyenne 45 jours et que les frais sont de 2% au succès.`,

    'acheter': `${basePrompt}
L'utilisateur cherche à reprendre une entreprise BTP. Aide-le à définir ses critères.
Demande quel type d'entreprise il cherche, dans quelle région, et son budget.
Mentionne qu'on a 500+ entreprises disponibles.`,

    'rge': `${basePrompt}
L'utilisateur s'intéresse aux entreprises RGE/certifiées.
Explique que les entreprises RGE se vendent 30% plus cher car elles accèdent aux aides d'État.
Mentionne qu'on a 47 entreprises RGE disponibles (pompes à chaleur, photovoltaïque, etc).`,

    'prix': `${basePrompt}
L'utilisateur se renseigne sur les prix.
Explique que le prix moyen = 0.5x à 1.2x le CA selon le secteur et les certifications.
Les entreprises RGE sont valorisées 0.8x à 1.2x le CA.
Propose l'estimation gratuite.`,

    'financement': `${basePrompt}
L'utilisateur se renseigne sur le financement.
Explique : apport 20-30%, banque 60-70%, crédit vendeur possible 20%.
BPI France garantit jusqu'à 70% du prêt.
Propose de le mettre en relation avec un courtier.`,

    'urgent': `${basePrompt}
L'utilisateur est pressé.
Rassure-le : délai moyen 45 jours, estimation en 48h.
Les dossiers complets se vendent 2x plus vite.
Encourage-le à commencer maintenant.`,

    'general': basePrompt
  };

  return intentPrompts[intent] || basePrompt;
}

function getActionForIntent(intent: string): string {
  const actions: Record<string, string> = {
    'vendre': 'navigate:/vendre',
    'acheter': 'navigate:/acheter',
    'prix': 'show:calculator',
    'rge': 'navigate:/entreprise-rge-a-vendre',
    'financement': 'show:financing',
    'urgent': 'navigate:/vendre'
  };

  return actions[intent] || 'none';
}

function getQuickReplies(intent: string): string[] {
  const replies: Record<string, string[]> = {
    'vendre': [
      'Estimation gratuite',
      'Combien de temps ?',
      'Quels documents ?'
    ],
    'acheter': [
      'Voir les annonces RGE',
      'Budget nécessaire ?',
      'Comment financer ?'
    ],
    'prix': [
      'Estimation gratuite',
      'Prix moyens par secteur',
      'Facteurs de valorisation'
    ],
    'rge': [
      'Entreprises PAC',
      'Entreprises photovoltaïque',
      'Pourquoi RGE ?'
    ],
    'financement': [
      'Simuler mon financement',
      'Crédit vendeur ?',
      'Garantie BPI ?'
    ],
    'general': [
      'Je veux vendre',
      'Je cherche à reprendre',
      'Estimation gratuite'
    ]
  };

  return replies[intent] || replies['general'];
}

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.json();
    console.log("Received estimation request:", formData);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Construire le prompt pour l'IA avec toutes les nouvelles données
    const prompt = `Tu es un expert en valorisation d'entreprises BTP. Analyse les données suivantes et fournis une estimation détaillée de la valeur de l'entreprise.

DONNÉES DE L'ENTREPRISE:
- Secteur: ${formData.secteur}
- Département: ${formData.departement}
- Année de création: ${formData.anneeCreation}
- Type de clientèle: ${formData.typeClientele || 'Non renseigné'}

CHIFFRE D'AFFAIRES:
- CA N-2: ${formData.caN2 || 'Non renseigné'} €
- CA N-1: ${formData.caN1} €
${formData.caN ? `- CA N: ${formData.caN} €` : ''}

RÉSULTATS FINANCIERS:
- Résultat N-1: ${formData.resultatN1Type} de ${formData.resultatN1} €

PERSONNEL:
- Nombre total d'employés: ${formData.nombreEmployes}

ACTIFS:
- Valeur matériel & véhicules: ${formData.valeurMateriel || 0} €

PASSIF:
- Dettes totales: ${formData.dettesTotales || 0} €

CERTIFICATIONS & QUALIFICATIONS (IMPORTANT pour la valorisation):
- Certification RGE: ${formData.certificationRGE}
${formData.certificationRGE === 'oui' ? `  - Secteurs RGE: ${[
  formData.rgeSecteursIsolation ? 'Isolation' : null,
  formData.rgeSecteursPAC ? 'Pompes à chaleur' : null,
  formData.rgeSecteursPhotovoltaique ? 'Photovoltaïque' : null,
  formData.rgeSecteursChauffageBois ? 'Chauffage bois' : null,
  formData.rgeSecteursFenetres ? 'Fenêtres' : null,
  formData.rgeSecteursVentilation ? 'Ventilation' : null,
  formData.rgeSecteursAudit ? 'Audit énergétique' : null,
  formData.rgeSecteursAutre ? 'Autre' : null
].filter(Boolean).join(', ') || 'Non spécifié'}` : ''}

PARTENARIATS FINANCIERS (IMPORTANT pour la valorisation):
- Partenariat organismes de financement: ${formData.partenaireFinancement}
${formData.partenaireFinancement === 'oui' && formData.partenairesListe?.length > 0 ? 
  `  - Partenaires: ${formData.partenairesListe.join(', ')}` : ''}

CONSIGNES D'ANALYSE:
1. La certification RGE est un ATOUT MAJEUR qui augmente significativement la valeur (environ +10-15%) car elle permet l'accès aux aides MaPrimeRénov' et CEE
2. Les partenariats avec des organismes de financement facilitent les ventes aux particuliers et augmentent la valeur (environ +5-10%)
3. Considère la croissance du CA entre N-2 et N-1
4. Analyse le type de clientèle (particuliers B2C = plus de volume, professionnels B2B = plus de marge)
5. Prends en compte la solidité financière (résultat/CA, niveau de dettes)

Fournis une estimation JSON structurée avec:
{
  "estimationBasse": nombre (en euros),
  "estimationMoyenne": nombre (en euros),
  "estimationHaute": nombre (en euros),
  "multipleValorisation": nombre (multiple du CA),
  "analyseDetaillee": "texte détaillé de 200-300 mots expliquant la valorisation, mentionne EXPLICITEMENT l'impact de la certification RGE et des partenariats si présents",
  "pointsForts": ["point 1", "point 2", "point 3", "point 4"],
  "recommandations": ["recommandation 1", "recommandation 2", "recommandation 3"]
}

Sois précis et professionnel dans ton analyse. Considère TOUS les facteurs : financiers, certifications RGE, partenariats, secteur BTP, et marché local.`;

    // Appel à Lovable AI
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "Tu es un expert en valorisation d'entreprises BTP. Tu fournis des estimations précises et détaillées en format JSON strict."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        tools: [{
          type: "function",
          function: {
            name: "provide_estimation",
            description: "Fournir une estimation de valorisation d'entreprise BTP",
            parameters: {
              type: "object",
              properties: {
                estimationBasse: { type: "number", description: "Estimation basse en euros" },
                estimationMoyenne: { type: "number", description: "Estimation moyenne en euros" },
                estimationHaute: { type: "number", description: "Estimation haute en euros" },
                multipleValorisation: { type: "number", description: "Multiple de valorisation (par rapport au CA)" },
                analyseDetaillee: { type: "string", description: "Analyse détaillée de la valorisation" },
                pointsForts: { 
                  type: "array", 
                  items: { type: "string" },
                  description: "Liste des points forts identifiés"
                },
                recommandations: { 
                  type: "array", 
                  items: { type: "string" },
                  description: "Liste des recommandations"
                }
              },
              required: ["estimationBasse", "estimationMoyenne", "estimationHaute", "multipleValorisation", "analyseDetaillee", "pointsForts", "recommandations"]
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "provide_estimation" } }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API Error:", errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requêtes atteinte. Veuillez réessayer dans quelques instants." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crédit insuffisant pour l'IA. Veuillez contacter le support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI API error: ${aiResponse.status} - ${errorText}`);
    }

    const aiData = await aiResponse.json();
    console.log("AI Response:", JSON.stringify(aiData));

    // Extraire l'estimation depuis le tool call
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || !toolCall.function.arguments) {
      throw new Error("No tool call found in AI response");
    }

    const estimation = JSON.parse(toolCall.function.arguments);
    console.log("Parsed estimation:", estimation);

    // Sauvegarder dans Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Récupérer l'ID utilisateur depuis le token JWT s'il existe
    const authHeader = req.headers.get('Authorization');
    let userId = null;
    
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      userId = user?.id || null;
    }

    const { data: savedEstimation, error: dbError } = await supabase
      .from('estimations')
      .insert({
        user_id: userId,
        secteur: formData.secteur,
        departement: formData.departement,
        annee_creation: parseInt(formData.anneeCreation),
        ca_n2: formData.caN2 ? parseFloat(formData.caN2) : null,
        ca_n1: parseFloat(formData.caN1),
        ca_n: formData.caN ? parseFloat(formData.caN) : null,
        resultat_n1_type: formData.resultatN1Type,
        resultat_n1: parseFloat(formData.resultatN1),
        resultat_n2_type: formData.resultatN2Type || 'positif',
        resultat_n2: formData.resultatN2 ? parseFloat(formData.resultatN2) : 0,
        nombre_employes: parseInt(formData.nombreEmployes),
        nombre_cdi: formData.nombreCDI ? parseInt(formData.nombreCDI) : null,
        nombre_cdd: formData.nombreCDD ? parseInt(formData.nombreCDD) : null,
        nombre_apprentis: formData.nombreApprentis ? parseInt(formData.nombreApprentis) : null,
        a_dettes: formData.dettesTotales > 0,
        dette_urssaf: formData.detteURSSAF ? parseFloat(formData.detteURSSAF) : null,
        dette_tva: formData.detteTVA ? parseFloat(formData.detteTVA) : null,
        dette_loyer: formData.detteLoyer ? parseFloat(formData.detteLoyer) : null,
        dette_fournisseurs: formData.detteFournisseurs ? parseFloat(formData.detteFournisseurs) : null,
        dette_autres: formData.detteAutres ? parseFloat(formData.detteAutres) : null,
        montant_passif: parseFloat(formData.dettesTotales || 0),
        a_credits: false,
        credit_professionnel: null,
        credit_materiel: null,
        credit_immobilier: null,
        valeur_materiel: formData.valeurMateriel ? parseFloat(formData.valeurMateriel) : null,
        valeur_stock: null,
        situation_locaux: formData.situationLocaux || 'locataire',
        valeur_locaux: null,
        estimation_basse: estimation.estimationBasse,
        estimation_moyenne: estimation.estimationMoyenne,
        estimation_haute: estimation.estimationHaute,
        multiple_valorisation: estimation.multipleValorisation,
        analyse_detaillee: estimation.analyseDetaillee,
        points_forts: estimation.pointsForts,
        recommandations: estimation.recommandations,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw dbError;
    }

    console.log("Estimation saved:", savedEstimation);

    return new Response(
      JSON.stringify({ 
        estimation,
        estimationId: savedEstimation.id 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in generate-estimation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
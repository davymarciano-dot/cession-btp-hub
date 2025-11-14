import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'https://esm.sh/resend@2.0.0';
import { corsHeaders } from '../_shared/cors.ts';

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string);

interface MatchFoundData {
  buyerCompany: string;
  matchScore: number;
  buyerBudget: number;
  dashboardLink: string;
}

interface MilestoneViewsData {
  listingTitle: string;
  viewCount: number;
  dashboardLink: string;
}

interface NewMessageData {
  senderName: string;
  messagePreview: string;
  replyLink: string;
}

interface NotificationRequest {
  to: string;
  subject: string;
  template: 'match-found' | 'milestone-views' | 'new-message';
  data: MatchFoundData | MilestoneViewsData | NewMessageData;
}

const renderMatchFoundTemplate = (data: MatchFoundData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau Match</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f6f9fc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
    <div style="padding: 40px; text-align: center;">
      <h1 style="color: #1d4ed8; font-size: 32px; margin: 0 0 20px 0;">🎯 Excellent matching détecté !</h1>
      <p style="color: #374151; font-size: 16px; line-height: 24px;">
        Bonne nouvelle ! Notre algorithme a identifié un acheteur qui correspond parfaitement à votre entreprise.
      </p>
      
      <div style="background-color: #eff6ff; border: 2px solid #1d4ed8; border-radius: 8px; padding: 24px; margin: 32px 0; text-align: left;">
        <h3 style="color: #1d4ed8; margin: 0 0 16px 0;">Détails du matching</h3>
        <p style="color: #374151; margin: 8px 0;"><strong>Score de compatibilité :</strong> ${data.matchScore}/100</p>
        <p style="color: #374151; margin: 8px 0;"><strong>Budget de l'acheteur :</strong> ${data.buyerBudget.toLocaleString('fr-FR')} €</p>
        <p style="color: #374151; margin: 8px 0;"><strong>Société :</strong> ${data.buyerCompany}</p>
      </div>
      
      <a href="${data.dashboardLink}" style="display: inline-block; background-color: #1d4ed8; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0;">
        Voir le profil complet
      </a>
      
      <p style="color: #6b7280; font-size: 14px; margin-top: 32px;">
        Accédez à votre dashboard pour voir tous les détails et prendre contact avec cet acheteur qualifié.
      </p>
      
      <p style="color: #374151; font-weight: bold; margin-top: 32px;">L'équipe CessionBTP</p>
    </div>
  </div>
</body>
</html>
`;

const renderMilestoneViewsTemplate = (data: MilestoneViewsData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jalon Atteint</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f6f9fc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
    <div style="padding: 40px; text-align: center;">
      <h1 style="color: #059669; font-size: 32px; margin: 0 0 20px 0;">👀 Nouveau jalon atteint !</h1>
      <p style="color: #374151; font-size: 16px; line-height: 24px;">
        Excellente nouvelle ! Votre annonce continue d'attirer l'attention.
      </p>
      
      <div style="background-color: #d1fae5; border: 2px solid #059669; border-radius: 8px; padding: 32px; margin: 32px 0;">
        <div style="font-size: 64px; font-weight: bold; color: #059669; margin: 0;">${data.viewCount}</div>
        <p style="color: #047857; font-size: 18px; margin: 8px 0 0 0;">vues sur votre annonce</p>
        <p style="color: #374151; font-style: italic; margin: 16px 0 0 0;">"${data.listingTitle}"</p>
      </div>
      
      <div style="background-color: #fef3c7; border-radius: 8px; padding: 24px; margin: 32px 0; text-align: left;">
        <p style="color: #92400e; font-weight: bold; margin: 0 0 16px 0;">💡 Conseils pour augmenter votre visibilité</p>
        <p style="color: #78350f; margin: 8px 0;">• Mettez à jour vos photos et documents</p>
        <p style="color: #78350f; margin: 8px 0;">• Répondez rapidement aux demandes de contact</p>
        <p style="color: #78350f; margin: 8px 0;">• Lancez le matching automatique pour trouver plus d'acheteurs</p>
      </div>
      
      <a href="${data.dashboardLink}" style="display: inline-block; background-color: #059669; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0;">
        Voir les statistiques détaillées
      </a>
      
      <p style="color: #6b7280; font-size: 14px; margin-top: 32px;">
        Continuez sur cette lancée ! Plus votre annonce est vue, plus vous avez de chances de trouver le bon repreneur.
      </p>
      
      <p style="color: #374151; font-weight: bold; margin-top: 32px;">L'équipe CessionBTP</p>
    </div>
  </div>
</body>
</html>
`;

const renderNewMessageTemplate = (data: NewMessageData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau Message</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f6f9fc; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
    <div style="padding: 40px; text-align: center;">
      <h1 style="color: #7c3aed; font-size: 32px; margin: 0 0 20px 0;">💬 Nouveau message</h1>
      <p style="color: #374151; font-size: 16px; line-height: 24px;">
        Vous avez reçu un nouveau message de <strong>${data.senderName}</strong>.
      </p>
      
      <div style="background-color: #f3f4f6; border-left: 4px solid #7c3aed; border-radius: 4px; padding: 24px; margin: 32px 0; text-align: left;">
        <p style="color: #6b7280; font-size: 14px; font-weight: bold; margin: 0 0 12px 0; text-transform: uppercase;">Aperçu du message :</p>
        <p style="color: #1f2937; font-style: italic; margin: 0;">"${data.messagePreview}..."</p>
      </div>
      
      <a href="${data.replyLink}" style="display: inline-block; background-color: #7c3aed; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 20px 0;">
        Lire et répondre
      </a>
      
      <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px; margin: 32px 0;">
        <p style="color: #6b7280; font-size: 14px; margin: 0;">
          💡 <strong>Conseil :</strong> Répondez rapidement pour maintenir l'intérêt de vos acheteurs potentiels. Les annonces avec un taux de réponse élevé sont mieux classées.
        </p>
      </div>
      
      <p style="color: #374151; font-weight: bold; margin-top: 32px;">L'équipe CessionBTP</p>
    </div>
  </div>
</body>
</html>
`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, template, data }: NotificationRequest = await req.json();

    console.log('Sending notification:', { to, template });

    // Render the appropriate email template
    let html: string;
    
    switch (template) {
      case 'match-found':
        html = renderMatchFoundTemplate(data as MatchFoundData);
        break;
      case 'milestone-views':
        html = renderMilestoneViewsTemplate(data as MilestoneViewsData);
        break;
      case 'new-message':
        html = renderNewMessageTemplate(data as NewMessageData);
        break;
      default:
        throw new Error(`Unknown template: ${template}`);
    }

    // Send email via Resend
    const { data: emailData, error } = await resend.emails.send({
      from: 'CessionBTP <notifications@resend.dev>',
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('Error sending email:', error);
      throw error;
    }

    console.log('Email sent successfully:', emailData);

    return new Response(
      JSON.stringify({ success: true, id: emailData?.id }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in send-notification:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

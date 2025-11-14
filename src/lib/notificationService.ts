import { supabase } from "@/integrations/supabase/client";

interface NotificationParams {
  to: string;
  subject: string;
  template: 'match-found' | 'milestone-views' | 'new-message';
  data: any;
}

export class NotificationService {
  private static async sendEmail(params: NotificationParams) {
    try {
      const { data, error } = await supabase.functions.invoke('send-notification', {
        body: params,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  // Nouveau match trouvé
  static async sendMatchNotification(
    sellerEmail: string,
    buyerCompany: string,
    matchScore: number,
    buyerBudget: number
  ) {
    return this.sendEmail({
      to: sellerEmail,
      subject: '🎯 Nouvel acheteur potentiel intéressé !',
      template: 'match-found',
      data: {
        buyerCompany,
        matchScore,
        buyerBudget,
        dashboardLink: `${window.location.origin}/dashboard-vendeur`,
      },
    });
  }

  // Nouveau jalon de vues atteint
  static async sendViewMilestoneNotification(
    ownerEmail: string,
    listingTitle: string,
    viewCount: number
  ) {
    // Envoyer uniquement tous les 10 vues
    if (viewCount % 10 !== 0) return;

    return this.sendEmail({
      to: ownerEmail,
      subject: `👀 Votre annonce a atteint ${viewCount} vues !`,
      template: 'milestone-views',
      data: {
        listingTitle,
        viewCount,
        dashboardLink: `${window.location.origin}/dashboard-vendeur`,
      },
    });
  }

  // Nouveau message reçu
  static async sendNewMessageNotification(
    recipientEmail: string,
    senderName: string,
    messageContent: string,
    conversationId: string
  ) {
    const messagePreview = messageContent.substring(0, 100);
    
    return this.sendEmail({
      to: recipientEmail,
      subject: `💬 Nouveau message de ${senderName}`,
      template: 'new-message',
      data: {
        senderName,
        messagePreview,
        replyLink: `${window.location.origin}/messages?conversation=${conversationId}`,
      },
    });
  }
}

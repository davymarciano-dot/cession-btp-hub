import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  created_at: string;
}

class RealtimeNotificationService {
  private channels: Map<string, RealtimeChannel> = new Map();

  subscribeToUserNotifications(userId: string, callback: (notification: Notification) => void) {
    const channelName = `notifications:${userId}`;

    if (this.channels.has(channelName)) {
      return this.channels.get(channelName)!;
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          this.handleNotification(payload.new as Notification, callback);
        }
      )
      .subscribe();

    this.channels.set(channelName, channel);
    return channel;
  }

  subscribeToListingEvents(
    listingId: string,
    callbacks: {
      onViewersUpdate?: (count: number) => void;
      onNewView?: (payload: any) => void;
      onNewContact?: (payload: any) => void;
    }
  ) {
    const channel = supabase
      .channel(`listing:${listingId}`)
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        callbacks.onViewersUpdate?.(Object.keys(state).length);
      })
      .on('broadcast', { event: 'new_view' }, (payload) => {
        callbacks.onNewView?.(payload);
      })
      .on('broadcast', { event: 'new_contact' }, (payload) => {
        callbacks.onNewContact?.(payload);
      })
      .subscribe();

    return channel;
  }

  private handleNotification(notification: Notification, callback?: (notification: Notification) => void) {
    this.showToastNotification(notification);
    this.playNotificationSound(notification.type);
    callback?.(notification);
  }

  private showToastNotification(notification: Notification) {
    const icons: Record<string, string> = {
      new_view: '👁️',
      new_contact: '💬',
      new_match: '🎯',
      boost_expiring: '⏰',
      payment_received: '💰'
    };

    const icon = icons[notification.type] || '🔔';

    toast(notification.title, {
      description: notification.message,
      icon: icon,
      duration: 5000
    });
  }

  private playNotificationSound(type: string) {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio play failed:', e));
  }

  static async sendNotification(userId: string, notification: Omit<Notification, 'id' | 'user_id' | 'created_at' | 'read'>) {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        data: notification.data,
        read: false
      });

    if (error) {
      console.error('Error sending notification:', error);
    }
  }

  unsubscribe(channelName: string) {
    const channel = this.channels.get(channelName);
    if (channel) {
      channel.unsubscribe();
      this.channels.delete(channelName);
    }
  }

  unsubscribeAll() {
    this.channels.forEach(channel => channel.unsubscribe());
    this.channels.clear();
  }
}

export const notificationService = new RealtimeNotificationService();
export default RealtimeNotificationService;

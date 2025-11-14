import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { notificationService } from '@/services/realtimeNotifications';

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

// Temporary type guard until Supabase types are regenerated
const isNotification = (obj: any): obj is Notification => {
  return obj && typeof obj.type === 'string' && typeof obj.title === 'string';
};

export const useRealtimeNotifications = (userId: string | undefined) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    // S'abonner aux nouvelles notifications
    const channel = notificationService.subscribeToUserNotifications(userId, (notification) => {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
    });

    // Charger les notifications existantes
    const loadNotifications = async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20);

      if (data) {
        const validNotifications = data.filter(isNotification);
        setNotifications(validNotifications);
        setUnreadCount(validNotifications.filter(n => !n.read).length);
      }
    };

    loadNotifications();

    return () => {
      channel?.unsubscribe();
    };
  }, [userId]);

  const markAsRead = async (notificationId: string) => {
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    if (!userId) return;

    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false);

    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead
  };
};

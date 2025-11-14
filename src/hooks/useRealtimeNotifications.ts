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

    // Load notifications - disabled until types are regenerated
    console.log('Notifications feature disabled for user:', userId);

    return () => {
      channel?.unsubscribe();
    };
  }, [userId]);

  const markAsRead = async (notificationId: string) => {
    console.log('Mark as read disabled:', notificationId);
  };

  const markAllAsRead = async () => {
    console.log('Mark all as read disabled');
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead
  };
};

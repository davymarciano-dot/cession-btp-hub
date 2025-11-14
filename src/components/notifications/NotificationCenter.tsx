import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { NotificationItem } from './NotificationItem';

export interface Notification {
  id: string;
  type: 'view_milestone' | 'new_match' | 'new_message' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
  action?: string;
  actionUrl?: string;
}

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'view_milestone',
      title: '🎉 100 vues atteintes !',
      message: 'Votre annonce a dépassé les 100 vues',
      time: 'Il y a 2h',
      read: false,
      action: 'Voir statistiques',
      actionUrl: '/dashboard'
    },
    {
      id: '2',
      type: 'new_match',
      title: '🎯 Nouvel acheteur matché',
      message: 'Score de compatibilité : 94%',
      time: 'Il y a 4h',
      read: false,
      action: 'Voir profil',
      actionUrl: '/matches'
    },
    {
      id: '3',
      type: 'new_message',
      title: '💬 Nouveau message',
      message: 'De : Groupe Immobilier Paris',
      time: 'Hier',
      read: true,
      action: 'Répondre',
      actionUrl: '/messages'
    },
    {
      id: '4',
      type: 'reminder',
      title: '📅 Rappel',
      message: 'Pensez à mettre à jour vos informations',
      time: 'Il y a 2 jours',
      read: true,
      actionUrl: '/dashboard'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Demander la permission pour les notifications push
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      // Demander la permission après quelques secondes
      setTimeout(() => {
        Notification.requestPermission();
      }, 3000);
    }
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const sendPushNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/logo-cessionbtp.png',
        badge: '/logo-cessionbtp.png',
        tag: 'cessionbtp-notification'
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              Tout marquer lu
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Aucune notification</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={() => markAsRead(notification.id)}
                />
              ))}
            </div>
          )}
        </ScrollArea>
        
        <div className="p-3 border-t text-center">
          <Button variant="ghost" size="sm" className="w-full">
            Voir toutes les notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

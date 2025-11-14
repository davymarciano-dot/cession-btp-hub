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
  type: 'view_milestone' | 'new_match' | 'new_message' | 'reminder' | 'document_upload' | 'profile_complete' | 'listing_expiring' | 'payment_success' | 'new_inquiry';
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
      message: 'Votre annonce a dépassé les 100 vues cette semaine',
      time: 'Il y a 2h',
      read: false,
      action: 'Voir statistiques',
      actionUrl: '/dashboard-vendeur'
    },
    {
      id: '2',
      type: 'new_match',
      title: '🎯 Nouvel acheteur matché',
      message: 'Un acheteur très qualifié (Score: 94%) correspond à votre profil',
      time: 'Il y a 4h',
      read: false,
      action: 'Voir profil',
      actionUrl: '/mes-matchs'
    },
    {
      id: '3',
      type: 'new_message',
      title: '💬 Nouveau message',
      message: 'Groupe Immobilier Paris vous a envoyé un message',
      time: 'Hier',
      read: false,
      action: 'Répondre',
      actionUrl: '/messages'
    },
    {
      id: '4',
      type: 'new_inquiry',
      title: '📧 Nouvelle demande d\'information',
      message: 'Un acheteur souhaite en savoir plus sur votre entreprise',
      time: 'Hier',
      read: true,
      action: 'Consulter',
      actionUrl: '/messages'
    },
    {
      id: '5',
      type: 'document_upload',
      title: '📄 Documents manquants',
      message: 'Ajoutez vos bilans pour augmenter la crédibilité de votre annonce',
      time: 'Il y a 2 jours',
      read: true,
      action: 'Ajouter documents',
      actionUrl: '/dashboard-vendeur'
    },
    {
      id: '6',
      type: 'listing_expiring',
      title: '⏰ Annonce expire bientôt',
      message: 'Votre annonce expire dans 7 jours. Renouvelez-la maintenant.',
      time: 'Il y a 3 jours',
      read: true,
      action: 'Renouveler',
      actionUrl: '/tarifs'
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

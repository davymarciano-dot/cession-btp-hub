import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Notification } from './NotificationCenter';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: () => void;
}

export const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead();
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'view_milestone':
        return 'bg-green-50 dark:bg-green-950/20';
      case 'new_match':
        return 'bg-blue-50 dark:bg-blue-950/20';
      case 'new_message':
        return 'bg-purple-50 dark:bg-purple-950/20';
      case 'reminder':
        return 'bg-amber-50 dark:bg-amber-950/20';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div
      className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
        !notification.read ? 'bg-muted/30' : ''
      } ${getTypeColor(notification.type)}`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{notification.time}</span>
            {notification.action && (
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-xs"
              >
                {notification.action}
              </Button>
            )}
          </div>
        </div>
        {!notification.read && (
          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
        )}
      </div>
    </div>
  );
};

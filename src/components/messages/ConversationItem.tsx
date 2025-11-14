import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ConversationItemProps {
  conversation: {
    id: string;
    annonce: {
      raison_sociale: string | null;
      secteur_activite: string;
      ville: string;
    };
    lastMessage?: {
      content: string;
      created_at: string;
    };
    unreadCount?: number;
  };
  isSelected: boolean;
  onClick: () => void;
  otherUserName?: string;
}

export const ConversationItem = ({ 
  conversation, 
  isSelected, 
  onClick,
  otherUserName 
}: ConversationItemProps) => {
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return parts.length > 1 
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name.substring(0, 2).toUpperCase();
  };

  const displayName = otherUserName || conversation.annonce.raison_sociale || 'Utilisateur';

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 flex gap-3 hover:bg-muted/50 transition-colors text-left ${
        isSelected ? 'bg-muted' : ''
      }`}
    >
      <Avatar className="w-12 h-12 flex-shrink-0">
        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
          {getInitials(displayName)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold truncate">{displayName}</h3>
          {conversation.lastMessage && (
            <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
              {format(new Date(conversation.lastMessage.created_at), 'HH:mm', { locale: fr })}
            </span>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-1 truncate">
          {conversation.annonce.secteur_activite} • {conversation.annonce.ville}
        </p>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground truncate flex-1">
            {conversation.lastMessage?.content || 'Aucun message'}
          </p>
          {conversation.unreadCount && conversation.unreadCount > 0 && (
            <Badge className="ml-2 bg-primary text-primary-foreground flex-shrink-0">
              {conversation.unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
};

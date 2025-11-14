import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChatHeaderProps {
  conversation: {
    annonce: {
      raison_sociale: string | null;
      secteur_activite: string;
      ville: string;
    };
  };
  otherUserName?: string;
  onBack?: () => void;
}

export const ChatHeader = ({ conversation, otherUserName, onBack }: ChatHeaderProps) => {
  const displayName = otherUserName || conversation.annonce.raison_sociale || 'Utilisateur';
  
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return parts.length > 1 
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="border-b bg-background px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1">
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="lg:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {getInitials(displayName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h2 className="font-semibold truncate">{displayName}</h2>
          <p className="text-sm text-muted-foreground truncate">
            {conversation.annonce.secteur_activite} • {conversation.annonce.ville}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <Phone className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <Video className="w-5 h-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Voir l'annonce</DropdownMenuItem>
            <DropdownMenuItem>Archiver la conversation</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Bloquer l'utilisateur
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

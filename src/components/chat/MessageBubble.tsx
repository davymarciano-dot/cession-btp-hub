import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    sender_id: string;
    created_at: string;
    read: boolean;
  };
  isOwn: boolean;
  senderName?: string;
}

export const MessageBubble = ({ message, isOwn, senderName }: MessageBubbleProps) => {
  const initials = senderName
    ? senderName.split(' ').map(n => n[0]).join('').toUpperCase()
    : '?';

  return (
    <div className={cn("flex gap-2 mb-4", isOwn && "flex-row-reverse")}>
      <Avatar className="h-8 w-8">
        <AvatarFallback className={cn(
          isOwn ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        )}>
          {initials}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "flex flex-col max-w-[70%]",
        isOwn && "items-end"
      )}>
        <div className={cn(
          "rounded-lg px-4 py-2",
          isOwn 
            ? "bg-primary text-primary-foreground" 
            : "bg-secondary text-secondary-foreground"
        )}>
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {format(new Date(message.created_at), 'HH:mm', { locale: fr })}
          {isOwn && (
            <span className="ml-2">
              {message.read ? '✓✓' : '✓'}
            </span>
          )}
        </span>
      </div>
    </div>
  );
};
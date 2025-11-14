import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageBubble } from './MessageBubble';

interface LiveChatProps {
  listingId: string;
  sellerId: string;
  buyerId: string;
  sellerName?: string;
  sellerAvatar?: string;
}

export const LiveChat = ({ listingId, sellerId, buyerId, sellerName = 'Vendeur', sellerAvatar }: LiveChatProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
    setupRealtimeSubscription();
  }, [listingId]);

  const loadMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(50);
    
    if (data) setMessages(data);
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel(`chat:${listingId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages'
      }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
        scrollToBottom();
      })
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        setIsOnline(!!state[sellerId]);
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    await supabase.from('messages').insert({
      sender_id: buyerId,
      content: newMessage,
      read: false
    });

    setNewMessage('');
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-14 h-14 shadow-lg"
        >
          💬
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-background rounded-lg shadow-2xl flex flex-col z-50 border">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar>
                <AvatarFallback>{sellerName[0]}</AvatarFallback>
              </Avatar>
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                isOnline ? 'bg-green-500' : 'bg-gray-400'
              }`} />
            </div>
            <div>
              <p className="font-semibold">{sellerName}</p>
              <p className="text-xs opacity-90">
                {isOnline ? 'En ligne' : 'Hors ligne'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
            >
              ↓
            </Button>
            <Button
              variant="ghost"
              size="sm"
            >
              ×
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
        {messages.map(msg => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.sender_id === buyerId}
          />
        ))}
        {typing && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
            </div>
            <span className="text-sm">Le vendeur écrit...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Votre message..."
          />
          <Button onClick={sendMessage}>
            Envoyer
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-t bg-muted/20">
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            📅 RDV
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            📞 Appel
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            📄 Doc
          </Button>
        </div>
      </div>
    </div>
  );
};

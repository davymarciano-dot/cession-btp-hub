import { MessageSquare } from 'lucide-react';

export const EmptyConversationState = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <MessageSquare className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Sélectionnez une conversation</h3>
      <p className="text-muted-foreground max-w-sm">
        Choisissez une conversation dans la liste pour commencer à échanger avec vos contacts
      </p>
    </div>
  );
};

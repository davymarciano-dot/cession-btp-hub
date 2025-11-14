import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ProactiveChat = () => {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (hasInteracted) return;
    
    // Trigger sur la page tarifs après 30s
    if (window.location.pathname === '/tarifs') {
      const timer = setTimeout(() => {
        setMessage("👋 Je vois que vous consultez nos tarifs. Saviez-vous que c'est gratuit jusqu'à la vente ?");
        setShowChat(true);
      }, 30000);
      return () => clearTimeout(timer);
    }
    
    // Trigger sur scroll
    const handleScroll = () => {
      if (window.scrollY > document.body.scrollHeight * 0.75 && !hasInteracted) {
        setMessage("🤔 Vous n'avez pas trouvé ce que vous cherchez ? Je peux vous aider !");
        setShowChat(true);
      }
    };
    
    // Exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasInteracted) {
        setMessage("⏰ Attendez ! Estimation gratuite en 48h si vous commencez maintenant");
        setShowChat(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasInteracted]);
  
  if (!showChat) return null;
  
  return (
    <div className="fixed bottom-20 right-6 bg-card shadow-2xl rounded-xl p-4 max-w-sm animate-in slide-in-from-bottom-5 z-50">
      <button 
        onClick={() => setShowChat(false)}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
      >
        ×
      </button>
      
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl">
          🤖
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold mb-1">Assistant CessionBTP</p>
          <p className="text-sm text-muted-foreground">{message}</p>
          
          <div className="mt-3 flex gap-2">
            <Button 
              size="sm"
              onClick={() => {
                setHasInteracted(true);
                setShowChat(false);
              }}
            >
              💬 Discuter
            </Button>
            <Button 
              size="sm"
              variant="secondary"
              onClick={() => {
                setHasInteracted(true);
                navigate('/estimer');
              }}
            >
              📊 Estimation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProactiveChat;

import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  actions?: Array<{ label: string; link: string }>;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      text: 'Bonjour ! Je suis votre assistant CessionBTP. Comment puis-je vous aider ?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const getResponse = (message: string): Omit<Message, 'role'> => {
    const msg = message.toLowerCase();
    
    // Vendre
    if (msg.includes('vendre') || msg.includes('vente') || msg.includes('céder')) {
      return {
        text: "Je vais vous aider à vendre votre entreprise ! Notre processus est simple : estimation gratuite en 48h, mise en ligne immédiate, et vente moyenne en 45 jours. Souhaitez-vous commencer l'estimation maintenant ?",
        actions: [
          { label: 'Estimer mon entreprise', link: '/estimer' },
          { label: 'Publier une annonce', link: '/vendre' }
        ]
      };
    }
    
    // Acheter
    if (msg.includes('acheter') || msg.includes('cherche') || msg.includes('reprendre')) {
      return {
        text: "Excellent ! Nous avons de nombreuses entreprises BTP à vendre. Quel secteur vous intéresse particulièrement ?",
        actions: [
          { label: 'Voir toutes les entreprises', link: '/acheter' },
          { label: 'Entreprises RGE uniquement', link: '/entreprises-rge' }
        ]
      };
    }
    
    // Prix/Tarifs
    if (msg.includes('prix') || msg.includes('coût') || msg.includes('tarif') || msg.includes('commission')) {
      return {
        text: "Notre modèle est simple : GRATUIT jusqu'à la vente, puis seulement 2% de commission (vs 5-10% ailleurs). L'estimation et la mise en ligne sont 100% gratuites.",
        actions: [
          { label: 'Voir les tarifs détaillés', link: '/tarifs' }
        ]
      };
    }
    
    // RGE
    if (msg.includes('rge') || msg.includes('qualibat') || msg.includes('qualipac') || msg.includes('certification')) {
      return {
        text: "Les entreprises RGE se vendent 30-40% plus cher ! Nous avons une section dédiée aux entreprises certifiées. Votre entreprise est-elle certifiée ?",
        actions: [
          { label: 'Voir les entreprises RGE', link: '/entreprises-rge' },
          { label: 'En savoir plus sur RGE', link: '/faq' }
        ]
      };
    }
    
    // Délai
    if (msg.includes('combien de temps') || msg.includes('délai') || msg.includes('durée') || msg.includes('rapide')) {
      return {
        text: "Le délai moyen de vente est de 45 jours sur CessionBTP. Certaines entreprises RGE ou très attractives se vendent même en moins de 30 jours !",
        actions: [
          { label: 'Commencer maintenant', link: '/vendre' }
        ]
      };
    }

    // Estimation
    if (msg.includes('estim') || msg.includes('valeur') || msg.includes('combien vaut')) {
      return {
        text: "Nous proposons une estimation gratuite et confidentielle de votre entreprise en 48h. Notre algorithme prend en compte plus de 15 critères pour vous donner une valorisation précise.",
        actions: [
          { label: 'Faire une estimation', link: '/estimer' }
        ]
      };
    }
    
    // Default
    return {
      text: "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ? Vous pouvez me demander des informations sur : la vente, l'achat, les prix, les délais, ou les certifications RGE.",
      actions: [
        { label: 'Voir la FAQ', link: '/faq' }
      ]
    };
  };
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const response = getResponse(currentInput);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        ...response 
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };
  
  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-2xl hover:bg-blue-700 transition-all z-50 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Ouvrir l'assistant IA"
      >
        <div className="relative">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L1 23l6.71-1.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
          </svg>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
        </div>
      </button>
      
      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <p className="font-semibold">Assistant CessionBTP</p>
                <p className="text-xs opacity-90">En ligne • Répond instantanément</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/80 hover:text-white text-2xl leading-none"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-800 shadow-sm'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  
                  {/* Boutons d'action */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.actions.map((action, j) => (
                        <Link
                          key={j}
                          to={action.link}
                          onClick={() => setIsOpen(false)}
                          className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-3 rounded-lg text-sm transition"
                        >
                          {action.label} →
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Indicateur de frappe */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                aria-label="Envoyer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            
            {/* Suggestions */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleSuggestionClick('Je veux vendre mon entreprise')}
                className="text-xs bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition"
              >
                💰 Vendre
              </button>
              <button 
                onClick={() => handleSuggestionClick('Combien vaut mon entreprise ?')}
                className="text-xs bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition"
              >
                📊 Estimation
              </button>
              <button 
                onClick={() => handleSuggestionClick('Je cherche une entreprise RGE')}
                className="text-xs bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition"
              >
                🌱 RGE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;

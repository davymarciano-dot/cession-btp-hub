import { useState, useEffect } from "react";

export const LiveNotification = () => {
  const notifications = [
    { text: "Jean D. vient de vendre son entreprise de maçonnerie (Paris)", icon: "✅", color: "green" },
    { text: "Nouvelle offre reçue pour une société de plomberie (Lyon)", icon: "💼", color: "blue" },
    { text: "Marc L. a finalisé sa vente en 38 jours (Marseille)", icon: "🎉", color: "orange" },
    { text: "Sophie T. vient de recevoir 3 offres d'achat (Toulouse)", icon: "🔥", color: "red" },
    { text: "Entreprise d'électricité vendue à 1.2M€ (Nice)", icon: "💰", color: "green" },
    { text: "Repreneur qualifié vient de s'inscrire (Bordeaux)", icon: "👤", color: "purple" },
    { text: "Patrick M. a validé son estimation en 2 min (Nantes)", icon: "⚡", color: "yellow" },
    { text: "Entreprise RGE vendue avec +30% de valorisation (Strasbourg)", icon: "🌱", color: "green" },
    { text: "4 acheteurs intéressés par une société de chauffage (Lille)", icon: "🎯", color: "blue" },
    { text: "Clôture de vente en 32 jours - Record battu ! (Rennes)", icon: "🏆", color: "gold" }
  ];
  
  const [currentNotif, setCurrentNotif] = useState(0);
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    // Show first notification after 5 seconds
    const initialTimer = setTimeout(() => {
      setShow(true);
    }, 5000);

    // Then cycle through notifications
    const timer = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setCurrentNotif((prev) => (prev + 1) % notifications.length);
        setShow(true);
      }, 500);
    }, 12000); // Show each notification for 12 seconds
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(timer);
    };
  }, []);
  
  if (!show) return null;
  
  const currentNotification = notifications[currentNotif];
  const bgColorClass = currentNotification.color === 'green' ? 'bg-green-100' :
                       currentNotification.color === 'blue' ? 'bg-blue-100' :
                       currentNotification.color === 'orange' ? 'bg-orange-100' :
                       currentNotification.color === 'red' ? 'bg-red-100' :
                       currentNotification.color === 'purple' ? 'bg-purple-100' :
                       currentNotification.color === 'yellow' ? 'bg-yellow-100' :
                       'bg-gray-100';
  
  return (
    <div className="fixed bottom-4 left-4 bg-white shadow-2xl rounded-lg p-4 max-w-sm z-50 animate-slide-in-right border-l-4 border-l-orange-500">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 ${bgColorClass} rounded-full flex items-center justify-center`}>
            <span className="text-xl">{currentNotification.icon}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="font-semibold text-xs text-gray-500 uppercase tracking-wide">En direct</p>
          </div>
          <p className="text-sm text-gray-900 leading-relaxed font-medium">{currentNotification.text}</p>
        </div>
        <button 
          onClick={() => setShow(false)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";

export const LiveNotification = () => {
  const notifications = [
    "Jean D. vient de vendre son entreprise de maçonnerie (Paris)",
    "Nouvelle offre reçue pour une société de plomberie (Lyon)",
    "Marc L. a finalisé sa vente en 38 jours (Marseille)",
    "Sophie T. vient de recevoir 3 offres (Toulouse)",
    "Entreprise d'électricité vendue à 1.2M€ (Nice)",
    "Repreneur qualifié vient de s'inscrire (Bordeaux)"
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
  
  return (
    <div className="fixed bottom-4 left-4 bg-white shadow-2xl rounded-lg p-4 max-w-sm z-50 animate-slide-in-right border border-gray-200">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-xl">🔔</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 mb-1">Activité en temps réel</p>
          <p className="text-sm text-gray-600 leading-relaxed">{notifications[currentNotif]}</p>
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

import { useEffect, useState } from "react";

declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

const WELCOME_MESSAGE = "Besoin d'aide pour vendre votre entreprise ?";

export const ThirdPartyChat = () => {
  const crispId = import.meta.env.VITE_CRISP_WEBSITE_ID as string | undefined;
  const tawkPropertyId = import.meta.env.VITE_TAWK_PROPERTY_ID as string | undefined;
  const tawkWidgetId = import.meta.env.VITE_TAWK_WIDGET_ID as string | undefined;

  const [loaded, setLoaded] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    try {
      // Load Crisp if configured
      if (crispId) {
        window.$crisp = window.$crisp || [];
        window.CRISP_WEBSITE_ID = crispId;
        const s = document.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        s.async = true;
        s.onload = () => {
          setLoaded(true);
          // Configuration du chat après chargement
          setTimeout(() => {
            if (window.$crisp) {
              window.$crisp.push(["set", "message:text", [
                "👋 Bonjour ! Besoin d'aide pour vendre votre entreprise BTP en 45 jours ? Je suis là pour vous accompagner."
              ]]);
              window.$crisp.push(["config", "color:theme", ["blue"]]);
              window.$crisp.push(["config", "position:reverse", [false]]);
            }
          }, 1000);
        };
        s.onerror = () => console.error("Crisp script failed to load");
        document.head.appendChild(s);
        return;
      }

      // Load Tawk.to if configured
      if (tawkPropertyId && tawkWidgetId) {
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();
        const s1 = document.createElement("script");
        s1.async = true;
        s1.src = `https://embed.tawk.to/${tawkPropertyId}/${tawkWidgetId}`;
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        s1.onload = () => setLoaded(true);
        s1.onerror = () => console.error("Tawk.to script failed to load");
        document.head.appendChild(s1);
      }
    } catch (e) {
      console.error("Error initializing third-party chat:", e);
    }
  }, [crispId, tawkPropertyId, tawkWidgetId]);

  // No third-party chat configured
  if (!(crispId || (tawkPropertyId && tawkWidgetId))) return null;

  return (
    <>
      {showWelcome && (
        <div className="fixed bottom-24 right-6 z-50 max-w-xs">
          <div className="bg-popover text-popover-foreground border border-border shadow-lg rounded-lg p-3">
            <div className="text-sm">{WELCOME_MESSAGE}</div>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  try {
                    if (crispId && window.$crisp) {
                      window.$crisp.push(["do", "chat:open"]);
                    } else if (window.Tawk_API?.maximize) {
                      window.Tawk_API.maximize();
                    }
                  } catch (e) {
                    console.error("Error opening chat:", e);
                  }
                  setShowWelcome(false);
                }}
                className="text-primary hover:underline text-sm"
              >
                Ouvrir le chat
              </button>
              <button
                onClick={() => setShowWelcome(false)}
                className="text-muted-foreground hover:text-foreground text-xs ml-auto"
                aria-label="Fermer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

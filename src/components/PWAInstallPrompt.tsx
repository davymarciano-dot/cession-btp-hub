import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, Smartphone } from 'lucide-react';
import { trackEvent } from './Analytics';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show the install prompt after a delay
      setTimeout(() => {
        // Check if user hasn't dismissed it before
        const dismissed = localStorage.getItem('pwa-prompt-dismissed');
        if (!dismissed) {
          setShowPrompt(true);
        }
      }, 10000); // Show after 10 seconds
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('🎉 App already installed!');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`User response to the install prompt: ${outcome}`);
    trackEvent('pwa_install', 'PWA', outcome);

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
    trackEvent('pwa_dismiss', 'PWA', 'dismissed');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-card border border-border rounded-lg shadow-2xl p-4">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 mb-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">
              Installer CessionBTP
            </h3>
            <p className="text-sm text-muted-foreground">
              Accédez rapidement à la plateforme depuis votre écran d'accueil
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Button 
            onClick={handleInstallClick}
            className="w-full"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Installer l'application
          </Button>
          
          <button
            onClick={handleDismiss}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition"
          >
            Plus tard
          </button>
        </div>
      </div>
    </div>
  );
};

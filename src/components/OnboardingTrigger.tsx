import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw, Rocket } from 'lucide-react';

const OnboardingTrigger = () => {
  const [showButton, setShowButton] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  
  useEffect(() => {
    const completed = localStorage.getItem('onboardingComplete');
    const skipped = localStorage.getItem('onboardingSkipped');
    
    setHasCompleted(completed === 'true');
    setShowButton(skipped === 'true' || completed === 'true');
  }, []);
  
  const resetOnboarding = () => {
    localStorage.removeItem('onboardingComplete');
    localStorage.removeItem('onboardingSkipped');
    localStorage.removeItem('onboardingData');
    window.location.reload();
  };
  
  const launchOnboarding = () => {
    window.dispatchEvent(new CustomEvent('showOnboarding'));
  };
  
  if (!showButton) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-30 animate-fade-in">
      <Card className="p-4 shadow-lg">
        {hasCompleted ? (
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              ✅ Onboarding complété
            </p>
            <Button
              onClick={resetOnboarding}
              variant="outline"
              className="w-full"
              size="sm"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Recommencer le guide
            </Button>
          </div>
        ) : (
          <Button
            onClick={launchOnboarding}
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg animate-pulse"
          >
            <Rocket className="h-4 w-4 mr-2" />
            Lancer le guide interactif
          </Button>
        )}
      </Card>
    </div>
  );
};

export default OnboardingTrigger;

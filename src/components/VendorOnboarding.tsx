import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';

interface VendorOnboardingProps {
  onComplete: (data: any) => void;
  onSkip: () => void;
}

const VendorOnboarding = ({ onComplete, onSkip }: VendorOnboardingProps) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({});
  const [showOnboarding, setShowOnboarding] = useState(true);
  
  const steps = [
    {
      id: 'welcome',
      title: 'Bienvenue sur CessionBTP ! 🎉',
      content: (
        <div className="text-center">
          <div className="text-6xl mb-4">🏗️</div>
          <h2 className="text-2xl font-bold mb-4">
            Vendez votre entreprise BTP en 45 jours
          </h2>
          <p className="text-muted-foreground mb-6">
            3 minutes pour tout configurer
          </p>
          
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-accent/50 p-4 rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-sm">Estimation gratuite</p>
            </div>
            <div className="bg-accent/50 p-4 rounded-lg">
              <div className="text-3xl mb-2">🎯</div>
              <p className="text-sm">Matching IA</p>
            </div>
            <div className="bg-accent/50 p-4 rounded-lg">
              <div className="text-3xl mb-2">💰</div>
              <p className="text-sm">Commission 2%</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sector',
      title: 'Quel est votre secteur d\'activité ?',
      content: (
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: 'plomberie', icon: '🔧', label: 'Plomberie' },
            { value: 'electricite', icon: '⚡', label: 'Électricité' },
            { value: 'maconnerie', icon: '🧱', label: 'Maçonnerie' },
            { value: 'pompe-chaleur', icon: '🌡️', label: 'Pompe à chaleur' },
            { value: 'photovoltaique', icon: '☀️', label: 'Photovoltaïque' },
            { value: 'autre', icon: '🏗️', label: 'Autre' }
          ].map(sector => (
            <button
              key={sector.value}
              onClick={() => {
                setData({ ...data, sector: sector.value });
                nextStep();
              }}
              className="p-6 border-2 border-border rounded-xl hover:border-primary hover:bg-accent transition"
            >
              <div className="text-4xl mb-2">{sector.icon}</div>
              <p className="font-semibold">{sector.label}</p>
            </button>
          ))}
        </div>
      )
    },
    {
      id: 'rge',
      title: 'Avez-vous une certification RGE ?',
      content: (
        <div className="space-y-4">
          <button
            onClick={() => {
              setData({ ...data, hasRGE: true });
              nextStep();
            }}
            className="w-full p-6 bg-accent border-2 border-primary rounded-xl hover:bg-accent/80"
          >
            <div className="text-3xl mb-2">✅</div>
            <p className="font-bold text-lg">Oui, j'ai une certification RGE</p>
            <p className="text-sm text-muted-foreground mt-2">
              Votre entreprise vaut 30% de plus !
            </p>
          </button>
          
          <button
            onClick={() => {
              setData({ ...data, hasRGE: false });
              nextStep();
            }}
            className="w-full p-6 bg-muted border-2 border-border rounded-xl hover:bg-muted/80"
          >
            <div className="text-3xl mb-2">❌</div>
            <p className="font-bold text-lg">Non, pas de RGE</p>
          </button>
        </div>
      )
    },
    {
      id: 'urgency',
      title: 'Quand souhaitez-vous vendre ?',
      content: (
        <div className="space-y-4">
          {[
            { value: 'urgent', label: 'Le plus vite possible', icon: '🚀' },
            { value: '3months', label: 'Dans 3 mois', icon: '📅' },
            { value: '6months', label: 'Dans 6 mois', icon: '🗓️' },
            { value: 'exploring', label: 'J\'explore mes options', icon: '🔍' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => {
                setData({ ...data, timeline: option.value });
                completeOnboarding();
              }}
              className="w-full p-4 bg-accent border-2 border-border rounded-xl hover:bg-accent/80"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{option.icon}</span>
                  <span className="font-semibold">{option.label}</span>
                </div>
                <span className="text-muted-foreground">→</span>
              </div>
            </button>
          ))}
        </div>
      )
    }
  ];
  
  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };
  
  const completeOnboarding = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    localStorage.setItem('onboardingComplete', 'true');
    localStorage.setItem('vendorData', JSON.stringify(data));
    
    onComplete(data);
    
    setTimeout(() => {
      setShowOnboarding(false);
    }, 2000);
  };
  
  if (!showOnboarding) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Étape {step + 1} sur {steps.length}</span>
            <button 
              onClick={onSkip}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Passer →
            </button>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {steps[step].title}
          </h1>
          {steps[step].content}
        </div>
        
        {step === 0 && (
          <Button
            onClick={nextStep}
            className="w-full py-6 text-lg"
            size="lg"
          >
            Commencer →
          </Button>
        )}
      </div>
    </div>
  );
};

export default VendorOnboarding;

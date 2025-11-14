import { useState } from 'react';

interface ComparisonGuideProps {
  onClose: () => void;
}

const ComparisonGuide = ({ onClose }: ComparisonGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  
  const steps = [
    {
      title: "Comparez jusqu'à 3 entreprises",
      content: "Sélectionnez les entreprises qui vous intéressent en cliquant sur la case VS",
      visual: "📊"
    },
    {
      title: "Analysez côte à côte",
      content: "Comparez prix, CA, effectifs et certifications en un coup d'œil",
      visual: "🔍"
    },
    {
      title: "Prenez la bonne décision",
      content: "Identifiez rapidement la meilleure opportunité pour vous",
      visual: "✅"
    }
  ];
  
  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('hideComparisonGuide', 'true');
    }
    onClose();
  };
  
  // Ne pas afficher si déjà vu
  if (localStorage.getItem('hideComparisonGuide') === 'true') {
    return null;
  }
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border border-border rounded-xl p-6 mb-6 relative">
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
        </svg>
      </button>
      
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="text-4xl bg-background p-3 rounded-xl shadow-sm">
          💡
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2 text-foreground">
            Nouveau : Comparateur d'entreprises
          </h3>
          
          {/* Steps carousel */}
          <div className="bg-background rounded-lg p-4 mb-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex-1 text-center ${
                    index === currentStep ? 'opacity-100' : 'opacity-30'
                  } transition-opacity`}
                >
                  <div className="text-3xl mb-2">{step.visual}</div>
                  <div className="text-xs text-muted-foreground">{index + 1}/3</div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold mb-1 text-foreground">{steps[currentStep].title}</h4>
              <p className="text-sm text-muted-foreground">{steps[currentStep].content}</p>
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-4">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="rounded"
              />
              <span className="text-muted-foreground">Ne plus afficher</span>
            </label>
            
            <div className="flex gap-2">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 text-primary hover:bg-accent rounded-lg transition-colors"
                >
                  ← Précédent
                </button>
              )}
              
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Suivant →
                </button>
              ) : (
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Compris ! ✅
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Exemple animé */}
      <div className="mt-4 p-3 bg-background rounded-lg border border-border">
        <p className="text-xs text-muted-foreground mb-2">Exemple :</p>
        <div className="flex gap-2 items-center">
          <div className="flex-1 bg-muted p-2 rounded text-center">
            <span className="text-xs text-foreground">Plomberie Paris</span>
            <span className="block text-sm font-bold text-primary">350k€</span>
          </div>
          <div className="text-xl text-muted-foreground">VS</div>
          <div className="flex-1 bg-muted p-2 rounded text-center">
            <span className="text-xs text-foreground">Élec Lyon</span>
            <span className="block text-sm font-bold text-primary">420k€</span>
          </div>
          <div className="text-xl text-muted-foreground">VS</div>
          <div className="flex-1 bg-muted p-2 rounded text-center">
            <span className="text-xs text-foreground">PAC Marseille</span>
            <span className="block text-sm font-bold text-primary">480k€</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonGuide;

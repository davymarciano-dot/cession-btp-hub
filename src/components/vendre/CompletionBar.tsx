import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock } from "lucide-react";

interface CompletionBarProps {
  currentStep: number;
  totalSteps: number;
  canPublish: boolean;
  onPublish?: () => void;
  isSubmitting?: boolean;
  montantAbonnement?: number;
}

const CompletionBar = ({ 
  currentStep, 
  totalSteps, 
  canPublish,
  onPublish,
  isSubmitting = false,
  montantAbonnement = 0
}: CompletionBarProps) => {
  const progress = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Progress Section */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-800">
                Étape {currentStep} sur {totalSteps}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                {progress}% complété
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-green-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Motivational Message */}
            {progress >= 50 && progress < 100 && (
              <p className="text-xs text-green-700 mt-2 font-medium">
                🎯 Plus que {100 - progress}% pour recevoir vos premiers acheteurs matchés !
              </p>
            )}
            
            {progress === 100 && (
              <p className="text-xs text-green-700 mt-2 font-bold">
                ✨ Félicitations ! Votre annonce est prête à être publiée
              </p>
            )}
          </div>
          
          {/* Publish Button */}
          <Button 
            onClick={onPublish}
            disabled={!canPublish || isSubmitting}
            className={`min-w-[240px] py-6 text-base font-bold transition-all ${
              canPublish && !isSubmitting
                ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                {montantAbonnement === 0 ? "Publication..." : "Redirection paiement..."}
              </>
            ) : canPublish ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                {montantAbonnement === 0 ? "Publier Gratuitement" : `Payer ${montantAbonnement}€ et Publier`}
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Compléter pour publier
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompletionBar;

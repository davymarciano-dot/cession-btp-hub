import { CheckCircle2, Circle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface FormCompletionProgressProps {
  currentStep: number;
  totalSteps: number;
  completionPercentage: number;
}

export const FormCompletionProgress = ({
  currentStep,
  totalSteps,
  completionPercentage,
}: FormCompletionProgressProps) => {
  return (
    <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">{completionPercentage}%</span>
          <span className="text-sm text-muted-foreground">complété</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Sauvegarde auto
        </div>
      </div>
      
      <Progress value={completionPercentage} className="h-3 mb-4" />
      
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">
          Étape {currentStep} sur {totalSteps}
        </span>
        <span className="text-muted-foreground">•</span>
        <span className="text-primary font-medium">
          {totalSteps - currentStep} étapes restantes
        </span>
      </div>
      
      {/* Motivation milestones */}
      {completionPercentage >= 25 && completionPercentage < 50 && (
        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-sm font-medium text-blue-800">
            🎯 Excellent départ ! Continuez, vous êtes sur la bonne voie.
          </p>
        </div>
      )}
      
      {completionPercentage >= 50 && completionPercentage < 75 && (
        <div className="mt-4 p-3 bg-green-100 rounded-lg">
          <p className="text-sm font-medium text-green-800">
            🚀 Super ! Plus que {100 - completionPercentage}% pour débloquer 3 acheteurs matchés !
          </p>
        </div>
      )}
      
      {completionPercentage >= 75 && completionPercentage < 100 && (
        <div className="mt-4 p-3 bg-orange-100 rounded-lg">
          <p className="text-sm font-medium text-orange-800">
            🔥 Presque terminé ! Vous allez bientôt recevoir vos premiers contacts.
          </p>
        </div>
      )}
      
      {completionPercentage === 100 && (
        <div className="mt-4 p-3 bg-purple-100 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-purple-600" />
          <p className="text-sm font-medium text-purple-800">
            🎉 Formulaire complet ! Votre annonce sera visible par 2000+ acheteurs.
          </p>
        </div>
      )}
    </Card>
  );
};

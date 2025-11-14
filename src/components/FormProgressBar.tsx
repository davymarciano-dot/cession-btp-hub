interface FormProgressBarProps {
  currentStep: number;
  totalSteps: number;
  saveStatus?: string;
}

export const FormProgressBar = ({ currentStep, totalSteps, saveStatus }: FormProgressBarProps) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="sticky top-0 bg-white shadow-md p-4 z-40 border-b border-gray-200 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-base font-bold text-gray-900">
            Étape {currentStep} sur {totalSteps}
          </span>
          <span className="text-sm font-semibold text-green-600">
            {percentage}% complété
          </span>
        </div>
        {saveStatus && (
          <div className="mb-3 flex items-center gap-2 text-sm text-green-600 animate-fade-in">
            <span className="inline-block w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
            {saveStatus}
          </div>
        )}
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-blue-600 to-green-500 rounded-full transition-all duration-700 ease-out shadow-lg"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

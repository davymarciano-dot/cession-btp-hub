interface FormProgressBarProps {
  currentStep: number;
  totalSteps: number;
  saveStatus?: string;
}

export const FormProgressBar = ({ currentStep, totalSteps, saveStatus }: FormProgressBarProps) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold text-gray-900">
          Étape {currentStep} sur {totalSteps}
        </span>
        {saveStatus && (
          <span className="text-sm text-green-600 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 bg-green-600 rounded-full"></span>
            {saveStatus}
          </span>
        )}
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

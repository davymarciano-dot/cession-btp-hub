interface FormCompletionIncentiveProps {
  stepsRemaining: number;
}

export const FormCompletionIncentive = ({ stepsRemaining }: FormCompletionIncentiveProps) => {
  const estimatedMinutes = Math.max(1, stepsRemaining);
  
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">⏱️</span>
        <div className="flex-1">
          <p className="text-sm text-blue-900 leading-relaxed">
            <span className="font-semibold">Temps estimé : {estimatedMinutes} minute{estimatedMinutes > 1 ? 's' : ''}</span>
            {' • '}
            <span className="font-bold">
              Vendeurs avec formulaire complet : 3x plus de contacts
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface PeriodSelectorProps {
  onPeriodChange: (period: string) => void;
  defaultPeriod?: string;
}

export const PeriodSelector = ({ onPeriodChange, defaultPeriod = '30d' }: PeriodSelectorProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);

  const periods = [
    { value: '7d', label: '7 jours' },
    { value: '30d', label: '30 jours' },
    { value: '90d', label: '3 mois' },
    { value: 'all', label: 'Tout' }
  ];

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
    onPeriodChange(value);
  };

  return (
    <div className="flex items-center gap-2 bg-background rounded-lg p-1 border">
      <Calendar className="w-4 h-4 text-muted-foreground ml-2" />
      <div className="flex gap-1">
        {periods.map(period => (
          <Button
            key={period.value}
            onClick={() => handlePeriodChange(period.value)}
            variant={selectedPeriod === period.value ? "default" : "ghost"}
            size="sm"
            className="transition-all"
          >
            {period.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

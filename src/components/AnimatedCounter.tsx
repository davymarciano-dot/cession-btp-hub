import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";

interface AnimatedCounterProps {
  target: number;
  label: string;
  duration?: number;
}

const AnimatedCounter = ({ target, label, duration = 2000 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = 50;
    const interval = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Easing function pour une animation plus naturelle
      
      setCount(Math.floor(target * easeOut));

      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(target);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 py-6 px-8 rounded-2xl shadow-lg border border-green-100 animate-fade-in">
      <TrendingUp className="h-8 w-8 text-green-600 animate-pulse" />
      <div className="text-center">
        <div className="text-4xl font-bold text-green-600 mb-1">
          {count}
        </div>
        <p className="text-sm text-gray-700 font-medium">{label}</p>
      </div>
    </div>
  );
};

export default AnimatedCounter;

import { useState, useEffect } from "react";
import { TrendingUp, Users, Target } from "lucide-react";

const StatsSection = () => {
  const [soldCount, setSoldCount] = useState(0);
  const [buyersCount, setBuyersCount] = useState(0);
  const [successRate, setSuccessRate] = useState(0);

  useEffect(() => {
    const animateValue = (
      setter: (value: number) => void,
      target: number,
      duration: number
    ) => {
      const steps = 50;
      const interval = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setter(Math.floor(target * easeOut));

        if (currentStep >= steps) {
          clearInterval(timer);
          setter(target);
        }
      }, interval);

      return timer;
    };

    const timer1 = animateValue(setSoldCount, 18, 1500);
    const timer2 = animateValue(setBuyersCount, 2000, 1500);
    const timer3 = animateValue(setSuccessRate, 95, 1500);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearInterval(timer3);
    };
  }, []);

  return (
    <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-4">
              <TrendingUp className="w-12 h-12 text-green-300" />
            </div>
            <h3 className="text-5xl font-bold mb-2">{soldCount}</h3>
            <p className="text-xl text-white/90">Entreprises vendues ce mois</p>
          </div>
          
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12 text-blue-300" />
            </div>
            <h3 className="text-5xl font-bold mb-2">{buyersCount}+</h3>
            <p className="text-xl text-white/90">Acheteurs qualifiés</p>
          </div>
          
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex justify-center mb-4">
              <Target className="w-12 h-12 text-yellow-300" />
            </div>
            <h3 className="text-5xl font-bold mb-2">{successRate}%</h3>
            <p className="text-xl text-white/90">Taux de réussite</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

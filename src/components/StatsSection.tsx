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
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-success" />
              </div>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{soldCount}</h3>
            <p className="text-muted-foreground">Entreprises vendues ce mois</p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-primary" />
              </div>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{buyersCount}+</h3>
            <p className="text-muted-foreground">Acheteurs qualifiés</p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
                <Target className="w-7 h-7 text-secondary" />
              </div>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{successRate}%</h3>
            <p className="text-muted-foreground">Taux de réussite</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

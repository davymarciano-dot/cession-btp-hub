import { Link, useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { Clock, Users, TrendingUp, Sparkles, Zap } from "lucide-react";
import { AnimatedGradient } from "./ui/animated-gradient";
import { GlassCard } from "./ui/glass-card";

export const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <AnimatedGradient variant="mesh" className="text-white py-20 min-h-[90vh] flex items-center">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl -top-40 -right-40 animate-float"></div>
        <div className="absolute w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl -bottom-40 -left-40 animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute w-[400px] h-[400px] bg-primary/15 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Success Badge */}
          <GlassCard className="inline-flex items-center px-6 py-3 mb-8 animate-scale-in">
            <Sparkles className="w-4 h-4 text-yellow-300 mr-2 animate-pulse" />
            <span className="w-2 h-2 bg-success rounded-full animate-pulse mr-3"></span>
            <span className="text-sm font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              127 ventes finalisées ce mois-ci
            </span>
          </GlassCard>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-slide-up">
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Vendez votre entreprise BTP en
            </span>
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-secondary via-secondary-400 to-secondary-600 bg-clip-text text-transparent animate-glow">
                <CountUp end={45} duration={2.5} /> jours
              </span>
              <Zap className="absolute -right-12 top-0 w-10 h-10 text-yellow-300 animate-pulse" />
            </span>
          </h1>
          
          <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">
            La seule plateforme 100% spécialisée BTP qui connecte vendeurs et acheteurs qualifiés
          </p>
          
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm">
              <strong className="font-bold">2,347 entrepreneurs</strong> nous font confiance
            </p>
          </div>
          
          {/* Double CTA with Urgency */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button 
              onClick={() => navigate('/vendre?type=seller')}
              className="group relative px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl transform hover:scale-105 transition-all inline-flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary-500 to-secondary-700 animate-shimmer"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-secondary-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 text-white flex items-center">
                Je vends maintenant
                <span className="ml-3 group-hover:translate-x-2 inline-block transition-transform">→</span>
              </span>
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse shadow-lg">
                -50% frais
              </span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            
            <GlassCard className="group px-10 py-5 cursor-pointer hover:scale-105 transition-all" hover onClick={() => navigate('/acheter?type=buyer')}>
              <div className="flex items-center justify-center text-white font-bold text-lg">
                Je cherche à reprendre
              </div>
            </GlassCard>
          </div>
          
          {/* Urgency Timer */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
              <Clock className="w-4 h-4" />
              <span>Offre limitée : Success fee 2% au lieu de 5% (encore 48h)</span>
            </div>
          </div>
          
          {/* Animated Statistics */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <GlassCard className="text-center p-6 animate-scale-in" glow>
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                <CountUp end={95} duration={2} suffix="%" />
              </div>
              <div className="text-sm font-medium flex items-center justify-center gap-2 text-white/90">
                <TrendingUp className="w-5 h-5 text-success" />
                <span>Taux de succès</span>
              </div>
            </GlassCard>
            
            <GlassCard className="text-center p-6 animate-scale-in" glow style={{ animationDelay: "0.1s" }}>
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                <CountUp end={45} duration={2} />j
              </div>
              <div className="text-sm font-medium flex items-center justify-center gap-2 text-white/90">
                <Clock className="w-5 h-5 text-secondary" />
                <span>Délai moyen</span>
              </div>
            </GlassCard>
            
            <GlassCard className="text-center p-6 animate-scale-in" glow style={{ animationDelay: "0.2s" }}>
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">2%</div>
              <div className="text-sm font-medium flex items-center justify-center gap-2 text-white/90">
                <Users className="w-5 h-5 text-primary-300" />
                <span>Success fee</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </AnimatedGradient>
  );
};

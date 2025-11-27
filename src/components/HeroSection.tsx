import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { Sparkles, Zap, TrendingUp, Award, Shield } from "lucide-react";

export const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-[95vh] overflow-hidden bg-gradient-to-br from-background via-primary-50 to-secondary-50">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(262_100%_70%/0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,hsl(280_100%_70%/0.15)_0%,transparent_50%),radial-gradient(circle_at_40%_80%,hsl(340_100%_65%/0.1)_0%,transparent_50%)]"></div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-secondary/15 to-primary/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s", animationDuration: "8s" }}></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s", animationDuration: "10s" }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Badge with glow */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-xl border border-primary/20 shadow-[0_0_30px_hsl(262_100%_70%/0.2)]">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                127 ventes finalisées ce mois-ci
              </span>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse"></div>
            </div>
          </div>

          {/* Main heading with dramatic gradient */}
          <h1 className="text-center mb-6 animate-slide-up">
            <div className="text-6xl md:text-8xl font-heading font-bold tracking-tight leading-none">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                Vendez votre
              </span>
            </div>
            <div className="text-6xl md:text-8xl font-heading font-bold tracking-tight leading-none mt-2">
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-glow">
                  entreprise BTP
                </span>
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl -z-10"></div>
              </span>
            </div>
            <div className="text-6xl md:text-8xl font-heading font-bold tracking-tight leading-none mt-2 flex items-center justify-center gap-4">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                en
              </span>
              <span className="relative inline-flex items-center">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-black">
                  <CountUp end={45} duration={2.5} />j
                </span>
                <Zap className="w-12 h-12 md:w-16 md:h-16 text-secondary ml-2 animate-pulse" fill="currentColor" />
              </span>
            </div>
          </h1>

          {/* Subheading */}
          <p className="text-center text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            La seule plateforme <span className="font-bold text-foreground">100% spécialisée BTP</span> qui connecte vendeurs et acheteurs qualifiés
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <button
              onClick={() => navigate('/vendre?type=seller')}
              className="group relative px-10 py-6 rounded-2xl text-lg font-bold overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-[0_20px_60px_hsl(262_100%_70%/0.3)] hover:shadow-[0_20px_80px_hsl(262_100%_70%/0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-shimmer"></div>
              <span className="relative z-10 text-primary-foreground flex items-center gap-2">
                Je vends maintenant
                <span className="group-hover:translate-x-2 transition-transform inline-block">→</span>
              </span>
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground text-xs font-bold px-3 py-1.5 rounded-full animate-pulse shadow-lg">
                -50% frais
              </div>
            </button>
            
            <button
              onClick={() => navigate('/entreprises?type=buyer')}
              className="group relative px-10 py-6 rounded-2xl text-lg font-bold overflow-hidden border-2 border-primary/30 bg-background/80 backdrop-blur-xl hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-2">
                Je cherche à reprendre
                <span className="group-hover:translate-x-2 transition-transform inline-block">→</span>
              </span>
            </button>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.6s" }}>
            {[
              { icon: TrendingUp, value: 95, suffix: "%", label: "Taux de succès", color: "from-emerald-500 to-emerald-600" },
              { icon: Award, value: 45, suffix: "j", label: "Délai moyen", color: "from-primary to-secondary" },
              { icon: Shield, value: 2, suffix: "%", label: "Success fee", color: "from-violet-500 to-purple-600" }
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-background to-muted/30 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_20px_60px_hsl(262_100%_70%/0.2)] hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-5xl font-heading font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    <CountUp end={stat.value} duration={2.5} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-background bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span><strong className="text-foreground">2 347</strong> entrepreneurs nous font confiance</span>
            </div>
            <div className="h-8 w-px bg-border"></div>
            <div className="text-sm text-muted-foreground">
              <strong className="text-foreground">Matching IA</strong> · <strong className="text-foreground">500+</strong> transactions · <strong className="text-foreground">95%</strong> satisfaction
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

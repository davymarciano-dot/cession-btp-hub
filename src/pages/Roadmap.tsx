import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Smartphone, Globe, Handshake, BarChart3, Target, Building2, TrendingUp, Briefcase, GraduationCap, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const roadmapData = [
  {
    phase: "Phase 1 - Q1 2025",
    quarter: "Q1 2025",
    status: "current",
    color: "primary",
    items: [
      { label: "MVP Launch", status: "completed", icon: CheckCircle2 },
      { label: "Paiements Stripe", status: "completed", icon: CheckCircle2 },
      { label: "Matching IA", status: "completed", icon: CheckCircle2 },
      { label: "App mobile React Native", status: "progress", icon: Clock },
      { label: "API publique", status: "progress", icon: Clock },
    ],
  },
  {
    phase: "Phase 2 - Q2 2025",
    quarter: "Q2 2025",
    status: "upcoming",
    color: "secondary",
    items: [
      { label: "Application iOS/Android", status: "planned", icon: Smartphone },
      { label: "Expansion internationale", status: "planned", icon: Globe },
      { label: "Partenariats banques", status: "planned", icon: Handshake },
      { label: "Analytics avancés", status: "planned", icon: BarChart3 },
      { label: "Publicité ciblée", status: "planned", icon: Target },
    ],
  },
  {
    phase: "Phase 3 - Q3 2025",
    quarter: "Q3 2025",
    status: "future",
    color: "accent",
    items: [
      { label: "CRM intégré", status: "planned", icon: Building2 },
      { label: "Trading d'entreprises", status: "planned", icon: TrendingUp },
      { label: "Services juridiques", status: "planned", icon: Briefcase },
      { label: "Academy/Formation", status: "planned", icon: GraduationCap },
      { label: "Marketplace équipements", status: "planned", icon: ShoppingCart },
    ],
  },
];

const statusConfig = {
  completed: {
    badge: "Terminé",
    variant: "default" as const,
    className: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  },
  progress: {
    badge: "En cours",
    variant: "secondary" as const,
    className: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  },
  planned: {
    badge: "Planifié",
    variant: "outline" as const,
    className: "bg-primary/5 text-primary border-primary/20",
  },
};

const Roadmap = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 text-sm px-4 py-1">
                Notre Vision
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Feuille de Route 2025
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Découvrez notre vision pour révolutionner la cession d'entreprises BTP en France. 
                Suivez nos avancées et les fonctionnalités à venir.
              </p>
            </motion.div>

            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            >
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl">8</CardTitle>
                  <CardDescription>Fonctionnalités Livrées</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '53%' }} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl">7</CardTitle>
                  <CardDescription>En Développement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '47%' }} />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl">3</CardTitle>
                  <CardDescription>Phases Planifiées</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

              <div className="space-y-12">
                {roadmapData.map((phase, phaseIndex) => (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + phaseIndex * 0.2 }}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 top-8 w-5 h-5 rounded-full bg-primary border-4 border-background hidden md:block z-10" />

                    <Card className="md:ml-20 bg-card/80 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div>
                            <CardTitle className="text-2xl mb-2">{phase.phase}</CardTitle>
                            <CardDescription className="text-base">
                              {phase.status === "current" && "🚀 Phase actuelle"}
                              {phase.status === "upcoming" && "📅 Prochainement"}
                              {phase.status === "future" && "🔮 À venir"}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="text-sm px-4 py-1">
                            {phase.quarter}
                          </Badge>
                        </div>
                      </CardHeader>
                      <Separator className="mb-4" />
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {phase.items.map((item, itemIndex) => {
                            const Icon = item.icon;
                            const config = statusConfig[item.status as keyof typeof statusConfig];
                            
                            return (
                              <motion.div
                                key={itemIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.5 + phaseIndex * 0.2 + itemIndex * 0.1 }}
                                className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                              >
                                <Icon className="w-5 h-5 mt-0.5 text-primary group-hover:scale-110 transition-transform" />
                                <div className="flex-1">
                                  <p className="font-medium text-foreground mb-1">{item.label}</p>
                                  <Badge variant={config.variant} className={config.className}>
                                    {config.badge}
                                  </Badge>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-16 text-center"
            >
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Rejoignez l'Aventure</CardTitle>
                  <CardDescription className="text-base">
                    Soyez parmi les premiers à tester nos nouvelles fonctionnalités
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/vendre" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
                  >
                    Publier une annonce
                  </a>
                  <a 
                    href="/acheter" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
                  >
                    Explorer les opportunités
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Roadmap;

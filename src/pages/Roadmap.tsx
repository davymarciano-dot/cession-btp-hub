import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Smartphone, Globe, Handshake, BarChart3, Target, Building2, TrendingUp, Briefcase, GraduationCap, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const guides = [
  {
    id: "guide-vente",
    title: "Guide : Comment vendre son entreprise BTP",
    description: "Le guide complet pour préparer et réussir la vente de votre entreprise du BTP. Étapes, conseils, pièges à éviter.",
    icon: <FileText className="h-8 w-8 text-orange-500" />,
    size: "2.5 MB",
    pages: "42 pages"
  },
  {
    id: "checklist-vendeur",
    title: "Checklist vendeur BTP",
    description: "Liste complète des documents à préparer et des étapes à suivre pour une cession réussie.",
    icon: <FileText className="h-8 w-8 text-blue-500" />,
    size: "850 KB",
    pages: "8 pages"
  },
  {
    id: "calculateur-valorisation",
    title: "Calculateur valorisation Excel",
    description: "Fichier Excel pour estimer la valeur de votre entreprise BTP selon plusieurs méthodes de valorisation.",
    icon: <Calculator className="h-8 w-8 text-green-500" />,
    size: "1.2 MB",
    pages: "Feuilles multiples"
  }
];

const outilsGratuits = [
  {
    title: "Estimateur en ligne",
    description: "Obtenez une estimation gratuite de votre entreprise BTP en 2 minutes avec notre IA",
    icon: <Calculator className="h-8 w-8 text-primary" />,
    link: "/estimer",
    type: "interne"
  },
  {
    title: "Simulateur fiscalité cession",
    description: "Calculez l'impôt sur la plus-value et optimisez la fiscalité de votre cession",
    icon: <Calculator className="h-8 w-8 text-secondary" />,
    link: "#",
    type: "externe",
    comingSoon: true
  },
  {
    title: "Modèle d'annonce de vente",
    description: "Template professionnel pour rédiger une annonce attractive et complète",
    icon: <FileText className="h-8 w-8 text-orange-500" />,
    link: "#",
    type: "externe",
    comingSoon: true
  }
];

const partenaires = [
  {
    categorie: "Avocats spécialisés",
    icon: <Briefcase className="h-10 w-10 text-blue-600" />,
    description: "Cabinets d'avocats experts en droit des affaires et transmission d'entreprise BTP",
    contacts: [
      { nom: "Cabinet Legrand & Associés", ville: "Paris", specialite: "Cession BTP", tel: "01 23 45 67 89" },
      { nom: "SCP Martin Avocat", ville: "Lyon", specialite: "Droit des sociétés", tel: "04 12 34 56 78" },
      { nom: "Maître Dubois", ville: "Marseille", specialite: "Transmission entreprise", tel: "04 91 23 45 67" }
    ]
  },
  {
    categorie: "Experts-comptables BTP",
    icon: <Calculator className="h-10 w-10 text-green-600" />,
    description: "Experts-comptables spécialisés dans le secteur du BTP et la valorisation d'entreprise",
    contacts: [
      { nom: "EC Bâtiment Conseil", ville: "Paris", specialite: "Valorisation BTP", tel: "01 34 56 78 90" },
      { nom: "Compta BTP Plus", ville: "Toulouse", specialite: "Audit & transmission", tel: "05 12 34 56 78" },
      { nom: "Cabinet Expert BTP", ville: "Bordeaux", specialite: "Expertise comptable", tel: "05 56 12 34 56" }
    ]
  },
  {
    categorie: "Banques financement reprise",
    icon: <Building2 className="h-10 w-10 text-orange-600" />,
    description: "Banques et organismes financiers spécialisés dans le financement de reprise d'entreprise",
    contacts: [
      { nom: "BNP Paribas - Pôle Transmission", ville: "National", specialite: "Crédit acquisition", tel: "0 800 123 456" },
      { nom: "Crédit Agricole Pro", ville: "National", specialite: "LBO & financement", tel: "0 800 234 567" },
      { nom: "Bpifrance", ville: "National", specialite: "Garantie transmission", tel: "0 969 370 240" }
    ]
  }
];

const handleDownload = (guideId: string, setDownloadingGuide: (id: string | null) => void) => {
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

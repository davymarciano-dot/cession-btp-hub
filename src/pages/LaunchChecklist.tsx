import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Shield, CreditCard, Mail, BarChart3, Zap, Smartphone, FileText, Target, ExternalLink, Download, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

interface ChecklistItem {
  task: string;
  done: boolean;
  link?: string;
  priority?: "high" | "medium" | "low";
}

interface ChecklistCategory {
  icon: any;
  title: string;
  color: string;
  items: ChecklistItem[];
}

const initialChecklist: Record<string, ChecklistCategory> = {
  security: {
    icon: Shield,
    title: "🔐 Sécurité",
    color: "bg-red-500",
    items: [
      { task: "Tous les secrets configurés", done: true, priority: "high" },
      { task: "HTTPS activé", done: false, link: "https://letsencrypt.org/", priority: "high" },
      { task: "CSP headers configurés", done: false, link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP", priority: "high" },
      { task: "Rate limiting activé", done: false, priority: "medium" },
      { task: "Backup automatique configuré", done: false, priority: "high" },
    ],
  },
  payments: {
    icon: CreditCard,
    title: "💳 Paiements",
    color: "bg-green-500",
    items: [
      { task: "Stripe en mode production", done: false, link: "https://stripe.com/docs/keys", priority: "high" },
      { task: "Webhooks testés", done: false, link: "https://stripe.com/docs/webhooks", priority: "high" },
      { task: "TVA configurée", done: false, link: "https://stripe.com/docs/tax", priority: "medium" },
      { task: "Factures automatiques", done: false, priority: "medium" },
    ],
  },
  communications: {
    icon: Mail,
    title: "📧 Communications",
    color: "bg-blue-500",
    items: [
      { task: "Emails transactionnels testés", done: false, link: "https://resend.com/", priority: "high" },
      { task: "SMS testés", done: false, link: "https://www.twilio.com/", priority: "medium" },
      { task: "WhatsApp configuré", done: false, link: "https://business.whatsapp.com/", priority: "low" },
      { task: "Templates validés", done: false, priority: "medium" },
    ],
  },
  analytics: {
    icon: BarChart3,
    title: "📊 Analytics",
    color: "bg-purple-500",
    items: [
      { task: "Google Analytics", done: false, link: "https://analytics.google.com/", priority: "high" },
      { task: "Hotjar/Clarity", done: false, link: "https://clarity.microsoft.com/", priority: "medium" },
      { task: "Sentry pour les erreurs", done: false, link: "https://sentry.io/", priority: "high" },
      { task: "Monitoring uptime", done: false, link: "https://uptimerobot.com/", priority: "high" },
    ],
  },
  performance: {
    icon: Zap,
    title: "🚀 Performance",
    color: "bg-amber-500",
    items: [
      { task: "Images optimisées", done: false, priority: "high" },
      { task: "Lazy loading", done: false, priority: "medium" },
      { task: "CDN configuré", done: false, link: "https://www.cloudflare.com/", priority: "medium" },
      { task: "Cache politique", done: false, priority: "medium" },
    ],
  },
  mobile: {
    icon: Smartphone,
    title: "📱 Mobile",
    color: "bg-pink-500",
    items: [
      { task: "PWA manifest", done: false, priority: "medium" },
      { task: "App icons", done: false, priority: "medium" },
      { task: "Splash screens", done: false, priority: "low" },
      { task: "Responsive testé", done: false, priority: "high" },
    ],
  },
  legal: {
    icon: FileText,
    title: "📋 Légal",
    color: "bg-indigo-500",
    items: [
      { task: "CGU rédigées", done: false, priority: "high" },
      { task: "CGV rédigées", done: false, priority: "high" },
      { task: "Politique de confidentialité", done: false, link: "https://www.cnil.fr/", priority: "high" },
      { task: "Cookies banner", done: false, priority: "high" },
      { task: "RGPD compliance", done: false, link: "https://gdpr.eu/", priority: "high" },
    ],
  },
  seo: {
    icon: Target,
    title: "🎯 SEO",
    color: "bg-cyan-500",
    items: [
      { task: "Meta tags", done: false, priority: "high" },
      { task: "Sitemap.xml", done: false, priority: "high" },
      { task: "Robots.txt", done: false, priority: "medium" },
      { task: "Schema.org", done: false, priority: "medium" },
      { task: "Open Graph tags", done: false, priority: "medium" },
    ],
  },
};

const LaunchChecklist = () => {
  const [checklist, setChecklist] = useState<Record<string, ChecklistCategory>>(initialChecklist);
  const [progress, setProgress] = useState(0);
  const [showCompleted, setShowCompleted] = useState(true);
  const [filterPriority, setFilterPriority] = useState<"all" | "high" | "medium" | "low">("all");

  // Charger depuis localStorage au montage
  useEffect(() => {
    const saved = localStorage.getItem("launchChecklist");
    if (saved) {
      try {
        setChecklist(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading checklist:", error);
      }
    }
  }, []);

  // Calculer la progression
  useEffect(() => {
    let total = 0;
    let completed = 0;

    Object.values(checklist).forEach((category) => {
      category.items.forEach((item) => {
        total++;
        if (item.done) completed++;
      });
    });

    const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
    setProgress(newProgress);
  }, [checklist]);

  // Sauvegarder dans localStorage
  const saveChecklist = (newChecklist: Record<string, ChecklistCategory>) => {
    setChecklist(newChecklist);
    localStorage.setItem("launchChecklist", JSON.stringify(newChecklist));
  };

  const toggleItem = (categoryKey: string, itemIndex: number) => {
    const newChecklist = { ...checklist };
    newChecklist[categoryKey].items[itemIndex].done = !newChecklist[categoryKey].items[itemIndex].done;
    saveChecklist(newChecklist);
    
    if (newChecklist[categoryKey].items[itemIndex].done) {
      toast.success("Tâche complétée !", {
        description: newChecklist[categoryKey].items[itemIndex].task,
      });
    }
  };

  const resetChecklist = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser toute la checklist ?")) {
      saveChecklist(initialChecklist);
      toast.info("Checklist réinitialisée");
    }
  };

  const exportProgress = () => {
    const data = JSON.stringify(checklist, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cessionbtp-launch-checklist-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    toast.success("Checklist exportée !");
  };

  const getFilteredItems = (items: ChecklistItem[]) => {
    return items.filter((item) => {
      if (!showCompleted && item.done) return false;
      if (filterPriority !== "all" && item.priority !== filterPriority) return false;
      return true;
    });
  };

  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive" className="text-xs">Urgent</Badge>;
      case "medium":
        return <Badge variant="secondary" className="text-xs">Moyen</Badge>;
      case "low":
        return <Badge variant="outline" className="text-xs">Bas</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-12 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Lock className="w-8 h-8 text-primary" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  Checklist de Lancement
                </h1>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Vérifiez que tout est prêt avant la mise en production
              </p>

              {/* Progress Bar */}
              <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{progress}%</CardTitle>
                    <Badge variant={progress === 100 ? "default" : "secondary"}>
                      {progress === 100 ? "✅ Prêt !" : "En cours"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={progress} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {progress === 100 
                      ? "Félicitations ! Tous les éléments sont vérifiés."
                      : `Encore ${100 - progress}% à compléter`}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Filters and Actions */}
            <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filterPriority === "all" ? "default" : "outline"}
                  onClick={() => setFilterPriority("all")}
                  size="sm"
                >
                  Tout
                </Button>
                <Button
                  variant={filterPriority === "high" ? "destructive" : "outline"}
                  onClick={() => setFilterPriority("high")}
                  size="sm"
                >
                  Urgent
                </Button>
                <Button
                  variant={filterPriority === "medium" ? "secondary" : "outline"}
                  onClick={() => setFilterPriority("medium")}
                  size="sm"
                >
                  Moyen
                </Button>
                <Button
                  variant={filterPriority === "low" ? "outline" : "outline"}
                  onClick={() => setFilterPriority("low")}
                  size="sm"
                >
                  Bas
                </Button>
                <Separator orientation="vertical" className="h-8" />
                <Button
                  variant="outline"
                  onClick={() => setShowCompleted(!showCompleted)}
                  size="sm"
                >
                  {showCompleted ? "Masquer" : "Afficher"} complétés
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={exportProgress}>
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </Button>
                <Button variant="outline" size="sm" onClick={resetChecklist}>
                  Réinitialiser
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(checklist).map(([key, category], categoryIndex) => {
                const Icon = category.icon;
                const filteredItems = getFilteredItems(category.items);
                
                if (filteredItems.length === 0) return null;

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${category.color} bg-opacity-10`}>
                            <Icon className={`w-5 h-5 ${category.color.replace('bg-', 'text-')}`} />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{category.title}</CardTitle>
                            <CardDescription>
                              {category.items.filter(i => i.done).length} / {category.items.length} complété
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <Separator />
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          {filteredItems.map((item, itemIndex) => {
                            const actualIndex = category.items.indexOf(item);
                            return (
                              <div
                                key={itemIndex}
                                className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                                  item.done
                                    ? "bg-green-50 dark:bg-green-950/20"
                                    : "bg-muted/30 hover:bg-muted/50"
                                }`}
                              >
                                <Checkbox
                                  checked={item.done}
                                  onCheckedChange={() => toggleItem(key, actualIndex)}
                                  className="mt-0.5"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p
                                      className={`font-medium ${
                                        item.done
                                          ? "line-through text-muted-foreground"
                                          : "text-foreground"
                                      }`}
                                    >
                                      {item.task}
                                    </p>
                                    {getPriorityBadge(item.priority)}
                                  </div>
                                  {item.link && (
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-primary hover:underline flex items-center gap-1"
                                    >
                                      Documentation
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Ready to Launch Banner */}
            {progress === 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-12"
              >
                <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                  <CardContent className="py-8 text-center">
                    <h2 className="text-3xl font-bold mb-2">🎉 Prêt pour le lancement !</h2>
                    <p className="text-lg mb-6">
                      Tous les éléments de la checklist sont complétés. Vous êtes prêt à passer en production !
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button size="lg" variant="secondary" asChild>
                        <a href="https://vercel.com/deploy" target="_blank" rel="noopener noreferrer">
                          Déployer maintenant
                        </a>
                      </Button>
                      <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20">
                        Télécharger le rapport
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LaunchChecklist;

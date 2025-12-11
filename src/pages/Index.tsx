import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Shield,
  Award,
  Target,
  Clock,
  Star,
  Building2,
  Euro,
  Zap,
  Crown,
  MessageSquare,
  BarChart3,
  FileCheck,
  Lock,
  X,
  Sparkles,
  Rocket,
  ChevronRight,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { SearchableSelect } from "@/components/SearchableSelect";
import { SearchableRegionSelect } from "@/components/SearchableRegionSelect";
import { UltraCompleteSchemas } from "@/components/seo/UltraCompleteSchemas";
import { ReviewSchema } from "@/components/seo/ReviewSchema";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [secteurFilter, setSecteurFilter] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [totalAnnonces, setTotalAnnonces] = useState(0);
  const [realAnnonces, setRealAnnonces] = useState<any[]>([]);
  const [loadingAnnonces, setLoadingAnnonces] = useState(true);
  const [notifications, setNotifications] = useState<Array<{ id: number; text: string; show: boolean }>>([]);
  const [notificationId, setNotificationId] = useState(0);

  // Récupération du nombre total d'annonces
  useEffect(() => {
    const fetchTotalAnnonces = async () => {
      try {
        const { count, error } = await supabase
          .from("annonces_public")
          .select("*", { count: 'exact', head: true });

        if (error) throw error;
        setTotalAnnonces(count || 0);
      } catch (error) {
        console.error("Erreur chargement nombre annonces:", error);
      }
    };

    fetchTotalAnnonces();
  }, []);

  // Récupération des 3 dernières annonces
  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const { data, error } = await supabase
          .from("annonces_public")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        setRealAnnonces(data || []);
      } catch (error) {
        console.error("Erreur chargement annonces:", error);
      } finally {
        setLoadingAnnonces(false);
      }
    };

    fetchAnnonces();
  }, []);

  // Notifications en temps réel
  const liveNotifications = [
    "🎉 Marc L. vient de vendre son entreprise de plomberie (Toulouse)",
    "✅ Sophie T. a reçu 3 offres d'achat (Bordeaux)",
    "🔥 Jean D. vient de s'inscrire (Lyon)",
    "💰 Entreprise RGE vendue avec +30% de valorisation (Strasbourg)",
    "⭐ Patrick M. a validé son estimation en 2 min (Nantes)",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotif = liveNotifications[Math.floor(Math.random() * liveNotifications.length)];
      const newId = notificationId + 1;

      setNotifications((prev) => [...prev, { id: newId, text: randomNotif, show: true }]);
      setNotificationId(newId);

      setTimeout(() => {
        setNotifications((prev) => prev.map((n) => (n.id === newId ? { ...n, show: false } : n)));
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== newId));
        }, 500);
      }, 6000);
    }, 10000);

    return () => clearInterval(interval);
  }, [notificationId]);

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, show: false } : n)));
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 500);
  };

  const stats = [
    { value: "500+", labelKey: "home.stats.companies", icon: TrendingUp },
    { value: "95%", labelKey: "home.stats.satisfaction", icon: Star },
    { value: "45", labelKey: "home.stats.avgTime", icon: Clock },
    { value: "2000+", labelKey: "home.stats.buyers", icon: Users },
  ];

  const features = language === 'en' ? [
    {
      icon: Sparkles,
      title: "AI Matching",
      description: "Our intelligent algorithm connects sellers and buyers with 95% compatibility.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "100% Confidential",
      description: "Guaranteed anonymity, secure dataroom and systematic NDA to protect your data.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Ultra-fast process",
      description: "Sell your business in 45 days vs 18 months on generalist platforms.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Award,
      title: "2% Success fee",
      description: "You only pay on success. Our interests are perfectly aligned.",
      color: "from-green-500 to-emerald-500",
    },
  ] : [
    {
      icon: Sparkles,
      title: "Matching IA",
      description: "Notre algorithme intelligent connecte vendeurs et acheteurs avec 95% de compatibilité.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "100% Confidentiel",
      description: "Anonymat garanti, dataroom sécurisée et NDA systématique pour protéger vos données.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Process ultra-rapide",
      description: "Vendez votre entreprise en 45 jours vs 18 mois sur les plateformes généralistes.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Award,
      title: "Success fee 2%",
      description: "Vous ne payez qu'en cas de succès. Nos intérêts sont parfaitement alignés.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const processSteps = [
    {
      number: 1,
      title: "Valorisation gratuite",
      duration: "48h",
      description: "Estimation précise par nos experts BTP",
      icon: FileCheck,
    },
    {
      number: 2,
      title: "Préparation dossier",
      duration: "5 jours",
      description: "Optimisation pour maximiser la valeur",
      icon: BarChart3,
    },
    {
      number: 3,
      title: "Matching IA",
      duration: "1 semaine",
      description: "Identification des repreneurs parfaits",
      icon: Users,
    },
    {
      number: 4,
      title: "Négociation",
      duration: "2-3 semaines",
      description: "Accompagnement par nos experts",
      icon: MessageSquare,
    },
    {
      number: 5,
      title: "Clôture sécurisée",
      duration: "1 semaine",
      description: "Finalisation juridique complète",
      icon: Lock,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>CessionBTP - Plateforme n°1 Cession & Reprise Entreprises BTP France | Vente en 45j</title>
        <meta name="description" content="1ère plateforme 100% BTP : vendez en 45 jours vs 18 mois. Matching IA, 2000+ repreneurs, 500+ transactions. Estimation IA gratuite. Success fee 2%." />
        <meta name="keywords" content="cession entreprise BTP, vendre entreprise construction, acheter entreprise bâtiment, reprise BTP France, transmission construction, plateforme BTP" />
        <link rel="canonical" href="https://cessionbtp.fr" />
      </Helmet>
      
      <UltraCompleteSchemas page="home" />
      <ReviewSchema itemName="CessionBTP - Plateforme de Cession d'Entreprises BTP" />
      <Header />

      {/* Notifications en temps réel */}
      <div className="fixed bottom-4 left-4 z-50 space-y-2 max-w-sm">
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="bg-white border-2 border-green-500 rounded-xl shadow-2xl p-4 flex items-start gap-3"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 relative">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="absolute w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-green-600 mb-1">🔴 EN DIRECT</p>
              <p className="text-sm text-gray-700">{notif.text}</p>
            </div>
            <button
              onClick={() => removeNotification(notif.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-600 to-primary-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white"
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">{language === 'en' ? "#1 Platform for BTP business transfers" : "Plateforme n°1 pour la cession d'entreprises BTP"}</span>
            </motion.div>

            {/* Titre principal */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight"
            >
              {language === 'en' ? (
                <>Buy or sell a BTP company<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">in 45 days</span></>
              ) : (
                <>Vendez ou reprenez une entreprise BTP<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">en 45 jours</span></>
              )}
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            >
              {language === 'en' 
                ? "The only 100% specialized BTP platform with AI matching, free valuation and expert support"
                : "La seule plateforme 100% spécialisée BTP avec matching IA, valorisation gratuite et accompagnement expert"
              }
            </motion.p>

            {/* Barre de recherche */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <SearchableSelect
                    value={secteurFilter}
                    onValueChange={setSecteurFilter}
                    placeholder="Secteur d'activité"
                  />
                </div>
                
                <div className="flex-1">
                  <SearchableRegionSelect
                    value={regionFilter}
                    onValueChange={setRegionFilter}
                    placeholder="Localisation"
                  />
                </div>
                
                <Button 
                  onClick={() => navigate('/entreprises')}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 rounded-xl shadow-lg"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Search' : 'Rechercher'}
                </Button>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Button 
                onClick={() => navigate('/vendre')}
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 font-bold px-10 py-7 text-lg rounded-xl shadow-xl"
              >
                {t("home.hero.sellCta")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={() => navigate('/entreprises')}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-bold px-10 py-7 text-lg rounded-xl"
              >
                {language === 'en' ? 'View companies' : 'Voir les entreprises'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-8 h-8 text-orange-400" />
                  </div>
                  <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/70">{t(stat.labelKey)}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Pourquoi CessionBTP */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-semibold">
              Pourquoi nous choisir
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              La différence CessionBTP
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une plateforme pensée par des experts BTP pour des professionnels du BTP
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-semibold">
              Process simplifié
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un processus éprouvé sur 500+ transactions
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-orange-500 to-green-500 hidden md:block" />

              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex items-start gap-8"
                  >
                    {/* Number badge */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg z-10">
                      {step.number}
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <step.icon className="w-6 h-6 text-primary" />
                          <h3 className="text-2xl font-bold">{step.title}</h3>
                        </div>
                        <Badge variant="secondary" className="font-semibold">
                          {step.duration}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-lg">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => navigate("/estimer")}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold px-10 py-7 text-lg rounded-xl shadow-xl"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Démarrer mon estimation gratuite
            </Button>
          </div>
        </div>
      </section>

      {/* Opportunités à saisir */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-semibold">
              Dernières opportunités
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Entreprises BTP à reprendre
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {totalAnnonces > 0 ? `${totalAnnonces} entreprises disponibles` : "Découvrez nos opportunités exclusives"}
            </p>
          </div>

          {loadingAnnonces ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
              <p className="text-muted-foreground text-lg">Chargement des opportunités...</p>
            </div>
          ) : realAnnonces.length === 0 ? (
            <div className="text-center py-20 bg-muted/30 rounded-3xl max-w-2xl mx-auto">
              <Building2 className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
              <p className="text-xl text-muted-foreground mb-6">Aucune annonce disponible pour le moment</p>
              <Button onClick={() => navigate("/vendre")} size="lg" className="bg-primary hover:bg-primary/90">
                <Rocket className="w-5 h-5 mr-2" />
                Publier la première annonce
              </Button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
                {realAnnonces.map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => navigate(`/annonce/${annonce.id}`)}
                    className="group relative bg-card border border-border rounded-2xl p-6 hover:shadow-2xl hover:border-primary transition-all cursor-pointer overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                          {annonce.secteur_activite || "BTP"}
                        </Badge>
                        <Badge variant="secondary" className="font-semibold">
                          Nouveau
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                        {annonce.raison_sociale || "Entreprise BTP"}
                      </h3>

                      {/* Details */}
                      <div className="space-y-3 mb-6 text-muted-foreground">
                        {annonce.ville && (
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            <span className="text-sm">
                              {annonce.ville} {annonce.departement && `(${annonce.departement})`}
                            </span>
                          </div>
                        )}
                        {annonce.annee_creation && (
                          <div className="text-sm">Création : {annonce.annee_creation}</div>
                        )}
                        {annonce.ca_n1 && (
                          <div className="text-sm font-semibold">
                            CA : {parseInt(annonce.ca_n1).toLocaleString("fr-FR")} €
                          </div>
                        )}
                        {annonce.nombre_salaries && (
                          <div className="text-sm">
                            {annonce.nombre_salaries} salarié{parseInt(annonce.nombre_salaries) > 1 ? "s" : ""}
                          </div>
                        )}
                      </div>

                      {/* Price */}
                      <div className="pt-4 border-t border-border flex items-center justify-between">
                        <div className="text-3xl font-black text-primary">
                          {annonce.prix_vente
                            ? `${parseInt(annonce.prix_vente).toLocaleString("fr-FR")} €`
                            : "Prix sur demande"}
                        </div>
                        <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <Button
                  onClick={() => navigate("/entreprises")}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-10 py-7 text-lg rounded-xl shadow-xl"
                >
                  Voir toutes les opportunités
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                Prêt à passer à l'action ?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Rejoignez les 500+ entrepreneurs qui nous ont fait confiance
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                onClick={() => navigate('/vendre')}
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 font-bold px-12 py-8 text-xl rounded-xl shadow-2xl"
              >
                <Crown className="w-6 h-6 mr-2" />
                Vendre mon entreprise
              </Button>
              <Button 
                onClick={() => navigate('/estimer')}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-bold px-12 py-8 text-xl rounded-xl"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                Estimation gratuite
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

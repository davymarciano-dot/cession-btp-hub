import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState<Array<{ id: number; text: string; show: boolean }>>([]);
  const [notificationId, setNotificationId] = useState(0);

  // 🔥 NOTIFICATIONS EN TEMPS RÉEL - EN BAS À GAUCHE
  const liveNotifications = [
    "🎉 Marc L. vient de vendre son entreprise de plomberie (Toulouse)",
    "✅ Sophie T. a reçu 3 offres d'achat (Bordeaux)",
    "🔥 Jean D. vient de s'inscrire (Lyon)",
    "💰 Entreprise RGE vendue avec +30% de valorisation (Strasbourg)",
    "⭐ Patrick M. a validé son estimation en 2 min (Nantes)",
    "🎯 Nouvelle offre reçue pour une société de chauffage (Lille)",
    "👏 4 acheteurs intéressés par une société d'électricité (Nice)",
    "🚀 Entreprise d'électricité vendue en 1,2M€ (Nice)",
    "💼 Repreneur qualifié vient de s'inscrire (Bordeaux)",
    "🏆 Vente finalisée en 38 jours (Toulouse)",
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
    { value: "95%", label: "Taux de réussite" },
    { value: "45j", label: "Délai moyen" },
    { value: "2%", label: "Honoraires de succès" },
  ];

  const trustLogos = [
    { name: "BPI France", icon: "🏛️" },
    { name: "CCI", icon: "🏛️" },
    { name: "FFB", icon: "🏗️" },
    { name: "Qualibat", icon: "✓" },
  ];

  const opportunities = [
    {
      badge: "QUALIBAT",
      status: "Récent",
      title: "Entreprise de Maçonnerie Générale",
      location: "Paris (75)",
      year: "2015",
      ca: "1 200 000 €",
      employees: "8 salariés",
      price: "450 000 €",
      color: "orange",
    },
    {
      badge: "QUALIBAT",
      status: "Récent",
      title: "Société de Plomberie-Chauffage",
      location: "Lyon (69)",
      year: "2015",
      ca: "800 000 €",
      employees: "5 salariés",
      price: "430 000 €",
      color: "blue",
    },
    {
      badge: "QUALIBAT",
      status: "Récent",
      title: "Électricité Générale & Domotique",
      location: "Marseille (13)",
      year: "2015",
      ca: "950 000 €",
      employees: "6 salariés",
      price: "580 000 €",
      color: "blue",
    },
  ];

  const buyerPlans = [
    {
      name: "Gratuit",
      price: "0€",
      features: ["Consultation des annonces", "Recherche basique", "Interface acheteur", "Inscription gratuite"],
      cta: "S'inscrire gratuitement",
      popular: false,
    },
    {
      name: "Contact",
      price: "49€",
      period: "/ 5 contacts",
      features: [
        "5 contacts directs",
        "Messages dirigés vers les vendeurs",
        "Coordonnées complètes",
        "Historique des échanges",
        "Accès prioritaire",
      ],
      cta: "Acheter des contacts",
      popular: false,
    },
    {
      name: "Pro",
      price: "99€",
      period: "/mois",
      features: [
        "Contacts ILLIMITÉS",
        "Alertes personnalisées",
        "Coordonnées complètes",
        "Badge « Acheteur Vérifié »",
        "Soutien prioritaire",
      ],
      cta: "Choisir Pro",
      popular: true,
    },
    {
      name: "Entreprise",
      price: "299€",
      period: "/mois",
      features: [
        "Multi-utilisateurs + API - Cible : 500€ - CA : 1,8M",
        "Accès multi-utilisateurs",
        "API d'intégration",
        "Rapports avancés",
        "Gestionnaire dédié",
        "Équipe de formation",
      ],
      cta: "Choisir Entreprise",
      popular: false,
    },
  ];

  const sellerPlans = [
    {
      name: "Découverte",
      subtitle: "30j gratuits",
      price: "0€",
      description: "Évaluation + 10 vues - Cible : 10 000€ - CA : 0",
      features: ["Évaluation incluse", "10 vues d'annonce", "Interface spécialisée BTP", "Expert en soutien métier"],
      cta: "Commencez gratuitement",
      color: "gray",
    },
    {
      name: "Essentiel",
      price: "290€",
      period: "/ 3 mois",
      description: "Annonce simple - Cible : 5 000€ - CA : 5,9M",
      features: [
        "Annonce simple optimisée",
        "Contacts qualifiés BTP",
        "Interface professionnelle",
        "Expert en soutien",
        "Réseau artisans entrepreneurs",
      ],
      cta: "Choisir Essentiel",
      color: "blue",
      popular: true,
    },
    {
      name: "Prime",
      price: "490€",
      period: "/ 3 mois",
      description: "Mise en avant + stats - Cible : 2 000€ - CA : 3,9M",
      features: [
        "Mise en avant prioritaire",
        "Statistiques détaillées",
        "Valorisation BTP incluse",
        "accompagnateur expert dédié",
        "Vendez 2x plus vite",
      ],
      cta: "Choisir Premium",
      color: "orange",
    },
    {
      name: "Exclusif",
      price: "990 €",
      period: "/ 3 mois",
      description: "Top position + agent - Cible : 500€ - CA : 2M",
      features: [
        "Garantie de position de premier ordre",
        "Personnel dédié aux agents",
        "Mémorandum professionnel",
        "Garantie mise en relation",
        "Conciergerie complète",
      ],
      cta: "Choisir Exclusif",
      color: "gold",
    },
  ];

  const whyChooseUs = [
    {
      icon: "💰",
      title: "Expertise en valorisation",
      description: "Évaluation précise par des experts BTP. Méthode éprouvée sur 500+ transactions.",
    },
    {
      icon: "🤖",
      title: "Correspondance IA 95%",
      description: "Notre algorithme connecte vendeurs et acheteurs avec 95% de compatibilité.",
    },
    {
      icon: "🔒",
      title: "100% Confidentiel",
      description: "Anonymat garanti. Dataroom sécurisée. NDA systématique.",
    },
    {
      icon: "💎",
      title: "Honoraires de succès 2%",
      description: "Vous ne payez qu'en cas de succès. Nos intérêts sont alignés.",
    },
  ];

  const processSteps = [
    {
      number: 1,
      title: "Valorisation gratuite",
      duration: "48h",
      description: "Obtenez une estimation précise de votre entreprise en 48h par nos experts BTP.",
    },
    {
      number: 2,
      title: "Préparation du Dossier",
      duration: "5 jours",
      description: "Nous optimisons votre dossier pour maximiser la valeur et attirer les meilleurs repreneurs.",
    },
    {
      number: 3,
      title: "Mise en relation",
      duration: "1 semaine",
      description: "Notre IA identifie les repreneurs parfaits parmi notre base de 2000+ acheteurs qualifiés.",
    },
    {
      number: 4,
      title: "Négociation",
      duration: "2-3 semaines",
      description: "Nos experts négociants pour vous les meilleures conditions de vente.",
    },
    {
      number: 5,
      title: "Clôture sécurisée",
      duration: "1 semaine",
      description: "Finalisation juridique et transfert en toute sécurité avec nos avocats spécialisés.",
    },
  ];

  const testimonials = [
    {
      name: "Marc Lefebvre",
      company: "Plomberie-Chauffage ML",
      location: "Toulouse (31)",
      sector: "Plomberie-Chauffage",
      ca: "580 000 €",
      rating: 5,
      text: "J'ai d'abord essayé une plateforme généraliste à 250€. 9 mois perdus, 0 contact sérieux. Avec CessionBTP, vendu en 38 jours à un repreneur parfait. Le meilleur investissement de ma vie.",
    },
    {
      name: "Sophie Durand",
      company: "Maçonnerie Générale SD",
      location: "Lyon (69)",
      sector: "Maçonnerie",
      ca: "480 000 €",
      rating: 5,
      text: "L'algorithme de matching m'a connecté avec 3 acheteurs ultra-qualifiés. Négociation rapide. 127 vues, 8 contacts sérieux, 2 offres fermes. Impressionnant !",
    },
    {
      name: "Jean-Pierre Martin",
      company: "Électricité Industrielle JPM",
      location: "Marseille (13)",
      sector: "Électricité",
      ca: "920 000 €",
      rating: 5,
      text: "Le tableau de bord m'a permis de suivre l'intérêt en temps réel. 127 vues, 8 contacts sérieux, 2 offres fermes. Vendu au meilleur prix !",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* 🔥 NOTIFICATIONS EN TEMPS RÉEL - EN BAS À GAUCHE */}
      <div className="fixed bottom-4 left-4 z-50 space-y-2 max-w-sm">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`bg-white border-2 border-green-500 rounded-xl shadow-2xl p-4 flex items-start gap-3 transition-all duration-500 transform ${
              notif.show ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            }`}
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
          </div>
        ))}
      </div>

      {/* HERO SECTION - Bleu gradient */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge ventes */}
            <div className="inline-block mb-6">
              <div className="bg-blue-500/30 backdrop-blur-sm border border-blue-400/50 rounded-full px-6 py-2">
                <p className="text-sm font-medium">🎉 127 ventes finalisées ce mois-ci</p>
              </div>
            </div>

            {/* Titre principal */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Vendez votre entreprise
              <br />
              BTP en <span className="text-orange-400">jours 45</span>
            </h1>

            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              La seule plateforme 100% spécialisée BTP qui connecte vendeurs et acheteurs qualifiés
            </p>

            {/* Trust badges avec avatars */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-xs font-bold">
                  UA
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-300 border-2 border-white flex items-center justify-center text-xs font-bold">
                  B
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-xs font-bold">
                  C
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold">
                  D
                </div>
                <div className="w-10 h-10 rounded-full bg-orange-400 border-2 border-white flex items-center justify-center text-xs font-bold">
                  E
                </div>
              </div>
              <p className="text-sm font-medium">
                <span className="font-bold">2 347 entrepreneurs</span> nous font confiance
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                onClick={() => navigate("/vendre")}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                Je vends maintenant →
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -50% frais
                </div>
              </Button>

              <Button
                onClick={() => navigate("/acheter")}
                size="lg"
                variant="outline"
                className="bg-white text-blue-600 border-2 border-white hover:bg-blue-50 px-8 py-6 text-lg font-semibold rounded-xl shadow-xl"
              >
                Je cherche à reprendre
              </Button>
            </div>

            {/* Alerte offre limitée */}
            <div className="inline-flex items-center gap-2 bg-red-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-full">
              <Clock className="w-5 h-5" />
              <p className="text-sm font-medium">
                Offre limitée : Honoraires de réussite <strong>2% au lieu de 5%</strong> (encore 48h)
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* SECTION CONFIANCE */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-gray-600 font-medium">Ils nous font confiance</p>
          </div>

          {/* Logos */}
          <div className="flex justify-center items-center gap-12 mb-8 flex-wrap">
            {trustLogos.map((logo, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl mb-2">
                  {logo.icon}
                </div>
                <p className="text-sm font-medium text-gray-700">{logo.name}</p>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Certifié</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Confidentiel</span>
            </div>
          </div>
        </div>
      </section>

      {/* OPPORTUNITÉS À SAISIR */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Opportunités à Saisir</h2>
            <p className="text-xl text-gray-600">Découvrez les dernières entreprises BTP disponibles à la reprise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {opportunities.map((opp, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${
                  opp.color === "orange"
                    ? "bg-gradient-to-br from-orange-500 to-orange-600"
                    : "bg-gradient-to-br from-blue-500 to-blue-600"
                } text-white relative overflow-hidden group`}
              >
                {/* Badges */}
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                    {opp.badge}
                  </div>
                  <div className="bg-orange-500 px-3 py-1 rounded-full text-xs font-bold">{opp.status}</div>
                </div>

                {/* Titre */}
                <h3 className="text-2xl font-bold mb-4">{opp.title}</h3>

                {/* Infos */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4" />
                    <span>{opp.location}</span>
                  </div>
                  <div className="text-sm">Création : {opp.year}</div>
                  <div className="text-sm">CA : {opp.ca}</div>
                  <div className="text-sm">Effectif : {opp.employees}</div>
                </div>

                {/* Secteur badge */}
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg mb-4">
                  <span className="text-sm font-medium capitalize">
                    {opp.color === "orange" ? "Maçonnerie" : "Plomberie"}
                  </span>
                </div>

                {/* Prix */}
                <div className="pt-4 border-t border-white/20">
                  <div className="text-4xl font-bold text-green-300">{opp.price}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate("/entreprises")}
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8"
            >
              Voir toutes les opportunités
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* TARIFS ACHETEURS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">🔍</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">acheteurs d'abonnements</h2>
            <p className="text-xl text-gray-600">Accédez aux meilleures opportunités d'acquisition BTP</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {buyerPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 border-2 transition-all ${
                  plan.popular
                    ? "border-blue-500 bg-blue-50 shadow-xl scale-105 relative"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">POPULAIRE</div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                    {plan.period && <span className="text-gray-500 text-sm">{plan.period}</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARATIF TABLEAU */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
                <h2 className="text-3xl font-bold text-white text-center">
                  Comparaison honnête avec les plateformes généralistes
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="p-4 text-left font-semibold text-gray-700">Critère</th>
                      <th className="p-4 text-center font-semibold text-gray-700">Sites généralistes</th>
                      <th className="p-4 text-center font-semibold text-blue-700 bg-blue-50">CessionBTP ✓</th>
                      <th className="p-4 text-center font-semibold text-gray-700">Exemples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-medium">Prix</td>
                      <td className="p-4 text-center">250€/an (12 mois)</td>
                      <td className="p-4 text-center bg-blue-50 font-bold text-blue-700">290€ (3 mois)</td>
                      <td className="p-4 text-center text-sm">BPI France Transmission, Fusacq</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-green-50">
                      <td className="p-4 font-medium">Coût mensuel</td>
                      <td className="p-4 text-center">21€</td>
                      <td className="p-4 text-center bg-blue-50 font-bold text-blue-700">97€</td>
                      <td className="p-4 text-center">-</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-medium">Délai moyen de vente</td>
                      <td className="p-4 text-center">18-24 mois 🐌</td>
                      <td className="p-4 text-center bg-blue-50 font-bold text-green-600">45 jours ⚡</td>
                      <td className="p-4 text-center">-</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-medium">Spécialisation</td>
                      <td className="p-4 text-center">Tous secteurs</td>
                      <td className="p-4 text-center bg-blue-50 font-bold text-blue-700">100 % BTP et ENR</td>
                      <td className="p-4 text-center">-</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-medium">Entrepreneurs actifs</td>
                      <td className="p-4 text-center">Grand public</td>
                      <td className="p-4 text-center bg-blue-50 font-bold text-blue-700">Plus de 2000 BTP qualifiés</td>
                      <td className="p-4 text-center">-</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-medium">Valorisation</td>
                      <td className="p-4 text-center">Non inclus (+500€)</td>
                      <td className="p-4 text-center bg-blue-50 font-bold text-green-600">✓ Inclus</td>
                      <td className="p-4 text-center">-</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-medium">Soutien</td>
                      <td className="p-4 text-center">Courriel générique</td>
                      <td className="p-4 text-center bg-blue-50 font-bold text-blue-700">Expert BTP dédié</td>
                      <td className="p-4 text-center">-</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="p-4 font-bold">Honoraires de succès</td>
                      <td className="p-4 text-center">Forfait</td>
                      <td className="p-4 text-center bg-blue-100 font-bold text-blue-700">2% seulement</td>
                      <td className="p-4 text-center">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border-t-4 border-blue-500 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900 mb-2">Le vrai calcul :</p>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Généralistes :</span> 250€ + 500€ de valorisation + 18 mois
                      d'attente = <span className="text-red-600 font-bold">750€ et 540 jours perdus</span>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">CessionBTP :</span> 290€ tout compris + 45 jours ={" "}
                      <span className="text-green-600 font-bold">VENDU ✓</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Témoignage en dessous */}
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl">💬</div>
                </div>
                <div className="flex-1">
                  <p className="text-lg italic mb-4">
                    "J'ai d'abord essayé une plateforme généraliste à 250€. 9 mois perdus, 0 contact sérieux. Avec
                    CessionBTP, vendu en 38 jours à un repreneur parfait. Le meilleur investissement de ma vie."
                  </p>
                  <p className="font-semibold">- Témoignage vérifié d'un entrepreneur BTP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TARIFS VENDEURS */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <Button
              onClick={() => navigate("/estimateur")}
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 text-lg font-bold rounded-xl shadow-xl"
            >
              💰 COMMENCER MON ESTIMATION GRATUITE
            </Button>
          </div>

          <div className="text-center mb-12 mt-12">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">🏗️</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Abonnements vendeurs</h2>
            <p className="text-xl text-gray-600">Choisissez la formule adaptée à vos besoins de transmission</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {sellerPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 border-2 transition-all ${
                  plan.popular
                    ? "border-blue-500 bg-white shadow-xl scale-105 relative"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-lg bg-white"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">POPULAIRE</div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                  {plan.subtitle && <p className="text-sm text-gray-500 mb-3">{plan.subtitle}</p>}
                  <div className="flex items-baseline gap-1 mb-2">
                    <span
                      className={`text-4xl font-bold ${
                        plan.color === "blue"
                          ? "text-blue-600"
                          : plan.color === "orange"
                            ? "text-orange-600"
                            : plan.color === "gold"
                              ? "text-yellow-600"
                              : "text-gray-600"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && <span className="text-gray-500 text-sm">{plan.period}</span>}
                  </div>
                  <p className="text-xs text-gray-500">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => navigate("/vendre")}
                  className={`w-full ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI CHOISIR CESSIONBTP */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi choisir CessionBTP</h2>
            <p className="text-xl text-gray-600">
              La plateforme la plus complète pour vendre ou acheter une entreprise BTP
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HONORAIRES DE SUCCÈS */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">🎉</span>
              </div>
            </div>

            <h2 className="text-5xl font-bold text-gray-900 mb-6">Honoraires de succès transparents</h2>

            <div className="bg-white rounded-3xl p-12 shadow-2xl mb-8">
              <div className="text-center mb-8">
                <div className="text-8xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-4">
                  2%
                </div>
                <p className="text-2xl text-gray-700">Seulement en cas de vente réussie</p>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Exemple concret :</h3>
                <div className="space-y-2 text-left max-w-2xl mx-auto">
                  <p className="text-lg">
                    Vente <span className="font-bold text-blue-600">500 000 €</span> ={" "}
                    <span className="font-bold text-green-600">10 000 € de commission</span>
                  </p>
                  <p className="text-sm text-gray-600">(vs 25 000€ à 40 000€ chez les concurrents)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE - 5 ÉTAPES */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">🚀</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comment ça marche</h2>
            <p className="text-xl text-gray-600">Un processus simple et efficace en 5 étapes</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>

                <div className="flex-1 bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS + TÉMOIGNAGES */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">2 847</div>
              <div className="text-blue-200">Entreprises disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">543</div>
              <div className="text-blue-200">Ventes réussies</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">2 347</div>
              <div className="text-blue-200">Entrepreneurs actifs</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">45 jours</div>
              <div className="text-blue-200">Délai moyen de vente</div>
            </div>
          </div>

          {/* Badge 4,9/5 */}
          <div className="text-center mb-12">
            <div className="inline-block bg-orange-500 px-6 py-3 rounded-full">
              <p className="font-bold">⭐ 4,9/5 - Plus de 250 avis</p>
            </div>
          </div>

          {/* Titre témoignages */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Ils ont vendu en moins de 45 jours</h2>
            <p className="text-xl text-blue-200">
              Des résultats concrets, des vendeurs satisfaits. Rejoignez les 500+ entrepreneurs qui nous ont fait
              confiance.
            </p>
          </div>

          {/* Témoignages cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-gray-900 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-blue-600">{testimonial.company}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <span>Secteur</span>
                  </div>
                  <p className="font-medium">{testimonial.sector}</p>
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <span>CA annuel</span>
                  </div>
                  <p className="font-medium">{testimonial.ca}</p>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-sm text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Prêt à vendre votre entreprise BTP ?</h2>
          <p className="text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Estimation gratuite • Accompagnement expert • Résultats garantis
          </p>

          <Button
            onClick={() => navigate("/estimateur")}
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-8 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
          >
            🔥 COMMENCER MON ESTIMATION
          </Button>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Restez Informé des Opportunités BTP</h2>
            <p className="text-gray-400 mb-8">
              Recevez chaque semaine les meilleures offres de cession et nos analyses sectorielles.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email professionnel"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 border-2 border-gray-700 focus:border-blue-500 focus:outline-none"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold">S'abonner</Button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <p className="text-sm text-gray-400">Pas de spam - Désabonnement facile</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER TRUST BADGES */}
      <section className="py-8 bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-12 text-gray-400">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span className="text-sm">Experts certifiés</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span className="text-sm">Données sécurisées RGPD</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Site sécurisé SSL</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* 🎨 ANIMATIONS CSS */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in-left 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;

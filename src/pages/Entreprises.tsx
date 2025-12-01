import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { 
  Building2, MapPin, Users, TrendingUp, Heart, Share2, 
  Zap, Award, Clock, Euro, ChevronRight, Filter, X,
  Star, Sparkles, Flame, CheckCircle2, AlertCircle, Activity
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import { useNavigate } from "react-router-dom";
import LiveStatsWidget from "@/components/LiveStatsWidget";

// Import métier images
import plomberieImg from "@/assets/metiers/plomberie.jpg";
import electriciteImg from "@/assets/metiers/electricite.jpg";
import maconnerieImg from "@/assets/metiers/maconnerie.jpg";
import renovationImg from "@/assets/metiers/renovation.jpg";
import terrassementImg from "@/assets/metiers/terrassement.jpg";
import peintureImg from "@/assets/metiers/peinture.jpg";
import charpenteImg from "@/assets/metiers/charpente.jpg";
import chauffageImg from "@/assets/metiers/chauffage.jpg";
import photovoltaiqueImg from "@/assets/metiers/photovoltaique.jpg";
import isolationImg from "@/assets/metiers/isolation.jpg";

interface Annonce {
  id: string;
  raison_sociale: string | null;
  secteur_activite: string;
  ville: string;
  departement: string;
  annee_creation: number;
  ca_n1: number;
  nombre_salaries: number;
  prix_vente: number;
  description_activite: string;
  certifications: any;
  created_at: string;
}

const METIERS_CARDS = [
  { icon: "🏗️", label: "Gros œuvre", color: "from-blue-500 to-blue-600", count: 42 },
  { icon: "⚡", label: "Électricité", color: "from-yellow-500 to-orange-500", count: 38 },
  { icon: "🔧", label: "Plomberie", color: "from-cyan-500 to-blue-500", count: 27 },
  { icon: "🎨", label: "Finitions", color: "from-purple-500 to-pink-500", count: 19 },
  { icon: "☀️", label: "Énergies", color: "from-green-500 to-emerald-600", count: 31 },
  { icon: "❄️", label: "Climatisation", color: "from-indigo-500 to-blue-600", count: 24 },
];

const QUICK_PICKS = [
  { label: "< 300K€", filter: "budget-low", icon: "💸" },
  { label: "Deals rapides", filter: "quick", icon: "⚡" },
  { label: "Premium", filter: "premium", icon: "💎" },
  { label: "Nouveautés", filter: "new", icon: "🆕" },
];

// Images par métier
const METIER_IMAGES: Record<string, string> = {
  "Plomberie": plomberieImg,
  "Plomberie sanitaire": plomberieImg,
  "Électricité": electriciteImg,
  "Électricité générale": electriciteImg,
  "Maçonnerie": maconnerieImg,
  "Gros œuvre": maconnerieImg,
  "Isolation": isolationImg,
  "Isolation thermique": isolationImg,
  "Terrassement": terrassementImg,
  "Peinture": peintureImg,
  "Peinture intérieure": peintureImg,
  "Peinture extérieure": peintureImg,
  "Charpente": charpenteImg,
  "Chauffage": chauffageImg,
  "Installation de chauffage": chauffageImg,
  "Climatisation": chauffageImg,
  "Photovoltaïque": photovoltaiqueImg,
  "Panneaux solaires": photovoltaiqueImg,
  "Énergies renouvelables": photovoltaiqueImg,
  "Rénovation": renovationImg,
  "Tous corps d'état": renovationImg,
  "default": renovationImg
};

// Badges variés
const BADGE_VARIANTS = [
  { label: "🆕 Nouveau", color: "bg-red-500", textColor: "text-white" },
  { label: "🔥 Tendance", color: "bg-orange-500", textColor: "text-white" },
  { label: "💎 Premium", color: "bg-purple-600", textColor: "text-white" },
  { label: "⚡ Rapide", color: "bg-yellow-500", textColor: "text-white" },
  { label: "💰 Deal", color: "bg-green-500", textColor: "text-white" },
  { label: "🏆 Top", color: "bg-gradient-to-r from-yellow-400 to-orange-500", textColor: "text-white" },
];

const Entreprises = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetier, setSelectedMetier] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [budgetRange, setBudgetRange] = useState<number[]>([0, 5000000]);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [activeQuickPick, setActiveQuickPick] = useState<string>("");

  useEffect(() => {
    fetchAnnonces();
  }, []);

  const fetchAnnonces = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("annonces_public")
        .select("*");

      if (error) throw error;
      setAnnonces(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const toggleComparison = (id: string) => {
    if (selectedForComparison.includes(id)) {
      setSelectedForComparison(prev => prev.filter(c => c !== id));
    } else if (selectedForComparison.length < 3) {
      setSelectedForComparison(prev => [...prev, id]);
    } else {
      toast({
        title: "Limite atteinte",
        description: "Maximum 3 entreprises pour comparaison",
        variant: "destructive"
      });
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `${(price / 1000000).toFixed(1)}M€`;
    if (price >= 1000) return `${(price / 1000).toFixed(0)}K€`;
    return `${price}€`;
  };

  const getMetierImage = (secteur: string): string => {
    for (const key in METIER_IMAGES) {
      if (secteur.toLowerCase().includes(key.toLowerCase())) {
        return METIER_IMAGES[key];
      }
    }
    return METIER_IMAGES.default;
  };

  // Exemple d'annonces pour la démo
  const displayedAnnonces = annonces.length > 0 ? annonces : [
    {
      id: "exemple-1",
      raison_sociale: "Entreprise Générale du Bâtiment",
      secteur_activite: "Tous corps d'état",
      ville: "Nice",
      departement: "06",
      annee_creation: 1995,
      ca_n1: 2800000,
      nombre_salaries: 22,
      prix_vente: 1850000,
      description_activite: "Entreprise générale spécialisée rénovation haut de gamme",
      certifications: ["RGE", "Qualibat"],
      created_at: new Date().toISOString()
    },
    {
      id: "exemple-2",
      raison_sociale: "Isolation Pro",
      secteur_activite: "Isolation thermique",
      ville: "Lyon",
      departement: "69",
      annee_creation: 2010,
      ca_n1: 542000,
      nombre_salaries: 8,
      prix_vente: 420000,
      description_activite: "Spécialiste isolation thermique et acoustique",
      certifications: ["RGE"],
      created_at: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: "exemple-3",
      raison_sociale: "Plomberie Services Plus",
      secteur_activite: "Plomberie sanitaire",
      ville: "Paris",
      departement: "75",
      annee_creation: 2008,
      ca_n1: 1200000,
      nombre_salaries: 12,
      prix_vente: 980000,
      description_activite: "Plomberie, chauffage et climatisation",
      certifications: [],
      created_at: new Date(Date.now() - 172800000).toISOString()
    }
  ];

  const featuredListing = displayedAnnonces[0];
  const regularListings = displayedAnnonces.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEOHead page="entreprises" />
      <Header />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGgzNnYzNkgzNnptMC0zNmgzNnYzNkgzNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl font-black text-white mb-4">
              🏗️ Trouvez VOTRE Entreprise BTP
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Des opportunités exceptionnelles vous attendent
            </p>

            {/* Chiffres animés */}
            <div className="flex justify-center gap-12 mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-5xl font-black text-white">187</div>
                <div className="text-blue-200">opportunités</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-5xl font-black text-white">45j</div>
                <div className="text-blue-200">délai moyen</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="text-5xl font-black text-white">95%</div>
                <div className="text-blue-200">satisfaction</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Cards métiers */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {METIERS_CARDS.map((metier, idx) => (
              <motion.button
                key={metier.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMetier(metier.label)}
                className={`relative p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all group ${
                  selectedMetier === metier.label ? 'ring-4 ring-white' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${metier.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>
                <div className="text-5xl mb-2">{metier.icon}</div>
                <div className="font-bold text-gray-900 text-sm">{metier.label}</div>
                <Badge className="mt-2 bg-blue-100 text-blue-700 hover:bg-blue-200">
                  {metier.count}
                </Badge>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FILTRES HORIZONTAUX */}
      <section className="sticky top-0 z-40 bg-white border-b shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Quick Picks */}
            <div className="flex gap-2 flex-wrap">
              {QUICK_PICKS.map((pick) => (
                <Button
                  key={pick.filter}
                  variant={activeQuickPick === pick.filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveQuickPick(pick.filter === activeQuickPick ? "" : pick.filter)}
                  className="rounded-full"
                >
                  <span className="mr-1">{pick.icon}</span>
                  {pick.label}
                </Button>
              ))}
            </div>

            <div className="flex-1"></div>

            {/* Bouton filtres avancés */}
            <Dialog open={showFiltersModal} onOpenChange={setShowFiltersModal}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres avancés
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>🎯 Filtres avancés</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* Secteur */}
                  <div>
                    <label className="font-semibold mb-3 block flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      Secteur d'activité
                    </label>
                    <select
                      value={selectedMetier}
                      onChange={(e) => setSelectedMetier(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all max-h-[400px]"
                    >
                      <option value="">Tous les secteurs</option>
                      
                      <optgroup label="🏗️ GROS ŒUVRE & STRUCTURE">
                        <option value="maconnerie-generale">Maçonnerie générale</option>
                        <option value="maconnerie-pierre">Maçonnerie de pierre</option>
                        <option value="maconnerie-refractaire">Maçonnerie réfractaire</option>
                        <option value="terrassement">Terrassement</option>
                        <option value="fondations-speciales">Fondations spéciales</option>
                        <option value="demolition">Démolition</option>
                        <option value="genie-civil">Génie civil</option>
                        <option value="construction-metallique">Construction métallique</option>
                        <option value="charpente-bois">Charpente bois</option>
                        <option value="charpente-metallique">Charpente métallique</option>
                        <option value="ossature-bois">Ossature bois</option>
                        <option value="construction-bois">Construction bois</option>
                      </optgroup>
                      
                      <optgroup label="⚡ ÉLECTRICITÉ & COURANTS FAIBLES">
                        <option value="electricite-generale">Électricité générale</option>
                        <option value="installation-electrique">Installation électrique</option>
                        <option value="electricite-industrielle">Électricité industrielle</option>
                        <option value="eclairage-public">Éclairage public</option>
                        <option value="domotique">Domotique</option>
                        <option value="automatismes">Automatismes</option>
                        <option value="alarmes-securite">Alarmes & sécurité</option>
                        <option value="videosurveillance">Vidéosurveillance</option>
                        <option value="controle-acces">Contrôle d'accès</option>
                        <option value="reseaux-informatiques">Réseaux informatiques</option>
                        <option value="fibre-optique">Fibre optique</option>
                        <option value="telephonie">Téléphonie</option>
                      </optgroup>
                      
                      <optgroup label="💧 PLOMBERIE & SANITAIRE">
                        <option value="plomberie-generale">Plomberie générale</option>
                        <option value="plomberie-sanitaire">Plomberie sanitaire</option>
                        <option value="installation-sanitaire">Installation sanitaire</option>
                        <option value="salle-bains-cle-main">Salle de bains clé en main</option>
                        <option value="plomberie-industrielle">Plomberie industrielle</option>
                        <option value="canalisations">Canalisations</option>
                        <option value="assainissement">Assainissement</option>
                        <option value="assainissement-individuel">Assainissement individuel</option>
                        <option value="fosse-septique">Fosse septique</option>
                        <option value="debouchage-canalisations">Débouchage canalisations</option>
                        <option value="zinguerie-plomberie">Zinguerie plomberie</option>
                        <option value="arrosage-automatique">Arrosage automatique</option>
                      </optgroup>
                      
                      <optgroup label="🌡️ CHAUFFAGE & CLIMATISATION">
                        <option value="chauffage-general">Chauffage général</option>
                        <option value="installation-chauffage-central">Installation chauffage central</option>
                        <option value="chauffage-gaz">Chauffage au gaz</option>
                        <option value="chauffage-fioul">Chauffage au fioul</option>
                        <option value="chauffage-electrique">Chauffage électrique</option>
                        <option value="plancher-chauffant">Plancher chauffant</option>
                        <option value="chaudiere-gaz">Chaudière gaz</option>
                        <option value="chaudiere-fioul">Chaudière fioul</option>
                        <option value="chaudiere-bois">Chaudière bois</option>
                        <option value="chaudiere-granules">Chaudière granulés</option>
                        <option value="chaudiere-condensation">Chaudière condensation</option>
                        <option value="poele-bois">Poêle à bois</option>
                        <option value="poele-granules">Poêle à granulés</option>
                        <option value="insert-cheminee">Insert cheminée</option>
                        <option value="ramonage">Ramonage</option>
                        <option value="climatisation">Climatisation</option>
                        <option value="climatisation-reversible">Climatisation réversible</option>
                        <option value="climatisation-gainable">Climatisation gainable</option>
                        <option value="climatisation-split">Climatisation split</option>
                        <option value="ventilation-vmc">Ventilation VMC</option>
                        <option value="vmc-simple-flux">VMC simple flux</option>
                        <option value="vmc-double-flux">VMC double flux</option>
                      </optgroup>
                      
                      <optgroup label="♻️ ÉNERGIES RENOUVELABLES">
                        <option value="panneaux-solaires-photovoltaiques">Panneaux solaires photovoltaïques</option>
                        <option value="installation-photovoltaique">Installation photovoltaïque</option>
                        <option value="photovoltaique-autoconsommation">Photovoltaïque en autoconsommation</option>
                        <option value="pac-air-eau">Pompe à chaleur air/eau</option>
                        <option value="pac-air-air">Pompe à chaleur air/air</option>
                        <option value="pac-eau-eau">Pompe à chaleur eau/eau</option>
                        <option value="pac-geothermique">Pompe à chaleur géothermique</option>
                        <option value="geothermie">Géothermie</option>
                        <option value="chauffe-eau-solaire">Chauffe-eau solaire</option>
                        <option value="chauffe-eau-thermodynamique">Chauffe-eau thermodynamique</option>
                        <option value="ballon-thermodynamique">Ballon thermodynamique</option>
                      </optgroup>
                      
                      <optgroup label="🏠 COUVERTURE, TOITURE & ÉTANCHÉITÉ">
                        <option value="couverture">Couverture</option>
                        <option value="couverture-tuiles">Couverture tuiles</option>
                        <option value="couverture-ardoises">Couverture ardoises</option>
                        <option value="couverture-zinc">Couverture zinc</option>
                        <option value="couverture-bac-acier">Couverture bac acier</option>
                        <option value="toiture-terrasse">Toiture terrasse</option>
                        <option value="toiture-vegetalisee">Toiture végétalisée</option>
                        <option value="zinguerie">Zinguerie</option>
                        <option value="gouttieres">Gouttières</option>
                        <option value="etancheite">Étanchéité</option>
                        <option value="etancheite-toiture-terrasse">Étanchéité toiture terrasse</option>
                        <option value="bardage">Bardage</option>
                        <option value="bardage-bois">Bardage bois</option>
                        <option value="bardage-metallique">Bardage métallique</option>
                        <option value="isolation-toiture">Isolation toiture</option>
                        <option value="demoussage-toiture">Démoussage toiture</option>
                        <option value="velux">Velux</option>
                      </optgroup>
                      
                      <optgroup label="🪟 MENUISERIE & FERMETURES">
                        <option value="menuiserie-generale">Menuiserie générale</option>
                        <option value="menuiserie-bois">Menuiserie bois</option>
                        <option value="menuiserie-aluminium">Menuiserie aluminium</option>
                        <option value="menuiserie-pvc">Menuiserie PVC</option>
                        <option value="fenetres">Fenêtres</option>
                        <option value="portes-fenetres">Portes-fenêtres</option>
                        <option value="baies-vitrees">Baies vitrées</option>
                        <option value="volets-roulants">Volets roulants</option>
                        <option value="volets-battants">Volets battants</option>
                        <option value="stores">Stores</option>
                        <option value="portails">Portails</option>
                        <option value="portes-entree">Portes d'entrée</option>
                        <option value="portes-garage">Portes de garage</option>
                        <option value="verriere">Verrière</option>
                        <option value="garde-corps">Garde-corps</option>
                      </optgroup>
                      
                      <optgroup label="🏠 ISOLATION THERMIQUE & ACOUSTIQUE">
                        <option value="isolation-generale">Isolation générale</option>
                        <option value="isolation-combles">Isolation des combles</option>
                        <option value="isolation-combles-perdus">Isolation des combles perdus</option>
                        <option value="isolation-combles-amenages">Isolation des combles aménagés</option>
                        <option value="isolation-murs-interieur">Isolation des murs par l'intérieur (ITI)</option>
                        <option value="isolation-murs-exterieur">Isolation des murs par l'extérieur (ITE)</option>
                        <option value="isolation-planchers">Isolation des planchers</option>
                        <option value="isolation-sous-sol">Isolation sous-sol</option>
                        <option value="isolation-cave">Isolation cave</option>
                        <option value="isolation-acoustique">Isolation acoustique</option>
                        <option value="isolation-phonique">Isolation phonique</option>
                      </optgroup>
                      
                      <optgroup label="🎨 REVÊTEMENTS & FINITIONS">
                        <option value="peinture-generale">Peinture générale</option>
                        <option value="peinture-interieure">Peinture intérieure</option>
                        <option value="peinture-exterieure">Peinture extérieure</option>
                        <option value="peinture-batiment">Peinture en bâtiment</option>
                        <option value="peinture-decorative">Peinture décorative</option>
                        <option value="ravalement-facades">Ravalement de façades</option>
                        <option value="enduits-facades">Enduits de façades</option>
                        <option value="platrier-plaquiste">Plâtrier-plaquiste</option>
                        <option value="placo">Placo</option>
                        <option value="cloisons-seches">Cloisons sèches</option>
                        <option value="faux-plafonds">Faux plafonds</option>
                        <option value="plafonds-suspendus">Plafonds suspendus</option>
                        <option value="carrelage">Carrelage</option>
                        <option value="faience">Faïence</option>
                        <option value="mosaique">Mosaïque</option>
                        <option value="parquet">Parquet</option>
                        <option value="parquet-massif">Parquet massif</option>
                        <option value="parquet-flottant">Parquet flottant</option>
                        <option value="sol-vinyl">Sol vinyle</option>
                        <option value="moquette">Moquette</option>
                        <option value="revetement-sols-souples">Revêtement de sols souples</option>
                        <option value="papier-peint">Papier peint</option>
                        <option value="staff">Staff</option>
                        <option value="moulures">Moulures</option>
                      </optgroup>
                      
                      <optgroup label="🏊 PISCINES & SPA">
                        <option value="construction-piscines">Construction de piscines</option>
                        <option value="piscines-enterrees">Piscines enterrées</option>
                        <option value="piscines-hors-sol">Piscines hors-sol</option>
                        <option value="piscines-beton">Piscines béton</option>
                        <option value="piscines-coque">Piscines coque</option>
                        <option value="piscines-naturelles">Piscines naturelles</option>
                        <option value="piscines-biologiques">Piscines biologiques</option>
                        <option value="spa-jacuzzi">Spa & Jacuzzi</option>
                        <option value="abris-piscines">Abris de piscines</option>
                        <option value="traitement-eau-piscine">Traitement de l'eau de piscine</option>
                      </optgroup>
                      
                      <optgroup label="🔍 DIAGNOSTIC & ÉTUDES">
                        <option value="diagnostic-immobilier">Diagnostic immobilier</option>
                        <option value="diagnostic-amiante">Diagnostic amiante</option>
                        <option value="diagnostic-plomb">Diagnostic plomb</option>
                        <option value="diagnostic-termites">Diagnostic termites</option>
                        <option value="diagnostic-performance-energetique">Diagnostic de performance énergétique (DPE)</option>
                        <option value="audit-energetique">Audit énergétique</option>
                        <option value="bureau-etudes-thermiques">Bureau d'études thermiques (BET)</option>
                        <option value="bureau-etudes-structure">Bureau d'études structure</option>
                        <option value="maitrise-oeuvre">Maîtrise d'œuvre</option>
                        <option value="economiste-construction">Économiste de la construction</option>
                      </optgroup>
                      
                      <optgroup label="🌳 EXTÉRIEUR & AMÉNAGEMENT">
                        <option value="paysagiste">Paysagiste</option>
                        <option value="terrassement-vrd">Terrassement VRD</option>
                        <option value="amenagement-exterieur">Aménagement extérieur</option>
                        <option value="clotures">Clôtures</option>
                        <option value="terrasses-bois">Terrasses bois</option>
                        <option value="terrasses-composite">Terrasses composite</option>
                        <option value="allees-jardins">Allées de jardins</option>
                        <option value="enrochement">Enrochement</option>
                        <option value="drainage">Drainage</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Région */}
                  <div>
                    <label className="font-semibold mb-3 block flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      Région / Département
                    </label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    >
                      <option value="">Toutes les régions</option>
                      <option value="75">🗼 Paris (75)</option>
                      <option value="69">🦁 Lyon (69)</option>
                      <option value="13">⛵ Marseille (13)</option>
                      <option value="06">🌴 Nice (06)</option>
                      <option value="31">🌹 Toulouse (31)</option>
                      <option value="33">🍷 Bordeaux (33)</option>
                      <option value="44">⚓ Nantes (44)</option>
                      <option value="59">🍺 Lille (59)</option>
                      <option value="67">🥨 Strasbourg (67)</option>
                      <option value="35">⛵ Rennes (35)</option>
                    </select>
                  </div>

                  {/* Budget Prix de vente */}
                  <div>
                    <label className="font-semibold mb-3 block flex items-center gap-2">
                      <Euro className="w-5 h-5 text-purple-600" />
                      Prix de vente
                    </label>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">💸</span>
                      <Slider
                        value={budgetRange}
                        onValueChange={setBudgetRange}
                        max={5000000}
                        step={100000}
                        className="flex-1"
                      />
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>{formatPrice(budgetRange[0])}</span>
                      <span>{formatPrice(budgetRange[1])}</span>
                    </div>
                  </div>

                  {/* Chiffre d'affaires */}
                  <div>
                    <label className="font-semibold mb-3 block flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                      Chiffre d'affaires annuel
                    </label>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">📊</span>
                      <Slider
                        defaultValue={[0, 5000000]}
                        max={5000000}
                        step={100000}
                        className="flex-1"
                      />
                      <span className="text-2xl">📈</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>0€</span>
                      <span>5M€</span>
                    </div>
                  </div>

                  {/* Nombre de salariés */}
                  <div>
                    <label className="font-semibold mb-3 block flex items-center gap-2">
                      <Users className="w-5 h-5 text-indigo-600" />
                      Nombre de salariés
                    </label>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">👤</span>
                      <Slider
                        defaultValue={[0, 100]}
                        max={100}
                        step={5}
                        className="flex-1"
                      />
                      <span className="text-2xl">👥</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>0</span>
                      <span>100+</span>
                    </div>
                  </div>

                  {/* Critères supplémentaires */}
                  <div>
                    <label className="font-semibold mb-3 block">✅ Critères supplémentaires</label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors">
                        <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-green-600" />
                          <span>Certification RGE uniquement</span>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors">
                        <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                          <span>Financement possible</span>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors">
                        <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                        <div className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-orange-600" />
                          <span>Vente rapide (moins de 3 mois)</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setSelectedMetier("");
                        setSelectedRegion("");
                        setBudgetRange([0, 5000000]);
                      }}
                    >
                      Réinitialiser
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                      onClick={() => setShowFiltersModal(false)}
                    >
                      Appliquer les filtres
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* RÉSULTATS */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-9">
              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                  <p className="mt-4 text-gray-600">Chargement des opportunités...</p>
                </div>
              ) : displayedAnnonces.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12"
                >
                  <div className="text-8xl mb-6">🔍</div>
                  <h3 className="text-3xl font-bold mb-4">Aucun résultat</h3>
                  <p className="text-gray-600 mb-8">Essayez de modifier vos critères de recherche</p>
                  <Button size="lg" onClick={() => {
                    setSelectedMetier("");
                    setActiveQuickPick("");
                  }}>
                    Réinitialiser les filtres
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  {/* COUP DE CŒUR - Grande Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="relative group"
                  >
                    <div className="absolute -top-4 left-8 z-10">
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 text-lg font-bold shadow-lg animate-pulse">
                        💎 COUP DE CŒUR
                      </Badge>
                    </div>
                    
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-orange-200">
                      <div className="md:flex">
                        {/* Image avec photo du métier */}
                        <div className="md:w-1/2 relative h-80 overflow-hidden group">
                          <img 
                            src={getMetierImage(featuredListing.secteur_activite)} 
                            alt={featuredListing.secteur_activite}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute top-4 right-4 flex gap-2">
                            <motion.div whileTap={{ scale: 0.95 }}>
                              <Button
                                size="icon"
                                variant="secondary"
                                className="rounded-full bg-white/90 hover:bg-white hover-scale"
                                onClick={() => toggleFavorite(featuredListing.id)}
                              >
                                <Heart className={`w-5 h-5 ${favorites.includes(featuredListing.id) ? 'fill-red-500 text-red-500' : ''}`} />
                              </Button>
                            </motion.div>
                            <motion.div whileTap={{ scale: 0.95 }}>
                              <Button size="icon" variant="secondary" className="rounded-full bg-white/90 hover:bg-white hover-scale">
                                <Share2 className="w-5 h-5" />
                              </Button>
                            </motion.div>
                          </div>
                          {featuredListing.certifications?.includes("RGE") && (
                            <Badge className="absolute top-4 left-4 bg-green-500 text-white animate-pulse">
                              <Award className="w-4 h-4 mr-1" />
                              RGE
                            </Badge>
                          )}
                          <Badge className="absolute bottom-4 left-4 bg-orange-500 text-white px-4 py-2 text-sm">
                            <Flame className="w-4 h-4 mr-1" />
                            12 acheteurs intéressés
                          </Badge>
                        </div>

                        {/* Contenu */}
                        <div className="md:w-1/2 p-8">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-3xl font-black mb-2">
                                {featuredListing.secteur_activite}
                              </h3>
                              <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                {featuredListing.ville} ({featuredListing.departement})
                              </div>
                            </div>
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl px-4 py-2">
                              {formatPrice(featuredListing.prix_vente)}
                            </Badge>
                          </div>

                          <p className="text-gray-700 mb-6 line-clamp-3">
                            {featuredListing.description_activite}
                          </p>

                          {/* Statistiques */}
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-3 bg-blue-50 rounded-xl hover-scale">
                              <Users className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                              <div className="font-bold text-lg">{featuredListing.nombre_salaries}</div>
                              <div className="text-xs text-gray-600">salariés</div>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded-xl hover-scale">
                              <TrendingUp className="w-5 h-5 mx-auto mb-1 text-green-600" />
                              <div className="font-bold text-lg">{formatPrice(featuredListing.ca_n1)}</div>
                              <div className="text-xs text-gray-600">CA annuel</div>
                            </div>
                            <div className="text-center p-3 bg-purple-50 rounded-xl hover-scale">
                              <Clock className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                              <div className="font-bold text-lg">{new Date().getFullYear() - featuredListing.annee_creation}</div>
                              <div className="text-xs text-gray-600">ans</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-6">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="text-green-700 font-semibold">✅ Financement possible</span>
                          </div>

                          {/* Boutons */}
                          <div className="flex gap-3">
                            <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                              <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => toggleComparison(featuredListing.id)}
                              >
                                📊 Comparer
                              </Button>
                            </motion.div>
                            <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                              <Button
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                onClick={() => navigate(`/entreprises/${featuredListing.id}`)}
                              >
                                Voir détails
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* GRILLE 3 COLONNES avec badges variés */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularListings.map((annonce, idx) => {
                      const badgeVariant = BADGE_VARIANTS[idx % BADGE_VARIANTS.length];
                      const metierImage = getMetierImage(annonce.secteur_activite);
                      
                      return (
                        <motion.div
                          key={annonce.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          whileHover={{ y: -8, transition: { duration: 0.3 } }}
                          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100"
                        >
                          {/* Image avec photo du métier */}
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={metierImage}
                              alt={annonce.secteur_activite}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            
                            {/* Badges overlay */}
                            <div className="absolute top-3 left-3">
                              <Badge className={`${badgeVariant.color} ${badgeVariant.textColor} animate-pulse`}>
                                {badgeVariant.label}
                              </Badge>
                              {annonce.certifications?.includes("RGE") && (
                                <Badge className="bg-green-500 text-white mt-2">
                                  <Award className="w-3 h-3 mr-1" />
                                  RGE
                                </Badge>
                              )}
                            </div>

                            <motion.div whileTap={{ scale: 0.95 }}>
                              <Button
                                size="icon"
                                variant="secondary"
                                className="absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white hover-scale"
                                onClick={() => toggleFavorite(annonce.id)}
                              >
                                <Heart className={`w-4 h-4 ${favorites.includes(annonce.id) ? 'fill-red-500 text-red-500' : ''}`} />
                              </Button>
                            </motion.div>
                          </div>

                          {/* Contenu */}
                          <div className="p-5">
                            <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                              {annonce.secteur_activite}
                            </h3>
                            
                            <div className="flex items-center text-sm text-gray-600 mb-3">
                              <MapPin className="w-4 h-4 mr-1" />
                              {annonce.ville} ({annonce.departement})
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {annonce.nombre_salaries} salariés
                                </span>
                                <span className="font-semibold">{formatPrice(annonce.ca_n1)}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="w-4 h-4 mr-1" />
                                Créée en {annonce.annee_creation}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <Badge className="bg-green-100 text-green-700">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Financement OK
                              </Badge>
                              <div className="text-xl font-black text-primary">
                                {formatPrice(annonce.prix_vente)}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                  onClick={() => toggleComparison(annonce.id)}
                                >
                                  Comparer
                                </Button>
                              </motion.div>
                              <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                                <Button
                                  size="sm"
                                  className="w-full"
                                  onClick={() => navigate(`/entreprises/${annonce.id}`)}
                                >
                                  Détails
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar droite - LiveStats Widget */}
            <div className="hidden lg:block lg:col-span-3">
              <LiveStatsWidget />
            </div>
          </div>
        </div>
      </section>

      {/* COMPARATEUR BARRE FIXE */}
      <AnimatePresence>
        {selectedForComparison.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-4 border-blue-500 py-5 shadow-2xl"
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-4 md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="font-bold text-lg text-gray-900">
                    📊 Comparateur ({selectedForComparison.length}/3)
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {selectedForComparison.map((id) => {
                      const annonce = displayedAnnonces.find(a => a.id === id);
                      return annonce ? (
                        <motion.div
                          key={id}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-sm">
                            {annonce.secteur_activite.substring(0, 20)}...
                            <button
                              onClick={() => toggleComparison(id)}
                              className="ml-2 hover:text-red-500 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </Badge>
                        </motion.div>
                      ) : null;
                    })}
                  </div>
                </div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-bold"
                    disabled={selectedForComparison.length < 2}
                  >
                    Comparer maintenant
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SOCIAL PROOF */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-black mb-8">Ce qu'ils en pensent</h3>
          <div className="flex justify-center items-center gap-3 mb-8">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold">4.9</span>
            <span className="text-gray-600">(234 avis)</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Entreprises;

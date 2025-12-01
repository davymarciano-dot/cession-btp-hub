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
  Star, Sparkles, Flame, CheckCircle2, AlertCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import { useNavigate } from "react-router-dom";

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
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    >
                      <option value="">Tous les secteurs</option>
                      <option value="Tous corps d'état">🏗️ Tous corps d'état</option>
                      <option value="Électricité">⚡ Électricité</option>
                      <option value="Plomberie sanitaire">🔧 Plomberie</option>
                      <option value="Isolation thermique">🏠 Isolation</option>
                      <option value="Chauffage">🔥 Chauffage</option>
                      <option value="Climatisation">❄️ Climatisation</option>
                      <option value="Maçonnerie">🧱 Maçonnerie</option>
                      <option value="Menuiserie">🪵 Menuiserie</option>
                      <option value="Peinture">🎨 Peinture</option>
                      <option value="Énergies renouvelables">☀️ Énergies renouvelables</option>
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
                className="relative group"
              >
                <div className="absolute -top-4 left-8 z-10">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 text-lg font-bold shadow-lg">
                    💎 COUP DE CŒUR
                  </Badge>
                </div>
                
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border-2 border-orange-200">
                  <div className="md:flex">
                    {/* Image avec gradient */}
                    <div className="md:w-1/2 relative h-80 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <div className="text-9xl opacity-20">🏢</div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-white/90 hover:bg-white"
                          onClick={() => toggleFavorite(featuredListing.id)}
                        >
                          <Heart className={`w-5 h-5 ${favorites.includes(featuredListing.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                        <Button size="icon" variant="secondary" className="rounded-full bg-white/90 hover:bg-white">
                          <Share2 className="w-5 h-5" />
                        </Button>
                      </div>
                      {featuredListing.certifications?.includes("RGE") && (
                        <Badge className="absolute top-4 left-4 bg-green-500 text-white">
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
                        <div className="text-center p-3 bg-blue-50 rounded-xl">
                          <Users className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                          <div className="font-bold text-lg">{featuredListing.nombre_salaries}</div>
                          <div className="text-xs text-gray-600">salariés</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-xl">
                          <TrendingUp className="w-5 h-5 mx-auto mb-1 text-green-600" />
                          <div className="font-bold text-lg">{formatPrice(featuredListing.ca_n1)}</div>
                          <div className="text-xs text-gray-600">CA annuel</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-xl">
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
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => toggleComparison(featuredListing.id)}
                        >
                          📊 Comparer
                        </Button>
                        <Button
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          onClick={() => navigate(`/entreprises/${featuredListing.id}`)}
                        >
                          Voir détails
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* GRILLE 3 COLONNES */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularListings.map((annonce, idx) => (
                  <motion.div
                    key={annonce.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group border border-gray-100"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                      <div className="text-6xl opacity-30">🏗️</div>
                      
                      {/* Badges overlay */}
                      <div className="absolute top-3 left-3">
                        {idx === 0 && (
                          <Badge className="bg-red-500 text-white">
                            <Sparkles className="w-3 h-3 mr-1" />
                            🆕 Nouveau
                          </Badge>
                        )}
                        {annonce.certifications?.includes("RGE") && (
                          <Badge className="bg-green-500 text-white mt-2">
                            <Award className="w-3 h-3 mr-1" />
                            RGE
                          </Badge>
                        )}
                      </div>

                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white"
                        onClick={() => toggleFavorite(annonce.id)}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(annonce.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                    </div>

                    {/* Contenu */}
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => toggleComparison(annonce.id)}
                        >
                          Comparer
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => navigate(`/entreprises/${annonce.id}`)}
                        >
                          Détails
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* COMPARATEUR BARRE FIXE */}
      <AnimatePresence>
        {selectedForComparison.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 shadow-2xl"
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="font-bold text-lg">
                    📊 Comparateur ({selectedForComparison.length}/3)
                  </div>
                  <div className="flex gap-2">
                    {selectedForComparison.map((id) => {
                      const annonce = displayedAnnonces.find(a => a.id === id);
                      return annonce ? (
                        <Badge key={id} variant="secondary" className="px-4 py-2">
                          {annonce.secteur_activite}
                          <button
                            onClick={() => toggleComparison(id)}
                            className="ml-2 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
                <Button
                  size="lg"
                  variant="secondary"
                  className="font-bold"
                  disabled={selectedForComparison.length < 2}
                >
                  Comparer maintenant
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
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

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {
  Search,
  Filter,
  Building2,
  MapPin,
  Euro,
  Users,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { ListingSkeletonGrid } from "@/components/ListingSkeleton";
import SEO from "@/components/SEO";

interface Annonce {
  id: string;
  raison_sociale: string;
  secteur_activite: string;
  ville: string;
  departement: string;
  code_postal: string;
  prix_vente: number;
  ca_n1: number;
  nombre_salaries: number;
  description_activite: string;
  annee_creation: number;
  statut: string;
}

const ITEMS_PER_PAGE = 9;

const Index = () => {
  const navigate = useNavigate();
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [filteredAnnonces, setFilteredAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");

  useEffect(() => {
    fetchAnnonces();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [annonces, searchTerm, selectedSector, selectedRegion, priceRange]);

  const fetchAnnonces = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("annonces")
      .select("*")
      .eq("statut", "publiee")
      .order("created_at", { ascending: false });

    if (data) {
      setAnnonces(data);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...annonces];

    if (searchTerm) {
      filtered = filtered.filter(
        (a) =>
          a.raison_sociale?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.secteur_activite.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedSector !== "all") {
      filtered = filtered.filter((a) => a.secteur_activite === selectedSector);
    }

    if (selectedRegion !== "all") {
      filtered = filtered.filter((a) => a.departement.startsWith(selectedRegion));
    }

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter((a) => {
        if (max) {
          return a.prix_vente >= min && a.prix_vente <= max;
        }
        return a.prix_vente >= min;
      });
    }

    setFilteredAnnonces(filtered);
    setCurrentPage(1);
  };

  const uniqueSectors = Array.from(new Set(annonces.map((a) => a.secteur_activite))).sort();

  const totalPages = Math.ceil(filteredAnnonces.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAnnonces = filteredAnnonces.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <SEO
        title="CessionBTP - Achat et Vente d'Entreprises BTP en France"
        description="Plateforme n°1 pour acheter et vendre des entreprises du BTP. Plus de 500 sociétés de construction à reprendre. Success Fee 2%, Matching IA, accompagnement personnalisé."
        keywords="cession entreprise BTP, vendre société construction, acheter entreprise bâtiment, reprise PME BTP"
        url="https://cessionbtp.fr"
      />
      <Header />

      <main>
        {/* 🎨 HERO SECTION ULTRA MODERNE */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-32 overflow-hidden">
          {/* Motif de fond animé */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "50px 50px",
              }}
            ></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge Premium */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20 animate-pulse">
                <Award className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-bold">Plateforme n°1 de cession d'entreprises BTP</span>
              </div>

              {/* Titre Spectaculaire */}
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
                Trouvez Votre Prochaine
                <span className="block mt-3 bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent animate-gradient">
                  Opportunité BTP
                </span>
              </h1>

              {/* Sous-titre */}
              <p className="text-xl md:text-2xl mb-12 text-blue-100 font-light max-w-3xl mx-auto">
                {annonces.length} entreprises disponibles · Matching IA · Success Fee 2%
              </p>

              {/* 📊 Stats Cards Glassmorphism */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                {[
                  { number: annonces.length, label: "Annonces actives", icon: "🏗️" },
                  { number: "2000+", label: "Acheteurs qualifiés", icon: "👥" },
                  { number: "45j", label: "Délai moyen", icon: "⚡" },
                  { number: "98%", label: "Satisfaction", icon: "⭐" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-white/20 cursor-pointer"
                  >
                    <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-extrabold mb-2">{stat.number}</div>
                    <div className="text-sm text-blue-200 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* 🚀 CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Button
                  size="lg"
                  className="group bg-white text-blue-900 hover:bg-blue-50 text-lg px-12 py-8 rounded-2xl font-bold shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300"
                  onClick={() => navigate("/vendre")}
                >
                  <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  <span>Vendre mon entreprise</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-3 border-white text-white hover:bg-white/20 text-lg px-12 py-8 rounded-2xl font-bold backdrop-blur-sm hover:scale-105 transition-all duration-300"
                  onClick={() => document.getElementById("annonces-section")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Parcourir les annonces
                </Button>
              </div>
            </div>
          </div>

          {/* Vagues décoratives */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path
                d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
                fill="rgb(248, 250, 252)"
              />
            </svg>
          </div>
        </section>

        {/* Section Recherche et Filtres */}
        <section id="annonces-section" className="container mx-auto px-4 -mt-16 relative z-20 mb-16">
          <Card className="p-8 shadow-2xl rounded-3xl border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Filter className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900">Recherche Avancée</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Barre de recherche */}
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, ville, secteur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-all"
                />
              </div>

              {/* Filtre Secteur */}
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="h-14 border-2 border-gray-200 rounded-xl font-medium">
                  <SelectValue placeholder="Tous les secteurs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les secteurs</SelectItem>
                  {uniqueSectors.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Filtre Région */}
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="h-14 border-2 border-gray-200 rounded-xl font-medium">
                  <SelectValue placeholder="Toutes les régions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les régions</SelectItem>
                  <SelectItem value="75">Île-de-France (75)</SelectItem>
                  <SelectItem value="69">Auvergne-Rhône-Alpes (69)</SelectItem>
                  <SelectItem value="13">Provence (13)</SelectItem>
                  <SelectItem value="33">Nouvelle-Aquitaine (33)</SelectItem>
                  <SelectItem value="31">Occitanie (31)</SelectItem>
                  <SelectItem value="44">Pays de la Loire (44)</SelectItem>
                  <SelectItem value="59">Hauts-de-France (59)</SelectItem>
                  <SelectItem value="67">Grand Est (67)</SelectItem>
                  <SelectItem value="06">Côte d'Azur (06)</SelectItem>
                  <SelectItem value="35">Bretagne (35)</SelectItem>
                </SelectContent>
              </Select>

              {/* Filtre Prix */}
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="h-14 border-2 border-gray-200 rounded-xl font-medium">
                  <SelectValue placeholder="Tous les prix" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les prix</SelectItem>
                  <SelectItem value="0-300000">Moins de 300K€</SelectItem>
                  <SelectItem value="300000-500000">300K€ - 500K€</SelectItem>
                  <SelectItem value="500000-750000">500K€ - 750K€</SelectItem>
                  <SelectItem value="750000-1000000">750K€ - 1M€</SelectItem>
                  <SelectItem value="1000000-9999999">Plus de 1M€</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-base text-gray-600 font-medium">
                <span className="text-blue-600 font-bold text-lg">{filteredAnnonces.length}</span> résultat
                {filteredAnnonces.length > 1 ? "s" : ""} trouvé{filteredAnnonces.length > 1 ? "s" : ""}
              </p>
              {(searchTerm || selectedSector !== "all" || selectedRegion !== "all" || priceRange !== "all") && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 font-semibold"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSector("all");
                    setSelectedRegion("all");
                    setPriceRange("all");
                  }}
                >
                  Réinitialiser
                </Button>
              )}
            </div>
          </Card>
        </section>

        {/* 🎨 GRILLE DES ANNONCES MODERNE */}
        <section className="container mx-auto px-4 py-12">
          {loading ? (
            <ListingSkeletonGrid count={9} />
          ) : currentAnnonces.length === 0 ? (
            <Card className="p-16 text-center rounded-3xl">
              <Building2 className="w-20 h-20 mx-auto text-gray-300 mb-6" />
              <h3 className="text-3xl font-bold mb-3 text-gray-800">Aucune annonce trouvée</h3>
              <p className="text-gray-500 text-lg mb-8">Essayez de modifier vos critères de recherche</p>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSector("all");
                  setSelectedRegion("all");
                  setPriceRange("all");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {currentAnnonces.map((annonce) => (
                  <Card
                    key={annonce.id}
                    className="group hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border-2 border-gray-100 hover:border-blue-300 rounded-3xl hover:scale-105"
                    onClick={() => navigate(`/annonce/${annonce.id}`)}
                  >
                    {/* Image avec gradient spectaculaire */}
                    <div className="h-64 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all"></div>

                      {/* Badge secteur */}
                      <div className="absolute top-5 left-5">
                        <span className="bg-white px-5 py-2 rounded-full text-sm font-bold text-blue-600 shadow-xl">
                          {annonce.secteur_activite}
                        </span>
                      </div>

                      {/* Infos localisation */}
                      <div className="absolute bottom-5 left-5 right-5">
                        <h3 className="text-2xl font-extrabold mb-2 text-white drop-shadow-2xl line-clamp-1">
                          {annonce.raison_sociale || `Entreprise ${annonce.secteur_activite}`}
                        </h3>
                        <div className="flex items-center gap-2 text-white/95">
                          <MapPin className="w-5 h-5" />
                          <span className="font-semibold">
                            {annonce.ville} ({annonce.departement})
                          </span>
                        </div>
                      </div>

                      {/* Effet brillance */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>

                    {/* Contenu carte */}
                    <div className="p-7 bg-white">
                      {/* Prix */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {(annonce.prix_vente / 1000).toFixed(0)}K€
                          </span>
                          <span className="text-sm text-gray-500 font-semibold">Prix de vente</span>
                        </div>
                      </div>

                      {/* Métriques */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3 bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl">
                          <div className="bg-green-500 p-2 rounded-xl shadow-lg">
                            <TrendingUp className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 font-bold uppercase">CA annuel</div>
                            <div className="font-extrabold text-gray-900 text-lg">
                              {(annonce.ca_n1 / 1000).toFixed(0)}K€
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-2xl">
                          <div className="bg-purple-500 p-2 rounded-xl shadow-lg">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 font-bold uppercase">Effectif</div>
                            <div className="font-extrabold text-gray-900 text-lg">{annonce.nombre_salaries} pers.</div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 line-clamp-2 mb-6 leading-relaxed">
                        {annonce.description_activite}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-5 border-t-2 border-gray-100">
                        <span className="text-xs text-gray-500 font-semibold">Créée en {annonce.annee_creation}</span>
                        <span className="text-blue-600 font-bold text-sm group-hover:gap-2 flex items-center gap-1 transition-all">
                          Voir détails
                          <span className="group-hover:translate-x-2 transition-transform text-lg">→</span>
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-12 h-12 rounded-xl border-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => setCurrentPage(page)}
                        className={`w-12 h-12 rounded-xl font-bold ${
                          currentPage === page ? "bg-blue-600 hover:bg-blue-700 shadow-lg" : "border-2"
                        }`}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-12 h-12 rounded-xl border-2"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Call to Action Final */}
        <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-extrabold mb-6">Prêt à Franchir le Cap ?</h2>
            <p className="text-xl mb-12 text-blue-100 max-w-2xl mx-auto font-light">
              Rejoignez les centaines d'entrepreneurs qui nous font confiance pour leur projet de cession
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-12 py-8 rounded-2xl font-bold shadow-2xl hover:scale-105 transition-all"
                onClick={() => navigate("/vendre")}
              >
                Vendre mon entreprise
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-3 border-white text-white hover:bg-white/20 text-lg px-12 py-8 rounded-2xl font-bold backdrop-blur-sm hover:scale-105 transition-all"
                onClick={() => navigate("/estimer")}
              >
                Estimer gratuitement
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

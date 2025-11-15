import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search, Filter, Building2, MapPin, Euro, Users, TrendingUp, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { ListingSkeletonGrid } from "@/components/ListingSkeleton";
import SEO from "@/components/SEO";
import { OptimizedImage } from "@/components/OptimizedImage";

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
      .from('annonces')
      .select('*')
      .eq('statut', 'publiee')
      .order('created_at', { ascending: false });
    
    if (data) {
      setAnnonces(data);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...annonces];

    // Filtre de recherche
    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.raison_sociale?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.secteur_activite.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre secteur
    if (selectedSector !== "all") {
      filtered = filtered.filter(a => a.secteur_activite === selectedSector);
    }

    // Filtre région (département)
    if (selectedRegion !== "all") {
      filtered = filtered.filter(a => a.departement.startsWith(selectedRegion));
    }

    // Filtre prix
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter(a => {
        if (max) {
          return a.prix_vente >= min && a.prix_vente <= max;
        }
        return a.prix_vente >= min;
      });
    }

    setFilteredAnnonces(filtered);
    setCurrentPage(1);
  };

  const uniqueSectors = Array.from(new Set(annonces.map(a => a.secteur_activite))).sort();
  
  const totalPages = Math.ceil(filteredAnnonces.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAnnonces = filteredAnnonces.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEO
        title="CessionBTP - Achat et Vente d'Entreprises BTP en France"
        description="Plateforme n°1 pour acheter et vendre des entreprises du BTP. Plus de 500 sociétés de construction à reprendre. Success Fee 2%, Matching IA, accompagnement personnalisé. Estimation gratuite en 5 min."
        keywords="cession entreprise BTP, vendre société construction, acheter entreprise bâtiment, reprise PME BTP, valorisation entreprise BTP, marketplace BTP"
        url="https://cessionbtp.fr"
      />
      <Header />
      
      <main>
        {/* Hero Section Moderne */}
        <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Award className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-medium">Plateforme n°1 de cession d'entreprises BTP</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Trouvez Votre Prochaine
                <span className="block text-yellow-300">Opportunité BTP</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                {annonces.length} entreprises disponibles · Matching IA · Success Fee 2%
              </p>
              
              {/* Statistiques Hero */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">{annonces.length}</div>
                  <div className="text-sm text-blue-100">Annonces actives</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">2000+</div>
                  <div className="text-sm text-blue-100">Acheteurs qualifiés</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">45j</div>
                  <div className="text-sm text-blue-100">Délai moyen</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm text-blue-100">Satisfaction</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
                  onClick={() => navigate('/vendre')}
                >
                  Vendre mon entreprise
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                  onClick={() => document.getElementById('annonces-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Parcourir les annonces
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section Recherche et Filtres */}
        <section id="annonces-section" className="container mx-auto px-4 -mt-12 relative z-20 mb-12">
          <Card className="p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold">Recherche Avancée</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Barre de recherche */}
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, ville, secteur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Filtre Secteur */}
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="h-12 bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Secteur" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 z-50">
                  <SelectItem value="all">Tous les secteurs</SelectItem>
                  {uniqueSectors.map(sector => (
                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Filtre Région */}
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="h-12 bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Région" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 z-50">
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
                <SelectTrigger className="h-12 bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Prix" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 z-50">
                  <SelectItem value="all">Tous les prix</SelectItem>
                  <SelectItem value="0-300000">Moins de 300K€</SelectItem>
                  <SelectItem value="300000-500000">300K€ - 500K€</SelectItem>
                  <SelectItem value="500000-750000">500K€ - 750K€</SelectItem>
                  <SelectItem value="750000-1000000">750K€ - 1M€</SelectItem>
                  <SelectItem value="1000000-9999999">Plus de 1M€</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredAnnonces.length} résultat{filteredAnnonces.length > 1 ? 's' : ''} trouvé{filteredAnnonces.length > 1 ? 's' : ''}
              </p>
              {(searchTerm || selectedSector !== "all" || selectedRegion !== "all" || priceRange !== "all") && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSector("all");
                    setSelectedRegion("all");
                    setPriceRange("all");
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              )}
            </div>
          </Card>
        </section>

        {/* Grille des Annonces */}
        <section className="container mx-auto px-4 py-12">
        {/* Résultats */}
        {loading ? (
          <ListingSkeletonGrid count={9} />
        ) : currentAnnonces.length === 0 ? (
          <Card className="p-12 text-center">
            <Building2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Aucune annonce trouvée</h3>
            <p className="text-muted-foreground mb-6">Essayez de modifier vos critères de recherche</p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedSector("all");
              setSelectedRegion("all");
              setPriceRange("all");
            }}>
              Réinitialiser les filtres
            </Button>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentAnnonces.map((annonce) => (
                  <Card 
                    key={annonce.id} 
                    className="group hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                    onClick={() => navigate(`/annonce/${annonce.id}`)}
                  >
                    {/* Image placeholder avec gradient */}
                    <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                          {annonce.secteur_activite}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-bold mb-1 line-clamp-1">
                          {annonce.raison_sociale || `Entreprise ${annonce.secteur_activite}`}
                        </h3>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{annonce.ville} ({annonce.departement})</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Prix en évidence */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-bold text-blue-600">
                          {(annonce.prix_vente / 1000).toFixed(0)}K€
                        </span>
                        <span className="text-sm text-muted-foreground">Prix de vente</span>
                      </div>

                      {/* Métriques clés */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <div>
                            <div className="text-xs text-muted-foreground">CA annuel</div>
                            <div className="font-semibold">{(annonce.ca_n1 / 1000).toFixed(0)}K€</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-purple-600" />
                          <div>
                            <div className="text-xs text-muted-foreground">Effectif</div>
                            <div className="font-semibold">{annonce.nombre_salaries} pers.</div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {annonce.description_activite}
                      </p>

                      {/* Année */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Créée en {annonce.annee_creation}</span>
                        <span className="text-blue-600 font-medium group-hover:underline">
                          Voir détails →
                        </span>
                      </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "bg-blue-600" : ""}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Prêt à Franchir le Cap ?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Rejoignez les centaines d'entrepreneurs qui nous font confiance pour leur projet de cession
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
                onClick={() => navigate('/vendre')}
              >
                Vendre mon entreprise
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                onClick={() => navigate('/estimer')}
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

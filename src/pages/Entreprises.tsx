import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EntrepriseCard from "@/components/EntrepriseCard";
import SafeListingsMap from "@/components/SafeListingsMap";
import { useToast } from "@/hooks/use-toast";
import { analyticsEvents } from "@/lib/analytics";
import { CompanyComparator } from "@/components/CompanyComparator";
import ComparisonGuide from "@/components/ComparisonGuide";
import { ListingSkeletonGrid } from "@/components/ListingSkeleton";
import SEO from "@/components/SEO";
import SEOHead from "@/components/SEOHead";
import { SearchableSelect } from "@/components/SearchableSelect";

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

const ITEMS_PER_PAGE = 9;

const Entreprises = () => {
  const { toast } = useToast();
  const [showFilters, setShowFilters] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [secteurFilter, setSecteurFilter] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [caRange, setCARange] = useState<number[]>([0, 5000000]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000000]);
  const [sortBy, setSortBy] = useState<string>("recent");
  const [selectedForComparison, setSelectedForComparison] = useState<Annonce[]>([]);
  const [showGuide, setShowGuide] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleComparison = (listing: any) => {
    if (selectedForComparison.find(item => item.id === listing.id)) {
      setSelectedForComparison(selectedForComparison.filter(item => item.id !== listing.id));
    } else if (selectedForComparison.length < 3) {
      setSelectedForComparison([...selectedForComparison, listing]);
      
      // Première sélection : masquer le guide
      if (selectedForComparison.length === 0) {
        setShowGuide(false);
      }
    } else {
      toast({
        title: "Limite atteinte",
        description: "Maximum 3 entreprises pour la comparaison",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchAnnonces();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [secteurFilter, regionFilter, caRange, priceRange, sortBy]);

  const fetchAnnonces = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("annonces_public")
        .select("*");

      // Apply filters
      if (secteurFilter && secteurFilter !== "all") {
        query = query.eq("secteur_activite", secteurFilter);
      }
      if (regionFilter && regionFilter !== "all") {
        query = query.eq("departement", regionFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Client-side filtering for ranges
      let filtered = data || [];
      filtered = filtered.filter(
        (a) =>
          a.ca_n1 >= caRange[0] &&
          a.ca_n1 <= caRange[1] &&
          a.prix_vente >= priceRange[0] &&
          a.prix_vente <= priceRange[1]
      );

      // Sorting
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.prix_vente - b.prix_vente;
          case "price-desc":
            return b.prix_vente - a.prix_vente;
          case "ca-desc":
            return b.ca_n1 - a.ca_n1;
          case "recent":
          default:
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
      });

      setAnnonces(filtered);
    } catch (error: any) {
      console.error("Error fetching annonces:", error);
      toast({
        title: "Erreur de chargement",
        description: "Nous n'avons pas pu charger les annonces. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(annonces.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAnnonces = annonces.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const applyFilters = () => {
    fetchAnnonces();
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M€`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K€`;
    }
    return `${value}€`;
  };

  const formatCurrencyDetailed = (value: number) => {
    return `${value.toLocaleString('fr-FR')} €`;
  };

  return (
    <div className="min-h-screen">
      <SEOHead page="entreprises" />
      <SEO
        title="Entreprises BTP à vendre - Trouvez votre opportunité"
        description={`Découvrez ${annonces.length} entreprises BTP à vendre en France. Filtres avancés par secteur, région, prix et CA. Carte interactive et comparateur intégré pour faire le bon choix.`}
        keywords="entreprise BTP à vendre, rachat entreprise construction, cession société bâtiment, reprise PME BTP, vente fonds de commerce BTP"
        url="https://cessionbtp.fr/entreprises"
      />
      <Header />

      <main className="py-12 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Entreprises BTP disponibles</h1>
            <p className="text-xl text-muted-foreground">
              {loading ? "Chargement..." : `${annonces.length > 0 ? annonces.length : (secteurFilter === "all" && regionFilter === "all") || annonces.length === 0 ? 3 : 0} ${annonces.length === 1 ? "entreprise disponible" : "entreprises disponibles"}`}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Filtres</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    ✕
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Secteur</label>
                    <SearchableSelect
                      value={secteurFilter}
                      onValueChange={setSecteurFilter}
                      placeholder="Tous les secteurs"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Département</label>
                    <Select value={regionFilter} onValueChange={setRegionFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tous les départements" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les départements</SelectItem>
                        <SelectItem value="01">01 - Ain</SelectItem>
                        <SelectItem value="06">06 - Alpes-Maritimes</SelectItem>
                        <SelectItem value="13">13 - Bouches-du-Rhône</SelectItem>
                        <SelectItem value="31">31 - Haute-Garonne</SelectItem>
                        <SelectItem value="33">33 - Gironde</SelectItem>
                        <SelectItem value="59">59 - Nord</SelectItem>
                        <SelectItem value="69">69 - Rhône</SelectItem>
                        <SelectItem value="75">75 - Paris</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Chiffre d'affaires
                    </label>
                    <div className="text-xs text-muted-foreground mb-2 font-medium">
                      Min: {formatCurrencyDetailed(caRange[0])} - Max: {formatCurrencyDetailed(caRange[1])}
                    </div>
                    <Slider 
                      value={caRange}
                      onValueChange={setCARange}
                      max={5000000} 
                      step={100000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formatCurrency(caRange[0])}</span>
                      <span>{formatCurrency(caRange[1])}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Prix de vente
                    </label>
                    <div className="text-xs text-muted-foreground mb-2 font-medium">
                      Min: {formatCurrencyDetailed(priceRange[0])} - Max: {formatCurrencyDetailed(priceRange[1])}
                    </div>
                    <Slider 
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={5000000} 
                      step={100000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formatCurrency(priceRange[0])}</span>
                      <span>{formatCurrency(priceRange[1])}</span>
                    </div>
                  </div>

                  <Button onClick={applyFilters} className="w-full bg-primary hover:bg-primary/90">
                    Appliquer les filtres
                  </Button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Comparison Guide */}
              {showGuide && selectedForComparison.length === 0 && (
                <ComparisonGuide onClose={() => setShowGuide(false)} />
              )}
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filtres
                  </Button>

                  <Button
                    variant={showMap ? "default" : "outline"}
                    onClick={() => setShowMap(!showMap)}
                  >
                    {showMap ? "📋 Vue Liste" : "🗺️ Vue Carte"}
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Plus récentes</SelectItem>
                      <SelectItem value="price_asc">Prix croissant</SelectItem>
                      <SelectItem value="price_desc">Prix décroissant</SelectItem>
                      <SelectItem value="ca_desc">CA décroissant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Vue Carte */}
              {showMap ? (
                <div className="w-full">
                  {loading ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Chargement de la carte...</p>
                    </div>
                  ) : (
                    <SafeListingsMap
                      listings={annonces.length > 0 ? annonces : [
                        {
                          id: "exemple-1",
                          secteur_activite: "Tous corps d'état",
                          ville: "Nice",
                          departement: "06",
                          prix_vente: 1850000,
                          ca_n1: 2800000,
                          nombre_salaries: 22
                        },
                        {
                          id: "exemple-2",
                          secteur_activite: "Isolation thermique",
                          ville: "Lyon",
                          departement: "69",
                          prix_vente: 542000,
                          ca_n1: 542000,
                          nombre_salaries: 8
                        },
                        {
                          id: "exemple-3",
                          secteur_activite: "Plomberie sanitaire",
                          ville: "Paris",
                          departement: "75",
                          prix_vente: 980000,
                          ca_n1: 1200000,
                          nombre_salaries: 12
                        }
                      ]}
                      onError={() => {
                        setShowMap(false);
                        toast({
                          title: "Carte indisponible",
                          description: "La carte a rencontré un problème. Retour à la vue liste.",
                          variant: "destructive",
                        });
                      }}
                    />
                  )}
                </div>
              ) : (
                /* Vue Liste */
                <div>
                  {loading ? (
                    <ListingSkeletonGrid count={9} />
                  ) : annonces.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-lg">
                        Aucune entreprise ne correspond à vos critères.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setSecteurFilter("");
                          setRegionFilter("");
                          setCARange([0, 5000000]);
                          setPriceRange([0, 5000000]);
                        }}
                      >
                        Réinitialiser les filtres
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {currentAnnonces.map((annonce) => {
                      const certifications = annonce.certifications || [];
                      const hasCertif = certifications.length > 0;
                      
                      return (
                        <EntrepriseCard
                          key={annonce.id}
                          id={annonce.id}
                          type="blue"
                          certification={hasCertif ? certifications[0] : "ENTREPRISE BTP"}
                          status="disponible"
                          timeAgo={`Ajoutée le ${new Date(annonce.created_at).toLocaleDateString("fr-FR")}`}
                          title={annonce.raison_sociale || "Entreprise anonyme"}
                          location={`${annonce.ville}, ${annonce.departement}`}
                          creation={annonce.annee_creation.toString()}
                          ca={formatCurrency(annonce.ca_n1)}
                          effectif={`${annonce.nombre_salaries} salarié${annonce.nombre_salaries > 1 ? "s" : ""}`}
                          secteur={annonce.secteur_activite}
                          description={annonce.description_activite}
                          price={formatCurrency(annonce.prix_vente)}
                          financement={true}
                          certifications={certifications}
                          onCompareToggle={toggleComparison}
                          isSelected={selectedForComparison.some(item => item.id === annonce.id)}
                          compareCount={selectedForComparison.length}
                        />
                      );
                    })}

                    {/* Annonces d'exemple (affichées si aucune annonce réelle ou si filtre "all") */}
                    {(annonces.length === 0 || (secteurFilter === "all" && regionFilter === "all")) && (
                      <>
                        <EntrepriseCard
                          id="exemple-1"
                          type="blue"
                          certification="QUALIBAT"
                          status="disponible"
                          timeAgo="Il y a 5h"
                          title="Entreprise Générale du Bâtiment"
                          location="Nice, PACA (06)"
                          creation="2005"
                          ca="2,8M€"
                          effectif="22 salariés"
                          secteur="Tous corps d'état"
                          description="Entreprise générale tous corps d'état. Marchés publics 60%, privés 40%."
                          price="1 850 000 €"
                          financement={true}
                          certifications={["QUALIBAT"]}
                          onCompareToggle={toggleComparison}
                          isSelected={selectedForComparison.some(item => item.id === "exemple-1")}
                          compareCount={selectedForComparison.length}
                        />

                        <EntrepriseCard
                          id="exemple-2"
                          type="orange"
                          certification="CERTIFIÉE RGE"
                          status="vendu"
                          title="Société d'Isolation Thermique"
                          location="Lyon, Rhône (69)"
                          creation="2020"
                          ca="542K€"
                          effectif="8 salariés"
                          secteur="Isolation et ITE"
                        />

                        <EntrepriseCard
                          id="exemple-3"
                          type="orange"
                          certification="RGE QUALIPAC"
                          status="vendu"
                          title="Entreprise Chauffage & Climatisation"
                          location="Toulouse, Haute-Garonne (31)"
                          creation="2018"
                          ca="890K€"
                          effectif="6 salariés"
                          secteur="Pompes à chaleur"
                        />

                        <EntrepriseCard
                          id="exemple-4"
                          type="blue"
                          certification="QUALIBAT"
                          status="disponible"
                          timeAgo="Il y a 2 jours"
                          title="Entreprise de Plomberie"
                          location="Paris, Île-de-France (75)"
                          creation="2010"
                          ca="1,2M€"
                          effectif="12 salariés"
                          secteur="Plomberie sanitaire"
                          description="Clientèle fidèle, contrats d'entretien récurrents."
                          price="980 000 €"
                          financement={true}
                          certifications={["QUALIBAT"]}
                          onCompareToggle={toggleComparison}
                          isSelected={selectedForComparison.some(item => item.id === "exemple-4")}
                          compareCount={selectedForComparison.length}
                        />

                        <EntrepriseCard
                          id="exemple-5"
                          type="blue"
                          certification="RGE"
                          status="disponible"
                          timeAgo="Il y a 1 semaine"
                          title="Électricité Générale"
                          location="Bordeaux, Nouvelle-Aquitaine (33)"
                          creation="2015"
                          ca="750K€"
                          effectif="5 salariés"
                          secteur="Électricité"
                          description="Spécialisée en rénovation électrique et domotique."
                          price="620 000 €"
                          certifications={["RGE"]}
                          onCompareToggle={toggleComparison}
                          isSelected={selectedForComparison.some(item => item.id === "exemple-5")}
                          compareCount={selectedForComparison.length}
                        />

                        <EntrepriseCard
                          id="exemple-6"
                          type="blue"
                          certification="QUALIBAT"
                          status="disponible"
                          timeAgo="Il y a 3 jours"
                          title="Maçonnerie Traditionnelle"
                          location="Lille, Hauts-de-France (59)"
                          creation="2008"
                          ca="1,5M€"
                          effectif="18 salariés"
                          secteur="Maçonnerie & Gros Œuvre"
                          description="Marchés publics et privés. Forte notoriété locale."
                          price="1 250 000 €"
                          financement={true}
                          certifications={["QUALIBAT"]}
                          onCompareToggle={toggleComparison}
                          isSelected={selectedForComparison.some(item => item.id === "exemple-6")}
                          compareCount={selectedForComparison.length}
                        />
                      </>
                    )}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-12">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                            Précédent
                          </Button>
                          
                          <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                              <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => goToPage(page)}
                                className="w-10"
                              >
                                {page}
                              </Button>
                            ))}
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Suivant
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Comparateur flottant */}
      {selectedForComparison.length >= 2 && (
        <CompanyComparator 
          companies={selectedForComparison as any[]} 
          onClose={() => setSelectedForComparison([])}
        />
      )}
    </div>
  );
};

export default Entreprises;

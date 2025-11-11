import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EntrepriseCard from "@/components/EntrepriseCard";
import { BTPMetiersSelect } from "@/data/btp-metiers";
import { useToast } from "@/hooks/use-toast";

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

const Entreprises = () => {
  const { toast } = useToast();
  const [showFilters, setShowFilters] = useState(true);
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [secteurFilter, setSecteurFilter] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [caRange, setCARange] = useState<number[]>([0, 5000000]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000000]);
  const [sortBy, setSortBy] = useState<string>("recent");

  useEffect(() => {
    fetchAnnonces();
  }, []);

  const fetchAnnonces = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("annonces")
        .select("*")
        .eq("statut", "publiee");

      // Apply filters
      if (secteurFilter) {
        query = query.eq("secteur_activite", secteurFilter);
      }
      if (regionFilter) {
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
      toast({
        title: "Erreur",
        description: "Impossible de charger les annonces",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-12 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Entreprises BTP Disponibles</h1>
            <p className="text-xl text-muted-foreground">
              {loading ? "Chargement..." : `${annonces.length} opportunités à saisir`}
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
                    <Select value={secteurFilter} onValueChange={setSecteurFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tous les secteurs" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[400px] overflow-y-auto">
                        <SelectItem value="">Tous les secteurs</SelectItem>
                        <BTPMetiersSelect />
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Département</label>
                    <Select value={regionFilter} onValueChange={setRegionFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tous les départements" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous les départements</SelectItem>
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
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filtres
                </Button>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Plus récentes</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="ca-desc">CA décroissant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">Chargement des annonces...</p>
                  </div>
                ) : annonces.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">Aucune annonce ne correspond à vos critères</p>
                  </div>
                ) : (
                  annonces.map((annonce) => {
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
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Entreprises;

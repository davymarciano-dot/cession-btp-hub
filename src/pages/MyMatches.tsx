import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MatchCard } from "@/components/matching/MatchCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Sparkles, Search, SlidersHorizontal, Target } from "lucide-react";

const MyMatches = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [minScore, setMinScore] = useState('0');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchMatches();
    }
  }, [user]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }
    setUser(user);
  };

  const fetchMatches = async () => {
    try {
      // Using any to bypass type issues until Supabase regenerates types
      const { data, error } = await supabase
        .from('matches' as any)
        .select(`
          *,
          listing:annonces!matches_listing_id_fkey (
            id,
            raison_sociale,
            secteur_activite,
            ville,
            departement,
            prix_vente,
            nombre_salaries,
            description_activite
          )
        `)
        .eq('buyer_id', user.id)
        .order('score', { ascending: false }) as any;

      if (error) throw error;
      setMatches(data || []);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les matchs
  const filteredMatches = matches.filter(match => {
    if (!match.listing) return false;
    
    const matchesSearch = match.listing.raison_sociale?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         match.listing.description_activite?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScore = match.score >= parseInt(minScore);
    const matchesSector = sectorFilter === 'all' || match.listing.secteur_activite === sectorFilter;
    const matchesLocation = locationFilter === 'all' || match.listing.departement === locationFilter;
    
    return matchesSearch && matchesScore && matchesSector && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Mes Matchs</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Entreprises correspondant à vos critères • Matchées par IA
            </p>
          </div>

          {/* Filtres */}
          {!loading && matches.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  Filtres
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={minScore} onValueChange={setMinScore}>
                    <SelectTrigger>
                      <SelectValue placeholder="Score minimum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Tous les scores</SelectItem>
                      <SelectItem value="70">70% et plus</SelectItem>
                      <SelectItem value="80">80% et plus</SelectItem>
                      <SelectItem value="90">90% et plus</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sectorFilter} onValueChange={setSectorFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Secteur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les secteurs</SelectItem>
                      <SelectItem value="Maçonnerie">Maçonnerie</SelectItem>
                      <SelectItem value="Plomberie">Plomberie</SelectItem>
                      <SelectItem value="Électricité">Électricité</SelectItem>
                      <SelectItem value="Couverture">Couverture</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Département" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les départements</SelectItem>
                      <SelectItem value="75">Paris (75)</SelectItem>
                      <SelectItem value="69">Rhône (69)</SelectItem>
                      <SelectItem value="13">Bouches-du-Rhône (13)</SelectItem>
                      <SelectItem value="31">Haute-Garonne (31)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          {!loading && matches.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-1">{matches.length}</div>
                  <div className="text-sm text-muted-foreground">Matchs totaux</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {matches.filter(m => m.score >= 85).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Matchs excellents (85%+)</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {matches.filter(m => m.status === "pending").length}
                  </div>
                  <div className="text-sm text-muted-foreground">En attente de contact</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Matches Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-32 w-full mb-4" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </Card>
              ))}
            </div>
          ) : matches.length === 0 ? (
            <Card className="p-12 text-center">
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">
                Aucun match pour le moment
              </h2>
              <p className="text-muted-foreground mb-6">
                Créez des alertes pour recevoir des suggestions personnalisées
              </p>
            </Card>
          ) : filteredMatches.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun match trouvé</h3>
                <p className="text-muted-foreground">
                  Essayez de modifier vos filtres pour voir plus de résultats
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  {filteredMatches.length} entreprise{filteredMatches.length > 1 ? 's' : ''} trouvée{filteredMatches.length > 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </>
          )}

          {/* Info matching */}
          {!loading && matches.length > 0 && (
            <Card className="mt-8 bg-muted/30">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Comment fonctionne le matching ?
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Notre algorithme d'IA analyse plusieurs critères pour trouver les meilleures entreprises :
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Localisation</strong> : 30 points - Proximité géographique</li>
                  <li>• <strong>Budget</strong> : 25 points - Adéquation avec le prix</li>
                  <li>• <strong>Secteur</strong> : 20 points - Expertise dans votre domaine</li>
                  <li>• <strong>Taille</strong> : 15 points - Compatibilité de taille</li>
                  <li>• <strong>Timing</strong> : 10 points - Disponibilité</li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyMatches;
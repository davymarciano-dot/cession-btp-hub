import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Search, Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    city: "",
    sector: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchFavorites();
      fetchListings();
    }
  }, [user]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Accès refusé", {
        description: "Vous devez être connecté pour accéder au dashboard"
      });
      navigate("/auth");
      return;
    }
    
    setUser(user);
  };

  const fetchFavorites = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from("favorites")
        .select(`
          *,
          annonces (*)
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const fetchListings = async () => {
    try {
      let query = supabase
        .from("annonces")
        .select("*")
        .eq("statut", "publiee")
        .order("created_at", { ascending: false })
        .limit(10);

      const { data, error } = await query;

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (listingId: string) => {
    try {
      if (!user) return;

      const isFavorite = favorites.some(f => f.listing_id === listingId);

      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("listing_id", listingId);

        if (error) throw error;
        toast.success("Retiré des favoris");
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({
            user_id: user.id,
            listing_id: listingId
          });

        if (error) throw error;
        toast.success("Ajouté aux favoris");
      }

      fetchFavorites();
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Erreur lors de l'opération");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="min-h-screen bg-muted/30">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Acheteur</h1>
            <p className="text-muted-foreground">Trouvez l'entreprise de vos rêves</p>
          </div>

        {/* Search Filters */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Search className="h-5 w-5 inline mr-2" />
              Recherche avancée
            </CardTitle>
            <CardDescription>Filtrez les annonces selon vos critères</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Prix minimum</Label>
                <Input
                  type="number"
                  placeholder="Ex: 100000"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                />
              </div>
              <div>
                <Label>Prix maximum</Label>
                <Input
                  type="number"
                  placeholder="Ex: 500000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                />
              </div>
              <div>
                <Label>Ville</Label>
                <Input
                  placeholder="Ex: Paris"
                  value={filters.city}
                  onChange={(e) => setFilters({...filters, city: e.target.value})}
                />
              </div>
              <div>
                <Label>Secteur</Label>
                <Input
                  placeholder="Ex: Maçonnerie"
                  value={filters.sector}
                  onChange={(e) => setFilters({...filters, sector: e.target.value})}
                />
              </div>
            </div>
            <Button className="mt-4" onClick={fetchListings}>
              Rechercher
            </Button>
          </CardContent>
        </Card>

        {/* Favorites */}
        {favorites.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>
                <Heart className="h-5 w-5 inline mr-2 text-red-500" />
                Mes Favoris ({favorites.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {favorites.map((fav) => (
                  <div key={fav.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold">{fav.annonces.secteur_activite}</h3>
                    <p className="text-sm text-muted-foreground">
                      {fav.annonces.ville} ({fav.annonces.departement})
                    </p>
                    <p className="text-lg font-bold text-primary mt-2">
                      {fav.annonces.prix_vente?.toLocaleString()} €
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button asChild size="sm" className="flex-1">
                        <Link to={`/annonce/${fav.annonces.id}`}>Voir</Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleFavorite(fav.listing_id)}
                      >
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Listings */}
        <Card>
          <CardHeader>
            <CardTitle>Nouvelles Annonces</CardTitle>
            <CardDescription>Les dernières entreprises à vendre</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {listings.map((listing) => {
                const isFavorite = favorites.some(f => f.listing_id === listing.id);
                return (
                  <div
                    key={listing.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{listing.secteur_activite}</h3>
                      <p className="text-sm text-muted-foreground">
                        {listing.ville} ({listing.departement})
                      </p>
                      <p className="text-lg font-bold text-primary mt-1">
                        {listing.prix_vente?.toLocaleString()} €
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {listing.nombre_salaries} employés • CA: {listing.ca_n1?.toLocaleString()} €
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(listing.id)}
                      >
                        <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-red-500' : ''}`} />
                      </Button>
                      <Button asChild size="sm">
                        <Link to={`/annonce/${listing.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Voir
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuyerDashboard;
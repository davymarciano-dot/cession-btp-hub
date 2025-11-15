import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Trash2, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const SellerDashboard = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, views: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from("annonces")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setListings(data || []);
      
      // Calculate stats
      const totalViews = data?.reduce((sum, listing) => sum + (listing.nombre_vues || 0), 0) || 0;
      setStats({
        total: data?.length || 0,
        views: totalViews
      });
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast.error("Erreur lors du chargement des annonces");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) return;

    try {
      const { error } = await supabase
        .from("annonces")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Annonce supprimée");
      fetchListings();
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Vendeur</h1>
            <p className="text-muted-foreground">Gérez vos annonces d'entreprises</p>
          </div>
          <Button asChild>
            <Link to="/vendre">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle annonce
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{stats.total}</CardTitle>
              <CardDescription>Annonces publiées</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{stats.views}</CardTitle>
              <CardDescription>Vues totales</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Listings */}
        <Card>
          <CardHeader>
            <CardTitle>Mes Annonces</CardTitle>
            <CardDescription>
              Gérez et suivez vos annonces d'entreprises
            </CardDescription>
          </CardHeader>
          <CardContent>
            {listings.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>Vous n'avez pas encore d'annonce</p>
                <Button asChild className="mt-4">
                  <Link to="/vendre">Créer ma première annonce</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {listings.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{listing.secteur_activite}</h3>
                      <p className="text-sm text-muted-foreground">
                        {listing.ville} ({listing.departement})
                      </p>
                      <p className="text-sm font-medium text-primary mt-1">
                        {listing.prix_vente?.toLocaleString()} €
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span>{listing.nombre_vues || 0} vues</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/annonce/${listing.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(listing.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboard;
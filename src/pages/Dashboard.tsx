import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard, FileText, Eye, TrendingUp, Plus,
  LogOut, Loader2, Edit, Trash2
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [annonces, setAnnonces] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/auth");
        } else {
          setTimeout(() => {
            fetchAnnonces(session.user.id);
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      } else {
        fetchAnnonces(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchAnnonces = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('annonces')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnnonces(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger vos annonces.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt sur CessionBTP !",
    });
    navigate("/");
  };

  const handleDeleteAnnonce = async (annonceId: string) => {
    try {
      const { error } = await supabase
        .from('annonces')
        .delete()
        .eq('id', annonceId);

      if (error) throw error;

      toast({
        title: "✅ Annonce supprimée",
        description: "L'annonce a été supprimée avec succès.",
      });

      setAnnonces(annonces.filter(a => a.id !== annonceId));
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'annonce.",
        variant: "destructive",
      });
    }
  };

  const getTotalVues = () => {
    return annonces.reduce((sum, annonce) => sum + (annonce.nombre_vues || 0), 0);
  };

  const getAnnoncesActives = () => {
    return annonces.filter(a => a.statut === 'publiee').length;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <LayoutDashboard className="w-8 h-8" />
                Tableau de Bord Vendeur
              </h1>
              <p className="text-white/90">Bienvenue {user?.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Annonces totales</p>
                  <p className="text-3xl font-bold">{annonces.length}</p>
                </div>
                <FileText className="w-12 h-12 text-primary opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Annonces actives</p>
                  <p className="text-3xl font-bold">{getAnnoncesActives()}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Vues totales</p>
                  <p className="text-3xl font-bold">{getTotalVues()}</p>
                </div>
                <Eye className="w-12 h-12 text-secondary opacity-20" />
              </div>
            </Card>
          </div>

          {/* Actions */}
          <div className="mb-6">
            <Button
              onClick={() => navigate("/vendre")}
              size="lg"
              className="bg-secondary hover:bg-secondary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Créer une nouvelle annonce
            </Button>
          </div>

          {/* Table des annonces */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Mes Annonces</h2>
              
              {annonces.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Aucune annonce pour le moment</p>
                  <Button onClick={() => navigate("/vendre")} className="bg-secondary hover:bg-secondary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Créer ma première annonce
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Entreprise</TableHead>
                      <TableHead>Secteur</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Vues</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {annonces.map((annonce) => (
                      <TableRow key={annonce.id}>
                        <TableCell className="font-medium">
                          {annonce.raison_sociale || `Entreprise ${annonce.secteur_activite}`}
                        </TableCell>
                        <TableCell>{annonce.secteur_activite}</TableCell>
                        <TableCell>{annonce.prix_vente.toLocaleString('fr-FR')} €</TableCell>
                        <TableCell>
                          <Badge variant={annonce.statut === 'publiee' ? 'default' : 'secondary'}>
                            {annonce.statut}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {annonce.nombre_vues || 0}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(annonce.created_at).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => navigate(`/entreprises/${annonce.id}`)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Supprimer l'annonce ?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Cette action est irréversible. L'annonce sera définitivement supprimée.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteAnnonce(annonce.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Supprimer
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
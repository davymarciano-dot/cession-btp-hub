import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Building2, TrendingUp, Users, Eye, Plus, RefreshCw } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { AdminAnnoncesList } from '@/components/admin/AdminAnnoncesList';
import { AdminAnnonceForm } from '@/components/admin/AdminAnnonceForm';
import { AdminStats } from '@/components/admin/AdminStats';

interface Annonce {
  id: string;
  raison_sociale: string | null;
  secteur_activite: string;
  ville: string;
  departement: string;
  code_postal: string;
  prix_vente: number;
  ca_n1: number;
  resultat_net_n1: number;
  nombre_salaries: number;
  description_activite: string;
  annee_creation: number;
  statut: string;
  created_at: string;
  nombre_vues: number | null;
}

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAnnonce, setEditingAnnonce] = useState<Annonce | null>(null);

  const fetchAnnonces = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('annonces')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setAnnonces(data as Annonce[]);
    }
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de charger les annonces',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast({
            title: "Erreur d'authentification",
            description: "Vous devez être connecté pour accéder à cette page",
            variant: "destructive"
          });
          navigate("/auth");
          return;
        }

        // Check if user has admin role
        const { data: userRoles, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .single();

        if (roleError || !userRoles) {
          toast({
            title: "Accès refusé",
            description: "Vous n'avez pas les permissions administrateur",
            variant: "destructive"
          });
          navigate("/");
          return;
        }

        setIsAdmin(true);
        fetchAnnonces();
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la vérification des permissions",
          variant: "destructive"
        });
        navigate("/");
      }
    };

    checkAdminAccess();
  }, [navigate, toast]);

  const handleDeleteAnnonce = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) return;
    
    const { error } = await supabase
      .from('annonces')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de supprimer l\'annonce',
      });
    } else {
      toast({
        title: 'Succès',
        description: 'Annonce supprimée avec succès',
      });
      fetchAnnonces();
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('annonces')
      .update({ statut: newStatus })
      .eq('id', id);
    
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de modifier le statut',
      });
    } else {
      toast({
        title: 'Succès',
        description: 'Statut modifié avec succès',
      });
      fetchAnnonces();
    }
  };

  const handleEditAnnonce = (annonce: Annonce) => {
    setEditingAnnonce(annonce);
    setShowCreateForm(true);
  };

  const handleFormSuccess = () => {
    setShowCreateForm(false);
    setEditingAnnonce(null);
    fetchAnnonces();
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Administration - CessionBTP</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Administration</h1>
            <p className="text-muted-foreground">Gérez les annonces et surveillez l'activité de la plateforme</p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="annonces">Annonces ({annonces.length})</TabsTrigger>
              <TabsTrigger value="create">Créer une annonce</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Statistiques globales</h2>
                <Button onClick={fetchAnnonces} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualiser
                </Button>
              </div>
              
              <AdminStats annonces={annonces} loading={loading} />

              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                  <CardDescription>Raccourcis vers les fonctionnalités principales</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <Button onClick={() => setShowCreateForm(true)} className="h-20">
                    <Plus className="h-5 w-5 mr-2" />
                    Créer une nouvelle annonce
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/entreprises")} className="h-20">
                    <Eye className="h-5 w-5 mr-2" />
                    Voir les annonces publiques
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="annonces">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Gestion des annonces</h2>
                <div className="flex gap-2">
                  <Button onClick={fetchAnnonces} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Actualiser
                  </Button>
                  <Button onClick={() => setShowCreateForm(true)} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle annonce
                  </Button>
                </div>
              </div>

              <AdminAnnoncesList
                annonces={annonces}
                loading={loading}
                onDelete={handleDeleteAnnonce}
                onEdit={handleEditAnnonce}
                onUpdateStatus={handleUpdateStatus}
              />
            </TabsContent>

            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>{editingAnnonce ? 'Modifier l\'annonce' : 'Créer une nouvelle annonce'}</CardTitle>
                  <CardDescription>
                    {editingAnnonce 
                      ? 'Modifiez les informations de l\'annonce existante'
                      : 'Remplissez les informations pour créer une nouvelle annonce'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminAnnonceForm
                    annonce={editingAnnonce}
                    onSuccess={handleFormSuccess}
                    onCancel={() => {
                      setShowCreateForm(false);
                      setEditingAnnonce(null);
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Admin;

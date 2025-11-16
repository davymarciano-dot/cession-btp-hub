import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, RefreshCw } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface Annonce {
  id: string;
  raison_sociale: string;
  secteur_activite: string;
  ville: string;
  departement: string;
  prix_vente: number;
  ca_n1: number;
  nombre_salaries: number;
  description_activite: string;
  statut: string;
  created_at: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, publiees: 0, brouillons: 0 });
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    raison_sociale: '',
    secteur_activite: '',
    ville: '',
    departement: '',
    code_postal: '',
    prix_vente: '',
    ca_n1: '',
    resultat_net_n1: '',
    nombre_salaries: '',
    description_activite: '',
    annee_creation: '',
    civilite: 'M',
    nom_prenom: '',
    email: '',
    telephone: '',
    forme_juridique: 'SARL',
    situation_locaux: 'locataire',
    type_transmission: 'vente',
    delai_vente: '3-6 mois',
    motif_vente: 'Retraite',
    financement_bancaire: 'bancaire',
    niveau_anonymat: 'partiel',
    visites_possibles: 'oui',
    atouts_principaux: '',
    preference_contact: 'email',
    formule_abonnement: 'essentielle',
    montant_abonnement: '69',
    dettes_totales: '0',
  });

  const fetchAnnonces = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('annonces')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
      setAnnonces(data);
      setStats({
        total: data.length,
        publiees: data.filter(a => a.statut === 'publiee').length,
        brouillons: data.filter(a => a.statut === 'brouillon').length,
      });
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
          window.location.href = "/auth";
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
          window.location.href = "/";
          return;
        }

        // User is admin, fetch data
        fetchAnnonces();
      } catch (error) {
        console.error("Erreur lors de la vérification des permissions:", error);
        toast({
          title: "Erreur",
          description: "Erreur lors de la vérification des permissions",
          variant: "destructive"
        });
        window.location.href = "/";
      }
    };

    checkAdminAccess();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from('annonces').insert([{
      raison_sociale: formData.raison_sociale,
      secteur_activite: formData.secteur_activite,
      ville: formData.ville,
      departement: formData.departement,
      code_postal: formData.code_postal,
      prix_vente: parseFloat(formData.prix_vente),
      ca_n1: parseFloat(formData.ca_n1),
      resultat_net_n1: parseFloat(formData.resultat_net_n1),
      nombre_salaries: parseInt(formData.nombre_salaries),
      description_activite: formData.description_activite,
      annee_creation: parseInt(formData.annee_creation),
      civilite: formData.civilite,
      nom_prenom: formData.nom_prenom,
      email: formData.email,
      telephone: formData.telephone,
      forme_juridique: formData.forme_juridique,
      situation_locaux: formData.situation_locaux,
      type_transmission: formData.type_transmission,
      delai_vente: formData.delai_vente,
      motif_vente: formData.motif_vente,
      financement_bancaire: formData.financement_bancaire,
      niveau_anonymat: formData.niveau_anonymat,
      visites_possibles: formData.visites_possibles,
      atouts_principaux: formData.atouts_principaux,
      preference_contact: formData.preference_contact,
      formule_abonnement: formData.formule_abonnement,
      montant_abonnement: parseFloat(formData.montant_abonnement),
      dettes_totales: parseFloat(formData.dettes_totales),
      statut: 'publiee',
      accepte_cgu: true,
      accepte_contact: true,
      certifie_exactitude: true,
      accompagnement_vendeur: false,
      complement_vendeur: false,
      credits_en_cours: false,
      litiges_en_cours: false,
      prix_negociable: true,
      nda_requis: false,
      date_expiration: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    }]);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: 'Impossible de créer l\'annonce',
      });
    } else {
      toast({
        title: 'Succès',
        description: 'Annonce créée avec succès',
      });
      setShowForm(false);
      fetchAnnonces();
      // Reset form
      setFormData({
        raison_sociale: '',
        secteur_activite: '',
        ville: '',
        departement: '',
        code_postal: '',
        prix_vente: '',
        ca_n1: '',
        resultat_net_n1: '',
        nombre_salaries: '',
        description_activite: '',
        annee_creation: '',
        civilite: 'M',
        nom_prenom: '',
        email: '',
        telephone: '',
        forme_juridique: 'SARL',
        situation_locaux: 'locataire',
        type_transmission: 'vente',
        delai_vente: '3-6 mois',
        motif_vente: 'Retraite',
        financement_bancaire: 'bancaire',
        niveau_anonymat: 'partiel',
        visites_possibles: 'oui',
        atouts_principaux: '',
        preference_contact: 'email',
        formule_abonnement: 'essentielle',
        montant_abonnement: '69',
        dettes_totales: '0',
      });
    }
  };

  const handleDelete = async (id: string) => {
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
        description: 'Annonce supprimée',
      });
      fetchAnnonces();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Helmet>
        <title>Administration - CessionBTP</title>
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Administration des Annonces</h1>
          <p className="text-muted-foreground">Gérez toutes les annonces de la plateforme</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total des annonces</div>
            <div className="text-3xl font-bold">{stats.total}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Annonces publiées</div>
            <div className="text-3xl font-bold text-green-600">{stats.publiees}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Brouillons</div>
            <div className="text-3xl font-bold text-orange-600">{stats.brouillons}</div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus size={20} />
            {showForm ? 'Annuler' : 'Nouvelle annonce'}
          </Button>
          <Button onClick={fetchAnnonces} variant="outline" className="gap-2">
            <RefreshCw size={20} />
            Actualiser
          </Button>
        </div>

        {/* Formulaire */}
        {showForm && (
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Nouvelle Annonce</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="raison_sociale">Raison sociale *</Label>
                  <Input
                    id="raison_sociale"
                    name="raison_sociale"
                    value={formData.raison_sociale}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="secteur_activite">Secteur d'activité *</Label>
                  <Input
                    id="secteur_activite"
                    name="secteur_activite"
                    value={formData.secteur_activite}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ville">Ville *</Label>
                  <Input
                    id="ville"
                    name="ville"
                    value={formData.ville}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="departement">Département *</Label>
                  <Input
                    id="departement"
                    name="departement"
                    value={formData.departement}
                    onChange={handleInputChange}
                    placeholder="Ex: 75"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="code_postal">Code postal *</Label>
                  <Input
                    id="code_postal"
                    name="code_postal"
                    value={formData.code_postal}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="prix_vente">Prix de vente (€) *</Label>
                  <Input
                    id="prix_vente"
                    name="prix_vente"
                    type="number"
                    value={formData.prix_vente}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ca_n1">CA N-1 (€) *</Label>
                  <Input
                    id="ca_n1"
                    name="ca_n1"
                    type="number"
                    value={formData.ca_n1}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="resultat_net_n1">Résultat net N-1 (€) *</Label>
                  <Input
                    id="resultat_net_n1"
                    name="resultat_net_n1"
                    type="number"
                    value={formData.resultat_net_n1}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nombre_salaries">Nombre de salariés *</Label>
                  <Input
                    id="nombre_salaries"
                    name="nombre_salaries"
                    type="number"
                    value={formData.nombre_salaries}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="annee_creation">Année de création *</Label>
                  <Input
                    id="annee_creation"
                    name="annee_creation"
                    type="number"
                    value={formData.annee_creation}
                    onChange={handleInputChange}
                    placeholder="Ex: 2015"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nom_prenom">Contact (Nom Prénom) *</Label>
                  <Input
                    id="nom_prenom"
                    name="nom_prenom"
                    value={formData.nom_prenom}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description_activite">Description de l'activité *</Label>
                <Textarea
                  id="description_activite"
                  name="description_activite"
                  value={formData.description_activite}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="atouts_principaux">Atouts principaux *</Label>
                <Textarea
                  id="atouts_principaux"
                  name="atouts_principaux"
                  value={formData.atouts_principaux}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit">Créer l'annonce</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Annuler
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Liste des annonces */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Liste des Annonces ({annonces.length})</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Chargement...</p>
            </div>
          ) : annonces.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucune annonce</p>
            </div>
          ) : (
            <div className="space-y-4">
              {annonces.map((annonce) => (
                <Card key={annonce.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{annonce.raison_sociale || `Entreprise ${annonce.secteur_activite}`}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          annonce.statut === 'publiee' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        }`}>
                          {annonce.statut}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Secteur:</span>
                          <div className="font-medium">{annonce.secteur_activite}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Localisation:</span>
                          <div className="font-medium">{annonce.ville} ({annonce.departement})</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Prix:</span>
                          <div className="font-medium">{(annonce.prix_vente / 1000).toFixed(0)}K€</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">CA:</span>
                          <div className="font-medium">{(annonce.ca_n1 / 1000).toFixed(0)}K€</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Effectif:</span>
                          <div className="font-medium">{annonce.nombre_salaries} salariés</div>
                        </div>
                        <div className="col-span-3">
                          <span className="text-muted-foreground">Créée le:</span>
                          <div className="font-medium">{new Date(annonce.created_at).toLocaleDateString('fr-FR')}</div>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm line-clamp-2">{annonce.description_activite}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(annonce.id)}
                      className="ml-4"
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;

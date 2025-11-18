import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface Annonce {
  id?: string;
  raison_sociale?: string | null;
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
  statut?: string;
}

interface AdminAnnonceFormProps {
  annonce: Annonce | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminAnnonceForm = ({ annonce, onSuccess, onCancel }: AdminAnnonceFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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
    statut: 'publiee',
  });

  useEffect(() => {
    if (annonce) {
      setFormData({
        raison_sociale: annonce.raison_sociale || '',
        secteur_activite: annonce.secteur_activite,
        ville: annonce.ville,
        departement: annonce.departement,
        code_postal: annonce.code_postal,
        prix_vente: annonce.prix_vente.toString(),
        ca_n1: annonce.ca_n1.toString(),
        resultat_net_n1: annonce.resultat_net_n1.toString(),
        nombre_salaries: annonce.nombre_salaries.toString(),
        description_activite: annonce.description_activite,
        annee_creation: annonce.annee_creation.toString(),
        statut: annonce.statut || 'publiee',
      });
    }
  }, [annonce]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const annonceData = {
      raison_sociale: formData.raison_sociale || null,
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
      statut: formData.statut,
      // Required fields with defaults
      civilite: 'M',
      nom_prenom: 'Admin',
      email: 'admin@cessionbtp.fr',
      telephone: '0000000000',
      forme_juridique: 'SARL',
      situation_locaux: 'locataire',
      type_transmission: 'vente',
      delai_vente: '3-6 mois',
      motif_vente: 'Autre',
      financement_bancaire: 'bancaire',
      niveau_anonymat: 'partiel',
      visites_possibles: 'oui',
      atouts_principaux: 'Entreprise solide',
      preference_contact: 'email',
      formule_abonnement: 'essentielle',
      montant_abonnement: 290,
      dettes_totales: 0,
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
    };

    try {
      if (annonce?.id) {
        // Update existing
        const { error } = await supabase
          .from('annonces')
          .update(annonceData)
          .eq('id', annonce.id);

        if (error) throw error;

        toast({
          title: 'Succès',
          description: 'Annonce modifiée avec succès',
        });
      } else {
        // Create new
        const { error } = await supabase
          .from('annonces')
          .insert([annonceData]);

        if (error) throw error;

        toast({
          title: 'Succès',
          description: 'Annonce créée avec succès',
        });
      }

      onSuccess();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="raison_sociale">Raison sociale</Label>
          <Input
            id="raison_sociale"
            value={formData.raison_sociale}
            onChange={(e) => setFormData({ ...formData, raison_sociale: e.target.value })}
            placeholder="Entreprise BTP"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="secteur_activite">Secteur d'activité *</Label>
          <Input
            id="secteur_activite"
            value={formData.secteur_activite}
            onChange={(e) => setFormData({ ...formData, secteur_activite: e.target.value })}
            placeholder="Maçonnerie, Électricité..."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ville">Ville *</Label>
          <Input
            id="ville"
            value={formData.ville}
            onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="departement">Département *</Label>
          <Input
            id="departement"
            value={formData.departement}
            onChange={(e) => setFormData({ ...formData, departement: e.target.value })}
            placeholder="75"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="code_postal">Code postal *</Label>
          <Input
            id="code_postal"
            value={formData.code_postal}
            onChange={(e) => setFormData({ ...formData, code_postal: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prix_vente">Prix de vente (€) *</Label>
          <Input
            id="prix_vente"
            type="number"
            value={formData.prix_vente}
            onChange={(e) => setFormData({ ...formData, prix_vente: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ca_n1">CA année N-1 (€) *</Label>
          <Input
            id="ca_n1"
            type="number"
            value={formData.ca_n1}
            onChange={(e) => setFormData({ ...formData, ca_n1: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resultat_net_n1">Résultat net N-1 (€) *</Label>
          <Input
            id="resultat_net_n1"
            type="number"
            value={formData.resultat_net_n1}
            onChange={(e) => setFormData({ ...formData, resultat_net_n1: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nombre_salaries">Nombre de salariés *</Label>
          <Input
            id="nombre_salaries"
            type="number"
            value={formData.nombre_salaries}
            onChange={(e) => setFormData({ ...formData, nombre_salaries: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="annee_creation">Année de création *</Label>
          <Input
            id="annee_creation"
            type="number"
            value={formData.annee_creation}
            onChange={(e) => setFormData({ ...formData, annee_creation: e.target.value })}
            placeholder="2010"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="statut">Statut *</Label>
          <Select value={formData.statut} onValueChange={(value) => setFormData({ ...formData, statut: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="publiee">Publiée</SelectItem>
              <SelectItem value="brouillon">Brouillon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description_activite">Description de l'activité *</Label>
        <Textarea
          id="description_activite"
          value={formData.description_activite}
          onChange={(e) => setFormData({ ...formData, description_activite: e.target.value })}
          rows={5}
          placeholder="Décrivez l'activité de l'entreprise..."
          required
        />
      </div>

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Annuler
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {annonce ? 'Modifier' : 'Créer'} l'annonce
        </Button>
      </div>
    </form>
  );
};

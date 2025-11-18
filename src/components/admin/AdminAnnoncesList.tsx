import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, MoreVertical, Edit, Trash2, Eye, CheckCircle2, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Annonce {
  id: string;
  raison_sociale: string | null;
  secteur_activite: string;
  ville: string;
  departement: string;
  prix_vente: number;
  ca_n1: number;
  nombre_salaries: number;
  description_activite: string;
  statut: string;
  created_at: string;
  nombre_vues: number | null;
}

interface AdminAnnoncesListProps {
  annonces: Annonce[];
  loading: boolean;
  onDelete: (id: string) => void;
  onEdit: (annonce: Annonce) => void;
  onUpdateStatus: (id: string, status: string) => void;
}

export const AdminAnnoncesList = ({
  annonces,
  loading,
  onDelete,
  onEdit,
  onUpdateStatus,
}: AdminAnnoncesListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredAnnonces = annonces.filter((annonce) => {
    const matchesSearch = 
      annonce.raison_sociale?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      annonce.secteur_activite.toLowerCase().includes(searchTerm.toLowerCase()) ||
      annonce.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
      annonce.departement.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || annonce.statut === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      'publiee': { variant: 'default', label: 'Publiée' },
      'brouillon': { variant: 'secondary', label: 'Brouillon' },
      'expiree': { variant: 'destructive', label: 'Expirée' },
    };

    const config = variants[status] || { variant: 'outline', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-4 border-b space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par raison sociale, secteur, ville..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(null)}
            >
              Toutes
            </Button>
            <Button
              variant={statusFilter === 'publiee' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('publiee')}
            >
              Publiées
            </Button>
            <Button
              variant={statusFilter === 'brouillon' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('brouillon')}
            >
              Brouillons
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Entreprise</TableHead>
              <TableHead>Secteur</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>CA</TableHead>
              <TableHead>Vues</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Créée</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAnnonces.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  Aucune annonce trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredAnnonces.map((annonce) => (
                <TableRow key={annonce.id}>
                  <TableCell className="font-medium">
                    {annonce.raison_sociale || 'Entreprise anonyme'}
                  </TableCell>
                  <TableCell>{annonce.secteur_activite}</TableCell>
                  <TableCell>
                    {annonce.ville} ({annonce.departement})
                  </TableCell>
                  <TableCell>{formatPrice(annonce.prix_vente)}</TableCell>
                  <TableCell>{formatPrice(annonce.ca_n1)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      {annonce.nombre_vues || 0}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(annonce.statut)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(annonce.created_at), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => window.open(`/entreprises/${annonce.id}`, '_blank')}>
                          <Eye className="h-4 w-4 mr-2" />
                          Voir l'annonce
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(annonce)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {annonce.statut === 'brouillon' && (
                          <DropdownMenuItem onClick={() => onUpdateStatus(annonce.id, 'publiee')}>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Publier
                          </DropdownMenuItem>
                        )}
                        {annonce.statut === 'publiee' && (
                          <DropdownMenuItem onClick={() => onUpdateStatus(annonce.id, 'brouillon')}>
                            <XCircle className="h-4 w-4 mr-2" />
                            Dépublier
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDelete(annonce.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

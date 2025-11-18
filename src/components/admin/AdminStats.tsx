import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, TrendingUp, Users, Eye, FileText, CheckCircle2, XCircle } from 'lucide-react';

interface Annonce {
  id: string;
  statut: string;
  prix_vente: number;
  ca_n1: number;
  nombre_vues: number | null;
  created_at: string;
}

interface AdminStatsProps {
  annonces: Annonce[];
  loading: boolean;
}

export const AdminStats = ({ annonces, loading }: AdminStatsProps) => {
  const stats = {
    total: annonces.length,
    publiees: annonces.filter(a => a.statut === 'publiee').length,
    brouillons: annonces.filter(a => a.statut === 'brouillon').length,
    totalVues: annonces.reduce((sum, a) => sum + (a.nombre_vues || 0), 0),
    prixMoyen: annonces.length > 0 
      ? Math.round(annonces.reduce((sum, a) => sum + a.prix_vente, 0) / annonces.length)
      : 0,
    caMoyen: annonces.length > 0
      ? Math.round(annonces.reduce((sum, a) => sum + a.ca_n1, 0) / annonces.length)
      : 0,
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const statCards = [
    {
      title: 'Total annonces',
      value: stats.total,
      icon: FileText,
      description: `${stats.publiees} publiées, ${stats.brouillons} brouillons`,
      color: 'text-primary',
    },
    {
      title: 'Annonces publiées',
      value: stats.publiees,
      icon: CheckCircle2,
      description: 'Visibles sur la plateforme',
      color: 'text-green-600',
    },
    {
      title: 'Brouillons',
      value: stats.brouillons,
      icon: XCircle,
      description: 'En attente de publication',
      color: 'text-orange-600',
    },
    {
      title: 'Total vues',
      value: stats.totalVues.toLocaleString('fr-FR'),
      icon: Eye,
      description: 'Toutes annonces confondues',
      color: 'text-blue-600',
    },
    {
      title: 'Prix moyen',
      value: formatNumber(stats.prixMoyen),
      icon: TrendingUp,
      description: 'Prix de vente moyen',
      color: 'text-purple-600',
    },
    {
      title: 'CA moyen',
      value: formatNumber(stats.caMoyen),
      icon: Building2,
      description: 'Chiffre d\'affaires moyen',
      color: 'text-indigo-600',
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-24" />
              <div className="h-4 w-4 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-32 mb-2" />
              <div className="h-3 bg-muted rounded w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

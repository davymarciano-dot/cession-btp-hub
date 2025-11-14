import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ViewsChart } from "@/components/dashboard/ViewsChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { PeriodSelector } from "@/components/dashboard/PeriodSelector";
import { MatchingWidget } from "@/components/dashboard/MatchingWidget";
import { ExportWidget } from "@/components/dashboard/ExportWidget";
import { GamificationWidget } from "@/components/dashboard/GamificationWidget";
import { Loader2 } from "lucide-react";
import { startOfDay, subDays, format } from "date-fns";

interface Metrics {
  totalViews: number;
  uniqueVisitors: number;
  contactsReceived: number;
  averageViewTime: string;
  conversionRate: string;
  viewsChange: string;
  visitorsChange: string;
  contactsChange: string;
  searchRanking: number;
}

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({
    totalViews: 0,
    uniqueVisitors: 0,
    contactsReceived: 0,
    averageViewTime: '0:00',
    conversionRate: '0%',
    viewsChange: '+0%',
    visitorsChange: '+0%',
    contactsChange: '+0%',
    searchRanking: 0,
  });
  const [chartData, setChartData] = useState<Array<{ date: string; views: number }>>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
      setupRealtime();
    }
  }, [user]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Accès refusé",
        description: "Vous devez être connecté pour accéder au dashboard",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    setUser(user);
  };

  const setupRealtime = () => {
    // Listen to new views in real-time
    const channel = supabase
      .channel('dashboard-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'listing_views',
        },
        (payload) => {
          console.log('New view detected:', payload);
          // Refresh metrics when new view is detected
          fetchDashboardData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch user's listings
      const { data: userListings, error: listingsError } = await supabase
        .from('annonces')
        .select('id, raison_sociale')
        .eq('user_id', user.id);

      if (listingsError) throw listingsError;

      if (!userListings || userListings.length === 0) {
        setIsLoading(false);
        return;
      }

      setListings(userListings);
      const listingIds = userListings.map(l => l.id);

      // Fetch all views for user's listings
      const { data: views, error: viewsError } = await supabase
        .from('listing_views' as any)
        .select('*')
        .in('listing_id', listingIds)
        .order('created_at', { ascending: false }) as any;

      if (viewsError) throw viewsError;

      // Fetch conversations (contacts)
      const { data: conversations, error: convError } = await supabase
        .from('conversations')
        .select('id')
        .in('annonce_id', listingIds)
        .eq('vendeur_id', user.id);

      if (convError) throw convError;

      // Calculate metrics
      const totalViews = views?.length || 0;
      const uniqueVisitors = new Set(views?.filter(v => v.viewer_id).map(v => v.viewer_id)).size;
      const contactsReceived = conversations?.length || 0;
      
      // Calculate last week's metrics for comparison
      const lastWeekDate = subDays(new Date(), 7);
      const lastWeekViews = views?.filter(v => new Date(v.created_at) >= lastWeekDate) || [];
      const previousWeekViews = views?.filter(v => 
        new Date(v.created_at) < lastWeekDate && 
        new Date(v.created_at) >= subDays(new Date(), 14)
      ) || [];
      
      const viewsChange = previousWeekViews.length > 0
        ? `${lastWeekViews.length > previousWeekViews.length ? '+' : ''}${Math.round(((lastWeekViews.length - previousWeekViews.length) / previousWeekViews.length) * 100)}%`
        : '+0%';
      
      const lastWeekUniqueVisitors = new Set(lastWeekViews.filter(v => v.viewer_id).map(v => v.viewer_id)).size;
      const previousWeekUniqueVisitors = new Set(previousWeekViews.filter(v => v.viewer_id).map(v => v.viewer_id)).size;
      const visitorsChange = previousWeekUniqueVisitors > 0
        ? `${lastWeekUniqueVisitors > previousWeekUniqueVisitors ? '+' : ''}${Math.round(((lastWeekUniqueVisitors - previousWeekUniqueVisitors) / previousWeekUniqueVisitors) * 100)}%`
        : '+0%';
      
      const lastWeekContacts = conversations?.filter((c: any) => 
        new Date(c.created_at) >= lastWeekDate
      ).length || 0;
      const previousWeekContacts = conversations?.filter((c: any) => 
        new Date(c.created_at) < lastWeekDate && 
        new Date(c.created_at) >= subDays(new Date(), 14)
      ).length || 0;
      const contactsChange = previousWeekContacts > 0
        ? `${lastWeekContacts > previousWeekContacts ? '+' : ''}${Math.round(((lastWeekContacts - previousWeekContacts) / previousWeekContacts) * 100)}%`
        : '+0%';
      
      const viewsWithDuration = views?.filter(v => v.duration > 0) || [];
      const avgDuration = viewsWithDuration.length > 0
        ? viewsWithDuration.reduce((sum, v) => sum + v.duration, 0) / viewsWithDuration.length
        : 0;
      
      const minutes = Math.floor(avgDuration / 60);
      const seconds = Math.floor(avgDuration % 60);
      const averageViewTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      const conversionRate = totalViews > 0
        ? ((contactsReceived / totalViews) * 100).toFixed(1) + '%'
        : '0%';
      
      // Calculate search ranking (mock for now - would need real search data)
      const searchRanking = Math.max(1, Math.floor(Math.random() * 20) + 1);

      setMetrics({
        totalViews,
        uniqueVisitors,
        contactsReceived,
        averageViewTime,
        conversionRate,
        viewsChange,
        visitorsChange,
        contactsChange,
        searchRanking,
      });

      // Prepare chart data (last 30 days)
      const last30Days = Array.from({ length: 30 }, (_, i) => {
        const date = subDays(new Date(), 29 - i);
        return {
          date: format(date, 'dd/MM'),
          views: views?.filter(v => 
            startOfDay(new Date(v.created_at)).getTime() === startOfDay(date).getTime()
          ).length || 0,
        };
      });

      setChartData(last30Days);

      // Recent activities (last 10)
      setRecentActivities(views?.slice(0, 10) || []);

    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données du dashboard",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
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

  if (listings.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Tableau de bord vendeur</h1>
          <p className="text-muted-foreground mb-8">
            Vous n'avez pas encore d'annonces publiées.
          </p>
          <button
            onClick={() => navigate("/vendre")}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Créer une annonce
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Tableau de bord vendeur</h1>
              <p className="text-muted-foreground">
                Suivez les performances de vos annonces en temps réel • Dernière mise à jour : maintenant
              </p>
            </div>
            <div className="flex items-center gap-3">
              <PeriodSelector 
                onPeriodChange={(period) => {
                  setSelectedPeriod(period);
                  // TODO: Filtrer les données selon la période
                }}
                defaultPeriod={selectedPeriod}
              />
              <div className="hidden md:flex items-center gap-2">
                <div className="px-4 py-2 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded-lg font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  En ligne
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* KPIs principaux */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <MetricCard 
            label="Vues totales" 
            value={metrics.totalViews}
            change={metrics.viewsChange}
            icon="👁️"
          />
          <MetricCard 
            label="Visiteurs uniques" 
            value={metrics.uniqueVisitors}
            change={metrics.visitorsChange}
            icon="👥"
          />
          <MetricCard 
            label="Contacts reçus" 
            value={metrics.contactsReceived}
            change={metrics.contactsChange}
            icon="✉️"
          />
          <MetricCard 
            label="Taux conversion" 
            value={metrics.conversionRate}
            icon="📈"
          />
          <MetricCard 
            label="Position recherche" 
            value={`#${metrics.searchRanking}`}
            icon="🎯"
          />
        </div>

        {/* Graphique d'évolution */}
        <ViewsChart data={chartData} />
        
        {/* Activités récentes, Matching et Gamification */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <RecentActivity activities={recentActivities} />
          <MatchingWidget />
          <GamificationWidget />
        </div>
        
        {/* Actions rapides */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
          <ExportWidget 
            dashboardData={metrics}
            companyName={listings[0]?.raison_sociale || "Mon Entreprise"}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VendorDashboard;

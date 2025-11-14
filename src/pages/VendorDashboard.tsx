import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ViewsChart } from "@/components/dashboard/ViewsChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Loader2 } from "lucide-react";
import { startOfDay, subDays, format } from "date-fns";

interface Metrics {
  totalViews: number;
  uniqueVisitors: number;
  contactsReceived: number;
  averageViewTime: string;
  conversionRate: string;
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
  });
  const [chartData, setChartData] = useState<Array<{ date: string; views: number }>>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

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

      setMetrics({
        totalViews,
        uniqueVisitors,
        contactsReceived,
        averageViewTime,
        conversionRate,
      });

      // Prepare chart data (last 7 days)
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(new Date(), 6 - i);
        return {
          date: format(date, 'dd/MM'),
          views: views?.filter(v => 
            startOfDay(new Date(v.created_at)).getTime() === startOfDay(date).getTime()
          ).length || 0,
        };
      });

      setChartData(last7Days);

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
        <h1 className="text-3xl font-bold mb-2">Tableau de bord vendeur</h1>
        <p className="text-muted-foreground mb-8">
          Suivez les performances de vos annonces en temps réel
        </p>
        
        {/* KPIs principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <MetricCard 
            label="Vues totales" 
            value={metrics.totalViews}
            icon="👁️"
          />
          <MetricCard 
            label="Visiteurs uniques" 
            value={metrics.uniqueVisitors}
            icon="👥"
          />
          <MetricCard 
            label="Contacts reçus" 
            value={metrics.contactsReceived}
            icon="✉️"
          />
          <MetricCard 
            label="Temps moyen" 
            value={metrics.averageViewTime}
            icon="⏱️"
          />
          <MetricCard 
            label="Taux conversion" 
            value={metrics.conversionRate}
            icon="📈"
          />
        </div>

        {/* Graphique d'évolution */}
        <ViewsChart data={chartData} />
        
        {/* Dernières activités */}
        <RecentActivity activities={recentActivities} />
      </div>
      
      <Footer />
    </div>
  );
};

export default VendorDashboard;

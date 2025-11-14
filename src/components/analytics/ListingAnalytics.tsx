import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Eye, Clock, Monitor, Smartphone, Tablet } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface ListingAnalyticsProps {
  listingId: string;
}

interface ViewStats {
  totalViews: number;
  uniqueViewers: number;
  avgDuration: number;
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  recentViews: Array<{
    created_at: string;
    duration: number;
    device_type: string;
  }>;
}

export const ListingAnalytics = ({ listingId }: ListingAnalyticsProps) => {
  const [stats, setStats] = useState<ViewStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [listingId]);

  const fetchStats = async () => {
    try {
      // Fetch all views
      const { data: views, error } = await supabase
        .from('listing_views')
        .select('*')
        .eq('listing_id', listingId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!views || views.length === 0) {
        setStats({
          totalViews: 0,
          uniqueViewers: 0,
          avgDuration: 0,
          deviceBreakdown: { desktop: 0, mobile: 0, tablet: 0 },
          recentViews: [],
        });
        setLoading(false);
        return;
      }

      // Calculate stats
      const uniqueViewers = new Set(
        views.filter(v => v.viewer_id).map(v => v.viewer_id)
      ).size;

      const avgDuration =
        views.reduce((sum, v) => sum + (v.duration || 0), 0) / views.length;

      const deviceBreakdown = views.reduce(
        (acc, v) => {
          const type = v.device_type || 'desktop';
          acc[type as keyof typeof acc] = (acc[type as keyof typeof acc] || 0) + 1;
          return acc;
        },
        { desktop: 0, mobile: 0, tablet: 0 }
      );

      setStats({
        totalViews: views.length,
        uniqueViewers,
        avgDuration: Math.round(avgDuration),
        deviceBreakdown,
        recentViews: views.slice(0, 10),
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Card className="p-6">Chargement des statistiques...</Card>;
  }

  if (!stats) {
    return null;
  }

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Vues totales</span>
          </div>
          <p className="text-2xl font-bold">{stats.totalViews}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Visiteurs uniques</span>
          </div>
          <p className="text-2xl font-bold">{stats.uniqueViewers}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Durée moyenne</span>
          </div>
          <p className="text-2xl font-bold">{formatDuration(stats.avgDuration)}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Monitor className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Appareils</span>
          </div>
          <div className="flex gap-2 mt-2">
            <div className="flex items-center gap-1 text-xs">
              <Monitor className="h-3 w-3" />
              {stats.deviceBreakdown.desktop}
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Smartphone className="h-3 w-3" />
              {stats.deviceBreakdown.mobile}
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Tablet className="h-3 w-3" />
              {stats.deviceBreakdown.tablet}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Views */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Vues récentes</h3>
        <div className="space-y-2">
          {stats.recentViews.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune vue récente</p>
          ) : (
            stats.recentViews.map((view, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-sm py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-2">
                  {view.device_type === 'mobile' && <Smartphone className="h-4 w-4" />}
                  {view.device_type === 'tablet' && <Tablet className="h-4 w-4" />}
                  {view.device_type === 'desktop' && <Monitor className="h-4 w-4" />}
                  <span className="text-muted-foreground">
                    {format(new Date(view.created_at), 'dd MMM yyyy HH:mm', { locale: fr })}
                  </span>
                </div>
                <span className="font-medium">{formatDuration(view.duration)}</span>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Activity, 
  Zap, 
  Users, 
  TrendingUp, 
  Mail, 
  CheckCircle,
  Clock,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

interface AutomationMetrics {
  matchesCreated24h: number;
  emailsSent24h: number;
  activeBuyers: number;
  activeSellers: number;
  conversionRate: number;
  avgMatchScore: number;
}

export const AutomationDashboard = () => {
  const [metrics, setMetrics] = useState<AutomationMetrics>({
    matchesCreated24h: 0,
    emailsSent24h: 0,
    activeBuyers: 0,
    activeSellers: 0,
    conversionRate: 0,
    avgMatchScore: 0
  });
  const [automationLogs, setAutomationLogs] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadMetrics();
    loadAutomationLogs();

    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(() => {
      loadMetrics();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadMetrics = async () => {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      // Matches créés dans les 24h
      const { count: matchCount } = await supabase
        .from('matches' as any)
        .select('*', { count: 'exact', head: true })
        .gte('created_at', yesterday.toISOString());

      // Alertes actives (acheteurs actifs)
      const { count: buyersCount } = await supabase
        .from('buyer_alerts' as any)
        .select('*', { count: 'exact', head: true })
        .eq('active', true);

      // Annonces actives (vendeurs actifs)
      const { count: sellersCount } = await supabase
        .from('annonces' as any)
        .select('*', { count: 'exact', head: true })
        .eq('statut', 'publiee');

      // Moyenne score matches
      const { data: matchScores } = await supabase
        .from('matches' as any)
        .select('score')
        .gte('created_at', yesterday.toISOString());

      const avgScore = matchScores && matchScores.length > 0
        ? Math.round((matchScores as any[]).reduce((sum: number, m: any) => sum + m.score, 0) / matchScores.length)
        : 0;

      setMetrics({
        matchesCreated24h: matchCount || 0,
        emailsSent24h: matchCount || 0, // 1 email par match
        activeBuyers: buyersCount || 0,
        activeSellers: sellersCount || 0,
        conversionRate: 12.5, // À calculer depuis vraies données
        avgMatchScore: avgScore
      });

    } catch (error) {
      console.error('Error loading metrics:', error);
    }
  };

  const loadAutomationLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('automation_logs' as any)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setAutomationLogs(data || []);

    } catch (error) {
      console.error('Error loading logs:', error);
    }
  };

  const runMatching = async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke('auto-matching-ai');

      if (error) throw error;

      toast({
        title: "✅ Matching exécuté",
        description: `${data.matchesCreated} matchs créés, ${data.emailsSent} emails envoyés`
      });

      await loadMetrics();
      await loadAutomationLogs();

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'exécuter le matching",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard Automatisation | CessionBTP</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Automatisation 24/7</h1>
            <p className="text-muted-foreground">
              Système de matching, scoring et nurturing automatique
            </p>
          </div>
          <Button onClick={runMatching} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Lancer matching
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <Badge variant="outline" className="animate-pulse">Live</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">{metrics.matchesCreated24h}</div>
            <div className="text-sm text-muted-foreground">Matchs créés (24h)</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <Badge variant="outline">Auto</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">{metrics.emailsSent24h}</div>
            <div className="text-sm text-muted-foreground">Emails envoyés (24h)</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">{metrics.activeBuyers}</div>
            <div className="text-sm text-muted-foreground">Acheteurs actifs</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">{metrics.activeSellers}</div>
            <div className="text-sm text-muted-foreground">Vendeurs actifs</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <Badge variant="outline">Score</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">{metrics.avgMatchScore}%</div>
            <div className="text-sm text-muted-foreground">Score moyen matches</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <Badge variant="outline">Conversion</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">{metrics.conversionRate}%</div>
            <div className="text-sm text-muted-foreground">Taux conversion</div>
          </Card>
        </div>

        {/* Automation Logs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">Tous les logs</TabsTrigger>
            <TabsTrigger value="completed">Complétés</TabsTrigger>
            <TabsTrigger value="pending">En attente</TabsTrigger>
            <TabsTrigger value="failed">Échoués</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Dernières Actions Automatiques</h3>
              <div className="space-y-3">
                {automationLogs.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Aucune action automatique pour le moment
                  </p>
                ) : (
                  automationLogs.map(log => (
                    <div 
                      key={log.id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {log.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {log.status === 'pending' && <Clock className="w-5 h-5 text-yellow-600" />}
                        {log.status === 'failed' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                        
                        <div>
                          <div className="font-medium">{log.action_type}</div>
                          <div className="text-sm text-muted-foreground">
                            {log.target_type} • {new Date(log.created_at).toLocaleString('fr-FR')}
                          </div>
                        </div>
                      </div>
                      
                      <Badge 
                        variant={
                          log.status === 'completed' ? 'default' :
                          log.status === 'pending' ? 'secondary' :
                          'destructive'
                        }
                      >
                        {log.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          {(['completed', 'pending', 'failed'] as const).map(status => (
            <TabsContent key={status} value={status}>
              <Card className="p-6">
                <div className="space-y-3">
                  {automationLogs.filter(log => log.status === status).map(log => (
                    <div 
                      key={log.id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{log.action_type}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(log.created_at).toLocaleString('fr-FR')}
                        </div>
                        {log.error_message && (
                          <div className="text-xs text-red-600 mt-1">{log.error_message}</div>
                        )}
                      </div>
                      <Badge>{log.target_type}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
};

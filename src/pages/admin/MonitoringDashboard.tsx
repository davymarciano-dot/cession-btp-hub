import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, TrendingUp, Users, DollarSign, Clock, Zap, Database, Server, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";

interface RealtimeMetrics {
  activeUsers: number;
  requestsPerSecond: number;
  avgResponseTime: number;
  errorRate: number;
}

interface DailyMetrics {
  newUsers: number;
  revenue: number;
  conversions: number;
  churnRate: number;
}

interface Alert {
  id: string;
  level: "critical" | "warning" | "info";
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

interface SystemHealth {
  database: "healthy" | "degraded" | "down";
  api: "healthy" | "degraded" | "down";
  storage: "healthy" | "degraded" | "down";
  functions: "healthy" | "degraded" | "down";
}

const MonitoringDashboard = () => {
  const [realtimeMetrics, setRealtimeMetrics] = useState<RealtimeMetrics>({
    activeUsers: 0,
    requestsPerSecond: 0,
    avgResponseTime: 0,
    errorRate: 0,
  });

  const [dailyMetrics, setDailyMetrics] = useState<DailyMetrics>({
    newUsers: 0,
    revenue: 0,
    conversions: 0,
    churnRate: 0,
  });

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    database: "healthy",
    api: "healthy",
    storage: "healthy",
    functions: "healthy",
  });

  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier les permissions admin
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast.error("Vous devez être connecté");
          window.location.href = "/auth";
          return;
        }

        const { data: userRoles, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .single();

        if (roleError || !userRoles) {
          toast.error("Accès refusé : permissions administrateur requises");
          window.location.href = "/";
          return;
        }

        setIsLoading(false);
      } catch (error) {
        toast.error("Erreur lors de la vérification des permissions");
        window.location.href = "/";
      }
    };

    checkAdminAccess();
  }, []);

  // Charger les métriques initiales
  useEffect(() => {
    if (!isLoading) {
      loadMetrics();
      const interval = setInterval(loadMetrics, 10000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Surveiller les métriques en temps réel
  useEffect(() => {
    const channel = supabase
      .channel("monitoring")
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setRealtimeMetrics((prev) => ({
          ...prev,
          activeUsers: Object.keys(state).length,
        }));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Vérifier les alertes
  useEffect(() => {
    checkAlerts();
    const interval = setInterval(checkAlerts, 30000); // Toutes les 30s
    return () => clearInterval(interval);
  }, [realtimeMetrics, dailyMetrics]);

  const loadMetrics = async () => {
    try {
      // Charger les annonces créées aujourd'hui
      const today = new Date().toISOString().split("T")[0];
      
      const { data: annonces } = await supabase
        .from("annonces")
        .select("created_at, user_id")
        .gte("created_at", today);

      // Compter les utilisateurs uniques
      const uniqueUsers = new Set(annonces?.map(a => a.user_id)).size;

      // Simuler les autres métriques (à remplacer par vraies données)
      const simulatedRevenue = Math.random() * 2000;
      const simulatedConversions = Math.floor(Math.random() * 10);

      setDailyMetrics({
        newUsers: uniqueUsers,
        revenue: simulatedRevenue,
        conversions: simulatedConversions,
        churnRate: 0,
      });

      setRealtimeMetrics((prev) => ({
        ...prev,
        errorRate: Math.random() * 0.5, // Simulé
        avgResponseTime: Math.random() * 1000 + 200, // Simulé
        requestsPerSecond: Math.random() * 50 + 20, // Simulé
      }));

      // Générer données de performance pour le graphique
      const perfData = Array.from({ length: 12 }, (_, i) => ({
        time: `${new Date().getHours() - 11 + i}h`,
        responseTime: Math.random() * 500 + 200,
        requests: Math.floor(Math.random() * 100 + 50),
        errors: Math.floor(Math.random() * 5),
      }));
      setPerformanceData(perfData);

      setIsLoading(false);
    } catch (error) {
      console.error("Error loading metrics:", error);
      toast.error("Erreur lors du chargement des métriques");
      setIsLoading(false);
    }
  };

  const checkAlerts = () => {
    const newAlerts: Alert[] = [];

    // Alert si taux d'erreur élevé
    if (realtimeMetrics.errorRate > 1) {
      newAlerts.push({
        id: `alert-${Date.now()}-1`,
        level: "critical",
        message: `🚨 Taux d'erreur critique: ${realtimeMetrics.errorRate.toFixed(2)}%`,
        timestamp: new Date(),
        acknowledged: false,
      });
      sendAlert("CRITICAL: Error rate > 1%", "all");
    }

    // Alert si temps de réponse lent
    if (realtimeMetrics.avgResponseTime > 3000) {
      newAlerts.push({
        id: `alert-${Date.now()}-2`,
        level: "warning",
        message: `⚠️ Temps de réponse élevé: ${realtimeMetrics.avgResponseTime.toFixed(0)}ms`,
        timestamp: new Date(),
        acknowledged: false,
      });
    }

    // Alert revenus positifs
    if (dailyMetrics.revenue > 1000) {
      newAlerts.push({
        id: `alert-${Date.now()}-3`,
        level: "info",
        message: `🎉 Objectif atteint: ${dailyMetrics.revenue}€ de revenus aujourd'hui!`,
        timestamp: new Date(),
        acknowledged: false,
      });
    }

    // Alert nouveaux utilisateurs
    if (dailyMetrics.newUsers > 50) {
      newAlerts.push({
        id: `alert-${Date.now()}-4`,
        level: "info",
        message: `👥 ${dailyMetrics.newUsers} nouveaux utilisateurs aujourd'hui!`,
        timestamp: new Date(),
        acknowledged: false,
      });
    }

    if (newAlerts.length > 0) {
      setAlerts((prev) => [...newAlerts, ...prev].slice(0, 20)); // Garder max 20 alertes
    }
  };

  const sendAlert = async (message: string, channel: string) => {
    try {
      // Envoyer via le système d'alertes multi-canaux
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Log l'alerte
      console.log(`[ALERT ${channel}]`, message);
      
      // Afficher toast
      if (message.includes("CRITICAL")) {
        toast.error(message);
      } else if (message.includes("WARNING")) {
        toast.warning(message);
      } else {
        toast.success(message);
      }

      // Note: L'enregistrement en base nécessite la table sent_alerts configurée
    } catch (error) {
      console.error("Error sending alert:", error);
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
    toast.success("Alerte acquittée");
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-500 bg-green-500/10";
      case "degraded":
        return "text-amber-500 bg-amber-500/10";
      case "down":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case "critical":
        return "border-red-500 bg-red-500/10";
      case "warning":
        return "border-amber-500 bg-amber-500/10";
      case "info":
        return "border-blue-500 bg-blue-500/10";
      default:
        return "border-gray-500 bg-gray-500/10";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard Monitoring</h1>
              <p className="text-muted-foreground">
                Surveillance en temps réel de l'infrastructure et des métriques
              </p>
            </div>
            <Badge variant="outline" className="text-sm px-3 py-1">
              <Activity className="w-4 h-4 mr-2 animate-pulse" />
              Live
            </Badge>
          </div>
        </motion.div>

        {/* System Health */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(systemHealth).map(([key, status], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium capitalize">{key}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className={getHealthColor(status)}>
                    {status === "healthy" ? "✓" : status === "degraded" ? "⚠" : "✗"}{" "}
                    {status}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Utilisateurs Actifs"
            value={realtimeMetrics.activeUsers}
            icon={Users}
            color="text-blue-500"
            trend="+12%"
          />
          <MetricCard
            title="Temps de Réponse"
            value={`${realtimeMetrics.avgResponseTime.toFixed(0)}ms`}
            icon={Clock}
            color="text-green-500"
            trend="-5%"
          />
          <MetricCard
            title="Taux d'Erreur"
            value={`${realtimeMetrics.errorRate.toFixed(2)}%`}
            icon={AlertTriangle}
            color="text-red-500"
            trend="-2%"
          />
          <MetricCard
            title="Req/s"
            value={realtimeMetrics.requestsPerSecond}
            icon={Zap}
            color="text-amber-500"
            trend="+8%"
          />
        </div>

        {/* Daily Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Nouveaux Utilisateurs"
            value={dailyMetrics.newUsers}
            icon={Users}
            color="text-purple-500"
            subtitle="Aujourd'hui"
          />
          <MetricCard
            title="Revenus"
            value={`${dailyMetrics.revenue.toFixed(0)}€`}
            icon={DollarSign}
            color="text-green-500"
            subtitle="Aujourd'hui"
          />
          <MetricCard
            title="Conversions"
            value={dailyMetrics.conversions}
            icon={TrendingUp}
            color="text-blue-500"
            subtitle="Aujourd'hui"
          />
          <MetricCard
            title="Taux de Churn"
            value={`${dailyMetrics.churnRate.toFixed(1)}%`}
            icon={AlertCircle}
            color="text-amber-500"
            subtitle="7 derniers jours"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Performance (12h)</CardTitle>
              <CardDescription>Temps de réponse moyen</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorResponseTime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="responseTime"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorResponseTime)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Requests Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Requêtes (12h)</CardTitle>
              <CardDescription>Volume de requêtes par heure</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="requests" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Alertes Actives</CardTitle>
                <CardDescription>
                  {alerts.filter((a) => !a.acknowledged).length} alertes non acquittées
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAlerts([])}
              >
                Tout effacer
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucune alerte active 🎉
                </p>
              ) : (
                alerts.slice(0, 10).map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-lg border-2 ${getAlertColor(alert.level)} ${
                      alert.acknowledged ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {alert.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      {!alert.acknowledged && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => acknowledgeAlert(alert.id)}
                        >
                          Acquitter
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: any;
  color: string;
  trend?: string;
  subtitle?: string;
}

const MetricCard = ({ title, value, icon: Icon, color, trend, subtitle }: MetricCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-1">{value}</div>
        {trend && (
          <Badge variant="outline" className="text-xs">
            {trend}
          </Badge>
        )}
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MonitoringDashboard;

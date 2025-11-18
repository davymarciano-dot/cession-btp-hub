import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, XCircle, AlertCircle, Loader2, RefreshCw, Database, Cloud, HardDrive, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HealthCheck {
  name: string;
  status: 'healthy' | 'unhealthy' | 'checking';
  message: string;
  details?: string;
  lastChecked?: Date;
}

const SystemHealth = () => {
  const { toast } = useToast();
  const [checks, setChecks] = useState<HealthCheck[]>([
    { name: "Connexion Supabase", status: 'checking', message: "Vérification en cours..." },
    { name: "Base de données", status: 'checking', message: "Vérification en cours..." },
    { name: "Authentification", status: 'checking', message: "Vérification en cours..." },
    { name: "Storage", status: 'checking', message: "Vérification en cours..." },
  ]);
  const [isChecking, setIsChecking] = useState(false);

  const runHealthChecks = async () => {
    setIsChecking(true);
    const newChecks: HealthCheck[] = [];

    // 1. Check Supabase Connection
    try {
      const { data, error } = await supabase.from('annonces').select('count').limit(1);
      if (error) throw error;
      newChecks.push({
        name: "Connexion Supabase",
        status: 'healthy',
        message: "✅ Connexion établie",
        details: "API Supabase répond correctement",
        lastChecked: new Date()
      });
    } catch (error) {
      newChecks.push({
        name: "Connexion Supabase",
        status: 'unhealthy',
        message: "❌ Connexion échouée",
        details: error instanceof Error ? error.message : "Erreur inconnue",
        lastChecked: new Date()
      });
    }

    // 2. Check Database Tables
    try {
      const { count, error } = await supabase
        .from('annonces')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      
      newChecks.push({
        name: "Base de données",
        status: 'healthy',
        message: "✅ Tables principales accessibles",
        details: `${count || 0} annonces en base`,
        lastChecked: new Date()
      });
    } catch (error) {
      newChecks.push({
        name: "Base de données",
        status: 'unhealthy',
        message: "❌ Problème tables",
        details: error instanceof Error ? error.message : "Erreur inconnue",
        lastChecked: new Date()
      });
    }

    // 3. Check Auth
    try {
      const { data: { session } } = await supabase.auth.getSession();
      newChecks.push({
        name: "Authentification",
        status: 'healthy',
        message: session ? "✅ Utilisateur connecté" : "⚠️ Non connecté (normal)",
        details: session ? `User: ${session.user.email}` : "Aucune session active",
        lastChecked: new Date()
      });
    } catch (error) {
      newChecks.push({
        name: "Authentification",
        status: 'unhealthy',
        message: "❌ Erreur auth",
        details: error instanceof Error ? error.message : "Erreur inconnue",
        lastChecked: new Date()
      });
    }

    // 4. Check Storage
    try {
      const { data, error } = await supabase.storage.listBuckets();
      if (error) throw error;
      
      const bucket = data.find(b => b.name === 'company-listings');
      newChecks.push({
        name: "Storage",
        status: bucket ? 'healthy' : 'unhealthy',
        message: bucket ? "✅ Bucket accessible" : "❌ Bucket introuvable",
        details: `${data.length} bucket(s) trouvé(s)`,
        lastChecked: new Date()
      });
    } catch (error) {
      newChecks.push({
        name: "Storage",
        status: 'unhealthy',
        message: "❌ Storage inaccessible",
        details: error instanceof Error ? error.message : "Erreur inconnue",
        lastChecked: new Date()
      });
    }

    setChecks(newChecks);
    setIsChecking(false);

    const hasUnhealthy = newChecks.some(c => c.status === 'unhealthy');
    if (hasUnhealthy) {
      toast({
        title: "⚠️ Problèmes détectés",
        description: "Certains services sont en erreur",
        variant: "destructive"
      });
    } else {
      toast({
        title: "✅ Système en bonne santé",
        description: "Tous les services fonctionnent normalement"
      });
    }
  };

  useEffect(() => {
    runHealthChecks();
    // Auto-refresh every 5 minutes
    const interval = setInterval(runHealthChecks, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: HealthCheck['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'unhealthy':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'checking':
        return <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />;
    }
  };

  const getServiceIcon = (name: string) => {
    if (name.includes("Supabase")) return <Cloud className="w-5 h-5" />;
    if (name.includes("Base")) return <Database className="w-5 h-5" />;
    if (name.includes("Storage")) return <HardDrive className="w-5 h-5" />;
    return <Activity className="w-5 h-5" />;
  };

  const healthyCount = checks.filter(c => c.status === 'healthy').length;
  const totalCount = checks.length;
  const healthPercentage = Math.round((healthyCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Activity className="w-8 h-8 text-primary" />
              Santé du système
            </h1>
            <p className="text-muted-foreground mt-1">
              Surveillance en temps réel de tous les services
            </p>
          </div>
          <Button 
            onClick={runHealthChecks} 
            disabled={isChecking}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
            Rafraîchir
          </Button>
        </div>

        {/* Overall Status */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">
                État général du système
              </h2>
              <p className="text-sm text-muted-foreground">
                Dernière vérification: {checks[0]?.lastChecked?.toLocaleTimeString('fr-FR') || 'N/A'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">
                {healthPercentage}%
              </div>
              <div className="text-sm text-muted-foreground">
                {healthyCount}/{totalCount} services OK
              </div>
            </div>
          </div>
        </Card>

        {/* Health Checks Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {checks.map((check, index) => (
            <Card 
              key={index}
              className={`p-6 transition-all hover:shadow-lg ${
                check.status === 'unhealthy' ? 'border-destructive border-2' : 
                check.status === 'healthy' ? 'border-green-500/20 border-2' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  {getServiceIcon(check.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">
                      {check.name}
                    </h3>
                    {getStatusIcon(check.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {check.message}
                  </p>
                  {check.details && (
                    <p className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {check.details}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            Actions rapides
          </h3>
          <div className="grid md:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start gap-2" asChild>
              <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">
                <Cloud className="w-4 h-4" />
                Dashboard Supabase
              </a>
            </Button>
            <Button variant="outline" className="justify-start gap-2" onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4" />
              Recharger l'app
              </Button>
            <Button variant="outline" className="justify-start gap-2" asChild>
              <a href="/admin" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Retour Admin
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SystemHealth;

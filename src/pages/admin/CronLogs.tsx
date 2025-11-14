import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface CronLog {
  id: string;
  job: string;
  success: boolean;
  results?: any;
  duration?: number;
  executed_at: string;
}

interface JobStats {
  total: number;
  success: number;
  failed: number;
  successRate: number;
  lastRun?: string;
}

const CronLogsAdmin = () => {
  const [logs, setLogs] = useState<CronLog[]>([]);
  const [filters, setFilters] = useState({
    job: 'all',
    status: 'all',
    dateRange: '24h'
  });
  const [stats, setStats] = useState<Record<string, JobStats>>({});
  
  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 10000);
    return () => clearInterval(interval);
  }, [filters]);
  
  const fetchLogs = async () => {
    // TODO: Use automation_logs table when available
    // For now, show empty state
    setLogs([]);
    setStats({});
  };
  
  const calculateStats = (logs: CronLog[]) => {
    const jobs = ['daily-matching', 'hourly-upsells', 'cart-recovery', 'weekly-report'];
    const newStats: Record<string, JobStats> = {};
    
    jobs.forEach(job => {
      const jobLogs = logs.filter(l => l.job === job);
      const successful = jobLogs.filter(l => l.success).length;
      
      newStats[job] = {
        total: jobLogs.length,
        success: successful,
        failed: jobLogs.length - successful,
        successRate: jobLogs.length ? Math.round((successful / jobLogs.length) * 100) : 0,
        lastRun: jobLogs[0]?.executed_at
      };
    });
    
    setStats(newStats);
  };
  
  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-8">📋 Journaux Cron</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {Object.entries(stats).map(([job, stat]) => (
          <Card key={job} className="p-4">
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">{job}</h3>
            <div className="text-2xl font-bold mb-1">{stat.successRate}%</div>
            <div className="text-xs text-muted-foreground">
              {stat.success}/{stat.total} réussis
            </div>
            {stat.lastRun && (
              <div className="text-xs text-muted-foreground mt-2">
                Dernier: {new Date(stat.lastRun).toLocaleTimeString()}
              </div>
            )}
          </Card>
        ))}
      </div>
      
      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex gap-4">
          <Select value={filters.job} onValueChange={(value) => setFilters({...filters, job: value})}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Tous les jobs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les jobs</SelectItem>
              <SelectItem value="daily-matching">Daily Matching</SelectItem>
              <SelectItem value="hourly-upsells">Hourly Upsells</SelectItem>
              <SelectItem value="cart-recovery">Cart Recovery</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="completed">✅ Succès</SelectItem>
              <SelectItem value="failed">❌ Échec</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={fetchLogs}>
            🔄 Rafraîchir
          </Button>
        </div>
      </Card>
      
      {/* Logs Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Job</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Résultats</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Exécuté à</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm font-medium">{log.job}</td>
                  <td className="px-4 py-3 text-sm">
                    {log.success ? (
                      <Badge variant="default" className="bg-green-500">✅ Succès</Badge>
                    ) : (
                      <Badge variant="destructive">❌ Échec</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {log.results && JSON.stringify(log.results)}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(log.executed_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default CronLogsAdmin;

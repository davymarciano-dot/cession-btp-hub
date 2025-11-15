import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getCacheStats, cleanExpiredCache } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface QueryDetail {
  key: string;
  state: string;
  dataUpdatedAt: string;
  isStale: boolean;
  observerCount: number;
  dataSize: number;
}

interface CacheStats {
  total: number;
  active: number;
  stale: number;
  fresh: number;
  errors: number;
  pending: number;
  hitRate: string;
  memoryUsage: string;
}

export const TanStackCacheDebugger = () => {
  const queryClient = useQueryClient();
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [queries, setQueries] = useState<QueryDetail[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [performance, setPerformance] = useState({
    avgDataAge: 0,
    totalCacheSize: '0',
  });
  
  useEffect(() => {
    const updateStats = () => {
      const cache = queryClient.getQueryCache();
      const allQueries = cache.getAll();
      
      // Utiliser notre fonction getCacheStats existante
      const cacheStats = getCacheStats();
      setStats(cacheStats);
      
      // Détails des queries
      const queryDetails: QueryDetail[] = allQueries.map(q => ({
        key: JSON.stringify(q.queryKey),
        state: q.state.fetchStatus,
        dataUpdatedAt: q.state.dataUpdatedAt 
          ? new Date(q.state.dataUpdatedAt).toLocaleTimeString('fr-FR')
          : 'N/A',
        isStale: q.isStale(),
        observerCount: q.getObserversCount(),
        dataSize: JSON.stringify(q.state.data || {}).length,
      }));
      setQueries(queryDetails);
      
      // Métriques de performance
      const now = Date.now();
      const ages = allQueries
        .filter(q => q.state.dataUpdatedAt)
        .map(q => now - q.state.dataUpdatedAt);
      
      const avgAge = ages.length > 0
        ? Math.round(ages.reduce((a, b) => a + b, 0) / ages.length / 1000)
        : 0;
      
      const totalSize = allQueries.reduce((acc, q) => {
        return acc + JSON.stringify(q.state.data || {}).length;
      }, 0);
      
      setPerformance({
        avgDataAge: avgAge,
        totalCacheSize: (totalSize / 1024).toFixed(2),
      });
    };
    
    updateStats();
    const interval = setInterval(updateStats, 1000);
    
    return () => clearInterval(interval);
  }, [queryClient]);
  
  // Ne s'affiche qu'en développement
  if (import.meta.env.PROD) return null;
  
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMinimized(false)}
          className="bg-background/95 backdrop-blur shadow-lg"
        >
          🔍 Cache ({stats?.total || 0})
          <Badge 
            variant={stats && stats.active > 0 ? "default" : "secondary"}
            className="ml-2"
          >
            {stats?.active || 0}
          </Badge>
        </Button>
      </div>
    );
  }
  
  return (
    <Card className="fixed bottom-4 right-4 z-50 w-96 bg-background/95 backdrop-blur shadow-2xl border-2">
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm flex items-center gap-2">
              🔍 TanStack Query Cache
              <span className={`w-2 h-2 rounded-full ${
                (stats?.active || 0) > 0 
                  ? 'bg-yellow-400 animate-pulse' 
                  : 'bg-green-400'
              }`} />
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="h-6 w-6 p-0"
            >
              {showDetails ? '−' : '+'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="h-6 w-6 p-0"
            >
              _
            </Button>
          </div>
        </div>
        
        {/* Stats principales */}
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center p-2 bg-secondary/50 rounded">
            <div className="text-lg font-bold text-primary">{stats?.total || 0}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center p-2 bg-green-500/10 rounded">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {stats?.fresh || 0}
            </div>
            <div className="text-xs text-muted-foreground">Fresh</div>
          </div>
          <div className="text-center p-2 bg-yellow-500/10 rounded">
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              {stats?.stale || 0}
            </div>
            <div className="text-xs text-muted-foreground">Stale</div>
          </div>
          <div className="text-center p-2 bg-blue-500/10 rounded">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {stats?.active || 0}
            </div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
        </div>
        
        {/* Métriques de performance */}
        <div className="space-y-1.5 text-xs border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Hit Rate:</span>
            <Badge 
              variant={parseInt(stats?.hitRate || '0') > 70 ? "default" : "secondary"}
            >
              {stats?.hitRate || '0%'}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Avg Age:</span>
            <span className="font-mono">{performance.avgDataAge}s</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Cache Size:</span>
            <span className="font-mono">{performance.totalCacheSize} KB</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Errors:</span>
            <Badge variant={stats?.errors ? "destructive" : "secondary"}>
              {stats?.errors || 0}
            </Badge>
          </div>
        </div>
        
        {/* Détails des queries */}
        {showDetails && (
          <div className="border-t pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">Query Details</span>
              <span className="text-xs text-muted-foreground">
                {queries.length} queries
              </span>
            </div>
            <ScrollArea className="h-48 rounded border">
              <div className="p-2 space-y-2">
                {queries.map((q, i) => (
                  <div 
                    key={i} 
                    className="p-2 bg-secondary/30 rounded text-xs space-y-1"
                  >
                    <div className="font-mono text-xs text-primary truncate">
                      {q.key}
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <Badge 
                        variant={q.isStale ? "outline" : "secondary"}
                        className="text-xs h-5"
                      >
                        {q.isStale ? '⚠️ Stale' : '✅ Fresh'}
                      </Badge>
                      <span className="text-xs">
                        {(q.dataSize / 1024).toFixed(1)} KB
                      </span>
                      <span className="text-xs">
                        👁️ {q.observerCount}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Updated: {q.dataUpdatedAt}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => queryClient.invalidateQueries()}
            className="flex-1 text-xs h-8"
          >
            ♻️ Invalidate All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => cleanExpiredCache()}
            className="flex-1 text-xs h-8"
          >
            🗑️ Clear Cache
          </Button>
        </div>
        
        {/* Info */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          Development only • Updates every 1s
        </div>
      </div>
    </Card>
  );
};

import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface Stats {
  total: number;
  active: number;
  fresh: number;
  stale: number;
  error: number;
  hitRate: number;
  memoryKB: string;
}

const TanStackCacheDebugger = () => {
  const queryClient = useQueryClient();
  const [stats, setStats] = useState<Stats>({
    total: 0,
    active: 0,
    fresh: 0,
    stale: 0,
    error: 0,
    hitRate: 0,
    memoryKB: '0'
  });
  const [isMinimized, setIsMinimized] = useState(true);
  
  useEffect(() => {
    const updateStats = () => {
      const cache = queryClient.getQueryCache();
      const queries = cache.getAll();
      
      setStats({
        total: queries.length,
        active: queries.filter(q => q.state.fetchStatus === 'fetching').length,
        fresh: queries.filter(q => q.state.data && !q.isStale()).length,
        stale: queries.filter(q => q.isStale()).length,
        error: queries.filter(q => q.state.error).length,
        hitRate: calculateHitRate(queries),
        memoryKB: (JSON.stringify(queries).length / 1024).toFixed(1)
      });
    };
    
    updateStats();
    const interval = setInterval(updateStats, 2000);
    return () => clearInterval(interval);
  }, [queryClient]);
  
  const calculateHitRate = (queries: any[]) => {
    const total = queries.length;
    const cached = queries.filter(q => q.state.data).length;
    return total > 0 ? Math.round((cached / total) * 100) : 0;
  };
  
  if (import.meta.env.PROD) {
    return null;
  }

  if (isMinimized) {
    return (
      <div
        className="fixed bottom-4 right-4 z-40 bg-black/80 text-white px-3 py-2 rounded-full cursor-pointer hover:bg-black/90 transition-all"
        onClick={() => setIsMinimized(false)}
      >
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className={`w-2 h-2 rounded-full ${
            stats.active > 0 ? 'bg-yellow-400 animate-pulse' :
            stats.error > 0 ? 'bg-red-400' : 
            'bg-green-400'
          }`} />
          <span>
            {stats.active > 0 ? `⏳ ${stats.active}` : 
             stats.error > 0 ? `❌ ${stats.error}` :
             `✅ ${stats.hitRate}%`}
          </span>
          <span className="text-gray-400">|</span>
          <span>{stats.total} Q</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-40 bg-black/90 text-white p-4 rounded-lg shadow-xl max-w-xs">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold">Quick Cache Stats</h3>
        <button
          onClick={() => setIsMinimized(true)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="text-green-400 text-lg font-bold">{stats.fresh}</div>
          <div className="text-gray-400">Fresh</div>
        </div>
        <div>
          <div className="text-yellow-400 text-lg font-bold">{stats.stale}</div>
          <div className="text-gray-400">Stale</div>
        </div>
        <div>
          <div className="text-blue-400 text-lg font-bold">{stats.hitRate}%</div>
          <div className="text-gray-400">Hit Rate</div>
        </div>
        <div>
          <div className="text-purple-400 text-lg font-bold">{stats.memoryKB}</div>
          <div className="text-gray-400">KB Used</div>
        </div>
      </div>
      
      {stats.error > 0 && (
        <div className="mt-3 p-2 bg-red-900/50 rounded text-xs text-red-300">
          ⚠️ {stats.error} queries with errors
        </div>
      )}
      
      <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400">
        💡 Use ReactQuery DevTools (bottom-left) for details
      </div>
    </div>
  );
};

export default TanStackCacheDebugger;

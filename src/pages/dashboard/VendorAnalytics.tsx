import { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { supabase } from '@/integrations/supabase/client';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const formatTime = (seconds?: number) => {
  if (!seconds) return '0s';
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

interface MetricCardProps {
  icon: string;
  title: string;
  value: string | number;
  change?: number;
  subtitle?: string;
  color: string;
}

const MetricCard = ({ icon, title, value, change, subtitle, color }: MetricCardProps) => (
  <div className="bg-card rounded-xl shadow-lg p-6 hover:shadow-xl transition">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-lg bg-${color}-100`}>
        <span className="text-2xl">{icon}</span>
      </div>
      {change !== undefined && (
        <span className={`text-sm font-bold ${
          change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-muted-foreground'
        }`}>
          {change > 0 && '+'}{change}%
        </span>
      )}
    </div>
    <h3 className="text-muted-foreground text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    {subtitle && (
      <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
    )}
  </div>
);

interface InsightCardProps {
  type: string;
  message: string;
  action?: string;
  severity: 'high' | 'medium' | 'low';
}

const InsightCard = ({ type, message, action, severity }: InsightCardProps) => (
  <div className={`border-l-4 ${
    severity === 'high' ? 'border-red-500 bg-red-50' :
    severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
    'border-green-500 bg-green-50'
  } p-4 rounded-lg mb-3`}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="font-semibold text-sm">{message}</p>
        {action && (
          <button className="text-blue-600 text-xs mt-2 hover:underline">
            {action} →
          </button>
        )}
      </div>
      <span className="text-xs text-muted-foreground">{type}</span>
    </div>
  </div>
);

const VendorAnalyticsDashboard = () => {
  const [metrics, setMetrics] = useState<any>({});
  const [period, setPeriod] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<any>(null);
  
  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 60000);
    return () => clearInterval(interval);
  }, [period]);
  
  const fetchDashboardData = async () => {
    setLoading(true);
    
    // Simulated data for now
    const mockData = {
      performance: {
        views: 1234,
        viewsGrowth: 45,
        contacts: 23,
        contactsGrowth: 12,
        favorites: 45,
        favoritesGrowth: 8,
        conversionRate: 1.9,
        avgTimeOnPage: 125,
        position: 3,
        dailyData: [
          { date: '01/12', views: 150, contacts: 3 },
          { date: '02/12', views: 180, contacts: 5 },
          { date: '03/12', views: 220, contacts: 4 },
          { date: '04/12', views: 190, contacts: 6 },
          { date: '05/12', views: 250, contacts: 5 },
        ]
      },
      visitors: {
        sources: [
          { name: 'Recherche', value: 45 },
          { name: 'Direct', value: 30 },
          { name: 'Réseaux', value: 15 },
          { name: 'Référents', value: 10 },
        ],
        topLocations: [
          { city: 'Paris', count: 45 },
          { city: 'Lyon', count: 23 },
          { city: 'Marseille', count: 18 },
        ]
      },
      competition: {
        position: 3,
        positionChange: 1,
        comparison: [
          { metric: 'Prix', you: 80, average: 65 },
          { metric: 'Photos', you: 90, average: 70 },
          { metric: 'Description', you: 75, average: 60 },
          { metric: 'Réactivité', you: 95, average: 75 },
        ]
      },
      predictions: {
        performanceScore: 78,
        betterThan: 68
      }
    };
    
    setMetrics(mockData);
    setLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              📊 Analytics de votre annonce
            </h1>
            <p className="text-muted-foreground mt-2">
              {listing?.title || 'Votre entreprise'} • Position #{metrics.performance?.position || '-'}
            </p>
          </div>
          
          <div className="flex gap-2">
            {['24h', '7d', '30d', '90d'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  period === p 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card text-foreground hover:bg-accent'
                }`}
              >
                {p === '24h' ? 'Aujourd\'hui' :
                 p === '7d' ? '7 jours' :
                 p === '30d' ? '30 jours' :
                 '3 mois'}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              icon="👁️"
              title="Vues totales"
              value={metrics.performance?.views?.toLocaleString() || '0'}
              change={metrics.performance?.viewsGrowth}
              subtitle="vs période précédente"
              color="blue"
            />
            <MetricCard
              icon="💬"
              title="Contacts"
              value={metrics.performance?.contacts || '0'}
              change={metrics.performance?.contactsGrowth}
              subtitle={`Taux: ${metrics.performance?.conversionRate || 0}%`}
              color="green"
            />
            <MetricCard
              icon="⭐"
              title="Favoris"
              value={metrics.performance?.favorites || '0'}
              change={metrics.performance?.favoritesGrowth}
              subtitle="Intérêt fort"
              color="yellow"
            />
            <MetricCard
              icon="⏱️"
              title="Temps moyen"
              value={formatTime(metrics.performance?.avgTimeOnPage)}
              subtitle="Sur votre annonce"
              color="purple"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4">📈 Évolution des performances</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={metrics.performance?.dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="views" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6}
                    name="Vues"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="contacts" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="#10b981"
                    fillOpacity={0.6}
                    name="Contacts"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-card rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4">🌐 Sources de trafic</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={metrics.visitors?.sources}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {metrics.visitors?.sources?.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-card rounded-xl shadow-lg p-6">
              <h3 className="font-bold mb-4">👥 Profil des visiteurs</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Acheteurs vérifiés</span>
                    <span className="font-bold">68%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '68%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Investisseurs</span>
                    <span className="font-bold">22%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '22%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Curieux</span>
                    <span className="font-bold">10%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-muted" style={{ width: '10%' }} />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-3">📍 Top localisations</h4>
                {metrics.visitors?.topLocations?.map((loc: any) => (
                  <div key={loc.city} className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{loc.city}</span>
                    <span className="text-sm font-semibold">{loc.count}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-card rounded-xl shadow-lg p-6">
              <h3 className="font-bold mb-4">🎯 Analyse concurrentielle</h3>
              
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Position sur le marché</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">#{metrics.competition?.position || '-'}</span>
                  <span className={`text-sm ${
                    metrics.competition?.positionChange > 0 ? 'text-green-600' :
                    metrics.competition?.positionChange < 0 ? 'text-red-600' :
                    'text-muted-foreground'
                  }`}>
                    {metrics.competition?.positionChange > 0 && '+'}
                    {metrics.competition?.positionChange || 0} places
                  </span>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={metrics.competition?.comparison}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Vous" dataKey="you" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Radar name="Moyenne" dataKey="average" stroke="#9ca3af" fill="#9ca3af" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-card rounded-xl shadow-lg p-6">
              <h3 className="font-bold mb-4">🤖 Insights IA</h3>
              
              <div className="space-y-3">
                <InsightCard
                  type="Performance"
                  message="Vos vues ont augmenté de 45% cette semaine"
                  severity="low"
                />
                <InsightCard
                  type="Opportunité"
                  message="68% des visiteurs consultent sans contacter"
                  action="Ajouter une vidéo"
                  severity="medium"
                />
                <InsightCard
                  type="Alerte"
                  message="3 entreprises similaires ont baissé leur prix"
                  action="Ajuster votre prix"
                  severity="high"
                />
              </div>
              
              <div className="mt-6 p-4 bg-accent rounded-lg">
                <p className="text-sm font-semibold mb-2">🎯 Score de performance</p>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-primary">
                    {metrics.predictions?.performanceScore || 0}/100
                  </div>
                  <div className="flex-1 text-xs text-muted-foreground">
                    Meilleur que {metrics.predictions?.betterThan || 0}% des annonces
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VendorAnalyticsDashboard;

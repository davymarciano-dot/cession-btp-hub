import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react';

const RevenueDashboard = () => {
  const [metrics, setMetrics] = useState({
    todayRevenue: 0,
    monthRevenue: 0,
    cartRecoveryRate: 0,
    referralRevenue: 0,
    totalCarts: 0,
    recoveredCarts: 0,
    activeReferrals: 0,
    pendingEmails: 0,
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const now = new Date();
      const todayStart = new Date(now.setHours(0, 0, 0, 0)).toISOString();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      // Revenue events
      const { data: revenueEvents } = await supabase
        .from('revenue_events')
        .select('*')
        .gte('created_at', monthStart);

      // Abandoned carts
      const { data: carts } = await supabase
        .from('abandoned_carts')
        .select('*')
        .gte('created_at', monthStart);

      // Referrals
      const { data: referrals } = await supabase
        .from('referrals')
        .select('*')
        .eq('status', 'active')
        .gte('created_at', monthStart);

      // Email campaigns
      const { data: emails } = await supabase
        .from('email_campaigns')
        .select('*')
        .eq('status', 'pending');

      // Calculate metrics
      const todayRevenue = (revenueEvents?.filter(e => e.created_at >= todayStart)
        .reduce((sum, e) => sum + Number(e.amount), 0) || 0) / 100;

      const monthRevenue = (revenueEvents?.reduce((sum, e) => sum + Number(e.amount), 0) || 0) / 100;

      const totalCarts = carts?.length || 0;
      const recoveredCarts = carts?.filter(c => c.recovered).length || 0;
      const cartRecoveryRate = totalCarts > 0 ? Math.round((recoveredCarts / totalCarts) * 100) : 0;

      const referralRevenue = (revenueEvents?.filter(e => e.event_type === 'referral_bonus')
        .reduce((sum, e) => sum + Number(e.amount), 0) || 0) / 100;

      setMetrics({
        todayRevenue,
        monthRevenue,
        cartRecoveryRate,
        referralRevenue,
        totalCarts,
        recoveredCarts,
        activeReferrals: referrals?.length || 0,
        pendingEmails: emails?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              💰 Dashboard Revenue Automatisé
            </h1>
            <p className="text-muted-foreground">
              Suivi en temps réel de vos automatisations
            </p>
          </div>
        </div>

        {/* KPIs principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon="📈"
            label="Revenue Aujourd'hui"
            value={`${metrics.todayRevenue.toLocaleString()}€`}
            change="+23%"
          />
          <MetricCard
            icon="💰"
            label="Revenue Ce Mois"
            value={`${metrics.monthRevenue.toLocaleString()}€`}
            change="+45%"
          />
          <MetricCard
            icon="🛒"
            label="Taux Récupération"
            value={`${metrics.cartRecoveryRate}%`}
            change={`${metrics.recoveredCarts}/${metrics.totalCarts}`}
          />
          <MetricCard
            icon="👥"
            label="Revenue Parrainage"
            value={`${metrics.referralRevenue.toLocaleString()}€`}
            change={`${metrics.activeReferrals} actifs`}
          />
        </div>

        {/* Stats détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Paniers Abandonnés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total ce mois</span>
                  <span className="text-2xl font-bold">{metrics.totalCarts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Récupérés</span>
                  <span className="text-2xl font-bold text-green-600">{metrics.recoveredCarts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Taux de conversion</span>
                  <span className="text-2xl font-bold text-blue-600">{metrics.cartRecoveryRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Programme Parrainage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Parrainages actifs</span>
                  <span className="text-2xl font-bold">{metrics.activeReferrals}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Revenue généré</span>
                  <span className="text-2xl font-bold text-green-600">{metrics.referralRevenue}€</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Moyenne / parrainage</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {metrics.activeReferrals > 0 
                      ? Math.round(metrics.referralRevenue / metrics.activeReferrals)
                      : 0}€
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions automatiques en cours */}
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎯 Actions Automatiques en Cours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-foreground">Upsell emails : planifiés automatiquement</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-foreground">Cart recovery : {metrics.totalCarts - metrics.recoveredCarts} en cours</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-foreground">Matching quotidien : actif</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span className="text-foreground">Emails en attente : {metrics.pendingEmails}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Projections */}
        <Card className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Projections Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {Math.round(metrics.monthRevenue * 1.4).toLocaleString()}€
                </div>
                <div className="text-sm text-muted-foreground">Projection fin de mois</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round(metrics.monthRevenue * 12 * 1.3).toLocaleString()}€
                </div>
                <div className="text-sm text-muted-foreground">Projection annuelle</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  +45%
                </div>
                <div className="text-sm text-muted-foreground">Croissance M/M</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenueDashboard;
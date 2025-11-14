import { useState } from 'react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, ShoppingCart, Users } from 'lucide-react';
import { TestMatchingButton } from '@/components/TestMatchingButton';

const RevenueDashboard = () => {
  const [metrics] = useState({
    todayRevenue: 450,
    monthRevenue: 12340,
    cartRecoveryRate: 15,
    referralRevenue: 890,
    totalCarts: 45,
    recoveredCarts: 7,
    activeReferrals: 23,
    pendingEmails: 12,
  });

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

        {/* Test Matching */}
        <div className="mb-8">
          <TestMatchingButton />
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
                <span className="text-foreground">Upsell emails : planifiés toutes les 2h</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-foreground">Cart recovery : {metrics.totalCarts - metrics.recoveredCarts} en cours</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-foreground">Matching quotidien : actif à 9h</span>
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
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ComparisonItem {
  id: string;
  title: string;
  location?: string;
  price: number;
  revenue: number;
  employees?: number;
  hasRGE?: boolean;
  yearFounded?: number;
  ebitda?: number;
  netMargin?: number;
}

interface ComparisonModalProps {
  items: ComparisonItem[];
  isOpen: boolean;
  onClose: () => void;
}

interface ComparisonData {
  priceRange: { min: number; max: number; average: number };
  revenueRange: { min: number; max: number; average: number };
  bestValue: ComparisonItem;
  mostEmployees: ComparisonItem;
  hasRGE: ComparisonItem[];
}

const ComparisonModal = ({ items, isOpen, onClose }: ComparisonModalProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);

  useEffect(() => {
    if (items.length > 0) {
      analyzeComparison(items);
    }
  }, [items]);

  const analyzeComparison = (items: ComparisonItem[]) => {
    const data: ComparisonData = {
      priceRange: {
        min: Math.min(...items.map(i => i.price)),
        max: Math.max(...items.map(i => i.price)),
        average: items.reduce((sum, i) => sum + i.price, 0) / items.length
      },
      revenueRange: {
        min: Math.min(...items.map(i => i.revenue)),
        max: Math.max(...items.map(i => i.revenue)),
        average: items.reduce((sum, i) => sum + i.revenue, 0) / items.length
      },
      bestValue: items.reduce((best, item) => {
        const ratio = item.price / item.revenue;
        return ratio < (best.price / best.revenue) ? item : best;
      }),
      mostEmployees: items.reduce((most, item) => 
        (item.employees || 0) > (most.employees || 0) ? item : most
      ),
      hasRGE: items.filter(i => i.hasRGE)
    };

    setComparisonData(data);
  };

  const tabs = [
    { id: 'overview', label: "Vue d'ensemble", icon: '📊' },
    { id: 'financial', label: 'Finances', icon: '💰' },
    { id: 'recommendation', label: 'Recommandation', icon: '⭐' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-card rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Comparaison détaillée ({items.length} entreprises)
            </h2>
            <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-lg transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-card text-foreground'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' && (
            <div>
              {/* Tableau principal */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left">Critère</th>
                      {items.map((item) => (
                        <th key={item.id} className="px-4 py-3 text-center">
                          <div className="font-semibold">{item.title}</div>
                          {item.location && (
                            <div className="text-xs text-muted-foreground font-normal">
                              {item.location}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="hover:bg-muted/50">
                      <td className="px-4 py-3 font-semibold">Prix de vente</td>
                      {items.map(item => (
                        <td key={item.id} className="px-4 py-3 text-center">
                          <span className="text-2xl font-bold text-primary">
                            {item.price.toLocaleString()}€
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-muted/50">
                      <td className="px-4 py-3 font-semibold">Chiffre d'affaires</td>
                      {items.map(item => (
                        <td key={item.id} className="px-4 py-3 text-center">
                          {item.revenue.toLocaleString()}€
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-muted/50">
                      <td className="px-4 py-3 font-semibold">Ratio Prix/CA</td>
                      {items.map(item => (
                        <td key={item.id} className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded ${
                            (item.price / item.revenue) < 1 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                              : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100'
                          }`}>
                            {(item.price / item.revenue).toFixed(2)}x
                          </span>
                        </td>
                      ))}
                    </tr>

                    {items.some(i => i.employees) && (
                      <tr className="hover:bg-muted/50">
                        <td className="px-4 py-3 font-semibold">Effectif</td>
                        {items.map(item => (
                          <td key={item.id} className="px-4 py-3 text-center">
                            {item.employees || '-'} salariés
                          </td>
                        ))}
                      </tr>
                    )}

                    <tr className="hover:bg-muted/50">
                      <td className="px-4 py-3 font-semibold">Certification RGE</td>
                      {items.map(item => (
                        <td key={item.id} className="px-4 py-3 text-center">
                          {item.hasRGE ? (
                            <span className="text-green-600 text-xl">✅</span>
                          ) : (
                            <span className="text-muted-foreground text-xl">❌</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {items.some(i => i.yearFounded) && (
                      <tr className="hover:bg-muted/50">
                        <td className="px-4 py-3 font-semibold">Année de création</td>
                        {items.map(item => (
                          <td key={item.id} className="px-4 py-3 text-center">
                            {item.yearFounded || '-'}
                          </td>
                        ))}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">Analyse financière détaillée</h3>

              {items.map(item => (
                <div key={item.id} className="bg-muted rounded-lg p-6">
                  <h4 className="font-bold mb-4">{item.title}</h4>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">CA annuel</p>
                      <p className="text-xl font-bold">{item.revenue.toLocaleString()}€</p>
                    </div>
                    {item.ebitda && (
                      <div>
                        <p className="text-sm text-muted-foreground">EBITDA</p>
                        <p className="text-xl font-bold">{item.ebitda.toLocaleString()}€</p>
                      </div>
                    )}
                    {item.netMargin && (
                      <div>
                        <p className="text-sm text-muted-foreground">Marge nette</p>
                        <p className="text-xl font-bold">{item.netMargin}%</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Valorisation</span>
                      <span className="text-2xl font-bold text-primary">
                        {item.price.toLocaleString()}€
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-muted-foreground">Multiple CA</span>
                      <span className="font-semibold">
                        {(item.price / item.revenue).toFixed(2)}x
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'recommendation' && comparisonData && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">Notre recommandation</h3>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg p-6 border">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🏆</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold mb-2">
                      Meilleur rapport qualité/prix : {comparisonData.bestValue.title}
                    </h4>
                    <p className="text-muted-foreground">
                      Avec un ratio prix/CA de {(comparisonData.bestValue.price / comparisonData.bestValue.revenue).toFixed(2)}x,
                      cette entreprise offre la meilleure valorisation du marché.
                    </p>

                    <div className="mt-4 flex gap-4">
                      <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90">
                        Contacter le vendeur
                      </button>
                      <button className="bg-card border border-primary text-primary px-6 py-2 rounded-lg hover:bg-accent">
                        Voir les détails
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Points clés */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">💰 Meilleur prix</h5>
                  <p className="text-muted-foreground">
                    {items.reduce((min, item) => item.price < min.price ? item : min).title}
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.min(...items.map(i => i.price)).toLocaleString()}€
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">📈 Plus gros CA</h5>
                  <p className="text-muted-foreground">
                    {items.reduce((max, item) => item.revenue > max.revenue ? item : max).title}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {Math.max(...items.map(i => i.revenue)).toLocaleString()}€
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t p-6 bg-muted/50">
          <div className="flex justify-between items-center">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              Télécharger PDF
            </button>

            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="px-6 py-2 border rounded-lg hover:bg-accent"
              >
                Fermer
              </button>
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                Contacter tous les vendeurs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;

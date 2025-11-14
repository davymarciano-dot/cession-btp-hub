import { getTotalSeoPages, generateAllSeoPages } from '@/utils/seoPageGenerator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, FileText, Target } from 'lucide-react';

const SeoStats = () => {
  const stats = getTotalSeoPages();
  const pages = generateAllSeoPages();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Architecture SEO CessionBTP</h1>
          
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-card p-6 rounded-lg border text-center">
              <FileText className="w-12 h-12 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold text-card-foreground">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Pages SEO totales</div>
            </div>
            <div className="bg-card p-6 rounded-lg border text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold text-card-foreground">{stats.byType.metier}</div>
              <div className="text-sm text-muted-foreground">Pages métier</div>
            </div>
            <div className="bg-card p-6 rounded-lg border text-center">
              <Target className="w-12 h-12 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold text-card-foreground">{stats.byType.metierVille}</div>
              <div className="text-sm text-muted-foreground">Pages métier+ville</div>
            </div>
            <div className="bg-card p-6 rounded-lg border text-center">
              <Target className="w-12 h-12 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold text-card-foreground">{stats.byType.certification}</div>
              <div className="text-sm text-muted-foreground">Pages certification</div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg border mb-8">
            <h2 className="text-2xl font-bold mb-4">Répartition par type</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Pages métier</span>
                <Badge>{stats.byType.metier} pages</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Pages métier + ville</span>
                <Badge>{stats.byType.metierVille} pages</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Pages certification</span>
                <Badge>{stats.byType.certification} pages</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Pages région</span>
                <Badge>{stats.byType.region} pages</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Pages mot-clé vendeur</span>
                <Badge>{stats.byType.keyword} pages</Badge>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg border">
            <h2 className="text-2xl font-bold mb-4">Exemples de pages générées</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {pages.slice(0, 20).map((page, i) => (
                <a 
                  key={i}
                  href={page.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border rounded-lg hover:border-primary transition-colors"
                >
                  <div className="font-medium text-sm mb-1">{page.title}</div>
                  <div className="text-xs text-muted-foreground">{page.path}</div>
                </a>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-6">
              Et {stats.total - 20} autres pages...
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SeoStats;

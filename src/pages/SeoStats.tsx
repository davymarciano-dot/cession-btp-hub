import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getTotalSeoPages, generateAllSeoPages } from '@/utils/seoPageGenerator';
import { BarChart3, Globe, MapPin, Award, TrendingUp, Zap } from 'lucide-react';

const SeoStats = () => {
  const stats = getTotalSeoPages();
  const samplePages = generateAllSeoPages().slice(0, 20);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Architecture SEO explosive
          </h1>
          <p className="text-xl text-muted-foreground">
            {stats.total} pages générées automatiquement pour dominer Google
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 border-2 border-primary/20 hover:border-primary/40 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold">{stats.total}</h3>
            </div>
            <p className="text-muted-foreground">Pages SEO totales</p>
          </Card>

          <Card className="p-6 border-2 border-secondary/20 hover:border-secondary/40 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-8 h-8 text-secondary" />
              <h3 className="text-2xl font-bold">{stats.byType.renewableEnergy}</h3>
            </div>
            <p className="text-muted-foreground">Pages énergies renouvelables RGE</p>
          </Card>

          <Card className="p-6 border-2 border-accent/20 hover:border-accent/40 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-8 h-8 text-accent" />
              <h3 className="text-2xl font-bold">{stats.byType.metier}</h3>
            </div>
            <p className="text-muted-foreground">Pages métiers BTP</p>
          </Card>
        </div>

        <Card className="p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Distribution des pages par type</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-green-500" />
                <span className="font-semibold">Énergies renouvelables RGE</span>
              </div>
              <Badge variant="default" className="text-lg px-4 py-1">{stats.byType.renewableEnergy}</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-blue-500" />
                <span className="font-semibold">Métiers</span>
              </div>
              <Badge variant="default" className="text-lg px-4 py-1">{stats.byType.metier}</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-orange-500" />
                <span className="font-semibold">Métier + Ville</span>
              </div>
              <Badge variant="default" className="text-lg px-4 py-1">{stats.byType.metierVille}</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-purple-500" />
                <span className="font-semibold">Certifications</span>
              </div>
              <Badge variant="default" className="text-lg px-4 py-1">{stats.byType.certification}</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-red-500" />
                <span className="font-semibold">Régions</span>
              </div>
              <Badge variant="default" className="text-lg px-4 py-1">{stats.byType.region}</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-teal-500" />
                <span className="font-semibold">Keywords vendeur</span>
              </div>
              <Badge variant="default" className="text-lg px-4 py-1">{stats.byType.keyword}</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="text-3xl font-bold mb-6">Exemples de pages générées</h2>
          <div className="space-y-3">
            {samplePages.map((page, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-semibold">{page.title}</p>
                  <p className="text-sm text-muted-foreground">{page.path}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{page.type}</Badge>
                  <Badge variant="secondary">Priority: {page.priority}</Badge>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6">
            ... et {stats.total - 20} autres pages générées automatiquement
          </p>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default SeoStats;

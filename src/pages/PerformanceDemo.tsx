import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOImage } from "@/components/SEOImage";
import { LazySection } from "@/components/LazySection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCachedQuery } from "@/hooks/useCachedQuery";
import { apiCache } from "@/lib/apiCache";
import { Zap, Image as ImageIcon, Database, Eye } from "lucide-react";

const PerformanceDemo = () => {
  const [showImages, setShowImages] = useState(true);

  // Example of cached query (would normally fetch from real API)
  const { data, isLoading } = useCachedQuery(
    ["demo-data"],
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  const handleClearCache = () => {
    apiCache.clearAll();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Performance Optimizations</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Démonstration des optimisations de performance
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <ImageIcon className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Lazy Loading Images</h3>
              <p className="text-sm text-muted-foreground">
                Images chargées uniquement quand visibles dans le viewport
              </p>
            </Card>

            <Card className="p-6">
              <Eye className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Lazy Sections</h3>
              <p className="text-sm text-muted-foreground">
                Composants lourds chargés à la demande
              </p>
            </Card>

            <Card className="p-6">
              <Database className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">API Caching</h3>
              <p className="text-sm text-muted-foreground">
                Cache automatique des requêtes API (5 min TTL)
              </p>
            </Card>
          </div>

          {/* Optimized Images Demo */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Images Optimisées</h2>
              <Button
                variant="outline"
                onClick={() => setShowImages(!showImages)}
              >
                {showImages ? "Masquer" : "Afficher"} les images
              </Button>
            </div>

            {showImages && (
              <div className="grid md:grid-cols-3 gap-4">
                <SEOImage
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5"
                  alt="Construction site"
                  aspectRatio="square"
                />
                <SEOImage
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd"
                  alt="Building"
                  aspectRatio="square"
                />
                <SEOImage
                  src="https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8"
                  alt="Tools"
                  aspectRatio="square"
                />
              </div>
            )}

            <div className="mt-4 space-y-2">
              <Badge variant="secondary">✓ Lazy loading avec Intersection Observer</Badge>
              <Badge variant="secondary">✓ Skeleton loader pendant le chargement</Badge>
              <Badge variant="secondary">✓ Gestion d'erreur avec fallback</Badge>
            </div>
          </Card>

          {/* Lazy Section Demo */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Sections Lazy Loadées</h2>
            
            <LazySection className="space-y-4">
              <Card className="p-4 bg-primary/5">
                <h3 className="font-semibold mb-2">Section 1</h3>
                <p className="text-muted-foreground">
                  Cette section n'est chargée que lorsqu'elle devient visible.
                  Scrollez pour voir l'effet.
                </p>
              </Card>
            </LazySection>

            <div className="h-64" /> {/* Spacer to demonstrate scrolling */}

            <LazySection className="space-y-4">
              <Card className="p-4 bg-primary/5">
                <h3 className="font-semibold mb-2">Section 2</h3>
                <p className="text-muted-foreground">
                  Cette section apparaît uniquement après le scroll.
                  Idéal pour les composants lourds.
                </p>
              </Card>
            </LazySection>
          </Card>

          {/* API Cache Demo */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Cache API</h2>
            
            {isLoading ? (
              <p className="text-muted-foreground">Chargement...</p>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Données en cache:</h3>
                  <pre className="text-sm overflow-auto">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => window.location.reload()}>
                    Recharger la page
                  </Button>
                  <Button variant="outline" onClick={handleClearCache}>
                    Vider le cache
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Cache actuel: {apiCache.size()} entrées
                  </p>
                  <Badge variant="secondary">
                    ✓ Les données restent en cache pendant 5 minutes
                  </Badge>
                  <Badge variant="secondary">
                    ✓ Rechargement instantané depuis le cache
                  </Badge>
                </div>
              </div>
            )}
          </Card>

          {/* Implementation Guide */}
          <Card className="p-6 bg-primary/5">
            <h2 className="text-2xl font-bold mb-4">Comment utiliser</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">1. Images optimisées SEO:</h3>
                <code className="block bg-background p-2 rounded">
                  {`<SEOImage src="url" alt="description" aspectRatio="square" priority={false} />`}
                </code>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Sections lazy:</h3>
                <code className="block bg-background p-2 rounded">
                  {`<LazySection>{/* contenu lourd */}</LazySection>`}
                </code>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Cache API:</h3>
                <code className="block bg-background p-2 rounded">
                  {`const { data } = useCachedQuery(['key'], 'url');`}
                </code>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PerformanceDemo;
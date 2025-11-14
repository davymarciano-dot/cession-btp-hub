import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { backlinksSources, getTotalBacklinkValue, getBacklinksByDifficulty, guestPostTopics, guestPostTemplate } from '@/data/backlinks-gratuits';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, CheckCircle, Clock, Copy, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const BacklinksManager = () => {
  const { toast } = useToast();
  const [completedBacklinks, setCompletedBacklinks] = useState<string[]>([]);
  
  const totalValue = getTotalBacklinkValue();
  const backlinksGratuits = backlinksSources.filter(b => b.gratuit);
  
  const handleMarkComplete = (url: string) => {
    setCompletedBacklinks(prev => 
      prev.includes(url) 
        ? prev.filter(b => b !== url)
        : [...prev, url]
    );
    toast({
      title: "Statut mis à jour",
      description: "Backlink marqué comme complété"
    });
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copié !",
      description: "Template copié dans le presse-papier"
    });
  };
  
  return (
    <>
      <Helmet>
        <title>Gestionnaire Backlinks Gratuits | CessionBTP</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Stratégie Backlinks 100% Gratuite</h1>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">{backlinksGratuits.length}</div>
              <div className="text-sm text-muted-foreground">Sources gratuites</div>
            </Card>
            <Card className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">{completedBacklinks.length}</div>
              <div className="text-sm text-muted-foreground">Backlinks obtenus</div>
            </Card>
            <Card className="p-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">{totalValue}€</div>
              <div className="text-sm text-muted-foreground">Valeur totale économisée</div>
            </Card>
          </div>
        </div>
        
        <Tabs defaultValue="facile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="facile">
              Faciles ({getBacklinksByDifficulty('facile').length})
            </TabsTrigger>
            <TabsTrigger value="moyen">
              Moyens ({getBacklinksByDifficulty('moyen').length})
            </TabsTrigger>
            <TabsTrigger value="difficile">
              Difficiles ({getBacklinksByDifficulty('difficile').length})
            </TabsTrigger>
            <TabsTrigger value="guest-posts">
              Guest Posts ({guestPostTopics.length})
            </TabsTrigger>
          </TabsList>
          
          {(['facile', 'moyen', 'difficile'] as const).map(difficulty => (
            <TabsContent key={difficulty} value={difficulty}>
              <div className="space-y-4">
                {getBacklinksByDifficulty(difficulty).map(backlink => {
                  const isCompleted = completedBacklinks.includes(backlink.url);
                  
                  return (
                    <Card key={backlink.url} className={`p-6 ${isCompleted ? 'bg-green-50 dark:bg-green-950' : ''}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold">{backlink.nom}</h3>
                            <Badge variant={backlink.gratuit ? 'default' : 'secondary'}>
                              {backlink.gratuit ? 'Gratuit' : 'Payant'}
                            </Badge>
                            <Badge variant="outline">DA {backlink.da}</Badge>
                            {isCompleted && (
                              <Badge className="bg-green-600">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Fait
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {backlink.instructions}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {backlink.delai}
                            </span>
                            <span className="text-green-600 font-medium">
                              Économie: {backlink.valeur}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant={isCompleted ? 'outline' : 'default'}
                            onClick={() => handleMarkComplete(backlink.url)}
                          >
                            {isCompleted ? 'Annuler' : 'Marquer fait'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                          >
                            <a href={backlink.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Accéder
                            </a>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
          
          <TabsContent value="guest-posts">
            <div className="space-y-6">
              {/* Template Email */}
              <Card className="p-6 bg-blue-50 dark:bg-blue-950">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold mb-2">📧 Template Email Guest Post</h3>
                    <p className="text-sm text-muted-foreground">
                      Utilisez ce template pour proposer des articles invités
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(guestPostTemplate.corps)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copier
                  </Button>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mt-4">
                  <div className="font-semibold mb-2">Objet: {guestPostTemplate.objet}</div>
                  <pre className="text-sm whitespace-pre-wrap font-mono">
                    {guestPostTemplate.corps}
                  </pre>
                </div>
              </Card>
              
              {/* Sujets articles */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Sujets d'Articles Recommandés</h3>
                {guestPostTopics.map((topic, idx) => (
                  <Card key={idx} className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-2">{topic.titre}</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Angle: {topic.angle}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {topic.cible.map(site => (
                            <Badge key={site} variant="outline">{site}</Badge>
                          ))}
                        </div>
                        <Badge 
                          className={
                            topic.valeur === 'Très haute' ? 'bg-green-600' :
                            topic.valeur === 'Haute' ? 'bg-blue-600' :
                            'bg-gray-600'
                          }
                        >
                          Valeur: {topic.valeur}
                        </Badge>
                      </div>
                      
                      <Button
                        size="sm"
                        onClick={() => {
                          const emailBody = guestPostTemplate.corps
                            .replace('[TITRE ARTICLE]', topic.titre)
                            .replace('[THÉMATIQUE]', topic.angle);
                          copyToClipboard(emailBody);
                        }}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Préparer email
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

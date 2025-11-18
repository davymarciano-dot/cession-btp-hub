import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SEOHead from '@/components/SEOHead';
import { UltraCompleteSchemas } from '@/components/seo/UltraCompleteSchemas';
import { AutoInternalLinks } from '@/components/seo/AutoInternalLinks';
import { ValuationCalculator } from '@/components/tools/ValuationCalculator';
import { FinancingSimulator } from '@/components/tools/FinancingSimulator';
import { Calculator, PiggyBank, FileText, Download, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function OutilsGratuits() {
  const documents = [
    {
      nom: 'Checklist Cession BTP',
      description: 'Liste complète des étapes et documents pour vendre',
      icon: FileText,
      taille: '2 pages PDF'
    },
    {
      nom: 'Template Dossier de Présentation',
      description: 'Modèle Word personnalisable pour votre entreprise',
      icon: FileText,
      taille: '8 pages DOCX'
    },
    {
      nom: 'Grille Valorisation Excel',
      description: 'Calculez vous-même la valeur de votre entreprise',
      icon: Calculator,
      taille: '1 fichier XLSX'
    },
    {
      nom: 'Modèle NDA / Accord Confidentialité',
      description: 'Protégez vos informations sensibles',
      icon: FileText,
      taille: '3 pages PDF'
    }
  ];
  
  return (
    <>
      <Header />
      <SEOHead page="about" />
      
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link to="/">
                <Button 
                  variant="ghost" 
                  className="mb-6 text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à l'accueil
                </Button>
              </Link>
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Outils gratuits cession BTP</h1>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                  Calculateurs, simulateurs et modèles professionnels pour réussir votre cession
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="valorisation" className="space-y-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
              <TabsTrigger value="valorisation">
                <Calculator className="w-4 h-4 mr-2" />
                Valorisation
              </TabsTrigger>
              <TabsTrigger value="financement">
                <PiggyBank className="w-4 h-4 mr-2" />
                Financement
              </TabsTrigger>
              <TabsTrigger value="documents">
                <FileText className="w-4 h-4 mr-2" />
                Documents
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="valorisation">
              <ValuationCalculator />
            </TabsContent>
            
            <TabsContent value="financement">
              <FinancingSimulator />
            </TabsContent>
            
            <TabsContent value="documents">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">📄 Modèles et Documents Gratuits</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {documents.map((doc, idx) => (
                    <Card key={idx} className="p-6 hover:shadow-lg transition">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <doc.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-2">{doc.nom}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {doc.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{doc.taille}</span>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Télécharger
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h3 className="font-bold mb-3">💡 Pourquoi ces outils sont-ils gratuits ?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    CessionBTP met à disposition ces outils professionnels gratuitement pour aider les entrepreneurs BTP 
                    dans leur projet de cession ou de reprise. Pas de piège, pas d'abonnement caché.
                  </p>
                  <p className="text-sm font-medium">
                    ✅ 100% gratuits • ✅ Sans inscription • ✅ Utilisation illimitée
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* SEO Content */}
          <div className="mt-16 prose prose-lg max-w-4xl mx-auto dark:prose-invert">
            <h2>Pourquoi utiliser nos outils de valorisation et financement ?</h2>
            <p>
              La cession ou la reprise d'une entreprise BTP nécessite une préparation rigoureuse. 
              Nos outils gratuits vous permettent d'obtenir une première estimation précise et de simuler 
              votre plan de financement en quelques minutes.
            </p>
            
            <h3>Calculateur de Valorisation : Comment ça marche ?</h3>
            <p>
              Notre calculateur utilise les multiples sectoriels 2024 actualisés chaque trimestre 
              à partir de 500+ transactions réelles. Il prend en compte :
            </p>
            <ul>
              <li>Le secteur d'activité spécifique (50+ métiers BTP)</li>
              <li>Le chiffre d'affaires et la rentabilité (EBE)</li>
              <li>Les certifications RGE, Qualibat, Qualifelec</li>
              <li>La taille et l'ancienneté de l'équipe</li>
              <li>La localisation géographique</li>
            </ul>
            
            <h3>Simulateur de Financement : Optimisez votre reprise</h3>
            <p>
              Le simulateur calcule automatiquement votre plan de financement optimal en intégrant :
            </p>
            <ul>
              <li>Le crédit bancaire classique (60-70% du prix)</li>
              <li>Le crédit vendeur négociable (20-30%)</li>
              <li>Les garanties BPI France (-1% de taux)</li>
              <li>L'effet de levier fiscal (holding/LBO)</li>
            </ul>
            
            <h3>Documents Gratuits : Gagnez du Temps</h3>
            <p>
              Nos modèles professionnels ont été rédigés par des experts-comptables et avocats 
              spécialisés en transmission d'entreprise. Ils vous font économiser 2,000€+ de frais juridiques.
            </p>
          </div>
        </div>
      </div>

      {/* SEO Optimization */}
      <UltraCompleteSchemas page="home" />
      <AutoInternalLinks currentPage="/outils-gratuits" maxLinks={6} />

      <Footer />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Calculator, Users, TrendingUp, Shield } from "lucide-react";

const Ressources = () => {
  const resources = [
    {
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      title: "Guide de Cession BTP",
      description: "Tout ce que vous devez savoir pour vendre ou acheter une entreprise BTP",
      type: "Guide",
    },
    {
      icon: <FileText className="h-12 w-12 text-secondary" />,
      title: "Modèles de Documents",
      description: "Lettres d'intention, NDA, protocoles d'accord et plus encore",
      type: "Documents",
    },
    {
      icon: <Calculator className="h-12 w-12 text-primary" />,
      title: "Calculateurs",
      description: "Estimez la valeur de votre entreprise, calculez votre ROI",
      type: "Outils",
    },
    {
      icon: <Users className="h-12 w-12 text-secondary" />,
      title: "Études de Cas",
      description: "Découvrez comment d'autres ont réussi leur transmission",
      type: "Études",
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-primary" />,
      title: "Tendances du Marché",
      description: "Analyses et statistiques du marché de la cession BTP",
      type: "Analyses",
    },
    {
      icon: <Shield className="h-12 w-12 text-secondary" />,
      title: "Aspects Juridiques",
      description: "Les points clés juridiques et fiscaux de la transmission",
      type: "Juridique",
    },
  ];

  const articles = [
    {
      title: "Comment préparer son entreprise à la vente",
      date: "15 Mars 2024",
      readTime: "8 min",
    },
    {
      title: "Les 10 erreurs à éviter lors d'une cession",
      date: "10 Mars 2024",
      readTime: "6 min",
    },
    {
      title: "Valorisation d'entreprise BTP : les méthodes",
      date: "5 Mars 2024",
      readTime: "10 min",
    },
    {
      title: "Optimiser la fiscalité de votre cession",
      date: "1 Mars 2024",
      readTime: "7 min",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ressources & Guides
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Tous les outils et informations pour réussir votre projet de cession ou reprise d'entreprise BTP
            </p>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Nos Outils et Ressources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {resources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="mb-4">{resource.icon}</div>
                    <CardTitle>{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {resource.type}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Articles */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Articles Récents
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {articles.map((article, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                    <CardDescription>
                      {article.date} • {article.readTime} de lecture
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Questions Fréquentes
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Combien de temps prend une cession ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    En moyenne, une cession d'entreprise BTP prend entre 6 et 12 mois. Avec CessionBTP, 
                    nous réduisons ce délai à 45 jours en moyenne grâce à notre réseau qualifié.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Comment est calculée la valeur de mon entreprise ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Nous utilisons plusieurs méthodes : multiples de CA, EBITDA, actifs nets, et comparables 
                    de marché. Notre expertise BTP nous permet d'affiner ces valorisations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quels documents dois-je préparer ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Bilans des 3 dernières années, liste des clients/fournisseurs, contrats en cours, 
                    certifications, parc matériel, effectifs. Nous vous accompagnons dans la constitution du dossier.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Ressources;

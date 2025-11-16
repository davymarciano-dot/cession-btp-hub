import SEO from "@/components/SEO";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProcessTimeline from "@/components/ProcessTimeline";
import FAQItem from "@/components/FAQItem";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, FileText, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const CommentCaMarche = () => {
  const faqs = [
    {
      question: "Combien de temps prend une transaction ?",
      answer: "En moyenne, une transaction complète prend entre 2 et 4 mois. Cela inclut la valorisation, la mise en relation, la négociation et la finalisation juridique."
    },
    {
      question: "Quels documents dois-je fournir ?",
      answer: "Vous devrez fournir vos bilans des 3 dernières années, un état de votre matériel, la liste de vos contrats en cours, et les documents juridiques de votre société."
    },
    {
      question: "Comment est calculée la valorisation ?",
      answer: "Notre algorithme prend en compte votre CA, votre EBE, la valeur de vos actifs, votre positionnement géographique, vos certifications et le potentiel de développement."
    },
    {
      question: "Puis-je rester anonyme ?",
      answer: "Oui, vous pouvez choisir différents niveaux d'anonymat : complet, semi-anonyme ou public. Les informations sensibles ne sont dévoilées qu'après signature d'un NDA."
    },
    {
      question: "Que se passe-t-il si je ne trouve pas d'acheteur ?",
      answer: "Avec notre formule Success Fee, vous ne payez rien tant que la vente n'est pas conclue. Nous travaillons activement pour trouver le bon repreneur."
    }
  ];

  return (
    <>
      <SEOHead page="howItWorks" />
      <SEO
        title="Comment ça Marche ? | CessionBTP - Processus de Cession"
        description="Découvrez notre processus simple et sécurisé pour vendre ou acheter une entreprise BTP. De la valorisation à la signature, nous vous accompagnons à chaque étape."
        keywords="processus cession BTP, vendre entreprise BTP, acheter société construction, étapes vente entreprise"
        url="https://cessionbtp.fr/comment-ca-marche"
      />
      <Header />

      <main className="bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Comment ça Marche ?
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Un processus simple, transparent et sécurisé pour réussir votre cession d'entreprise BTP
              </p>
            </div>
          </div>
        </section>

        {/* Pour les Vendeurs */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Pour les Vendeurs</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                De la valorisation gratuite à la signature, nous gérons tout le processus
              </p>
            </div>

            <ProcessTimeline />

            <div className="text-center mt-12">
              <Link to="/vendre">
                <Button size="lg" className="gap-2">
                  Commencer ma valorisation gratuite
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Pour les Acheteurs */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Pour les Acheteurs</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Trouvez l'entreprise BTP idéale avec notre algorithme intelligent
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-background rounded-lg p-6 shadow-sm mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">1</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Définissez vos critères</h3>
                    <p className="text-muted-foreground">
                      Secteur, localisation, taille, budget... Nous affinons votre recherche
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-background rounded-lg p-6 shadow-sm mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Recevez des matches</h3>
                    <p className="text-muted-foreground">
                      Notre IA vous propose les entreprises qui correspondent à votre profil
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-background rounded-lg p-6 shadow-sm mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">3</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Contactez & négociez</h3>
                    <p className="text-muted-foreground">
                      Accédez aux dossiers complets et échangez directement avec les vendeurs
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <Link to="/acheter">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Explorer les entreprises disponibles
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Nos Garanties */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Garanties</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Votre sécurité et votre réussite sont nos priorités
              </p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Confidentialité</h3>
                <p className="text-sm text-muted-foreground">
                  NDA systématique et gestion sécurisée de vos données
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Accompagnement</h3>
                <p className="text-sm text-muted-foreground">
                  Experts BTP et avocats spécialisés à vos côtés
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Vérification</h3>
                <p className="text-sm text-muted-foreground">
                  Tous les acheteurs et vendeurs sont vérifiés
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Success Fee</h3>
                <p className="text-sm text-muted-foreground">
                  Vous ne payez qu'en cas de réussite
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions Fréquentes</h2>
                <p className="text-xl text-muted-foreground">
                  Tout ce que vous devez savoir sur notre processus
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à commencer ?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Rejoignez les centaines d'entrepreneurs qui nous ont fait confiance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/vendre">
                  <Button size="lg" className="w-full sm:w-auto">
                    Je vends mon entreprise
                  </Button>
                </Link>
                <Link to="/acheter">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Je cherche à acheter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CommentCaMarche;
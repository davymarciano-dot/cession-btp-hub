import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, Target, Zap, Shield, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function MatchingIA() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20">
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
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-foreground/10 text-primary-foreground mb-6">
                  <Brain className="h-10 w-10" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Matching IA
                </h1>
                <p className="text-xl text-primary-foreground/90">
                  L'intelligence artificielle qui connecte vendeurs et acheteurs en 24h
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Comment fonctionne notre IA ?
              </h2>
              
              <div className="grid gap-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary flex-shrink-0">
                        <Target className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">1. Analyse des critères</h3>
                        <p className="text-muted-foreground">
                          Notre IA analyse en profondeur tous les critères de votre annonce : secteur d'activité, localisation, chiffre d'affaires, nombre de salariés, et bien plus encore.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary flex-shrink-0">
                        <Brain className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">2. Calcul de compatibilité</h3>
                        <p className="text-muted-foreground">
                          L'algorithme calcule un score de compatibilité entre votre profil et celui des repreneurs potentiels en analysant plus de 50 points de données différents.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary flex-shrink-0">
                        <Zap className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">3. Mise en relation instantanée</h3>
                        <p className="text-muted-foreground">
                          En moins de 24h, vous recevez les profils les plus pertinents avec un score de compatibilité. Vous pouvez ensuite choisir qui contacter en priorité.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary flex-shrink-0">
                        <Shield className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">4. Suivi et optimisation continue</h3>
                        <p className="text-muted-foreground">
                          L'IA apprend de chaque interaction et affine ses recommandations en continu pour maximiser vos chances de trouver le match parfait.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Critères de matching */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Les critères analysés par l'IA
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4 text-lg">Critères géographiques</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Département et région ciblés</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Zone d'intervention de l'entreprise</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Proximité avec le lieu de résidence</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4 text-lg">Critères financiers</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Budget d'acquisition disponible</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Chiffre d'affaires de l'entreprise</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Rentabilité et résultats financiers</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4 text-lg">Critères sectoriels</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Secteur d'activité BTP recherché</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Spécialités et certifications (RGE...)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Type de clientèle (B2B, B2C, marchés publics)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4 text-lg">Critères opérationnels</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Taille de l'équipe recherchée</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Équipements et matériel disponibles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Situation des locaux (propriétaire/locataire)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Les avantages du matching IA
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Gain de temps</h3>
                  <p className="text-muted-foreground">
                    Trouvez les bons profils en 24h au lieu de chercher pendant des mois
                  </p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <Target className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Précision maximale</h3>
                  <p className="text-muted-foreground">
                    Algorithme qui analyse plus de 50 critères pour un matching optimal
                  </p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Taux de réussite élevé</h3>
                  <p className="text-muted-foreground">
                    95% de satisfaction grâce à des mises en relation ultra-qualifiées
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Testez notre matching IA dès maintenant
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Trouvez votre repreneur idéal en moins de 24h grâce à l'intelligence artificielle
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/vendre">
                  <Button size="lg" className="bg-background text-primary hover:bg-background/90">
                    Vendre mon entreprise
                  </Button>
                </Link>
                <Link to="/entreprises">
                  <Button size="lg" variant="secondary">
                    Trouver une entreprise
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

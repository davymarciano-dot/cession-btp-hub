import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EntrepriseCard from "@/components/EntrepriseCard";
import PricingCard from "@/components/PricingCard";
import ProcessStep from "@/components/ProcessStep";

const Index = () => {
  const [stats, setStats] = useState({ repreneurs: 0, experience: 0, specialisation: 0 });

  // Animated counters
  useEffect(() => {
    const targetStats = { repreneurs: 500, experience: 15, specialisation: 100 };
    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        repreneurs: Math.floor(targetStats.repreneurs * progress),
        experience: Math.floor(targetStats.experience * progress),
        specialisation: Math.floor(targetStats.specialisation * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            {/* Live Badge */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-sm font-medium">
                  LIVE - Entreprise d'Électricité vendue pour €1.2M à Nice (06) Il y a 6h
                </span>
                <Badge className="bg-secondary text-white border-0">NOUVEAU</Badge>
              </div>
            </div>

            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Cédez ou Reprenez une Entreprise BTP en 45 Jours
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Matching IA • 500+ Transactions • 95% Satisfaction • Success Fee 2%
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8">
                  Vendre mon entreprise
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8"
                >
                  Trouver une entreprise
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Résultat en 48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>100% confidentiel</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span>Sans engagement</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="container mx-auto px-4 -mt-16 relative z-10 mb-20">
          <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Type d'entreprise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plomberie">Plomberie</SelectItem>
                  <SelectItem value="electricite">Électricité</SelectItem>
                  <SelectItem value="maconnerie">Maçonnerie</SelectItem>
                  <SelectItem value="chauffage">Chauffage & Climatisation</SelectItem>
                  <SelectItem value="couverture">Couverture</SelectItem>
                  <SelectItem value="peinture">Peinture</SelectItem>
                  <SelectItem value="paysagisme">Paysagisme</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Région" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idf">Île-de-France</SelectItem>
                  <SelectItem value="ara">Auvergne-Rhône-Alpes</SelectItem>
                  <SelectItem value="na">Nouvelle-Aquitaine</SelectItem>
                  <SelectItem value="occ">Occitanie</SelectItem>
                  <SelectItem value="paca">Provence-Alpes-Côte d'Azur</SelectItem>
                  <SelectItem value="ge">Grand Est</SelectItem>
                  <SelectItem value="hdf">Hauts-de-France</SelectItem>
                  <SelectItem value="nor">Normandie</SelectItem>
                  <SelectItem value="bre">Bretagne</SelectItem>
                  <SelectItem value="pdl">Pays de la Loire</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-secondary hover:bg-secondary/90 text-white">
                Rechercher
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Companies */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Opportunités à Saisir</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <EntrepriseCard
                type="orange"
                certification="CERTIFIÉE RGE"
                status="vendu"
                title="Société d'Isolation Thermique"
                location="Lyon, Rhône (69)"
                creation="2020"
                ca="542K€"
                effectif="8 salariés"
                secteur="Isolation et ITE"
              />

              <EntrepriseCard
                type="orange"
                certification="RGE QUALIPAC"
                status="vendu"
                title="Entreprise Chauffage & Climatisation"
                location="Toulouse, Haute-Garonne (31)"
                creation="2018"
                ca="890K€"
                effectif="6 salariés"
                secteur="Pompes à chaleur"
              />

              <EntrepriseCard
                type="blue"
                certification="QUALIBAT"
                status="disponible"
                timeAgo="Il y a 5h"
                title="Entreprise Générale du Bâtiment"
                location="Nice, PACA (06)"
                creation="2005"
                ca="2,8M€"
                effectif="22 salariés"
                secteur="Tous corps d'état"
                description="Entreprise générale tous corps d'état. Marchés publics 60%, privés 40%. Certifications Qualibat."
                price="1 850 000 €"
                financement={true}
              />
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg">
                Voir toutes les annonces (18+ disponibles)
              </Button>
            </div>
          </div>
        </section>

        {/* Buyer Subscriptions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-3xl font-bold mb-4">Abonnements Acheteurs</h2>
              <p className="text-xl text-muted-foreground">
                Accédez aux meilleures opportunités d'acquisition BTP
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <PricingCard
                title="GRATUIT"
                price="0€"
                description="Consultation - Cible : 50 000€ - CA : 0"
                features={[
                  "Consultation des annonces",
                  "Recherche basique",
                  "Interface acheteur",
                  "Inscription gratuite"
                ]}
                buttonText="S'inscrire gratuitement"
              />

              <PricingCard
                title="CONTACT"
                price="49€"
                period="/5 contacts"
                description="Messages directs - Cible : 10 000€ - CA : 2,5M"
                features={[
                  "5 contacts directs",
                  "Messages vers vendeurs",
                  "Coordonnées complètes",
                  "Historique des échanges",
                  "Accès prioritaire"
                ]}
                buttonText="Acheter des contacts"
              />

              <PricingCard
                title="PRO"
                price="99€"
                period="/mois"
                description="Illimité + alertes - Cible : 5 000€ - CA : 6M"
                features={[
                  "Contacts ILLIMITÉS",
                  "Alertes personnalisées",
                  "Coordonnées complètes",
                  "Badge 'Acheteur Vérifié'",
                  "Support prioritaire"
                ]}
                buttonText="Choisir Pro"
                isPopular={true}
              />

              <PricingCard
                title="ENTREPRISE"
                price="299€"
                period="/mois"
                description="Multi-utilisateurs + API - Cible : 500€ - CA : 1,8M"
                features={[
                  "Accès multi-utilisateurs",
                  "API d'intégration",
                  "Rapports avancés",
                  "Gestionnaire dédié",
                  "Formation équipe"
                ]}
                buttonText="Choisir Entreprise"
              />
            </div>
          </div>
        </section>

        {/* Price Comparison */}
        <section className="py-20 bg-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">💎</div>
              <h2 className="text-3xl font-bold mb-4">
                Nous ne sommes PAS les moins chers... et tant mieux !
              </h2>
              <p className="text-xl text-muted-foreground">
                Comparaison honnête avec les plateformes généralistes
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-left font-bold">Critère</th>
                        <th className="px-6 py-4 text-left font-bold">Sites Généralistes</th>
                        <th className="px-6 py-4 text-left font-bold text-primary">CessionBTP ✅</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-6 py-4 font-medium">Prix</td>
                        <td className="px-6 py-4">250€/an (12 mois)</td>
                        <td className="px-6 py-4 text-primary font-bold">290€ (3 mois)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Coût mensuel</td>
                        <td className="px-6 py-4">21€</td>
                        <td className="px-6 py-4 text-primary font-bold">97€</td>
                      </tr>
                      <tr className="bg-blue-50">
                        <td className="px-6 py-4 font-bold">Délai moyen de vente</td>
                        <td className="px-6 py-4 font-bold">18-24 mois ⏳</td>
                        <td className="px-6 py-4 text-primary font-bold text-xl">45 jours ⚡</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Spécialisation</td>
                        <td className="px-6 py-4">Tous secteurs</td>
                        <td className="px-6 py-4 text-primary font-bold">100% BTP & ENR</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Repreneurs actifs</td>
                        <td className="px-6 py-4">Grand public</td>
                        <td className="px-6 py-4 text-primary font-bold">2000+ qualifiés BTP</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Valorisation</td>
                        <td className="px-6 py-4">Non incluse (+500€)</td>
                        <td className="px-6 py-4 text-success font-bold">✅ Incluse</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Support</td>
                        <td className="px-6 py-4">Email générique</td>
                        <td className="px-6 py-4 text-primary font-bold">Expert BTP dédié</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Success fee</td>
                        <td className="px-6 py-4">Forfait</td>
                        <td className="px-6 py-4 text-primary font-bold">2% uniquement</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6 mb-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4">🧮 Le vrai calcul :</h3>
                <div className="space-y-4 text-lg">
                  <p>
                    <strong>Généralistes :</strong> 250€ + 500€ valorisation + 18 mois d'attente = 
                    <span className="text-destructive font-bold"> 750€ et 540 jours perdus</span>
                  </p>
                  <p>
                    <strong>CessionBTP :</strong> 290€ tout compris + 45 jours = 
                    <span className="text-success font-bold"> VENDU ✅</span>
                  </p>
                  <div className="bg-primary/10 p-6 rounded-lg mt-6">
                    <p className="text-xl font-bold text-primary">
                      💰 Pour 40€ de plus : Vendez 12x plus vite | Économisez 17 mois | Valorisation incluse (500€)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-white p-8 rounded-xl shadow-lg">
                <p className="italic text-lg mb-4">
                  "J'ai d'abord essayé une plateforme généraliste à 250€. 9 mois perdus, 0 contact sérieux. 
                  Avec CessionBTP, vendu en 38 jours à un repreneur parfait. Le meilleur investissement de ma vie."
                </p>
                <p className="font-bold">
                  - Marc L., Plomberie-Chauffage, Toulouse
                  <span className="ml-2">⭐⭐⭐⭐⭐</span>
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white text-2xl py-6 px-12">
                COMMENCER MON ESTIMATION GRATUITE
              </Button>
            </div>
          </div>
        </section>

        {/* Seller Subscriptions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">🏗️</div>
              <h2 className="text-3xl font-bold mb-4">Abonnements Vendeurs</h2>
              <p className="text-xl text-muted-foreground">
                Choisissez la formule adaptée à vos besoins de transmission
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <PricingCard
                title="DÉCOUVERTE"
                price="Gratuit"
                period="30j"
                description="Évaluation + 10 vues - Cible : 10 000€ - CA : 0"
                features={[
                  "Évaluation incluse",
                  "10 vues d'annonce",
                  "Interface spécialisée BTP",
                  "Expert en soutien métier"
                ]}
                buttonText="Commencer gratuitement"
              />

              <PricingCard
                title="ESSENTIEL"
                price="290€"
                period="/3 mois"
                description="Annonce simple - Cible : 5 000€ - CA : 5,9M"
                features={[
                  "Annonce simple optimisée",
                  "Contacts qualifiés BTP",
                  "Interface professionnelle",
                  "Expert en soutien",
                  "Réseau artisans entrepreneurs"
                ]}
                buttonText="Choisir Essentiel"
                isPopular={true}
              />

              <PricingCard
                title="PRIME"
                price="490€"
                period="/3 mois"
                description="Mise en avant + stats - Cible : 2 000€ - CA : 3,9M"
                features={[
                  "Mise en avant prioritaire",
                  "Statistiques détaillées",
                  "Valorisation BTP incluse",
                  "Accompagnement expert dédié",
                  "Vendez 2x plus vite"
                ]}
                buttonText="Choisir Premium"
              />

              <PricingCard
                title="EXCLUSIF"
                price="990€"
                period="/3 mois"
                description="Top position + agent - Cible : 500€ - CA : 2M"
                features={[
                  "Position top garantie",
                  "Agent dédié personnel",
                  "Mémorandum professionnel",
                  "Garantie mise en relation",
                  "Conciergerie complète"
                ]}
                buttonText="Choisir Exclusif"
              />
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pourquoi Choisir CessionBTP</h2>
              <p className="text-xl text-muted-foreground">
                La plateforme la plus complète pour vendre ou acheter une entreprise BTP
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-3">Valorisation Experte</h3>
                <p className="text-muted-foreground">
                  Évaluation précise par des experts BTP. Méthode éprouvée sur 500+ transactions.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-bold mb-3">Matching IA 95% compatible</h3>
                <p className="text-muted-foreground">
                  Notre algorithme connecte vendeurs et acheteurs avec 95% de compatibilité.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
                <div className="text-6xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-3">100% Confidentiel</h3>
                <p className="text-muted-foreground">
                  Anonymat garanti. Data room sécurisée. NDA systématique.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
                <div className="text-6xl mb-4">💎</div>
                <h3 className="text-xl font-bold mb-3">Success Fee 2% uniquement</h3>
                <p className="text-muted-foreground">
                  Vous ne payez qu'en cas de succès. Nos intérêts sont alignés.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Fee Section */}
        <section className="py-20 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-4">Success Fee Transparente</h2>
              <div className="text-8xl font-bold text-success mb-4">2%</div>
              <p className="text-2xl text-muted-foreground mb-8">
                Seulement en cas de vente réussie
              </p>
              
              <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto mb-12">
                <p className="text-xl">
                  <strong>Exemple concret :</strong> Vente 500k€ = 10k€ de commission
                  <br />
                  <span className="text-muted-foreground">(vs 25k€ à 40k€ chez les concurrents)</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-4xl mb-2">🔒</div>
                <h3 className="font-bold mb-2">Confidentialité</h3>
                <p className="text-muted-foreground">100% sécurisé et anonyme</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="font-bold mb-2">Rapidité</h3>
                <p className="text-muted-foreground">2x plus rapide que la concurrence</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="font-bold mb-2">Résultats</h3>
                <p className="text-muted-foreground">95% de taux de satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-3xl font-bold mb-4">Comment ça Marche</h2>
              <p className="text-xl text-muted-foreground">
                Un processus simple et efficace en 5 étapes
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <ProcessStep
                number={1}
                badge="48h"
                title="Valorisation Gratuite"
                description="Obtenez une estimation précise de votre entreprise en 48h par nos experts BTP."
              />
              <ProcessStep
                number={2}
                badge="5 jours"
                title="Préparation du Dossier"
                description="Nous optimisons votre dossier pour maximiser la valeur et attirer les meilleurs repreneurs."
              />
              <ProcessStep
                number={3}
                badge="1 semaine"
                title="Mise en Relation"
                description="Notre IA identifie les repreneurs parfaits parmi notre base de 2000+ acheteurs qualifiés."
              />
              <ProcessStep
                number={4}
                badge="2-4 semaines"
                title="Négociation"
                description="Nos experts négocient pour vous les meilleures conditions de vente."
              />
              <ProcessStep
                number={5}
                badge="1 semaine"
                title="Closing Sécurisé"
                description="Finalisation juridique et transfert en toute sécurité avec nos avocats spécialisés."
                isLast={true}
              />
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
              <div>
                <div className="text-6xl font-bold mb-2">{stats.repreneurs}+</div>
                <p className="text-xl text-white/90">Repreneurs qualifiés actifs</p>
              </div>
              <div>
                <div className="text-6xl font-bold mb-2">{stats.experience}</div>
                <p className="text-xl text-white/90">Ans d'Expertise BTP</p>
              </div>
              <div>
                <div className="text-6xl font-bold mb-2">{stats.specialisation}%</div>
                <p className="text-xl text-white/90">Spécialisé BTP & ENR</p>
              </div>
              <div>
                <div className="text-6xl font-bold mb-2">48H</div>
                <p className="text-xl text-white/90">Délai de Valorisation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ils Nous Font Confiance</h2>
              <p className="text-xl text-muted-foreground">
                Partenaires et experts qui soutiennent notre projet
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-primary text-white p-12 rounded-2xl shadow-xl">
                <p className="text-2xl italic mb-8">
                  "Enfin une solution dédiée au BTP ! La valorisation par IA et le matching intelligent 
                  vont permettre aux entrepreneurs de maximiser la valeur de leur entreprise."
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center text-2xl font-bold">
                    JPL
                  </div>
                  <div>
                    <p className="font-bold text-lg">Jean-Pierre Lambert</p>
                    <p className="text-white/90">Ancien dirigeant BTP • Expert en transmission</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Prêt à vendre votre entreprise BTP ?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Estimation gratuite • Accompagnement expert • Résultats garantis
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover:shadow-2xl text-xl py-6 px-12">
              💰 COMMENCER MON ESTIMATION
            </Button>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Restez Informé des Opportunités BTP</h2>
              <p className="text-xl text-slate-300 mb-8">
                Recevez chaque semaine les meilleures offres de cession et nos analyses sectorielles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <Input
                  type="email"
                  placeholder="Votre email professionnel"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                />
                <Button className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap">
                  S'abonner
                </Button>
              </div>
              <p className="text-sm text-slate-400 mt-4">
                ✅ Pas de spam - Désabonnement facile
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

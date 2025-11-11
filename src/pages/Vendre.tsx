import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Check, DollarSign, Users, Lock, Scale, TrendingUp, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";
import ProcessStep from "@/components/ProcessStep";
import { DepartementsSelect } from "@/data/departements";
import { SearchableSelect } from "@/components/SearchableSelect";

const Vendre = () => {
  const [secteur, setSecteur] = useState("");
  const [departement, setDepartement] = useState("");
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero with Listing Form */}
        <section className="bg-gradient-to-br from-secondary to-orange-600 text-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
                Vendez Votre Entreprise BTP au Meilleur Prix
              </h1>
              <p className="text-xl mb-12 text-center text-white/90">
                Créez votre annonce • Accompagnement expert • Commission uniquement si vente réussie
              </p>

              {/* Listing Creation Form */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-foreground mb-6">Créez Votre Annonce</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">
                        Chiffre d'affaires annuel (€)
                      </label>
                      <Input 
                        type="number" 
                        placeholder="Ex: 500000" 
                        className="text-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">
                        Prix de vente souhaité (€)
                      </label>
                      <Input 
                        type="number" 
                        placeholder="Ex: 750000" 
                        className="text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">
                        Secteur d'activité
                      </label>
                      <SearchableSelect 
                        value={secteur}
                        onValueChange={setSecteur}
                        placeholder="Rechercher un secteur..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">
                        Département
                      </label>
                      <Select value={departement} onValueChange={setDepartement}>
                        <SelectTrigger className="text-foreground">
                          <SelectValue placeholder="Choisir département" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[400px] overflow-y-auto">
                          <DepartementsSelect />
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Titre de l'annonce
                    </label>
                    <Input 
                      type="text" 
                      placeholder="Ex: Entreprise de Plomberie Prospère en Île-de-France" 
                      className="text-foreground"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Description de l'entreprise
                    </label>
                    <textarea 
                      className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                      placeholder="Décrivez votre entreprise : année de création, effectif, points forts, clientèle, équipements, certifications..."
                    />
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90 text-white text-lg py-6"
                    >
                      📝 Publier Mon Annonce
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white text-lg py-6"
                      onClick={() => window.location.href = '/vendre?estimation=true'}
                    >
                      💰 Obtenir une estimation
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    ✅ Gratuit pendant 30 jours • Sans engagement • 100% confidentiel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Avantages Vendeur */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pourquoi Nous Choisir Pour Vendre ?</h2>
              <p className="text-xl text-muted-foreground">
                Des experts BTP à votre service pour maximiser la valeur de votre entreprise
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <DollarSign className="h-12 w-12 text-success mb-4" />
                <h3 className="text-xl font-bold mb-3">Valorisation par Experts BTP</h3>
                <p className="text-muted-foreground">
                  Évaluation précise par des professionnels certifiés du secteur BTP avec 15 ans d'expérience
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">2000+ Repreneurs Qualifiés</h3>
                <p className="text-muted-foreground">
                  Accédez à notre réseau exclusif d'acheteurs vérifiés et actifs dans le BTP
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Lock className="h-12 w-12 text-destructive mb-4" />
                <h3 className="text-xl font-bold mb-3">Confidentialité Absolue</h3>
                <p className="text-muted-foreground">
                  Anonymat garanti, data room sécurisée RGPD, NDA systématique avec tous les repreneurs
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Scale className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-3">Accompagnement Juridique</h3>
                <p className="text-muted-foreground">
                  Avocats spécialisés en droit des affaires et transmission d'entreprises inclus
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <TrendingUp className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-3">Vente 2x Plus Rapide</h3>
                <p className="text-muted-foreground">
                  45 jours en moyenne vs 18-24 mois sur les plateformes généralistes
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Award className="h-12 w-12 text-success mb-4" />
                <h3 className="text-xl font-bold mb-3">Commission 2% Si Succès</h3>
                <p className="text-muted-foreground">
                  Vous ne payez qu'en cas de vente réussie. Nos intérêts sont parfaitement alignés
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Processus Détaillé */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Le Parcours de Vente en 5 Étapes</h2>
              <p className="text-xl text-muted-foreground">
                Un processus éprouvé et transparent pour vendre votre entreprise sereinement
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <ProcessStep
                number={1}
                badge="48h"
                title="Valorisation Gratuite"
                description="Remplissez le formulaire en 2 minutes. Nos experts BTP analysent votre entreprise et vous envoient une estimation détaillée sous 48h avec les leviers d'optimisation."
              />
              <ProcessStep
                number={2}
                badge="5 jours"
                title="Préparation du Dossier"
                description="Nous créons votre mémorandum de vente professionnel, optimisons la présentation de vos atouts, et préparons tous les documents nécessaires pour maximiser l'attractivité."
              />
              <ProcessStep
                number={3}
                badge="1 semaine"
                title="Mise en Relation Ciblée"
                description="Notre algorithme IA identifie les repreneurs parfaits parmi notre base de 2000+ acheteurs qualifiés. Matching intelligent basé sur 20+ critères de compatibilité."
              />
              <ProcessStep
                number={4}
                badge="2-4 semaines"
                title="Négociation Accompagnée"
                description="Nos experts négocient pour vous les meilleures conditions : prix, délais de paiement, garanties. Vous gardez le contrôle final de toutes les décisions."
              />
              <ProcessStep
                number={5}
                badge="1 semaine"
                title="Closing Sécurisé"
                description="Finalisation juridique avec nos avocats spécialisés, transfert des actifs, formation du repreneur. Vous êtes accompagné jusqu'au bout."
                isLast={true}
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ils Ont Vendu Avec Nous</h2>
              <p className="text-xl text-muted-foreground">Témoignages authentiques d'entrepreneurs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-slate-50 p-8 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
                    ML
                  </div>
                  <div>
                    <p className="font-bold">Marc Lefebvre</p>
                    <p className="text-sm text-muted-foreground">Plomberie-Chauffage, Toulouse</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "Vendu en 38 jours à un repreneur parfait. L'accompagnement était exceptionnel du début à la fin. 
                  Le meilleur investissement de ma vie."
                </p>
                <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
              </div>

              <div className="bg-slate-50 p-8 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-white text-xl font-bold">
                    SD
                  </div>
                  <div>
                    <p className="font-bold">Sophie Durand</p>
                    <p className="text-sm text-muted-foreground">Électricité, Lyon</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "Valorisation au-dessus de mes espérances. Les experts ont su mettre en avant tous les atouts de mon 
                  entreprise. Processus fluide et transparent."
                </p>
                <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
              </div>

              <div className="bg-slate-50 p-8 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center text-white text-xl font-bold">
                    PM
                  </div>
                  <div>
                    <p className="font-bold">Pierre Martin</p>
                    <p className="text-sm text-muted-foreground">Maçonnerie, Bordeaux</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "J'hésitais à vendre. L'équipe m'a accompagné dans la réflexion, sans pression. Une fois décidé, 
                  tout s'est fait en 6 semaines. Incroyable efficacité."
                </p>
                <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-primary to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Prêt à Valoriser Votre Entreprise ?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Estimation gratuite • Accompagnement expert • Commission uniquement si vente réussie
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-xl py-6 px-12">
              Obtenir mon estimation gratuite
            </Button>
            <p className="mt-6 text-white/80">
              ⚡ Réponse en 48h • 🔒 100% confidentiel • ✅ Sans engagement
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Vendre;

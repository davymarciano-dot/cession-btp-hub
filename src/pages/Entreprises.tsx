import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EntrepriseCard from "@/components/EntrepriseCard";

const Entreprises = () => {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-12 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Entreprises BTP Disponibles</h1>
            <p className="text-xl text-muted-foreground">18 opportunités à saisir</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Filtres</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    ✕
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Secteur</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Tous les secteurs" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] overflow-y-auto">
                        <SelectItem value="all">Tous les secteurs</SelectItem>
                        <SelectItem value="plomberie">Plomberie</SelectItem>
                        <SelectItem value="electricite">Électricité</SelectItem>
                        <SelectItem value="maconnerie">Maçonnerie</SelectItem>
                        <SelectItem value="chauffage">Chauffage & Climatisation</SelectItem>
                        <SelectItem value="couverture">Couverture-Zinguerie</SelectItem>
                        <SelectItem value="peinture">Peinture & Revêtements</SelectItem>
                        <SelectItem value="menuiserie-bois">Menuiserie Bois</SelectItem>
                        <SelectItem value="menuiserie-alu">Menuiserie Aluminium/PVC</SelectItem>
                        <SelectItem value="isolation">Isolation Thermique</SelectItem>
                        <SelectItem value="charpente">Charpente</SelectItem>
                        <SelectItem value="carrelage">Carrelage</SelectItem>
                        <SelectItem value="platerie">Plâtrerie & Cloisons sèches</SelectItem>
                        <SelectItem value="facade">Façadier</SelectItem>
                        <SelectItem value="etancheite">Étanchéité</SelectItem>
                        <SelectItem value="terrassement">Terrassement & VRD</SelectItem>
                        <SelectItem value="genie-civil">Génie Civil</SelectItem>
                        <SelectItem value="demolition">Démolition</SelectItem>
                        <SelectItem value="echafaudage">Échafaudage</SelectItem>
                        <SelectItem value="nettoyage">Nettoyage de Chantier</SelectItem>
                        <SelectItem value="metallerie">Métallerie & Serrurerie</SelectItem>
                        <SelectItem value="parquets">Parquets</SelectItem>
                        <SelectItem value="paysagisme">Espaces Verts & Paysagisme</SelectItem>
                        <SelectItem value="assainissement">Assainissement</SelectItem>
                        <SelectItem value="climatisation">Climatisation</SelectItem>
                        <SelectItem value="pompes-chaleur">Pompes à Chaleur</SelectItem>
                        <SelectItem value="photovoltaique">Panneaux Solaires / Photovoltaïque</SelectItem>
                        <SelectItem value="amenagement">Aménagement Intérieur</SelectItem>
                        <SelectItem value="renovation-energetique">Rénovation Énergétique</SelectItem>
                        <SelectItem value="ascenseurs">Ascenseurs & Monte-charges</SelectItem>
                        <SelectItem value="egb">Entreprise Générale du Bâtiment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Région</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Toutes les régions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les régions</SelectItem>
                        <SelectItem value="idf">Île-de-France</SelectItem>
                        <SelectItem value="ara">Auvergne-Rhône-Alpes</SelectItem>
                        <SelectItem value="occ">Occitanie</SelectItem>
                        <SelectItem value="paca">PACA</SelectItem>
                        <SelectItem value="na">Nouvelle-Aquitaine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Chiffre d'affaires (€)
                    </label>
                    <Slider 
                      defaultValue={[0, 3000000]} 
                      max={5000000} 
                      step={100000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0€</span>
                      <span>5M€</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Prix maximum (€)
                    </label>
                    <Slider 
                      defaultValue={[2000000]} 
                      max={5000000} 
                      step={100000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0€</span>
                      <span>5M€</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Année de création</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Toutes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes</SelectItem>
                        <SelectItem value="recent">Moins de 5 ans</SelectItem>
                        <SelectItem value="etablie">5-15 ans</SelectItem>
                        <SelectItem value="ancienne">Plus de 15 ans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Certifications</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">RGE</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Qualibat</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">QualiPAC</span>
                      </label>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Appliquer les filtres
                  </Button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filtres
                </Button>

                <Select defaultValue="recent">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Plus récentes</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="ca-desc">CA décroissant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                  description="Entreprise générale tous corps d'état. Marchés publics 60%, privés 40%."
                  price="1 850 000 €"
                  financement={true}
                />

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
                  timeAgo="Il y a 2 jours"
                  title="Entreprise de Plomberie"
                  location="Paris, Île-de-France (75)"
                  creation="2010"
                  ca="1,2M€"
                  effectif="12 salariés"
                  secteur="Plomberie sanitaire"
                  description="Clientèle fidèle, contrats d'entretien récurrents."
                  price="980 000 €"
                  financement={true}
                />

                <EntrepriseCard
                  type="blue"
                  certification="RGE"
                  status="disponible"
                  timeAgo="Il y a 1 semaine"
                  title="Électricité Générale"
                  location="Bordeaux, Nouvelle-Aquitaine (33)"
                  creation="2015"
                  ca="750K€"
                  effectif="5 salariés"
                  secteur="Électricité"
                  description="Spécialisée en rénovation électrique et domotique."
                  price="620 000 €"
                />

                <EntrepriseCard
                  type="blue"
                  certification="QUALIBAT"
                  status="disponible"
                  timeAgo="Il y a 3 jours"
                  title="Maçonnerie Traditionnelle"
                  location="Lille, Hauts-de-France (59)"
                  creation="2008"
                  ca="1,5M€"
                  effectif="18 salariés"
                  secteur="Maçonnerie & Gros Œuvre"
                  description="Marchés publics et privés. Forte notoriété locale."
                  price="1 250 000 €"
                  financement={true}
                />
              </div>

              <div className="mt-12 flex justify-center">
                <Button variant="outline" size="lg">
                  Charger plus d'annonces
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Entreprises;

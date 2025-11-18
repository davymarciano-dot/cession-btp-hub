import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UltraCompleteSchemas } from "@/components/seo/UltraCompleteSchemas";
import { AutoInternalLinks } from "@/components/seo/AutoInternalLinks";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const lexiqueTerms = [
  {
    letter: "A",
    terms: [
      {
        term: "Actif",
        definition: "Ensemble des biens et créances détenus par une entreprise (matériel, stock, créances clients, trésorerie...)"
      },
      {
        term: "Apport personnel",
        definition: "Montant investi par le repreneur dans l'acquisition, généralement entre 20% et 30% du prix de vente"
      },
      {
        term: "Audit d'acquisition",
        definition: "Examen approfondi des aspects financiers, juridiques et opérationnels de l'entreprise avant l'achat"
      }
    ]
  },
  {
    letter: "C",
    terms: [
      {
        term: "CA (Chiffre d'Affaires)",
        definition: "Total des ventes de biens ou services réalisées par l'entreprise sur une période donnée"
      },
      {
        term: "Cession de parts",
        definition: "Transfert des parts sociales d'une entreprise d'un propriétaire à un repreneur"
      },
      {
        term: "Complément vendeur",
        definition: "Crédit accordé par le vendeur au repreneur pour faciliter le financement de l'acquisition"
      },
      {
        term: "Certification RGE",
        definition: "Reconnu Garant de l'Environnement - label qualité pour les entreprises du bâtiment réalisant des travaux d'économie d'énergie"
      }
    ]
  },
  {
    letter: "D",
    terms: [
      {
        term: "Due diligence",
        definition: "Processus d'audit approfondi réalisé avant l'acquisition pour vérifier tous les aspects de l'entreprise"
      },
      {
        term: "Droits d'enregistrement",
        definition: "Taxes payées lors de l'enregistrement officiel de la transaction de cession"
      }
    ]
  },
  {
    letter: "E",
    terms: [
      {
        term: "EBE (Excédent Brut d'Exploitation)",
        definition: "Indicateur de la performance économique de l'entreprise avant charges financières et impôts"
      },
      {
        term: "Earn-out",
        definition: "Complément de prix basé sur les performances futures de l'entreprise après la cession"
      }
    ]
  },
  {
    letter: "F",
    terms: [
      {
        term: "Fonds de commerce",
        definition: "Ensemble des éléments corporels et incorporels permettant l'exploitation de l'activité (clientèle, nom commercial, matériel...)"
      },
      {
        term: "Financement bancaire",
        definition: "Prêt accordé par une banque pour financer l'acquisition d'une entreprise"
      }
    ]
  },
  {
    letter: "L",
    terms: [
      {
        term: "Lettre d'intention",
        definition: "Document exprimant l'intérêt d'un repreneur pour l'acquisition et les conditions envisagées"
      },
      {
        term: "LBO (Leverage Buy-Out)",
        definition: "Montage financier permettant l'acquisition d'une entreprise en utilisant l'effet de levier de l'endettement"
      }
    ]
  },
  {
    letter: "M",
    terms: [
      {
        term: "Multiple de valorisation",
        definition: "Coefficient appliqué au CA ou à l'EBE pour estimer la valeur de l'entreprise"
      },
      {
        term: "Mémorandum",
        definition: "Document de présentation détaillé de l'entreprise à vendre destiné aux repreneurs potentiels"
      }
    ]
  },
  {
    letter: "N",
    terms: [
      {
        term: "NDA (Non-Disclosure Agreement)",
        definition: "Accord de confidentialité signé avant l'accès aux informations sensibles de l'entreprise"
      }
    ]
  },
  {
    letter: "P",
    terms: [
      {
        term: "Passif",
        definition: "Ensemble des dettes et obligations de l'entreprise (dettes fournisseurs, emprunts, charges sociales...)"
      },
      {
        term: "Plan de reprise",
        definition: "Document décrivant la stratégie du repreneur pour l'entreprise après l'acquisition"
      }
    ]
  },
  {
    letter: "Q",
    terms: [
      {
        term: "Qualibat",
        definition: "Certification attestant des compétences et qualifications d'une entreprise du BTP"
      },
      {
        term: "QualiPV",
        definition: "Qualification pour l'installation de systèmes photovoltaïques"
      }
    ]
  },
  {
    letter: "R",
    terms: [
      {
        term: "Résultat net",
        definition: "Bénéfice ou perte de l'entreprise après déduction de toutes les charges et impôts"
      },
      {
        term: "RLS (Row Level Security)",
        definition: "Sécurité au niveau des lignes pour protéger l'accès aux données sensibles"
      }
    ]
  },
  {
    letter: "S",
    terms: [
      {
        term: "SIRET",
        definition: "Système d'Identification du Répertoire des Établissements - numéro unique d'identification de l'entreprise"
      },
      {
        term: "Success fee",
        definition: "Commission versée à l'intermédiaire uniquement en cas de réussite de la transaction"
      }
    ]
  },
  {
    letter: "T",
    terms: [
      {
        term: "Transmission",
        definition: "Processus de cession d'une entreprise d'un cédant à un repreneur"
      },
      {
        term: "TUP (Transmission Universelle de Patrimoine)",
        definition: "Opération juridique de fusion-absorption d'une société"
      }
    ]
  },
  {
    letter: "V",
    terms: [
      {
        term: "Valorisation",
        definition: "Estimation de la valeur d'une entreprise basée sur différents critères financiers et opérationnels"
      },
      {
        term: "Vendor due diligence",
        definition: "Audit réalisé à l'initiative du vendeur pour faciliter et accélérer la transaction"
      }
    ]
  }
];

export default function LexiqueBTP() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLexique = lexiqueTerms.map(section => ({
    ...section,
    terms: section.terms.filter(item => 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.terms.length > 0);

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
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Lexique BTP
                </h1>
                <p className="text-xl text-primary-foreground/90">
                  Tous les termes essentiels pour comprendre la transmission d'entreprise dans le BTP
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher un terme..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Lexique Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {filteredLexique.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">
                      Aucun terme trouvé pour "{searchTerm}"
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-8">
                  {filteredLexique.map((section) => (
                    <div key={section.letter}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                          {section.letter}
                        </div>
                        <div className="flex-1 h-px bg-border"></div>
                      </div>
                      
                      <div className="space-y-4">
                        {section.terms.map((item, idx) => (
                          <Card key={idx}>
                            <CardContent className="p-6">
                              <h3 className="text-xl font-bold mb-2 text-primary">
                                {item.term}
                              </h3>
                              <p className="text-muted-foreground">
                                {item.definition}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Une question sur un terme ?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Notre équipe d'experts est là pour vous accompagner et répondre à toutes vos questions
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-background text-primary hover:bg-background/90">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* SEO Optimization */}
      <UltraCompleteSchemas page="home" />
      <AutoInternalLinks currentPage="/lexique-btp" maxLinks={6} />

      <Footer />
    </>
  );
}

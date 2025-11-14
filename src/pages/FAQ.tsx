import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Phone, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const allFaqCategories = [
    {
      title: "Questions Générales",
      questions: [
        {
          q: "Qu'est-ce que CessionBTP ?",
          a: "CessionBTP est la plateforme leader française spécialisée dans la cession et reprise d'entreprises du secteur BTP et ENR. Nous utilisons un système de matching IA pour connecter vendeurs et acheteurs qualifiés en 45 jours maximum."
        },
        {
          q: "Combien coûte votre service ?",
          a: "Notre Success Fee est de seulement 2% du prix de vente, contre 5% ou plus ailleurs. L'estimation et l'inscription sont 100% gratuites. Vous ne payez qu'en cas de vente réussie."
        },
        {
          q: "Combien de temps faut-il pour vendre mon entreprise ?",
          a: "Le délai moyen de vente est de 45 jours. Cela dépend de plusieurs facteurs : secteur d'activité, localisation, prix demandé, état de l'entreprise. Notre système de matching IA accélère considérablement le processus."
        },
        {
          q: "Comment garantissez-vous la confidentialité ?",
          a: "Nous proposons plusieurs niveaux d'anonymat : annonce anonyme, NDA obligatoire avant révélation d'informations sensibles, communications cryptées, accès restreint aux documents financiers."
        }
      ]
    },
    {
      title: "Pour les Vendeurs",
      questions: [
        {
          q: "Comment estimer la valeur de mon entreprise BTP ?",
          a: "Nous utilisons plusieurs méthodes de valorisation : multiple de l'EBE (3-5x selon secteur), valorisation patrimoniale (actifs + fonds de commerce), méthode des flux de trésorerie actualisés. Notre outil d'estimation gratuit vous donne une première évaluation en 48h."
        },
        {
          q: "Quels documents dois-je préparer ?",
          a: "Documents essentiels : 3 derniers bilans comptables, Kbis, liste des salariés, liste du matériel, bail commercial, attestations d'assurance, certifications et qualifications. Notre équipe vous accompagne dans la préparation du dossier."
        },
        {
          q: "Puis-je continuer à exploiter mon entreprise pendant la vente ?",
          a: "Oui, absolument. La discrétion totale est garantie. Vous continuez votre activité normalement. Les visites et rendez-vous sont organisés en toute confidentialité selon vos disponibilités."
        },
        {
          q: "Que se passe-t-il après avoir trouvé un acheteur ?",
          a: "1) Signature d'une lettre d'intention, 2) Due diligence (audit de l'entreprise), 3) Négociation finale du prix, 4) Signature de la cession chez le notaire, 5) Transmission progressive (accompagnement vendeur si souhaité)."
        },
        {
          q: "Comment préparer mon entreprise à la vente ?",
          a: "Actions recommandées : mettre à jour tous vos documents administratifs, clarifier votre comptabilité, régler les contentieux en cours, valoriser vos contrats clients récurrents, améliorer votre présence digitale."
        }
      ]
    },
    {
      title: "Pour les Acheteurs",
      questions: [
        {
          q: "Quel apport faut-il pour reprendre une entreprise BTP ?",
          a: "Généralement 30-40% du prix de vente. Les banques financent 60-70% pour une reprise d'entreprise rentable. Certains dispositifs (NACRE, prêt d'honneur) peuvent réduire l'apport personnel nécessaire."
        },
        {
          q: "Ai-je besoin d'une qualification spécifique ?",
          a: "Cela dépend du secteur : électricien, plombier, couvreur = qualification obligatoire (sauf si vous embauchez un salarié qualifié). Maçonnerie générale, terrassement = pas toujours obligatoire mais fortement recommandé."
        },
        {
          q: "Comment vérifier la santé financière d'une entreprise ?",
          a: "Points à analyser : évolution du CA sur 3 ans, marge d'EBE (>10% = bien), niveau d'endettement (<1 an de CA), âge des créances clients, situation URSSAF/TVA. Nous recommandons un audit par un expert-comptable."
        },
        {
          q: "Puis-je bénéficier d'aides pour la reprise ?",
          a: "Oui : ACRE (exonération charges sociales 1ère année), prêt d'honneur sans intérêt (jusqu'à 90k€), garanties bancaires BPI France, dispositifs régionaux. Notre équipe vous oriente vers les aides adaptées."
        },
        {
          q: "Que faire si je n'ai pas d'expérience en gestion d'entreprise ?",
          a: "Accompagnement proposé : formation reprise d'entreprise (CCI, CMA), accompagnement du vendeur 3-6 mois post-cession, coaching gestion/commercial, expertise-comptable dès le début."
        }
      ]
    },
    {
      title: "Aspects Juridiques & Fiscaux",
      questions: [
        {
          q: "Quelle est la différence entre cession de fonds et cession de titres ?",
          a: "Cession de fonds : vente des actifs uniquement, pas de reprise des dettes, droits d'enregistrement élevés (3%). Cession de titres : vente des parts sociales, reprise de tout (actif + passif), droits réduits (0,1%), mais attention aux dettes cachées."
        },
        {
          q: "Quelles sont les taxes à prévoir ?",
          a: "Vendeur : plus-value professionnelle (exonération possible si CA<250k€ et >5 ans d'activité). Acheteur : droits d'enregistrement 3% (fonds de commerce) ou 0,1% (titres), TVA sur stock."
        },
        {
          q: "Comment transférer les contrats et agréments ?",
          a: "Contrats clients/fournisseurs : clause de changement de contrôle à vérifier. Qualibat/Qualipac : transmission possible si repreneur qualifié. RGE : nouveau dossier souvent nécessaire. Nous vous assistons dans ces démarches."
        },
        {
          q: "Que deviennent les salariés lors de la reprise ?",
          a: "Article L1224-1 : transfert automatique des contrats de travail. Le repreneur reprend tous les salariés avec leur ancienneté, salaire, avantages. Impossible de les licencier immédiatement sauf motif économique."
        }
      ]
    },
    {
      title: "Secteurs Spécifiques BTP",
      questions: [
        {
          q: "Quelles sont les spécificités de la cession en plomberie/chauffage ?",
          a: "Points clés : certification RGE très valorisée, contrats d'entretien chaudières = valeur récurrente, parc client fidèle important, matériel spécialisé coûteux. Valorisation moyenne : 0,8-1,2x CA."
        },
        {
          q: "Comment valoriser une entreprise d'électricité ?",
          a: "Facteurs de valeur : habilitations électriques du personnel, part de marchés publics vs privés, spécialisation (domotique, ENR), certifications Qualifelec. Valorisation moyenne : 0,6-1x CA selon rentabilité."
        },
        {
          q: "Particularités des entreprises de maçonnerie générale ?",
          a: "Attention à : saisonnalité de l'activité, importance du carnet de commandes, qualité du matériel (mini-pelle, bétonnière, échafaudages), réputation locale. Valorisation moyenne : 0,5-0,8x CA."
        },
        {
          q: "Reprise d'une entreprise de couverture/charpente : points de vigilance ?",
          a: "Vérifier : garanties décennales en cours, historique sinistres, matériel de sécurité (harnais, échafaudages), qualifications Qualibat, carnets de commandes signés. Secteur technique = valorisation plus élevée."
        }
      ]
    }
  ];

  // Filter FAQ categories based on search term
  const faqCategories = searchTerm.trim() === "" 
    ? allFaqCategories 
    : allFaqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(item => 
          item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.a.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Helmet>
        <title>FAQ - Questions fréquentes | CessionBTP</title>
        <meta name="description" content="Toutes les réponses à vos questions sur la cession et reprise d'entreprises BTP. Valorisation, financement, juridique, fiscalité." />
      </Helmet>
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Questions Fréquentes
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Tout ce que vous devez savoir sur la cession d'entreprises BTP
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="Rechercher une question (ex: valorisation, délai, documents...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg w-full"
              />
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-2">
                {faqCategories.reduce((acc, cat) => acc + cat.questions.length, 0)} résultat(s) trouvé(s)
              </p>
            )}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {faqCategories.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-600 mb-4">Aucune question ne correspond à votre recherche.</p>
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Afficher toutes les questions
              </Button>
            </Card>
          ) : (
            faqCategories.map((category, catIndex) => (
            <Card key={catIndex} className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-blue-600">
                {category.title}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((item, index) => (
                  <AccordionItem key={index} value={`item-${catIndex}-${index}`}>
                    <AccordionTrigger className="text-left font-semibold text-lg">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          ))
          )}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Vous ne trouvez pas la réponse à votre question ?
            </h3>
            <p className="text-center mb-6 text-blue-100">
              Notre équipe d'experts est là pour vous accompagner
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => navigate('/estimer')}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Demander une estimation gratuite
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
              >
                <Phone className="mr-2 h-5 w-5" />
                Nous contacter
              </Button>
            </div>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate('/vendre')}
          >
            <h4 className="font-bold text-lg mb-2">🏗️ Je vends</h4>
            <p className="text-gray-600 text-sm">
              Déposez votre annonce gratuitement
            </p>
          </Card>
          <Card 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate('/acheter')}
          >
            <h4 className="font-bold text-lg mb-2">🔍 Je cherche</h4>
            <p className="text-gray-600 text-sm">
              Parcourez les entreprises disponibles
            </p>
          </Card>
          <Card 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate('/estimer')}
          >
            <h4 className="font-bold text-lg mb-2">💰 J'estime</h4>
            <p className="text-gray-600 text-sm">
              Valorisez votre entreprise en 48h
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;

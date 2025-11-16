import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calculator, ExternalLink, Briefcase, Building2, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const Roadmap = () => {
  const [downloadingGuide, setDownloadingGuide] = useState<string | null>(null);

  const guides = [
    {
      id: "guide-vente",
      title: "Guide : Comment vendre son entreprise BTP",
      description: "Le guide complet pour préparer et réussir la vente de votre entreprise du BTP. Étapes, conseils, pièges à éviter.",
      icon: <FileText className="h-8 w-8 text-orange-500" />,
      size: "2.5 MB",
      pages: "42 pages"
    },
    {
      id: "checklist-vendeur",
      title: "Checklist vendeur BTP",
      description: "Liste complète des documents à préparer et des étapes à suivre pour une cession réussie.",
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      size: "850 KB",
      pages: "8 pages"
    },
    {
      id: "calculateur-valorisation",
      title: "Calculateur valorisation Excel",
      description: "Fichier Excel pour estimer la valeur de votre entreprise BTP selon plusieurs méthodes de valorisation.",
      icon: <Calculator className="h-8 w-8 text-green-500" />,
      size: "1.2 MB",
      pages: "Feuilles multiples"
    }
  ];

  const outilsGratuits = [
    {
      title: "Estimateur en ligne",
      description: "Obtenez une estimation gratuite de votre entreprise BTP en 2 minutes avec notre IA",
      icon: <Calculator className="h-8 w-8 text-primary" />,
      link: "/estimer",
      type: "interne"
    },
    {
      title: "Simulateur fiscalité cession",
      description: "Calculez l'impôt sur la plus-value et optimisez la fiscalité de votre cession",
      icon: <Calculator className="h-8 w-8 text-secondary" />,
      link: "#",
      type: "externe",
      comingSoon: true
    },
    {
      title: "Modèle d'annonce de vente",
      description: "Template professionnel pour rédiger une annonce attractive et complète",
      icon: <FileText className="h-8 w-8 text-orange-500" />,
      link: "#",
      type: "externe",
      comingSoon: true
    }
  ];

  const partenaires = [
    {
      categorie: "Avocats spécialisés",
      icon: <Briefcase className="h-10 w-10 text-blue-600" />,
      description: "Cabinets d'avocats experts en droit des affaires et transmission d'entreprise BTP",
      contacts: [
        { nom: "Cabinet Legrand & Associés", ville: "Paris", specialite: "Cession BTP", tel: "01 23 45 67 89" },
        { nom: "SCP Martin Avocat", ville: "Lyon", specialite: "Droit des sociétés", tel: "04 12 34 56 78" },
        { nom: "Maître Dubois", ville: "Marseille", specialite: "Transmission entreprise", tel: "04 91 23 45 67" }
      ]
    },
    {
      categorie: "Experts-comptables BTP",
      icon: <Calculator className="h-10 w-10 text-green-600" />,
      description: "Experts-comptables spécialisés dans le secteur du BTP et la valorisation d'entreprise",
      contacts: [
        { nom: "EC Bâtiment Conseil", ville: "Paris", specialite: "Valorisation BTP", tel: "01 34 56 78 90" },
        { nom: "Compta BTP Plus", ville: "Toulouse", specialite: "Audit & transmission", tel: "05 12 34 56 78" },
        { nom: "Cabinet Expert BTP", ville: "Bordeaux", specialite: "Expertise comptable", tel: "05 56 12 34 56" }
      ]
    },
    {
      categorie: "Banques financement reprise",
      icon: <Building2 className="h-10 w-10 text-orange-600" />,
      description: "Banques et organismes financiers spécialisés dans le financement de reprise d'entreprise",
      contacts: [
        { nom: "BNP Paribas - Pôle Transmission", ville: "National", specialite: "Crédit acquisition", tel: "0 800 123 456" },
        { nom: "Crédit Agricole Pro", ville: "National", specialite: "LBO & financement", tel: "0 800 234 567" },
        { nom: "Bpifrance", ville: "National", specialite: "Garantie transmission", tel: "0 969 370 240" }
      ]
    }
  ];

  const handleDownload = (guideId: string) => {
    setDownloadingGuide(guideId);
    setTimeout(() => {
      setDownloadingGuide(null);
      console.log(`Téléchargement de ${guideId}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead 
        page="home"
        customTitle="Ressources gratuites : Guides, Outils & Partenaires BTP | CessionBTP"
        customDescription="Téléchargez nos guides gratuits (vente entreprise BTP, checklist), utilisez nos outils (estimateur, simulateur) et trouvez des partenaires (avocats, experts-comptables, banques)."
      />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-500 to-pink-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ressources Gratuites
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Guides, outils et contacts de partenaires pour réussir votre projet de cession ou reprise d'entreprise BTP
            </p>
          </div>
        </section>

        {/* SECTION 1 : Guides gratuits */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-slate-900">
                📚 Guides Gratuits à Télécharger
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Documents professionnels pour vous accompagner dans votre projet
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {guides.map((guide) => (
                <Card key={guide.id} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="mb-4 flex justify-center">{guide.icon}</div>
                    <CardTitle className="text-center text-xl">{guide.title}</CardTitle>
                    <CardDescription className="text-center">{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>{guide.size}</span>
                      <span>{guide.pages}</span>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleDownload(guide.id)}
                      disabled={downloadingGuide === guide.id}
                    >
                      {downloadingGuide === guide.id ? (
                        <>Téléchargement...</>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Télécharger PDF
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2 : Outils gratuits */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-slate-900">
                🛠️ Outils Gratuits en Ligne
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Calculateurs et simulateurs pour votre projet de transmission
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {outilsGratuits.map((outil, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow relative">
                  {outil.comingSoon && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Bientôt
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-4 flex justify-center">{outil.icon}</div>
                    <CardTitle className="text-center text-xl">{outil.title}</CardTitle>
                    <CardDescription className="text-center">{outil.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {outil.type === "interne" ? (
                      <Link to={outil.link}>
                        <Button className="w-full" variant="default">
                          Utiliser l'outil
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        className="w-full" 
                        variant="outline" 
                        disabled={outil.comingSoon}
                      >
                        {outil.comingSoon ? "Disponible prochainement" : "Accéder"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 : Partenaires */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-slate-900">
                🤝 Nos Partenaires de Confiance
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Professionnels recommandés pour vous accompagner dans votre projet
              </p>
            </div>
            
            <div className="space-y-12 max-w-6xl mx-auto">
              {partenaires.map((categorie, index) => (
                <div key={index}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/10 p-4 rounded-2xl">
                      {categorie.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{categorie.categorie}</h3>
                      <p className="text-slate-600">{categorie.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categorie.contacts.map((contact, idx) => (
                      <Card key={idx} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-lg">{contact.nom}</CardTitle>
                          <CardDescription>{contact.specialite}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Building2 className="h-4 w-4" />
                            {contact.ville}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Phone className="h-4 w-4" />
                            {contact.tel}
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-2">
                            <Mail className="h-4 w-4 mr-2" />
                            Contacter
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-br from-orange-500 to-pink-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Besoin d'un accompagnement personnalisé ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Notre équipe d'experts est là pour vous conseiller à chaque étape de votre projet
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="font-semibold">
                  Nous contacter
                </Button>
              </Link>
              <Link to="/estimer">
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-orange-500">
                  Estimer mon entreprise
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Roadmap;

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Phone, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const teamMembers = [
  {
    name: "Pierre Durand",
    role: "Fondateur & CEO",
    description: "Expert en transmission d'entreprises BTP avec 15 ans d'expérience dans le secteur.",
    email: "pierre.durand@cessionbtp.fr",
    phone: "+33 1 23 45 67 89",
    linkedin: "#",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
  },
  {
    name: "Marie Lambert",
    role: "Directrice des opérations",
    description: "Spécialiste en valorisation d'entreprises et négociation commerciale.",
    email: "marie.lambert@cessionbtp.fr",
    phone: "+33 1 23 45 67 90",
    linkedin: "#",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
  },
  {
    name: "Thomas Rousseau",
    role: "Responsable matching IA",
    description: "Ingénieur data spécialisé dans l'intelligence artificielle et le matching acheteurs-vendeurs.",
    email: "thomas.rousseau@cessionbtp.fr",
    phone: "+33 1 23 45 67 91",
    linkedin: "#",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"
  },
  {
    name: "Sophie Martin",
    role: "Responsable juridique",
    description: "Avocate spécialisée en droit des sociétés et transmission d'entreprises.",
    email: "sophie.martin@cessionbtp.fr",
    phone: "+33 1 23 45 67 92",
    linkedin: "#",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
  },
  {
    name: "Julien Moreau",
    role: "Conseiller vendeurs",
    description: "Accompagnement personnalisé des cédants tout au long du processus de vente.",
    email: "julien.moreau@cessionbtp.fr",
    phone: "+33 1 23 45 67 93",
    linkedin: "#",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  },
  {
    name: "Laura Dubois",
    role: "Conseillère acheteurs",
    description: "Aide les repreneurs à trouver l'entreprise BTP idéale selon leurs critères.",
    email: "laura.dubois@cessionbtp.fr",
    phone: "+33 1 23 45 67 94",
    linkedin: "#",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  }
];

export default function NotreEquipe() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
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
                  Notre équipe
                </h1>
                <p className="text-xl text-primary-foreground/90">
                  Des experts passionnés à votre service pour réussir votre transmission d'entreprise BTP
                </p>
              </div>
            </div>
          </div>
        </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Notre mission</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Chez CessionBTP, nous sommes une équipe de professionnels dévoués, spécialisés dans la transmission d'entreprises du secteur BTP. Notre objectif est de faciliter chaque étape du processus de cession, en offrant un accompagnement personnalisé et des outils innovants comme notre matching IA.
            </p>
            <p className="text-lg text-muted-foreground">
              Nous croyons en la transparence, l'efficacité et l'excellence pour garantir des transactions réussies et rapides.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Rencontrez l'équipe</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {member.description}
                  </p>
                  
                  <div className="flex flex-col gap-2 text-sm">
                    <a 
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{member.email}</span>
                    </a>
                    <a 
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      <span>{member.phone}</span>
                    </a>
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Besoin d'aide pour votre projet ?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Notre équipe est à votre écoute pour vous accompagner dans votre transmission d'entreprise BTP
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button 
                  size="lg"
                  className="bg-background text-primary hover:bg-background/90"
                >
                  Nous contacter
                </Button>
              </Link>
              <Link to="/vendre">
                <Button 
                  size="lg"
                  variant="secondary"
                >
                  Vendre mon entreprise
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

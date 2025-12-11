import { useState } from "react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation d'envoi
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <SEO
        title="Contact | CessionBTP - Nous Contacter"
        description="Une question sur la cession d'entreprise BTP ? Contactez notre équipe d'experts. Réponse sous 24h garantie."
        keywords="contact CessionBTP, aide cession BTP, support transmission entreprise"
        url="https://cessionbtp.fr/contact"
      />
      <Header />

      <main className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Formulaire de contact */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean.dupont@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Sujet *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Vente de mon entreprise"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre projet ou votre question..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2">
                    <Send className="h-5 w-5" />
                    Envoyer le message
                  </Button>
                </form>
              </div>

              {/* Informations de contact */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a href="mailto:contact@cessionbtp.fr" className="text-primary hover:underline">
                          contact@cessionbtp.fr
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Réponse sous 24h
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Adresse</h3>
                        <p className="text-muted-foreground">
                          123 Avenue des Champs-Élysées<br />
                          75008 Paris<br />
                          France
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Horaires */}
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="font-bold mb-4">Horaires d'ouverture</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lundi - Vendredi</span>
                      <span className="font-medium">9h00 - 18h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Samedi</span>
                      <span className="font-medium">10h00 - 13h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimanche</span>
                      <span className="font-medium">Fermé</span>
                    </div>
                  </div>
                </div>

                {/* FAQ Link */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <h3 className="font-bold mb-2">Une question rapide ?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Consultez notre FAQ, vous y trouverez peut-être déjà la réponse !
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/faq">Voir la FAQ</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
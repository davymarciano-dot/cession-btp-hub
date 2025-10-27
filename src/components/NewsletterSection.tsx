import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Newsletter subscription:", email);
  };

  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Restez Informé des Opportunités BTP
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Recevez chaque semaine les meilleures offres de cession et nos analyses sectorielles.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Input
              type="email"
              placeholder="Votre email professionnel"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 flex-1 max-w-md"
              required
            />
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-white"
            >
              S'abonner
            </Button>
          </form>
          
          <p className="text-sm text-slate-400 mt-4">
            ✅ Pas de spam - Désabonnement facile
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;

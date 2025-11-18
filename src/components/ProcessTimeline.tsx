import ProcessStep from "./ProcessStep";
import { Rocket } from "lucide-react";

const ProcessTimeline = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-700 rounded-2xl mb-6 shadow-lg animate-float">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-600 to-primary-800 bg-clip-text text-transparent">
            Comment ça marche
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un processus simple et efficace en 5 étapes pour vendre votre entreprise rapidement
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
            isLast
          />
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;

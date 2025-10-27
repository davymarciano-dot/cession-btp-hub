import ProcessStep from "./ProcessStep";

const ProcessTimeline = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça Marche</h2>
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
            isLast
          />
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;

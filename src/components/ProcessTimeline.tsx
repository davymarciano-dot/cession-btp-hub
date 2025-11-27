import ProcessStep from "./ProcessStep";
import { Rocket } from "lucide-react";

const ProcessTimeline = () => {
  const steps = [
    {
      number: 1,
      badge: "Gratuit",
      title: "Estimation en ligne",
      description: "Remplissez notre formulaire intelligent. Notre IA analyse votre entreprise et génère une valorisation détaillée en 48h.",
    },
    {
      number: 2,
      badge: "Rapide",
      title: "Création de l'annonce",
      description: "Personnalisez votre annonce avec photos, détails financiers et atouts clés. Choisissez votre niveau de confidentialité.",
    },
    {
      number: 3,
      badge: "Intelligent",
      title: "Matching IA",
      description: "Notre algorithme de matching identifie automatiquement les repreneurs les plus qualifiés parmi 2000+ acheteurs actifs.",
    },
    {
      number: 4,
      badge: "Sécurisé",
      title: "Mise en relation",
      description: "Recevez des demandes de contact qualifiées. NDA automatique pour protéger vos informations sensibles.",
    },
    {
      number: 5,
      badge: "Accompagné",
      title: "Finalisation",
      description: "Accompagnement personnalisé jusqu'à la signature. Success fee uniquement en cas de vente réussie.",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30"></div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden opacity-60">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Comment ça marche
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un processus simple et transparent pour vendre votre entreprise BTP en toute confiance
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.number}
              number={step.number}
              badge={step.badge}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;

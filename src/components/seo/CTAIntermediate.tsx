import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Bell, Calculator } from 'lucide-react';
import { trackCTA } from '@/utils/analytics';

interface CTAIntermediateProps {
  variant?: 'listings' | 'alert' | 'estimate';
  metier?: string;
  location?: string;
}

export const CTAIntermediate = ({ variant = 'listings', metier, location }: CTAIntermediateProps) => {
  const ctaVariants = {
    listings: {
      icon: Search,
      title: 'Parcourir toutes les annonces',
      description: 'Découvrez nos entreprises disponibles immédiatement',
      buttonText: 'Voir les annonces',
      href: '/acheter',
      color: 'bg-primary'
    },
    alert: {
      icon: Bell,
      title: 'Créer une alerte personnalisée',
      description: 'Recevez les nouvelles opportunités par email',
      buttonText: 'Créer mon alerte',
      href: '/auth',
      color: 'bg-accent'
    },
    estimate: {
      icon: Calculator,
      title: 'Estimer mon budget',
      description: 'Simulez votre capacité de financement',
      buttonText: 'Calculer mon budget',
      href: '/estimer',
      color: 'bg-secondary'
    }
  };

  const cta = ctaVariants[variant];
  const Icon = cta.icon;

  const handleClick = () => {
    trackCTA.click(variant, location || 'intermediate', metier);
  };

  return (
    <div className="my-12 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl p-8 border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className={`${cta.color} text-white p-3 rounded-lg`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">{cta.title}</h3>
            <p className="text-muted-foreground">{cta.description}</p>
          </div>
        </div>
        <Button size="lg" className="shrink-0" asChild onClick={handleClick}>
          <Link to={cta.href}>
            {cta.buttonText} →
          </Link>
        </Button>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface StripeProduct {
  id: string;
  name: string;
  description: string;
  amount: number;
  priceId: string;
}

export const STRIPE_PRODUCTS: Record<string, StripeProduct> = {
  boost_7_days: {
    id: 'boost_7_days',
    name: 'Boost 7 jours',
    description: 'Mettez votre annonce en avant pendant 7 jours',
    amount: 4900,
    priceId: 'price_boost_7days'
  },
  boost_30_days: {
    id: 'boost_30_days',
    name: 'Boost 30 jours',
    description: 'Visibilité maximale pendant 1 mois',
    amount: 14900,
    priceId: 'price_boost_30days'
  },
  premium_monthly: {
    id: 'premium_monthly',
    name: 'Abonnement Premium',
    description: 'Accès illimité à toutes les fonctionnalités',
    amount: 29900,
    priceId: 'price_premium_monthly'
  }
};

interface StripeCheckoutProps {
  productId: keyof typeof STRIPE_PRODUCTS;
  listingId?: string;
  onSuccess?: () => void;
}

const StripeCheckout = ({ productId, listingId, onSuccess }: StripeCheckoutProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const product = STRIPE_PRODUCTS[productId];

  const handlePayment = async () => {
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentification requise",
          description: "Vous devez être connecté pour effectuer un paiement",
          variant: "destructive"
        });
        return;
      }

      // Créer une session de checkout Stripe via edge function
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId: product.priceId,
          productId,
          listingId,
          planType: productId.includes('premium') ? 'premium' : 'boost'
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        onSuccess?.();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du paiement",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-lg p-6 border">
      <h3 className="text-xl font-bold mb-4">{product.name}</h3>
      <p className="text-muted-foreground mb-4">{product.description}</p>

      <div className="text-3xl font-bold mb-6">
        {(product.amount / 100).toFixed(2)}€
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 transition"
      >
        {loading ? 'Chargement...' : 'Payer avec Stripe'}
      </button>

      <div className="mt-4 flex justify-center gap-2 opacity-60">
        <div className="text-xs text-muted-foreground">💳 Visa</div>
        <div className="text-xs text-muted-foreground">💳 Mastercard</div>
        <div className="text-xs text-muted-foreground">💳 Amex</div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        🔒 Paiement 100% sécurisé par Stripe
      </p>
    </div>
  );
};

export default StripeCheckout;

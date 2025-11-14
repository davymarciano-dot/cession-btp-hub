-- Créer tables pour monétisation

-- Table abonnements
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_product_id TEXT,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('basic', 'pro', 'enterprise')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'incomplete')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table affiliés
CREATE TABLE public.affiliates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  affiliate_code TEXT NOT NULL UNIQUE,
  company_name TEXT,
  company_type TEXT CHECK (company_type IN ('accountant', 'lawyer', 'bank', 'cci', 'other')),
  total_referrals INTEGER DEFAULT 0,
  total_earnings NUMERIC DEFAULT 0,
  pending_earnings NUMERIC DEFAULT 0,
  paid_earnings NUMERIC DEFAULT 0,
  stripe_account_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table transactions affiliation
CREATE TABLE public.affiliate_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  sale_amount NUMERIC NOT NULL,
  commission_rate NUMERIC NOT NULL,
  commission_amount NUMERIC NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('sale', 'subscription', 'addon')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid')),
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table marketplace prestataires
CREATE TABLE public.service_providers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('valorisation', 'due_diligence', 'financement', 'juridique', 'comptabilite')),
  description TEXT,
  price NUMERIC NOT NULL,
  price_type TEXT NOT NULL CHECK (price_type IN ('fixed', 'percentage', 'hourly')),
  rating NUMERIC DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  commission_rate NUMERIC NOT NULL DEFAULT 0.20,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table commandes services
CREATE TABLE public.service_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES service_providers(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES annonces(id) ON DELETE SET NULL,
  amount NUMERIC NOT NULL,
  commission_amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'completed', 'canceled')),
  stripe_payment_intent_id TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table produits numériques
CREATE TABLE public.digital_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  product_type TEXT NOT NULL CHECK (product_type IN ('ebook', 'course', 'templates', 'webinar', 'license')),
  stripe_product_id TEXT,
  stripe_price_id TEXT,
  download_url TEXT,
  sales_count INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table achats produits
CREATE TABLE public.product_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES digital_products(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  stripe_payment_intent_id TEXT,
  access_granted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS Policies

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_purchases ENABLE ROW LEVEL SECURITY;

-- Subscriptions
CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can manage subscriptions" ON subscriptions FOR ALL USING (true) WITH CHECK (true);

-- Affiliates
CREATE POLICY "Users can view own affiliate account" ON affiliates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create affiliate account" ON affiliates FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own affiliate account" ON affiliates FOR UPDATE USING (auth.uid() = user_id);

-- Affiliate transactions
CREATE POLICY "Affiliates can view own transactions" ON affiliate_transactions FOR SELECT 
USING (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()));

-- Service providers
CREATE POLICY "Anyone can view active providers" ON service_providers FOR SELECT USING (status = 'active');
CREATE POLICY "Users can create provider profile" ON service_providers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own provider profile" ON service_providers FOR UPDATE USING (auth.uid() = user_id);

-- Service orders
CREATE POLICY "Users can view own orders" ON service_orders FOR SELECT 
USING (auth.uid() = buyer_id OR EXISTS (SELECT 1 FROM service_providers WHERE id = provider_id AND user_id = auth.uid()));
CREATE POLICY "Users can create orders" ON service_orders FOR INSERT WITH CHECK (auth.uid() = buyer_id);
CREATE POLICY "Providers can update orders" ON service_orders FOR UPDATE 
USING (EXISTS (SELECT 1 FROM service_providers WHERE id = provider_id AND user_id = auth.uid()));

-- Digital products
CREATE POLICY "Anyone can view active products" ON digital_products FOR SELECT USING (status = 'active');

-- Product purchases
CREATE POLICY "Users can view own purchases" ON product_purchases FOR SELECT USING (auth.uid() = user_id);

-- Triggers
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliates_updated_at BEFORE UPDATE ON affiliates
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_providers_updated_at BEFORE UPDATE ON service_providers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_orders_updated_at BEFORE UPDATE ON service_orders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX idx_affiliates_user_id ON affiliates(user_id);
CREATE INDEX idx_affiliates_code ON affiliates(affiliate_code);
CREATE INDEX idx_service_providers_category ON service_providers(category);
CREATE INDEX idx_service_orders_buyer_id ON service_orders(buyer_id);
CREATE INDEX idx_service_orders_provider_id ON service_orders(provider_id);
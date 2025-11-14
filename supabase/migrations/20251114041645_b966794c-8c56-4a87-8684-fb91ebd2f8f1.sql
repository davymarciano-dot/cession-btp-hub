-- Table abandoned_carts
CREATE TABLE IF NOT EXISTS public.abandoned_carts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_type TEXT NOT NULL,
  product_id TEXT,
  price NUMERIC NOT NULL,
  step TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  recovered BOOLEAN DEFAULT FALSE NOT NULL,
  recovery_emails_sent INTEGER DEFAULT 0 NOT NULL
);

-- Table referrals
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID NOT NULL,
  referred_email TEXT,
  referred_id UUID,
  referral_code TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  commission_earned NUMERIC DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Table revenue_events
CREATE TABLE IF NOT EXISTS public.revenue_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  product TEXT,
  source TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Table email_campaigns
CREATE TABLE IF NOT EXISTS public.email_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  campaign_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  opened BOOLEAN DEFAULT FALSE NOT NULL,
  clicked BOOLEAN DEFAULT FALSE NOT NULL,
  converted BOOLEAN DEFAULT FALSE NOT NULL,
  metadata JSONB
);

-- Enable RLS
ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;

-- RLS Policies for abandoned_carts
CREATE POLICY "Users can view own abandoned carts"
  ON public.abandoned_carts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can manage abandoned carts"
  ON public.abandoned_carts FOR ALL
  USING (true)
  WITH CHECK (true);

-- RLS Policies for referrals
CREATE POLICY "Users can view own referrals"
  ON public.referrals FOR SELECT
  USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

CREATE POLICY "Users can create referrals"
  ON public.referrals FOR INSERT
  WITH CHECK (auth.uid() = referrer_id);

CREATE POLICY "System can manage referrals"
  ON public.referrals FOR ALL
  USING (true)
  WITH CHECK (true);

-- RLS Policies for revenue_events
CREATE POLICY "Users can view own revenue events"
  ON public.revenue_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can manage revenue events"
  ON public.revenue_events FOR ALL
  USING (true)
  WITH CHECK (true);

-- RLS Policies for email_campaigns
CREATE POLICY "Users can view own campaigns"
  ON public.email_campaigns FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can manage campaigns"
  ON public.email_campaigns FOR ALL
  USING (true)
  WITH CHECK (true);

-- Add indexes for performance
CREATE INDEX idx_abandoned_carts_user_id ON public.abandoned_carts(user_id);
CREATE INDEX idx_abandoned_carts_recovered ON public.abandoned_carts(recovered);
CREATE INDEX idx_abandoned_carts_created_at ON public.abandoned_carts(created_at);

CREATE INDEX idx_referrals_referrer_id ON public.referrals(referrer_id);
CREATE INDEX idx_referrals_code ON public.referrals(referral_code);
CREATE INDEX idx_referrals_status ON public.referrals(status);

CREATE INDEX idx_revenue_events_user_id ON public.revenue_events(user_id);
CREATE INDEX idx_revenue_events_created_at ON public.revenue_events(created_at);
CREATE INDEX idx_revenue_events_type ON public.revenue_events(event_type);

CREATE INDEX idx_email_campaigns_user_id ON public.email_campaigns(user_id);
CREATE INDEX idx_email_campaigns_status ON public.email_campaigns(status);
CREATE INDEX idx_email_campaigns_scheduled ON public.email_campaigns(scheduled_for);
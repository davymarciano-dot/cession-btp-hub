-- Create listing_views table for analytics
CREATE TABLE public.listing_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID NOT NULL REFERENCES public.annonces(id) ON DELETE CASCADE,
  viewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  viewer_ip TEXT,
  duration INTEGER DEFAULT 0,
  referrer TEXT,
  device_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create matches table for intelligent matching
CREATE TABLE public.matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES public.annonces(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  location_match BOOLEAN DEFAULT false,
  budget_match BOOLEAN DEFAULT false,
  sector_match BOOLEAN DEFAULT false,
  size_match BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'viewed', 'contacted', 'rejected', 'accepted')),
  viewed_at TIMESTAMP WITH TIME ZONE,
  contacted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Performance indexes for existing annonces table
CREATE INDEX IF NOT EXISTS idx_annonces_statut ON public.annonces(statut);
CREATE INDEX IF NOT EXISTS idx_annonces_departement ON public.annonces(departement);
CREATE INDEX IF NOT EXISTS idx_annonces_secteur ON public.annonces(secteur_activite);
CREATE INDEX IF NOT EXISTS idx_annonces_prix ON public.annonces(prix_vente);
CREATE INDEX IF NOT EXISTS idx_annonces_user_id ON public.annonces(user_id);
CREATE INDEX IF NOT EXISTS idx_annonces_created_at ON public.annonces(created_at DESC);

-- Performance indexes for listing_views
CREATE INDEX idx_views_listing_id ON public.listing_views(listing_id);
CREATE INDEX idx_views_viewer_id ON public.listing_views(viewer_id);
CREATE INDEX idx_views_created_at ON public.listing_views(created_at DESC);
CREATE INDEX idx_views_listing_date ON public.listing_views(listing_id, created_at DESC);

-- Performance indexes for matches
CREATE INDEX idx_matches_seller_id ON public.matches(seller_id);
CREATE INDEX idx_matches_buyer_id ON public.matches(buyer_id);
CREATE INDEX idx_matches_listing_id ON public.matches(listing_id);
CREATE INDEX idx_matches_score ON public.matches(score DESC);
CREATE INDEX idx_matches_status ON public.matches(status);
CREATE INDEX idx_matches_buyer_status ON public.matches(buyer_id, status);
CREATE INDEX idx_matches_seller_status ON public.matches(seller_id, status);

-- Performance indexes for messages
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_read ON public.messages(read, created_at DESC);

-- Performance indexes for conversations
CREATE INDEX IF NOT EXISTS idx_conversations_acheteur ON public.conversations(acheteur_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_vendeur ON public.conversations(vendeur_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_annonce ON public.conversations(annonce_id);

-- Enable RLS
ALTER TABLE public.listing_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- RLS policies for listing_views
CREATE POLICY "Anyone can create listing views"
  ON public.listing_views
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own viewing history"
  ON public.listing_views
  FOR SELECT
  USING (auth.uid() = viewer_id);

CREATE POLICY "Listing owners can view their listing analytics"
  ON public.listing_views
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.annonces
      WHERE annonces.id = listing_views.listing_id
      AND annonces.user_id = auth.uid()
    )
  );

-- RLS policies for matches
CREATE POLICY "Users can view their own matches as buyer"
  ON public.matches
  FOR SELECT
  USING (auth.uid() = buyer_id);

CREATE POLICY "Users can view their own matches as seller"
  ON public.matches
  FOR SELECT
  USING (auth.uid() = seller_id);

CREATE POLICY "System can create matches"
  ON public.matches
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Buyers can update their match status"
  ON public.matches
  FOR UPDATE
  USING (auth.uid() = buyer_id);

CREATE POLICY "Sellers can update their match status"
  ON public.matches
  FOR UPDATE
  USING (auth.uid() = seller_id);

-- Trigger for matches updated_at
CREATE TRIGGER update_matches_updated_at
  BEFORE UPDATE ON public.matches
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
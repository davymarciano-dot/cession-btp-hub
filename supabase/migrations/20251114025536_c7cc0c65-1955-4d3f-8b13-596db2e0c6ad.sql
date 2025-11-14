-- Table pour stocker les scores de qualité des utilisateurs
CREATE TABLE IF NOT EXISTS public.user_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type TEXT NOT NULL CHECK (user_type IN ('seller', 'buyer')),
  score INTEGER NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  badges JSONB DEFAULT '[]'::jsonb,
  
  -- Critères vendeur
  revenue_score INTEGER,
  profit_score INTEGER,
  certification_score INTEGER,
  experience_score INTEGER,
  urgency_score INTEGER,
  
  -- Critères acheteur
  funding_score INTEGER,
  response_score INTEGER,
  qualification_score INTEGER,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table pour logs des interactions chatbot
CREATE TABLE IF NOT EXISTS public.chatbot_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  intent TEXT,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  action_taken TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table pour suivre les actions automatiques du pipeline
CREATE TABLE IF NOT EXISTS public.automation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_type TEXT NOT NULL CHECK (target_type IN ('seller', 'buyer', 'listing')),
  target_id UUID NOT NULL,
  action_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  scheduled_for TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_user_scores_user_id ON public.user_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_user_scores_type_score ON public.user_scores(user_type, score DESC);
CREATE INDEX IF NOT EXISTS idx_chatbot_logs_session ON public.chatbot_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_logs_intent ON public.chatbot_logs(intent);
CREATE INDEX IF NOT EXISTS idx_automation_logs_target ON public.automation_logs(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_automation_logs_status ON public.automation_logs(status, scheduled_for);

-- RLS policies
ALTER TABLE public.user_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_logs ENABLE ROW LEVEL SECURITY;

-- Utilisateurs peuvent voir leur propre score
CREATE POLICY "Users can view own score"
  ON public.user_scores
  FOR SELECT
  USING (auth.uid() = user_id);

-- Système peut créer/modifier scores
CREATE POLICY "System can manage scores"
  ON public.user_scores
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Logs chatbot visibles uniquement par l'utilisateur
CREATE POLICY "Users can view own chatbot logs"
  ON public.chatbot_logs
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Système peut écrire logs
CREATE POLICY "System can write chatbot logs"
  ON public.chatbot_logs
  FOR INSERT
  WITH CHECK (true);

-- Automation logs visibles par les utilisateurs concernés
CREATE POLICY "Users can view their automation logs"
  ON public.automation_logs
  FOR SELECT
  USING (
    target_type = 'seller' AND target_id = auth.uid()
    OR target_type = 'buyer' AND target_id = auth.uid()
    OR target_type = 'listing' AND target_id IN (
      SELECT id FROM annonces WHERE user_id = auth.uid()
    )
  );

-- Système peut gérer automation logs
CREATE POLICY "System can manage automation logs"
  ON public.automation_logs
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Trigger pour updated_at
CREATE TRIGGER update_user_scores_updated_at
  BEFORE UPDATE ON public.user_scores
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Fonction pour calculer score vendeur
CREATE OR REPLACE FUNCTION calculate_seller_score(
  p_user_id UUID,
  p_revenue NUMERIC,
  p_profit NUMERIC,
  p_has_rge BOOLEAN,
  p_years_in_business INTEGER,
  p_employees INTEGER,
  p_urgency TEXT
) RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_score INTEGER := 0;
BEGIN
  -- Revenue
  IF p_revenue > 500000 THEN v_score := v_score + 20; END IF;
  
  -- Profit
  IF p_profit > 50000 THEN v_score := v_score + 20; END IF;
  
  -- Certifications RGE
  IF p_has_rge THEN v_score := v_score + 30; END IF;
  
  -- Années d'expérience
  IF p_years_in_business > 5 THEN v_score := v_score + 10; END IF;
  
  -- Effectif
  IF p_employees > 5 THEN v_score := v_score + 10; END IF;
  
  -- Urgence (pas urgent = meilleur)
  IF p_urgency = 'low' THEN v_score := v_score + 10; END IF;
  
  RETURN v_score;
END;
$$;

-- Fonction pour calculer score acheteur
CREATE OR REPLACE FUNCTION calculate_buyer_score(
  p_user_id UUID,
  p_funding_type TEXT,
  p_experience INTEGER,
  p_response_time_hours INTEGER
) RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_score INTEGER := 0;
BEGIN
  -- Type de financement
  IF p_funding_type = 'cash' THEN v_score := v_score + 40;
  ELSIF p_funding_type = 'bank_approved' THEN v_score := v_score + 30;
  END IF;
  
  -- Expérience
  IF p_experience > 5 THEN v_score := v_score + 20; END IF;
  
  -- Temps de réponse
  IF p_response_time_hours < 24 THEN v_score := v_score + 10; END IF;
  
  RETURN v_score;
END;
$$;
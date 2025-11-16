-- Fix SECURITY DEFINER functions to add proper user validation

-- 1. Fix track_event function to validate user_id
CREATE OR REPLACE FUNCTION public.track_event(
  p_user_id UUID,
  p_event_type VARCHAR,
  p_event_action VARCHAR,
  p_metadata JSONB DEFAULT '{}'::JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_event_id UUID;
BEGIN
  -- Validate that user can only track events for themselves or if admin
  IF p_user_id != auth.uid() AND NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized: Cannot track events for other users';
  END IF;
  
  INSERT INTO events_tracking (
    user_id, 
    event_type, 
    event_action, 
    metadata
  ) VALUES (
    p_user_id,
    p_event_type,
    p_event_action,
    p_metadata
  ) RETURNING id INTO v_event_id;
  
  RETURN v_event_id;
END;
$$;

-- 2. Fix calculate_seller_score to validate user_id
CREATE OR REPLACE FUNCTION public.calculate_seller_score(
  p_user_id UUID,
  p_revenue NUMERIC,
  p_profit NUMERIC,
  p_has_rge BOOLEAN,
  p_years_in_business INTEGER,
  p_employees INTEGER,
  p_urgency TEXT
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_score INTEGER := 0;
BEGIN
  -- Validate that user can only calculate score for themselves or if admin
  IF p_user_id != auth.uid() AND NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized: Cannot calculate score for other users';
  END IF;
  
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

-- 3. Fix calculate_buyer_score to validate user_id
CREATE OR REPLACE FUNCTION public.calculate_buyer_score(
  p_user_id UUID,
  p_funding_type TEXT,
  p_experience INTEGER,
  p_response_time_hours INTEGER
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_score INTEGER := 0;
BEGIN
  -- Validate that user can only calculate score for themselves or if admin
  IF p_user_id != auth.uid() AND NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized: Cannot calculate score for other users';
  END IF;
  
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
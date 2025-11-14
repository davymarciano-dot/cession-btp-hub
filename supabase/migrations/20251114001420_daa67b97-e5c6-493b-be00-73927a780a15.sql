-- Create buyer_alerts table
CREATE TABLE public.buyer_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  secteurs TEXT[] NOT NULL DEFAULT '{}',
  departements TEXT[] NOT NULL DEFAULT '{}',
  ca_min NUMERIC NOT NULL DEFAULT 0,
  ca_max NUMERIC NOT NULL DEFAULT 10000000,
  effectif_min INTEGER NOT NULL DEFAULT 0,
  effectif_max INTEGER NOT NULL DEFAULT 100,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.buyer_alerts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own alerts"
  ON public.buyer_alerts
  FOR SELECT
  USING (auth.uid() = user_id OR email = auth.email());

CREATE POLICY "Users can create alerts"
  ON public.buyer_alerts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own alerts"
  ON public.buyer_alerts
  FOR UPDATE
  USING (auth.uid() = user_id OR email = auth.email());

CREATE POLICY "Users can delete their own alerts"
  ON public.buyer_alerts
  FOR DELETE
  USING (auth.uid() = user_id OR email = auth.email());

-- Trigger for updated_at
CREATE TRIGGER update_buyer_alerts_updated_at
  BEFORE UPDATE ON public.buyer_alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
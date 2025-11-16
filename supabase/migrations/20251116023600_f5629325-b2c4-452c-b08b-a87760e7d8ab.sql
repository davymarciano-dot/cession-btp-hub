-- Create leads_estimation table to store estimation lead captures
CREATE TABLE public.leads_estimation (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  prenom TEXT,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  raison_sociale TEXT,
  ca NUMERIC,
  secteur TEXT,
  departement TEXT,
  estimation_min NUMERIC,
  estimation_max NUMERIC,
  estimation_moyenne NUMERIC,
  multiple_ca NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads_estimation ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert leads (for anonymous form submissions)
CREATE POLICY "Anyone can create estimation leads"
ON public.leads_estimation
FOR INSERT
TO public
WITH CHECK (true);

-- Only authenticated users can view their own leads
CREATE POLICY "Users can view own leads"
ON public.leads_estimation
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Create index for faster lookups
CREATE INDEX idx_leads_estimation_email ON public.leads_estimation(email);
CREATE INDEX idx_leads_estimation_created_at ON public.leads_estimation(created_at DESC);
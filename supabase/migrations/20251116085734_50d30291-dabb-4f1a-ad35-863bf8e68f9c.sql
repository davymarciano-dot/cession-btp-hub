-- Table pour capturer les leads dès la validation SIRET
CREATE TABLE IF NOT EXISTS public.leads_siret_partiel (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  siret TEXT NOT NULL,
  raison_sociale TEXT,
  adresse TEXT,
  code_postal TEXT,
  ville TEXT,
  departement TEXT,
  secteur_activite TEXT,
  email TEXT NOT NULL,
  telephone TEXT,
  statut TEXT NOT NULL DEFAULT 'nouveau',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads_siret_partiel ENABLE ROW LEVEL SECURITY;

-- Policies pour leads_siret_partiel
CREATE POLICY "Anyone can insert leads"
  ON public.leads_siret_partiel
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all leads"
  ON public.leads_siret_partiel
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads"
  ON public.leads_siret_partiel
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

-- Trigger pour updated_at
CREATE TRIGGER update_leads_siret_partiel_updated_at
  BEFORE UPDATE ON public.leads_siret_partiel
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Index pour recherche rapide
CREATE INDEX IF NOT EXISTS idx_leads_siret_partiel_siret ON public.leads_siret_partiel(siret);
CREATE INDEX IF NOT EXISTS idx_leads_siret_partiel_statut ON public.leads_siret_partiel(statut);
CREATE INDEX IF NOT EXISTS idx_leads_siret_partiel_created_at ON public.leads_siret_partiel(created_at DESC);
-- Ajouter colonnes manquantes à leads_siret_partiel
ALTER TABLE public.leads_siret_partiel
ADD COLUMN IF NOT EXISTS ca_estime NUMERIC;

-- Ajouter colonnes manquantes à demandes_contact
ALTER TABLE public.demandes_contact
ADD COLUMN IF NOT EXISTS budget_estime NUMERIC;

-- Créer index pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_leads_siret_partiel_ca_estime ON public.leads_siret_partiel(ca_estime);
CREATE INDEX IF NOT EXISTS idx_demandes_contact_budget_estime ON public.demandes_contact(budget_estime);
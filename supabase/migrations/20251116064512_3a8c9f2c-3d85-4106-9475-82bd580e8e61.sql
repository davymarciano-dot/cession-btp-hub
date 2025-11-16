-- Add siret column to leads_estimation table
ALTER TABLE public.leads_estimation 
ADD COLUMN IF NOT EXISTS siret text;
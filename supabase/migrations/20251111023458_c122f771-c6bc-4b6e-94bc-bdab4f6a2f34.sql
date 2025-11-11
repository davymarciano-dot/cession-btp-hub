-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create estimations table
CREATE TABLE public.estimations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Informations générales
  secteur TEXT NOT NULL,
  departement TEXT NOT NULL,
  annee_creation INTEGER NOT NULL,
  
  -- Chiffre d'affaires
  ca_n2 NUMERIC,
  ca_n1 NUMERIC NOT NULL,
  ca_n NUMERIC,
  
  -- Résultats
  resultat_n1_type TEXT NOT NULL,
  resultat_n1 NUMERIC NOT NULL,
  resultat_n2_type TEXT NOT NULL,
  resultat_n2 NUMERIC NOT NULL,
  
  -- Personnel
  nombre_employes INTEGER NOT NULL,
  nombre_cdi INTEGER,
  nombre_cdd INTEGER,
  nombre_apprentis INTEGER,
  
  -- Dettes
  a_dettes BOOLEAN NOT NULL,
  dette_urssaf NUMERIC,
  dette_tva NUMERIC,
  dette_loyer NUMERIC,
  dette_fournisseurs NUMERIC,
  dette_autres NUMERIC,
  montant_passif NUMERIC NOT NULL,
  
  -- Crédits
  a_credits BOOLEAN NOT NULL,
  credit_professionnel NUMERIC,
  credit_materiel NUMERIC,
  credit_immobilier NUMERIC,
  
  -- Actifs
  valeur_materiel NUMERIC,
  valeur_stock NUMERIC,
  situation_locaux TEXT NOT NULL,
  valeur_locaux NUMERIC,
  
  -- Résultats de l'estimation
  estimation_basse NUMERIC,
  estimation_moyenne NUMERIC,
  estimation_haute NUMERIC,
  multiple_valorisation NUMERIC,
  analyse_detaillee TEXT,
  points_forts JSONB,
  recommandations JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.estimations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own estimations"
ON public.estimations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own estimations"
ON public.estimations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow anonymous users to create estimations
CREATE POLICY "Anonymous users can create estimations"
ON public.estimations
FOR INSERT
TO anon
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_estimations_updated_at
BEFORE UPDATE ON public.estimations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
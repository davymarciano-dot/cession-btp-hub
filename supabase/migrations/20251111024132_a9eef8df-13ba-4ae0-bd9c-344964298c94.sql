-- Create storage bucket for company listings
INSERT INTO storage.buckets (id, name, public) 
VALUES ('company-listings', 'company-listings', true)
ON CONFLICT (id) DO NOTHING;

-- Create annonces table
CREATE TABLE public.annonces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Section 1: Coordonnées
  civilite TEXT NOT NULL,
  nom_prenom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  preference_contact TEXT NOT NULL,
  
  -- Section 2: Informations Entreprise
  raison_sociale TEXT,
  forme_juridique TEXT NOT NULL,
  siret TEXT,
  secteur_activite TEXT NOT NULL,
  annee_creation INTEGER NOT NULL,
  departement TEXT NOT NULL,
  ville TEXT NOT NULL,
  code_postal TEXT NOT NULL,
  
  -- Section 3: Activité
  description_activite TEXT NOT NULL,
  specialites JSONB,
  certifications JSONB,
  type_clientele JSONB,
  zone_intervention JSONB,
  
  -- Section 4: Finances
  ca_n3 NUMERIC,
  ca_n2 NUMERIC,
  ca_n1 NUMERIC NOT NULL,
  ca_previsionnel NUMERIC,
  ebe_n1 NUMERIC,
  resultat_net_n1 NUMERIC NOT NULL,
  prix_vente NUMERIC NOT NULL,
  prix_negociable BOOLEAN NOT NULL,
  marge_negociation NUMERIC,
  
  -- Section 5: RH
  nombre_salaries INTEGER NOT NULL,
  nombre_cdi INTEGER,
  nombre_cdd INTEGER,
  nombre_apprentis INTEGER,
  anciennete_moyenne NUMERIC,
  competences_equipe TEXT,
  masse_salariale NUMERIC,
  accompagnement_vendeur BOOLEAN NOT NULL,
  duree_accompagnement TEXT,
  
  -- Section 6: Actifs
  situation_locaux TEXT NOT NULL,
  loyer_mensuel NUMERIC,
  duree_bail TEXT,
  surface_locaux NUMERIC,
  valeur_locaux NUMERIC,
  locaux_inclus_vente BOOLEAN,
  materiel_principal TEXT,
  nombre_vehicules INTEGER,
  valeur_materiel NUMERIC,
  etat_materiel TEXT,
  valeur_stock NUMERIC,
  site_web BOOLEAN,
  nombre_clients_actifs INTEGER,
  valeur_portefeuille NUMERIC,
  contrats_en_cours JSONB,
  marque_deposee BOOLEAN,
  
  -- Section 7: Passif
  dettes_totales NUMERIC NOT NULL,
  dette_urssaf NUMERIC,
  dette_tva NUMERIC,
  dette_fournisseurs NUMERIC,
  dette_banques NUMERIC,
  credits_en_cours BOOLEAN NOT NULL,
  montant_credits NUMERIC,
  credits_transferables BOOLEAN,
  litiges_en_cours BOOLEAN NOT NULL,
  nature_litiges TEXT,
  
  -- Section 8: Raison vente
  motif_vente TEXT NOT NULL,
  precisions_vente TEXT,
  
  -- Section 9: Points forts
  atouts_principaux TEXT NOT NULL,
  potentiel_developpement TEXT,
  clientele_fidele_pct NUMERIC,
  reputation_locale INTEGER,
  presence_digitale JSONB,
  elements_differenciants TEXT,
  
  -- Section 10: Modalités
  type_transmission TEXT NOT NULL,
  accompagnement_propose JSONB,
  delai_vente TEXT NOT NULL,
  conditions_particulieres TEXT,
  
  -- Section 11: Confidentialité
  niveau_anonymat TEXT NOT NULL,
  documents_disponibles JSONB,
  nda_requis BOOLEAN NOT NULL,
  
  -- Section 12: Médias (URLs stockées)
  photos_entreprise JSONB,
  photos_materiel JSONB,
  photos_realisations JSONB,
  video_presentation TEXT,
  
  -- Section 13: Financement
  financement_bancaire TEXT NOT NULL,
  complement_vendeur BOOLEAN NOT NULL,
  complement_vendeur_montant NUMERIC,
  complement_vendeur_duree TEXT,
  apport_requis NUMERIC,
  
  -- Section 14: Infos complémentaires
  infos_complementaires TEXT,
  commentaires_acheteurs TEXT,
  visites_possibles TEXT NOT NULL,
  
  -- Section 15: Abonnement
  formule_abonnement TEXT NOT NULL,
  montant_abonnement NUMERIC NOT NULL,
  date_expiration TIMESTAMP WITH TIME ZONE NOT NULL,
  
  -- Validation
  accepte_cgu BOOLEAN NOT NULL DEFAULT false,
  accepte_contact BOOLEAN NOT NULL DEFAULT false,
  certifie_exactitude BOOLEAN NOT NULL DEFAULT false,
  newsletter BOOLEAN DEFAULT false,
  
  -- Statut
  statut TEXT NOT NULL DEFAULT 'brouillon',
  nombre_vues INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.annonces ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view published annonces"
ON public.annonces
FOR SELECT
USING (statut = 'publiee' OR auth.uid() = user_id);

CREATE POLICY "Users can view their own annonces"
ON public.annonces
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own annonces"
ON public.annonces
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own annonces"
ON public.annonces
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own annonces"
ON public.annonces
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_annonces_updated_at
BEFORE UPDATE ON public.annonces
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage policies for company-listings bucket
CREATE POLICY "Users can upload their own listing files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'company-listings' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view listing files"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'company-listings');

CREATE POLICY "Public can view listing files"
ON storage.objects
FOR SELECT
TO anon
USING (bucket_id = 'company-listings');

CREATE POLICY "Users can update their own listing files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'company-listings' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own listing files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'company-listings' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
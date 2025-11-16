-- ============================================
-- CREATE SECURE PUBLIC VIEW FOR LISTINGS
-- ============================================

-- Create a public view that exposes only non-sensitive listing data
CREATE OR REPLACE VIEW public.annonces_public AS
SELECT 
  id,
  secteur_activite,
  annee_creation,
  departement,
  ville,
  code_postal,
  description_activite,
  specialites,
  certifications,
  type_clientele,
  zone_intervention,
  ca_n1,
  prix_vente,
  prix_negociable,
  nombre_salaries,
  situation_locaux,
  materiel_principal,
  nombre_vehicules,
  valeur_materiel,
  valeur_stock,
  dettes_totales,
  motif_vente,
  atouts_principaux,
  potentiel_developpement,
  type_transmission,
  delai_vente,
  photos_entreprise,
  photos_materiel,
  photos_realisations,
  video_presentation,
  formule_abonnement,
  date_expiration,
  statut,
  nombre_vues,
  created_at,
  updated_at
FROM annonces
WHERE statut = 'publiee';

-- Grant SELECT on the view to anonymous users
GRANT SELECT ON public.annonces_public TO anon;
GRANT SELECT ON public.annonces_public TO authenticated;

-- Comment on the view
COMMENT ON VIEW public.annonces_public IS 'Public view of listings excluding sensitive contact information (email, phone, names)';

-- Now restrict the main annonces table to authenticated users only
DROP POLICY IF EXISTS "Public can view limited listing info" ON annonces;

-- Only authenticated users and owners can see full annonces table
CREATE POLICY "Authenticated can view published listings"
ON annonces FOR SELECT
USING (
  (auth.uid() IS NOT NULL AND statut = 'publiee')
  OR user_id = auth.uid()
);
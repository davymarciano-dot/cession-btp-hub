-- Ajouter le champ statut pour suivre la progression du lead
ALTER TABLE leads_estimation 
ADD COLUMN statut TEXT DEFAULT 'siret_saisi' CHECK (statut IN ('siret_saisi', 'email_saisi', 'formulaire_en_cours', 'estimation_complete'));

-- Créer un index pour améliorer les performances des requêtes par statut
CREATE INDEX idx_leads_estimation_statut ON leads_estimation(statut);

-- Créer un index sur le SIRET pour éviter les doublons
CREATE INDEX idx_leads_estimation_siret ON leads_estimation(siret) WHERE siret IS NOT NULL;
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      abandoned_carts: {
        Row: {
          created_at: string
          id: string
          price: number
          product_id: string | null
          product_type: string
          recovered: boolean
          recovery_emails_sent: number
          step: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          price: number
          product_id?: string | null
          product_type: string
          recovered?: boolean
          recovery_emails_sent?: number
          step: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          price?: number
          product_id?: string | null
          product_type?: string
          recovered?: boolean
          recovery_emails_sent?: number
          step?: string
          user_id?: string
        }
        Relationships: []
      }
      affiliate_transactions: {
        Row: {
          affiliate_id: string
          commission_amount: number
          commission_rate: number
          created_at: string
          id: string
          paid_at: string | null
          referred_user_id: string | null
          sale_amount: number
          status: string
          transaction_type: string
        }
        Insert: {
          affiliate_id: string
          commission_amount: number
          commission_rate: number
          created_at?: string
          id?: string
          paid_at?: string | null
          referred_user_id?: string | null
          sale_amount: number
          status?: string
          transaction_type: string
        }
        Update: {
          affiliate_id?: string
          commission_amount?: number
          commission_rate?: number
          created_at?: string
          id?: string
          paid_at?: string | null
          referred_user_id?: string | null
          sale_amount?: number
          status?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_transactions_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliates: {
        Row: {
          affiliate_code: string
          company_name: string | null
          company_type: string | null
          created_at: string
          id: string
          paid_earnings: number | null
          pending_earnings: number | null
          status: string
          stripe_account_id: string | null
          total_earnings: number | null
          total_referrals: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          affiliate_code: string
          company_name?: string | null
          company_type?: string | null
          created_at?: string
          id?: string
          paid_earnings?: number | null
          pending_earnings?: number | null
          status?: string
          stripe_account_id?: string | null
          total_earnings?: number | null
          total_referrals?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          affiliate_code?: string
          company_name?: string | null
          company_type?: string | null
          created_at?: string
          id?: string
          paid_earnings?: number | null
          pending_earnings?: number | null
          status?: string
          stripe_account_id?: string | null
          total_earnings?: number | null
          total_referrals?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      alert_preferences: {
        Row: {
          created_at: string | null
          id: string
          phone_number: string | null
          preferences: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          phone_number?: string | null
          preferences?: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          phone_number?: string | null
          preferences?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      annonces: {
        Row: {
          accepte_cgu: boolean
          accepte_contact: boolean
          accompagnement_propose: Json | null
          accompagnement_vendeur: boolean
          anciennete_moyenne: number | null
          annee_creation: number
          apport_requis: number | null
          atouts_principaux: string
          ca_n1: number
          ca_n2: number | null
          ca_n3: number | null
          ca_previsionnel: number | null
          certifications: Json | null
          certifie_exactitude: boolean
          civilite: string
          clientele_fidele_pct: number | null
          code_postal: string
          commentaires_acheteurs: string | null
          competences_equipe: string | null
          complement_vendeur: boolean
          complement_vendeur_duree: string | null
          complement_vendeur_montant: number | null
          conditions_particulieres: string | null
          contrats_en_cours: Json | null
          created_at: string
          credits_en_cours: boolean
          credits_transferables: boolean | null
          date_expiration: string
          delai_vente: string
          departement: string
          description_activite: string
          dette_banques: number | null
          dette_fournisseurs: number | null
          dette_tva: number | null
          dette_urssaf: number | null
          dettes_totales: number
          documents_disponibles: Json | null
          duree_accompagnement: string | null
          duree_bail: string | null
          ebe_n1: number | null
          elements_differenciants: string | null
          email: string
          etat_materiel: string | null
          financement_bancaire: string
          forme_juridique: string
          formule_abonnement: string
          id: string
          infos_complementaires: string | null
          litiges_en_cours: boolean
          locaux_inclus_vente: boolean | null
          loyer_mensuel: number | null
          marge_negociation: number | null
          marque_deposee: boolean | null
          masse_salariale: number | null
          materiel_principal: string | null
          montant_abonnement: number
          montant_credits: number | null
          motif_vente: string
          nature_litiges: string | null
          nda_requis: boolean
          newsletter: boolean | null
          niveau_anonymat: string
          nom_prenom: string
          nombre_apprentis: number | null
          nombre_cdd: number | null
          nombre_cdi: number | null
          nombre_clients_actifs: number | null
          nombre_salaries: number
          nombre_vehicules: number | null
          nombre_vues: number | null
          photos_entreprise: Json | null
          photos_materiel: Json | null
          photos_realisations: Json | null
          potentiel_developpement: string | null
          precisions_vente: string | null
          preference_contact: string
          presence_digitale: Json | null
          prix_negociable: boolean
          prix_vente: number
          raison_sociale: string | null
          reputation_locale: number | null
          resultat_net_n1: number
          secteur_activite: string
          siret: string | null
          site_web: boolean | null
          situation_locaux: string
          specialites: Json | null
          statut: string
          surface_locaux: number | null
          telephone: string
          type_clientele: Json | null
          type_transmission: string
          updated_at: string
          user_id: string | null
          valeur_locaux: number | null
          valeur_materiel: number | null
          valeur_portefeuille: number | null
          valeur_stock: number | null
          video_presentation: string | null
          ville: string
          visites_possibles: string
          zone_intervention: Json | null
        }
        Insert: {
          accepte_cgu?: boolean
          accepte_contact?: boolean
          accompagnement_propose?: Json | null
          accompagnement_vendeur: boolean
          anciennete_moyenne?: number | null
          annee_creation: number
          apport_requis?: number | null
          atouts_principaux: string
          ca_n1: number
          ca_n2?: number | null
          ca_n3?: number | null
          ca_previsionnel?: number | null
          certifications?: Json | null
          certifie_exactitude?: boolean
          civilite: string
          clientele_fidele_pct?: number | null
          code_postal: string
          commentaires_acheteurs?: string | null
          competences_equipe?: string | null
          complement_vendeur: boolean
          complement_vendeur_duree?: string | null
          complement_vendeur_montant?: number | null
          conditions_particulieres?: string | null
          contrats_en_cours?: Json | null
          created_at?: string
          credits_en_cours: boolean
          credits_transferables?: boolean | null
          date_expiration: string
          delai_vente: string
          departement: string
          description_activite: string
          dette_banques?: number | null
          dette_fournisseurs?: number | null
          dette_tva?: number | null
          dette_urssaf?: number | null
          dettes_totales: number
          documents_disponibles?: Json | null
          duree_accompagnement?: string | null
          duree_bail?: string | null
          ebe_n1?: number | null
          elements_differenciants?: string | null
          email: string
          etat_materiel?: string | null
          financement_bancaire: string
          forme_juridique: string
          formule_abonnement: string
          id?: string
          infos_complementaires?: string | null
          litiges_en_cours: boolean
          locaux_inclus_vente?: boolean | null
          loyer_mensuel?: number | null
          marge_negociation?: number | null
          marque_deposee?: boolean | null
          masse_salariale?: number | null
          materiel_principal?: string | null
          montant_abonnement: number
          montant_credits?: number | null
          motif_vente: string
          nature_litiges?: string | null
          nda_requis: boolean
          newsletter?: boolean | null
          niveau_anonymat: string
          nom_prenom: string
          nombre_apprentis?: number | null
          nombre_cdd?: number | null
          nombre_cdi?: number | null
          nombre_clients_actifs?: number | null
          nombre_salaries: number
          nombre_vehicules?: number | null
          nombre_vues?: number | null
          photos_entreprise?: Json | null
          photos_materiel?: Json | null
          photos_realisations?: Json | null
          potentiel_developpement?: string | null
          precisions_vente?: string | null
          preference_contact: string
          presence_digitale?: Json | null
          prix_negociable: boolean
          prix_vente: number
          raison_sociale?: string | null
          reputation_locale?: number | null
          resultat_net_n1: number
          secteur_activite: string
          siret?: string | null
          site_web?: boolean | null
          situation_locaux: string
          specialites?: Json | null
          statut?: string
          surface_locaux?: number | null
          telephone: string
          type_clientele?: Json | null
          type_transmission: string
          updated_at?: string
          user_id?: string | null
          valeur_locaux?: number | null
          valeur_materiel?: number | null
          valeur_portefeuille?: number | null
          valeur_stock?: number | null
          video_presentation?: string | null
          ville: string
          visites_possibles: string
          zone_intervention?: Json | null
        }
        Update: {
          accepte_cgu?: boolean
          accepte_contact?: boolean
          accompagnement_propose?: Json | null
          accompagnement_vendeur?: boolean
          anciennete_moyenne?: number | null
          annee_creation?: number
          apport_requis?: number | null
          atouts_principaux?: string
          ca_n1?: number
          ca_n2?: number | null
          ca_n3?: number | null
          ca_previsionnel?: number | null
          certifications?: Json | null
          certifie_exactitude?: boolean
          civilite?: string
          clientele_fidele_pct?: number | null
          code_postal?: string
          commentaires_acheteurs?: string | null
          competences_equipe?: string | null
          complement_vendeur?: boolean
          complement_vendeur_duree?: string | null
          complement_vendeur_montant?: number | null
          conditions_particulieres?: string | null
          contrats_en_cours?: Json | null
          created_at?: string
          credits_en_cours?: boolean
          credits_transferables?: boolean | null
          date_expiration?: string
          delai_vente?: string
          departement?: string
          description_activite?: string
          dette_banques?: number | null
          dette_fournisseurs?: number | null
          dette_tva?: number | null
          dette_urssaf?: number | null
          dettes_totales?: number
          documents_disponibles?: Json | null
          duree_accompagnement?: string | null
          duree_bail?: string | null
          ebe_n1?: number | null
          elements_differenciants?: string | null
          email?: string
          etat_materiel?: string | null
          financement_bancaire?: string
          forme_juridique?: string
          formule_abonnement?: string
          id?: string
          infos_complementaires?: string | null
          litiges_en_cours?: boolean
          locaux_inclus_vente?: boolean | null
          loyer_mensuel?: number | null
          marge_negociation?: number | null
          marque_deposee?: boolean | null
          masse_salariale?: number | null
          materiel_principal?: string | null
          montant_abonnement?: number
          montant_credits?: number | null
          motif_vente?: string
          nature_litiges?: string | null
          nda_requis?: boolean
          newsletter?: boolean | null
          niveau_anonymat?: string
          nom_prenom?: string
          nombre_apprentis?: number | null
          nombre_cdd?: number | null
          nombre_cdi?: number | null
          nombre_clients_actifs?: number | null
          nombre_salaries?: number
          nombre_vehicules?: number | null
          nombre_vues?: number | null
          photos_entreprise?: Json | null
          photos_materiel?: Json | null
          photos_realisations?: Json | null
          potentiel_developpement?: string | null
          precisions_vente?: string | null
          preference_contact?: string
          presence_digitale?: Json | null
          prix_negociable?: boolean
          prix_vente?: number
          raison_sociale?: string | null
          reputation_locale?: number | null
          resultat_net_n1?: number
          secteur_activite?: string
          siret?: string | null
          site_web?: boolean | null
          situation_locaux?: string
          specialites?: Json | null
          statut?: string
          surface_locaux?: number | null
          telephone?: string
          type_clientele?: Json | null
          type_transmission?: string
          updated_at?: string
          user_id?: string | null
          valeur_locaux?: number | null
          valeur_materiel?: number | null
          valeur_portefeuille?: number | null
          valeur_stock?: number | null
          video_presentation?: string | null
          ville?: string
          visites_possibles?: string
          zone_intervention?: Json | null
        }
        Relationships: []
      }
      automation_logs: {
        Row: {
          action_type: string
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          metadata: Json | null
          scheduled_for: string | null
          status: string
          target_id: string
          target_type: string
        }
        Insert: {
          action_type: string
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          metadata?: Json | null
          scheduled_for?: string | null
          status: string
          target_id: string
          target_type: string
        }
        Update: {
          action_type?: string
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          metadata?: Json | null
          scheduled_for?: string | null
          status?: string
          target_id?: string
          target_type?: string
        }
        Relationships: []
      }
      buyer_alerts: {
        Row: {
          active: boolean
          ca_max: number
          ca_min: number
          created_at: string
          departements: string[]
          effectif_max: number
          effectif_min: number
          email: string
          id: string
          secteurs: string[]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          active?: boolean
          ca_max?: number
          ca_min?: number
          created_at?: string
          departements?: string[]
          effectif_max?: number
          effectif_min?: number
          email: string
          id?: string
          secteurs?: string[]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          active?: boolean
          ca_max?: number
          ca_min?: number
          created_at?: string
          departements?: string[]
          effectif_max?: number
          effectif_min?: number
          email?: string
          id?: string
          secteurs?: string[]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      cart_tracking: {
        Row: {
          abandoned_at: string | null
          browser: string | null
          created_at: string | null
          current_step: string | null
          device_type: string | null
          id: string
          last_activity: string | null
          metadata: Json | null
          price: number | null
          product_id: string | null
          product_type: string | null
          recovered_at: string | null
          referrer_source: string | null
          session_id: string
          started_at: string
          steps_completed: string[] | null
          time_spent_seconds: number | null
          user_id: string | null
          utm_params: Json | null
        }
        Insert: {
          abandoned_at?: string | null
          browser?: string | null
          created_at?: string | null
          current_step?: string | null
          device_type?: string | null
          id?: string
          last_activity?: string | null
          metadata?: Json | null
          price?: number | null
          product_id?: string | null
          product_type?: string | null
          recovered_at?: string | null
          referrer_source?: string | null
          session_id: string
          started_at: string
          steps_completed?: string[] | null
          time_spent_seconds?: number | null
          user_id?: string | null
          utm_params?: Json | null
        }
        Update: {
          abandoned_at?: string | null
          browser?: string | null
          created_at?: string | null
          current_step?: string | null
          device_type?: string | null
          id?: string
          last_activity?: string | null
          metadata?: Json | null
          price?: number | null
          product_id?: string | null
          product_type?: string | null
          recovered_at?: string | null
          referrer_source?: string | null
          session_id?: string
          started_at?: string
          steps_completed?: string[] | null
          time_spent_seconds?: number | null
          user_id?: string | null
          utm_params?: Json | null
        }
        Relationships: []
      }
      carts_tracking: {
        Row: {
          abandoned_at: string | null
          cart_id: string
          created_at: string | null
          device_info: Json | null
          discount_applied: number | null
          id: string
          last_step: string | null
          metadata: Json | null
          price: number | null
          product_id: string | null
          product_type: string | null
          recovered_at: string | null
          recovery_attempts: number | null
          recovery_emails_sent: number | null
          started_at: string
          steps_completed: Json | null
          user_id: string | null
        }
        Insert: {
          abandoned_at?: string | null
          cart_id: string
          created_at?: string | null
          device_info?: Json | null
          discount_applied?: number | null
          id?: string
          last_step?: string | null
          metadata?: Json | null
          price?: number | null
          product_id?: string | null
          product_type?: string | null
          recovered_at?: string | null
          recovery_attempts?: number | null
          recovery_emails_sent?: number | null
          started_at: string
          steps_completed?: Json | null
          user_id?: string | null
        }
        Update: {
          abandoned_at?: string | null
          cart_id?: string
          created_at?: string | null
          device_info?: Json | null
          discount_applied?: number | null
          id?: string
          last_step?: string | null
          metadata?: Json | null
          price?: number | null
          product_id?: string | null
          product_type?: string | null
          recovered_at?: string | null
          recovery_attempts?: number | null
          recovery_emails_sent?: number | null
          started_at?: string
          steps_completed?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      chatbot_logs: {
        Row: {
          action_taken: string | null
          created_at: string | null
          id: string
          intent: string | null
          message: string
          response: string
          session_id: string
          user_id: string | null
        }
        Insert: {
          action_taken?: string | null
          created_at?: string | null
          id?: string
          intent?: string | null
          message: string
          response: string
          session_id: string
          user_id?: string | null
        }
        Update: {
          action_taken?: string | null
          created_at?: string | null
          id?: string
          intent?: string | null
          message?: string
          response?: string
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      comparisons_tracking: {
        Row: {
          compared_listings: string[]
          comparison_completed: boolean | null
          contacted_listing_id: string | null
          created_at: string | null
          id: string
          resulted_in_contact: boolean | null
          session_id: string | null
          time_spent_seconds: number | null
          user_id: string | null
        }
        Insert: {
          compared_listings: string[]
          comparison_completed?: boolean | null
          contacted_listing_id?: string | null
          created_at?: string | null
          id?: string
          resulted_in_contact?: boolean | null
          session_id?: string | null
          time_spent_seconds?: number | null
          user_id?: string | null
        }
        Update: {
          compared_listings?: string[]
          comparison_completed?: boolean | null
          contacted_listing_id?: string | null
          created_at?: string | null
          id?: string
          resulted_in_contact?: boolean | null
          session_id?: string | null
          time_spent_seconds?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      conversations: {
        Row: {
          acheteur_id: string
          annonce_id: string
          created_at: string
          id: string
          updated_at: string
          vendeur_id: string
        }
        Insert: {
          acheteur_id: string
          annonce_id: string
          created_at?: string
          id?: string
          updated_at?: string
          vendeur_id: string
        }
        Update: {
          acheteur_id?: string
          annonce_id?: string
          created_at?: string
          id?: string
          updated_at?: string
          vendeur_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_annonce_id_fkey"
            columns: ["annonce_id"]
            isOneToOne: false
            referencedRelation: "annonces"
            referencedColumns: ["id"]
          },
        ]
      }
      conversion_tracking: {
        Row: {
          attribution_data: Json | null
          campaign: string | null
          conversion_type: string
          created_at: string | null
          currency: string | null
          id: string
          source: string | null
          user_id: string | null
          value: number | null
        }
        Insert: {
          attribution_data?: Json | null
          campaign?: string | null
          conversion_type: string
          created_at?: string | null
          currency?: string | null
          id?: string
          source?: string | null
          user_id?: string | null
          value?: number | null
        }
        Update: {
          attribution_data?: Json | null
          campaign?: string | null
          conversion_type?: string
          created_at?: string | null
          currency?: string | null
          id?: string
          source?: string | null
          user_id?: string | null
          value?: number | null
        }
        Relationships: []
      }
      conversions_tracking: {
        Row: {
          attribution_data: Json | null
          campaign: string | null
          conversion_type: string
          conversion_value: number | null
          created_at: string | null
          id: string
          landing_page: string | null
          medium: string | null
          referrer: string | null
          source: string | null
          time_to_convert_seconds: number | null
          user_id: string | null
        }
        Insert: {
          attribution_data?: Json | null
          campaign?: string | null
          conversion_type: string
          conversion_value?: number | null
          created_at?: string | null
          id?: string
          landing_page?: string | null
          medium?: string | null
          referrer?: string | null
          source?: string | null
          time_to_convert_seconds?: number | null
          user_id?: string | null
        }
        Update: {
          attribution_data?: Json | null
          campaign?: string | null
          conversion_type?: string
          conversion_value?: number | null
          created_at?: string | null
          id?: string
          landing_page?: string | null
          medium?: string | null
          referrer?: string | null
          source?: string | null
          time_to_convert_seconds?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      cron_tracking: {
        Row: {
          completed_at: string | null
          created_at: string | null
          duration_ms: number | null
          errors: string[] | null
          id: string
          job_name: string
          metadata: Json | null
          records_processed: number | null
          started_at: string
          status: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          duration_ms?: number | null
          errors?: string[] | null
          id?: string
          job_name: string
          metadata?: Json | null
          records_processed?: number | null
          started_at?: string
          status: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          duration_ms?: number | null
          errors?: string[] | null
          id?: string
          job_name?: string
          metadata?: Json | null
          records_processed?: number | null
          started_at?: string
          status?: string
        }
        Relationships: []
      }
      digital_products: {
        Row: {
          created_at: string
          description: string
          download_url: string | null
          id: string
          price: number
          product_type: string
          sales_count: number | null
          status: string
          stripe_price_id: string | null
          stripe_product_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          download_url?: string | null
          id?: string
          price: number
          product_type: string
          sales_count?: number | null
          status?: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          download_url?: string | null
          id?: string
          price?: number
          product_type?: string
          sales_count?: number | null
          status?: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_campaigns: {
        Row: {
          campaign_type: string
          clicked: boolean
          converted: boolean
          id: string
          metadata: Json | null
          opened: boolean
          scheduled_for: string | null
          sent_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          campaign_type: string
          clicked?: boolean
          converted?: boolean
          id?: string
          metadata?: Json | null
          opened?: boolean
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          campaign_type?: string
          clicked?: boolean
          converted?: boolean
          id?: string
          metadata?: Json | null
          opened?: boolean
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      email_tracking: {
        Row: {
          bounced_at: string | null
          click_count: number | null
          clicked_at: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          opened_at: string | null
          recipient_email: string
          sent_at: string | null
          status: string | null
          template_name: string | null
          unsubscribed_at: string | null
        }
        Insert: {
          bounced_at?: string | null
          click_count?: number | null
          clicked_at?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          opened_at?: string | null
          recipient_email: string
          sent_at?: string | null
          status?: string | null
          template_name?: string | null
          unsubscribed_at?: string | null
        }
        Update: {
          bounced_at?: string | null
          click_count?: number | null
          clicked_at?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          opened_at?: string | null
          recipient_email?: string
          sent_at?: string | null
          status?: string | null
          template_name?: string | null
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      emails_tracking: {
        Row: {
          bounced_at: string | null
          campaign_id: string | null
          click_count: number | null
          clicked_at: string | null
          clicked_links: Json | null
          complained_at: string | null
          created_at: string | null
          delivered_at: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          open_count: number | null
          opened_at: string | null
          recipient_email: string
          sent_at: string | null
          status: string | null
          subject: string | null
          template_name: string | null
          unsubscribed_at: string | null
          user_id: string | null
        }
        Insert: {
          bounced_at?: string | null
          campaign_id?: string | null
          click_count?: number | null
          clicked_at?: string | null
          clicked_links?: Json | null
          complained_at?: string | null
          created_at?: string | null
          delivered_at?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          open_count?: number | null
          opened_at?: string | null
          recipient_email: string
          sent_at?: string | null
          status?: string | null
          subject?: string | null
          template_name?: string | null
          unsubscribed_at?: string | null
          user_id?: string | null
        }
        Update: {
          bounced_at?: string | null
          campaign_id?: string | null
          click_count?: number | null
          clicked_at?: string | null
          clicked_links?: Json | null
          complained_at?: string | null
          created_at?: string | null
          delivered_at?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          open_count?: number | null
          opened_at?: string | null
          recipient_email?: string
          sent_at?: string | null
          status?: string | null
          subject?: string | null
          template_name?: string | null
          unsubscribed_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      estimations: {
        Row: {
          a_credits: boolean
          a_dettes: boolean
          analyse_detaillee: string | null
          annee_creation: number
          ca_n: number | null
          ca_n1: number
          ca_n2: number | null
          created_at: string
          credit_immobilier: number | null
          credit_materiel: number | null
          credit_professionnel: number | null
          departement: string
          dette_autres: number | null
          dette_fournisseurs: number | null
          dette_loyer: number | null
          dette_tva: number | null
          dette_urssaf: number | null
          estimation_basse: number | null
          estimation_haute: number | null
          estimation_moyenne: number | null
          id: string
          montant_passif: number
          multiple_valorisation: number | null
          nombre_apprentis: number | null
          nombre_cdd: number | null
          nombre_cdi: number | null
          nombre_employes: number
          points_forts: Json | null
          recommandations: Json | null
          resultat_n1: number
          resultat_n1_type: string
          resultat_n2: number
          resultat_n2_type: string
          secteur: string
          situation_locaux: string
          updated_at: string
          user_id: string | null
          valeur_locaux: number | null
          valeur_materiel: number | null
          valeur_stock: number | null
        }
        Insert: {
          a_credits: boolean
          a_dettes: boolean
          analyse_detaillee?: string | null
          annee_creation: number
          ca_n?: number | null
          ca_n1: number
          ca_n2?: number | null
          created_at?: string
          credit_immobilier?: number | null
          credit_materiel?: number | null
          credit_professionnel?: number | null
          departement: string
          dette_autres?: number | null
          dette_fournisseurs?: number | null
          dette_loyer?: number | null
          dette_tva?: number | null
          dette_urssaf?: number | null
          estimation_basse?: number | null
          estimation_haute?: number | null
          estimation_moyenne?: number | null
          id?: string
          montant_passif: number
          multiple_valorisation?: number | null
          nombre_apprentis?: number | null
          nombre_cdd?: number | null
          nombre_cdi?: number | null
          nombre_employes: number
          points_forts?: Json | null
          recommandations?: Json | null
          resultat_n1: number
          resultat_n1_type: string
          resultat_n2: number
          resultat_n2_type: string
          secteur: string
          situation_locaux: string
          updated_at?: string
          user_id?: string | null
          valeur_locaux?: number | null
          valeur_materiel?: number | null
          valeur_stock?: number | null
        }
        Update: {
          a_credits?: boolean
          a_dettes?: boolean
          analyse_detaillee?: string | null
          annee_creation?: number
          ca_n?: number | null
          ca_n1?: number
          ca_n2?: number | null
          created_at?: string
          credit_immobilier?: number | null
          credit_materiel?: number | null
          credit_professionnel?: number | null
          departement?: string
          dette_autres?: number | null
          dette_fournisseurs?: number | null
          dette_loyer?: number | null
          dette_tva?: number | null
          dette_urssaf?: number | null
          estimation_basse?: number | null
          estimation_haute?: number | null
          estimation_moyenne?: number | null
          id?: string
          montant_passif?: number
          multiple_valorisation?: number | null
          nombre_apprentis?: number | null
          nombre_cdd?: number | null
          nombre_cdi?: number | null
          nombre_employes?: number
          points_forts?: Json | null
          recommandations?: Json | null
          resultat_n1?: number
          resultat_n1_type?: string
          resultat_n2?: number
          resultat_n2_type?: string
          secteur?: string
          situation_locaux?: string
          updated_at?: string
          user_id?: string | null
          valeur_locaux?: number | null
          valeur_materiel?: number | null
          valeur_stock?: number | null
        }
        Relationships: []
      }
      events_tracking: {
        Row: {
          browser: string | null
          country: string | null
          created_at: string | null
          device_type: string | null
          event_action: string | null
          event_category: string | null
          event_label: string | null
          event_type: string
          event_value: number | null
          id: string
          ip_address: unknown
          metadata: Json | null
          page_url: string | null
          referrer: string | null
          session_id: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          browser?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          event_action?: string | null
          event_category?: string | null
          event_label?: string | null
          event_type: string
          event_value?: number | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          browser?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          event_action?: string | null
          event_category?: string | null
          event_label?: string | null
          event_type?: string
          event_value?: number | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      listing_views: {
        Row: {
          created_at: string
          device_type: string | null
          duration: number | null
          id: string
          listing_id: string
          referrer: string | null
          viewer_id: string | null
          viewer_ip: string | null
        }
        Insert: {
          created_at?: string
          device_type?: string | null
          duration?: number | null
          id?: string
          listing_id: string
          referrer?: string | null
          viewer_id?: string | null
          viewer_ip?: string | null
        }
        Update: {
          created_at?: string
          device_type?: string | null
          duration?: number | null
          id?: string
          listing_id?: string
          referrer?: string | null
          viewer_id?: string | null
          viewer_ip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listing_views_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "annonces"
            referencedColumns: ["id"]
          },
        ]
      }
      listings_views_tracking: {
        Row: {
          clicked_contact: boolean | null
          clicked_phone: boolean | null
          created_at: string | null
          device_type: string | null
          id: string
          listing_id: string | null
          location_city: string | null
          location_country: string | null
          scroll_depth_percent: number | null
          session_id: string | null
          source: string | null
          view_duration_seconds: number | null
          viewer_id: string | null
          viewer_type: string | null
        }
        Insert: {
          clicked_contact?: boolean | null
          clicked_phone?: boolean | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          listing_id?: string | null
          location_city?: string | null
          location_country?: string | null
          scroll_depth_percent?: number | null
          session_id?: string | null
          source?: string | null
          view_duration_seconds?: number | null
          viewer_id?: string | null
          viewer_type?: string | null
        }
        Update: {
          clicked_contact?: boolean | null
          clicked_phone?: boolean | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          listing_id?: string | null
          location_city?: string | null
          location_country?: string | null
          scroll_depth_percent?: number | null
          session_id?: string | null
          source?: string | null
          view_duration_seconds?: number | null
          viewer_id?: string | null
          viewer_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_views_tracking_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "annonces"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          budget_match: boolean | null
          buyer_id: string
          contacted_at: string | null
          created_at: string
          id: string
          listing_id: string
          location_match: boolean | null
          score: number
          sector_match: boolean | null
          seller_id: string
          size_match: boolean | null
          status: string
          updated_at: string
          viewed_at: string | null
        }
        Insert: {
          budget_match?: boolean | null
          buyer_id: string
          contacted_at?: string | null
          created_at?: string
          id?: string
          listing_id: string
          location_match?: boolean | null
          score: number
          sector_match?: boolean | null
          seller_id: string
          size_match?: boolean | null
          status?: string
          updated_at?: string
          viewed_at?: string | null
        }
        Update: {
          budget_match?: boolean | null
          buyer_id?: string
          contacted_at?: string | null
          created_at?: string
          id?: string
          listing_id?: string
          location_match?: boolean | null
          score?: number
          sector_match?: boolean | null
          seller_id?: string
          size_match?: boolean | null
          status?: string
          updated_at?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "annonces"
            referencedColumns: ["id"]
          },
        ]
      }
      matching_tracking: {
        Row: {
          algorithm_version: string | null
          buyer_id: string | null
          buyer_response: string | null
          created_at: string | null
          factors: Json | null
          id: string
          match_score: number | null
          notification_sent: boolean | null
          resulted_in_contact: boolean | null
          resulted_in_sale: boolean | null
          seller_id: string | null
          seller_response: string | null
        }
        Insert: {
          algorithm_version?: string | null
          buyer_id?: string | null
          buyer_response?: string | null
          created_at?: string | null
          factors?: Json | null
          id?: string
          match_score?: number | null
          notification_sent?: boolean | null
          resulted_in_contact?: boolean | null
          resulted_in_sale?: boolean | null
          seller_id?: string | null
          seller_response?: string | null
        }
        Update: {
          algorithm_version?: string | null
          buyer_id?: string | null
          buyer_response?: string | null
          created_at?: string | null
          factors?: Json | null
          id?: string
          match_score?: number | null
          notification_sent?: boolean | null
          resulted_in_contact?: boolean | null
          resulted_in_sale?: boolean | null
          seller_id?: string | null
          seller_response?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          read: boolean
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          read?: boolean
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          read?: boolean
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      performance_metrics: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          metric_name: string
          metric_type: string
          period_end: string | null
          period_start: string | null
          unit: string | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_type: string
          period_end?: string | null
          period_start?: string | null
          unit?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_type?: string
          period_end?: string | null
          period_start?: string | null
          unit?: string | null
          value?: number | null
        }
        Relationships: []
      }
      product_purchases: {
        Row: {
          access_granted: boolean | null
          amount: number
          created_at: string
          id: string
          product_id: string
          stripe_payment_intent_id: string | null
          user_id: string
        }
        Insert: {
          access_granted?: boolean | null
          amount: number
          created_at?: string
          id?: string
          product_id: string
          stripe_payment_intent_id?: string | null
          user_id: string
        }
        Update: {
          access_granted?: boolean | null
          amount?: number
          created_at?: string
          id?: string
          product_id?: string
          stripe_payment_intent_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_purchases_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "digital_products"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          budget_range: string | null
          company: string | null
          created_at: string | null
          email: string
          id: string
          interested_sectors: string[] | null
          location: string | null
          name: string
          phone: string | null
          updated_at: string | null
          user_type: string
        }
        Insert: {
          budget_range?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          id: string
          interested_sectors?: string[] | null
          location?: string | null
          name: string
          phone?: string | null
          updated_at?: string | null
          user_type: string
        }
        Update: {
          budget_range?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          interested_sectors?: string[] | null
          location?: string | null
          name?: string
          phone?: string | null
          updated_at?: string | null
          user_type?: string
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          created_at: string | null
          id: string
          subscription: Json
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          subscription: Json
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          subscription?: Json
          user_id?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          commission_earned: number
          created_at: string
          id: string
          referral_code: string
          referred_email: string | null
          referred_id: string | null
          referrer_id: string
          status: string
        }
        Insert: {
          commission_earned?: number
          created_at?: string
          id?: string
          referral_code: string
          referred_email?: string | null
          referred_id?: string | null
          referrer_id: string
          status?: string
        }
        Update: {
          commission_earned?: number
          created_at?: string
          id?: string
          referral_code?: string
          referred_email?: string | null
          referred_id?: string | null
          referrer_id?: string
          status?: string
        }
        Relationships: []
      }
      revenue_events: {
        Row: {
          amount: number
          created_at: string
          event_type: string
          id: string
          metadata: Json | null
          product: string | null
          source: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          event_type: string
          id?: string
          metadata?: Json | null
          product?: string | null
          source?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          product?: string | null
          source?: string | null
          user_id?: string
        }
        Relationships: []
      }
      service_orders: {
        Row: {
          amount: number
          buyer_id: string
          commission_amount: number
          created_at: string
          id: string
          listing_id: string | null
          notes: string | null
          provider_id: string
          status: string
          stripe_payment_intent_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          buyer_id: string
          commission_amount: number
          created_at?: string
          id?: string
          listing_id?: string | null
          notes?: string | null
          provider_id: string
          status?: string
          stripe_payment_intent_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          buyer_id?: string
          commission_amount?: number
          created_at?: string
          id?: string
          listing_id?: string | null
          notes?: string | null
          provider_id?: string
          status?: string
          stripe_payment_intent_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_orders_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "annonces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_orders_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      service_providers: {
        Row: {
          category: string
          commission_rate: number
          company_name: string
          created_at: string
          description: string | null
          id: string
          price: number
          price_type: string
          rating: number | null
          review_count: number | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          commission_rate?: number
          company_name: string
          created_at?: string
          description?: string | null
          id?: string
          price: number
          price_type: string
          rating?: number | null
          review_count?: number | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          commission_rate?: number
          company_name?: string
          created_at?: string
          description?: string | null
          id?: string
          price?: number
          price_type?: string
          rating?: number | null
          review_count?: number | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_type: string
          status: string
          stripe_customer_id: string | null
          stripe_product_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type: string
          status?: string
          stripe_customer_id?: string | null
          stripe_product_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_product_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_scores: {
        Row: {
          badges: Json | null
          certification_score: number | null
          created_at: string | null
          experience_score: number | null
          funding_score: number | null
          id: string
          profit_score: number | null
          qualification_score: number | null
          response_score: number | null
          revenue_score: number | null
          score: number
          updated_at: string | null
          urgency_score: number | null
          user_id: string
          user_type: string
        }
        Insert: {
          badges?: Json | null
          certification_score?: number | null
          created_at?: string | null
          experience_score?: number | null
          funding_score?: number | null
          id?: string
          profit_score?: number | null
          qualification_score?: number | null
          response_score?: number | null
          revenue_score?: number | null
          score?: number
          updated_at?: string | null
          urgency_score?: number | null
          user_id: string
          user_type: string
        }
        Update: {
          badges?: Json | null
          certification_score?: number | null
          created_at?: string | null
          experience_score?: number | null
          funding_score?: number | null
          id?: string
          profit_score?: number | null
          qualification_score?: number | null
          response_score?: number | null
          revenue_score?: number | null
          score?: number
          updated_at?: string | null
          urgency_score?: number | null
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      analytics_overview: {
        Row: {
          converters: number | null
          date: string | null
          sessions: number | null
          total_events: number | null
          unique_users: number | null
          visitors: number | null
        }
        Relationships: []
      }
      daily_metrics: {
        Row: {
          boosts: number | null
          date: string | null
          new_listings: number | null
          revenue: number | null
          signups: number | null
        }
        Relationships: []
      }
      email_performance: {
        Row: {
          click_rate: number | null
          clicked: number | null
          open_rate: number | null
          opened: number | null
          template_name: string | null
          total_sent: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_buyer_score: {
        Args: {
          p_experience: number
          p_funding_type: string
          p_response_time_hours: number
          p_user_id: string
        }
        Returns: number
      }
      calculate_seller_score: {
        Args: {
          p_employees: number
          p_has_rge: boolean
          p_profit: number
          p_revenue: number
          p_urgency: string
          p_user_id: string
          p_years_in_business: number
        }
        Returns: number
      }
      track_event: {
        Args: {
          p_event_action: string
          p_event_type: string
          p_metadata?: Json
          p_user_id: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

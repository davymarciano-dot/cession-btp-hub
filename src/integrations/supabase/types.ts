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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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

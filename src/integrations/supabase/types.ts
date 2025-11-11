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

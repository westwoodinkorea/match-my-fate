export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          age: number | null
          created_at: string
          education: string | null
          family_background: string | null
          gender: string | null
          hobbies: string[] | null
          id: string
          ideal_age_max: number | null
          ideal_age_min: number | null
          ideal_education: string | null
          ideal_gender: string | null
          ideal_location: string | null
          ideal_occupation: string | null
          ideal_personality: string | null
          introduction: string | null
          lifestyle_drinking: string | null
          lifestyle_exercise: string | null
          lifestyle_pets: string | null
          lifestyle_smoking: string | null
          lifestyle_travel: string | null
          location: string | null
          name: string | null
          occupation: string | null
          personality: string | null
          religion: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: number | null
          created_at?: string
          education?: string | null
          family_background?: string | null
          gender?: string | null
          hobbies?: string[] | null
          id?: string
          ideal_age_max?: number | null
          ideal_age_min?: number | null
          ideal_education?: string | null
          ideal_gender?: string | null
          ideal_location?: string | null
          ideal_occupation?: string | null
          ideal_personality?: string | null
          introduction?: string | null
          lifestyle_drinking?: string | null
          lifestyle_exercise?: string | null
          lifestyle_pets?: string | null
          lifestyle_smoking?: string | null
          lifestyle_travel?: string | null
          location?: string | null
          name?: string | null
          occupation?: string | null
          personality?: string | null
          religion?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number | null
          created_at?: string
          education?: string | null
          family_background?: string | null
          gender?: string | null
          hobbies?: string[] | null
          id?: string
          ideal_age_max?: number | null
          ideal_age_min?: number | null
          ideal_education?: string | null
          ideal_gender?: string | null
          ideal_location?: string | null
          ideal_occupation?: string | null
          ideal_personality?: string | null
          introduction?: string | null
          lifestyle_drinking?: string | null
          lifestyle_exercise?: string | null
          lifestyle_pets?: string | null
          lifestyle_smoking?: string | null
          lifestyle_travel?: string | null
          location?: string | null
          name?: string | null
          occupation?: string | null
          personality?: string | null
          religion?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      contact_exchanges: {
        Row: {
          created_at: string
          exchange_status: string
          exchanged_at: string | null
          id: string
          match_proposal_id: string
          proposed_match_contact: string | null
          proposer_contact: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          exchange_status?: string
          exchanged_at?: string | null
          id?: string
          match_proposal_id: string
          proposed_match_contact?: string | null
          proposer_contact?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          exchange_status?: string
          exchanged_at?: string | null
          id?: string
          match_proposal_id?: string
          proposed_match_contact?: string | null
          proposer_contact?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_exchanges_match_proposal_id_fkey"
            columns: ["match_proposal_id"]
            isOneToOne: false
            referencedRelation: "match_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      match_payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          match_proposal_id: string
          paid_at: string | null
          payment_status: string
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          match_proposal_id: string
          paid_at?: string | null
          payment_status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          match_proposal_id?: string
          paid_at?: string | null
          payment_status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "match_payments_match_proposal_id_fkey"
            columns: ["match_proposal_id"]
            isOneToOne: false
            referencedRelation: "match_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      match_proposals: {
        Row: {
          admin_id: string
          admin_message: string | null
          created_at: string
          expires_at: string | null
          final_status: string | null
          id: string
          proposed_match_id: string
          proposed_match_response: string | null
          proposer_id: string
          proposer_response: string | null
          status: string
          updated_at: string
        }
        Insert: {
          admin_id: string
          admin_message?: string | null
          created_at?: string
          expires_at?: string | null
          final_status?: string | null
          id?: string
          proposed_match_id: string
          proposed_match_response?: string | null
          proposer_id: string
          proposer_response?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          admin_id?: string
          admin_message?: string | null
          created_at?: string
          expires_at?: string | null
          final_status?: string | null
          id?: string
          proposed_match_id?: string
          proposed_match_response?: string | null
          proposer_id?: string
          proposer_response?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_proposed_match"
            columns: ["proposed_match_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_proposer"
            columns: ["proposer_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["user_id"]
          },
        ]
      }
      match_rejections: {
        Row: {
          additional_comments: string | null
          created_at: string
          id: string
          match_proposal_id: string
          rejection_category: string | null
          rejection_reason: string | null
          user_id: string
        }
        Insert: {
          additional_comments?: string | null
          created_at?: string
          id?: string
          match_proposal_id: string
          rejection_category?: string | null
          rejection_reason?: string | null
          user_id: string
        }
        Update: {
          additional_comments?: string | null
          created_at?: string
          id?: string
          match_proposal_id?: string
          rejection_category?: string | null
          rejection_reason?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "match_rejections_match_proposal_id_fkey"
            columns: ["match_proposal_id"]
            isOneToOne: false
            referencedRelation: "match_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      match_responses: {
        Row: {
          id: string
          match_proposal_id: string
          responded_at: string
          response: string
          user_id: string
        }
        Insert: {
          id?: string
          match_proposal_id: string
          responded_at?: string
          response: string
          user_id: string
        }
        Update: {
          id?: string
          match_proposal_id?: string
          responded_at?: string
          response?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "match_responses_match_proposal_id_fkey"
            columns: ["match_proposal_id"]
            isOneToOne: false
            referencedRelation: "match_proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      expire_old_matches: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
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

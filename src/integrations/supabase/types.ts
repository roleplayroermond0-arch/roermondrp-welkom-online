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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          password_hash: string
          totp_secret: string
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          password_hash: string
          totp_secret: string
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          password_hash?: string
          totp_secret?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      application_questions: {
        Row: {
          created_at: string | null
          id: string
          is_required: boolean | null
          job_id: string | null
          options: string[] | null
          order_index: number | null
          question_text: string
          question_type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_required?: boolean | null
          job_id?: string | null
          options?: string[] | null
          order_index?: number | null
          question_text: string
          question_type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_required?: boolean | null
          job_id?: string | null
          options?: string[] | null
          order_index?: number | null
          question_text?: string
          question_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "application_questions_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      Banen: {
        Row: {
          created_at: string
          id: number
          "Naam Baan": string | null
        }
        Insert: {
          created_at?: string
          id?: number
          "Naam Baan"?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          "Naam Baan"?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_accepting_applications: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_accepting_applications?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_accepting_applications?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          birth_date: string | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          birth_date?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          birth_date?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
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

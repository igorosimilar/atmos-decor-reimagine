export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      company_settings: {
        Row: {
          availability_hours: number | null
          company_name: string
          description: string | null
          founded_year: number | null
          id: string
          logo_url: string | null
          meta_description: string | null
          meta_title: string | null
          projects_completed: number | null
          updated_at: string
          years_experience: number | null
        }
        Insert: {
          availability_hours?: number | null
          company_name?: string
          description?: string | null
          founded_year?: number | null
          id?: string
          logo_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          projects_completed?: number | null
          updated_at?: string
          years_experience?: number | null
        }
        Update: {
          availability_hours?: number | null
          company_name?: string
          description?: string | null
          founded_year?: number | null
          id?: string
          logo_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          projects_completed?: number | null
          updated_at?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          address_main: string | null
          address_secondary: string | null
          email_primary: string | null
          email_secondary: string | null
          facebook_url: string | null
          id: string
          instagram_url: string | null
          linkedin_url: string | null
          phone_primary: string | null
          phone_secondary: string | null
          updated_at: string
          working_hours: string | null
        }
        Insert: {
          address_main?: string | null
          address_secondary?: string | null
          email_primary?: string | null
          email_secondary?: string | null
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          phone_primary?: string | null
          phone_secondary?: string | null
          updated_at?: string
          working_hours?: string | null
        }
        Update: {
          address_main?: string | null
          address_secondary?: string | null
          email_primary?: string | null
          email_secondary?: string | null
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          phone_primary?: string | null
          phone_secondary?: string | null
          updated_at?: string
          working_hours?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          category: Database["public"]["Enums"]["portfolio_category"]
          created_at: string
          description: string
          id: string
          image_url: string | null
          is_active: boolean
          location: string
          sort_order: number
          title: string
          updated_at: string
          year: string
        }
        Insert: {
          category: Database["public"]["Enums"]["portfolio_category"]
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          location: string
          sort_order?: number
          title: string
          updated_at?: string
          year: string
        }
        Update: {
          category?: Database["public"]["Enums"]["portfolio_category"]
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          location?: string
          sort_order?: number
          title?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          content: string
          created_at: string
          id: string
          is_active: boolean
          location: string
          name: string
          project: string | null
          rating: number
          role: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_active?: boolean
          location: string
          name: string
          project?: string | null
          rating?: number
          role: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean
          location?: string
          name?: string
          project?: string | null
          rating?: number
          role?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      portfolio_category:
        | "Remodelação Residencial"
        | "Decoração de Interiores"
        | "Espaço Comercial"
        | "Projeto Premium"
        | "Remodelação Completa"
        | "Casa de Campo"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      portfolio_category: [
        "Remodelação Residencial",
        "Decoração de Interiores",
        "Espaço Comercial",
        "Projeto Premium",
        "Remodelação Completa",
        "Casa de Campo",
      ],
    },
  },
} as const

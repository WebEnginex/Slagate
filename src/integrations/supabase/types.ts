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
      artefacts: {
        Row: {
          categorie: string | null
          created_at: string | null
          id: string
          image: string | null
          nom: string
        }
        Insert: {
          categorie?: string | null
          created_at?: string | null
          id?: string
          image?: string | null
          nom: string
        }
        Update: {
          categorie?: string | null
          created_at?: string | null
          id?: string
          image?: string | null
          nom?: string
        }
        Relationships: []
      }
      bosses: {
        Row: {
          faiblesse1: string | null
          faiblesse2: string | null
          id: string
          image: string | null
          nom: string
        }
        Insert: {
          faiblesse1?: string | null
          faiblesse2?: string | null
          id?: string
          image?: string | null
          nom: string
        }
        Update: {
          faiblesse1?: string | null
          faiblesse2?: string | null
          id?: string
          image?: string | null
          nom?: string
        }
        Relationships: []
      }
      chasseurs: {
        Row: {
          element: string | null
          id: string
          image: string | null
          nom: string
          rarete: string | null
        }
        Insert: {
          element?: string | null
          id?: string
          image?: string | null
          nom: string
          rarete?: string | null
        }
        Update: {
          element?: string | null
          id?: string
          image?: string | null
          nom?: string
          rarete?: string | null
        }
        Relationships: []
      }
      jinwoo: {
        Row: {
          id: string
          image: string | null
          nom: string
        }
        Insert: {
          id?: string
          image?: string | null
          nom: string
        }
        Update: {
          id?: string
          image?: string | null
          nom?: string
        }
        Relationships: []
      }
      jinwoo_armes: {
        Row: {
          arme_element: string | null
          created_at: string | null
          element: string | null
          id: string
          image: string | null
          nom: string
        }
        Insert: {
          arme_element?: string | null
          created_at?: string | null
          element?: string | null
          id?: string
          image?: string | null
          nom: string
        }
        Update: {
          arme_element?: string | null
          created_at?: string | null
          element?: string | null
          id?: string
          image?: string | null
          nom?: string
        }
        Relationships: []
      }
      jinwoo_competences: {
        Row: {
          element: string | null
          id: string
          image: string | null
          nom: string
        }
        Insert: {
          element?: string | null
          id?: string
          image?: string | null
          nom: string
        }
        Update: {
          element?: string | null
          id?: string
          image?: string | null
          nom?: string
        }
        Relationships: []
      }
      jinwoo_qte: {
        Row: {
          element: string | null
          id: string
          image: string | null
          nom: string
        }
        Insert: {
          element?: string | null
          id?: string
          image?: string | null
          nom: string
        }
        Update: {
          element?: string | null
          id?: string
          image?: string | null
          nom?: string
        }
        Relationships: []
      }
      noyaux: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          nom: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          nom: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          nom?: string
        }
        Relationships: []
      }
      ombres: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          nom: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          nom: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          nom?: string
        }
        Relationships: []
      }
      pierres_benediction: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          nom: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          nom: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          nom?: string
        }
        Relationships: []
      }
      stats: {
        Row: {
          id: string
          nom: string
        }
        Insert: {
          id?: string
          nom: string
        }
        Update: {
          id?: string
          nom?: string
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
    Enums: {},
  },
} as const

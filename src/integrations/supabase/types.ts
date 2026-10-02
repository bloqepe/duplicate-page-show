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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      bloque: {
        Row: {
          cantidad_max: number | null
          fecha_apertura: string | null
          fecha_cierre: string | null
          id: number
          nombre: string
          total: number | null
        }
        Insert: {
          cantidad_max?: number | null
          fecha_apertura?: string | null
          fecha_cierre?: string | null
          id?: never
          nombre: string
          total?: number | null
        }
        Update: {
          cantidad_max?: number | null
          fecha_apertura?: string | null
          fecha_cierre?: string | null
          id?: never
          nombre?: string
          total?: number | null
        }
        Relationships: []
      }
      cliente: {
        Row: {
          fuente: string | null
          id: number
          telefono: string | null
        }
        Insert: {
          fuente?: string | null
          id?: never
          telefono?: string | null
        }
        Update: {
          fuente?: string | null
          id?: never
          telefono?: string | null
        }
        Relationships: []
      }
      empresa: {
        Row: {
          cliente_id: number
          id: number
          nombre: string
        }
        Insert: {
          cliente_id: number
          id?: never
          nombre: string
        }
        Update: {
          cliente_id?: number
          id?: never
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "empresa_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: true
            referencedRelation: "cliente"
            referencedColumns: ["id"]
          },
        ]
      }
      estado: {
        Row: {
          id: number
          nombre: string
        }
        Insert: {
          id?: never
          nombre: string
        }
        Update: {
          id?: never
          nombre?: string
        }
        Relationships: []
      }
      pedido: {
        Row: {
          bloque_id: number | null
          cliente_id: number
          estado_id: number | null
          fecha_pedido: string
          id: number
          total: number | null
        }
        Insert: {
          bloque_id?: number | null
          cliente_id: number
          estado_id?: number | null
          fecha_pedido?: string
          id?: never
          total?: number | null
        }
        Update: {
          bloque_id?: number | null
          cliente_id?: number
          estado_id?: number | null
          fecha_pedido?: string
          id?: never
          total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pedido_bloque_id_fkey"
            columns: ["bloque_id"]
            isOneToOne: false
            referencedRelation: "bloque"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedido_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "cliente"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedido_estado_id_fkey"
            columns: ["estado_id"]
            isOneToOne: false
            referencedRelation: "estado"
            referencedColumns: ["id"]
          },
        ]
      }
      persona: {
        Row: {
          apellido: string | null
          cliente_id: number
          id: number
          nombre: string
        }
        Insert: {
          apellido?: string | null
          cliente_id: number
          id?: never
          nombre: string
        }
        Update: {
          apellido?: string | null
          cliente_id?: number
          id?: never
          nombre?: string
        }
        Relationships: [
          {
            foreignKeyName: "persona_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: true
            referencedRelation: "cliente"
            referencedColumns: ["id"]
          },
        ]
      }
      producto: {
        Row: {
          bloque_id: number | null
          costo: number
          id: number
          justificacion: string | null
          margen: number | null
          nombre: string
          precio_oferta: number | null
          precio_referencia: number | null
          sector_id: number | null
          tamaño: string | null
        }
        Insert: {
          bloque_id?: number | null
          costo: number
          id?: never
          justificacion?: string | null
          margen?: number | null
          nombre: string
          precio_oferta?: number | null
          precio_referencia?: number | null
          sector_id?: number | null
          tamaño?: string | null
        }
        Update: {
          bloque_id?: number | null
          costo?: number
          id?: never
          justificacion?: string | null
          margen?: number | null
          nombre?: string
          precio_oferta?: number | null
          precio_referencia?: number | null
          sector_id?: number | null
          tamaño?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "producto_bloque_id_fkey"
            columns: ["bloque_id"]
            isOneToOne: false
            referencedRelation: "bloque"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "producto_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sector"
            referencedColumns: ["id"]
          },
        ]
      }
      producto_pedido: {
        Row: {
          pedido_id: number
          precio_venta: number
          producto_id: number
          unidades: number
        }
        Insert: {
          pedido_id: number
          precio_venta: number
          producto_id: number
          unidades?: number
        }
        Update: {
          pedido_id?: number
          precio_venta?: number
          producto_id?: number
          unidades?: number
        }
        Relationships: [
          {
            foreignKeyName: "producto_pedido_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedido"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "producto_pedido_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "producto"
            referencedColumns: ["id"]
          },
        ]
      }
      sector: {
        Row: {
          id: number
          nombre: string
        }
        Insert: {
          id?: never
          nombre: string
        }
        Update: {
          id?: never
          nombre?: string
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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

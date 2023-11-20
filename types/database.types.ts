export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          body: string | null
          date: string | null
          id: string
          owned_by: string | null
          title: string | null
        }
        Insert: {
          body?: string | null
          date?: string | null
          id: string
          owned_by?: string | null
          title?: string | null
        }
        Update: {
          body?: string | null
          date?: string | null
          id?: string
          owned_by?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_owned_by_fkey"
            columns: ["owned_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      test_tenant: {
        Row: {
          details: string | null
          id: number
        }
        Insert: {
          details?: string | null
          id?: number
        }
        Update: {
          details?: string | null
          id?: number
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


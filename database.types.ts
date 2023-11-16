export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          body: string | null;
          created_at: string;
          date: string | null;
          id: string;
          title: string | null;
        };
        Insert: {
          body?: string | null;
          created_at?: string;
          date?: string | null;
          id: string;
          title?: string | null;
        };
        Update: {
          body?: string | null;
          created_at?: string;
          date?: string | null;
          id?: string;
          title?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

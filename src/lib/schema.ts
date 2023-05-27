export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          article: string | null
          audio: string
          author_id: string
          created_at: string
          id: string
          image: string | null
          title: string
        }
        Insert: {
          article?: string | null
          audio: string
          author_id: string
          created_at?: string
          id?: string
          image?: string | null
          title: string
        }
        Update: {
          article?: string | null
          audio?: string
          author_id?: string
          created_at?: string
          id?: string
          image?: string | null
          title?: string
        }
      }
      user_roles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["role"]
          user_id: string
        }
        Insert: {
          id?: number
          role?: Database["public"]["Enums"]["role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["role"]
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      role: "USER" | "AUTHOR" | "ADMIN"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

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
      attempts: {
        Row: {
          id: number
          gym_name: string
          grade_name: string
          outcome: string
          date: string
          user_id: string
        }
        Insert: {
          id?: number
          gym_name: string
          grade_name: string
          outcome: string
          date: string
          user_id: string
        }
        Update: {
          id?: number
          gym_name?: string
          grade_name?: string
          outcome?: string
          date?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

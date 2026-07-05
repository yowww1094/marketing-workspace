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
      products: {
        Row: {
          id: string
          user_id: string
          status: 'draft' | 'processing' | 'completed' | 'failed'
          name: string
          category: string
          description: string
          price: string | null
          features: string[] | null
          unique_selling_points: string[] | null
          product_url: string | null
          brand_name: string | null
          brand_story: string | null
          brand_voice: string | null
          brand_personality: string | null
          brand_values: string[] | null
          target_audience_age: string | null
          target_audience_gender: string | null
          target_audience_interests: string[] | null
          target_audience_pain_points: string[] | null
          buying_motivations: string[] | null
          target_country: string | null
          target_language: string | null
          target_currency: string | null
          known_competitors: string[] | null
          competitor_urls: string[] | null
          business_goals: string[] | null
          ai_product_analysis: Json | null
          ai_market_research: Json | null
          ai_competitor_analysis: Json | null
          ai_customer_personas: Json | null
          ai_positioning: Json | null
          ai_value_proposition: Json | null
          ai_marketing_strategy: Json | null
          ai_seo_strategy: Json | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      workflows: {
        Row: {
          id: string
          product_id: string
          status: 'pending' | 'running' | 'completed' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['workflows']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['workflows']['Insert']>
      }
      jobs: {
        Row: {
          id: string
          workflow_id: string
          type: string
          status: 'pending' | 'running' | 'completed' | 'failed'
          dependencies: string[] | null
          result: Json | null
          error: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['jobs']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['jobs']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      product_status: 'draft' | 'processing' | 'completed' | 'failed'
      workflow_status: 'pending' | 'running' | 'completed' | 'failed'
      job_status: 'pending' | 'running' | 'completed' | 'failed'
    }
  }
}

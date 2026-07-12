export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type ProductRow = {
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
  image_urls: string[] | null
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

type WorkflowRow = {
  id: string
  product_id: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  created_at: string
  updated_at: string
}

type ReportRow = {
  id: string
  user_id: string
  product_id: string
  name: string
  type: string
  size_bytes: number
  storage_path: string
  created_at: string
  updated_at: string
}

type JobRow = {
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

type SubscriptionRow = {
  id: string
  user_id: string
  plan_id: string
  status: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  current_period_start: number | null
  current_period_end: number | null
  created_at: string
  updated_at: string
}

type SystemLogRow = {
  id: string
  level: 'info' | 'warn' | 'error' | 'fatal'
  message: string
  stack_trace: string | null
  url: string | null
  method: string | null
  user_id: string | null
  browser: string | null
  client_ip: string | null
  metadata: Json | null
  created_at: string
}

type ProductInsert = Omit<ProductRow, 'id' | 'created_at' | 'updated_at'>
type ProductUpdate = Partial<ProductInsert>

type WorkflowInsert = Omit<WorkflowRow, 'id' | 'created_at' | 'updated_at'>
type WorkflowUpdate = Partial<WorkflowInsert>

type ReportInsert = Omit<ReportRow, 'id' | 'created_at' | 'updated_at'>
type ReportUpdate = Partial<ReportInsert>

type JobInsert = Omit<JobRow, 'id' | 'created_at' | 'updated_at'>
type JobUpdate = Partial<JobInsert>

type SubscriptionInsert = Omit<SubscriptionRow, 'id' | 'created_at' | 'updated_at'>
type SubscriptionUpdate = Partial<SubscriptionInsert>

type SystemLogInsert = Omit<SystemLogRow, 'id' | 'created_at'>
type SystemLogUpdate = Partial<SystemLogInsert>

export interface Database {
  public: {
    Tables: {
      products: {
        Row: ProductRow
        Insert: ProductInsert
        Update: ProductUpdate
      }
      workflows: {
        Row: WorkflowRow
        Insert: WorkflowInsert
        Update: WorkflowUpdate
      }
      reports: {
        Row: ReportRow
        Insert: ReportInsert
        Update: ReportUpdate
      }
      jobs: {
        Row: JobRow
        Insert: JobInsert
        Update: JobUpdate
      }
      subscriptions: {
        Row: SubscriptionRow
        Insert: SubscriptionInsert
        Update: SubscriptionUpdate
      }
      system_logs: {
        Row: SystemLogRow
        Insert: SystemLogInsert
        Update: SystemLogUpdate
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

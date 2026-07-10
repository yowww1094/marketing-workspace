import { SupabaseClient, createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export type TypedSupabaseClient = SupabaseClient<Database>;

export function createServiceRoleClient(): TypedSupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase env variables for service role client');
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

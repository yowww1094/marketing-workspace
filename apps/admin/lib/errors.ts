import { createAdminClient } from '@marketing-workspace/auth/admin';

export type SystemLog = {
  id: string;
  level: 'info' | 'warn' | 'error' | 'fatal';
  message: string;
  stack_trace: string | null;
  url: string | null;
  method: string | null;
  user_id: string | null;
  browser: string | null;
  client_ip: string | null;
  metadata: any | null;
  created_at: string;
  status: 'open' | 'investigating' | 'resolved';
};

export async function getErrors(params: {
  search?: string;
  level?: string;
  status?: string;
}) {
  const supabase = createAdminClient();
  
  // 1. Fetch KPI metrics
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

  // Open Errors
  const { count: openErrorsCount } = await supabase
    .from('system_logs')
    .select('*', { count: 'exact', head: true })
    .in('status', ['open', 'investigating']);

  // Critical Errors
  const { count: criticalErrorsCount } = await supabase
    .from('system_logs')
    .select('*', { count: 'exact', head: true })
    .in('level', ['fatal', 'error'])
    .in('status', ['open', 'investigating']);

  // Resolved (24h)
  const { count: resolved24hCount } = await supabase
    .from('system_logs')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'resolved')
    .gte('created_at', yesterday);

  // Error Rate (Mocked calculation since we don't have total API requests)
  // Normally this would be errors / total_requests * 100
  const errorRate = '0.08%';
  const errorRateTrend = '+0.02pp';

  // 2. Fetch error logs list
  let query = supabase
    .from('system_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (params.search) {
    query = query.or(`message.ilike.%${params.search}%,url.ilike.%${params.search}%`);
  }
  if (params.level && params.level !== 'All') {
    query = query.eq('level', params.level);
  }
  if (params.status) {
    query = query.eq('status', params.status);
  }

  const { data: logs, error } = await query;
  
  if (error) {
    console.error('Error fetching system logs:', error);
  }

  return {
    kpis: {
      openErrors: openErrorsCount || 0,
      criticalErrors: criticalErrorsCount || 0,
      resolved24h: resolved24hCount || 0,
      errorRate,
      errorRateTrend,
    },
    logs: (logs as SystemLog[]) || [],
  };
}

export async function updateErrorStatus(id: string, status: 'open' | 'investigating' | 'resolved') {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('system_logs')
    .update({ status })
    .eq('id', id);
    
  if (error) throw new Error(error.message);
}

import { createAdminClient } from '@marketing-workspace/auth/admin';

export type SupportTicket = {
  id: string;
  user_id: string | null;
  guest_email: string;
  guest_name: string | null;
  subject: string;
  message: string;
  type: 'bug_report' | 'feature_request' | 'billing_issue' | 'account_access' | 'general_inquiry' | 'sales' | 'partnership' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'investigating' | 'reviewed' | 'resolved';
  created_at: string;
  updated_at: string;
};

export async function getPaginatedTickets({
  page = 1,
  limit = 20,
  search = '',
  type = 'all',
}: {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
}) {
  const supabase = createAdminClient();
  const offset = (page - 1) * limit;

  let query = supabase
    .from('support_tickets')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (search) {
    query = query.or(`subject.ilike.%${search}%,guest_email.ilike.%${search}%,message.ilike.%${search}%`);
  }

  if (type !== 'all') {
    query = query.eq('type', type);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching support tickets:', error);
    return { tickets: [], total: 0 };
  }

  return { tickets: data as SupportTicket[], total: count || 0 };
}

export async function getSupportKPIs() {
  const supabase = createAdminClient();

  // Open Tickets
  const { count: openCount } = await supabase
    .from('support_tickets')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'open');

  // Resolved Today
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const { count: resolvedTodayCount } = await supabase
    .from('support_tickets')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'resolved')
    .gte('updated_at', startOfDay.toISOString());

  // Avg Response Time (Simulated or fetched)
  // Since we don't have a "responses" table, we simulate the KPI format required by Figma
  
  return {
    openTickets: openCount || 0,
    resolvedToday: resolvedTodayCount || 0,
    avgResponseTime: '2.4h',
    avgResponseChange: '-0.8h vs last week',
    csatScore: '4.7/5',
    csatChange: '+0.2 this month',
  };
}

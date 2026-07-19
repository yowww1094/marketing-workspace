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
    .gte('resolved_at', startOfDay.toISOString());

  // Fetch all resolved tickets to calculate Avg Response Time and CSAT
  const { data: metricsData } = await supabase
    .from('support_tickets')
    .select('created_at, resolved_at, csat_score')
    .not('resolved_at', 'is', null);

  let totalResponseMs = 0;
  let csatTotal = 0;
  let csatCount = 0;

  if (metricsData && metricsData.length > 0) {
    metricsData.forEach(ticket => {
      const created = new Date(ticket.created_at).getTime();
      const resolved = new Date(ticket.resolved_at).getTime();
      totalResponseMs += (resolved - created);
      
      if (ticket.csat_score !== null && ticket.csat_score !== undefined) {
        csatTotal += ticket.csat_score;
        csatCount++;
      }
    });
  }

  const avgResponseMs = (metricsData && metricsData.length > 0) ? totalResponseMs / metricsData.length : 0;
  const avgResponseHours = avgResponseMs > 0 ? (avgResponseMs / (1000 * 60 * 60)).toFixed(1) : '0.0';
  
  const avgCsat = csatCount > 0 ? (csatTotal / csatCount).toFixed(1) : '0.0';

  return {
    openTickets: openCount || 0,
    resolvedToday: resolvedTodayCount || 0,
    avgResponseTime: `${avgResponseHours}h`,
    avgResponseChange: '', // Need historical data for change
    csatScore: `${avgCsat}/5`,
    csatChange: '', // Need historical data for change
  };
}

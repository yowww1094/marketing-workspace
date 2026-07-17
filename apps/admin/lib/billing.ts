import { createAdminClient } from '@marketing-workspace/auth/admin';

export type BillingMetrics = {
  totalMRR: number;
  activePro: number;
  freeUsers: number;
  churn: number;
  chartData: { name: string; mrr: number; free: number; pro: number }[];
  failedPayments: SubscriptionView[];
};

export type SubscriptionView = {
  id: string;
  user_id: string;
  email: string;
  stripe_customer_id: string | null;
  plan_id: string;
  status: string;
  current_period_end: string | null;
  created_at: string;
};

export async function getBillingMetrics(): Promise<BillingMetrics> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .order('created_at', { ascending: true });

  if (error || !data) {
    console.error('Failed to fetch subscriptions for metrics:', error);
    return { totalMRR: 0, activePro: 0, freeUsers: 0, churn: 0, chartData: [], failedPayments: [] };
  }

  let activePro = 0;
  let freeUsers = 0;
  let churn = 0;
  
  const failedPaymentsData: any[] = [];
  const monthlyData = new Map<string, { mrr: number; free: number; pro: number }>();

  for (const sub of data) {
    const isFailed = sub.status === 'past_due' || sub.status === 'canceled';
    if (isFailed) {
      churn++;
      failedPaymentsData.push(sub);
    } else if (sub.plan_id === 'pro') {
      activePro++;
    } else if (sub.plan_id === 'free') {
      freeUsers++;
    }

    // Chart grouping by month-year
    const date = new Date(sub.created_at);
    const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
    
    if (!monthlyData.has(monthYear)) {
      monthlyData.set(monthYear, { mrr: 0, free: 0, pro: 0 });
    }
    
    const monthStats = monthlyData.get(monthYear)!;
    if (sub.plan_id === 'pro' && !isFailed) {
      monthStats.pro++;
      monthStats.mrr += 50;
    } else if (sub.plan_id === 'free' && !isFailed) {
      monthStats.free++;
    }
  }

  // Calculate cumulative growth for the chart
  const chartData = [];
  let cumMrr = 0;
  let cumFree = 0;
  let cumPro = 0;

  for (const [name, stats] of Array.from(monthlyData.entries())) {
    cumMrr += stats.mrr;
    cumFree += stats.free;
    cumPro += stats.pro;
    chartData.push({ name, mrr: cumMrr, free: cumFree, pro: cumPro });
  }

  // Fetch emails for failed payments
  const userMap = new Map<string, string>();
  for (const uid of Array.from(new Set(failedPaymentsData.map(s => s.user_id)))) {
    try {
      const { data: userData } = await supabase.auth.admin.getUserById(uid);
      if (userData?.user?.email) userMap.set(uid, userData.user.email);
    } catch (e) {}
  }

  const failedPayments = failedPaymentsData.map(s => ({
    id: s.id,
    user_id: s.user_id,
    email: userMap.get(s.user_id) || 'Unknown User',
    stripe_customer_id: s.stripe_customer_id,
    plan_id: s.plan_id,
    status: s.status,
    current_period_end: s.current_period_end,
    created_at: s.created_at,
  }));

  const totalMRR = activePro * 50;

  return {
    totalMRR,
    activePro,
    freeUsers,
    churn,
    chartData,
    failedPayments: failedPayments.slice(0, 10), // latest 10 failed
  };
}

export async function getPaginatedSubscriptions({
  page = 1,
  limit = 10,
  search = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const supabase = createAdminClient();

  // Determine offsets
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // We fetch subscriptions. If search is provided, we must fetch users first
  // since we can't search emails in the 'subscriptions' table directly.
  let targetUserIds: string[] = [];

  if (search) {
    const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers();
    if (!usersError && usersData?.users) {
      targetUserIds = usersData.users
        .filter(u => u.email?.toLowerCase().includes(search.toLowerCase()))
        .map(u => u.id);
    }
    
    // If search yielded no users, return empty early
    if (targetUserIds.length === 0) {
      return {
        subscriptions: [],
        totalCount: 0,
        totalPages: 0,
      };
    }
  }

  let query = supabase
    .from('subscriptions')
    .select('*', { count: 'exact' });

  if (search && targetUserIds.length > 0) {
    query = query.in('user_id', targetUserIds);
  }

  query = query.order('created_at', { ascending: false }).range(from, to);

  const { data: subs, count, error } = await query;

  if (error || !subs) {
    console.error('Error fetching paginated subscriptions:', error);
    return {
      subscriptions: [],
      totalCount: 0,
      totalPages: 0,
    };
  }

  // Cross-reference user emails
  const userIds = subs.map(s => s.user_id);
  const userMap = new Map<string, string>();

  for (const uid of Array.from(new Set(userIds))) {
    try {
      const { data: userData } = await supabase.auth.admin.getUserById(uid);
      if (userData?.user?.email) {
        userMap.set(uid, userData.user.email);
      }
    } catch (e) {
      // Ignore
    }
  }

  const mappedSubs: SubscriptionView[] = subs.map(s => ({
    id: s.id,
    user_id: s.user_id,
    email: userMap.get(s.user_id) || 'Unknown User',
    stripe_customer_id: s.stripe_customer_id,
    plan_id: s.plan_id,
    status: s.status,
    current_period_end: s.current_period_end,
    created_at: s.created_at,
  }));

  return {
    subscriptions: mappedSubs,
    totalCount: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

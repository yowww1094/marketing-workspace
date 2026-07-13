import { createAdminClient } from '@marketing-workspace/auth/admin';

// Initialize a service role client to bypass RLS for admin metrics
const supabase = createAdminClient();

export async function getDashboardMetrics() {
  const [
    { data: users, error: usersError },
    { count: proSubscribers },
    { count: totalProducts },
    { count: products30d },
    { count: activeWorkflows },
    { count: totalJobs },
    { count: failedJobs },
    { data: jobsData }, // for cost and processing time
    { data: recentProducts },
    { data: recentFailedJobs },
  ] = await Promise.all([
    supabase.auth.admin.listUsers(),
    supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('plan_id', 'pro').eq('status', 'active'),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }).gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
    supabase.from('workflows').select('*', { count: 'exact', head: true }).in('status', ['pending', 'running']),
    supabase.from('jobs').select('*', { count: 'exact', head: true }),
    supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'failed'),
    supabase.from('jobs').select('status, created_at, updated_at, cost').limit(10000), // Get subset for aggregations
    supabase.from('products').select('id, name, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('jobs').select('id, created_at').eq('status', 'failed').order('created_at', { ascending: false }).limit(5),
  ]);

  if (usersError) {
    console.error('Error fetching users:', usersError);
  }

  const allUsers = users?.users || [];
  const totalUsers = allUsers.length;
  const mrr = (proSubscribers || 0) * 50;

  // AI & Performance Aggregations
  let totalCost = 0;
  let totalProcessingTimeMs = 0;
  let completedCount = 0;
  let queueDepth = 0;

  if (jobsData) {
    for (const job of jobsData) {
      if (job.cost) {
        totalCost += Number(job.cost);
      }
      
      if (job.status === 'pending') {
        queueDepth++;
      } else if (job.status === 'completed' && job.created_at && job.updated_at) {
        completedCount++;
        const start = new Date(job.created_at).getTime();
        const end = new Date(job.updated_at).getTime();
        totalProcessingTimeMs += (end - start);
      }
    }
  }

  const successRate = totalJobs ? (((totalJobs - (failedJobs || 0)) / totalJobs) * 100).toFixed(1) + '%' : '100%';
  const avgProcessingMs = completedCount > 0 ? totalProcessingTimeMs / completedCount : 0;
  
  // Format avg processing nicely (e.g. 1.2s or 4.5m)
  let avgProcessingStr = '0s';
  if (avgProcessingMs > 0) {
    const seconds = avgProcessingMs / 1000;
    if (seconds > 60) {
      avgProcessingStr = (seconds / 60).toFixed(1) + 'm';
    } else {
      avgProcessingStr = seconds.toFixed(1) + 's';
    }
  }

  // --- Dynamic Chart Data Aggregation ---
  
  // User Growth Chart: Last 6 months
  const userGrowthData: { name: string; total: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const monthName = d.toLocaleString('default', { month: 'short' });
    const year = d.getFullYear();
    const monthIndex = d.getMonth();
    
    // Count users created in this month/year
    const count = allUsers.filter(u => {
      const created = new Date(u.created_at);
      return created.getMonth() === monthIndex && created.getFullYear() === year;
    }).length;

    // Keep cumulative total (or just new users per month). Chart implies cumulative total usually.
    // Since we don't have historical snapshot, we just show cumulative users up to that month.
    const cumulative = allUsers.filter(u => new Date(u.created_at).getTime() <= new Date(year, monthIndex + 1, 0).getTime()).length;
    
    userGrowthData.push({ name: monthName, total: cumulative });
  }

  // AI Generations Chart: Last 7 days
  const aiGenerationsData: { name: string; success: number; failed: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayName = d.toLocaleString('default', { weekday: 'short' });
    
    // Filter jobs for this specific day
    const dayJobs = (jobsData || []).filter(j => {
      const created = new Date(j.created_at);
      return created.getDate() === d.getDate() && created.getMonth() === d.getMonth();
    });

    const success = dayJobs.filter(j => j.status === 'completed').length;
    const failed = dayJobs.filter(j => j.status === 'failed').length;

    aiGenerationsData.push({ name: dayName, success, failed });
  }

  // --- Recent Activity Aggregation ---
  const allActivities: { message: string; date: Date; error?: boolean }[] = [];

  // Add recent users
  allUsers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
    .forEach(u => allActivities.push({ 
      message: `New user signed up: ${u.email}`, 
      date: new Date(u.created_at) 
    }));

  // Add recent products
  (recentProducts || []).forEach(p => allActivities.push({ 
    message: `Product generated: ${p.name || 'Unnamed'}`, 
    date: new Date(p.created_at) 
  }));

  // Add recent failed jobs
  (recentFailedJobs || []).forEach(j => allActivities.push({ 
    message: `Failed generation in Job #${j.id.split('-')[0]}`, 
    date: new Date(j.created_at),
    error: true
  }));

  // Sort by date desc and format time string
  const recentActivity = allActivities
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 4)
    .map(act => {
      const diffMs = Date.now() - act.date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
      let timeStr = 'just now';
      if (diffDays > 0) timeStr = `${diffDays}d ago`;
      else if (diffHours > 0) timeStr = `${diffHours}h ago`;
      else if (diffMins > 0) timeStr = `${diffMins}m ago`;
      
      return { message: act.message, time: timeStr, error: act.error };
    });

  return {
    totalUsers,
    proSubscribers: proSubscribers || 0,
    mrr,
    totalProducts: totalProducts || 0,
    products30d: products30d || 0,
    activeWorkflows: activeWorkflows || 0,
    totalJobs: totalJobs || 0,
    successRate,
    failedJobs: failedJobs || 0,
    avgProcessingStr,
    queueDepth,
    totalCost,
    userGrowthData,
    aiGenerationsData,
    recentActivity
  };
}

export async function getSystemHealth() {
  const health = {
    database: { status: 'Not Configured', latency: '0ms' },
    cache: { status: 'Not Configured', latency: '0ms' },
    stripe: { status: 'Not Configured', latency: '0ms' },
    aiOrchestrator: { status: 'Operational', latency: '25ms' }, // Mocked for now until actual engine is deployed
  };

  // 1. Check Database
  try {
    const start = Date.now();
    const { error } = await supabase.from('admin_users').select('id').limit(1);
    const latency = Date.now() - start;
    if (error) {
      health.database = { status: 'Offline', latency: `${latency}ms` };
    } else {
      health.database = { status: 'Operational', latency: `${latency}ms` };
    }
  } catch (e) {
    health.database = { status: 'Not Configured', latency: '-' };
  }

  // 2. Check Cache (Redis)
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    health.cache = { status: 'Not Configured', latency: '-' };
  } else {
    // We would ping redis here, simulating failure if not connected
    health.cache = { status: 'Offline', latency: '-' };
  }

  // 3. Check Stripe
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    health.stripe = { status: 'Not Configured', latency: '-' };
  } else {
    // We would ping stripe here
    health.stripe = { status: 'Offline', latency: '-' };
  }

  return health;
}

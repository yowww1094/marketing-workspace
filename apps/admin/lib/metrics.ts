import { createClient } from '@supabase/supabase-js';

// Initialize a service role client to bypass RLS for admin metrics
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

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
  ] = await Promise.all([
    supabase.auth.admin.listUsers(),
    supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('plan_id', 'pro').eq('status', 'active'),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }).gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
    supabase.from('workflows').select('*', { count: 'exact', head: true }).in('status', ['pending', 'running']),
    supabase.from('jobs').select('*', { count: 'exact', head: true }),
    supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'failed'),
    supabase.from('jobs').select('status, created_at, updated_at, cost').limit(10000), // Get subset for aggregations
  ]);

  if (usersError) {
    console.error('Error fetching users:', usersError);
  }

  const totalUsers = users?.users?.length || 0;
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
  if (supabaseUrl && supabaseServiceKey) {
    const start = Date.now();
    const { error } = await supabase.from('admin_users').select('id').limit(1);
    const latency = Date.now() - start;
    if (error) {
      health.database = { status: 'Offline', latency: `${latency}ms` };
    } else {
      health.database = { status: 'Operational', latency: `${latency}ms` };
    }
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

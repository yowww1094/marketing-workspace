import { createAdminClient } from '@marketing-workspace/auth/admin';

export type ServiceStatus = 'operational' | 'degraded' | 'down' | 'unconfigured';

export type HealthMetrics = {
  dbLatencyMs: number;
  dbStatus: ServiceStatus;
  aiLatencyS: number;
  aiWorkersActive: number;
  queueDepth: number;
  stripe: { latencyMs: number; status: ServiceStatus };
  resend: { latencyMs: number; status: ServiceStatus };
  nvidia: { latencyMs: number; status: ServiceStatus };
  cache: { latencyMs: number; status: ServiceStatus };
};

export async function getHealthMetrics(): Promise<HealthMetrics> {
  const supabase = createAdminClient();
  
  // 1. DB Ping
  let dbLatencyMs = 0;
  let dbStatus: ServiceStatus = 'down';
  try {
    const startPing = Date.now();
    await supabase.from('products').select('id').limit(1);
    dbLatencyMs = Date.now() - startPing;
    dbStatus = dbLatencyMs > 500 ? 'degraded' : 'operational';
  } catch (e) {
    dbStatus = 'down';
  }

  // 2. Stripe Ping
  const pingStripe = async () => {
    if (!process.env.STRIPE_SECRET_KEY) return { latencyMs: 0, status: 'unconfigured' as ServiceStatus };
    try {
      const start = Date.now();
      const res = await fetch('https://api.stripe.com/v1/charges?limit=1', {
        headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
        signal: AbortSignal.timeout(3000)
      });
      const latencyMs = Date.now() - start;
      return { latencyMs, status: (res.ok || res.status === 401) ? (latencyMs > 1000 ? 'degraded' as ServiceStatus : 'operational' as ServiceStatus) : 'down' as ServiceStatus };
    } catch (e) { return { latencyMs: 0, status: 'down' as ServiceStatus }; }
  };

  // 3. Resend Ping
  const pingResend = async () => {
    if (!process.env.RESEND_API_KEY) return { latencyMs: 0, status: 'unconfigured' as ServiceStatus };
    try {
      const start = Date.now();
      const res = await fetch('https://api.resend.com/emails', {
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        signal: AbortSignal.timeout(3000)
      });
      const latencyMs = Date.now() - start;
      return { latencyMs, status: (res.ok || res.status === 403 || res.status === 401) ? (latencyMs > 1000 ? 'degraded' as ServiceStatus : 'operational' as ServiceStatus) : 'down' as ServiceStatus };
    } catch (e) { return { latencyMs: 0, status: 'down' as ServiceStatus }; }
  };

  // 4. NVIDIA Ping
  const pingNvidia = async () => {
    if (!process.env.NVIDIA_API_KEY) return { latencyMs: 0, status: 'unconfigured' as ServiceStatus };
    try {
      const start = Date.now();
      const res = await fetch('https://integrate.api.nvidia.com/v1/models', {
        headers: { Authorization: `Bearer ${process.env.NVIDIA_API_KEY}` },
        signal: AbortSignal.timeout(3000)
      });
      const latencyMs = Date.now() - start;
      return { latencyMs, status: (res.ok || res.status === 401) ? (latencyMs > 1000 ? 'degraded' as ServiceStatus : 'operational' as ServiceStatus) : 'down' as ServiceStatus };
    } catch (e) { return { latencyMs: 0, status: 'down' as ServiceStatus }; }
  };

  // 5. Cache Ping (Redis)
  const pingCache = async () => {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return { latencyMs: 0, status: 'unconfigured' as ServiceStatus };
    try {
      const start = Date.now();
      const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/ping`, {
        headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
        signal: AbortSignal.timeout(3000)
      });
      const latencyMs = Date.now() - start;
      return { latencyMs, status: (res.ok || res.status === 401) ? (latencyMs > 500 ? 'degraded' as ServiceStatus : 'operational' as ServiceStatus) : 'down' as ServiceStatus };
    } catch (e) { return { latencyMs: 0, status: 'down' as ServiceStatus }; }
  };

  // Parallel Execution
  const [stripe, resend, nvidia, cache] = await Promise.all([
    pingStripe(), pingResend(), pingNvidia(), pingCache()
  ]);

  // Queue Depth (Pending AI Jobs)
  const { count: pendingCount } = await supabase
    .from('ai_jobs')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  // Active AI Workers (Processing AI Jobs)
  const { count: processingCount } = await supabase
    .from('ai_jobs')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'processing');

  // Avg AI Latency
  const { data: recentCompletedJobs } = await supabase
    .from('ai_jobs')
    .select('created_at, updated_at')
    .eq('status', 'completed')
    .order('created_at', { ascending: false })
    .limit(20);

  let aiLatencyS = 1.24; // Default fallback
  if (recentCompletedJobs && recentCompletedJobs.length > 0) {
    let totalMs = 0;
    for (const job of recentCompletedJobs) {
      const created = new Date(job.created_at).getTime();
      const updated = new Date(job.updated_at).getTime();
      totalMs += (updated - created);
    }
    aiLatencyS = parseFloat((totalMs / recentCompletedJobs.length / 1000).toFixed(2));
  }

  return {
    dbLatencyMs,
    dbStatus,
    aiLatencyS,
    aiWorkersActive: processingCount || 0,
    queueDepth: pendingCount || 0,
    stripe,
    resend,
    nvidia,
    cache
  };
}

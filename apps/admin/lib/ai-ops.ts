import { createAdminClient } from '@marketing-workspace/auth/admin';

export type JobView = {
  id: string;
  workflow_id: string;
  type: string;
  status: string;
  error?: string;
  cost?: number;
  created_at: string;
  updated_at: string;
};

export async function getAIOperationsData() {
  const supabase = createAdminClient();

  // 1. Fetch aggregate metrics
  const { data: allJobs, error: jobsError } = await supabase
    .from('jobs')
    .select('id, workflow_id, status, type, cost, error, result, created_at, updated_at')
    .limit(50000); 

  if (jobsError) {
    console.error('Error fetching jobs for AI ops:', jobsError);
  }

  // Fetch AI configs to determine model and provider
  const { data: allConfigs, error: configsError } = await supabase
    .from('ai_job_configs')
    .select('*');

  if (configsError) {
    console.error('Error fetching AI configs:', configsError);
  }

  const jobs = allJobs || [];
  const configs = allConfigs || [];
  const configMap = new Map(configs.map(c => [c.job_type, c]));

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  let totalGenerations = jobs.length;
  let todaysGenerations = 0;
  let todaysFailed = 0;
  let tokensSpent = 0;
  let estimatedCost = 0;
  let totalProcessingTimeMs = 0;
  let completedCount = 0;
  
  const activeGenerations: JobView[] = [];
  const failedGenerations: JobView[] = [];

  // Group metrics per job_type for the Model Health table
  const jobStats: Record<string, { requests: number, success: number, timeMs: number }> = {};
  for (const c of configs) {
    jobStats[c.job_type] = { requests: 0, success: 0, timeMs: 0 };
  }

  for (const job of jobs) {
    const jobConfig = configMap.get(job.type);
    const isPaidModel = jobConfig?.provider === 'openai' || jobConfig?.provider === 'anthropic';
    const createdAtTime = new Date(job.created_at).getTime();
    const isToday = createdAtTime >= startOfToday;

    if (isToday) todaysGenerations++;

    // Init stats group if missing
    if (!jobStats[job.type]) jobStats[job.type] = { requests: 0, success: 0, timeMs: 0 };
    jobStats[job.type]!.requests++;

    // Tokens estimation (1 token ~= 4 chars of result)
    let jobTokens = 0;
    if (job.result) {
      jobTokens = Math.ceil(JSON.stringify(job.result).length / 4);
      tokensSpent += jobTokens;
    }

    if (isPaidModel) {
      // Rough mock cost: e.g., $0.01 per 1000 tokens
      estimatedCost += (jobTokens / 1000) * 0.01;
    }

    if (job.status === 'pending' || job.status === 'running') {
      activeGenerations.push(job);
    } else if (job.status === 'completed' && job.created_at && job.updated_at) {
      completedCount++;
      jobStats[job.type]!.success++;
      const start = new Date(job.created_at).getTime();
      const end = new Date(job.updated_at).getTime();
      const elapsed = end - start;
      totalProcessingTimeMs += elapsed;
      jobStats[job.type]!.timeMs += elapsed;
    } else if (job.status === 'failed') {
      failedGenerations.push(job);
      if (isToday) todaysFailed++;
    }
  }

  const avgProcessingMs = completedCount > 0 ? totalProcessingTimeMs / completedCount : 0;
  let avgResponseTimeStr = '0s';
  if (avgProcessingMs > 0) {
    avgResponseTimeStr = (avgProcessingMs / 1000).toFixed(1) + 's';
  }

  // Sort lists (newest first)
  activeGenerations.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  failedGenerations.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // 2. Generate Model Health Data
  const modelHealth = configs.map(config => {
    const stats = jobStats[config.job_type] || { requests: 0, success: 0, timeMs: 0 };
    const successRate = stats.requests > 0 
      ? ((stats.success / stats.requests) * 100).toFixed(1) + '%' 
      : '100%';
    const avgLatency = stats.success > 0 
      ? (stats.timeMs / stats.success / 1000).toFixed(1) + 's' 
      : '0s';
      
    // Determine status
    let status = 'Operational';
    if (stats.requests > 0) {
      const rateNum = stats.success / stats.requests;
      if (rateNum < 0.5) status = 'Offline';
      else if (rateNum < 0.9) status = 'Degraded';
    }

    return {
      type: config.job_type,
      model_name: config.model_name,
      provider: config.provider,
      status,
      latency: avgLatency,
      requests: stats.requests,
      successRate,
    };
  });

  return {
    totalGenerations,
    todaysGenerations,
    todaysFailed,
    tokensSpent,
    estimatedCost,
    avgResponseTimeStr,
    activeGenerations: activeGenerations.slice(0, 50),
    failedGenerations: failedGenerations.slice(0, 50),
    modelHealth,
  };
}

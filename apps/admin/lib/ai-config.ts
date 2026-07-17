import { createAdminClient } from '@marketing-workspace/auth/admin';

export type AIJobConfig = {
  job_type: string;
  provider: string;
  model_name: string;
  system_prompt: string;
  temperature: number;
};

export type AIConfigMetrics = {
  activeModelsCount: number;
  avgLatency: string;
  avgSuccessRate: string;
};

export async function getAIConfigs() {
  const supabase = createAdminClient();

  const { data: configs, error: configsError } = await supabase
    .from('ai_job_configs')
    .select('*')
    .order('job_type', { ascending: true });

  if (configsError) {
    console.error('Error fetching AI configs:', configsError);
    return { configs: [], metrics: { activeModelsCount: 0, avgLatency: '0s', avgSuccessRate: '100%' } };
  }

  // To match the user request for KPIs: current used models (count), latency, cost, and status.
  // We can fetch jobs to compute real latency and cost for these models.
  const { data: jobs, error: jobsError } = await supabase
    .from('jobs')
    .select('status, cost, created_at, updated_at')
    .limit(50000);

  const activeModelsCount = new Set(configs?.map(c => c.model_name)).size;
  
  let totalLatencyMs = 0;
  let totalSuccess = 0;
  let completedCount = 0;
  let totalCost = 0;
  let totalRequests = (jobs || []).length;

  for (const job of (jobs || [])) {
    if (job.cost) totalCost += Number(job.cost);
    
    if (job.status === 'completed' && job.created_at && job.updated_at) {
      completedCount++;
      totalSuccess++;
      totalLatencyMs += new Date(job.updated_at).getTime() - new Date(job.created_at).getTime();
    }
  }

  const avgLatencyMs = completedCount > 0 ? totalLatencyMs / completedCount : 0;
  const avgLatency = avgLatencyMs > 0 ? (avgLatencyMs / 1000).toFixed(1) + 's' : '0s';
  const avgSuccessRate = totalRequests > 0 ? ((totalSuccess / totalRequests) * 100).toFixed(1) + '%' : '100%';

  return {
    configs: (configs || []) as AIJobConfig[],
    metrics: {
      activeModelsCount,
      avgLatency,
      avgSuccessRate,
      totalCost
    }
  };
}

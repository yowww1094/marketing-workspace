import { WORKFLOW_DAG } from './dag';
import { executeAIJob } from '@marketing-workspace/ai';

export async function createJobsForWorkflow(supabase: any, workflowId: string) {
  const jobsToInsert = WORKFLOW_DAG.map(def => ({
    workflow_id: workflowId,
    type: def.type,
    status: 'pending',
    dependencies: def.dependencies,
  }));

  const { error } = await supabase
    .from('jobs')
    .insert(jobsToInsert);

  if (error) {
    throw new Error(`Failed to create jobs: ${error.message}`);
  }
}

export async function tickWorkflowEngine(supabase: any, workflowId: string) {
  // Fetch all jobs for workflow
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('workflow_id', workflowId);
    
  if (error || !jobs) return;

  // Find jobs that are pending and all dependencies are completed
  const pendingJobs = jobs.filter((j: any) => j.status === 'pending');
  
  const eligibleJobs = pendingJobs.filter((pendingJob: any) => {
    // A job is eligible if ALL of its dependencies are 'completed'
    const deps = pendingJob.dependencies || [];
    if (deps.length === 0) return true;
    
    return deps.every((depType: string) => {
      const depJob = jobs.find((j: any) => j.type === depType);
      return depJob?.status === 'completed';
    });
  });

  // Check if entire workflow is done
  if (pendingJobs.length === 0) {
    const runningJobs = jobs.filter((j: any) => j.status === 'running');
    if (runningJobs.length === 0) {
      // Update workflow status to completed
      await supabase.from('workflows').update({ status: 'completed' }).eq('id', workflowId);
      
      // Update product status to completed
      const { data: wf } = await supabase.from('workflows').select('product_id').eq('id', workflowId).single();
      if (wf) {
        await supabase.from('products').update({ status: 'completed' }).eq('id', wf.product_id);
      }
      return;
    }
  }

  // Start eligible jobs
  for (const job of eligibleJobs) {
    // Mark as running
    await supabase.from('jobs').update({ status: 'running' }).eq('id', job.id);
    
    // Fire and forget: simulate async execution
    executeAIJobHandler(supabase, workflowId, job, jobs).catch(console.error);
  }
}

async function executeAIJobHandler(supabase: any, workflowId: string, job: any, allJobsForWorkflow: any[]) {
  try {
    // 1. Fetch AI config
    const { data: config, error: configError } = await supabase
      .from('ai_job_configs')
      .select('*')
      .eq('job_type', job.type)
      .single();

    if (configError || !config) {
      throw new Error(`Missing AI config for job type: ${job.type}`);
    }

    // 2. Fetch Product Data
    const { data: workflow } = await supabase.from('workflows').select('product_id').eq('id', workflowId).single();
    const { data: product } = await supabase.from('products').select('*').eq('id', workflow.product_id).single();

    // 3. Gather dependency results
    const dependencyResults: Record<string, any> = {};
    if (job.dependencies && job.dependencies.length > 0) {
      for (const depType of job.dependencies) {
        const depJob = allJobsForWorkflow.find((j: any) => j.type === depType);
        if (depJob && depJob.result) {
          dependencyResults[depType] = depJob.result;
        }
      }
    }

    // 4. Build context
    const contextData = {
      product: {
        name: product?.name,
        category: product?.category,
        description: product?.description,
        features: product?.features,
        price: product?.price,
        unique_selling_points: product?.unique_selling_points,
        brand_name: product?.brand_name,
        brand_story: product?.brand_story,
        brand_voice: product?.brand_voice,
        target_audience: product?.target_audience,
        competitors: product?.competitors,
        business_goals: product?.business_goals,
        target_market: product?.target_market,
      },
      previous_analysis: dependencyResults
    };

    // 5. Execute AI
    const result = await executeAIJob(job.type, config, contextData);

    // 6. Save result
    await supabase.from('jobs').update({ 
      status: 'completed',
      result: result 
    }).eq('id', job.id);

  } catch (error: any) {
    console.error(`Job ${job.type} failed:`, error);
    await supabase.from('jobs').update({ 
      status: 'failed',
      result: { error: error.message }
    }).eq('id', job.id);
  }

  // Trigger next tick to cascade through the DAG
  await tickWorkflowEngine(supabase, workflowId);
}

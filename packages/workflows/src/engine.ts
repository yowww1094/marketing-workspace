import { WORKFLOW_DAG } from './dag';

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
    executeMockJob(supabase, workflowId, job).catch(console.error);
  }
}

async function executeMockJob(supabase: any, workflowId: string, job: any) {
  // Simulate AI delay (3 to 6 seconds)
  const delay = Math.floor(Math.random() * 3000) + 3000;
  await new Promise(res => setTimeout(res, delay));
  
  // Check if we should fail (10% chance) just to test the retry mechanism later
  // Actually, let's keep it 100% success for now to ensure happy path works
  
  // Mark as completed
  await supabase.from('jobs').update({ 
    status: 'completed',
    result: { mock_data: `Processed ${job.type}` } 
  }).eq('id', job.id);

  // Trigger next tick to cascade through the DAG
  await tickWorkflowEngine(supabase, workflowId);
}

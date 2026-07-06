'use server';

import { createClient } from '@marketing-workspace/auth/server';
import { revalidatePath } from 'next/cache';
import { createJobsForWorkflow, tickWorkflowEngine } from '@marketing-workspace/workflows';

export async function generateStrategyAction(productId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // 1. Verify product ownership and status
  const { data: product, error } = await supabase
    .from('products')
    .select('id, status')
    .eq('id', productId)
    .eq('user_id', user.id)
    .single();

  if (error || !product) {
    throw new Error('Product not found');
  }

  if (product.status !== 'draft') {
    throw new Error('Marketing strategy has already been generated or is processing.');
  }

  // 2. Update status to processing
  const { error: updateError } = await supabase
    .from('products')
    .update({ status: 'processing' })
    .eq('id', productId);

  if (updateError) {
    throw new Error('Failed to update product status');
  }

  // 3. Create workflow
  const { data: workflow, error: wfError } = await supabase
    .from('workflows')
    .insert({
      product_id: productId,
      status: 'pending',
    })
    .select('id')
    .single();

  if (wfError || !workflow) {
    console.error('Failed to create workflow:', wfError);
    throw new Error('Failed to initialize AI workflow');
  }

  // 4. Create jobs based on DAG
  try {
    await createJobsForWorkflow(supabase, workflow.id);
  } catch (err: any) {
    console.error('Failed to create jobs:', err);
    throw new Error('Failed to initialize AI workflow jobs');
  }

  // 5. Kick off the workflow engine asynchronously
  // In a real production app on Vercel, this might time out or be killed.
  // Ideally, this is published to a queue or triggered via webhook.
  // For Phase 1 / local execution, we start the recursive promise.
  tickWorkflowEngine(supabase, workflow.id).catch(console.error);

  revalidatePath(`/products/${productId}`);
}

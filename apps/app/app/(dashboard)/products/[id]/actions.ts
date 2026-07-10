'use server';

import { createClient } from '@marketing-workspace/auth/server';
import { createAdminClient } from '@marketing-workspace/auth/admin';
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

  // 2. Update status to processing using admin client
  const adminClient = createAdminClient();
  const { error: updateError } = await adminClient
    .from('products')
    .update({ status: 'processing' })
    .eq('id', productId);

  if (updateError) {
    console.log(productId, updateError)
    throw new Error('Failed to update product status');
  }

  // 3. Create workflow
  const { data: workflow, error: wfError } = await adminClient
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
    await createJobsForWorkflow(adminClient, workflow.id);
  } catch (err: any) {
    console.error('Failed to create jobs:', err);
    throw new Error('Failed to initialize AI workflow jobs');
  }

  // 5. Kick off the workflow engine asynchronously
  // In a real production app on Vercel, this might time out or be killed.
  // Ideally, this is published to a queue or triggered via webhook.
  // For Phase 1 / local execution, we start the recursive promise.
  tickWorkflowEngine(adminClient, workflow.id).catch(console.error);

  revalidatePath(`/products/${productId}`);
}

export async function retryFailedJobsAction(productId: string, workflowId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // 1. Verify product ownership
  const { data: product, error } = await supabase
    .from('products')
    .select('id')
    .eq('id', productId)
    .eq('user_id', user.id)
    .single();

  if (error || !product) {
    throw new Error('Product not found');
  }

  const adminClient = createAdminClient();
  
  // 2. Set ALL failed jobs back to pending
  await adminClient.from('jobs').update({ status: 'pending', result: null })
    .eq('workflow_id', workflowId)
    .eq('status', 'failed');
  
  // 3. Ensure product is processing
  await adminClient.from('products').update({ status: 'processing' }).eq('id', productId);

  // 4. Restart engine
  tickWorkflowEngine(adminClient, workflowId).catch(console.error);
  
  revalidatePath(`/products/${productId}`);
}

export async function exportReportAction(productId: string, productName: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // Verify product ownership
  const { data: product, error } = await supabase
    .from('products')
    .select('id, name')
    .eq('id', productId)
    .eq('user_id', user.id)
    .single();

  if (error || !product) {
    throw new Error('Product not found');
  }

  // Create a mock HTML/JSON snapshot file to upload
  const fileContent = JSON.stringify({ message: "Exported Report Snapshot", productId });
  const fileName = `${user.id}/${productId}/${Date.now()}_report.json`;
  
  // Upload to storage using the authenticated client
  const { error: uploadError } = await supabase.storage
    .from('reports')
    .upload(fileName, fileContent, {
      contentType: 'application/json',
      upsert: true
    });
    
  if (uploadError) {
    console.error('Storage upload error:', uploadError);
    throw new Error('Failed to upload report to storage');
  }

  // Insert into reports table
  const { error: insertError } = await supabase
    .from('reports')
    .insert({
      user_id: user.id,
      product_id: productId,
      name: `Workspace Report: ${productName}`,
      type: 'Full Workspace',
      size_bytes: fileContent.length,
      storage_path: fileName
    });

  if (insertError) {
    console.error('Database insert error:', insertError);
    throw new Error('Failed to save report record');
  }

  revalidatePath('/reports');
  return { success: true };
}

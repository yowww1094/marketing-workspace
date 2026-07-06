'use server';

import { createClient } from '@marketing-workspace/auth/server';
import { revalidatePath } from 'next/cache';

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
  const { error: wfError } = await supabase
    .from('workflows')
    .insert({
      product_id: productId,
      status: 'pending',
    });

  if (wfError) {
    console.error('Failed to create workflow:', wfError);
    // Ideally we would rollback the status change here, but for phase 1 we'll just throw
    throw new Error('Failed to initialize AI workflow');
  }

  revalidatePath(`/products/${productId}`);
}

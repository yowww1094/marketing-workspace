'use server';

import { createAdminClient } from '@marketing-workspace/auth/admin';
import { revalidatePath } from 'next/cache';

export async function updateAIJobConfig(formData: FormData) {
  const jobType = formData.get('job_type') as string;
  const provider = formData.get('provider') as string;
  const modelName = formData.get('model_name') as string;
  const systemPrompt = formData.get('system_prompt') as string;
  const temperature = parseFloat(formData.get('temperature') as string);

  if (!jobType || !provider || !modelName || !systemPrompt) {
    throw new Error('Missing required fields');
  }

  const supabase = createAdminClient();

  const { error } = await supabase
    .from('ai_job_configs')
    .update({
      provider,
      model_name: modelName,
      system_prompt: systemPrompt,
      temperature,
    })
    .eq('job_type', jobType);

  if (error) {
    console.error('Failed to update config:', error);
    throw new Error('Database update failed');
  }

  revalidatePath('/ai/configure');
  revalidatePath('/ai');
}

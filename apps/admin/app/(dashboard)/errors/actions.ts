'use server';

import { updateErrorStatus } from '@/lib/errors';
import { revalidatePath } from 'next/cache';

export async function updateErrorStatusAction(id: string, status: 'open' | 'investigating' | 'resolved') {
  await updateErrorStatus(id, status);
  revalidatePath('/errors');
}

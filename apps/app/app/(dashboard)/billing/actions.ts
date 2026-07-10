'use server';

import { createClient } from '@marketing-workspace/auth/server';
import { SubscriptionService } from '@marketing-workspace/billing';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function upgradeToProAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const headersList = await headers();
  const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
  
  const returnUrl = `${origin}/billing`;

  const session = await SubscriptionService.createCheckoutSession(user.id, user.email || '', returnUrl);

  if (session.url) {
    redirect(session.url);
  } else {
    throw new Error('Failed to create Stripe Checkout Session');
  }
}

export async function manageSubscriptionAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const headersList = await headers();
  const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
  
  const returnUrl = `${origin}/billing`;

  const portalSession = await SubscriptionService.createPortalSession(user.id, returnUrl);

  if (portalSession.url) {
    redirect(portalSession.url);
  } else {
    throw new Error('Failed to create Stripe Portal Session');
  }
}

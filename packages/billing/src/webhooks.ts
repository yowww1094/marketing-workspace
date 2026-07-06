import { stripe } from './stripe';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const getDb = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};

export const handleStripeWebhook = async (body: string, signature: string) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error('Stripe webhook secret is missing.');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    throw new Error(`Webhook Error: ${err.message}`);
  }

  const db = getDb();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode === 'subscription' && session.client_reference_id) {
        const userId = session.client_reference_id;
        // Upsert subscription
        await db.from('subscriptions').upsert({
          user_id: userId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          plan_id: 'pro',
          status: 'active',
        }, { onConflict: 'user_id' });
      }
      break;
    }
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as any;
      const { data: subRecord } = await db
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_subscription_id', subscription.id)
        .single();

      if (subRecord) {
        await db.from('subscriptions').update({
          status: subscription.status,
          plan_id: subscription.status === 'active' ? 'pro' : 'free',
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        }).eq('user_id', subRecord.user_id);
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return { received: true };
};

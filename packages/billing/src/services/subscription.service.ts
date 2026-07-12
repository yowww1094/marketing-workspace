import { stripe } from '../stripe';

// Mock dependency, assume @marketing-workspace/database provides something similar
// In a real implementation we would import the database client from @marketing-workspace/database
// but since we are loosely coupled, we'll accept the db client as an injection or just use standard Supabase client.
import { createClient } from '@supabase/supabase-js';

// We need a service role client to bypass RLS for billing operations
const getDb = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase env variables for billing service');
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
};

export class SubscriptionService {
  /**
   * Fetch the current subscription for a given user.
   */
  static async getSubscription(userId: string) {
    const db = getDb();
    const { data, error } = await db
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is not found
      throw new Error(`Failed to fetch subscription: ${error.message}`);
    }

    // Default to free plan if no subscription record exists
    return data || { user_id: userId, plan_id: 'free', status: 'active' };
  }

  /**
   * Verify if the user can create a new product based on their quota.
   * Free = 1 product total.
   * Pro = 10 products.
   */
  static async checkProductQuota(userId: string): Promise<void> {
    const subscription = await this.getSubscription(userId);
    const db = getDb();

    // Count existing products
    const { count, error } = await db
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Failed to check product count: ${error.message}`);
    }

    const currentCount = count || 0;

    if (subscription.plan_id === 'free' && currentCount >= 1) {
      throw new Error('Free plan limit reached (1 product). Please upgrade to Pro.');
    }

    if (subscription.plan_id === 'pro' && currentCount >= 10) {
      throw new Error('Pro plan limit reached (10 products per cycle).');
    }
  }

  static async createCheckoutSession(userId: string, email: string, returnUrl: string): Promise<{ url: string | null }> {
    // In a real app, we'd lookup the price ID from env or a constants file
    const priceId = process.env.STRIPE_PRO_PRICE_ID; 

    if (!priceId) {
        throw new Error('Stripe Pro Price ID not configured.');
    }

    const db = getDb();
    const { data: sub } = await db.from('subscriptions').select('stripe_customer_id').eq('user_id', userId).single();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer: sub?.stripe_customer_id || undefined,
      customer_email: sub?.stripe_customer_id ? undefined : email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: returnUrl,
      client_reference_id: userId,
    });

    return { url: session.url };
  }

  /**
   * Create a Stripe Customer Portal Session for managing subscriptions.
   */
  static async createPortalSession(userId: string, returnUrl: string): Promise<{ url: string | null }> {
    const db = getDb();
    const { data: sub } = await db.from('subscriptions').select('stripe_customer_id').eq('user_id', userId).single();

    if (!sub?.stripe_customer_id) {
      throw new Error('No Stripe customer found for this user.');
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      return_url: returnUrl,
    });

    return { url: portalSession.url };
  }
}

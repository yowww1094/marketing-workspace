import { createClient } from '@marketing-workspace/auth/server';
import { redirect } from 'next/navigation';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { Badge } from '@marketing-workspace/ui/components/ui/badge';
import { Check, CreditCard, Sparkles, AlertCircle, ExternalLink } from 'lucide-react';
import { upgradeToProAction, manageSubscriptionAction } from './actions';

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const isPro = subscription?.plan_id === 'pro';

  // Fetch products to calculate usage
  const { data: products } = await supabase
    .from('products')
    .select('id')
    .eq('user_id', user.id);

  const productsUsed = products?.length || 0;
  const productLimit = isPro ? 10 : 1;
  const usagePercentage = Math.min(Math.round((productsUsed / productLimit) * 100), 100);

  const nextBillingDate = subscription?.current_period_end 
    ? new Date(subscription.current_period_end * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Not available';

  return (
    <div className="w-full max-w-[1106px] mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
            Billing & Subscription
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your plan, usage, and payment methods.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Current Plan & Usage */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Current Plan Card */}
          <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-200 bg-zinc-50/50 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-zinc-950 flex items-center gap-2">
                  Current Plan
                  <Badge variant="outline" className={isPro ? "bg-[#e5fcf5] text-[#00a36c] border-[#b9f8cf]" : "bg-zinc-100 text-muted-foreground border-zinc-200"}>
                    {isPro ? 'Pro' : 'Free'}
                  </Badge>
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {isPro 
                    ? 'You are currently on the Pro plan with enhanced capabilities.' 
                    : 'You are on the free starter plan.'}
                </p>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-zinc-950">
                  {isPro ? '$50' : '$0'}
                  <span className="text-sm font-normal text-muted-foreground">/mo</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-zinc-950">Plan Details</h3>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    <div className="flex items-center gap-2 text-sm text-[#6e6e85]">
                      <Check className="w-4 h-4 text-[#00a36c]" />
                      <span>{isPro ? 'Up to 10 Products' : '1 Product Workspace'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#6e6e85]">
                      <Check className="w-4 h-4 text-[#00a36c]" />
                      <span>Unlimited AI Processing</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#6e6e85]">
                      <Check className="w-4 h-4 text-[#00a36c]" />
                      <span>Marketing Summary</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#6e6e85]">
                      <Check className={isPro ? "w-4 h-4 text-[#00a36c]" : "w-4 h-4 text-zinc-300"} />
                      <span className={!isPro ? "text-zinc-400" : ""}>Export & Share Reports</span>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {isPro ? (
                    <form action={manageSubscriptionAction}>
                      <Button type="submit" variant="outline" className="w-full md:w-auto flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Manage Subscription
                        <ExternalLink className="w-3 h-3 ml-1 text-muted-foreground" />
                      </Button>
                    </form>
                  ) : (
                    <form action={upgradeToProAction}>
                      <Button type="submit" className="w-full md:w-auto bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Upgrade to Pro
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
            
            {isPro && subscription?.status === 'active' && (
              <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-200 flex items-center text-sm text-muted-foreground">
                <AlertCircle className="w-4 h-4 mr-2" />
                Your next billing date is {nextBillingDate}.
              </div>
            )}
          </div>

          {/* Usage Metric Card */}
          <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-200">
              <h2 className="text-lg font-semibold text-zinc-950">Workspace Usage</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Track your active products against your plan limits.
              </p>
            </div>
            
            <div className="p-6">
              <div className="flex items-end justify-between mb-2">
                <div className="space-y-1">
                  <span className="text-sm font-medium text-zinc-950">Products</span>
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {productsUsed} / {productLimit} used
                </div>
              </div>
              
              <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    usagePercentage >= 100 ? 'bg-red-500' : 
                    usagePercentage >= 80 ? 'bg-amber-500' : 
                    'bg-[#5b5bd6]'
                  }`}
                  style={{ width: `${usagePercentage}%` }}
                />
              </div>
              
              {usagePercentage >= 100 && !isPro && (
                <p className="text-sm text-red-600 mt-3 font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  You have reached your Free plan limit. Please upgrade to add more products.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Information */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
            <h3 className="font-semibold text-zinc-950 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#5b5bd6]" />
              Pro Features
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#5b5bd6] mt-1.5 shrink-0" />
                <span>Create and manage up to 10 separate product workspaces.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#5b5bd6] mt-1.5 shrink-0" />
                <span>Generate stunning PDF exports of your marketing reports.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#5b5bd6] mt-1.5 shrink-0" />
                <span>Easily share completed workspace links with team members.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#5b5bd6] mt-1.5 shrink-0" />
                <span>Maintain a history of generated reports in your dashboard.</span>
              </li>
            </ul>
          </div>
          
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <h3 className="font-semibold text-zinc-950 mb-2">Need help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you have any questions about your subscription or billing, we're here to help.
            </p>
            <Button variant="outline" className="w-full text-sm">
              Contact Support
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

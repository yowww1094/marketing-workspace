import Link from 'next/link';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { CreditCard, CheckCircle2 } from 'lucide-react';

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-[#f8f8fb]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#e2e2ea] text-[#0c0c0e] text-xs font-semibold uppercase tracking-wider mb-6">
            <CreditCard className="w-3.5 h-3.5" />
            Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0c0c0e] mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-[#6e6e85]">
            Start free. Scale when you are ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Free Tier */}
          <div className="bg-white rounded-2xl p-8 border border-[#e2e2ea] shadow-sm flex flex-col">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#0c0c0e] mb-4">Free</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-bold tracking-tight text-[#0c0c0e]">$0</span>
                <span className="text-[#6e6e85] font-medium">/mo</span>
              </div>
              <p className="text-[#6e6e85] text-[15px]">For solo marketers wanting to explore the platform.</p>
            </div>
            
            <a href={process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/register` : 'http://localhost:3001/register'} className="w-full mb-10">
              <Button className="w-full bg-[#f8f8fb] hover:bg-[#f0f0f5] text-[#0c0c0e] border border-[#e2e2ea] shadow-none h-12">
                Start for free
              </Button>
            </a>

            <div className="flex flex-col gap-4 mt-auto">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-[15px] text-[#0c0c0e]">1 Active Product Workspace</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-[15px] text-[#0c0c0e]">Full AI Capabilities</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-[15px] text-[#0c0c0e]">Marketing Summary Dashboard</span>
              </div>
            </div>
          </div>

          {/* Pro Tier */}
          <div className="bg-white rounded-2xl p-8 border-2 border-indigo-600 shadow-xl shadow-indigo-900/5 flex flex-col relative">
            <div className="absolute top-0 right-8 transform -translate-y-1/2">
              <span className="bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                Most Popular
              </span>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#0c0c0e] mb-4">Pro</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-bold tracking-tight text-[#0c0c0e]">$50</span>
                <span className="text-[#6e6e85] font-medium">/mo</span>
              </div>
              <p className="text-[#6e6e85] text-[15px]">For marketing teams ready to scale and move fast.</p>
            </div>
            
            <a href={process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/register` : 'http://localhost:3001/register'} className="w-full mb-10">
              <Button className="w-full bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white h-12">
                Upgrade to Pro
              </Button>
            </a>

            <div className="flex flex-col gap-4 mt-auto">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-[15px] text-[#0c0c0e] font-medium">Up to 10 Products per month</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-[15px] text-[#0c0c0e]">Unlimited AI processing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-[15px] text-[#0c0c0e]">Full Marketing Workspace</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-[15px] text-[#0c0c0e]">Export PDF Reports & Sharing</span>
              </div>
            </div>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-white rounded-2xl p-8 border border-[#e2e2ea] shadow-sm flex flex-col">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#0c0c0e] mb-4">Enterprise</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold tracking-tight text-[#0c0c0e]">Custom</span>
              </div>
              <p className="text-[#6e6e85] text-[15px]">For large organizations needing unlimited scale.</p>
            </div>
            
            <Link href="mailto:sales@marketingworkspace.com" className="w-full mb-10">
              <Button className="w-full bg-[#f8f8fb] hover:bg-[#f0f0f5] text-[#0c0c0e] border border-[#e2e2ea] shadow-none h-12">
                Contact Sales
              </Button>
            </Link>

            <div className="flex flex-col gap-4 mt-auto">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-[15px] text-[#0c0c0e]">Unlimited Products</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-[15px] text-[#0c0c0e]">Dedicated Account Manager</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-[15px] text-[#0c0c0e]">Custom AI Model Fine-tuning</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-[15px] text-[#0c0c0e]">SSO & Advanced Security</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

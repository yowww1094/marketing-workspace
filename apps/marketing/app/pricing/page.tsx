import { FaqSection } from "../../components/sections/faq-section";
import { CtaSection } from "../../components/sections/cta-section";
import { Check, Target } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Pricing - Marketing Workspace",
  description: "Simple, transparent pricing. Start free. Upgrade when your team is ready.",
};

export default function PricingPage() {
  const tableRows = [
    { feature: "Active Products", free: "1", pro: "Up to 10", enterprise: "Unlimited" },
    { feature: "AI Processing", free: "Full", pro: "Unlimited", enterprise: "Unlimited" },
    { feature: "Marketing Workspace", free: true, pro: true, enterprise: true },
    { feature: "Export PDF Reports & Sharing", free: false, pro: true, enterprise: true },
    { feature: "Dedicated Account Manager", free: false, pro: false, enterprise: true },
    { feature: "Custom AI Model Fine-tuning", free: false, pro: false, enterprise: true },
    { feature: "SSO & Advanced Security", free: false, pro: false, enterprise: true },
    { feature: "Support", free: "Email", pro: "Priority", enterprise: "Dedicated CSM" },
  ];

  return (
    <main className="flex min-h-screen flex-col pt-14">
      <div className="bg-white pb-24 pt-16">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#e2e2ea] text-[#5b5bd6] text-xs font-semibold uppercase tracking-[1.2px] mb-6">
              <Target className="w-3.5 h-3.5" />
              Pricing
            </div>
            <h2 className="text-[48px] leading-[48px] font-bold tracking-[-1.2px] text-[#0c0c0e] mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-[16px] leading-[24px] text-[#6e6e85]">
              Start free. Upgrade when your team is ready.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-[#f8f8fb] border border-[#e2e2ea] rounded-xl p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-[14px] font-semibold text-[#0c0c0e] mb-1">Free</h3>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-[30px] leading-[36px] font-bold text-[#0c0c0e]">$0</span>
                  <span className="text-[14px] text-[#6e6e85]">/mo</span>
                </div>
                <p className="text-[14px] text-[#6e6e85] mt-2 h-10">
                  For solo marketers wanting to explore the platform.
                </p>
              </div>
              
              <a href={process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/register` : 'http://localhost:3001/register'} className="w-full mb-8">
                <button className="w-full h-11 bg-white border border-[#e2e2ea] rounded-lg text-[14px] font-medium text-[#0c0c0e] hover:bg-gray-50 transition-colors">
                  Start for free
                </button>
              </a>

              <div className="flex flex-col gap-4 mt-auto">
                {[
                  "1 Active Product Workspace",
                  "Full AI Capabilities",
                  "Marketing Summary Dashboard"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-[14px] h-[14px] text-[#5b5bd6] shrink-0 mt-0.5" />
                    <span className="text-[14px] text-[#0c0c0e]/80 leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro */}
            <div className="bg-white border-2 border-[#5b5bd6] rounded-xl p-8 flex flex-col shadow-lg shadow-indigo-500/10 relative -mt-4 mb-4 md:mt-0 md:mb-0">
              <div className="absolute -top-3 right-6">
                <span className="bg-[#5b5bd6] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  Most Popular
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-[14px] font-semibold text-[#0c0c0e] mb-1">Pro</h3>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-[30px] leading-[36px] font-bold text-[#0c0c0e]">$50</span>
                  <span className="text-[14px] text-[#6e6e85]">/mo</span>
                </div>
                <p className="text-[14px] text-[#6e6e85] mt-2 h-10">
                  For marketing teams ready to scale and move fast.
                </p>
              </div>
              
              <a href={process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/register` : 'http://localhost:3001/register'} className="w-full mb-8">
                <button className="w-full h-11 bg-[#5b5bd6] rounded-lg text-[14px] font-medium text-white hover:bg-[#4a4ac0] transition-colors shadow-sm">
                  Upgrade to Pro
                </button>
              </a>

              <div className="flex flex-col gap-4 mt-auto">
                {[
                  "Up to 10 Products per month",
                  "Unlimited AI processing",
                  "Full Marketing Workspace",
                  "Export PDF Reports & Sharing"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-[14px] h-[14px] text-[#5b5bd6] shrink-0 mt-0.5" />
                    <span className="text-[14px] text-[#0c0c0e]/80 leading-tight font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise */}
            <div className="bg-[#f8f8fb] border border-[#e2e2ea] rounded-xl p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-[14px] font-semibold text-[#0c0c0e] mb-1">Enterprise</h3>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-[30px] leading-[36px] font-bold text-[#0c0c0e]">Custom</span>
                </div>
                <p className="text-[14px] text-[#6e6e85] mt-2 h-10">
                  For large organizations needing unlimited scale.
                </p>
              </div>
              
              <Link href="mailto:sales@marketingworkspace.com" className="w-full mb-8">
                <button className="w-full h-11 bg-white border border-[#e2e2ea] rounded-lg text-[14px] font-medium text-[#0c0c0e] hover:bg-gray-50 transition-colors">
                  Contact sales
                </button>
              </Link>

              <div className="flex flex-col gap-4 mt-auto">
                {[
                  "Unlimited Products",
                  "Dedicated Account Manager",
                  "Custom AI Model Fine-tuning",
                  "SSO & Advanced Security"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-[14px] h-[14px] text-[#5b5bd6] shrink-0 mt-0.5" />
                    <span className="text-[14px] text-[#0c0c0e]/80 leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Feature Comparison Table */}
          <div className="max-w-[1024px] mx-auto mt-24">
            <h3 className="text-[24px] font-bold text-[#0c0c0e] text-center mb-10">
              Full feature comparison
            </h3>
            <div className="border border-[#e2e2ea] rounded-xl overflow-hidden bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f1f1f5]/50 border-b border-[#e2e2ea]">
                    <th className="py-4 px-5 text-[12px] font-semibold text-[#6e6e85] w-2/5">Feature</th>
                    <th className="py-4 px-5 text-[12px] font-semibold text-[#0c0c0e] text-center w-1/5">Free</th>
                    <th className="py-4 px-5 text-[12px] font-semibold text-[#5b5bd6] text-center w-1/5">Pro</th>
                    <th className="py-4 px-5 text-[12px] font-semibold text-[#0c0c0e] text-center w-1/5">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-[#0c0c0e]">
                  {tableRows.map((row, i) => (
                    <tr key={i} className={`border-b border-[#e2e2ea] last:border-0 ${i % 2 === 1 ? 'bg-[#f1f1f5]/20' : 'bg-white'}`}>
                      <td className="py-4 px-5">{row.feature}</td>
                      <td className="py-4 px-5 text-center">
                        {typeof row.free === 'boolean' ? (
                          row.free ? <Check className="w-[16px] h-[16px] text-[#5b5bd6] mx-auto" /> : <span className="text-[18px] text-[#6e6e85]/40">—</span>
                        ) : (
                          <span className="text-[12px]">{row.free}</span>
                        )}
                      </td>
                      <td className="py-4 px-5 text-center">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? <Check className="w-[16px] h-[16px] text-[#5b5bd6] mx-auto" /> : <span className="text-[18px] text-[#6e6e85]/40">—</span>
                        ) : (
                          <span className="text-[12px]">{row.pro}</span>
                        )}
                      </td>
                      <td className="py-4 px-5 text-center">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? <Check className="w-[16px] h-[16px] text-[#5b5bd6] mx-auto" /> : <span className="text-[18px] text-[#6e6e85]/40">—</span>
                        ) : (
                          <span className="text-[12px]">{row.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <FaqSection type="billing" />
      <CtaSection />
    </main>
  );
}

import { Search, HelpCircle, CreditCard, Sparkles, Shield, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Marketing Workspace",
  description: "Find answers to common questions about Marketing Workspace.",
};

export default function FaqPage() {
  const faqCategories = [
    {
      title: "Getting Started",
      icon: <HelpCircle className="w-3.5 h-3.5 text-[#5b5bd6]" />,
      questions: [
        { q: "What is Marketing Workspace?", a: "Marketing Workspace is an AI-powered Product Marketing Operating System that helps entrepreneurs and businesses create a complete marketing workspace for individual products." },
        { q: "How long does onboarding take?", a: "Onboarding takes just a few minutes. You complete a simple wizard with your product details, upload images, and our AI generates your entire marketing workspace." },
        { q: "Do I need technical skills?", a: "Not at all. Marketing Workspace is designed to be completely user-friendly. There are no prompts to write or complex configurations." },
      ]
    },
    {
      title: "Billing & Plans",
      icon: <CreditCard className="w-3.5 h-3.5 text-[#5b5bd6]" />,
      questions: [
        { q: "Can I change my plan at any time?", a: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle." },
        { q: "Is the 14-day Growth trial truly free?", a: "Yes, we offer a 14-day free trial on the Pro plan so you can test all the premium features before committing." },
        { q: "Do you offer nonprofit discounts?", a: "Yes! We offer special pricing for eligible nonprofits, startups, and educational institutions. Contact our support team for more details." },
      ]
    },
    {
      title: "AI & Features",
      icon: <Sparkles className="w-3.5 h-3.5 text-[#5b5bd6]" />,
      questions: [
        { q: "How accurate is the AI-generated research?", a: "Our AI uses advanced Large Language Models and Search Models to synthesize real-time market data, ensuring high-quality and relevant research." },
        { q: "Does the AI learn from my data?", a: "We do not use your private product data to train our foundational models. Your data is kept secure and confidential." },
        { q: "Can I edit AI-generated content?", a: "Products and their AI-generated workspaces are permanent once created to ensure historical accuracy, but you can export the content or create new Products to iterate." },
      ]
    },
    {
      title: "Security",
      icon: <Shield className="w-3.5 h-3.5 text-[#5b5bd6]" />,
      questions: [
        { q: "Is Marketing Workspace SOC 2 certified?", a: "We follow industry best practices for security and are currently working towards formal SOC 2 compliance." },
        { q: "Where is my data stored?", a: "Your data is stored securely in modern, encrypted databases with enterprise-grade infrastructure providers." },
        { q: "Do you support SSO?", a: "Yes, Single Sign-On (SSO) and advanced security features are available on our Enterprise plan." },
      ]
    },
  ];

  return (
    <main className="flex min-h-screen flex-col pt-14">
      {/* Header Section */}
      <div className="bg-white border-b border-[#e2e2ea]">
        <div className="container mx-auto px-6 pt-16 pb-16 max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#e2e2ea] text-[#5b5bd6] text-xs font-semibold uppercase tracking-[1.2px] mb-6">
              <HelpCircle className="w-3.5 h-3.5" />
              Help Center
            </div>
            <h1 className="text-[48px] leading-[48px] font-bold tracking-[-1.2px] text-[#0c0c0e] mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-[16px] leading-[24px] text-[#6e6e85] mb-8">
              Find answers to common questions about Marketing Workspace.
            </p>
            
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6e6e85]" />
              <input 
                type="text" 
                placeholder="Search questions..." 
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#e2e2ea] text-[14px] outline-none focus:border-[#5b5bd6] focus:ring-1 focus:ring-[#5b5bd6] transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex flex-col gap-12">
            {faqCategories.map((category, index) => (
              <div key={index} className="flex flex-col gap-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#5b5bd6]/10 flex items-center justify-center">
                    {category.icon}
                  </div>
                  <h2 className="text-[16px] font-semibold text-[#0c0c0e]">
                    {category.title}
                  </h2>
                </div>
                
                <div className="bg-[#f8f8fb] border-[#e2e2ea] border-[1.25px] rounded-[12px] p-[1.25px]">
                  {category.questions.map((faq, qIndex) => (
                    <details 
                      key={qIndex} 
                      className={`group border-b border-[#e2e2ea] overflow-hidden transition-colors ${qIndex === category.questions.length - 1 ? 'border-b-0' : ''}`}
                    >
                      <summary className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <span className="font-medium text-[#0c0c0e] text-[14px]">{faq.q}</span>
                        <ChevronDown className="w-4 h-4 text-[#0c0c0e] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <div className="p-4 pt-0 text-[#6e6e85] text-[14px] leading-relaxed">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Still have questions */}
      <div className="bg-[#f8f8fb] border-t border-[#e2e2ea] py-16">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="w-12 h-12 mx-auto bg-[#5b5bd6]/10 rounded-xl flex items-center justify-center mb-5">
            <HelpCircle className="w-5 h-5 text-[#5b5bd6]" />
          </div>
          <h2 className="text-[20px] leading-[28px] font-bold text-[#0c0c0e] mb-2">
            Still have questions?
          </h2>
          <p className="text-[14px] text-[#6e6e85] mb-6">
            Our team typically responds within 2 business hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="mailto:support@marketingworkspace.com">
              <button className="h-11 px-5 bg-[#5b5bd6] text-white rounded-lg text-[14px] font-medium hover:bg-[#4a4ac0] transition-colors shadow-sm">
                Email support
              </button>
            </Link>
            <Link href="mailto:sales@marketingworkspace.com">
              <button className="h-11 px-5 bg-white border border-[#e2e2ea] text-[#0c0c0e] rounded-lg text-[14px] font-medium hover:bg-gray-50 transition-colors">
                Book a demo
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

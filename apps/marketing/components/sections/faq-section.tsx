"use client";

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const generalFaqs = [
  {
    question: "How does the AI generate marketing strategies?",
    answer: "We use a combination of advanced Large Language Models and Search Models to analyze your market. When you provide your product details, our AI agent searches the web, analyzes competitors, and synthesizes the data into a cohesive marketing strategy."
  },
  {
    question: "Do I need to talk to a chatbot?",
    answer: "No. Marketing Workspace is not a chatbot. Our AI operates entirely behind the scenes through structured, automated workflows. You simply fill out the onboarding wizard, and the AI delivers a complete, professional strategy workspace."
  },
  {
    question: "Can I edit or delete a Product after creation?",
    answer: "To ensure reproducibility and historical accuracy of AI outputs, Products are permanent once created and cannot be edited or deleted. However, you can create new Products as your strategy evolves."
  },
  {
    question: "What happens when I hit my plan limit?",
    answer: "Free users are limited to 1 active Product. Pro users get up to 10 Products per billing cycle. If you hit your limit, you will need to wait for the next billing cycle or upgrade to a higher tier to create new Products."
  }
];

const billingFaqs = [
  {
    question: "Can I change plans at any time?",
    answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle."
  },
  {
    question: "Is there a free trial for Growth?",
    answer: "Yes, we offer a 14-day free trial on the Pro (Growth) plan so you can test all the premium features before committing."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept all major credit cards including Visa, Mastercard, and American Express. For Enterprise plans, we can arrange invoice payments."
  },
  {
    question: "Do you offer nonprofit or startup discounts?",
    answer: "Yes! We offer special pricing for eligible nonprofits, startups, and educational institutions. Contact our support team for more details."
  }
];

export function FaqSection({ type = "general" }: { type?: "general" | "billing" }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = type === "billing" ? billingFaqs : generalFaqs;
  const title = type === "billing" ? "Billing questions" : "Frequently asked questions";

  return (
    <section id="faq" className="py-24 bg-white border-b border-[#e2e2ea]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[24px] font-bold tracking-tight text-[#0c0c0e] mb-4">
            {title}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <div className="bg-[#f8f8fb] border-[#e2e2ea] border-[1.25px] rounded-[12px] p-[1.25px]">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border-b border-[#e2e2ea] overflow-hidden transition-colors ${index === faqs.length - 1 ? 'border-b-0' : ''}`}
              >
                <button
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-medium text-[#0c0c0e] text-[14px]">{faq.question}</span>
                  <ChevronDown 
                    className={`w-[16px] h-[16px] text-[#0c0c0e] shrink-0 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                <div 
                  className={`grid transition-all duration-200 ease-in-out ${
                    openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-4 pt-0 text-[#6e6e85] text-[14px] leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

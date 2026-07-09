'use client';

import { PenTool, LayoutTemplate, Mail, Megaphone } from 'lucide-react';

interface ContentGenerationProps {
  product: any;
  workflow: any;
}

export function ContentGeneration({ product, workflow }: ContentGenerationProps) {
  const contentJob = workflow?.jobs?.find((j: any) => j.type === 'content_generation');
  const contentData = contentJob?.result || {};

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1024px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-bold text-[#0c0c0e]">Content Strategy</h2>
        <p className="text-[14px] text-[#6e6e85]">
          Generated copy for your landing page, email sequences, and advertising campaigns.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Landing Page Hero */}
        <div className="bg-white border border-[#e2e2ea] rounded-xl p-8 flex flex-col gap-6 shadow-sm">
          <div className="flex items-center gap-2 text-[#0c0c0e] border-b border-[#e2e2ea] pb-4">
            <LayoutTemplate className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold">Landing Page Hero</h3>
          </div>
          <div className="flex flex-col gap-6 max-w-[800px] mx-auto text-center py-6">
            <h1 className="text-[36px] font-bold text-[#0c0c0e] leading-tight tracking-tight">
              {contentData.landing_page_hero?.headline || 'Your compelling headline goes here.'}
            </h1>
            <p className="text-[18px] text-[#6e6e85] leading-relaxed">
              {contentData.landing_page_hero?.subheadline || 'A supporting subheadline that explains the value proposition clearly and concisely.'}
            </p>
            <div className="mt-4">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium text-[15px] hover:bg-indigo-700 transition-colors">
                {contentData.landing_page_hero?.cta || 'Get Started Now'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email Sequence */}
          <div className="bg-[#f8f8fb] border border-[#e2e2ea] rounded-xl p-6 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-[#0c0c0e]">
              <Mail className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold">Email Sequence Ideas</h3>
            </div>
            <div className="flex flex-col gap-4 relative before:absolute before:inset-y-0 before:left-[19px] before:w-[2px] before:bg-[#e2e2ea]">
              {(contentData.email_sequence_ideas || []).map((email: any, i: number) => (
                <div key={i} className="flex gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-[13px] shrink-0">
                    D{email.day}
                  </div>
                  <div className="bg-white border border-[#e2e2ea] rounded-lg p-4 flex-1 shadow-sm">
                    <span className="font-bold text-[14px] text-[#0c0c0e] block mb-2">{email.subject_line}</span>
                    <p className="text-[13px] text-[#6e6e85] leading-relaxed">{email.content_summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ad Copy */}
          <div className="bg-[#f8f8fb] border border-[#e2e2ea] rounded-xl p-6 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-[#0c0c0e]">
              <Megaphone className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold">Ad Copy Variations</h3>
            </div>
            <div className="flex flex-col gap-4">
              {(contentData.ad_copy_variations || []).map((ad: any, i: number) => (
                <div key={i} className="bg-white border border-[#e2e2ea] rounded-lg p-5 flex flex-col gap-3 shadow-sm">
                  <div className="flex justify-between items-center border-b border-[#e2e2ea] pb-2">
                    <span className="text-[12px] font-bold text-[#6e6e85] uppercase tracking-wider">{ad.platform}</span>
                  </div>
                  <div className="flex flex-col gap-2 pt-1">
                    <span className="font-bold text-[15px] text-indigo-700">{ad.headline}</span>
                    <p className="text-[14px] text-[#0c0c0e] leading-relaxed">{ad.primary_text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

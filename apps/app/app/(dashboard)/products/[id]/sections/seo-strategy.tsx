'use client';

import { Search, Tag, FileText, AlertCircle } from 'lucide-react';

interface SEOStrategyProps {
  product: any;
  workflow: any;
}

export function SEOStrategy({ product, workflow }: SEOStrategyProps) {
  const seoJob = workflow?.jobs?.find((j: any) => j.type === 'seo_strategy');
  const seoData = seoJob?.result || {};

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1024px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-bold text-[#0c0c0e]">SEO Strategy</h2>
        <p className="text-[14px] text-[#6e6e85]">
          Keyword recommendations, content gaps, and metadata optimization for organic growth.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Keywords */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-[#e2e2ea] rounded-xl p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-2 text-[#0c0c0e]">
              <Search className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold">Primary Keywords</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {(seoData.primary_keywords || []).map((kw: string, i: number) => (
                <div key={i} className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-md text-[13px] font-medium flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  {kw}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#e2e2ea] rounded-xl p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-2 text-[#0c0c0e]">
              <Search className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold">Secondary Keywords</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {(seoData.secondary_keywords || []).map((kw: string, i: number) => (
                <div key={i} className="bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-[13px] font-medium">
                  {kw}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Meta & Content Gaps */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#f0fdf4] border border-[#b9f8cf] rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#008236]">
              <FileText className="w-5 h-5" />
              <h3 className="font-semibold">Recommended Metadata</h3>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-bold text-[#006328] uppercase tracking-wider">Title Tag</span>
                <p className="text-[14px] text-[#006328] font-medium bg-white/60 p-3 rounded-lg border border-[#b9f8cf]/50">
                  {seoData.recommended_meta_title}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-bold text-[#006328] uppercase tracking-wider">Meta Description</span>
                <p className="text-[14px] text-[#006328] bg-white/60 p-3 rounded-lg border border-[#b9f8cf]/50 leading-relaxed">
                  {seoData.recommended_meta_description}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#fffbeb] border border-[#fee685] rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#b26a00]">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-semibold">Content Gaps to Fill</h3>
            </div>
            <ul className="flex flex-col gap-2 mt-2">
              {(seoData.content_gaps || []).map((gap: string, i: number) => (
                <li key={i} className="flex gap-2 text-[14px] text-[#8a5300] leading-relaxed">
                  <span className="font-bold">•</span>
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

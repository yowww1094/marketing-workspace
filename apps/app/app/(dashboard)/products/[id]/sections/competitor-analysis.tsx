'use client';

import { Shield, ShieldAlert, Award, Target } from 'lucide-react';

interface CompetitorAnalysisProps {
  product: any;
  workflow: any;
}

export function CompetitorAnalysis({ product, workflow }: CompetitorAnalysisProps) {
  const competitorJob = workflow?.jobs?.find((j: any) => j.type === 'competitor_analysis');
  const compData = competitorJob?.result || {};

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1024px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-bold text-[#0c0c0e]">Competitor Analysis</h2>
        <p className="text-[14px] text-[#6e6e85]">
          Comparison against key competitors, highlighting strengths, weaknesses, and differentiation.
        </p>
      </div>

      {/* Our Advantages & Industry Standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#f0fdf4] border border-[#b9f8cf] rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#008236]">
            <Award className="w-5 h-5" />
            <h3 className="font-semibold">Our Unique Advantages</h3>
          </div>
          <ul className="flex flex-col gap-2 mt-2">
            {(compData.our_unique_advantages || []).map((adv: string, i: number) => (
              <li key={i} className="flex gap-2 text-[14px] text-[#006328] leading-relaxed">
                <span className="mt-1 font-bold">•</span>
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#f8f8fb] border border-[#e2e2ea] rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#0c0c0e]">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold">Industry Standard Features</h3>
          </div>
          <ul className="flex flex-col gap-2 mt-2">
            {(compData.industry_standard_features || []).map((feat: string, i: number) => (
              <li key={i} className="flex gap-2 text-[14px] text-[#6e6e85] leading-relaxed">
                <span className="text-indigo-600 mt-1">•</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Competitors List */}
      <div className="flex flex-col gap-4 mt-4">
        <h3 className="text-[16px] font-semibold text-[#0c0c0e]">Key Competitors</h3>
        <div className="grid grid-cols-1 gap-6">
          {(compData.competitors || []).map((comp: any, i: number) => (
            <div key={i} className="bg-white border border-[#e2e2ea] rounded-xl p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-[#e2e2ea] pb-4">
                <h4 className="text-[18px] font-bold text-[#0c0c0e]">{comp.name}</h4>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[12px] font-medium">Competitor {i + 1}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-[#b26a00]">
                    <ShieldAlert className="w-4 h-4" />
                    <span className="font-semibold text-[14px]">Strengths</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {(comp.strengths || []).map((s: string, idx: number) => (
                      <li key={idx} className="flex gap-2 text-[13px] text-[#6e6e85]">
                        <span className="text-[#b26a00]">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-[#008236]">
                    <Target className="w-4 h-4" />
                    <span className="font-semibold text-[14px]">Weaknesses / Opportunities</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {(comp.weaknesses || []).map((w: string, idx: number) => (
                      <li key={idx} className="flex gap-2 text-[13px] text-[#6e6e85]">
                        <span className="text-[#008236]">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-[#f8f8fb] rounded-lg p-4 mt-2">
                <span className="text-[12px] font-semibold text-[#0c0c0e] block mb-1">Differentiation Strategy</span>
                <p className="text-[14px] text-[#6e6e85] leading-relaxed">{comp.differentiation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { TrendingUp, Users, Target } from 'lucide-react';

interface MarketResearchProps {
  product: any;
  workflow: any;
}

export function MarketResearch({ product, workflow }: MarketResearchProps) {
  const marketResearchJob = workflow?.jobs?.find((j: any) => j.type === 'market_research');
  const marketData = marketResearchJob?.result || {};

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1024px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-bold text-[#0c0c0e]">Market Research</h2>
        <p className="text-[14px] text-[#6e6e85]">
          Detailed analysis of market size, active trends, and target demographics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Size & Gaps */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-[#f8f8fb] border border-[#e2e2ea] rounded-xl p-5 flex flex-col gap-2">
            <span className="text-[12px] font-medium text-[#6e6e85]">Estimated Market Size</span>
            <span className="text-[24px] font-bold tracking-tight text-[#0c0c0e]">{marketData.market_size || '$1B+'}</span>
          </div>

          <div className="bg-white border border-[#e2e2ea] rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#0c0c0e]">
              <Target className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold">Market Gaps</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {(marketData.market_gaps || []).map((gap: string, i: number) => (
                <li key={i} className="flex gap-2 text-[14px] text-[#6e6e85] leading-relaxed">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Demographics & Trends */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-[#e2e2ea] rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#0c0c0e]">
              <Users className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold">Target Demographics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {(marketData.target_demographics || []).map((demo: any, i: number) => (
                <div key={i} className="flex flex-col gap-2 p-4 bg-[#f8f8fb] rounded-lg border border-[#e2e2ea]">
                  <span className="font-semibold text-[14px] text-[#0c0c0e]">{demo.group}</span>
                  <p className="text-[13px] text-[#6e6e85] leading-relaxed">{demo.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#e2e2ea] rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#0c0c0e]">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold">Current Market Trends</h3>
            </div>
            <div className="flex flex-col gap-3 mt-2">
              {(marketData.current_trends || []).map((trend: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-[#f8f8fb] rounded-lg border border-[#e2e2ea]">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-[12px]">
                    {i + 1}
                  </div>
                  <p className="text-[14px] text-[#0c0c0e] leading-relaxed">{trend}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

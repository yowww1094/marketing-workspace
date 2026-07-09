'use client';

import { Lightbulb, Share2, Target } from 'lucide-react';

interface MarketingStrategyProps {
  product: any;
  workflow: any;
}

export function MarketingStrategy({ product, workflow }: MarketingStrategyProps) {
  const strategyJob = workflow?.jobs?.find((j: any) => j.type === 'marketing_strategy');
  const stratData = strategyJob?.result || {};

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1024px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-bold text-[#0c0c0e]">Marketing Strategy</h2>
        <p className="text-[14px] text-[#6e6e85]">
          Recommended channels, campaign ideas, and key performance indicators for growth.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Channels & KPIs */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white border border-[#e2e2ea] rounded-xl p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-2 text-[#0c0c0e]">
              <Share2 className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold">Recommended Channels</h3>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              {(stratData.recommended_channels || []).map((channel: any, i: number) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="font-semibold text-[14px] text-[#0c0c0e]">{channel.channel}</span>
                  <p className="text-[13px] text-[#6e6e85] leading-relaxed">{channel.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f8f8fb] border border-[#e2e2ea] rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#0c0c0e]">
              <Target className="w-5 h-5 text-[#00a63e]" />
              <h3 className="font-semibold">Key Performance Indicators</h3>
            </div>
            <ul className="flex flex-col gap-2 mt-2">
              {(stratData.kpis || []).map((kpi: string, i: number) => (
                <li key={i} className="flex gap-2 text-[14px] text-[#0c0c0e] font-medium leading-relaxed">
                  <span className="text-[#00a63e]">•</span>
                  <span>{kpi}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Campaign Ideas */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-[#e2e2ea] rounded-xl p-6 flex flex-col gap-6 shadow-sm">
            <div className="flex items-center gap-2 text-[#0c0c0e]">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold">Campaign Ideas</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(stratData.campaign_ideas || []).map((campaign: any, i: number) => (
                <div key={i} className="bg-[#fffbeb] border border-[#fee685] rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                  <h4 className="font-bold text-[15px] text-[#8a5300]">{campaign.name}</h4>
                  <p className="text-[14px] text-[#8a5300] leading-relaxed opacity-90">{campaign.concept}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

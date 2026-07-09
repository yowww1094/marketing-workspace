'use client';

import { ArrowUpRight, TrendingUp, Users, Target } from 'lucide-react';

interface ExecutiveSummaryProps {
  product: any;
  workflow: any;
}

export function ExecutiveSummary({ product, workflow }: ExecutiveSummaryProps) {
  // Find the market_research job result
  const marketResearchJob = workflow?.jobs?.find((j: any) => j.type === 'market_research');
  const marketData = marketResearchJob?.result || {};

  // Find the competitor_analysis job result
  const competitorJob = workflow?.jobs?.find((j: any) => j.type === 'competitor_analysis');
  const competitorData = competitorJob?.result || {};

  const metrics = [
    {
      title: 'Estimated Market Size',
      value: marketData.market_size || '$1B+',
      trend: '+12% YoY',
      icon: TrendingUp,
      color: 'text-[#00a63e]'
    },
    {
      title: 'Market Gaps',
      value: marketData.market_gaps?.length?.toString() || '3',
      trend: 'Identified Opportunities',
      icon: Target,
      color: 'text-[#00a63e]'
    },
    {
      title: 'Demographic Groups',
      value: marketData.target_demographics?.length?.toString() || '4',
      trend: 'Target Profiles',
      icon: Users,
      color: 'text-[#00a63e]'
    },
    {
      title: 'Market Trends',
      value: marketData.current_trends?.length?.toString() || '5',
      trend: 'Active Trends',
      icon: ArrowUpRight,
      color: 'text-[#00a63e]'
    }
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1024px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-bold text-[#0c0c0e]">Executive Summary</h2>
        <p className="text-[14px] text-[#6e6e85]">
          High-level overview of your market opportunity, competitive position, and strategic priorities.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-[#f8f8fb] border border-[#e2e2ea] rounded-xl p-5 flex flex-col gap-2">
            <span className="text-[12px] font-medium text-[#6e6e85]">{metric.title}</span>
            <span className="text-[24px] font-bold tracking-tight text-[#0c0c0e]">{metric.value}</span>
            <div className="flex items-center gap-1 mt-1">
              <metric.icon className={`w-3 h-3 ${metric.color}`} />
              <span className={`text-[12px] font-medium ${metric.color}`}>{metric.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Insights (From various jobs) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <div className="bg-[#fffbeb] border border-[#fee685] rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#b26a00]">
            <Target className="w-5 h-5" />
            <h3 className="font-semibold">Key Market Insight</h3>
          </div>
          <p className="text-[#8a5300] text-[14px] leading-relaxed">
            {marketData.market_trends?.[0] || 'The market is rapidly shifting towards automated solutions with a strong emphasis on user experience.'}
          </p>
        </div>

        <div className="bg-[#f0fdf4] border border-[#b9f8cf] rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#008236]">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold">Competitive Advantage</h3>
          </div>
          <p className="text-[#006328] text-[14px] leading-relaxed">
            {competitorData.competitive_advantages?.[0] || 'Our product offers a unique blend of features that our top competitors lack, particularly in ease of use.'}
          </p>
        </div>
      </div>
    </div>
  );
}

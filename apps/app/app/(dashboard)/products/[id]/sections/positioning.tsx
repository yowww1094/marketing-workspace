'use client';

import { Crosshair, MessageSquare, Megaphone, CheckCircle2 } from 'lucide-react';

interface PositioningProps {
  product: any;
  workflow: any;
}

export function Positioning({ product, workflow }: PositioningProps) {
  const positioningJob = workflow?.jobs?.find((j: any) => j.type === 'positioning');
  const posData = positioningJob?.result || {};

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1024px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-bold text-[#0c0c0e]">Brand Positioning</h2>
        <p className="text-[14px] text-[#6e6e85]">
          Your core messaging framework, value proposition, and unique brand voice.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Value Prop & Positioning Statement */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-[#e2e2ea] rounded-xl p-6 flex flex-col gap-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600"></div>
            <div className="flex items-center gap-2 text-[#0c0c0e]">
              <Crosshair className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold">Value Proposition</h3>
            </div>
            <p className="text-[15px] text-[#0c0c0e] leading-relaxed font-medium">
              {posData.value_proposition || 'A clear, compelling statement that explains how your product solves a problem or improves a situation.'}
            </p>
          </div>

          <div className="bg-[#f8f8fb] border border-[#e2e2ea] rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#0c0c0e]">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold">Positioning Statement</h3>
            </div>
            <p className="text-[14px] text-[#6e6e85] leading-relaxed italic">
              "{posData.positioning_statement || 'For [Target Market] who [Need], our [Product] is a [Category] that [Benefit].'}"
            </p>
          </div>
          
          <div className="bg-white border border-[#e2e2ea] rounded-xl p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-2 text-[#0c0c0e]">
              <Megaphone className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold">Brand Voice</h3>
            </div>
            <div className="inline-block bg-indigo-50 text-indigo-700 px-4 py-3 rounded-lg text-[14px] font-medium border border-indigo-100">
              {posData.brand_voice || 'Professional, authoritative, and approachable'}
            </div>
          </div>
        </div>

        {/* Messaging Pillars */}
        <div className="bg-white border border-[#e2e2ea] rounded-xl p-6 flex flex-col gap-6 shadow-sm">
          <div className="flex items-center gap-2 text-[#0c0c0e]">
            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold">Core Messaging Pillars</h3>
          </div>
          <div className="flex flex-col gap-4">
            {(posData.core_messaging_pillars || []).map((pillar: any, i: number) => (
              <div key={i} className="flex flex-col gap-2 pb-4 border-b border-[#e2e2ea] last:border-0 last:pb-0">
                <span className="font-bold text-[15px] text-[#0c0c0e]">{pillar.pillar}</span>
                <p className="text-[14px] text-[#6e6e85] leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

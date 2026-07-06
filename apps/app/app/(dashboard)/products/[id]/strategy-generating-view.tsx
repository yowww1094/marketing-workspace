'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Loader2, Lightbulb, ArrowRight, Activity } from 'lucide-react';
import { Button } from '@marketing-workspace/ui/components/ui/button';

const TIPS = [
  "AI models analyze 50+ sources including industry reports, public filings, and social signals.",
  "Your business goals are heavily weighted to ensure the marketing strategy aligns with your targets.",
  "We cross-reference competitor data against your unique selling points to find positioning gaps.",
  "Customer personas include deep psychological motivators, not just basic demographics."
];

export function StrategyGeneratingView({ 
  product, 
  workflow, 
  onContinueInBackground 
}: { 
  product: any; 
  workflow: any;
  onContinueInBackground: () => void;
}) {
  const [tipIndex, setTipIndex] = useState(0);

  const jobs = workflow?.jobs || [];
  
  const expectedJobs = [
    { type: 'image_analysis', name: 'Image Analysis' },
    { type: 'product_extraction', name: 'Product Feature Extraction' },
    { type: 'market_research', name: 'Market Research' },
    { type: 'competitor_analysis', name: 'Competitor Analysis' },
    { type: 'customer_personas', name: 'Customer Personas' },
    { type: 'positioning', name: 'Positioning & Value Proposition' },
    { type: 'marketing_strategy', name: 'Marketing Strategy' },
    { type: 'seo_strategy', name: 'SEO Strategy' },
    { type: 'content_generation', name: 'Content Generation' },
  ];

  const completedCount = jobs.filter((j: any) => j.status === 'completed').length;
  const percentage = Math.round((completedCount / expectedJobs.length) * 100) || 0;
  
  const activeJobDef = expectedJobs.find(def => {
    const job = jobs.find((j: any) => j.type === def.type);
    return job?.status === 'running' || job?.status === 'pending' || !job;
  });

  return (
    <div className="flex flex-col items-center w-full max-w-[672px] mx-auto pt-[40px]">
      
      {/* Progress Header */}
      <div className="flex flex-col items-center mb-10 w-full">
        <div className="relative flex items-center justify-center w-[96px] h-[96px] mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e2ea" strokeWidth="8" />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#5b5bd6" 
              strokeWidth="8" 
              strokeDasharray="283" 
              strokeDashoffset={283 - (283 * percentage) / 100}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <span className="absolute text-[18px] font-bold text-[#0c0c0e]">{percentage}%</span>
        </div>

        <h1 className="text-[24px] font-bold text-[#0c0c0e] mb-2 text-center tracking-[-0.6px]">
          Generating your marketing strategy
        </h1>
        <p className="text-[14px] text-[#6e6e85] text-center mb-4">
          Analyzing market data, competitor positioning, and industry trends.
        </p>

        <div className="flex items-center gap-2 mb-2 text-[#5b5bd6]">
          <Activity className="w-4 h-4 animate-pulse" />
          <span className="text-[14px] font-medium">
            {activeJobDef ? `Running: ${activeJobDef.name}...` : 'Wrapping up...'}
          </span>
        </div>
        
        <p className="text-[12px] text-[#6e6e85]">
          Estimated time remaining: ~{Math.max(1, Math.ceil((expectedJobs.length - completedCount) * 4 / 60))} minutes
        </p>
      </div>

      {/* Generation Timeline */}
      <div className="bg-[#f8f8fb] border border-[#e2e2ea] rounded-[16px] w-full mb-6 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e2e2ea]">
          <h2 className="text-[14px] font-semibold text-[#0c0c0e]">Generation Timeline</h2>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {expectedJobs.map((jobDef) => {
            const actualJob = jobs.find((j: any) => j.type === jobDef.type);
            const status = actualJob?.status || 'pending';
            
            return (
              <div key={jobDef.type} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-[#00a36c]" />
                  ) : status === 'running' ? (
                    <div className="relative flex items-center justify-center w-5 h-5">
                      <div className="absolute w-5 h-5 bg-[#5b5bd6] rounded-full opacity-20 animate-ping"></div>
                      <div className="w-2 h-2 bg-[#5b5bd6] rounded-full"></div>
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-[#e2e2ea] fill-[#f1f1f5]" />
                  )}
                  <span className={`text-[14px] ${status === 'completed' ? 'text-[#0c0c0e]' : status === 'running' ? 'text-[#0c0c0e] font-medium' : 'text-[#6e6e85]'}`}>
                    {jobDef.name}
                  </span>
                </div>
                <div>
                  {status === 'completed' && <span className="text-[12px] text-[#00a36c]">Done</span>}
                  {status === 'running' && <span className="text-[12px] text-[#5b5bd6]">Running</span>}
                  {status === 'pending' && <span className="text-[12px] text-[#6e6e85]">Pending</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Did You Know */}
      <div className="w-full bg-[#f6f6fd] border border-[#e2e2f3] rounded-[12px] p-4 flex gap-3 mb-8">
        <Lightbulb className="w-5 h-5 text-[#5b5bd6] shrink-0 mt-0.5" />
        <div className="flex flex-col flex-1">
          <span className="text-[12px] font-semibold text-[#0c0c0e] mb-1">Did you know?</span>
          <p className="text-[12px] text-[#6e6e85] leading-relaxed">
            {TIPS[tipIndex]}
          </p>
        </div>
        <button 
          onClick={() => setTipIndex((prev) => (prev + 1) % TIPS.length)}
          className="text-[#5b5bd6] text-[12px] font-medium whitespace-nowrap hover:underline h-fit"
        >
          Next tip
        </button>
      </div>

      {/* Continue in background */}
      <Button 
        variant="ghost" 
        onClick={onContinueInBackground}
        className="text-[#6e6e85] hover:text-[#0c0c0e]"
      >
        Continue in background
      </Button>

    </div>
  );
}

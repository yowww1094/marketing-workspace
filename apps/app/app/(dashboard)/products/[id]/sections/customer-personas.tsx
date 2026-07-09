'use client';

import { User, AlertCircle, Heart } from 'lucide-react';

interface CustomerPersonasProps {
  product: any;
  workflow: any;
}

export function CustomerPersonas({ product, workflow }: CustomerPersonasProps) {
  const personasJob = workflow?.jobs?.find((j: any) => j.type === 'customer_personas');
  const personasData = personasJob?.result || {};

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1024px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-bold text-[#0c0c0e]">Customer Personas</h2>
        <p className="text-[14px] text-[#6e6e85]">
          Detailed profiles of your ideal buyers, including their pain points, goals, and buying triggers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {(personasData.personas || []).map((persona: any, i: number) => (
          <div key={i} className="bg-white border border-[#e2e2ea] rounded-xl overflow-hidden flex flex-col md:flex-row">
            {/* Persona Header (Left on Desktop, Top on Mobile) */}
            <div className="bg-[#f8f8fb] border-b md:border-b-0 md:border-r border-[#e2e2ea] p-6 flex flex-col justify-center items-center md:items-start min-w-[240px] gap-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <User className="w-8 h-8" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-[18px] font-bold text-[#0c0c0e]">{persona.name}</h3>
                <p className="text-[14px] text-indigo-600 font-medium">{persona.occupation}</p>
                <div className="inline-block mt-2 bg-white border border-[#e2e2ea] text-[#6e6e85] text-[12px] px-3 py-1 rounded-full">
                  {persona.age_range}
                </div>
              </div>
            </div>

            {/* Persona Details */}
            <div className="p-6 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pain Points */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#ef4444]">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-semibold text-[14px] text-[#0c0c0e]">Pain Points</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {(persona.pain_points || []).map((point: string, idx: number) => (
                    <li key={idx} className="flex gap-2 text-[13px] text-[#6e6e85] leading-relaxed">
                      <span className="text-[#ef4444]">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Goals */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#00a63e]">
                  <Target className="w-4 h-4" />
                  <span className="font-semibold text-[14px] text-[#0c0c0e]">Goals</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {(persona.goals || []).map((goal: string, idx: number) => (
                    <li key={idx} className="flex gap-2 text-[13px] text-[#6e6e85] leading-relaxed">
                      <span className="text-[#00a63e]">•</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buying Triggers */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#5b5bd6]">
                  <Heart className="w-4 h-4" />
                  <span className="font-semibold text-[14px] text-[#0c0c0e]">Buying Triggers</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {(persona.buying_triggers || []).map((trigger: string, idx: number) => (
                    <li key={idx} className="flex gap-2 text-[13px] text-[#6e6e85] leading-relaxed">
                      <span className="text-[#5b5bd6]">•</span>
                      <span>{trigger}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Target(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

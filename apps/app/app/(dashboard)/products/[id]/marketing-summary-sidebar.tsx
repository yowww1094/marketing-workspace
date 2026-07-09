'use client';

import { 
  FileText, 
  Globe, 
  Target, 
  Users, 
  Crosshair, 
  Lightbulb, 
  Search, 
  PenTool
} from 'lucide-react';
import { cn } from '@marketing-workspace/ui/lib/utils';

export type SummarySection = 
  | 'executive_summary'
  | 'market_research'
  | 'competitor_analysis'
  | 'customer_personas'
  | 'positioning'
  | 'marketing_strategy'
  | 'seo_strategy'
  | 'content_generation';

interface SidebarProps {
  activeSection: SummarySection;
  onSectionChange: (section: SummarySection) => void;
}

const SECTIONS: { id: SummarySection; label: string; icon: React.ElementType }[] = [
  { id: 'executive_summary', label: 'Executive Summary', icon: FileText },
  { id: 'market_research', label: 'Market Research', icon: Globe },
  { id: 'competitor_analysis', label: 'Competitor Analysis', icon: Target },
  { id: 'customer_personas', label: 'Customer Personas', icon: Users },
  { id: 'positioning', label: 'Brand Positioning', icon: Crosshair },
  { id: 'marketing_strategy', label: 'Marketing Strategy', icon: Lightbulb },
  { id: 'seo_strategy', label: 'SEO Strategy', icon: Search },
  { id: 'content_generation', label: 'Content Strategy', icon: PenTool },
];

export function MarketingSummarySidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="bg-[#f8f8fb] border-r border-[#e2e2ea] h-full w-[208px] shrink-0 flex flex-col">
      {/* Product Label / Context */}
      <div className="border-b border-[#e2e2ea] p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-indigo-50 flex items-center justify-center text-indigo-600">
            <FileText className="w-3 h-3" />
          </div>
          <span className="text-[12px] font-semibold text-[#0c0c0e] truncate">Marketing Report</span>
        </div>
        <div className="bg-[#f0fdf4] border border-[#b9f8cf] text-[#008236] text-[12px] font-medium px-3 py-1 rounded-full self-start">
          Complete
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex flex-col gap-1 p-2 overflow-y-auto">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          const Icon = section.icon;
          
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-left",
                isActive 
                  ? "bg-indigo-50 text-indigo-600 font-medium" 
                  : "text-[#6e6e85] hover:bg-[#f1f1f5] font-medium"
              )}
            >
              <Icon className="w-[14px] h-[14px]" />
              <span className="text-[12px]">{section.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

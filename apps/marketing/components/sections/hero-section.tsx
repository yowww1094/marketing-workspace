import Link from 'next/link';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { ArrowRight, Sparkles, LayoutDashboard, Search, Target, FileText, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden bg-white">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-100/50 blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-100/50 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Beta Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Now in public beta — join 2,400+ marketing teams</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#0c0c0e] mb-6 leading-[1.1]">
            Your AI-Powered Marketing <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Operating System</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-[#6e6e85] mb-10 max-w-2xl leading-relaxed">
            Marketing Workspace generates market research, competitor analysis, customer personas, and complete marketing strategies in minutes—not weeks.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a href={process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/register` : 'http://localhost:3001/register'} className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white h-12 px-8 text-base shadow-sm">
                Start for free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <Link href="#pricing" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full bg-white border-[#e2e2ea] text-[#0c0c0e] hover:bg-[#f8f8fb] h-12 px-8 text-base">
                View pricing
              </Button>
            </Link>
          </div>

          {/* Subtext */}
          <p className="mt-6 text-sm text-[#8c8c9a] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card required
            <span className="hidden sm:inline">·</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 hidden sm:inline" /> <span className="hidden sm:inline">Free plan available</span>
            <span className="hidden sm:inline">·</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 hidden sm:inline" /> <span className="hidden sm:inline">Setup in 2 minutes</span>
          </p>

        </div>

        {/* Product Mockup */}
        <div className="mt-24 relative mx-auto w-full max-w-5xl">
          <div className="rounded-xl border border-[#e2e2ea] bg-white shadow-2xl shadow-indigo-900/5 overflow-hidden">
            {/* Mockup Header */}
            <div className="h-12 bg-[#f8f8fb] border-b border-[#e2e2ea] flex items-center px-4 gap-20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="h-7 w-64 bg-white rounded-md border border-[#e2e2ea] flex items-center justify-center text-xs text-gray-400 font-medium">
                  app.marketingworkspace.com
                </div>
              </div>
              <div className="w-20" /> {/* Spacer */}
            </div>

            {/* Mockup Body */}
            <div className="flex h-[500px]">
              {/* Sidebar */}
              <div className="w-64 border-r border-[#e2e2ea] bg-[#f8f8fb] flex flex-col p-4">
                <div className="flex items-center gap-3 mb-8 px-2">
                  <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
                    <Target className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-semibold text-sm">Acme Corp</span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-600 text-sm font-medium">
                    <Search className="w-4 h-4" /> Market Research
                  </div>
                  <div className="flex items-center gap-3 px-2 py-2 rounded-md bg-indigo-50 text-indigo-700 text-sm font-medium">
                    <Target className="w-4 h-4" /> Competitor Analysis
                  </div>
                  <div className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-600 text-sm font-medium">
                    <LayoutDashboard className="w-4 h-4" /> Customer Personas
                  </div>
                  <div className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-600 text-sm font-medium">
                    <FileText className="w-4 h-4" /> Content Strategy
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 bg-white p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Competitor Analysis</h2>
                    <p className="text-sm text-gray-500">B2B SaaS — North America — Q2 2025</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium border border-emerald-100 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      AI Complete
                    </div>
                    <div className="px-4 py-1.5 rounded-md bg-white border border-gray-200 text-sm font-medium shadow-sm">
                      Export Report
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <p className="text-sm text-gray-500 mb-1">Direct Competitors</p>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-rose-500 mt-2">+3 new entrants</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <p className="text-sm text-gray-500 mb-1">Market Position</p>
                    <p className="text-2xl font-bold">Challenger</p>
                    <p className="text-xs text-emerald-500 mt-2">Strong growth potential</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <p className="text-sm text-gray-500 mb-1">Feature Gap</p>
                    <p className="text-2xl font-bold">Minimal</p>
                    <p className="text-xs text-emerald-500 mt-2">Parity achieved</p>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-indigo-100 bg-indigo-50/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-semibold text-indigo-900">AI Strategic Insight</h3>
                  </div>
                  <p className="text-indigo-800 text-sm leading-relaxed">
                    Based on recent competitor movements, there is a clear whitespace in mid-market enterprise features. Competitors A and B are moving upmarket, leaving a gap for your Challenger positioning to capture cost-sensitive teams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

import Link from 'next/link';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0c0c0e]">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] rounded-full bg-violet-600/20 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-indigo-200 text-sm font-medium mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          <span>Stop guessing. Start executing.</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          Ready to supercharge your <br className="hidden md:block" />
          marketing strategy?
        </h2>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Join thousands of marketing teams who have replaced weeks of manual research with AI-powered, instantly actionable roadmaps.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/register` : 'http://localhost:3001/register'} className="w-full sm:w-auto">
            <Button size="lg" className="w-full bg-[#5b5bd6] hover:bg-[#4a4ac0] text-white h-14 px-8 text-base shadow-lg shadow-indigo-500/25">
              Start for free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
          <Link href="mailto:sales@marketingworkspace.com" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 h-14 px-8 text-base">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

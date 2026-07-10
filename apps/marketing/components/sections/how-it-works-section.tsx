import { Cog } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Connect your brand",
      description: "Add your company details, target market, and business goals through a simple onboarding wizard."
    },
    {
      number: "02",
      title: "AI generates insights",
      description: "Our models research your market, analyze competitors, and build personas automatically in the background."
    },
    {
      number: "03",
      title: "Build your strategy",
      description: "Organize, refine, and collaborate on every marketing deliverable within a single, cohesive workspace."
    },
    {
      number: "04",
      title: "Execute and scale",
      description: "Export briefs, share roadmaps, and track outcomes as you move from planning to execution."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white border-b border-[#e2e2ea]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-50 border border-[#e2e2ea] text-[#0c0c0e] text-xs font-semibold uppercase tracking-wider mb-6">
            <Cog className="w-3.5 h-3.5" />
            How it works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0c0c0e]">
            Strategy in hours, not months
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col relative group">
              {/* Connecting line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[60px] right-[-20px] h-[1px] bg-gray-200" />
              )}
              
              <div className="text-4xl font-black text-gray-200 mb-6 bg-white w-fit relative z-10 pr-4 group-hover:text-indigo-600 transition-colors">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-[#0c0c0e] mb-3">{step.title}</h3>
              <p className="text-[#6e6e85] leading-relaxed text-[15px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

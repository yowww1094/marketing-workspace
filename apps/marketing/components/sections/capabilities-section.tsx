import { Search, Target, Users, MapPin, FileText, Route, Sparkles } from 'lucide-react';

export function CapabilitiesSection() {
  const capabilities = [
    {
      icon: <Search className="w-5 h-5 text-indigo-600" />,
      title: "Market Research",
      description: "AI-powered deep dives into your market. TAM/SAM/SOM analysis, growth opportunities, and trend forecasting."
    },
    {
      icon: <Target className="w-5 h-5 text-indigo-600" />,
      title: "Competitor Analysis",
      description: "Track competitors across positioning, messaging, pricing, and feature gaps. Automatically updated."
    },
    {
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      title: "Customer Personas",
      description: "Build detailed, research-backed personas. Understand pain points, buying motivations, and objections."
    },
    {
      icon: <MapPin className="w-5 h-5 text-indigo-600" />,
      title: "Brand Positioning",
      description: "Sharpen your differentiation. AI helps you craft positioning statements that resonate and convert."
    },
    {
      icon: <FileText className="w-5 h-5 text-indigo-600" />,
      title: "Content Strategy",
      description: "Plan, brief, and organize content with strategic intent tailored to your unique audience segments."
    },
    {
      icon: <Route className="w-5 h-5 text-indigo-600" />,
      title: "Marketing Roadmaps",
      description: "Translate strategy into a prioritized, team-aligned execution plan that drives real business results."
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#f8f8fb]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#e2e2ea] text-[#0c0c0e] text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0c0c0e] mb-6">
            Everything your marketing team needs
          </h2>
          <p className="text-lg text-[#6e6e85]">
            Six core deliverables, all AI-powered, all living in one cohesive workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 border border-[#e2e2ea] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6">
                {cap.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#0c0c0e] mb-3">{cap.title}</h3>
              <p className="text-[#6e6e85] leading-relaxed text-[15px]">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

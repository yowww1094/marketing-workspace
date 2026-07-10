export function SocialProofSection() {
  return (
    <section className="py-12 border-b border-[#e2e2ea] bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto text-center md:text-left">
          
          <div className="flex flex-col gap-1">
            <span className="text-3xl md:text-4xl font-bold tracking-tight text-[#0c0c0e]">2,400+</span>
            <span className="text-[15px] text-[#6e6e85]">Marketing teams</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-3xl md:text-4xl font-bold tracking-tight text-[#0c0c0e]">40hrs</span>
            <span className="text-[15px] text-[#6e6e85]">Saved per team weekly</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-3xl md:text-4xl font-bold tracking-tight text-[#0c0c0e]">4.9/5</span>
            <span className="text-[15px] text-[#6e6e85]">Customer rating</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-3xl md:text-4xl font-bold tracking-tight text-[#0c0c0e]">SOC 2</span>
            <span className="text-[15px] text-[#6e6e85]">Type II certified</span>
          </div>

        </div>
      </div>
    </section>
  );
}

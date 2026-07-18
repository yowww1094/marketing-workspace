export function MfaAdoption() {
  return (
    <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-5 flex flex-col">
      <h2 className="text-sm font-semibold text-[#0c0c0e] mb-5">MFA Adoption by Plan</h2>

      <div className="flex flex-col gap-4">
        
        {/* Enterprise */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-[#0c0c0e]">Enterprise</span>
            <span className="text-[#6e6e85]">82% (148 users)</span>
          </div>
          <div className="h-2 w-full bg-[#f1f1f5] rounded-full overflow-hidden">
            <div className="h-full bg-[#00c950] rounded-full" style={{ width: '82%' }} />
          </div>
        </div>

        {/* Growth */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-[#0c0c0e]">Growth</span>
            <span className="text-[#6e6e85]">41% (347 users)</span>
          </div>
          <div className="h-2 w-full bg-[#f1f1f5] rounded-full overflow-hidden">
            <div className="h-full bg-[#5b5bd6] rounded-full" style={{ width: '41%' }} />
          </div>
        </div>

        {/* Free */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-[#0c0c0e]">Free</span>
            <span className="text-[#6e6e85]">12% (218 users)</span>
          </div>
          <div className="h-2 w-full bg-[#f1f1f5] rounded-full overflow-hidden">
            <div className="h-full bg-[#fe9a00] rounded-full" style={{ width: '12%' }} />
          </div>
        </div>

      </div>

      <div className="mt-auto pt-6">
        <button className="w-full border-[1.25px] border-[#e2e2ea] rounded-[6px] py-1.5 text-xs font-medium text-[#0c0c0e] hover:bg-zinc-50 transition-colors">
          Enforce MFA for all Enterprise
        </button>
      </div>

    </div>
  );
}

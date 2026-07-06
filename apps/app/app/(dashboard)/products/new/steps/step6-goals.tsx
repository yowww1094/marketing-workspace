'use client';

export function Step6Goals() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[605px] mx-auto">
      <div className="flex flex-col">
        <h2 className="text-[18px] font-semibold text-[#0c0c0e] leading-[28px]">
          Business Goals
        </h2>
        <p className="text-[14px] text-[#6e6e85] leading-[20px] mt-1">
          What are you trying to achieve?
        </p>
      </div>
      <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
        Multi-select goal options will be implemented here.
      </div>
    </div>
  );
}

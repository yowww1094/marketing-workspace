import { FailedLogin } from '@/lib/security';
import { cn } from '@marketing-workspace/ui/utils';

export function FailedLoginsTable({ data }: { data: FailedLogin[] }) {
  return (
    <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] flex flex-col overflow-hidden">
      <div className="p-4 border-b border-[#e2e2ea]">
        <h2 className="text-sm font-semibold text-[#0c0c0e]">Failed Login Attempts</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f1f1f5]/30 border-b border-[#e2e2ea] text-[11px] font-semibold text-[#6e6e85]">
              <th className="px-4 py-2.5 font-semibold">User / Email</th>
              <th className="px-4 py-2.5 font-semibold">IP Address</th>
              <th className="px-4 py-2.5 font-semibold">Attempts</th>
              <th className="px-4 py-2.5 font-semibold">Time</th>
              <th className="px-4 py-2.5 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="text-[12px] text-[#0c0c0e]">
            {data.map((row, i) => (
              <tr key={i} className="border-b border-[#e2e2ea] last:border-0 hover:bg-zinc-50/50">
                <td className="px-4 py-3 truncate max-w-[140px]">{row.user_email}</td>
                <td className="px-4 py-3 font-mono text-[10px]">{row.ip_address}</td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[11px] font-medium",
                    row.attempts > 10 ? "bg-[#fef2f2] text-[#e7000b] border border-[#ffc9c9]" :
                    row.attempts > 3 ? "bg-[#fffbeb] text-[#bb4d00] border border-[#fee685]" :
                    "bg-[#f1f1f5] text-[#6e6e85]"
                  )}>
                    {row.attempts}×
                  </span>
                </td>
                <td className="px-4 py-3 text-[11px] text-[#6e6e85]">
                  {new Date(row.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className={cn(
                  "px-4 py-3 text-[10px]",
                  row.action === 'None' ? "text-[#6e6e85]" : "text-[#bb4d00]"
                )}>
                  {row.action}
                </td>
              </tr>
            ))}
            
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-zinc-500">
                  No failed logins recently.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

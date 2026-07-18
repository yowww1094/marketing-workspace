import { SecurityAlert } from '@/lib/security';
import { AlertTriangle, AlertCircle } from 'lucide-react';

export function SecurityAlerts({ alerts }: { alerts: SecurityAlert[] }) {
  if (alerts.length === 0) return null;

  return (
    <div className="bg-[#fef2f2] border-[1.25px] border-[#ffc9c9] rounded-[12px] p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-[#c10007]" />
        <h2 className="text-sm font-semibold text-[#c10007]">Security Alerts ({alerts.length})</h2>
      </div>

      <div className="flex flex-col gap-2">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className="bg-white/70 border-[1.25px] border-[#ffc9c9] rounded-[8px] p-3 flex items-start gap-3"
          >
            {alert.severity === 'critical' ? (
              <AlertTriangle className="h-4 w-4 text-[#9f0712] mt-0.5 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-[#bb4d00] mt-0.5 shrink-0" />
            )}
            
            <p className="flex-1 text-xs text-[#9f0712] font-medium leading-relaxed">
              {alert.message}
            </p>
            
            {alert.severity === 'critical' ? (
              <span className="bg-[#ffe2e2] text-[#9f0712] border border-[#ffa2a2] px-2 py-0.5 rounded-[4px] text-[10px] font-semibold">
                critical
              </span>
            ) : alert.severity === 'high' ? (
              <span className="bg-[#fef2f2] text-[#e7000b] border border-[#ffc9c9] px-2 py-0.5 rounded-[4px] text-[10px] font-medium">
                high
              </span>
            ) : (
              <span className="bg-[#fffbeb] text-[#bb4d00] border border-[#fee685] px-2 py-0.5 rounded-[4px] text-[10px] font-medium">
                warning
              </span>
            )}
            
            <span className="text-[10px] text-[#6e6e85] shrink-0 mt-0.5">
              {new Date(alert.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

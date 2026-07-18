import { getSecurityData } from '@/lib/security';
import { ShieldAlert, ShieldX, KeyRound, MonitorSmartphone } from 'lucide-react';
import { SecurityAlerts } from './security-alerts';
import { FailedLoginsTable } from './failed-logins-table';
import { MfaAdoption } from './mfa-adoption';

export default async function SecurityPage() {
  const { kpis, alerts, failedLogins } = await getSecurityData();

  return (
    <div className="flex flex-col w-full gap-6 max-w-[1200px]">
      
      {/* Header */}
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-[#0c0c0e] tracking-tight">Security Center</h1>
        <p className="text-sm text-[#6e6e85] mt-1">Monitor authentication, threats, and access control</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6e6e85]">Failed Logins (24h)</span>
            <ShieldX className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-xl font-bold text-[#0c0c0e]">{kpis.failedLogins24h}</span>
        </div>

        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6e6e85]">Blocked IPs</span>
            <ShieldAlert className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-xl font-bold text-[#0c0c0e]">{kpis.blockedIps}</span>
        </div>

        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6e6e85]">MFA Adoption</span>
            <KeyRound className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-xl font-bold text-[#0c0c0e]">{kpis.mfaAdoption}</span>
          <div className="absolute bottom-4 right-4 flex items-center gap-1">
            <span className="text-[11px] font-medium text-[#00a63e]">+4pp this month</span>
          </div>
        </div>

        <div className="bg-[#f8f8fb] border-[1.25px] border-[#e2e2ea] rounded-[12px] p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6e6e85]">Active Sessions</span>
            <MonitorSmartphone className="h-4 w-4 text-[#6e6e85]" />
          </div>
          <span className="text-xl font-bold text-[#0c0c0e]">{kpis.activeSessions}</span>
        </div>
      </div>

      {/* Security Alerts Banner */}
      <SecurityAlerts alerts={alerts} />

      {/* Tables Row */}
      <div className="grid grid-cols-2 gap-5 mt-2">
        <FailedLoginsTable data={failedLogins} />
        <MfaAdoption />
      </div>

    </div>
  );
}

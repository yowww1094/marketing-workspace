import { createAdminClient } from '@marketing-workspace/auth/admin';

export type SecurityAlert = {
  id: string;
  severity: 'info' | 'warning' | 'high' | 'critical';
  event_type: string;
  message: string;
  ip_address: string | null;
  user_id: string | null;
  status: 'open' | 'investigating' | 'resolved';
  created_at: string;
};

export type FailedLogin = {
  user_email: string;
  ip_address: string;
  attempts: number;
  time: string;
  action: string;
};

export async function getSecurityData() {
  const supabase = createAdminClient();
  
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

  // 1. Failed Logins KPI (from activity logs)
  const { count: failedLoginsCount } = await supabase
    .from('activity_logs')
    .select('*', { count: 'exact', head: true })
    .eq('action', 'login_failed')
    .gte('created_at', yesterday);

  // 2. Blocked IPs count
  const { count: blockedIpsCount } = await supabase
    .from('blocked_ips')
    .select('*', { count: 'exact', head: true });

  // 3. Security Alerts List
  const { data: alerts } = await supabase
    .from('security_alerts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  // 4. Failed Login Attempts List (Aggregated logic)
  const { data: rawFailedLogins } = await supabase
    .from('activity_logs')
    .select('user_email, metadata, created_at')
    .eq('action', 'login_failed')
    .order('created_at', { ascending: false })
    .limit(100);

  // Aggregate by IP and Email
  const failedMap = new Map<string, FailedLogin>();
  
  if (rawFailedLogins) {
    for (const log of rawFailedLogins) {
      const email = log.user_email || 'unknown@test.com';
      const ip = log.metadata?.ip || '127.0.0.1';
      const key = `${email}-${ip}`;
      
      if (!failedMap.has(key)) {
        failedMap.set(key, {
          user_email: email,
          ip_address: ip,
          attempts: 1,
          time: log.created_at,
          action: 'None' // Will be calculated
        });
      } else {
        const entry = failedMap.get(key)!;
        entry.attempts += 1;
      }
    }
  }

  // Determine actions based on attempts
  const failedLogins = Array.from(failedMap.values()).map(entry => {
    if (entry.attempts > 10) entry.action = 'IP Blocked';
    else if (entry.attempts > 3) entry.action = 'Locked 30m';
    else entry.action = 'None';
    return entry;
  }).slice(0, 5); // Take top 5

  return {
    kpis: {
      failedLogins24h: failedLoginsCount || 0,
      blockedIps: blockedIpsCount || 0,
      mfaAdoption: '34.2%', // Hardcoded for Phase 1
      activeSessions: 412, // Hardcoded for Phase 1
    },
    alerts: (alerts as SecurityAlert[]) || [],
    failedLogins
  };
}

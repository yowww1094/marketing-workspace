import { createClient } from '@marketing-workspace/auth/server';

type SecurityEventParams = {
  severity: 'info' | 'warning' | 'high' | 'critical';
  eventType: string;
  message: string;
  ipAddress?: string;
  userId?: string;
  metadata?: any;
};

export async function reportSecurityIssue(params: SecurityEventParams) {
  const supabase = await createClient();
  
  const { error } = await supabase.from('security_alerts').insert({
    severity: params.severity,
    event_type: params.eventType,
    message: params.message,
    ip_address: params.ipAddress || null,
    user_id: params.userId || null,
    metadata: params.metadata || {},
    status: 'open',
  });

  if (error) {
    console.error('Failed to log security alert:', error);
  }
}

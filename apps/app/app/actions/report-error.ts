'use server';

import { createClient } from '@marketing-workspace/auth/server';
import { createServiceRoleClient } from '@marketing-workspace/database';
import { formatErrorLog, LogContext, LogLevel } from '@marketing-workspace/monitoring';
import { headers } from 'next/headers';

export async function reportErrorAction(
  errorInfo: { message: string; stack?: string },
  level: LogLevel = 'error',
  additionalContext?: Partial<LogContext>
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    // We use the service_role client because RLS might prevent normal inserts depending on the policy, 
    // or if the user is unauthenticated and anon insert is blocked.
    // In our case, anon and authenticated CAN insert, but it's safe to just use the standard client or service client.
    // Let's just use the normal client if RLS allows it, or service role to guarantee it writes.
    // Actually, creating a service_role client requires the service role key.
    
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || undefined;
    const ip = headersList.get('x-forwarded-for') || undefined;

    const logData = formatErrorLog(errorInfo, level, {
      userId: user?.id,
      browser: userAgent,
      clientIp: ip,
      ...additionalContext,
    });

    const supabaseAdmin = createServiceRoleClient();
    await supabaseAdmin.from('system_logs').insert(logData as any);
    
    return { success: true };
  } catch (err) {
    console.error('Failed to report error to system_logs:', err);
    return { success: false };
  }
}

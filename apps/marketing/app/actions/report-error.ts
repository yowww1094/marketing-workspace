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

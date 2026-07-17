import { createAdminClient } from '@marketing-workspace/auth/admin';

export type ActivityType = 'auth' | 'user' | 'billing' | 'ai' | 'admin' | 'system';

export async function logActivity({
  userId,
  workspaceId,
  type,
  action,
  description,
  metadata,
  ipAddress,
}: {
  userId?: string;
  workspaceId?: string;
  type: ActivityType;
  action: string;
  description: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
}) {
  try {
    const supabase = createAdminClient();
    
    await supabase.from('activity_logs').insert({
      user_id: userId || null,
      workspace_id: workspaceId || null,
      type,
      action,
      description,
      metadata: metadata || null,
      ip_address: ipAddress || null,
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
    // We don't throw here to avoid disrupting the main flow
  }
}

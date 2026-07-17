import { createAdminClient } from '@marketing-workspace/auth/admin';

export type ActivityEvent = {
  id: string;
  created_at: string;
  message: string;
  description: string;
  email: string;
  type: 'auth' | 'user' | 'billing' | 'ai' | 'admin' | 'system';
};

export async function getActivityLogs({ search = '' }: { search?: string }) {
  const supabase = createAdminClient();

  try {
    let query = supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(100);

    if (search) {
      query = query.or(`message.ilike.%${search}%,description.ilike.%${search}%,action.ilike.%${search}%`);
    }

    const { data: logsData, error } = await query;

    if (error || !logsData) {
      console.error('Failed to fetch activity logs:', error);
      return { logs: [] };
    }

    // Cross-reference user emails
    const userIds = logsData.map(l => l.user_id).filter(Boolean) as string[];
    const userMap = new Map<string, string>();

    if (userIds.length > 0) {
      for (const uid of Array.from(new Set(userIds))) {
        try {
          const { data: userData } = await supabase.auth.admin.getUserById(uid);
          if (userData?.user?.email) {
            userMap.set(uid, userData.user.email);
          }
        } catch (e) {
          // Ignore
        }
      }
    }

    const events: ActivityEvent[] = logsData.map(l => ({
      id: l.id,
      created_at: l.created_at,
      message: l.action.replace(/[_\.]/g, ' '),
      description: l.description,
      email: l.user_id ? userMap.get(l.user_id) || 'Unknown User' : 'System',
      type: l.type as any,
    }));

    return { logs: events };
  } catch (error) {
    console.error('Failed to fetch activity logs:', error);
    return { logs: [] };
  }
}

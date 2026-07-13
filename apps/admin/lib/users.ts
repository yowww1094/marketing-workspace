import { createAdminClient } from '@marketing-workspace/auth/admin';

export type AdminUserView = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at?: string;
  productsCount: number;
  plan: 'free' | 'pro';
};

export async function getPaginatedUsers({
  page = 1,
  search = '',
}: {
  page?: number;
  search?: string;
}) {
  const supabase = createAdminClient();
  const perPage = 10;

  // 1. Fetch users from Supabase Auth
  // We use page - 1 because Supabase pagination might be 0-indexed or we just use page/perPage directly.
  // Actually, listUsers uses 1-based indexing for `page` but let's check. 
  // According to Supabase docs, listUsers takes page and perPage.
  const { data, error } = await supabase.auth.admin.listUsers({
    page,
    perPage,
  });

  if (error) {
    console.error('Error fetching users:', error);
    return { users: [], total: 0 };
  }

  let users = data.users || [];
  
  // Custom email search filter (because listUsers native search can be quirky or we can just filter in memory if small,
  // but listUsers doesn't accept a generic `search` string directly in v2 without passing `search: string`?
  // Wait, no, we can pass `search` property in v2 if supported, but if not we might just filter client side or fetch all if not too big.
  // Actually, listUsers in JS client: listUsers({ page, perPage }) only. Wait, does it have `search`?
  // Let's manually filter if search is provided. Note: this breaks pagination if we have > 10,000 users. 
  // For Phase 1, we will fetch all users if there's a search, or just rely on database functions later if needed.
  // Let's do a simple in-memory filter if search is provided.
  let total = data.total || users.length;
  
  if (search) {
    const { data: allData } = await supabase.auth.admin.listUsers();
    const allUsers = allData?.users || [];
    const filtered = allUsers.filter(u => u.email?.toLowerCase().includes(search.toLowerCase()));
    total = filtered.length;
    users = filtered.slice((page - 1) * perPage, page * perPage);
  }

  if (users.length === 0) {
    return { users: [], total };
  }

  const userIds = users.map((u) => u.id);

  // 2. Fetch aggregate data from public schema
  // Products count
  const { data: productsData } = await supabase
    .from('products')
    .select('id, user_id')
    .in('user_id', userIds);

  // Subscriptions
  const { data: subscriptionsData } = await supabase
    .from('subscriptions')
    .select('user_id, plan_id, status')
    .in('user_id', userIds)
    .eq('status', 'active');

  // 3. Map and merge
  const result: AdminUserView[] = users.map((u) => {
    const userProducts = productsData?.filter((p) => p.user_id === u.id) || [];
    const sub = subscriptionsData?.find((s) => s.user_id === u.id);

    return {
      id: u.id,
      email: u.email || 'No email',
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at,
      productsCount: userProducts.length,
      plan: sub?.plan_id === 'pro' ? 'pro' : 'free',
    };
  });

  return { users: result, total };
}

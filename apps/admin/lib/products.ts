import { createAdminClient } from '@marketing-workspace/auth/admin';

export type AdminProductView = {
  id: string;
  name: string;
  category: string;
  status: string;
  created_at: string;
  owner_email: string;
  owner_id: string;
};

export async function getPaginatedProducts({
  page = 1,
  search = '',
}: {
  page?: number;
  search?: string;
}) {
  const supabase = createAdminClient();
  const perPage = 10;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  // 1. Build Query
  let query = supabase
    .from('products')
    .select('id, name, category, status, created_at, user_id', { count: 'exact' });

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  // 2. Execute Query
  const { data: productsData, count, error } = await query
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error || !productsData) {
    console.error('Error fetching products:', error);
    return { products: [], total: 0 };
  }

  if (productsData.length === 0) {
    return { products: [], total: count || 0 };
  }

  // 3. Fetch Owners (Emails)
  // Extract unique user_ids
  const userIds = Array.from(new Set(productsData.map(p => p.user_id)));
  
  // listUsers doesn't have an `in` filter easily, so we just fetch users up to a reasonable limit,
  // or we map it manually. Given we have a relatively small subset of owners, getting users 
  // via listUsers or just looping might be okay. Wait, auth.admin.getUserById exists!
  // To avoid fetching thousands of users if there's no way to filter listUsers by ID,
  // we can just fetch all users if it's < 1000, or `Promise.all` `getUserById` for the 10 unique users.
  // Promise.all(getUserById) is VERY fast for max 10 users!
  const userMap = new Map<string, string>();
  
  await Promise.all(
    userIds.map(async (uid) => {
      const { data } = await supabase.auth.admin.getUserById(uid);
      if (data.user) {
        userMap.set(uid, data.user.email || 'No email');
      }
    })
  );

  // 4. Map to View
  const products: AdminProductView[] = productsData.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    status: p.status,
    created_at: p.created_at,
    owner_id: p.user_id,
    owner_email: userMap.get(p.user_id) || 'Unknown User',
  }));

  return { products, total: count || 0 };
}

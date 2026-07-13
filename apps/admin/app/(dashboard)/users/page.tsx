import { getPaginatedUsers } from '@/lib/users';
import { UsersTable } from './users-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@marketing-workspace/ui/components/ui/card';

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page, 10) : 1;
  const search = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';

  const { users, total } = await getPaginatedUsers({ page, search });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950">Users</h1>
        <p className="text-sm text-zinc-500">Manage your customers and view their platform usage.</p>
      </div>

      <Card className="shadow-sm border-zinc-200">
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>View all registered users and their current subscription plans.</CardDescription>
        </CardHeader>
        <CardContent>
          <UsersTable 
            users={users} 
            total={total} 
            currentPage={page} 
            searchQuery={search} 
          />
        </CardContent>
      </Card>
    </div>
  );
}

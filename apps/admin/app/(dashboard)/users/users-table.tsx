'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@marketing-workspace/ui/components/ui/table';
import { Input } from '@marketing-workspace/ui/components/ui/input';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { Badge } from '@marketing-workspace/ui/components/ui/badge';
import { Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { AdminUserView } from '@/lib/users';
import { UserDetailsSheet } from './user-details-sheet';

interface UsersTableProps {
  users: AdminUserView[];
  total: number;
  currentPage: number;
  searchQuery: string;
}

export function UsersTable({ users, total, currentPage, searchQuery }: UsersTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState(searchQuery);
  const [selectedUser, setSelectedUser] = useState<AdminUserView | null>(null);
  
  const perPage = 10;
  const totalPages = Math.ceil(total / perPage);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/users?q=${encodeURIComponent(search)}&page=1`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    router.push(`/users?q=${encodeURIComponent(searchQuery)}&page=${newPage}`);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <form onSubmit={handleSearch} className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <Input 
            placeholder="Search by email..." 
            className="pl-9 bg-zinc-50/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      {/* Table */}
      <div className="rounded-md border border-zinc-200 bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50 hover:bg-zinc-50">
              <TableHead>Email</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-zinc-900">{user.email}</TableCell>
                  <TableCell className="text-zinc-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-zinc-500">
                    {user.productsCount}
                  </TableCell>
                  <TableCell>
                    {user.plan === 'pro' ? (
                      <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">Pro</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-zinc-100 text-zinc-700 hover:bg-zinc-200">Free</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setSelectedUser(user)}
                      className="text-zinc-500 hover:text-zinc-900"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View Details</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            Showing <span className="font-medium">{((currentPage - 1) * perPage) + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * perPage, total)}</span> of{' '}
            <span className="font-medium">{total}</span> users
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Details Sheet */}
      <UserDetailsSheet 
        user={selectedUser} 
        open={selectedUser !== null} 
        onOpenChange={(open) => {
          if (!open) setSelectedUser(null);
        }} 
      />
    </div>
  );
}

import { ReactNode } from 'react';
import Link from 'next/link';
import { Home, Users, Package, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { logout } from '@/app/auth/actions';
import { Button } from '@marketing-workspace/ui/components/ui/button';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-zinc-50">
      {/* Sidebar */}
      <aside className="w-64 flex-col border-r bg-white flex shrink-0">
        <div className="flex h-16 items-center px-6 border-b">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-zinc-950 text-white">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <span>Admin OS</span>
          </Link>
        </div>
        
        <nav className="flex-1 space-y-1 p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/users"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
          >
            <Users className="h-4 w-4" />
            Users
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
          >
            <Package className="h-4 w-4" />
            Products
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t">
          <form action={logout}>
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-500 hover:text-zinc-900"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-zinc-50/50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

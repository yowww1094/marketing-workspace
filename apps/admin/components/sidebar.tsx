'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@marketing-workspace/ui/utils';
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { logout } from '@/app/auth/actions';

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    label: 'Users',
    icon: Users,
    href: '/users',
  },
  {
    label: 'Products',
    icon: Package,
    href: '/products',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
  {
    label: 'AI Operations',
    icon: Sparkles,
    href: '/ai',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-[252px] flex-col border-r border-border bg-white px-4 py-6 fixed left-0 top-0 bottom-0 z-10">
      <Link href="/" className="flex items-center gap-3 px-2 mb-10">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-white shadow-sm">
          <LayoutDashboard className="h-4 w-4" />
        </div>
        <span className="font-semibold text-sm tracking-tight">Admin OS</span>
      </Link>

      <div className="flex-1 space-y-1">
        {routes.map((route) => {
          const isActive = pathname === route.href || (route.href !== '/' && pathname.startsWith(route.href));
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-zinc-100/80 text-zinc-950 shadow-sm"
                  : "text-muted-foreground hover:bg-zinc-50 hover:text-zinc-950"
              )}
            >
              <route.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
              {route.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto space-y-1 pt-4 border-t border-border">
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}

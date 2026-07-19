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
  CreditCard,
  Terminal,
  Activity,
  AlertCircle,
  ShieldAlert,
} from 'lucide-react';
import { logout } from '@/app/auth/actions';

type Route = {
  label: string;
  icon: any;
  href: string;
};

type RouteGroup = {
  title?: string;
  items: Route[];
};

const routeGroups: RouteGroup[] = [
  {
    items: [
      {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/',
      }
    ]
  },
  {
    title: 'Users',
    items: [
      { label: 'Users', icon: Users, href: '/users' },
      { label: 'Products', icon: Package, href: '/products' },
    ]
  },
  {
    title: 'AI Platform',
    items: [
      { label: 'AI Operations', icon: Sparkles, href: '/ai' },
      { label: 'AI Configuration', icon: Settings, href: '/ai/configure' },
    ]
  },
  {
    title: 'Business',
    items: [
      { label: 'Analytics', icon: Activity, href: '/analytics' },
      { label: 'Billing', icon: CreditCard, href: '/billing' },
    ]
  },
  {
    title: 'Support',
    items: [
      { label: 'Activity Logs', icon: Terminal, href: '/logs' },
      { label: 'Error Logs', icon: AlertCircle, href: '/errors' },
    ]
  },
  {
    title: 'Infrastructure',
    items: [
      { label: 'Security', icon: ShieldAlert, href: '/security' },
      { label: 'System Health', icon: Activity, href: '/health' },
      { label: 'System Settings', icon: Settings, href: '/settings' },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-[252px] flex-col border-r border-border bg-white px-4 py-6 fixed left-0 top-0 bottom-0 z-10 overflow-y-auto">
      <Link href="/" className="flex items-center gap-3 px-2 mb-8 shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5b5bd6] text-white shadow-sm">
          <LayoutDashboard className="h-4 w-4" />
        </div>
        <span className="font-semibold text-sm tracking-tight">Admin OS</span>
      </Link>

      <div className="flex-1 space-y-6">
        {routeGroups.map((group, index) => (
          <div key={index} className="flex flex-col">
            {group.title && (
              <h4 className="px-3 mb-2 text-[10px] font-semibold tracking-wider text-[#6e6e85] uppercase">
                {group.title}
              </h4>
            )}
            <div className="space-y-1">
              {group.items.map((route) => {
                const isActive = pathname === route.href || (route.href !== '/' && pathname.startsWith(route.href));
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center gap-3 rounded-[6px] px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[#5b5bd6]/10 text-[#5b5bd6]"
                        : "text-[#6e6e85] hover:bg-zinc-50 hover:text-zinc-950"
                    )}
                  >
                    <route.icon className={cn("h-[14px] w-[14px]", isActive ? "text-[#5b5bd6]" : "text-[#6e6e85]")} />
                    {route.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-1 pt-4 border-t border-border shrink-0">
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

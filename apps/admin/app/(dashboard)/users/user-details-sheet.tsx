'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@marketing-workspace/ui/components/ui/sheet';
import { Badge } from '@marketing-workspace/ui/components/ui/badge';
import { Separator } from '@marketing-workspace/ui/components/ui/separator';
import { AdminUserView } from '@/lib/users';
import { Mail, Calendar, Package, CreditCard, Clock } from 'lucide-react';

interface UserDetailsSheetProps {
  user: AdminUserView | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailsSheet({ user, open, onOpenChange }: UserDetailsSheetProps) {
  if (!user) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md bg-white overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-bold text-zinc-900">User Details</SheetTitle>
          <SheetDescription>
            ID: <span className="font-mono text-xs">{user.id}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 border border-zinc-200">
                <span className="text-lg font-medium text-zinc-600">
                  {user.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-zinc-900">{user.email}</h3>
                <p className="text-sm text-zinc-500">Customer</p>
              </div>
            </div>
            {user.plan === 'pro' ? (
              <Badge variant="default" className="bg-emerald-500">Pro Plan</Badge>
            ) : (
              <Badge variant="secondary" className="bg-zinc-100 text-zinc-700">Free Plan</Badge>
            )}
          </div>

          <Separator className="bg-zinc-200" />

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <Package className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Products</span>
              </div>
              <p className="text-2xl font-bold text-zinc-900">{user.productsCount}</p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                <CreditCard className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Status</span>
              </div>
              <p className="text-lg font-semibold text-zinc-900 mt-1 capitalize">{user.plan}</p>
            </div>
          </div>

          <Separator className="bg-zinc-200" />

          {/* Detailed Info List */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-zinc-900">Account Information</h4>
            
            <div className="flex items-center justify-between py-2 border-b border-zinc-100">
              <div className="flex items-center gap-3 text-zinc-500">
                <Mail className="h-4 w-4" />
                <span className="text-sm">Email Address</span>
              </div>
              <span className="text-sm font-medium text-zinc-900">{user.email}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-zinc-100">
              <div className="flex items-center gap-3 text-zinc-500">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Joined Date</span>
              </div>
              <span className="text-sm font-medium text-zinc-900">
                {new Date(user.created_at).toLocaleDateString(undefined, { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-zinc-100">
              <div className="flex items-center gap-3 text-zinc-500">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Last Sign In</span>
              </div>
              <span className="text-sm font-medium text-zinc-900">
                {user.last_sign_in_at 
                  ? new Date(user.last_sign_in_at).toLocaleDateString(undefined, { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'Never'}
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

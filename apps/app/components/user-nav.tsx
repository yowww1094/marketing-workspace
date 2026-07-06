'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@marketing-workspace/ui/components/ui/avatar"
import { Button } from "@marketing-workspace/ui/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@marketing-workspace/ui/components/ui/dropdown-menu"

import { User, CreditCard, Settings, LogOut } from 'lucide-react';
import { logout } from '@/app/auth/actions';

export function UserNav({ fullName, email }: { fullName: string; email: string }) {
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-1 ring-zinc-200 shadow-sm hover:bg-zinc-50">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt={`@${fullName}`} />
            <AvatarFallback className="bg-[#5b5bd6]/10 text-[#5b5bd6] font-medium">{initials || 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 rounded-xl border border-zinc-200 bg-white/95 backdrop-blur-md shadow-xl p-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal px-2 py-2">
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm font-semibold leading-none text-zinc-950">{fullName}</p>
            <p className="text-xs leading-none text-muted-foreground font-medium">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-100 my-1" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="rounded-lg cursor-pointer focus:bg-zinc-100 focus:text-zinc-950 px-2.5 py-2 text-zinc-600 transition-colors">
            <User className="mr-2.5 h-4 w-4" />
            <span className="text-sm font-medium">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg cursor-pointer focus:bg-zinc-100 focus:text-zinc-950 px-2.5 py-2 text-zinc-600 transition-colors">
            <CreditCard className="mr-2.5 h-4 w-4" />
            <span className="text-sm font-medium">Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg cursor-pointer focus:bg-zinc-100 focus:text-zinc-950 px-2.5 py-2 text-zinc-600 transition-colors">
            <Settings className="mr-2.5 h-4 w-4" />
            <span className="text-sm font-medium">Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-zinc-100 my-1" />
        <form action={logout} className="w-full">
          <DropdownMenuItem asChild className="rounded-lg cursor-pointer focus:bg-red-50 focus:text-red-700 px-2.5 py-2 text-red-600 transition-colors">
            <button type="submit" className="w-full flex items-center">
              <LogOut className="mr-2.5 h-4 w-4" />
              <span className="text-sm font-medium">Log out</span>
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

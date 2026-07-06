import { Search, Bell } from 'lucide-react';
import { Input } from '@marketing-workspace/ui/components/ui/input';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { UserNav } from './user-nav';
import { createClient } from '@marketing-workspace/auth/server';

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const firstName = user?.user_metadata?.first_name || 'User';
  const lastName = user?.user_metadata?.last_name || '';
  const fullName = `${firstName} ${lastName}`.trim();
  const email = user?.email || '';

  return (
    <header className="flex h-[88px] items-center justify-between border-b border-border bg-white px-8">
      <div className="flex w-full max-w-[400px] items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects, products..."
            className="w-full bg-zinc-50 pl-9 border-zinc-200 h-10 rounded-lg"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground relative hover:bg-zinc-50 rounded-full h-10 w-10">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-600 border-2 border-white"></span>
        </Button>
        <UserNav fullName={fullName} email={email} />
      </div>
    </header>
  );
}

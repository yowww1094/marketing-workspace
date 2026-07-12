import { Search, Bell } from 'lucide-react';
import { Input } from '@marketing-workspace/ui/components/ui/input';
import { Button } from '@marketing-workspace/ui/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-[88px] items-center justify-between border-b border-border bg-white px-8">
      <div className="flex w-full max-w-[400px] items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users, products..."
            className="w-full bg-zinc-50 pl-9 border-zinc-200 h-10 rounded-lg"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground relative hover:bg-zinc-50 rounded-full h-10 w-10">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-sm">
          A
        </div>
      </div>
    </header>
  );
}

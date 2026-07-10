import Link from 'next/link';
import { Button } from '@marketing-workspace/ui/components/ui/button';
import { Target } from 'lucide-react'; // Placeholder for Logo icon

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e2e2ea] bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-14 flex items-center justify-between max-w-7xl">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#5b5bd6] flex items-center justify-center text-white shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <span className="font-semibold text-[#0c0c0e] text-[15px]">Marketing Workspace</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-[#0c0c0e]">
            Home
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-[#6e6e85] hover:text-[#0c0c0e] transition-colors">
            Pricing
          </Link>
          <Link href="/faq" className="text-sm font-medium text-[#6e6e85] hover:text-[#0c0c0e] transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="text-sm font-medium text-[#6e6e85] hover:text-[#0c0c0e] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <a href={process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/login` : 'http://localhost:3001/login'}>
            <Button variant="ghost" size="sm" className="hidden sm:flex text-[14px] text-[#6e6e85] hover:text-[#0c0c0e]">
              Sign in
            </Button>
          </a>
          <a href={process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/register` : 'http://localhost:3001/register'}>
            <Button size="sm" className="bg-[#0c0c0e] text-white hover:bg-[#2b2b30] text-[14px] h-8">
              Get started free
            </Button>
          </a>
        </div>

      </div>
    </header>
  );
}

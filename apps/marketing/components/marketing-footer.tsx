import Link from 'next/link';
import { Target } from 'lucide-react';

export function MarketingFooter() {
  return (
    <footer className="border-t border-[#e2e2ea] bg-white pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#5b5bd6] flex items-center justify-center text-white shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <span className="font-semibold text-[#0c0c0e] text-[15px]">Marketing Workspace</span>
            </Link>
            <p className="text-[14px] text-[#6e6e85] max-w-[240px]">
              Your AI-powered operating system for research, strategy, and execution.
            </p>
          </div>

          {/* Links Col 1 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#0c0c0e] text-[14px] mb-2">Product</h4>
            <Link href="/#features" className="text-[14px] text-[#6e6e85] hover:text-[#0c0c0e]">Features</Link>
            <Link href="/#pricing" className="text-[14px] text-[#6e6e85] hover:text-[#0c0c0e]">Pricing</Link>
            <Link href="/#how-it-works" className="text-[14px] text-[#6e6e85] hover:text-[#0c0c0e]">How it works</Link>
          </div>

          {/* Links Col 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#0c0c0e] text-[14px] mb-2">Company</h4>
            <Link href="#" className="text-[14px] text-[#6e6e85] hover:text-[#0c0c0e]">About</Link>
            <Link href="#" className="text-[14px] text-[#6e6e85] hover:text-[#0c0c0e]">Blog</Link>
            <Link href="#" className="text-[14px] text-[#6e6e85] hover:text-[#0c0c0e]">Contact</Link>
          </div>

          {/* Links Col 3 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#0c0c0e] text-[14px] mb-2">Legal</h4>
            <Link href="/privacy" className="text-[14px] text-[#6e6e85] hover:text-[#0c0c0e]">Privacy Policy</Link>
            <Link href="/terms" className="text-[14px] text-[#6e6e85] hover:text-[#0c0c0e]">Terms of Service</Link>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#e2e2ea]">
          <p className="text-[14px] text-[#6e6e85]">
            © {new Date().getFullYear()} Marketing Workspace. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {/* Social Icons Placeholder */}
            <div className="w-5 h-5 bg-[#e2e2ea] rounded-full" />
            <div className="w-5 h-5 bg-[#e2e2ea] rounded-full" />
            <div className="w-5 h-5 bg-[#e2e2ea] rounded-full" />
          </div>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TooltipProvider } from "@marketing-workspace/ui/components/ui/tooltip";
import { MarketingHeader } from "../components/marketing-header";
import { MarketingFooter } from "../components/marketing-footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Marketing Workspace | Your AI-Powered Marketing OS",
  description: "Generate market research, competitor analysis, customer personas, and complete marketing strategies in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <TooltipProvider>
          <MarketingHeader />
          <main className="flex-1">
            {children}
          </main>
          <MarketingFooter />
        </TooltipProvider>
      </body>
    </html>
  );
}

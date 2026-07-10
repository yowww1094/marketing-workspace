import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions - Marketing Workspace",
  description: "Terms and Conditions for Marketing Workspace.",
};

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col pt-14">
      <div className="bg-white border-b border-[#e2e2ea]">
        <div className="container mx-auto px-6 pt-16 pb-16 max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#e2e2ea] text-[#5b5bd6] text-xs font-semibold uppercase tracking-[1.2px] mb-6">
              <Shield className="w-3.5 h-3.5" />
              Terms
            </div>
            <h1 className="text-[48px] leading-[48px] font-bold tracking-[-1.2px] text-[#0c0c0e] mb-4">
              Terms and Conditions
            </h1>
            <p className="text-[16px] leading-[24px] text-[#6e6e85]">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-6 max-w-3xl prose prose-slate prose-a:text-[#5b5bd6] hover:prose-a:text-[#4a4ac0]">
          <p>
            Welcome to Marketing Workspace. These Terms and Conditions govern your use of our AI-powered Product Marketing Operating System located at our domains.
          </p>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Marketing Workspace, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
          </p>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">2. Description of Service</h2>
          <p>
            Marketing Workspace provides users with an AI-driven marketing workspace where users can generate marketing strategies, reports, and content for individual products. The core entity of the platform is a <strong>Product</strong>, which acts as a permanent marketing project.
          </p>
          <p>Once a Product is created and processed by the AI:</p>
          <ul>
            <li>It cannot be edited.</li>
            <li>It cannot be deleted (this ensures reproducible AI outputs and prevents subscription abuse).</li>
          </ul>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">3. Subscriptions and Billing</h2>
          <p>
            Marketing Workspace is offered on various subscription plans:
          </p>
          <ul>
            <li><strong>Free:</strong> Limited to 1 active Product Workspace with full AI capabilities.</li>
            <li><strong>Pro:</strong> Up to 10 Products per billing cycle, unlimited AI processing, and advanced export features.</li>
            <li><strong>Enterprise:</strong> Unlimited scale and custom AI capabilities.</li>
          </ul>
          <p>
            Products count toward your monthly quota even if archived. Subscriptions are billed in advance on a monthly or annual basis and are non-refundable.
          </p>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">4. User Accounts</h2>
          <p>
            You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. We require you to provide accurate and complete information when creating an account.
          </p>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">5. Intellectual Property</h2>
          <p>
            The original AI-generated marketing content, strategies, and reports produced specifically for your Products are yours to use for your business purposes. However, the Marketing Workspace platform, its features, source code, and AI Orchestrator architecture remain the exclusive property of Marketing Workspace and its licensors.
          </p>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">6. Acceptable Use</h2>
          <p>
            You agree not to use the service to generate illegal, harmful, or abusive content. We reserve the right to terminate accounts that violate our usage policies or attempt to abuse our subscription quotas.
          </p>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">7. Limitation of Liability</h2>
          <p>
            Marketing Workspace provides AI-generated strategies as recommendations and starting points. We are not liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services or the implementation of AI-generated marketing strategies.
          </p>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">8. Modifications</h2>
          <p>
            We reserve the right to modify these terms at any time. We will provide notice of significant changes. Your continued use of the service following any changes constitutes your acceptance of the new Terms.
          </p>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">9. Contact</h2>
          <p>
            For any questions regarding these Terms, please contact us at <a href="mailto:support@marketingworkspace.com">support@marketingworkspace.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}

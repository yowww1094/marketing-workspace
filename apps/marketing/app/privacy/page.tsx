import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - Marketing Workspace",
  description: "Privacy Policy for Marketing Workspace. Learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col pt-14">
      <div className="bg-white border-b border-[#e2e2ea]">
        <div className="container mx-auto px-6 pt-16 pb-16 max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#e2e2ea] text-[#5b5bd6] text-xs font-semibold uppercase tracking-[1.2px] mb-6">
              <Shield className="w-3.5 h-3.5" />
              Privacy
            </div>
            <h1 className="text-[48px] leading-[48px] font-bold tracking-[-1.2px] text-[#0c0c0e] mb-4">
              Privacy Policy
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
            At Marketing Workspace, we are committed to protecting your privacy and ensuring the security of your data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our AI-powered Product Marketing Operating System.
          </p>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li><strong>Account Information:</strong> Name, email address, password, and billing details.</li>
            <li><strong>Product Data:</strong> Information about your products, market details, brand voice, and competitors that you input into the platform.</li>
            <li><strong>Usage Data:</strong> How you interact with our platform, generated marketing workspaces, and AI jobs.</li>
          </ul>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Provide, maintain, and improve our services.</li>
            <li>Process transactions and manage your subscription (Free, Pro, Enterprise).</li>
            <li>Generate personalized marketing strategies and content using our AI providers.</li>
            <li>Communicate with you about updates, security alerts, and support messages.</li>
          </ul>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">3. AI and Your Data</h2>
          <p>
            Marketing Workspace acts as an AI Orchestrator. We use leading AI models (such as NVIDIA NIM endpoints) to process your data. <strong>We do not use your private product data to train foundational models.</strong> Your data is solely used to generate outputs within your specific workspace.
          </p>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes the use of encrypted connections (HTTPS), secure database architectures (PostgreSQL with RLS), and strict access controls.
          </p>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">5. Third-Party Services</h2>
          <p>
            We may share your data with trusted third-party service providers that assist us in operating our platform, conducting our business, or serving our users (e.g., payment processors like Stripe). These parties are obligated to keep your information confidential.
          </p>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">6. Your Rights</h2>
          <p>
            Depending on your location, you may have the right to access, correct, or delete your personal data. You can manage your account information directly from your Settings or by contacting us.
          </p>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">7. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2 className="text-[24px] font-bold text-[#0c0c0e] mt-10 mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@marketingworkspace.com">privacy@marketingworkspace.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}

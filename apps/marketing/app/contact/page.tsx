import { Metadata } from "next";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us - Marketing Workspace",
  description: "Get in touch with the Marketing Workspace team.",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col pt-14">
      {/* Header Section */}
      <div className="bg-white border-b border-[#e2e2ea]">
        <div className="container mx-auto px-6 pt-16 pb-16 max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#e2e2ea] text-[#5b5bd6] text-xs font-semibold uppercase tracking-[1.2px] mb-6">
              <MessageSquare className="w-3.5 h-3.5" />
              Contact
            </div>
            <h1 className="text-[48px] leading-[48px] font-bold tracking-[-1.2px] text-[#0c0c0e] mb-4">
              Get in touch
            </h1>
            <p className="text-[16px] leading-[24px] text-[#6e6e85]">
              We're here to help. Reach out to us for support, sales, or partnerships.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#f8f8fb] py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-[24px] font-bold text-[#0c0c0e] mb-2">Talk to our team</h2>
                <p className="text-[#6e6e85] text-[15px]">
                  Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="bg-white border border-[#e2e2ea] rounded-xl p-6 flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#5b5bd6]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#5b5bd6]" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#0c0c0e] mb-1">Support</h3>
                    <p className="text-[#6e6e85] text-[14px] mb-2">Our friendly team is here to help.</p>
                    <Link href="mailto:support@marketingworkspace.com" className="text-[#5b5bd6] text-[14px] font-medium hover:underline">
                      support@marketingworkspace.com
                    </Link>
                  </div>
                </div>

                <div className="bg-white border border-[#e2e2ea] rounded-xl p-6 flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#5b5bd6]/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-[#5b5bd6]" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#0c0c0e] mb-1">Sales</h3>
                    <p className="text-[#6e6e85] text-[14px] mb-2">Questions or queries? Get in touch.</p>
                    <Link href="mailto:sales@marketingworkspace.com" className="text-[#5b5bd6] text-[14px] font-medium hover:underline">
                      sales@marketingworkspace.com
                    </Link>
                  </div>
                </div>


              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white border border-[#e2e2ea] rounded-2xl p-8 shadow-xl shadow-gray-200/40">
              <h3 className="text-[20px] font-bold text-[#0c0c0e] mb-6">Send us a message</h3>
              <ContactForm />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

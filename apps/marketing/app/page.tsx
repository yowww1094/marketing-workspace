import { HeroSection } from "../components/sections/hero-section";
import { SocialProofSection } from "../components/sections/social-proof-section";
import { CapabilitiesSection } from "../components/sections/capabilities-section";
import { HowItWorksSection } from "../components/sections/how-it-works-section";
import { PricingSection } from "../components/sections/pricing-section";
import { FaqSection } from "../components/sections/faq-section";
import { CtaSection } from "../components/sections/cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <CapabilitiesSection />
      <HowItWorksSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}

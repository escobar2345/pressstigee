import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PartnerHero from "@/components/partner/PartnerHero";
import PartnerAbout from "@/components/partner/PartnerAbout";
import PartnerBenefits from "@/components/partner/PartnerBenefits";
import Services from "@/components/Services";
import PartnerFAQ from "@/components/partner/PartnerFAQ";
import PartnerCTA from "@/components/partner/PartnerCTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Become a Partner — Prestiige",
  description:
    "Turn your skills into real income. Refer clients or deliver premium cleaning services on your own schedule, with weekly payouts and full support.",
};

export default function PartnerPage() {
  return (
    <main className="min-h-screen">
      <Navbar
        announcement="Partner program now open — start earning this week"
        secondaryCta={{ label: "Login", href: "#enroll" }}
        primaryCta={{ label: "Join as a Partner", href: "/signup" }}
      />
      <PartnerHero />
      <PartnerAbout />
      <PartnerBenefits />
      <Services />
      <PartnerFAQ />
      <PartnerCTA />
      <Footer />
    </main>
  );
}

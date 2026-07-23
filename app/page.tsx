import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import DualCta from "@/components/DualCta";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-brand-ink">
      <Navbar />
      <Hero />
      <Services />
      <Features />
      <Testimonials />
      <DualCta />
      <About />
      <Footer />
    </main>
  );
}

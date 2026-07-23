import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function PartnerHero() {
  return (
    <section
      id="partner-hero"
      className="relative overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-32 min-h-[88vh] flex items-center"
    >
      {/* Background photo */}
      <Image
        src="/images/photo_2026-07-07_18-36-44.jpg"
        alt="A professional cleaning team at work"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-darker via-brand-darker/90 to-brand-darker/40" />
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-teal/30 bg-brand-teal/10 text-brand-teal text-xs font-heading font-600 tracking-wide animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
            Prestiige Partner Program
          </div>

          <h1 className="mt-6 font-heading text-5xl sm:text-6xl xl:text-7xl font-800 leading-[1.05] text-balance animate-fade-up animate-delay-100">
            Turn Your Skills
            <br />
            <span className="text-brand-teal">Into Real Income.</span>
          </h1>

          <p className="mt-6 font-body text-white/65 text-lg leading-relaxed max-w-lg animate-fade-up animate-delay-200">
            Refer clients or deliver premium cleaning services on your own
            schedule. Keep more of what you earn, with weekly payouts and full
            support behind you.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 animate-fade-up animate-delay-300">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cta-gradient text-brand-darker font-heading font-700 text-sm teal-glow hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tealLight"
            >
              Join as a Partner
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="#faq"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-brand-border bg-brand-darker/40 backdrop-blur-sm text-white/80 font-heading font-600 text-sm hover:border-brand-teal/50 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
            >
              How It Works
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-2 animate-fade-up animate-delay-400">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-brand-teal fill-brand-teal"
                />
              ))}
            </div>
            <span className="font-heading font-700 text-white text-sm">
              Excellent
            </span>
            <span className="text-white/50 text-sm font-body">
              rated by 1,200+ active partners
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

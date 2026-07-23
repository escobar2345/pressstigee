"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function PartnerCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible")
        ),
      { threshold: 0.1 }
    );
    sectionRef.current
      ?.querySelectorAll(".section-fade")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="enroll"
      ref={sectionRef}
      className="relative py-28 bg-brand-darker overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-teal/30 to-transparent" />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center section-fade">
        <p className="text-brand-teal text-sm font-heading font-600 tracking-widest uppercase mb-4">
          Your Next Step
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-800 text-white leading-[1.05] mb-5">
          Start Earning <span className="text-brand-teal">Now.</span>
        </h2>
        <p className="font-body text-white/55 text-lg max-w-xl mx-auto mb-10">
          Join thousands of partners turning their time and skills into a
          reliable income. It&apos;s free to start and takes minutes.
        </p>
        <Link
          href="/signup"
          className="group inline-flex items-center gap-2 px-9 py-4 rounded-full bg-cta-gradient text-brand-darker font-heading font-700 text-sm teal-glow hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tealLight"
        >
          Enroll As a Partner
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </section>
  );
}

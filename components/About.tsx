"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const u = (id: string, w = 700) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;


export default function About() {
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
      id="about"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-brand-dark"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-teal/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Oversized heading */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="section-fade mb-12">
            <h2 className="font-heading text-6xl sm:text-7xl lg:text-8xl font-800 tracking-tight leading-none">
              ABOUT <span className="text-brand-teal">US</span>
            </h2>
            <p className="text-brand-teal text-sm font-heading font-600 tracking-widest uppercase mb-3">
              Who we are
            </p>
            <p>
              A cleaning service platform built to deliver quality,and
              transparent stress free service from booking to completion{" "}
            </p>
          </div>

          {/* Team photo */}
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-16">
            <Image
              src="/images/about-us.jpg"
              alt="Team picture"
              fill
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Mission + stats */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="section-fade relative w-full aspect-[4/3] rounded-3xl overflow-hidden animate-delay-200">
            <Image
              src="/images/mission-image.jpg"
              alt="group picture"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="section-fade">
            <h3 className="font-heading text-6xl lg:text-7xl font-800 text-white mb-5">
              Our <span className="text-brand-teal">Mission</span>
            </h3>
            <p className="font-body text-white/60 text-lg leading-relaxed mb-4">
              Prestiige was founded on one belief: everyone deserves to come
              home to a clean, peaceful space — without the stress of doing it
              themselves.
            </p>
            <p className="font-body text-white/50 leading-relaxed">
              We started as a small team in Lagos and now serve hundreds of
              homes and offices across the city. Our cleaners are carefully
              vetted, trained, and treated like family — because happy cleaners
              create happy homes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { CalendarCheck, Clock, Sparkles, Smile } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "Choose a Service",
    desc: "Tell us what you need cleaned. Home, office, or a one-off deep clean.",
  },
  {
    icon: Clock,
    title: "Book a Time",
    desc: "Pick a slot that works for you — weekdays, weekends, or same-day.",
  },
  {
    icon: Sparkles,
    title: "We Clean It",
    desc: "A vetted, insured team arrives on time and gets it spotless.",
  },
  {
    icon: Smile,
    title: "Relax & Enjoy",
    desc: "Come back to a fresh space. Re-clean free if you're not happy.",
  },
];

const whyUs = [
  {
    icon: "/images/ic_baseline-verified.png",
    title: "Verified & Trained Professional",
    desc: "Our cleaners are background checked and well trained",
  },
  {
    icon: "/images/mdi_bike-fast.png",
    title: "Fast & Reliable Service",
    desc: "On-time arrivals and quick response",
  },
  {
    icon: "/images/streamline-freehand_receipt-view-pricing.png",
    title: "Transparent Pricing",
    desc: "No hidden fees. What we quote is what you pay",
  },
  {
    icon: "/images/ic_baseline-verified.png",
    title: "Quality Guaranteed",
    desc: "We don't just clean, we deliver satisfaction",
  },
  {
    icon: "/images/uil_calender.png",
    title: "Flexible Scheduling",
    desc: "Book one-off or set regular cleaning plans",
  },
];

export default function Features() {
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
    <div ref={sectionRef}>
      {/* How It Works */}
      <section className="bg-white text-brand-ink py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 section-fade">
            <p className="text-brand-teal text-sm font-heading font-600 tracking-widest uppercase mb-3">
              How It Works
            </p>

            <h2 className="font-heading text-4xl lg:text-5xl font-800 text-brand-ink">
              Simple. <span className="text-brand-teal">Fast.</span> Stress-Free.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="section-fade text-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative mx-auto mb-5 w-16 h-16 rounded-full bg-brand-sand border border-black/5 flex items-center justify-center">
                  <s.icon size={26} className="text-brand-teal" />

                  <span className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-brand-teal text-brand-darker text-xs font-heading font-700 flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-heading font-700 text-brand-ink text-2xl mb-2">
                  {s.title}
                </h3>

                <p className="font-body text-brand-inkMuted text-2xl leading-relaxed max-w-[15rem] mx-auto">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div
            className="
              section-fade
              relative
              glass-card
              rounded-3xl
              overflow-hidden
              teal-glow
              p-8
              sm:p-12
              min-h-[520px]
              lg:min-h-[560px]
              mx-2
              lg:mx-4
            "
          >
            {/* Background cleaner image */}
            <div
              aria-hidden
              className="
                pointer-events-none
                absolute
                inset-y-0
                right-0
                w-2/3
                sm:w-1/2
                lg:w-[45%]
                opacity-15
                sm:opacity-100
              "
            >
              <Image
                src="/images/prestiige-cleaner.png"
                alt=""
                fill
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 45vw"
                className="object-contain object-right-bottom"
              />
            </div>

            <p className="relative text-center text-brand-teal text-sm font-heading font-600 tracking-widest uppercase mb-10">
              Why Choose Us
            </p>

            <div className="relative max-w-md lg:max-w-lg">
              <ul className="space-y-4 mb-8">
                {whyUs.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <div className="relative w-8 h-8 flex-shrink-0 rounded-lg bg-brand-teal/10 border border-brand-teal/30 flex items-center justify-center">
                      <Image
                        src={item.icon}
                        alt=""
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                    </div>

                    <div>
                      <p className="font-heading font-700 text-white text-sm leading-tight">
                        {item.title}
                      </p>

                      <p className="font-body text-white/55 text-xs mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href="#reviews"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-7
                  py-3.5
                  rounded-full
                  bg-cta-gradient
                  text-brand-darker
                  font-heading
                  font-700
                  text-sm
                  teal-glow
                  hover:scale-105
                  transition-all
                  duration-200
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-tealLight
                "
              >
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
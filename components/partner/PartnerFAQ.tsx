"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Who can become a Prestiige partner?",
    a: "Anyone 18+ who can either refer paying clients or deliver professional cleaning services. Service partners go through a quick vetting and background check before their first job.",
  },
  {
    q: "How and when do I get paid?",
    a: "Payouts run automatically every week to your linked account. Need it sooner? Request an early payout from your dashboard once a job is marked complete.",
  },
  {
    q: "Do I need my own equipment and supplies?",
    a: "For most residential jobs, yes — but you'll see the requirements on each job before you accept it. Prestiige offers a discounted supply kit for active partners.",
  },
  {
    q: "Is there a cost to join?",
    a: "No. Joining is free. Prestiige only takes a small, fully-disclosed service fee per completed job — you always see your exact earnings before accepting.",
  },
  {
    q: "Can I choose my own jobs and hours?",
    a: "Always. There are no shifts and no minimums. You see available jobs near you and accept only the ones that fit your schedule.",
  },
];

export default function PartnerFAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(0);

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
      id="faq"
      ref={sectionRef}
      className="py-24 relative bg-brand-darker"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 section-fade">
          <p className="text-brand-teal text-sm font-heading font-600 tracking-widest uppercase mb-3">
            Good to Know
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl font-800 text-white">
            Frequently Asked{" "}
            <span className="text-brand-teal">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="section-fade rounded-2xl overflow-hidden bg-white"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 focus-visible:outline-none focus-visible:ring-2"
                >
                  <span className="font-heading font-600 text-brand-ink text-base">
                    {item.q}
                  </span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center text-brand-teal">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 font-body text-brand-inkMuted text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

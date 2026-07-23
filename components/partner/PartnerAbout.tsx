"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const tiles = [
  {
    image: "/images/partnertest1.png",
    title: "image1",
    id: 1,
    desc: "Finally a company that pays on time! Referred 12 construction jobs and got paid the same week via bank transfer.",
  },
  {
    image: "/images/partnertest2.png",
    title: "image2",
    id: 2,
    desc: "I made ₦187,000 last month just referring my estate clients for home cleaning. The dashboard is so transparent",
  },
];

export default function PartnerAbout() {
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
    <section ref={sectionRef} className="bg-white text-brand-ink py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="section-fade relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/partnerabout.jpeg"
              alt="A Prestiige partner in uniform ready for a job"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Copy + value tiles */}
          <div>
            <p className="section-fade text-brand-teal text-sm font-heading font-600 tracking-widest uppercase mb-3">
              The Platform
            </p>
            <h2 className="section-fade font-heading text-3xl lg:text-4xl font-800 text-brand-ink leading-tight mb-5">
              A Platform Built Not Just For You — But For Partners Who Refer or
              Provide Premium Services.
            </h2>
            <p className="section-fade font-body text-brand-inkMuted text-lg leading-relaxed mb-8">
              At Prestige Cleaning Services, we don&#39;t just hire service
              providers, we build real partnerships with transparent commissions
              and fast payouts
            </p>
            <p className="section-fade font-body text-brand-inkMuted text-lg leading-relaxed mb-8">
              Whether you refer clients or provide services in cleaning,
              laundry, car detailing, or construction, you are part of the
              Prestige family.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {tiles.map((t, i) => (
                <div
                  key={t.id}
                  className="section-fade rounded-2xl bg-brand-dark text-white p-5"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center mb-4">
                    <Image src={t.image} alt={t.title} width={30} height={30} />
                  </div>

                  <p className="font-body text-white/55 text-xs leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

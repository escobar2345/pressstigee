"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";


const services = [
  {
    image: "/images/Gemini_Generated_Image_wpiy2xwpiy2xwpiy.png",
    title: "Home Cleaning",
    alt: "Tidy, sunlit living room",
  },
  {
    image: "/images/Gemini_Generated_Image_3jpa9u3jpa9u3jpa (1).png",
    title: "Office Cleaning",
    alt: "Clean modern office workspace",
    desc: "",
  },
  {
    image: "/images/Gemini_Generated_Image_bg8dsybg8dsybg8d.png",
    title: "Laundry Service",
    alt: "Sparkling kitchen counter",
    desc: "",
  },
  {
    image: "/images/Gemini_Generated_Image_15wz6v15wz6v15wz.png",
    title: "Post Construction",
    alt: "Keep your construction site clean and move-in ready",
    desc: "We remove the mess after construction and make it move in ready",
  },
  {
    image: "/images/Gemini_Generated_Image_qfcpajqfcpajqfcp.jpeg",
    title: "Car Detailing",
    alt: "Keeping your car clean inside and out",
    desc: "Interior and exterior cleaning\nto keep your car looking brand\nnew.",
  },
];

export default function Services() {
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
    <section id="services" ref={sectionRef} className="pt-16 pb-24 lg:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-teal/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 section-fade">
          <p className="text-brand-teal text-sm font-heading font-600 tracking-widest uppercase mb-3">
            Our Services
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl font-800 text-white mb-4">
            How Can We Help You
          </h2>
          <p className="font-body text-white/50 max-w-xl mx-auto text-lg">
            Top quality cleaning solutions tailored to your needs.
          </p>
        </div>

        <div className="overflow-x-auto pb-4 scrollbar-none">
          <div className="flex min-w-max gap-4 px-1 sm:gap-5 md:gap-6">
            {services.map((s) => (
              <a
                key={s.title}
                href="/book"
                className="section-fade service-card group relative flex-none w-[82vw] max-w-[280px] overflow-hidden rounded-[22px] border border-white/12 bg-brand-card shadow-[0_18px_45px_rgba(3,17,38,0.32)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-teal/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60 sm:w-[260px] sm:rounded-2xl lg:w-[240px] lg:shadow-none"
              >
                <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 260px, 240px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/45 to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/16 to-transparent" />
                  <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-white/18 px-2.5 py-1 font-heading text-[10px] font-700 uppercase tracking-wide text-white shadow-sm backdrop-blur-md">
                    Premium
                  </div>
                  <div className="absolute inset-x-2 bottom-2 rounded-2xl border border-white/12 bg-brand-darker/72 p-3 shadow-[0_12px_28px_rgba(0,0,0,0.28)] backdrop-blur-md sm:inset-x-0 sm:bottom-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-4 sm:shadow-none sm:backdrop-blur-0">
                    <p className="font-heading font-800 text-white text-[13px] leading-tight sm:text-sm">
                      {s.title}
                    </p>
                    <span className="mt-2 inline-flex items-center rounded-full bg-white px-3 py-1 text-[10px] font-heading font-800 text-brand-teal shadow-sm transition-colors group-hover:bg-brand-teal group-hover:text-white sm:mt-1 sm:bg-transparent sm:px-0 sm:py-0 sm:text-xs sm:font-600 sm:text-brand-teal sm:shadow-none sm:opacity-0 sm:group-hover:bg-transparent sm:group-hover:text-brand-teal sm:group-hover:opacity-100">
                      Book now →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

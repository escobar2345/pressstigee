"use client";

import { useEffect, useRef } from "react";
import { Eye, TrendingUp, Banknote } from "lucide-react";

const benefits = [
  {
    icon: Eye,
    title: "Radical\nTransparency",
    desc: "Every referral, commission, and payout is visible in real-time on your personal dashboard - 100% transparent as promised.",
  },
  {
    icon: TrendingUp,
    title: "Unlimited Services\n& Earnings",
    desc: "Attach to as many categories as you want Home & Office Cleaning, Laundry, Car Detailing, Construction & more. No limits.",
  },
  {
    icon: Banknote,
    title: "Flexible Payouts\nThat Work For You",
    desc: "Get paid via bank transfer, mobile money, cash, or even services you provide us. Every amount recorded and visible forever.",
  },
];

export default function PartnerBenefits() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }),
      { threshold: 0.15 }
    );

    sectionRef.current
      ?.querySelectorAll(".section-fade")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-12 px-3 md:px-8"
    >
      <div
        className="
          w-full
          max-w-7xl
          mx-auto
          rounded-[30px]
          overflow-hidden
          px-6
          md:px-10
          py-10
          md:py-12
          shadow-2xl
          bg-gradient-to-b
          from-[#1E5BE0]
          via-[#0F3B8F]
          to-[#031126]
        "
      >
        {/* Header */}

        <div className="text-center mb-10 section-fade">
          <p
            className="
              text-[11px]
              tracking-[0.25em]
              uppercase
              text-white/70
              mb-3
            "
          >
            Benefits
          </p>

          <h2
            className="
              text-white
              font-semibold
              text-[28px]
              md:text-[40px]
              leading-tight
            "
          >
            Why Partner With Us
          </h2>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="
                  section-fade
                  bg-white/10
                  rounded-xl
                  px-5
                  py-6
                  text-center
                  border
                  border-white/5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex justify-center mb-4">
                  <Icon
                    size={22}
                    strokeWidth={1.8}
                    className="text-white"
                  />
                </div>

                <h3
                  className="
                    text-white
                    font-semibold
                    text-[16px]
                    leading-[1.25]
                    whitespace-pre-line
                    mb-3
                  "
                >
                  {benefit.title}
                </h3>

                <p
                  className="
                    text-white/75
                    text-[11px]
                    leading-[1.45]
                  "
                >
                  {benefit.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { Star, Quote, ArrowRight } from "lucide-react";

const reviews = [
  {
    name: "Amara Okafor",
    role: "Homeowner, Lagos",
    avatar: "AO",
    color: "bg-teal-600",
    rating: 5,
    text: "Prestiige completely transformed my home. The team was professional, thorough, and so respectful of my space. I've booked them monthly since.",
  },
  {
    name: "Michael Adeyemi",
    role: "Office Manager",
    avatar: "MA",
    color: "bg-emerald-600",
    rating: 5,
    text: "Our office has never looked better. They arrived on time, worked fast, and left everything spotless. Employees noticed the difference immediately.",
  },
  {
    name: "Juliet Nwosu",
    role: "Apartment Resident",
    avatar: "JN",
    color: "bg-cyan-600",
    rating: 5,
    text: "I was hesitant at first but now I can't imagine life without Prestiige. Booking is super easy and the cleaners are always fantastic.",
  },
  {
    name: "Samuel Eze",
    role: "Property Manager",
    avatar: "SE",
    color: "bg-teal-500",
    rating: 5,
    text: "I manage 12 properties and Prestiige handles all of them. Reliable, consistent, and their move-out deep clean is absolutely top-notch.",
  },
];

export default function Testimonials() {
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
    <section id="reviews" ref={sectionRef} className="bg-white py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-teal/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 section-fade">
          <p className="text-brand-teal text-sm font-heading font-600 tracking-widest uppercase mb-3">
            Testimonials
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl font-800 text-brand-ink mb-4">
            Best People.{" "}
            <span className="text-brand-teal">Best Reviews.</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className="text-brand-teal fill-brand-teal"
              />
            ))}
            <span className="font-heading font-700 text-brand-ink ml-2">4.9</span>
            <span className="text-brand-inkMuted text-sm font-body">
              from 800+ reviews
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <div
              key={review.name}
              className="section-fade rounded-2xl bg-white border border-brand-sand shadow-sm p-6 hover:border-brand-teal/25 hover:shadow-lg transition-all duration-300 group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Quote
                size={24}
                className="text-brand-teal/30 mb-4 group-hover:text-brand-teal/50 transition-colors"
              />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="text-brand-teal fill-brand-teal"
                  />
                ))}
              </div>
              <p className="font-body text-brand-inkMuted leading-relaxed mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center font-heading font-700 text-white text-sm flex-shrink-0`}
                >
                  {review.avatar}
                </div>
                <div>
                  <p className="font-heading font-600 text-brand-ink text-sm">
                    {review.name}
                  </p>
                  <p className="font-body text-brand-inkMuted text-xs">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
       
      </div>
    </section>
  );
}

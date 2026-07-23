import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import HeroThreeAnimation from "./HeroThreeAnimation";

const strip = [
  {
    src: "/images/photo_2026-07-06_19-08-22.jpg",
    alt: "Professional cleaning a home surface",
  },
  {
    src: "/images/Gemini_Generated_Image_15wz6v15wz6v15wz.png",
    alt: "Bright, freshly cleaned living room",
  },
  {
    src: "/images/Gemini_Generated_Image_bg8dsybg8dsybg8d.png",
    alt: "Professional wiping a window clean",
  },
  {
    src: "/images/Gemini_Generated_Image_ex2tuzex2tuzex2t.jpeg",
    alt: "Spotless modern kitchen",
  },
  {
    src: "/images/Gemini_Generated_Image_eypixteypixteypi.png",
    alt: "Cleaner mopping a tiled floor",
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-brand-darker pt-36 lg:pt-44"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(96,165,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <HeroThreeAnimation />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Centered content */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-teal/30 bg-brand-teal/10 text-brand-teal text-xs font-heading font-600 tracking-wide animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
            Trusted by 2,000+ happy homes
          </div>

          <h1 className="mt-6 font-heading text-5xl sm:text-6xl xl:text-7xl font-800 leading-[1.05] text-balance text-white animate-fade-up animate-delay-100">
            A Cleaner{" "}
            <span className="text-brand-teal">Space</span>
            <br />
            <span className="text-white">A Better Life.</span>
          </h1>

          <p className="mt-6 font-body text-white/60 text-lg leading-relaxed max-w-xl animate-fade-up animate-delay-200">
            Professional cleaning tailored to your home and schedule. We handle
            the mess so you can enjoy what actually matters.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-up animate-delay-300">
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cta-gradient text-brand-darker font-heading font-700 text-sm teal-glow hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tealLight"
            >
              Book a Cleaning
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-brand-border text-white/80 font-heading font-600 text-sm hover:border-brand-teal/50 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
            >
              Join as a Partner
            </Link>
          </div>

          {/* Star rating */}
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
            <span className="text-white/40 text-sm font-body">
              4.9 / 5 from 800+ reviews
            </span>
          </div>
        </div>

      </div>

      {/* Photo strip */}
      <div className="relative mt-16  bg-brand-darker pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 animate-fade-up animate-delay-500">
          {strip.map((img, i) => (
            <div
              key={img.src}
              className={`relative rounded-2xl overflow-hidden border border-brand-border teal-glow-sm ${
                i === 0 ? "col-span-2 sm:col-span-1" : ""
              } ${i === 2 ? "lg:-translate-y-5" : ""} ${
                i === 1 || i === 3 ? "lg:translate-y-3" : ""
              }`}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={i < 3}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 18vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/50 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

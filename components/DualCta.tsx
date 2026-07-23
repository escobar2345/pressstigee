import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DualCta() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left card — Ready for Spotless Space */}
          <div className="relative rounded-3xl overflow-hidden min-h-[280px] flex items-center">
            <Image
              src="/images/shape1.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              aria-hidden
            />

            <div className="relative p-8 sm:p-10 max-w-md flex gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-darker/40 border border-white/10 flex items-center justify-center mb-5">
                <Image
                  src="/images/calendar1.png"
                  alt=""
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </div>

              <div>
              <h3 className="font-heading font-800 text-2xl sm:text-3xl text-white leading-tight mb-2">
                Ready for Spotless Space?
              </h3>
              <p className="font-body text-white/75 text-sm mb-6 max-w-xs leading-relaxed">
                Book your cleaning service now and experience the prestige
                difference
              </p>

              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-darker text-white font-heading font-700 text-sm hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Book a Cleaning
                <ArrowRight size={14} />
              </Link>
            </div>
            </div>
          </div>

          {/* Right card — Want to Earn With Us */}
          <div className="relative rounded-3xl overflow-hidden min-h-[280px] flex items-center">
            <Image
              src="/images/shape2.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-right"
              aria-hidden
            />

            <div className="relative p-8 sm:p-10 max-w-md flex gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-darker/40 border border-white/10 flex items-center justify-center mb-5">
                <Image
                  src="/images/handshake.png"
                  alt=""
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </div>

              <div>
              <h3 className="font-heading font-800 text-2xl sm:text-3xl text-white leading-tight mb-2">
                Want to Earn With Us?
              </h3>
              <p className="font-body text-white/75 text-sm mb-6 max-w-xs leading-relaxed">
                Join our partner program and start earning by referring clients
                for cleaning service. No experience needed — just share and get
                paid.
              </p>

              <Link
                href="/partner"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-brand-darker font-heading font-700 text-sm hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Join as Partner
                <ArrowRight size={14} />
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

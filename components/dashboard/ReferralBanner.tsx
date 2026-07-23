import Image from "next/image";

export default function ReferralBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-teal/30 teal-glow">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-brand-teal/40 pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-56 h-56 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex items-stretch gap-4 p-5 sm:p-6">
        {/* Image */}
        <div className="relative w-24 sm:w-32 flex-shrink-0 rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80"
            alt="Cleaning supplies"
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>

        {/* Copy */}
        <div className="flex-1 min-w-0">
          <h2 className="font-heading font-700 text-white text-sm sm:text-base leading-snug">
            Earn Up to 10% Commission on Every Client You Refer
          </h2>
          <p className="font-body text-white/55 text-[11px] sm:text-xs mt-2 leading-relaxed">
            Commissions are paid out across the full Prestiige Cleaning
            Services catalogue — Office cleaning, Laundry, and more.
          </p>
        </div>
      </div>
    </div>
  );
}

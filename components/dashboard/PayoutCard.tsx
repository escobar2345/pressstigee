import { ArrowUpRight, TrendingUp } from "lucide-react";

export default function PayoutCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-teal/30 p-6 sm:p-9 teal-glow">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/25 via-brand-dark to-brand-darker pointer-events-none" />
      <div className="absolute -top-16 -left-8 w-64 h-64 bg-brand-teal/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
        <div>
          <p className="font-body text-white/55 text-sm mb-2">Payout</p>
          <div className="flex items-baseline gap-2">
            <p className="font-heading font-800 text-4xl sm:text-5xl text-white tracking-tight">
              ₦ 240,700
            </p>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-brand-teal/20 text-brand-teal text-[10px] font-heading font-700">
              <TrendingUp size={10} />
              0%
            </span>
          </div>
          <p className="font-body text-white/45 text-xs mt-2">
            All-time earnings
          </p>
        </div>

        <button className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white text-brand-darker font-heading font-700 text-sm hover:scale-105 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
          Withdraw
          <ArrowUpRight
            size={16}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}

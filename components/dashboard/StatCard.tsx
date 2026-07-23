import { type LucideIcon } from "lucide-react";

type Tone = "default" | "pending" | "success";

const toneClasses: Record<Tone, { card: string; icon: string; sub: string }> = {
  default: {
    card: "glass-card border-brand-border",
    icon: "bg-white/5 text-white/60",
    sub: "text-white/50",
  },
  pending: {
    card: "bg-amber-400/10 border-amber-400/25",
    icon: "bg-amber-400/20 text-amber-300",
    sub: "text-amber-300/80",
  },
  success: {
    card: "bg-brand-teal/10 border-brand-teal/30",
    icon: "bg-brand-teal/20 text-brand-teal",
    sub: "text-brand-teal/80",
  },
};

export default function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  tone?: Tone;
}) {
  const c = toneClasses[tone];
  return (
    <div
      className={`relative rounded-2xl border p-4 sm:p-5 overflow-hidden min-w-[180px] sm:min-w-0 ${c.card}`}
    >
      <div className="flex items-start justify-between mb-4">
        <p className="font-body text-white/55 text-xs sm:text-sm">{label}</p>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.icon}`}
        >
          <Icon size={14} />
        </div>
      </div>
      <p className="font-heading font-800 text-xl sm:text-2xl text-white tracking-tight">
        {value}
      </p>
      {sub && (
        <p className={`font-body text-xs mt-1 ${c.sub}`}>{sub}</p>
      )}
    </div>
  );
}

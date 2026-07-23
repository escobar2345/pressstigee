import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

type Tone = "default" | "success" | "pending" | "danger" | "neutral";
type IconShape = "chip" | "avatar";

const tones: Record<
  Tone,
  { card: string; chip: string; avatar: string }
> = {
  default: {
    card: "glass-card border-brand-border",
    chip: "bg-white/5 text-white/60",
    avatar: "bg-sky-500/25 text-sky-300",
  },
  success: {
    card: "glass-card border-brand-border",
    chip: "bg-brand-teal/20 text-brand-teal",
    avatar: "bg-brand-teal/25 text-brand-teal",
  },
  pending: {
    card: "glass-card border-brand-border",
    chip: "bg-amber-400/20 text-amber-300",
    avatar: "bg-amber-400/25 text-amber-300",
  },
  danger: {
    card: "glass-card border-brand-border",
    chip: "bg-red-500/20 text-red-300",
    avatar: "bg-red-500/25 text-red-300",
  },
  neutral: {
    card: "glass-card border-brand-border",
    chip: "bg-white/10 text-white/60",
    avatar: "bg-white/15 text-white/70",
  },
};

export default function AdminStatCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "default",
  iconShape = "chip",
}: {
  label: string;
  value: string;
  delta?: { value: string; positive?: boolean };
  icon: LucideIcon;
  tone?: Tone;
  iconShape?: IconShape;
}) {
  const c = tones[tone];
  const DeltaIcon =
    delta && delta.positive === false ? TrendingDown : TrendingUp;

  return (
    <div className={`rounded-2xl border p-5 ${c.card}`}>
      <div className="flex items-center gap-4">
        {iconShape === "avatar" ? (
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${c.avatar}`}
          >
            <Icon size={20} />
          </div>
        ) : (
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.chip}`}
          >
            <Icon size={16} />
          </div>
        )}
        <div className="min-w-0">
          <p className="font-body text-white/55 text-sm">{label}</p>
          <p className="font-heading font-800 text-2xl text-white tracking-tight mt-0.5">
            {value}
          </p>
        </div>
      </div>

      {delta && (
        <p
          className={`flex items-center gap-1 mt-3 font-body text-xs ${
            delta.positive === false ? "text-red-300" : "text-brand-teal"
          }`}
        >
          <DeltaIcon size={12} />
          {delta.value}
        </p>
      )}
    </div>
  );
}

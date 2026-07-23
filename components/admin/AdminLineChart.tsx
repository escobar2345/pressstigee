import { smoothPath, toPoints } from "@/lib/chart";

const W = 400;
const H = 160;

export default function AdminLineChart({
  title,
  series,
  xLabels,
  max,
  yPrefix = "₦",
  ySuffix = "M",
  legend,
}: {
  title: string;
  series: number[];
  xLabels: string[];
  max: number;
  yPrefix?: string;
  ySuffix?: string;
  legend?: string;
}) {
  const points = toPoints(series, W, H, max);
  const linePath = smoothPath(points);
  const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`;

  const yLabels = [max, (max * 2) / 3, max / 3, 0].map(
    (v) => `${yPrefix}${v.toFixed(0)}${ySuffix}`
  );

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-heading font-700 text-white text-base">{title}</h3>
        {legend && (
          <span className="inline-flex items-center gap-2 font-body text-white/55 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-teal" />
            {legend}
          </span>
        )}
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col justify-between text-[10px] font-body text-white/35 py-1">
          {yLabels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>

        <div className="flex-1 min-w-0">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="w-full h-48"
            aria-label={`${title} line chart`}
          >
            <defs>
              <linearGradient
                id="adminLineArea"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="0"
                x2={W}
                y1={(i * H) / 3}
                y2={(i * H) / 3}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
            ))}

            <path d={areaPath} fill="url(#adminLineArea)" />
            <path
              d={linePath}
              fill="none"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="flex justify-between mt-2 text-[10px] font-body text-white/35">
            {xLabels.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

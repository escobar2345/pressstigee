const W = 400;
const H = 160;

export default function AdminBarChart({
  title,
  series,
  xLabels,
  max,
  legend,
}: {
  title: string;
  series: number[];
  xLabels: string[];
  max: number;
  legend?: string;
}) {
  const gap = 6;
  const barWidth = (W - gap * (series.length - 1)) / series.length;

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
          {[max, (max * 2) / 3, max / 3, 0].map((v) => (
            <span key={v}>{v.toFixed(0)}</span>
          ))}
        </div>

        <div className="flex-1 min-w-0">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="w-full h-48"
            aria-label={`${title} bar chart`}
          >
            <defs>
              <linearGradient id="adminBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.5" />
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

            {series.map((v, i) => {
              const h = (v / max) * H;
              const x = i * (barWidth + gap);
              const y = H - h;
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={h}
                  rx="4"
                  fill="url(#adminBar)"
                />
              );
            })}
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

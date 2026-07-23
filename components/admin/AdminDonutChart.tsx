export type DonutSegment = { label: string; value: number; color: string };

export default function AdminDonutChart({
  title,
  centerValue,
  centerLabel,
  segments,
}: {
  title: string;
  centerValue: string;
  centerLabel: string;
  segments: DonutSegment[];
}) {
  const radius = 60;
  const strokeWidth = 18;
  const cx = 80;
  const cy = 80;
  const circumference = 2 * Math.PI * radius;

  const total = segments.reduce((sum, s) => sum + s.value, 0);
  let offset = 0;
  const arcs = segments.map((s) => {
    const len = (s.value / total) * circumference;
    const arc = { ...s, len, start: offset };
    offset += len;
    return arc;
  });

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6">
      <h3 className="font-heading font-700 text-white text-base mb-4">
        {title}
      </h3>

      <div className="flex items-center gap-5">
        <svg
          viewBox="0 0 160 160"
          className="w-32 h-32 flex-shrink-0"
          aria-label={`${title} donut chart`}
        >
          {/* Track */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Segments */}
          {arcs.map((a, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={radius}
              stroke={a.color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${a.len} ${circumference}`}
              strokeDashoffset={-a.start}
              strokeLinecap="butt"
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          ))}
          {/* Center text */}
          <text
            x={cx}
            y={cy - 2}
            textAnchor="middle"
            className="fill-white font-heading font-800"
            style={{ fontSize: "18px" }}
          >
            {centerValue}
          </text>
          <text
            x={cx}
            y={cy + 14}
            textAnchor="middle"
            className="fill-white/50 font-body"
            style={{ fontSize: "8px" }}
          >
            {centerLabel}
          </text>
        </svg>

        <ul className="flex-1 min-w-0 flex flex-col gap-2">
          {segments.map((s) => {
            const pct = Math.round((s.value / total) * 100);
            return (
              <li
                key={s.label}
                className="flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: s.color }}
                  />
                  <span className="font-body text-white/70 text-xs truncate">
                    {s.label}
                  </span>
                </span>
                <span className="font-heading font-700 text-white text-xs">
                  {pct}%
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

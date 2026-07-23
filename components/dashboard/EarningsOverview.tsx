import { ChevronDown } from "lucide-react";
import { smoothPath, toPoints } from "@/lib/chart";

// Earnings in thousands of Naira across the period.
const series = [60, 35, 55, 40, 70, 50, 75, 60, 88, 92];
const max = 100;

const xLabels = ["1 Feb", "25 Feb", "10 Mar", "25 Mar", "17 Apr"];
const yLabels = ["₦90k", "₦60k", "₦30k", "₦0"]; // top to bottom

const W = 400;
const H = 160;

export default function EarningsOverview() {
  const points = toPoints(series, W, H, max);
  const linePath = smoothPath(points);
  const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`;

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading font-700 text-white text-base sm:text-lg">
          Earnings Overview
        </h2>
        <div className="relative">
          <select
            aria-label="Earnings period"
            defaultValue="month"
            className="appearance-none bg-brand-tealDim/40 border border-brand-border rounded-lg pl-3 pr-8 py-1.5 text-white/70 font-body text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
          />
        </div>
      </div>

      {/* Chart */}
      <div className="flex gap-3">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between text-[10px] font-body text-white/35 py-1">
          {yLabels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>

        <div className="flex-1 min-w-0">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="w-full h-44 sm:h-48"
            aria-label="Earnings over time area chart"
          >
            <defs>
              <linearGradient id="earningsArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Horizontal grid */}
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

            <path d={areaPath} fill="url(#earningsArea)" />
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

          {/* X-axis labels */}
          <div className="flex justify-between mt-2 text-[10px] font-body text-white/35">
            {xLabels.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4">
        <span className="w-2.5 h-2.5 rounded-full bg-brand-teal" />
        <span className="font-body text-white/55 text-xs">Paid Out</span>
      </div>
    </div>
  );
}

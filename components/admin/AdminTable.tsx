import { statusPill, type Status } from "@/lib/status-pill";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "right";
};

export default function AdminTable<T>({
  title,
  columns,
  rows,
  action,
  footer,
}: {
  title?: string;
  columns: Column<T>[];
  rows: T[];
  action?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="glass-card rounded-2xl">
      {(title || action) && (
        <div className="flex items-center justify-between gap-3 px-5 sm:px-6 pt-5 pb-4">
          {title && (
            <h3 className="font-heading font-700 text-white text-base">
              {title}
            </h3>
          )}
          {action}
        </div>
      )}

      {/* Mobile: card list ──────────────────────────────────────────────── */}
      <ul className="lg:hidden flex flex-col gap-3 p-4">
        {rows.map((row, i) => (
          <li
            key={i}
            className="rounded-xl bg-brand-darker/50 border border-brand-border p-4 flex flex-col gap-2.5"
          >
            {columns.map((c) => {
              const value = c.render
                ? c.render(row)
                : (row as Record<string, unknown>)[c.key as string];
              return (
                <div
                  key={String(c.key)}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="font-heading font-600 text-white/45 text-[11px] uppercase tracking-wide">
                    {c.header}
                  </span>
                  <span className="font-body text-white text-sm text-right min-w-0 break-words">
                    {value as React.ReactNode}
                  </span>
                </div>
              );
            })}
          </li>
        ))}
      </ul>

      {/* Desktop: table ─────────────────────────────────────────────────── */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-y border-brand-border bg-brand-tealDim/20">
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  className={`px-5 sm:px-6 py-3 font-heading font-600 text-white/55 text-[11px] uppercase tracking-wide ${
                    c.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-brand-border/40 last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                {columns.map((c) => {
                  const value = c.render
                    ? c.render(row)
                    : (row as Record<string, unknown>)[c.key as string];
                  return (
                    <td
                      key={String(c.key)}
                      className={`px-5 sm:px-6 py-4 font-body text-white/80 text-sm ${
                        c.align === "right" ? "text-right" : "text-left"
                      }`}
                    >
                      {value as React.ReactNode}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {footer && (
        <div className="px-5 sm:px-6 py-4 border-t border-brand-border/60">
          {footer}
        </div>
      )}
    </div>
  );
}

// Reusable status-pill renderer for use in `columns[].render`.
export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border text-[11px] font-heading font-700 ${statusPill[status]}`}
    >
      {status}
    </span>
  );
}

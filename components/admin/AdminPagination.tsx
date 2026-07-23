import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminPagination({
  summary,
  page,
  totalPages,
}: {
  summary: string;
  page: number;
  totalPages: number;
}) {
  const pageBtn =
    "w-7 h-7 rounded-md flex items-center justify-center font-heading font-700 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60";

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between gap-3"
    >
      <p className="font-body text-white/45 text-xs">{summary}</p>
      <div className="flex items-center gap-1.5">
        <button
          aria-label="Previous page"
          className={`${pageBtn} bg-brand-dark/60 border border-brand-border text-white/55 hover:text-white`}
        >
          <ChevronLeft size={14} />
        </button>
        {pages.map((p) => {
          const active = p === page;
          return (
            <button
              key={p}
              aria-current={active ? "page" : undefined}
              className={`${pageBtn} ${
                active
                  ? "bg-brand-teal text-brand-darker"
                  : "bg-brand-dark/60 border border-brand-border text-white/55 hover:text-white"
              }`}
            >
              {p}
            </button>
          );
        })}
        <button
          aria-label="Next page"
          className={`${pageBtn} bg-brand-dark/60 border border-brand-border text-white/55 hover:text-white`}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </nav>
  );
}

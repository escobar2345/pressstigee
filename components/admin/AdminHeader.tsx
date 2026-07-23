import { Bell, Search } from "lucide-react";

export default function AdminHeader({
  title,
  subtitle,
  showSearch = true,
}: {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
}) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pl-14 lg:pl-0">
      <div>
        <h1 className="font-heading font-800 text-2xl sm:text-3xl text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="font-body text-white/50 text-sm mt-1">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {showSearch && (
          <div className="relative hidden sm:block">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
            />
            <input
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="w-56 bg-brand-dark/70 border border-brand-border rounded-full pl-10 pr-4 py-2 text-white font-body text-sm placeholder-white/40 focus:outline-none focus:border-brand-teal/50 transition"
            />
          </div>
        )}
        <button
          aria-label="Notifications"
          className="relative w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/70 hover:text-brand-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
        >
          <Bell size={16} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>
      </div>
    </header>
  );
}

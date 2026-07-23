"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Wallet, Users, User, Settings } from "lucide-react";

const nav = [
  { icon: LayoutGrid, label: "Overview", href: "/dashboard" },
  { icon: Wallet, label: "Payout", href: "/dashboard/payout" },
  { icon: Users, label: "Referrals", href: "/dashboard/referrals" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      <div aria-hidden className="hidden lg:block w-20 shrink-0" />

      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 h-screen w-20 shrink-0 flex-col items-center justify-between overflow-hidden bg-brand-dark border-r border-brand-border py-6">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Prestiige home"
          className="w-9 h-9 rounded-lg bg-brand-teal flex items-center justify-center teal-glow-sm hover:scale-105 transition-transform"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M3 15C3 15 4.5 9 9 9C13.5 9 15 3 15 3"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="9" cy="9" r="2" fill="white" />
          </svg>
        </Link>

        {/* Nav rail */}
        <nav className="flex flex-col items-center gap-2">
          {nav.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60 ${
                  active
                    ? "bg-brand-teal/15 text-brand-teal border border-brand-teal/30"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {active && (
                  <span className="absolute -left-[1.05rem] lg:-left-[1.3rem] top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-brand-teal" />
                )}
                <item.icon size={20} />
              </Link>
            );
          })}
        </nav>

        {/* Settings */}
        <Link
          href="/dashboard/settings"
          aria-label="Settings"
          aria-current={
            pathname.startsWith("/dashboard/settings") ? "page" : undefined
          }
          className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60 ${
            pathname.startsWith("/dashboard/settings")
              ? "bg-brand-teal/15 text-brand-teal border border-brand-teal/30"
              : "text-white/40 hover:text-white hover:bg-white/5"
          }`}
        >
          {pathname.startsWith("/dashboard/settings") && (
            <span className="absolute -left-[1.05rem] lg:-left-[1.3rem] top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-brand-teal" />
          )}
          <Settings size={20} />
        </Link>
      </aside>
    </>
  );
}

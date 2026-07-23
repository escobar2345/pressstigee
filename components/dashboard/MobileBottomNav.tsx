"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, User, Share2, Wallet } from "lucide-react";

const tabs = [
  { icon: LayoutGrid, label: "Overview", href: "/dashboard" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Share2, label: "Referrals", href: "/dashboard/referrals" },
  { icon: Wallet, label: "Payout", href: "/dashboard/payout" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,360px)]"
    >
      <ul className="flex items-center justify-around bg-white rounded-full px-3 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.25)]">
        {tabs.map((t) => {
          const active =
            t.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(t.href);
          return (
            <li key={t.label}>
              <Link
                href={t.href}
                aria-label={t.label}
                aria-current={active ? "page" : undefined}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                  active
                    ? "bg-brand-teal/15 text-brand-teal"
                    : "text-brand-ink/55 hover:text-brand-ink"
                }`}
              >
                <t.icon size={20} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

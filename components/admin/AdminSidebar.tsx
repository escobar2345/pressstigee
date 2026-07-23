"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  Share2,
  Users,
  UserCheck,
  CreditCard,
  Wallet,
  Settings,
  Bell,
  LifeBuoy,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

type Item = { icon: LucideIcon; label: string; href: string };

const main: Item[] = [
  { icon: LayoutGrid, label: "Dashboard", href: "/admin" },
  { icon: Share2, label: "Referrals", href: "/admin/referrals" },
  { icon: Users, label: "Partners", href: "/admin/partners" },
  { icon: UserCheck, label: "Activations", href: "/admin/activations" },
  {
    icon: CreditCard,
    label: "Activation payments",
    href: "/admin/activation-payments",
  },
  { icon: Wallet, label: "Payouts", href: "/admin/payouts" },
];

const footer: Item[] = [
  { icon: Settings, label: "Settings", href: "/admin" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications" },
  { icon: LifeBuoy, label: "Help & Support", href: "/admin" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const NavLink = ({ item, onClick }: { item: Item; onClick?: () => void }) => {
    const active = isActive(item.href);
    return (
      <Link
        href={item.href}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60 ${
          active
            ? "bg-brand-teal/15 text-brand-teal"
            : "text-white/60 hover:text-white hover:bg-white/5"
        }`}
      >
        {active && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-brand-teal" />
        )}
        <item.icon size={18} />
        <span className="font-heading font-600">{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile open button */}
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 w-10 h-10 rounded-xl glass-card flex items-center justify-center text-white/70 hover:text-brand-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
      >
        <Menu size={18} />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
        />
      )}

      <aside
        className={`fixed lg:sticky inset-y-0 left-0 top-0 z-50 lg:z-0 h-screen w-64 shrink-0 bg-brand-dark border-r border-brand-border flex flex-col transform transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Admin navigation"
      >
        {/* Brand + close (mobile) */}
        <div className="flex items-center justify-between px-5 py-5">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 group"
            onClick={() => setOpen(false)}
          >
            <div className="w-9 h-9 rounded-lg bg-brand-teal flex items-center justify-center teal-glow-sm group-hover:scale-105 transition-transform">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M3 15C3 15 4.5 9 9 9C13.5 9 15 3 15 3"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="9" cy="9" r="2" fill="white" />
              </svg>
            </div>
            <div>
              <p className="font-heading font-800 text-white text-base leading-none">
                Prestiige
              </p>
              <p className="font-body text-white/40 text-[10px] mt-0.5">
                Cleaning services
              </p>
            </div>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Main nav */}
        <nav className="flex-1 overflow-y-auto px-3 pb-3">
          <p className="px-4 py-2 font-heading font-700 text-white/30 text-[10px] uppercase tracking-widest">
            Manage
          </p>
          <ul className="flex flex-col gap-1">
            {main.map((item) => (
              <li key={item.label}>
                <NavLink item={item} onClick={() => setOpen(false)} />
              </li>
            ))}
          </ul>

          <p className="px-4 pt-6 pb-2 font-heading font-700 text-white/30 text-[10px] uppercase tracking-widest">
            Other
          </p>
          <ul className="flex flex-col gap-1">
            {footer.map((item) => (
              <li key={item.label}>
                <NavLink item={item} onClick={() => setOpen(false)} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Admin chip */}
        <div className="border-t border-brand-border px-4 py-4">
          <Link
            href="/admin/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-brand-border flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                alt="Prestiige Admin"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="font-heading font-700 text-white text-sm truncate">
                Prestiige
              </p>
              <p className="font-body text-white/45 text-xs truncate">
                Admin
              </p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}

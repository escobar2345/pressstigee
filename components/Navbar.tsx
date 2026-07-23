"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarCheck,
  Handshake,
  Home,
  MessageCircle,
  Sparkles,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/#home", icon: Home },
  { label: "Services", href: "/#services", icon: BriefcaseBusiness },
  { label: "Reviews", href: "/#reviews", icon: MessageCircle },
];

type Cta = { label: string; href: string };

const defaultPrimary: Cta = { label: "Book Cleaning", href: "/book" };
const defaultSecondary: Cta = { label: "Join as Partner", href: "/partner" };

export default function Navbar({
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  announcement = "Now booking same-day cleans — 15% off your first visit",
}: {
  primaryCta?: Cta;
  secondaryCta?: Cta;
  announcement?: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-darker/95 backdrop-blur-md border-b border-brand-border shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        {/* Announcement pill */}
        <div className="hidden sm:flex justify-center pt-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-teal/25 bg-brand-teal/10 text-brand-teal text-xs font-heading font-600 tracking-wide">
            <Sparkles size={13} />
            {announcement}
          </div>
        </div>

        <nav className="relative w-full px-6 lg:px-10 xl:px-14 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center teal-glow-sm group-hover:scale-105 transition-transform">
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
            <span className="font-heading font-700 text-lg tracking-tight text-white">
              Prestiige
            </span>
          </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="font-body text-sm text-white/70 hover:text-brand-teal transition-colors duration-200 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60 rounded"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-teal group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA group */}
        <div className="relative z-10 ml-auto hidden md:flex min-w-[22rem] items-center justify-end gap-3">
          <Link
            href={secondaryCta.href}
            className="whitespace-nowrap px-5 py-2 rounded-full text-sm font-heading font-600 border border-brand-border text-white/80 hover:text-white hover:border-brand-teal/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
          >
            {secondaryCta.label}
          </Link>
          <Link
            href={primaryCta.href}
            className="group inline-flex items-center gap-1.5 whitespace-nowrap px-5 py-2 rounded-full text-sm font-heading font-700 bg-brand-teal text-brand-darker hover:bg-brand-tealLight transition-all duration-200 teal-glow-sm hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tealLight"
          >
            {primaryCta.label}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

          <div className="md:hidden" />
        </nav>
      </header>

      {/* Mobile floating footer nav */}
      <nav
        aria-label="Mobile primary"
        className="md:hidden fixed bottom-4 left-1/2 z-[60] w-[min(94vw,430px)] -translate-x-1/2 rounded-full border border-brand-teal/20 bg-brand-sand/95 px-3 py-2 shadow-[0_18px_45px_rgba(37,99,235,0.18)] backdrop-blur-xl"
      >
        <ul className="grid grid-cols-5 items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-label={link.label}
                  className="flex h-12 min-w-0 flex-col items-center justify-center gap-0.5 rounded-full text-brand-ink/70 transition-colors hover:bg-white hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
                >
                  <Icon size={18} />
                  <span className="max-w-full truncate font-body text-[10px] leading-none">
                    {link.label}
                  </span>
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href={secondaryCta.href}
              aria-label={secondaryCta.label}
              className="flex h-12 min-w-0 flex-col items-center justify-center gap-0.5 rounded-full text-brand-ink/70 transition-colors hover:bg-white hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
            >
              <Handshake size={18} />
              <span className="max-w-full truncate font-body text-[10px] leading-none">
                Partner
              </span>
            </Link>
          </li>
          <li>
            <Link
              href={primaryCta.href}
              aria-label={primaryCta.label}
              className="flex h-12 min-w-0 flex-col items-center justify-center gap-0.5 rounded-full bg-white text-brand-teal shadow-[0_10px_26px_rgba(37,99,235,0.22)] transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tealLight"
            >
              <CalendarCheck size={18} />
              <span className="max-w-full truncate font-body text-[10px] font-600 leading-none">
                Book
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

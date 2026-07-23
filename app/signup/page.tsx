import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Clock, ShieldCheck, Sparkles } from "lucide-react";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create an account — Prestiige",
  description: "Sign up as partners for a Prestiige Cleaning Services account.",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-brand-cream text-brand-ink">
      <div className="grid min-h-screen lg:grid-cols-[1.02fr_0.98fr]">
        <section className="relative hidden overflow-hidden bg-brand-darker lg:block">
          <Image
            src="/images/prestiige-cleaner.png"
            alt="Prestiige cleaning professional"
            fill
            priority
            sizes="50vw"
            className="object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,17,38,0.96)_0%,rgba(3,17,38,0.68)_48%,rgba(3,17,38,0.2)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-brand-darker to-transparent" />

          <div className="relative z-10 flex min-h-screen flex-col justify-between px-12 py-10 xl:px-16">
            <Link
              href="/"
              aria-label="Prestiige home"
              className="inline-flex w-fit items-center gap-3 text-white"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal shadow-[0_0_24px_rgba(37,99,235,0.35)]">
                <Sparkles size={20} />
              </span>
              <span className="font-heading text-xl font-800 tracking-tight">
                Prestiige
              </span>
            </Link>

            <div className="max-w-xl pb-6">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-body text-sm text-white/80 backdrop-blur">
                <ShieldCheck size={16} className="text-brand-tealLight" />
                Trusted cleaning made simple
              </p>
              <h1 className="font-heading text-5xl font-800 leading-[1.02] tracking-tight text-white xl:text-6xl">
                Earn with Prestiige as a Partner
              </h1>
              <p className="mt-5 max-w-lg font-body text-base leading-7 text-white/72">
                Become a partner with Prestiige to access a steady stream of cleaning jobs, transparent commissions, and fast payouts — all from one easy-to-use platform.
              </p>

              <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
                {[
                  { value: "24/7", label: "booking access" },
                  { value: "4.9", label: "client rating" },
                  { value: "10k+", label: "spaces served" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur"
                  >
                    <p className="font-heading text-2xl font-800 text-white">
                      {item.value}
                    </p>
                    <p className="mt-1 font-body text-xs leading-4 text-white/58">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
          <div className="w-full max-w-[560px]">
            <div className="mb-8 flex items-center justify-between gap-4 lg:hidden">
              <Link
                href="/"
                aria-label="Prestiige home"
                className="inline-flex items-center gap-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal text-white shadow-[0_8px_24px_rgba(37,99,235,0.22)]">
                  <Sparkles size={18} />
                </span>
                <span className="font-heading text-lg font-800 tracking-tight">
                  Prestiige
                </span>
              </Link>
            </div>

            <div className="rounded-[28px] border border-white bg-white p-6 shadow-[0_24px_70px_rgba(7,27,58,0.12)] sm:p-8">
              <div className="mb-7">
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-sand px-3 py-1.5 font-body text-xs font-500 text-brand-teal">
                  <Clock size={14} />
                  Setup takes less than 2 minutes
                </p>
                <h2 className="font-heading text-3xl font-800 tracking-tight text-brand-ink sm:text-4xl">
                  Create your account
                </h2>
                <p className="mt-3 font-body text-sm leading-6 text-brand-inkMuted">
                  Join Prestiige to book, track, and manage premium cleaning
                  services from one secure dashboard.
                </p>
              </div>

              <SignupForm />

              <div className="mt-7 grid gap-3 border-t border-brand-ink/10 pt-6 sm:grid-cols-2">
                <div className="flex items-center gap-2 font-body text-xs text-brand-inkMuted">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  Secure account setup
                </div>
                <div className="flex items-center gap-2 font-body text-xs text-brand-inkMuted">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  No hidden booking fees
                </div>
              </div>
            </div>

            <p className="mt-6 text-center font-body text-sm text-brand-inkMuted">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-heading font-700 text-brand-teal underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

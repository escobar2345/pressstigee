"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SignupForm() {
  const router = useRouter();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [agree, setAgree] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree || isLoading) return;

    setError("");
    setMessage("");

    if (!supabase) {
      setError(
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local."
      );
      return;
    }

    const fullName = `${values.firstName} ${values.lastName}`.trim();

    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          first_name: values.firstName,
          last_name: values.lastName,
          full_name: fullName,
          referral_name: fullName,
        },
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback?next=/dashboard`
            : undefined,
      },
    });

    setIsLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    window.localStorage.setItem("prestiigeReferralName", fullName);
    window.localStorage.setItem("prestiigeUserFirstName", values.firstName);

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setMessage("Account created. Check your inbox to verify your email.");
  };

  const input =
    "w-full bg-white border border-brand-ink/10 rounded-2xl py-4 text-brand-ink font-body text-sm placeholder-brand-ink/38 shadow-[0_8px_24px_rgba(7,27,58,0.05)] focus:outline-none focus:border-brand-teal/50 focus:ring-4 focus:ring-brand-teal/10 transition";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="sr-only">
            First name
          </label>
          <div className="relative">
            <User
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/35"
            />
            <input
              id="firstName"
              type="text"
              required
              autoComplete="given-name"
              value={values.firstName}
              onChange={(e) =>
                setValues({ ...values, firstName: e.target.value })
              }
              placeholder="First name"
              className={`${input} pl-11 pr-4`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="lastName" className="sr-only">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            required
            autoComplete="family-name"
            value={values.lastName}
            onChange={(e) =>
              setValues({ ...values, lastName: e.target.value })
            }
            placeholder="Last name"
            className={`${input} px-4`}
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <div className="relative">
          <Mail
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/35"
          />
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            placeholder="Email address"
            className={`${input} pl-11 pr-4`}
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="relative">
          <LockKeyhole
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/35"
          />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            minLength={6}
            autoComplete="new-password"
            value={values.password}
            onChange={(e) =>
              setValues({ ...values, password: e.target.value })
            }
            placeholder="Create password"
            className={`${input} pl-11 pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-brand-ink/45 transition hover:bg-brand-sand hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/40"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      <label className="mb-6 flex cursor-pointer select-none items-start gap-3">
        <span className="relative inline-flex">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
              agree
                ? "bg-brand-teal border-brand-teal text-white"
                : "bg-white border-brand-ink/20 text-transparent"
            } peer-focus-visible:ring-2 peer-focus-visible:ring-brand-teal/40`}
          >
            <Check size={13} strokeWidth={3} />
          </span>
        </span>
        <span className="font-body text-sm leading-6 text-brand-inkMuted">
          I agree to the{" "}
          <a
            href="#"
            className="font-heading font-700 text-brand-teal underline-offset-4 hover:underline"
          >
            Terms &amp; Conditions
          </a>
        </span>
      </label>

      <button
        type="submit"
        disabled={!agree || isLoading}
        className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-ink px-5 py-4 font-heading text-sm font-800 text-white shadow-[0_16px_34px_rgba(7,27,58,0.22)] transition hover:bg-brand-dark active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ink/20"
      >
        {isLoading ? "Creating account..." : "Create Account"}
        <ArrowRight
          size={17}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </button>

      {message && (
        <p
          role="status"
          className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-center font-body text-sm text-emerald-700"
        >
          {message}
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-center font-body text-sm text-red-700"
        >
          {error}
        </p>
      )}
    </form>
  );
}

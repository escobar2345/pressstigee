"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginForm({
  redirectedFrom = "/dashboard",
}: {
  redirectedFrom?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setError("");
    setMessage("");

    if (!supabase) {
      setError(
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local."
      );
      return;
    }

    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    setIsLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    const metadata = data.user?.user_metadata;
    const fullName =
      metadata?.full_name ||
      metadata?.referral_name ||
      [metadata?.first_name, metadata?.last_name].filter(Boolean).join(" ");

    if (fullName) {
      window.localStorage.setItem("prestiigeReferralName", fullName);
    }

    if (metadata?.first_name) {
      window.localStorage.setItem("prestiigeUserFirstName", metadata.first_name);
    }

    setMessage("Signed in. Redirecting...");
    router.push(redirectedFrom);
    router.refresh();
  };

  const input =
    "w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-brand-ink font-body text-sm placeholder-gray-400 focus:outline-none focus:border-brand-ink focus:ring-2 focus:ring-brand-ink/10 transition shadow-[0_2px_8px_rgb(0,0,0,0.03)]";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          placeholder="Email address"
          className={input}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          placeholder="Password"
          className={input}
        />
      </div>

      <div className="flex justify-end mb-6">
        <Link
          href="#"
          className="font-heading font-600 text-brand-teal text-xs hover:underline underline-offset-2"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 rounded-xl bg-brand-ink text-white font-heading font-700 text-sm hover:bg-brand-dark active:scale-[0.99] transition disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/40"
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>

      <p className="mt-6 text-center font-body text-brand-ink/70 text-sm">
        Are you new?{" "}
        <Link
          href="/signup"
          className="text-brand-teal font-heading font-600 hover:underline underline-offset-2"
        >
          Create Account
        </Link>
      </p>

      {message && (
        <p
          role="status"
          className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-center font-body text-sm text-emerald-700"
        >
          {message}
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-center font-body text-sm text-red-700"
        >
          {error}
        </p>
      )}
    </form>
  );
}

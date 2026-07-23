"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${(process.env.NEXT_PUBLIC_ADMIN_API_URL ?? "https://backend-acend.onrender.com").replace(/\/$/, "")}/auth/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      // Debugging: log status + response (helps find why redirect isn't happening)
      // eslint-disable-next-line no-console
      console.log("Admin login response status:", response.status);

      const payloadText = await response.text().catch(() => "");
      // eslint-disable-next-line no-console
      console.log("Admin login response body:", payloadText);

      type LoginPayload = {
        success?: boolean;
        authenticated?: boolean;
        token?: unknown;
        detail?: string;
        message?: string;
      };

      const payload =
        payloadText && payloadText.startsWith("{")
          ? (JSON.parse(payloadText) as LoginPayload)
          : null;

      // If the backend returns 4xx/5xx, do not redirect.
      if (!response.ok) {
        throw new Error(
          (payload as any)?.detail ||
            (payload as any)?.message ||
            "Invalid email or password"
        );
      }

      // Your backend success payload is:
      // { user: { ..., is_admin: true, role: 'super_admin' } }
      const user = (payload as any)?.user;
      const isAdmin = !!user?.is_admin || user?.role === "super_admin";

      if (!isAdmin) {
        throw new Error("Login failed: not an admin");
      }

      // Success: redirect
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-darker flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-brand-dark/90 p-10 shadow-2xl shadow-black/10">
        <h1 className="text-3xl font-heading font-800 text-white mb-4">Admin Login</h1>
        <p className="text-sm text-white/70 mb-8">
          Use your admin credentials to access the internal dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-sm text-white/80">
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
            />
          </label>

          <label className="block text-sm text-white/80">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-brand-teal px-4 py-3 text-sm font-heading font-700 text-black transition hover:bg-emerald-400 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {error && (
            <p className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

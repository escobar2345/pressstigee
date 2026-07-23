import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login — Prestiige",
  description: "Sign in to your Prestiige Cleaning Services account.",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { redirectedFrom?: string };
}) {
  const redirectedFrom = searchParams?.redirectedFrom?.startsWith("/dashboard")
    ? searchParams.redirectedFrom
    : "/dashboard";

  return (
    <div className="min-h-screen bg-white text-brand-ink flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-7 py-10 sm:px-10">
        <div className="text-center mb-8">
          <h1 className="font-heading font-800 text-brand-ink text-2xl sm:text-3xl tracking-tight">
            Welcome Back
          </h1>
          <p className="mt-2 font-body text-brand-ink/55 text-xs">
            Please enter your details
          </p>
        </div>

        <LoginForm redirectedFrom={redirectedFrom} />
      </div>
    </div>
  );
}

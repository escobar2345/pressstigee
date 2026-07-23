import Link from "next/link";
import { LogOut } from "lucide-react";

export default function AccountSecurity() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="font-heading font-700 text-white text-lg mb-6">
        Account &amp; Security
      </h2>

      {/* Password */}
      <div className="flex items-center justify-between gap-4 py-4 border-b border-brand-border/60">
        <span className="font-body text-white/70 text-sm">Password</span>
        <button className="px-6 py-2.5 rounded-full bg-brand-teal text-brand-darker font-heading font-700 text-sm hover:bg-brand-tealLight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tealLight">
          Change Password
        </button>
      </div>

      {/* Two-Factor */}
      <div className="pt-6">
        <p className="font-heading font-600 text-white/70 text-sm mb-4">
          Two-Factor Authentication
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-6 py-2.5 rounded-full border border-red-500/50 text-red-300 font-heading font-600 text-sm hover:bg-red-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60">
            Deactivate Account
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-red-500/50 text-red-300 font-heading font-600 text-sm hover:bg-red-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60"
          >
            <LogOut size={15} />
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

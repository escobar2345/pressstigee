import type { Metadata } from "next";
import { Bell, Settings } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileBottomNav from "@/components/dashboard/MobileBottomNav";
import ProfileCard from "@/components/dashboard/ProfileCard";

export const metadata: Metadata = {
  title: "My Profile — Prestiige Partner",
  description: "View and manage your Prestiige partner profile.",
};

export default function ProfilePage() {
  return (
    <div className="flex h-screen overflow-hidden bg-brand-darker">
      <DashboardSidebar />

      <main className="flex-1 min-w-0 h-full px-5 sm:px-8 py-6 sm:py-8 pb-28 lg:pb-8 overflow-hidden">
        <div className="max-w-3xl h-full mx-auto">
          <header className="flex items-center justify-between gap-4 mb-6">
            <p className="font-heading font-700 text-white text-base sm:text-lg">
              Account Profile
            </p>
            <div className="flex items-center gap-2.5">
              <button
                aria-label="Settings"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/70 hover:text-brand-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
              >
                <Settings size={16} />
              </button>
              <button
                aria-label="Notifications"
                className="relative w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/70 hover:text-brand-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
              >
                <Bell size={16} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500" />
              </button>
            </div>
          </header>

          <ProfileCard />
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
}

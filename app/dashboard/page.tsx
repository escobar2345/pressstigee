import type { Metadata } from "next";
import DashboardPageClient from "@/components/dashboard/DashboardPageClient";

export const metadata: Metadata = {
  title: "Partner Dashboard — Prestiige",
  description: "Track your earnings, referrals, and payouts.",
};

export default function DashboardPage() {
  return <DashboardPageClient />;
}

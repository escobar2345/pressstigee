"use client";

import { useEffect, useState } from "react";
import { Wallet, Clock, ArrowDownToLine } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getReferralNameFromMetadata } from "@/lib/referrals";
import DashboardSidebar from "./DashboardSidebar";
import MobileBottomNav from "./MobileBottomNav";
import TopBar from "./TopBar";
import BalanceCard from "./BalanceCard";
import StatCard from "./StatCard";
import ReferralLinkBar from "./ReferralLinkBar";
import EarningsOverview from "./EarningsOverview";

export default function DashboardPageClient() {
  const [name, setName] = useState("Partner");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      const { data } = await supabase.auth.getUser();
      const metadataName = getReferralNameFromMetadata(data.user?.user_metadata);

      if (metadataName) {
        setName(metadataName);
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-brand-darker">
      <DashboardSidebar />

      <main className="flex-1 min-w-0 h-full px-5 sm:px-8 py-6 sm:py-8 pb-28 lg:pb-8 overflow-hidden">
        <div className="max-w-5xl h-full mx-auto">
          <TopBar name={isLoading ? "Partner" : name} />

          <BalanceCard label="Total Earned" amount="₦ 240,700" />

          <div className="-mx-5 sm:-mx-8 lg:mx-0 mb-5">
            <div className="flex lg:grid lg:grid-cols-3 gap-3 overflow-x-auto px-5 sm:px-8 lg:px-0 snap-x snap-mandatory scrollbar-none">
              <div className="snap-start shrink-0 w-[70%] sm:w-[45%] lg:w-auto">
                <StatCard
                  label="This Month"
                  value="₦ 56,540"
                  sub="+12% vs last month"
                  icon={Wallet}
                  tone="success"
                />
              </div>
              <div className="snap-start shrink-0 w-[70%] sm:w-[45%] lg:w-auto">
                <StatCard
                  label="Pending"
                  value="₦ 25,230"
                  sub="Awaiting payout"
                  icon={Clock}
                  tone="pending"
                />
              </div>
              <div className="snap-start shrink-0 w-[70%] sm:w-[45%] lg:w-auto">
                <StatCard
                  label="Available for Withdrawal"
                  value="₦ 25,230"
                  sub="Ready to withdraw"
                  icon={ArrowDownToLine}
                  tone="success"
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <ReferralLinkBar />
          </div>

          <EarningsOverview />
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
}

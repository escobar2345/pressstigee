"use client";

import { useEffect, useMemo, useState } from "react";
import { getReferralNameFromMetadata, toReferralCode } from "@/lib/referrals";
import { statusPill, type Status } from "@/lib/status-pill";
import { supabase } from "@/lib/supabase";

type ReferralBooking = {
  id: string;
  customer_name: string;
  created_at: string;
  service_label: string;
  job_value: number;
  commission: number;
  status: Extract<Status, "Pending" | "Completed" | "Failed">;
};

const statusFallback = "Pending" as const;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function normalizeStatus(
  status: string
): Extract<Status, "Pending" | "Completed" | "Failed"> {
  if (status === "Completed" || status === "Failed" || status === "Pending") {
    return status;
  }

  return statusFallback;
}

export default function ReferralList() {
  const [referralId, setReferralId] = useState("");
  const [referrals, setReferrals] = useState<ReferralBooking[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const emptyMessage = useMemo(() => {
    if (!referralId) return "Sign in to view referral bookings.";
    return "No referral bookings yet.";
  }, [referralId]);

  useEffect(() => {
    let isMounted = true;

    const loadReferralId = async () => {
      const storedName = window.localStorage.getItem("prestiigeReferralName");

      if (storedName) {
        setReferralId(toReferralCode(storedName));
        return;
      }

      if (!supabase) {
        setIsLoading(false);
        return;
      }

      const { data } = await supabase.auth.getUser();
      const metadataName = getReferralNameFromMetadata(
        data.user?.user_metadata
      );

      if (isMounted && metadataName) {
        setReferralId(toReferralCode(metadataName));
      } else if (isMounted) {
        setIsLoading(false);
      }
    };

    loadReferralId();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!referralId) return;

    if (!supabase) {
      setError(
        "Supabase is not configured. Add your Supabase URL and anon key to .env.local."
      );
      setIsLoading(false);
      return;
    }

    const client = supabase;

    const loadReferrals = async () => {
      setIsLoading(true);
      setError("");

      const { data, error } = await client
        .from("referral_bookings")
        .select(
          "id, customer_name, created_at, service_label, job_value, commission, status"
        )
        .eq("referral_id", referralId)
        .order("created_at", { ascending: false });

      setIsLoading(false);

      if (error) {
        setError(error.message);
        return;
      }

      setReferrals(
        (data ?? []).map((item) => ({
          ...item,
          status: normalizeStatus(item.status),
        }))
      );
    };

    loadReferrals();

    const channel = client
      .channel(`referral-bookings-${referralId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "referral_bookings",
          filter: `referral_id=eq.${referralId}`,
        },
        () => {
          loadReferrals();
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, [referralId]);

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-brand-darker/60 border border-brand-border p-5">
        <p className="font-body text-white/55 text-sm">Loading referrals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-500/10 border border-red-400/25 p-5">
        <p className="font-body text-red-200 text-sm">{error}</p>
      </div>
    );
  }

  if (!referrals.length) {
    return (
      <div className="rounded-2xl bg-brand-darker/60 border border-brand-border p-5">
        <p className="font-body text-white/55 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {referrals.map((r) => (
        <li
          key={r.id}
          className="rounded-2xl bg-brand-darker/60 border border-brand-border p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-heading font-700 text-white text-base">
                {r.customer_name}
              </p>
              <p className="font-body text-white/45 text-xs mt-0.5">
                {formatDate(r.created_at)}
              </p>
            </div>
            <div className="text-right">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full border text-[11px] font-heading font-700 ${statusPill[r.status]}`}
              >
                {r.status}
              </span>
              <p className="font-body text-white/45 text-[11px] mt-1.5">
                {r.service_label}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <div>
              <p className="font-body text-white/45 text-[11px]">Job value</p>
              <p className="font-heading font-700 text-white text-sm mt-1">
                {formatCurrency(r.job_value)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-body text-white/45 text-[11px]">Commission</p>
              <p className="font-heading font-700 text-white text-sm mt-1">
                {formatCurrency(r.commission)}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Users,
  UserCheck,
  Clock,
  Banknote,
  TrendingUp,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminTable, { StatusBadge, type Column } from "@/components/admin/AdminTable";
import { supabase } from "@/lib/supabase";

type AdminBookingRow = {
  id: string;
  referral_id: string;
  customer_name: string;
  service_label: string;
  job_value: number;
  commission: number;
  status: "Pending" | "Completed" | "Failed";
  created_at: string;
};

const columns: Column<AdminBookingRow>[] = [
  { key: "created_at", header: "Booked On", render: (row) => new Date(row.created_at).toLocaleString() },
  { key: "customer_name", header: "Customer" },
  { key: "referral_id", header: "Referred By" },
  { key: "service_label", header: "Service" },
  {
    key: "job_value",
    header: "Amount",
    render: (row) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(row.job_value),
    align: "right",
  },
  {
    key: "commission",
    header: "Commission",
    render: (row) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(row.commission),
    align: "right",
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "actions",
    header: "Actions",
    render: (row) => <StatusActions row={row} />,
  },
];

function StatusActions({ row }: { row: AdminBookingRow }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const updateStatus = async (status: AdminBookingRow["status"]) => {
    if (!supabase) return;
    setIsUpdating(true);
    await supabase
      .from("referral_bookings")
      .update({ status })
      .eq("id", row.id);
    setIsUpdating(false);
    window.dispatchEvent(new Event("supabase-referral-bookings-updated"));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {row.status !== "Completed" && (
        <button
          type="button"
          onClick={() => updateStatus("Completed")}
          disabled={isUpdating}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-teal/15 text-brand-teal text-[11px] font-heading font-700 hover:bg-brand-teal/25 transition"
        >
          <CheckCircle2 size={14} />
          Confirm
        </button>
      )}
      {row.status !== "Pending" && (
        <button
          type="button"
          onClick={() => updateStatus("Pending")}
          disabled={isUpdating}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-[11px] font-heading font-700 hover:bg-white/20 transition"
        >
          <RefreshCw size={14} />
          Pending
        </button>
      )}
      {row.status !== "Failed" && (
        <button
          type="button"
          onClick={() => updateStatus("Failed")}
          disabled={isUpdating}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-300 text-[11px] font-heading font-700 hover:bg-red-500/20 transition"
        >
          <XCircle size={14} />
          Fail
        </button>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<AdminBookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBookings = async () => {
    if (!supabase) {
      setError("Supabase is not configured.");
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("referral_bookings")
      .select("id, referral_id, customer_name, service_label, job_value, commission, status, created_at")
      .order("created_at", { ascending: false });

    setLoading(false);

    if (fetchError) {
      setError(fetchError.message);
      return;
    }

    setBookings((data ?? []) as AdminBookingRow[]);
  };

  useEffect(() => {
    loadBookings();

    if (!supabase) return;

    const channel = supabase
      .channel("admin-referral-bookings")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "referral_bookings",
        },
        () => {
          loadBookings();
        }
      )
      .subscribe();

    const refreshListener = () => {
      loadBookings();
    };

    window.addEventListener("supabase-referral-bookings-updated", refreshListener);

return () => {
      window.removeEventListener("supabase-referral-bookings-updated", refreshListener);
      supabase?.removeChannel(channel);
    };
  }, []);

  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.job_value, 0);
  const totalCommission = bookings.reduce((sum, booking) => sum + booking.commission, 0);
  const pendingPayments = bookings
    .filter((booking) => booking.status === "Pending")
    .reduce((sum, booking) => sum + booking.commission, 0);
  const completedBookings = bookings.filter((booking) => booking.status === "Completed").length;

  const summaryCards = [
    {
      label: "Total Bookings",
      value: totalBookings.toString(),
      icon: Users,
      tone: "success" as const,
      delta: { value: "+5% vs last week", positive: true },
    },
    {
      label: "Pending Commissions",
      value: new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(pendingPayments),
      icon: Clock,
      tone: "pending" as const,
    },
    {
      label: "Revenue",
      value: new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(totalRevenue),
      icon: Banknote,
      tone: "success" as const,
    },
    {
      label: "Completed Referrals",
      value: completedBookings.toString(),
      icon: UserCheck,
      tone: "success" as const,
      delta: { value: "+12% vs last week", positive: true },
    },
  ];

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <AdminHeader
        title="Admin Dashboard"
        subtitle="Live referral bookings and commission management for Prestiige."
        showSearch={false}
      />

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {summaryCards.map((card) => (
          <AdminStatCard
            key={card.label}
            label={card.label}
            value={card.value}
            icon={card.icon}
            tone={card.tone}
            delta={card.delta}
          />
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="font-heading font-700 text-white text-xl">Live Referrals</h2>
            <p className="font-body text-white/50 text-sm mt-1">
              See every booking, who referred it, and mark its status in real time.
            </p>
          </div>
          <button
            type="button"
            onClick={loadBookings}
            className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-dark/80 px-4 py-2 text-sm text-white/80 hover:text-white hover:border-brand-teal/50 transition"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="py-10 text-center text-white/60">Loading referral bookings...</div>
        ) : (
          <AdminTable columns={columns} rows={bookings} />
        )}
      </div>
    </div>
  );
}
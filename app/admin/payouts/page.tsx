import { Wallet, Clock, Users, TrendingUp, CheckCircle2 } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminTable, {
  StatusBadge,
  type Column,
} from "@/components/admin/AdminTable";
import {
  payoutsKpis,
  adminPayouts,
  type AdminPayoutRow,
} from "@/lib/admin-mock-data";

function PayButton({ onPay }: { onPay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPay}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-brand-teal/40 bg-brand-teal/10 text-brand-teal font-heading font-700 text-[11px] hover:bg-brand-teal/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
    >
      <CheckCircle2 size={14} />
      Pay
    </button>
  );
}

const columns: Column<AdminPayoutRow>[] = [
  { key: "partner", header: "Partner" },
  { key: "email", header: "Email" },
  { key: "bankName", header: "Bank" },
  { key: "accountNumber", header: "Account #" },
  { key: "amount", header: "Amount" },
  { key: "method", header: "Method" },
  { key: "requestDate", header: "Request Date" },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <PayButton onPay={() => row.__pay?.()} />
    ),
  },
];

export default function AdminPayoutsPage() {
  return (
    <>
      <AdminHeader
        title="Payouts"
        subtitle="Manage partner payouts and withdrawals"
        showSearch={false}
      />

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <AdminStatCard
          label="Total Payouts"
          value={payoutsKpis.total}
          icon={Wallet}
          iconShape="avatar"
          tone="success"
        />
        <AdminStatCard
          label="Pending Payouts"
          value={payoutsKpis.pending}
          icon={Clock}
          iconShape="avatar"
          tone="pending"
        />
        <AdminStatCard
          label="Total partners paid"
          value={payoutsKpis.partnersPaid}
          icon={Users}
          iconShape="avatar"
          tone="neutral"
        />
        <AdminStatCard
          label="This month paid"
          value={payoutsKpis.thisMonth}
          icon={TrendingUp}
          iconShape="avatar"
          tone="success"
        />
      </div>

      <AdminTable columns={columns} rows={adminPayouts} />
    </>
  );
}

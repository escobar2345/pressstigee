import { Wallet, Clock, Users, TrendingUp } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminTable, {
  StatusBadge,
  type Column,
} from "@/components/admin/AdminTable";
import PayButton from "@/components/admin/PayButton";
import {
  payoutsKpis,
  adminPayouts,
  type AdminPayoutRow,
} from "@/lib/admin-mock-data";

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
    render: (row) => <PayButton payoutId={row.email} />,
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

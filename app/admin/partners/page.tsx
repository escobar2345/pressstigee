import { CheckCircle2, Users, UserCheck, UserMinus, UserX } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminTable, {
  StatusBadge,
  type Column,
} from "@/components/admin/AdminTable";
import { partnersKpis, partners, type PartnerRow } from "@/lib/admin-mock-data";

const columns: Column<PartnerRow>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "bankName", header: "Bank" },
  { key: "accountNumber", header: "Account #" },
  { key: "joinedDate", header: "Joined Date" },
  { key: "referrals", header: "Referrals" },
  { key: "amount", header: "Earnings" },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "actions",
    header: "Actions",
    render: () => (
      <button className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-brand-teal/40 bg-brand-teal/10 text-brand-teal font-heading font-700 text-[11px] hover:bg-brand-teal/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60">
        <CheckCircle2 size={14} />
        Pay
      </button>
    ),
  },
];

export default function PartnersPage() {
  return (
    <>
      <AdminHeader
        title="Partners"
        subtitle="Manage and monitor all partners"
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <AdminStatCard
          label="Total Partners"
          value={partnersKpis.total}
          icon={Users}
          iconShape="avatar"
          tone="default"
        />
        <AdminStatCard
          label="Active Partners"
          value={partnersKpis.active}
          icon={UserCheck}
          iconShape="avatar"
          tone="success"
        />
        <AdminStatCard
          label="Inactive Partners"
          value={partnersKpis.inactive}
          icon={UserMinus}
          iconShape="avatar"
          tone="neutral"
        />
        <AdminStatCard
          label="Suspended"
          value={partnersKpis.suspended}
          icon={UserX}
          iconShape="avatar"
          tone="danger"
        />
      </div>

      {/* Partners table */}
      <AdminTable columns={columns} rows={partners} />
    </>
  );
}

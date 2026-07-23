import { Pencil } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminToolbar from "@/components/admin/AdminToolbar";
import AdminTable, {
  StatusBadge,
  type Column,
} from "@/components/admin/AdminTable";
import AdminPagination from "@/components/admin/AdminPagination";
import { adminReferrals, type AdminReferralRow } from "@/lib/admin-mock-data";

function ApproveButton() {
  return (
    <button className="inline-flex items-center px-4 py-1.5 rounded-md border border-brand-teal/40 bg-brand-teal/10 text-brand-teal font-heading font-700 text-[11px] hover:bg-brand-teal/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60">
      Approve
    </button>
  );
}

const columns: Column<AdminReferralRow>[] = [
  { key: "referralId", header: "Referrals ID" },
  { key: "clientName", header: "Client Name" },
  { key: "amount", header: "Amount" },
  { key: "services", header: "Services" },
  { key: "requestDate", header: "Request Date" },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "actions",
    header: "Actions",
    render: () => <ApproveButton />,
  },
];

export default function AdminReferralsPage() {
  return (
    <>
      <AdminHeader
        title="Referrals"
        subtitle="Track all Referrals"
        showSearch={false}
      />

      <AdminToolbar
        placeholder="Search Referrals"
        action={
          <button className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-brand-darker text-white font-heading font-700 text-xs border border-brand-border hover:border-brand-teal/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60">
            <Pencil size={13} />
            Edit
          </button>
        }
      />

      <AdminTable
        columns={columns}
        rows={adminReferrals}
        footer={
          <AdminPagination
            summary="Showing 1 to 8 of 120 results"
            page={1}
            totalPages={2}
          />
        }
      />
    </>
  );
}

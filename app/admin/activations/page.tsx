import { Download, Send } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminToolbar from "@/components/admin/AdminToolbar";
import AdminTable, {
  StatusBadge,
  type Column,
} from "@/components/admin/AdminTable";
import AdminPagination from "@/components/admin/AdminPagination";
import {
  pendingActivations,
  type PendingActivationRow,
} from "@/lib/admin-mock-data";

const columns: Column<PendingActivationRow>[] = [
  { key: "name", header: "Names" },
  { key: "email", header: "Email" },
  { key: "joinedDate", header: "Joined Date" },
  { key: "amount", header: "Amount" },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
];

export default function PendingActivationPage() {
  return (
    <>
      <AdminHeader title="Pending Activation" showSearch={false} />

      <AdminToolbar
        placeholder="Search Transactions"
        action={
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-brand-teal/40 bg-brand-teal/10 text-brand-teal font-heading font-700 text-xs hover:bg-brand-teal/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60">
              <Send size={13} />
              Send Reminder
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-brand-teal text-brand-darker font-heading font-700 text-xs hover:bg-brand-tealLight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tealLight">
              <Download size={13} />
              Export
            </button>
          </div>
        }
      />

      <AdminTable
        columns={columns}
        rows={pendingActivations}
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

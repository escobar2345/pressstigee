import { Download } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminToolbar from "@/components/admin/AdminToolbar";
import AdminTable, {
  StatusBadge,
  type Column,
} from "@/components/admin/AdminTable";
import AdminPagination from "@/components/admin/AdminPagination";
import {
  activationPayments,
  type ActivationPaymentRow,
} from "@/lib/admin-mock-data";

const columns: Column<ActivationPaymentRow>[] = [
  { key: "partner", header: "Partner" },
  { key: "email", header: "Email" },
  { key: "amount", header: "Amount" },
  { key: "method", header: "Method" },
  { key: "requestDate", header: "Request Date" },
  {
    key: "status",
    header: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
];

export default function ActivationPaymentsPage() {
  return (
    <>
      <AdminHeader
        title="Payments"
        subtitle="Track all activation payments"
        showSearch={false}
      />

      <AdminToolbar
        placeholder="Search Transactions"
        filters={["All Types", "All Status"]}
        action={
          <button className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-brand-teal text-brand-darker font-heading font-700 text-xs hover:bg-brand-tealLight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tealLight">
            <Download size={13} />
            Export
          </button>
        }
      />

      <AdminTable
        columns={columns}
        rows={activationPayments}
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

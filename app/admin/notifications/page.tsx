import AdminHeader from "@/components/admin/AdminHeader";
import SendNotificationForm from "@/components/admin/SendNotificationForm";
import AdminTable, { type Column } from "@/components/admin/AdminTable";
import AdminPagination from "@/components/admin/AdminPagination";
import {
  notificationsHistory,
  type NotificationRow,
} from "@/lib/admin-mock-data";

const columns: Column<NotificationRow>[] = [
  { key: "title", header: "Title" },
  { key: "audience", header: "Audience" },
  { key: "sentDate", header: "Sent Date" },
];

export default function NotificationsPage() {
  return (
    <>
      <AdminHeader title="Notifications" showSearch={false} />

      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 items-start">
        <SendNotificationForm />

        <AdminTable
          title="Notifications History"
          columns={columns}
          rows={notificationsHistory}
          footer={
            <AdminPagination
              summary="Showing 1 to 2 of 5 results"
              page={1}
              totalPages={2}
            />
          }
        />
      </div>
    </>
  );
}

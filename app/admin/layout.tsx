import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin — Prestiige",
  description: "Internal admin panel for Prestiige Cleaning Services.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-brand-darker">
      <AdminSidebar />
      <main className="flex-1 min-w-0 px-5 sm:px-8 lg:px-10 py-6 sm:py-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

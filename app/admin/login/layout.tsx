import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login — Prestiige",
  description: "Admin login page for Prestiige internal dashboard.",
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

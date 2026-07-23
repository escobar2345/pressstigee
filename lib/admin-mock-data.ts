// Single source of hardcoded admin data. When/if a real backend lands,
// this is the only file that needs to be replaced with API/DB queries.

import type { Status } from "./status-pill";

// ── Dashboard KPIs ──────────────────────────────────────────────────────────
export const kpis = {
  totalPartners: "1,248",
  activePartners: "892",
  pendingPayouts: "₦ 1,240,500",
  totalRevenue: "₦ 18.7M",
};

// Revenue per month (in millions of Naira, 12 months)
export const revenueSeries = [4.2, 5.1, 4.6, 6.3, 7.8, 6.9, 8.4, 9.1, 7.5, 8.9, 9.6, 11.2];
export const revenueMonths = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Referrals per week (last 8 weeks)
export const referralsPerWeek = [22, 31, 28, 45, 38, 52, 48, 61];
export const referralWeeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

// ── Top performing services (donut chart) ───────────────────────────────────
export const topPerformingServices = [
  { label: "Home Cleaning", value: 42, color: "#2563EB" },
  { label: "Office Cleaning", value: 26, color: "#60A5FA" },
  { label: "Laundry", value: 18, color: "#FBBF24" },
  { label: "Other", value: 14, color: "#64748B" },
];

// ── Activity / Recent partner sign-ups ──────────────────────────────────────
export type ActivityRow = {
  partner: string;
  email: string;
  joined: string;
  referrals: number;
  earned: string;
  status: Extract<Status, "Active" | "Pending" | "Inactive">;
};

// ── Activation payments ─────────────────────────────────────────────────────
export type ActivationPaymentRow = {
  partner: string;
  email: string;
  amount: string;
  method: string;
  requestDate: string;
  status: Extract<Status, "Completed" | "Pending" | "Failed">;
};

export const activationPayments: ActivationPaymentRow[] = [
  { partner: "Ibrahim Lawal", email: "ibrahim@email.com", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Completed" },
  { partner: "Miracle Olu", email: "miracle@email.com", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Completed" },
  { partner: "Victor Okafor", email: "victor@email.com", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Completed" },
  { partner: "Tola Adebayo", email: "tola@email.com", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Completed" },
  { partner: "Samuel Eze", email: "samuel@email.com", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Completed" },
  { partner: "Funmi Balogun", email: "funmi@email.com", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Completed" },
  { partner: "Chidi Okeke", email: "chidi@email.com", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Completed" },
  { partner: "Ngozi Adebayo", email: "ngozi@email.com", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Completed" },
  { partner: "Emeka Obi", email: "emeka@email.com", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Completed" },
];

// ── Notifications ───────────────────────────────────────────────────────────
export type NotificationRow = {
  title: string;
  audience: string;
  sentDate: string;
};

export const notificationsHistory: NotificationRow[] = [
  { title: "New Bonus", audience: "All Partners", sentDate: "May 20, 2024" },
  { title: "System Maintenance", audience: "All Partners", sentDate: "May 20, 2024" },
];

// ── Admin Payouts ───────────────────────────────────────────────────────────
export const payoutsKpis = {
  total: "₦ 260,000",
  pending: "₦ 60,000",
  partnersPaid: "310",
  thisMonth: "₦ 70,000",
};

export type AdminPayoutRow = {
  partner: string;
  email: string;
  bankName: string;
  accountNumber: string;
  amount: string;
  method: string;
  requestDate: string;
  status: Extract<Status, "Pending" | "Completed">;
  __pay?: () => void;
};

export const adminPayouts: AdminPayoutRow[] = [
  { partner: "Ibrahim Lawal", email: "ibrahim@email.com", bankName: "Access Bank", accountNumber: "0123456789", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
  { partner: "Miracle Olu", email: "miracle@email.com", bankName: "Zenith Bank", accountNumber: "0987654321", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
  { partner: "Victor Okafor", email: "victor@email.com", bankName: "First Bank", accountNumber: "1234509876", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
  { partner: "Tola Adebayo", email: "tola@email.com", bankName: "GTBank", accountNumber: "5647382910", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
  { partner: "Samuel Eze", email: "samuel@email.com", bankName: "Union Bank", accountNumber: "1029384756", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
  { partner: "Funmi Balogun", email: "funmi@email.com", bankName: "FCMB", accountNumber: "9081726354", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
  { partner: "Chidi Okeke", email: "chidi@email.com", bankName: "Polaris Bank", accountNumber: "5647382912", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
  { partner: "Ngozi Adebayo", email: "ngozi@email.com", bankName: "Stanbic IBTC", accountNumber: "7766554433", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
  { partner: "Emeka Obi", email: "emeka@email.com", bankName: "Union Bank", accountNumber: "3344556677", amount: "₦20,000", method: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
];

// ── Referrals (admin view) ──────────────────────────────────────────────────
export type AdminReferralRow = {
  referralId: string;
  clientName: string;
  amount: string;
  services: string;
  requestDate: string;
  status: Extract<Status, "Pending" | "Completed">;
};

export const adminReferrals: AdminReferralRow[] = [
  { referralId: "000123", clientName: "Ibrahim Lawal", amount: "₦20,000", services: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
  { referralId: "000124", clientName: "Miracle Olu", amount: "₦20,000", services: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
  { referralId: "000125", clientName: "Victor Okafor", amount: "₦20,000", services: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
  { referralId: "000126", clientName: "Tola Adebayo", amount: "₦20,000", services: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
  { referralId: "000127", clientName: "Samuel Eze", amount: "₦20,000", services: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
  { referralId: "000128", clientName: "Funmi Balogun", amount: "₦20,000", services: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
  { referralId: "000129", clientName: "Chidi Okeke", amount: "₦20,000", services: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
  { referralId: "000130", clientName: "Ngozi Adebayo", amount: "₦20,000", services: "Bank Transfer", requestDate: "May 20, 2024", status: "Pending" },
];

// ── Pending Activations ─────────────────────────────────────────────────────
export type PendingActivationRow = {
  name: string;
  email: string;
  joinedDate: string;
  amount: string;
  status: Extract<Status, "Pending">;
};

export const pendingActivations: PendingActivationRow[] = [
  { name: "Ibrahim Lawal", email: "ibrahim@email.com", joinedDate: "May 20, 2024", amount: "₦20,000", status: "Pending" },
  { name: "Miracle Olu", email: "miracle@email.com", joinedDate: "May 20, 2024", amount: "₦20,000", status: "Pending" },
  { name: "Victor Okafor", email: "victor@email.com", joinedDate: "May 20, 2024", amount: "₦20,000", status: "Pending" },
  { name: "Tola Adebayo", email: "tola@email.com", joinedDate: "May 20, 2024", amount: "₦20,000", status: "Pending" },
  { name: "Samuel Eze", email: "samuel@email.com", joinedDate: "May 20, 2024", amount: "₦20,000", status: "Pending" },
  { name: "Funmi Balogun", email: "funmi@email.com", joinedDate: "May 20, 2024", amount: "₦20,000", status: "Pending" },
  { name: "Chidi Okeke", email: "chidi@email.com", joinedDate: "May 20, 2024", amount: "₦20,000", status: "Pending" },
];

// ── Partners ────────────────────────────────────────────────────────────────
export const partnersKpis = {
  total: "1,248",
  active: "856",
  inactive: "210",
  suspended: "272",
};

export type PartnerRow = {
  name: string;
  email: string;
  bankName: string;
  accountNumber: string;
  joinedDate: string;
  referrals: number;
  amount: string;
  status: Extract<Status, "Active" | "Inactive">;
};

export const partners: PartnerRow[] = [
  { name: "Ibrahim Lawal", email: "ibrahim@email.com", bankName: "Access Bank", accountNumber: "0123456789", joinedDate: "May 20, 2024", referrals: 45, amount: "₦20,000", status: "Active" },
  { name: "Miracle Olu", email: "miracle@email.com", bankName: "Zenith Bank", accountNumber: "0987654321", joinedDate: "May 20, 2024", referrals: 28, amount: "₦20,000", status: "Active" },
  { name: "Victor Okofor", email: "victor@email.com", bankName: "First Bank", accountNumber: "1234509876", joinedDate: "May 20, 2024", referrals: 32, amount: "₦20,000", status: "Active" },
  { name: "Tola Adebayo", email: "tola@email.com", bankName: "GTBank", accountNumber: "5647382910", joinedDate: "May 20, 2024", referrals: 15, amount: "₦20,000", status: "Inactive" },
  { name: "Samuel Eze", email: "samuel@email.com", bankName: "Union Bank", accountNumber: "1029384756", joinedDate: "May 20, 2024", referrals: 10, amount: "₦20,000", status: "Active" },
  { name: "Funmi Balogun", email: "funmi@email.com", bankName: "FCMB", accountNumber: "9081726354", joinedDate: "May 20, 2024", referrals: 8, amount: "₦20,000", status: "Active" },
  { name: "Chidi Okeke", email: "chidi@email.com", bankName: "Polaris Bank", accountNumber: "5647382912", joinedDate: "May 20, 2024", referrals: 0, amount: "₦20,000", status: "Inactive" },
  { name: "Ngozi Adebayo", email: "ngozi@email.com", bankName: "Stanbic IBTC", accountNumber: "7766554433", joinedDate: "May 20, 2024", referrals: 0, amount: "₦20,000", status: "Inactive" },
  { name: "Emeka Obi", email: "emeka@email.com", bankName: "Union Bank", accountNumber: "3344556677", joinedDate: "May 20, 2024", referrals: 17, amount: "₦20,000", status: "Active" },
];

export const recentActivity: ActivityRow[] = [
  { partner: "Ibrahim Lawal", email: "ibrahim@mail.com", joined: "Apr 14 2026", referrals: 12, earned: "₦ 240,700", status: "Active" },
  { partner: "Miracle Olu", email: "miracle@mail.com", joined: "Apr 12 2026", referrals: 8, earned: "₦ 156,200", status: "Active" },
  { partner: "Victor Okafor", email: "victor@mail.com", joined: "Apr 10 2026", referrals: 0, earned: "₦ 0", status: "Pending" },
  { partner: "Tola Adebayo", email: "tola@mail.com", joined: "Apr 09 2026", referrals: 21, earned: "₦ 412,000", status: "Active" },
  { partner: "Samuel Eze", email: "samuel@mail.com", joined: "Apr 07 2026", referrals: 3, earned: "₦ 38,500", status: "Active" },
  { partner: "Funmi Balogun", email: "funmi@mail.com", joined: "Apr 05 2026", referrals: 0, earned: "₦ 0", status: "Inactive" },
  { partner: "Chidi Okeke", email: "chidi@mail.com", joined: "Apr 02 2026", referrals: 17, earned: "₦ 305,400", status: "Active" },
  { partner: "Ngozi Adebayo", email: "ngozi@mail.com", joined: "Mar 28 2026", referrals: 5, earned: "₦ 62,150", status: "Pending" },
];

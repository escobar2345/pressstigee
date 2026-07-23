// Colour map for status pills used across the dashboard + admin tables.
// Keep keys broad so payouts, referrals, partner status, and admin tables
// can all draw from the same palette.

export type Status =
  | "Pending"
  | "Completed"
  | "Failed"
  | "Active"
  | "Inactive";

export const statusPill: Record<Status, string> = {
  Pending: "bg-amber-400/20 text-amber-300 border-amber-400/30",
  Completed: "bg-brand-teal/20 text-brand-teal border-brand-teal/30",
  Active: "bg-brand-teal/20 text-brand-teal border-brand-teal/30",
  Failed: "bg-red-500/20 text-red-300 border-red-500/30",
  Inactive: "bg-white/10 text-white/55 border-white/15",
};

export function statusPillClasses(status: Status) {
  return `inline-flex items-center px-3 py-1 rounded-full border text-[11px] font-heading font-700 ${statusPill[status]}`;
}

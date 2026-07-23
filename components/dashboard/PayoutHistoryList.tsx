import { statusPill, type Status } from "@/lib/status-pill";

type Row = {
  invoice: string;
  name: string;
  date: string;
  amountLabel: string;
  amount: string;
  status: Extract<Status, "Pending" | "Completed" | "Failed">;
};

const rows: Row[] = [
  {
    invoice: "INV-10234",
    name: "Ibrahim Lawal",
    date: "Apr 08 2025",
    amountLabel: "Job value",
    amount: "₦12,500",
    status: "Pending",
  },
  {
    invoice: "INV-10234",
    name: "Miracle Olu",
    date: "Apr 08 2025",
    amountLabel: "Job value",
    amount: "₦12,500",
    status: "Completed",
  },
  {
    invoice: "INV-10234",
    name: "Victor Okafor",
    date: "Apr 08 2025",
    amountLabel: "Amount",
    amount: "₦12,500",
    status: "Completed",
  },
  {
    invoice: "INV-10221",
    name: "Tola Adebayo",
    date: "Apr 02 2025",
    amountLabel: "Job value",
    amount: "₦18,500",
    status: "Completed",
  },
  {
    invoice: "INV-10199",
    name: "Samuel Eze",
    date: "Mar 24 2025",
    amountLabel: "Job value",
    amount: "₦9,000",
    status: "Failed",
  },
];

export default function PayoutHistoryList() {
  return (
    <ul className="flex flex-col gap-3">
      {rows.map((r, i) => (
        <li
          key={i}
          className="relative rounded-2xl bg-brand-darker/60 border border-brand-border p-5"
        >
          <p className="font-body text-white/45 text-[11px] mb-1.5">
            {r.invoice}
          </p>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-heading font-700 text-white text-base">
                {r.name}
              </p>
              <p className="font-body text-white/45 text-xs mt-0.5">{r.date}</p>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full border text-[11px] font-heading font-700 ${statusPill[r.status]}`}
            >
              {r.status}
            </span>
          </div>

          <div className="flex items-center justify-between mt-5">
            <p className="font-body text-white/45 text-xs">{r.amountLabel}</p>
            <p className="font-heading font-700 text-white text-sm">
              {r.amount}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

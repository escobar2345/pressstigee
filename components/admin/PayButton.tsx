"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function PayButton({ payoutId }: { payoutId: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "paid">("idle");

  const handlePay = async () => {
    if (status !== "idle") return;

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 300));
    setStatus("paid");
  };

  return (
    <button
      type="button"
      onClick={handlePay}
      disabled={status !== "idle"}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-brand-teal/40 bg-brand-teal/10 text-brand-teal font-heading font-700 text-[11px] hover:bg-brand-teal/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <CheckCircle2 size={14} />
      {status === "paid" ? "Paid" : status === "loading" ? "Processing..." : "Pay"}
    </button>
  );
}

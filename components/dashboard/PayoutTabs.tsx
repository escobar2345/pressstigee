"use client";

import { useState } from "react";
import PayoutHistoryList from "./PayoutHistoryList";
import PayoutMethodForm from "./PayoutMethodForm";

const tabs = ["Payout History", "Payout Method"] as const;
type Tab = (typeof tabs)[number];

export default function PayoutTabs() {
  const [active, setActive] = useState<Tab>("Payout History");

  return (
    <div>
      {/* Tab toggle */}
      <div
        role="tablist"
        aria-label="Payout views"
        className="inline-flex w-full p-1.5 rounded-full bg-brand-darker/60 border border-brand-border mb-5"
      >
        {tabs.map((t) => {
          const isActive = active === t;
          return (
            <button
              key={t}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t)}
              className={`flex-1 px-6 py-2.5 rounded-full text-sm font-heading font-700 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60 ${
                isActive
                  ? "bg-white text-brand-darker"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {active === "Payout History" ? (
        <PayoutHistoryList />
      ) : (
        <PayoutMethodForm />
      )}
    </div>
  );
}

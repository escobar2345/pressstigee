"use client";

import { useState } from "react";

const items = [
  { key: "email", label: "Email Notification", default: true },
  { key: "sms", label: "SMS Notification", default: false },
  { key: "inapp", label: "In-App Notification", default: true },
];

export default function NotificationPreferences() {
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(items.map((i) => [i.key, i.default]))
  );

  return (
    <div className="glass-card rounded-2xl p-6 h-full">
      <h2 className="font-heading font-700 text-white text-lg mb-6">
        Notification Preferences
      </h2>

      <div className="space-y-5">
        {items.map((item) => {
          const on = state[item.key];
          return (
            <div
              key={item.key}
              className="flex items-center justify-between gap-4"
            >
              <span className="font-body text-white/70 text-sm">
                {item.label}
              </span>
              <button
                role="switch"
                aria-checked={on}
                aria-label={item.label}
                onClick={() =>
                  setState((s) => ({ ...s, [item.key]: !s[item.key] }))
                }
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60 ${
                  on ? "bg-brand-teal" : "bg-white/15"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    on ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const audiences = ["All Partners", "Active Partners", "Inactive Partners"];

export default function SendNotificationForm() {
  const [values, setValues] = useState({
    title: "",
    message: "",
    audience: "All Partners",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  const input =
    "w-full bg-brand-darker/60 border border-brand-border rounded-lg px-4 py-3 text-white font-body text-sm placeholder-white/35 focus:outline-none focus:border-brand-teal/50 transition";

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card rounded-2xl p-6"
    >
      <h2 className="font-heading font-700 text-white text-lg mb-6">
        Send Notifications
      </h2>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="block font-heading font-600 text-white/70 text-xs mb-2"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            required
            className={input}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block font-heading font-600 text-white/70 text-xs mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            value={values.message}
            onChange={(e) =>
              setValues({ ...values, message: e.target.value })
            }
            required
            className={`${input} resize-none`}
          />
        </div>

        <div>
          <label
            htmlFor="audience"
            className="block font-heading font-600 text-white/70 text-xs mb-2"
          >
            Audience
          </label>
          <div className="relative">
            <select
              id="audience"
              value={values.audience}
              onChange={(e) =>
                setValues({ ...values, audience: e.target.value })
              }
              className={`${input} appearance-none pr-10`}
            >
              {audiences.map((a) => (
                <option key={a} value={a} className="bg-brand-darker">
                  {a}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-7 py-3 rounded-lg bg-brand-teal text-brand-darker font-heading font-700 text-sm hover:bg-brand-tealLight active:scale-[0.99] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tealLight"
      >
        Send Notification
      </button>

      {sent && (
        <p
          role="status"
          className="mt-3 text-center font-body text-brand-teal text-xs"
        >
          Notification sent
        </p>
      )}
    </form>
  );
}

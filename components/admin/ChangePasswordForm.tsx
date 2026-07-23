"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [values, setValues] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [updated, setUpdated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (values.next !== values.confirm) {
      setError("New password and confirmation don't match.");
      setUpdated(false);
      return;
    }
    setError(null);
    setUpdated(true);
    setTimeout(() => setUpdated(false), 2500);
  };

  const input =
    "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-brand-ink font-body text-sm placeholder-gray-400 focus:outline-none focus:border-brand-ink focus:ring-2 focus:ring-brand-ink/10 transition";

  const labelClass = "block font-heading font-600 text-brand-ink text-xs mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_rgb(0,0,0,0.04)]"
    >
      <h2 className="font-heading font-700 text-brand-ink text-base mb-6">
        Change Password
      </h2>

      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="current" className={labelClass}>
            Current Password
          </label>
          <input
            id="current"
            type="password"
            autoComplete="current-password"
            value={values.current}
            onChange={(e) =>
              setValues({ ...values, current: e.target.value })
            }
            required
            className={input}
          />
        </div>
        <div>
          <label htmlFor="next" className={labelClass}>
            New Password
          </label>
          <input
            id="next"
            type="password"
            autoComplete="new-password"
            minLength={6}
            value={values.next}
            onChange={(e) => setValues({ ...values, next: e.target.value })}
            required
            className={input}
          />
        </div>
        <div>
          <label htmlFor="confirm" className={labelClass}>
            Confirm Password
          </label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            minLength={6}
            value={values.confirm}
            onChange={(e) =>
              setValues({ ...values, confirm: e.target.value })
            }
            required
            className={input}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-brand-teal text-brand-darker font-heading font-700 text-sm hover:bg-brand-tealLight active:scale-[0.99] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tealLight"
      >
        Update Password
      </button>

      {error && (
        <p role="alert" className="mt-3 text-center font-body text-red-500 text-xs">
          {error}
        </p>
      )}
      {updated && (
        <p role="status" className="mt-3 text-center font-body text-brand-teal text-xs">
          Password updated
        </p>
      )}
    </form>
  );
}

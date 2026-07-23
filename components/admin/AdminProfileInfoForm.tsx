"use client";

import { useState } from "react";
import { User } from "lucide-react";

export default function AdminProfileInfoForm() {
  const [values, setValues] = useState({
    fullName: "Prestiige",
    email: "admin@prestiige.ng",
    role: "Admin",
  });

  const input =
    "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-brand-ink font-body text-sm placeholder-gray-400 focus:outline-none focus:border-brand-ink focus:ring-2 focus:ring-brand-ink/10 transition";

  const labelClass = "block font-heading font-600 text-brand-ink text-xs mb-1.5";

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_rgb(0,0,0,0.04)]">
      <h2 className="font-heading font-700 text-brand-ink text-base mb-6">
        Profile Information
      </h2>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
          <User size={40} strokeWidth={1.5} />
        </div>
        <button
          type="button"
          className="mt-4 px-4 py-1.5 rounded-md border border-brand-teal/40 bg-brand-teal/10 text-brand-teal font-heading font-700 text-xs hover:bg-brand-teal/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
        >
          Change Photo
        </button>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={values.fullName}
            onChange={(e) =>
              setValues({ ...values, fullName: e.target.value })
            }
            className={input}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className={input}
          />
        </div>
        <div>
          <label htmlFor="role" className={labelClass}>
            Role
          </label>
          <input
            id="role"
            type="text"
            value={values.role}
            onChange={(e) => setValues({ ...values, role: e.target.value })}
            className={input}
          />
        </div>
      </form>
    </div>
  );
}

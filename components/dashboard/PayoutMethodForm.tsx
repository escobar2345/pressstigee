"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PayoutMethodForm() {
  const [form, setForm] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSavedDetails = async () => {
      if (!supabase) return;

      const { data, error: userError } = await supabase.auth.getUser();
      if (userError) {
        setError(userError.message);
        return;
      }

      const metadata = data.user?.user_metadata || {};
      setForm({
        bankName: typeof metadata.bank_name === "string" ? metadata.bank_name : "",
        accountName: typeof metadata.account_name === "string" ? metadata.account_name : "",
        accountNumber: typeof metadata.account_number === "string" ? metadata.account_number : "",
      });
    };

    loadSavedDetails();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError("Supabase is not configured.");
      return;
    }

    setError(null);
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        bank_name: form.bankName,
        account_name: form.accountName,
        account_number: form.accountNumber,
      },
    });

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  const inputClass =
    "w-full bg-brand-darker/60 border border-brand-border rounded-full px-6 py-4 text-white font-body text-sm placeholder-white/35 focus:outline-none focus:border-brand-teal/50 focus:bg-brand-darker/80 transition-all duration-200";

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-3xl border border-brand-teal/20 bg-gradient-to-br from-brand-teal/10 via-brand-dark/40 to-brand-darker/60 p-6 sm:p-8"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="bankName" className="sr-only">
            Bank name
          </label>
          <input
            id="bankName"
            name="bankName"
            type="text"
            value={form.bankName}
            onChange={(e) => setForm({ ...form, bankName: e.target.value })}
            placeholder="Bank name"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="accountName" className="sr-only">
            Account name
          </label>
          <input
            id="accountName"
            name="accountName"
            type="text"
            value={form.accountName}
            onChange={(e) => setForm({ ...form, accountName: e.target.value })}
            placeholder="Account name"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="accountNumber" className="sr-only">
            Account number
          </label>
          <input
            id="accountNumber"
            name="accountNumber"
            type="text"
            inputMode="numeric"
            value={form.accountNumber}
            onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
            placeholder="Account number"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col items-center mt-8">
        <button
          type="submit"
          className="px-10 py-3 rounded-full bg-brand-teal text-brand-darker font-heading font-700 text-sm hover:bg-brand-tealLight active:scale-95 transition-all teal-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tealLight"
        >
          Save
        </button>
        {saved && (
          <span role="status" className="mt-3 font-body text-brand-teal text-xs">
            Bank details saved
          </span>
        )}
        {error && (
          <span role="alert" className="mt-3 font-body text-red-300 text-xs">
            {error}
          </span>
        )}
      </div>
    </form>
  );
}

"use client";

import { useEffect, useState } from "react";
import { User, Tag, ArrowRight } from "lucide-react";

type Values = { firstName: string; lastName: string; referralId: string };

export default function StepInformation({
  initialReferralId = "",
  onNext,
}: {
  initialReferralId?: string;
  onNext: (v: Values) => void;
}) {
  const [values, setValues] = useState<Values>({
    firstName: "",
    lastName: "",
    referralId: initialReferralId,
  });

  useEffect(() => {
    if (initialReferralId) {
      setValues((current) => ({
        ...current,
        referralId: initialReferralId,
      }));
    }
  }, [initialReferralId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(values);
  };

  const inputWrap =
    "relative flex items-center bg-white border border-gray-200 rounded-xl focus-within:border-brand-ink focus-within:ring-2 focus-within:ring-brand-ink/10 transition";
  const input =
    "w-full bg-transparent rounded-xl py-3.5 pl-11 pr-4 text-brand-ink font-body text-sm placeholder-gray-400 focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="firstName"
            className="block font-heading font-600 text-brand-ink text-sm mb-2"
          >
            First name
          </label>
          <div className={inputWrap}>
            <User
              size={16}
              className="absolute left-4 text-gray-400 pointer-events-none"
            />
            <input
              id="firstName"
              type="text"
              required
              value={values.firstName}
              onChange={(e) =>
                setValues({ ...values, firstName: e.target.value })
              }
              className={input}
              placeholder=""
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block font-heading font-600 text-brand-ink text-sm mb-2"
          >
            Last name
          </label>
          <div className={inputWrap}>
            <User
              size={16}
              className="absolute left-4 text-gray-400 pointer-events-none"
            />
            <input
              id="lastName"
              type="text"
              required
              value={values.lastName}
              onChange={(e) =>
                setValues({ ...values, lastName: e.target.value })
              }
              className={input}
              placeholder=""
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="referralId"
          className="block font-heading font-600 text-brand-ink text-sm mb-2"
        >
          Referral ID
        </label>
        <div className={inputWrap}>
          <Tag
            size={16}
            className="absolute left-4 text-gray-400 pointer-events-none"
          />
          <input
            id="referralId"
            type="text"
            value={values.referralId}
            onChange={(e) =>
              setValues({ ...values, referralId: e.target.value })
            }
            className={input}
            placeholder=""
          />
        </div>
      </div>

      <button
        type="submit"
        className="group w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-ink text-white font-heading font-700 text-sm hover:bg-brand-dark active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/40"
      >
        Continue
        <ArrowRight
          size={16}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      </button>
    </form>
  );
}

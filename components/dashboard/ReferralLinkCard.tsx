"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { FALLBACK_REFERRAL_NAME, getReferralLink, getReferralNameFromMetadata } from "@/lib/referrals";
import { supabase } from "@/lib/supabase";

export default function ReferralLinkCard() {
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("https://prestiige.ng");
  const [referralName, setReferralName] = useState(FALLBACK_REFERRAL_NAME);
  const referralLink = useMemo(
    () => getReferralLink(origin, referralName),
    [origin, referralName]
  );

  useEffect(() => {
    setOrigin(window.location.origin);

    const storedName = window.localStorage.getItem("prestiigeReferralName");
    if (storedName) {
      setReferralName(storedName);
    }

    const loadUserReferralName = async () => {
      if (!supabase) return;

      const { data } = await supabase.auth.getUser();
      const metadataName = getReferralNameFromMetadata(data.user?.user_metadata);

      if (metadataName) {
        setReferralName(metadataName);
        window.localStorage.setItem("prestiigeReferralName", metadataName);
      }
    };

    loadUserReferralName();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
      <h2 className="font-heading font-700 text-white text-lg mb-6">
        Your Referral Link
      </h2>

      <div className="bg-brand-darker/50 border border-brand-border rounded-full px-5 py-3.5 mb-5">
        <p className="font-body text-white/55 text-sm truncate" title={referralLink}>
          {referralLink}
        </p>
      </div>

      <button
        onClick={handleCopy}
        className="self-center inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-brand-darker font-heading font-700 text-sm hover:scale-105 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

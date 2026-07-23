"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { type Database } from "@/lib/database";
import { FALLBACK_REFERRAL_NAME, getReferralLink, getReferralNameFromMetadata } from "@/lib/referrals";
import { supabase } from "@/lib/supabase";

export default function ReferralLinkBar() {
  const [copied, setCopied] = useState(false);
  const [referralName, setReferralName] = useState(FALLBACK_REFERRAL_NAME);
  const [origin, setOrigin] = useState("https://prestiige.ng");
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
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex items-center gap-2 bg-brand-darker/70 border border-brand-border rounded-full pl-5 pr-2 py-2">
      <p className="flex-1 min-w-0 font-body text-white/65 text-sm truncate">
        {referralLink}
      </p>
      <button
        onClick={handleCopy}
        aria-label="Copy referral link"
        className="flex-shrink-0 w-9 h-9 rounded-full bg-white text-brand-darker flex items-center justify-center hover:scale-105 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
      >
        {copied ? <Check size={15} /> : <Copy size={14} />}
      </button>
    </div>
  );
}

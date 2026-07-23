"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Camera, Pencil } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getReferralNameFromMetadata } from "@/lib/referrals";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-body text-white/45 text-xs mb-1.5">{label}</p>
      <p className="font-heading font-700 text-white text-sm break-words">
        {value}
      </p>
    </div>
  );
}

function EditButton() {
  return (
    <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-darker/60 border border-brand-border text-white/70 font-heading font-600 text-xs hover:text-white hover:border-brand-teal/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60">
      Edit
      <Pencil size={12} />
    </button>
  );
}

export default function ProfileCard() {
  const [profile, setProfile] = useState({
    firstName: "Partner",
    lastName: "",
    email: "",
    country: "Nigeria",
    city: "",
    phone: "",
    fullName: "Partner",
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!supabase) return;

      const { data } = await supabase.auth.getUser();
      const metadata = data.user?.user_metadata;

      const fullName = getReferralNameFromMetadata(metadata) || "Partner";
      const firstName = typeof metadata?.first_name === "string" ? metadata.first_name : "Partner";
      const lastName = typeof metadata?.last_name === "string" ? metadata.last_name : "";
      const email = data.user?.email ?? "";
      const country = typeof metadata?.country === "string" ? metadata.country : "Nigeria";
      const city = typeof metadata?.city === "string" ? metadata.city : "";
      const phone = typeof metadata?.phone === "string" ? metadata.phone : "";

      setProfile({ firstName, lastName, email, country, city, phone, fullName });
    };

    loadProfile();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {/* My Profile */}
      <div className="glass-card rounded-3xl p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 mb-6">
          <p className="font-heading font-700 text-white text-base">My Profile</p>
          <EditButton />
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-brand-border">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
                alt={profile.fullName}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
            <button
              aria-label="Change photo"
              className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-brand-teal text-brand-darker flex items-center justify-center border-2 border-brand-darker hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tealLight"
            >
              <Camera size={14} />
            </button>
          </div>

          <p className="mt-4 font-heading font-700 text-white text-lg">
            {profile.fullName}
          </p>
          <p className="font-body text-white/55 text-sm mt-0.5">
            {profile.city || "Port Harcourt, Nigeria"}
          </p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="glass-card rounded-3xl p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 mb-6">
          <p className="font-heading font-700 text-white text-base">Personal information</p>
          <EditButton />
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <Field label="First Name" value={profile.firstName} />
          <Field label="Last Name" value={profile.lastName} />
          <Field label="Email" value={profile.email} />
          <Field label="Country" value={profile.country} />
          <Field label="City/State" value={profile.city || "Port Harcourt/Rivers State"} />
          <Field label="Phone Number" value={profile.phone || "N/A"} />
        </div>
      </div>
    </div>
  );
}

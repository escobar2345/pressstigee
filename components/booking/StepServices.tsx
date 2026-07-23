"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Check } from "lucide-react";
import { toReferralCode } from "@/lib/referrals";
import { supabase } from "@/lib/supabase";

const u = (id: string, w = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

type Service = {
  key: string;
  title: string;
  desc: string;
  price: string;
  amount: number;
  image: string;
  alt: string;
};

type BookingInfo = {
  firstName: string;
  lastName: string;
  referralId: string;
};

const services: Service[] = [
  {
    key: "home",
    title: "Home Cleaning",
    desc: "Deep cleaning, routine and everything in between.",
    price: "NGN 120,000",
    amount: 120000,
    image: "1600585152220-90363fe7e115",
    alt: "Bright, freshly cleaned home interior",
  },
  {
    key: "office",
    title: "Office Cleaning",
    desc: "Clean healthy work-spaces that boost productivity.",
    price: "NGN 100,000",
    amount: 100000,
    image: "1497366216548-37526070297c",
    alt: "Tidy modern office workspace",
  },
  {
    key: "laundry",
    title: "Laundry Service",
    desc: "Washing, ironing and delivering fresh next every time.",
    price: "NGN 60,000",
    amount: 60000,
    image: "1610557892470-55d9e80c0bce",
    alt: "Row of clean washing machines",
  },
  {
    key: "post-construction",
    title: "Post Construction",
    desc: "We remove the mess after construction and make it move-in ready.",
    price: "NGN 120,000",
    amount: 120000,
    image: "1582735689369-4fe89db7114c",
    alt: "Worker cleaning after construction",
  },
  {
    key: "car-detailing",
    title: "Car Detailing",
    desc: "Interior and exterior cleaning to keep your car looking brand new.",
    price: "NGN 120,000",
    amount: 120000,
    image: "1607860108855-64acf2078ed9",
    alt: "Detailed car interior being cleaned",
  },
];

export default function StepServices({
  bookingInfo,
  onBack,
}: {
  bookingInfo: BookingInfo;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set(["home"]));
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const selectedServices = services.filter((service) =>
    selected.has(service.key)
  );
  const canBook = selectedServices.length > 0;

  const handleBook = async () => {
    if (!canBook || isBooking) return;

    setError("");
    setMessage("");

    if (!supabase) {
      setError(
        "Supabase is not configured. Add your Supabase URL and anon key to .env.local."
      );
      return;
    }

    const referralId = toReferralCode(bookingInfo.referralId);
    const customerName = `${bookingInfo.firstName} ${bookingInfo.lastName}`.trim();
    const jobValue = selectedServices.reduce(
      (total, service) => total + service.amount,
      0
    );

    setIsBooking(true);

    const { error } = await supabase.from("referral_bookings").insert({
      referral_id: referralId,
      customer_first_name: bookingInfo.firstName,
      customer_last_name: bookingInfo.lastName,
      customer_name: customerName,
      services: selectedServices.map((service) => service.title),
      service_label: selectedServices.map((service) => service.title).join(", "),
      job_value: jobValue,
      commission: jobValue * 0.1,
      status: "Pending",
    });

    setIsBooking(false);

    if (error) {
      setError(error.message);
      return;
    }

    // Redirect to WhatsApp after successful booking
    const whatsappNumber = "2348130908274";

    const serviceList = selectedServices.map((s) => s.title).join(", ");
    const defaultWhatsappMessage = `Hi there! I want to book and pay for: ${serviceList}. Please assist.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      defaultWhatsappMessage
    )}`;
    window.location.href = whatsappUrl;


    setMessage("Booking saved. Redirecting to WhatsApp...");
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => {
          const isOn = selected.has(s.key);
          return (
              <button
              key={s.key}
              type="button"
              role="checkbox"
              aria-checked={isOn ? "true" : "false"}
              aria-label={s.title}
              onClick={() => toggle(s.key)}
              className={`group relative text-left bg-white rounded-2xl overflow-hidden border transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/30 ${
                isOn
                  ? "border-brand-ink shadow-[0_6px_24px_rgb(10,31,28,0.12)]"
                  : "border-gray-100 shadow-[0_4px_16px_rgb(0,0,0,0.04)]"
              }`}
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={u(s.image, 500)}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
                  className="object-cover"
                />
                <span
                  aria-hidden
                  className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    isOn
                      ? "bg-brand-teal text-white"
                      : "bg-white/90 text-transparent border border-white"
                  }`}
                >
                  <Check size={14} strokeWidth={3} />
                </span>
              </div>
              <div className="p-4">
                <p className="font-heading font-700 text-brand-ink text-base">
                  {s.title}
                </p>
                <p className="font-body text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">
                  {s.desc}
                </p>
                <p className="font-heading font-700 text-brand-ink text-sm mt-3">
                  {s.price}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-brand-ink font-heading font-600 text-sm hover:bg-gray-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/30"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <button
          type="button"
          disabled={!canBook || isBooking}
          onClick={handleBook}
          className="flex-1 sm:flex-none px-10 py-3 rounded-xl bg-brand-ink text-white font-heading font-700 text-sm hover:bg-brand-dark active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink/40"
        >
          {isBooking ? "Booking..." : "Book now"}
        </button>
      </div>

      {message && (
        <p
          role="status"
          className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 font-body text-sm text-emerald-700"
        >
          {message}
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 px-4 py-3 font-body text-sm text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}

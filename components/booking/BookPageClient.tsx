"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BookingStepper from "@/components/booking/BookingStepper";
import StepInformation from "@/components/booking/StepInformation";
import StepServices from "@/components/booking/StepServices";

type BookingInfo = {
  firstName: string;
  lastName: string;
  referralId: string;
};

export default function BookPageClient({
  referralId,
}: {
  referralId: string;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
    firstName: "",
    lastName: "",
    referralId,
  });

  return (
    <div className="min-h-screen bg-white text-brand-ink">
      <div className="grid lg:grid-cols-[1.2fr_1fr] min-h-screen">
        <div className="flex flex-col px-6 sm:px-12 lg:px-16 py-10 sm:py-14">
          <Link href="/" className="inline-block">
            <p className="font-heading font-800 text-brand-ink text-2xl tracking-tight">
              Prestiige
            </p>
            <p className="font-body text-gray-500 text-xs -mt-0.5">
              Cleaning services
            </p>
          </Link>

          <div className="mt-12 sm:mt-16">
            <BookingStepper current={step} />
          </div>

          <div className="mt-10">
            <h1 className="font-heading font-800 text-3xl sm:text-4xl text-brand-ink">
              Let&apos;s get to know you
            </h1>
            <p className="font-body text-gray-500 text-sm mt-2">
              Please enter your details to continue
            </p>
          </div>

          <div className={`mt-8 ${step === 1 ? "max-w-xl" : "max-w-3xl"}`}>
            {step === 1 ? (
              <StepInformation
                initialReferralId={referralId}
                onNext={(values) => {
                  setBookingInfo(values);
                  setStep(2);
                }}
              />
            ) : (
              <StepServices
                bookingInfo={bookingInfo}
                onBack={() => setStep(1)}
              />
            )}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <Image
            src={
              step === 1
                ? "/images/bookaservice1.jpeg"
                : "/images/bookaservice2.jpeg"
            }
            alt="A Prestiige Cleaning Services professional"
            fill
            priority
            sizes="(max-width: 1024px) 0vw, 45vw"
            className="object-cover"
          />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

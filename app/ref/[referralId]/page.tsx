import { redirect } from "next/navigation";

export default function ReferralRedirectPage({
  params,
}: {
  params: { referralId: string };
}) {
  redirect(`/book?ref=${encodeURIComponent(params.referralId)}`);
}

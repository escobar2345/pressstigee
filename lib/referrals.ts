export const FALLBACK_REFERRAL_NAME = "prestiige-user";

export function toReferralCode(name: string) {
  const code = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return code || FALLBACK_REFERRAL_NAME;
}

export function getReferralNameFromMetadata(
  metadata: Record<string, unknown> | null | undefined
) {
  const fullName = metadata?.full_name;
  const referralName = metadata?.referral_name;
  const firstName = metadata?.first_name;
  const lastName = metadata?.last_name;

  if (typeof fullName === "string" && fullName.trim()) return fullName;
  if (typeof referralName === "string" && referralName.trim()) {
    return referralName;
  }

  return [firstName, lastName]
    .filter((value): value is string => typeof value === "string" && !!value)
    .join(" ");
}

export function getReferralLink(origin: string, referralName: string) {
  return `${origin}/ref/${toReferralCode(referralName)}`;
}

import BookPageClient from "@/components/booking/BookPageClient";

export default function BookPage({
  searchParams,
}: {
  searchParams?: { ref?: string };
}) {
  return <BookPageClient referralId={searchParams?.ref ?? ""} />;
}

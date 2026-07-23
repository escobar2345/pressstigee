import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-darker p-6">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-heading font-800 text-white mb-4">Page not found</h1>
        <p className="text-white/70 mb-6">The page you requested doesn&#39;t exist or has been moved.</p>
        <Link href="/" className="inline-block rounded-lg px-5 py-3 bg-brand-teal text-brand-darker font-heading font-700">
          Back to home
        </Link>
      </div>
    </div>
  );
}

import Image from "next/image";
import { Bell } from "lucide-react";

export default function TopBar({
  name,
  avatar = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
}: {
  name: string;
  avatar?: string;
}) {
  return (
    <header className="flex items-center justify-between gap-4 mb-6">
      <div>
        <p className="font-heading font-700 text-white text-base sm:text-lg leading-tight">
          Welcome back
        </p>
        <p className="font-body text-white/50 text-sm leading-tight mt-0.5">
          {name}
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          aria-label="Account"
          className="relative w-10 h-10 rounded-full overflow-hidden border border-brand-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
        >
          <Image
            src={avatar}
            alt=""
            fill
            sizes="40px"
            className="object-cover"
          />
        </button>
        <button
          aria-label="Notifications"
          className="relative w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/70 hover:text-brand-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
        >
          <Bell size={16} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>
      </div>
    </header>
  );
}

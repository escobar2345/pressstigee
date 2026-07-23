const steps = ["Your Information", "Select Services"];

export default function BookingStepper({ current }: { current: 1 | 2 }) {
  return (
    <ol className="flex items-center gap-4" aria-label="Booking progress">
      {steps.map((label, i) => {
        const n = i + 1;
        const isActive = n === current;
        return (
          <li key={label} className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <span
                aria-current={isActive ? "step" : undefined}
                className={`w-7 h-7 rounded-full flex items-center justify-center font-heading font-700 text-xs ${
                  isActive
                    ? "bg-brand-ink text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {n}
              </span>
              <span
                className={`font-heading font-600 text-sm ${
                  isActive ? "text-brand-ink" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span className="hidden sm:block w-12 h-px bg-gray-300" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

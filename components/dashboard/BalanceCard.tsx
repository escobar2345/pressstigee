export default function BalanceCard({
  label,
  amount,
}: {
  label: string;
  amount: string;
}) {
  return (
    <div className="mb-5">
      <p className="font-body text-white/50 text-sm mb-1">{label}</p>
      <p className="font-heading font-800 text-4xl sm:text-5xl text-white tracking-tight">
        {amount}
      </p>
    </div>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
};

export default function MetricCard({ label, value, detail }: MetricCardProps) {
  return (
    <div className="card-surface p-5">
      <p className="text-sm text-slate-300">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{detail}</p>
    </div>
  );
}

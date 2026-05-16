const cfg = {
  compliant: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  pending:   "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  flagged:   "bg-red-500/10 text-red-400 border border-red-500/20",
};
const label = { compliant: "Patuh", pending: "Kurang Patuh", flagged: "Tidak Patuh" };

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium ${cfg[status]}`}>
      {label[status]}
    </span>
  );
}

const map = {
  neutral:   "bg-white/[0.07] text-white/45 border border-white/[0.09]",
  critical:  "bg-red-500/10 text-red-400 border border-red-500/20",
  high:      "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  medium:    "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  low:       "bg-white/[0.06] text-white/35 border border-white/[0.08]",
  admin:     "bg-violet-500/10 text-violet-400 border border-violet-500/20",
  user:      "bg-white/[0.07] text-white/45 border border-white/[0.09]",
  active:    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  inactive:  "bg-white/[0.05] text-white/30 border border-white/[0.07]",
  suspended: "bg-red-500/10 text-red-400 border border-red-500/20",
};

export default function Badge({ children, variant = "neutral" }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium ${map[variant] ?? map.neutral}`}>
      {children}
    </span>
  );
}

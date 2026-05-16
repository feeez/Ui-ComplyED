import { motion } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1];

export default function StatCard({ label, value, delta, iconBg, icon, index }) {
  const isUp = delta?.startsWith("+");
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: EASE_OUT }}
      className="bg-[#191820] rounded-xl p-6 border border-white/[0.08]"
    >
      <div className="flex items-start justify-between mb-5">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-white/35">{label}</p>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>{icon}</div>
      </div>
      <p className="text-[38px] font-bold text-white/85 tracking-tight leading-none mb-2">{value}</p>
      {delta && (
        <p className={`text-[12px] font-semibold ${isUp ? "text-emerald-400" : "text-red-400"}`}>
          {delta} this week
        </p>
      )}
    </motion.div>
  );
}

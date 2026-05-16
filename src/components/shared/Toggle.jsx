import { motion } from "framer-motion";

export default function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-9 h-5 rounded-full transition-colors duration-200 cursor-pointer flex-shrink-0 ${enabled ? "bg-emerald-500/80" : "bg-white/[0.12]"}`}
    >
      <motion.div
        animate={{ x: enabled ? 16 : 2 }}
        transition={{ type: "spring", duration: 0.28, bounce: 0.2 }}
        className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow"
      />
    </button>
  );
}

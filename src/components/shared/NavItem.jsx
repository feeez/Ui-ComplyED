import Link from "next/link";
import { motion } from "framer-motion";

export default function NavItem({ icon, label, active, onClick, layoutId = "nav-pill", href }) {
  const cls = "relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left cursor-pointer group";

  const inner = (
    <>
      {active && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 bg-white/[0.09] rounded-lg border border-white/[0.12]"
          transition={{ type: "spring", duration: 0.38, bounce: 0.12 }}
        />
      )}
      <span className={`relative z-10 transition-colors duration-150 ${active ? "text-white/90" : "text-white/35 group-hover:text-white/65"}`}>
        {icon}
      </span>
      <span className={`relative z-10 text-[13px] font-medium transition-colors duration-150 ${active ? "text-white/90" : "text-white/35 group-hover:text-white/65"}`}>
        {label}
      </span>
    </>
  );

  if (href) {
    return <Link href={href} onClick={onClick} className={cls}>{inner}</Link>;
  }

  return <button onClick={onClick} className={cls}>{inner}</button>;
}

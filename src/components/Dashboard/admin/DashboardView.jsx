"use client";

import { motion } from "framer-motion";
import StatCard from "@/components/shared/StatCard";

const ACTIVITY = [
  { dot: "bg-red-400/70",     text: "Reza Fauzi's account was suspended",       time: "15m ago" },
  { dot: "bg-amber-400/70",   text: "Rule 'OJK-003' modified by Fajar Nugroho",  time: "1h ago" },
  { dot: "bg-indigo-400/70",  text: "New document uploaded by Aditya Pratama",   time: "2h ago" },
  { dot: "bg-emerald-400/70", text: "Maya Anggraini completed registration",      time: "4h ago" },
  { dot: "bg-white/30",       text: "Monthly compliance report generated",        time: "6h ago" },
];

const EASE_OUT = [0.23, 1, 0.32, 1];

const STATS = [
  {
    label: "Total User", value: "2", delta: null,
    iconBg: "bg-indigo-500/15 text-indigo-400",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M1.5 13.5c0-2.485 2.015-4.5 4.5-4.5S10.5 11.015 10.5 13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M11 7.5a2 2 0 0 0 0-4M14.5 13.5c0-1.933-1.567-3.5-3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Dokumen Masuk", value: "6", delta: "+2",
    iconBg: "bg-violet-500/15 text-violet-400",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 2.5h6.5L13 6v7.5H3V2.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M9.5 2.5V6H13" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M5.5 9h5M5.5 11.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Perlu Review", value: "4", delta: null,
    iconBg: "bg-amber-500/15 text-amber-400",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2.5v5l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
];

export default function DashboardView() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
        {STATS.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.25, ease: EASE_OUT }}
        className="bg-[#191820] rounded-xl border border-white/[0.08] overflow-hidden"
      >
        <div className="px-8 py-5 border-b border-white/[0.06]">
          <p className="text-[15px] font-semibold text-white/75">Recent Activity</p>
          <p className="text-[12px] text-white/30 mt-0.5">System events from the last 24 hours</p>
        </div>
        <div className="px-8 py-5 flex flex-col gap-5">
          {ACTIVITY.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.28 + i * 0.06, duration: 0.22, ease: EASE_OUT }}
              className="flex items-start gap-4"
            >
              <div className="flex flex-col items-center mt-2 flex-shrink-0">
                <div className={`w-2.5 h-2.5 rounded-full ${item.dot}`} />
                {i < ACTIVITY.length - 1 && (
                  <div className="w-px h-8 bg-white/[0.07] mt-2" />
                )}
              </div>
              <div className="flex-1 min-w-0 pb-1 flex items-start justify-between gap-6">
                <p className="text-[14px] text-white/65 leading-relaxed">{item.text}</p>
                <p className="text-[12px] text-white/25 flex-shrink-0 mt-0.5">{item.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

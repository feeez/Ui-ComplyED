"use client";

import { motion } from "framer-motion";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { Ic } from "@/components/shared/Icons";

const ALL_DOCS = [
  { id: 1, name: "RPS Pemrograman Web",          docType: "RPS",                size: "2.4 MB", status: "compliant", date: "8 May 2026" },
  { id: 2, name: "Buku Kurikulum 2026",           docType: "Buku Kurikulum",     size: "1.1 MB", status: "pending",   date: "7 May 2026" },
  { id: 3, name: "Laporan Penelitian Semester 2", docType: "Laporan Penelitian", size: "3.7 MB", status: "flagged",   date: "5 May 2026" },
  { id: 4, name: "Lembar Ujian Akhir Semester",   docType: "Lembar Ujian",       size: "1.8 MB", status: "compliant", date: "3 May 2026" },
  { id: 5, name: "RPS Basis Data",                docType: "RPS",                size: "0.9 MB", status: "compliant", date: "29 Apr 2026" },
];

const STATS = [
  {
    label: "Total Documents", value: "24", delta: "+3",
    iconBg: "bg-indigo-500/15 text-indigo-400",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3.5 2h5.8L12.5 5.2V14a.5.5 0 0 1-.5.5H3.5A.5.5 0 0 1 3 14V2.5a.5.5 0 0 1 .5-.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M9 2v3.5H12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Patuh", value: "17", delta: "+2",
    iconBg: "bg-emerald-500/15 text-emerald-400",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Kurang Patuh", value: "5", delta: "+1",
    iconBg: "bg-amber-500/15 text-amber-400",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M8 5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Tidak Patuh", value: "2", delta: "-1",
    iconBg: "bg-red-500/15 text-red-400",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3v5M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M1.5 13.5L8 2l6.5 11.5H1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function DashboardView() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {STATS.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.27 }}
        className="bg-[#191820] rounded-xl border border-white/[0.08] overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
          <p className="text-[13px] font-semibold text-white/70">Recent Documents</p>
          <button className="text-[11px] text-white/30 hover:text-white/60 transition-colors cursor-pointer font-medium">
            View all →
          </button>
        </div>
        <div className="divide-y divide-white/[0.05]">
          {ALL_DOCS.slice(0, 5).map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.28 + i * 0.05, duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] active:bg-white/[0.06] transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-white/[0.07] flex items-center justify-center text-white/40 flex-shrink-0">
                {Ic.doc}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-white/75 truncate">{doc.name}</p>
                <p className="text-[11px] text-white/35">{doc.docType} · {doc.size}</p>
              </div>
              <StatusBadge status={doc.status} />
              <p className="text-[11px] text-white/25 w-24 text-right flex-shrink-0">{doc.date}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

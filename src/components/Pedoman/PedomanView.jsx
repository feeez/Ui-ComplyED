"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE_OUT = [0.23, 1, 0.32, 1];

const TABS = [
  {
    id: "rps",
    label: "RPS",
    title: "Rencana Pembelajaran Semester",
    desc: "Pedoman format dan kelengkapan dokumen RPS sesuai standar Telkom University.",
    pdfUrl: null,
  },
  {
    id: "kurikulum",
    label: "Buku Kurikulum",
    title: "Buku Kurikulum",
    desc: "Pedoman struktur dan isi buku kurikulum program studi.",
    pdfUrl: null,
  },
  {
    id: "penelitian",
    label: "Laporan Penelitian",
    title: "Laporan Penelitian",
    desc: "Pedoman penulisan laporan penelitian dan format referensi ilmiah.",
    pdfUrl: null,
  },
  {
    id: "ujian",
    label: "Lembar Ujian",
    title: "Lembar Ujian",
    desc: "Pedoman format lembar ujian tengah dan akhir semester.",
    pdfUrl: null,
  },
];

function PdfViewerShell({ tab }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const totalPages = 5;

  return (
    <div className="flex flex-col rounded-xl border border-white/[0.09] overflow-hidden bg-[#13121f] flex-1">

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.07] bg-[#0f0e19] flex-shrink-0">
        {/* Left: page nav */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-6 h-6 flex items-center justify-center rounded text-white/30 hover:text-white/60 hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M6.5 2L3.5 5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex items-center gap-1.5 text-[11px] text-white/40">
            <span className="bg-white/[0.07] border border-white/[0.09] rounded px-2 py-0.5 font-mono font-medium text-white/60 min-w-[28px] text-center">
              {currentPage}
            </span>
            <span>/</span>
            <span>{totalPages}</span>
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-6 h-6 flex items-center justify-center rounded text-white/30 hover:text-white/60 hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M3.5 2L6.5 5l-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Center: filename */}
        <p className="text-[11px] text-white/30 font-medium truncate max-w-[200px] hidden sm:block">
          pedoman_{tab.id}.pdf
        </p>

        {/* Right: zoom + download */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 border border-white/[0.08] rounded-lg px-2 py-1">
            <button
              onClick={() => setZoom((z) => Math.max(50, z - 25))}
              className="text-white/30 hover:text-white/60 transition-colors cursor-pointer text-[12px] leading-none"
            >–</button>
            <span className="text-[10px] text-white/40 font-mono w-9 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(200, z + 25))}
              className="text-white/30 hover:text-white/60 transition-colors cursor-pointer text-[12px] leading-none"
            >+</button>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-semibold text-indigo-400 hover:bg-indigo-500/18 transition-colors cursor-pointer">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M5.5 1.5v6M3 5.5l2.5 2.5 2.5-2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.5 9.5h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Download
          </button>
        </div>
      </div>

      {/* Viewer area */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center p-6 md:p-10 bg-[#0d0c16]">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="w-full max-w-[620px]"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          >
            {/* Simulated PDF page */}
            <div className="bg-white rounded-lg shadow-2xl shadow-black/60 overflow-hidden aspect-[0.707]">

              {/* Page header */}
              <div className="bg-[#1a1a5e] px-8 py-5 text-center">
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/60 mb-1">
                  Telkom University
                </p>
                <p className="text-[13px] font-bold text-white">
                  PEDOMAN {tab.title.toUpperCase()}
                </p>
                <p className="text-[9px] text-white/50 mt-1">
                  Sistem Pengecekan Otomatis — ComplyED
                </p>
              </div>

              {/* Page body placeholder */}
              <div className="px-8 py-7 flex flex-col gap-4 bg-white">

                <div className="flex flex-col gap-1.5">
                  <div className="h-2.5 bg-gray-200 rounded w-full"/>
                  <div className="h-2.5 bg-gray-200 rounded w-5/6"/>
                  <div className="h-2.5 bg-gray-200 rounded w-4/5"/>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="h-2 bg-gray-150 rounded w-full"/>
                  <div className="h-2 bg-gray-150 rounded w-full"/>
                  <div className="h-2 bg-gray-150 rounded w-3/4"/>
                </div>

                {/* Section heading */}
                <div className="h-3 bg-[#1a1a5e]/20 rounded w-48 mt-1"/>

                <div className="border border-gray-200 rounded overflow-hidden">
                  {[1,2,3,4,5].map((r) => (
                    <div key={r} className={`flex gap-4 px-4 py-2 border-b border-gray-100 last:border-b-0 ${r % 2 === 0 ? "bg-gray-50" : ""}`}>
                      <div className="h-2 bg-gray-200 rounded flex-1"/>
                      <div className="h-2 bg-[#1a1a5e]/20 rounded w-16"/>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5 mt-2">
                  <div className="h-2 bg-gray-150 rounded w-full"/>
                  <div className="h-2 bg-gray-150 rounded w-11/12"/>
                  <div className="h-2 bg-gray-150 rounded w-4/5"/>
                  <div className="h-2 bg-gray-150 rounded w-full"/>
                  <div className="h-2 bg-gray-150 rounded w-3/5"/>
                </div>

                <div className="h-3 bg-[#1a1a5e]/20 rounded w-36 mt-1"/>

                <div className="flex flex-col gap-1.5">
                  {[90, 85, 75, 95, 80].map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#1a1a5e]/30 flex-shrink-0"/>
                      <div className={`h-2 bg-gray-200 rounded`} style={{ width: `${w}%` }}/>
                    </div>
                  ))}
                </div>
              </div>

              {/* Page footer */}
              <div className="px-8 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <p className="text-[8px] text-gray-400">ComplyED — Telkom University</p>
                <p className="text-[8px] text-gray-400">Halaman {currentPage} dari {totalPages}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function PedomanView() {
  const [activeTab, setActiveTab] = useState("rps");

  const tab = TABS.find((t) => t.id === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: EASE_OUT }}
      className="flex flex-col gap-4 h-full"
    >
      {/* Header info */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <p className="text-[15px] font-bold text-white/80">Pedoman Dokumen</p>
          <p className="text-[11px] text-white/30 mt-0.5">
            Lihat panduan kepatuhan dokumen per jenis
          </p>
        </div>
      </div>

      {/* Tab strip */}
      <div className="relative flex bg-white/[0.04] border border-white/[0.08] rounded-xl p-1 gap-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="relative flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer z-10"
          >
            {activeTab === t.id && (
              <motion.div
                layoutId="pedoman-tab-bg"
                className="absolute inset-0 bg-white/[0.09] rounded-lg border border-white/[0.10]"
                transition={{ type: "spring", duration: 0.38, bounce: 0.08 }}
              />
            )}
            <span
              className={`relative transition-colors duration-150 ${
                activeTab === t.id ? "text-white/82" : "text-white/32"
              }`}
            >
              {t.label}
            </span>
          </button>
        ))}
      </div>

      {/* Tab description */}
      <AnimatePresence mode="wait">
        <motion.p
          key={activeTab}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: EASE_OUT }}
          className="text-[12px] text-white/35 -mt-1"
        >
          {tab.desc}
        </motion.p>
      </AnimatePresence>

      {/* PDF Viewer */}
      <div className="flex-1 min-h-[520px]">
        <PdfViewerShell tab={tab} />
      </div>
    </motion.div>
  );
}

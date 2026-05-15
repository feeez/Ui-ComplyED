"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatusBadge from "@/components/shared/StatusBadge";
import { Ic } from "@/components/shared/Icons";

const EASE_OUT = [0.23, 1, 0.32, 1];

const DOC_TYPES = [
  {
    id: "rps",
    label: "RPS",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2.5 2H9l2.5 2.5V12H2.5V2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M9 2v2.5h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M4.5 7h5M4.5 9h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "kurikulum",
    label: "Buku Kurikulum",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2.5 2.5h6a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-6V2.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M9.5 11.5H11a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H9.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4.5 5.5h3M4.5 7.5h3M4.5 9.5h2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "penelitian",
    label: "Laporan Penelitian",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="2" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4 9l1.5-2.5 1.5 1.5L9 5l1.5 2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "ujian",
    label: "Lembar Ujian",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3 2.5h8v9H3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M5.5 5.5h3M5.5 7.5h3M5.5 9.5h1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
        <path d="M4.5 5.5l.6.6L6.2 4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const ALL_DOCS = [
  { id: 1, name: "RPS Pemrograman Web",          size: "2.4 MB", status: "compliant", date: "8 May 2026" },
  { id: 2, name: "Buku Kurikulum 2026",           size: "1.1 MB", status: "pending",   date: "7 May 2026" },
  { id: 3, name: "Laporan Penelitian Semester 2", size: "3.7 MB", status: "flagged",   date: "5 May 2026" },
  { id: 4, name: "Lembar Ujian Akhir Semester",   size: "1.8 MB", status: "compliant", date: "3 May 2026" },
];

function DocTypeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = DOC_TYPES.find((d) => d.id === value);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
        animate={{
          borderColor: open ? "rgba(99,102,241,0.45)" : "rgba(255,255,255,0.09)",
          backgroundColor: open ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.05)",
        }}
        transition={{ duration: 0.18, ease: EASE_OUT }}
        className="w-full flex items-center gap-2.5 px-4 py-3 rounded-lg border text-left cursor-pointer"
      >
        {selected ? (
          <>
            <motion.span
              key={selected.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.16, ease: EASE_OUT }}
              className="text-indigo-400 flex-shrink-0"
            >
              {selected.icon}
            </motion.span>
            <motion.span
              key={selected.id + "-label"}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.16, ease: EASE_OUT }}
              className="text-[13px] text-white/75 flex-1"
            >
              {selected.label}
            </motion.span>
          </>
        ) : (
          <span className="text-[13px] text-white/20 flex-1">Pilih Kategori Pedoman...</span>
        )}

        <motion.span
          animate={{ rotate: open ? -180 : 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="text-white/30 flex-shrink-0"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -6, transition: { duration: 0.12, ease: EASE_OUT } }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            style={{ transformOrigin: "top center" }}
            className="absolute top-full mt-1.5 w-full z-50 bg-[#1c1b2a] border border-white/[0.12] rounded-xl overflow-hidden shadow-2xl shadow-black/40"
          >
            <div className="p-1">
              {DOC_TYPES.map((type, i) => (
                <motion.button
                  key={type.id}
                  type="button"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.16, ease: EASE_OUT }}
                  whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                  onClick={() => { onChange(type.id); setOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    value === type.id
                      ? "bg-indigo-500/12 text-indigo-300"
                      : "text-white/55 hover:bg-white/[0.05] hover:text-white/80"
                  }`}
                >
                  <span className={value === type.id ? "text-indigo-400" : "text-white/30"}>
                    {type.icon}
                  </span>
                  <span className="text-[13px] font-medium flex-1 text-left">{type.label}</span>

                  <motion.span
                    animate={{ opacity: value === type.id ? 1 : 0, scale: value === type.id ? 1 : 0.5 }}
                    transition={{ duration: 0.15, ease: EASE_OUT }}
                    className="text-indigo-400 flex-shrink-0"
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <motion.path
                        d="M2.5 6.5l2.8 2.8L10.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={false}
                        animate={{ pathLength: value === type.id ? 1 : 0 }}
                        transition={{ duration: 0.2, ease: EASE_OUT }}
                      />
                    </svg>
                  </motion.span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function UploadView() {
  const [isDragging, setIsDragging] = useState(false);
  const [docName, setDocName] = useState("");
  const [docType, setDocType] = useState("");
  const [file, setFile] = useState(null);

  const onDrag = useCallback((e) => {
    e.preventDefault();
    setIsDragging(e.type !== "dragleave" && e.type !== "drop");
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-5"
    >
      <div className="bg-[#191820] rounded-xl border border-white/[0.08] p-6">

        <div className="mb-7 text-center">
          <h2 className="text-[20px] font-bold text-white/85 tracking-tight mb-2">Unggah Dokumen Audit</h2>
          <p className="text-[13px] text-white/40 leading-relaxed max-w-lg mx-auto">
            Lengkapi detail dokumen dan unggah file Anda untuk dianalisis oleh sistem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold tracking-widest uppercase text-white/40">
              Nama Dokumen <span className="text-red-400/80">*</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: RPS Pemrograman Web"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              className="bg-white/[0.05] border border-white/[0.09] rounded-lg px-4 py-3 text-[13px] text-white/75 placeholder-white/20 outline-none focus:border-white/25 focus:bg-white/[0.08] transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold tracking-widest uppercase text-white/40">
              Jenis Dokumen <span className="text-red-400/80">*</span>
            </label>
            <DocTypeSelect value={docType} onChange={setDocType} />
          </div>
        </div>

        <motion.label
          htmlFor="doc-upload"
          onDragEnter={onDrag} onDragOver={onDrag} onDragLeave={onDrag} onDrop={onDrop}
          animate={{
            borderColor: isDragging ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.12)",
            backgroundColor: isDragging ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.02)",
          }}
          transition={{ duration: 0.15 }}
          className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed py-10 cursor-pointer mb-5"
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDragging ? "bg-indigo-500/20 text-indigo-400" : "bg-white/[0.07] text-white/35"}`}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 15V6M8 9l3-3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 17v1a.75.75 0 0 0 .75.75h14.5A.75.75 0 0 0 19 18v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          {file ? (
            <div className="text-center">
              <p className="text-[14px] font-semibold text-white/80">{file.name}</p>
              <p className="text-[11px] text-white/35 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB · Siap dianalisis</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-[14px] font-semibold text-white/70 mb-1">
                {isDragging ? "Lepaskan file di sini" : "Pilih file atau tarik ke area ini"}
              </p>
              <p className="text-[12px] text-white/35">PDF, DOC, DOCX, XLS, XLSX (Max 25MB)</p>
            </div>
          )}
          <input
            id="doc-upload"
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            onChange={(e) => { if (e.target.files[0]) setFile(e.target.files[0]); }}
          />
        </motion.label>

        <motion.button
          whileHover={{ backgroundColor: "rgba(255,255,255,0.17)", borderColor: "rgba(255,255,255,0.28)" }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className="w-full py-3.5 rounded-xl bg-white/[0.11] border border-white/[0.15] text-white/85 font-bold text-[14px] tracking-wide cursor-pointer"
        >
          Upload &amp; Analisis Sekarang
        </motion.button>
      </div>

      <div className="bg-[#191820] rounded-xl border border-white/[0.08] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <p className="text-[13px] font-semibold text-white/70">Riwayat Upload</p>
        </div>
        <div className="divide-y divide-white/[0.05]">
          {ALL_DOCS.slice(0, 4).map((doc) => (
            <div key={doc.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] active:bg-white/[0.06] transition-colors">
              <div className="w-8 h-8 rounded-lg bg-white/[0.07] flex items-center justify-center text-white/40 flex-shrink-0">
                {Ic.doc}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-white/75 truncate">{doc.name}</p>
                <p className="text-[11px] text-white/35">{doc.size}</p>
              </div>
              <StatusBadge status={doc.status} />
              <p className="text-[11px] text-white/25">{doc.date}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

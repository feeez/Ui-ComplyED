"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "@/components/shared/Badge";

const EASE_OUT = [0.23, 1, 0.32, 1];
const PAGE_SIZE = 5;

const TABS = [
  { id: "rps",        label: "RPS" },
  { id: "kurikulum",  label: "Kurikulum" },
  { id: "penelitian", label: "Penelitian" },
  { id: "ujian",      label: "Ujian" },
];

const DOC_TYPES = [
  {
    id: "rps", label: "RPS",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2.5 2H9l2.5 2.5V12H2.5V2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M9 2v2.5h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M4.5 7h5M4.5 9h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "kurikulum", label: "Buku Kurikulum",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2.5 2.5h6a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-6V2.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M9.5 11.5H11a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H9.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4.5 5.5h3M4.5 7.5h3M4.5 9.5h2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "penelitian", label: "Laporan Penelitian",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="2" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4 9l1.5-2.5 1.5 1.5L9 5l1.5 2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "ujian", label: "Lembar Ujian",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3 2.5h8v9H3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M5.5 5.5h3M5.5 7.5h3M5.5 9.5h1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
        <path d="M4.5 5.5l.6.6L6.2 4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const RULES_DATA = [
  { id: "RPS-001", name: "Format Margin Halaman RPS",          docType: "rps",        enabled: true,  updated: "Apr 2025" },
  { id: "RPS-002", name: "Komponen Capaian Pembelajaran",       docType: "rps",        enabled: true,  updated: "Mar 2025" },
  { id: "RPS-003", name: "Tabel Silabus Terstruktur",           docType: "rps",        enabled: true,  updated: "Feb 2025" },
  { id: "RPS-004", name: "Nomor Halaman Wajib Ada",             docType: "rps",        enabled: false, updated: "Jan 2025" },
  { id: "RPS-005", name: "Logo dan Identitas Institusi",        docType: "rps",        enabled: true,  updated: "Dec 2024" },
  { id: "RPS-006", name: "Tanda Tangan Dosen Pengampu",         docType: "rps",        enabled: true,  updated: "Nov 2024" },

  { id: "KUR-001", name: "Standar Kompetensi Lulusan",          docType: "kurikulum",  enabled: true,  updated: "Apr 2025" },
  { id: "KUR-002", name: "Struktur Mata Kuliah per Semester",   docType: "kurikulum",  enabled: true,  updated: "Mar 2025" },
  { id: "KUR-003", name: "Total SKS Minimum Program Studi",     docType: "kurikulum",  enabled: true,  updated: "Feb 2025" },
  { id: "KUR-004", name: "Deskripsi Lengkap Program Studi",     docType: "kurikulum",  enabled: false, updated: "Jan 2025" },
  { id: "KUR-005", name: "Visi dan Misi Program",               docType: "kurikulum",  enabled: true,  updated: "Dec 2024" },
  { id: "KUR-006", name: "Data Akreditasi BAN-PT",              docType: "kurikulum",  enabled: true,  updated: "Nov 2024" },

  { id: "PNL-001", name: "Abstrak Maksimal 250 Kata",           docType: "penelitian", enabled: true,  updated: "Apr 2025" },
  { id: "PNL-002", name: "Format Daftar Pustaka APA",           docType: "penelitian", enabled: true,  updated: "Mar 2025" },
  { id: "PNL-003", name: "Bab Pendahuluan Wajib Ada",           docType: "penelitian", enabled: true,  updated: "Feb 2025" },
  { id: "PNL-004", name: "Validasi Data Primer dan Sekunder",   docType: "penelitian", enabled: false, updated: "Jan 2025" },
  { id: "PNL-005", name: "Pernyataan Etika Penelitian",         docType: "penelitian", enabled: true,  updated: "Dec 2024" },
  { id: "PNL-006", name: "Nomor ISSN atau ISBN Terdaftar",      docType: "penelitian", enabled: false, updated: "Nov 2024" },

  { id: "UJN-001", name: "Kop Surat Institusi Resmi",           docType: "ujian",      enabled: true,  updated: "Apr 2025" },
  { id: "UJN-002", name: "Bobot Nilai Tiap Soal Tercantum",     docType: "ujian",      enabled: true,  updated: "Mar 2025" },
  { id: "UJN-003", name: "Durasi Waktu Pengerjaan Jelas",       docType: "ujian",      enabled: true,  updated: "Feb 2025" },
  { id: "UJN-004", name: "Petunjuk Pengisian Tersedia",         docType: "ujian",      enabled: false, updated: "Jan 2025" },
  { id: "UJN-005", name: "Tanda Tangan Dosen Penguji",          docType: "ujian",      enabled: true,  updated: "Dec 2024" },
  { id: "UJN-006", name: "Penomoran Soal Berurutan",            docType: "ujian",      enabled: true,  updated: "Nov 2024" },
];

const inputCls = "bg-white/[0.05] border border-white/[0.09] rounded-lg px-4 py-2.5 text-[13px] text-white/75 placeholder-white/20 outline-none focus:border-white/22 focus:bg-white/[0.08] transition-all w-full";
const selectCls = `${inputCls} appearance-none cursor-pointer`;
const labelCls = "text-[10px] font-semibold tracking-widest uppercase text-white/40";

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
        className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-left cursor-pointer"
      >
        {selected ? (
          <>
            <motion.span key={selected.id} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.16, ease: EASE_OUT }} className="text-indigo-400 flex-shrink-0">{selected.icon}</motion.span>
            <motion.span key={selected.id + "-l"} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.16, ease: EASE_OUT }} className="text-[13px] text-white/75 flex-1">{selected.label}</motion.span>
          </>
        ) : (
          <span className="text-[13px] text-white/20 flex-1">Pilih jenis dokumen...</span>
        )}
        <motion.span animate={{ rotate: open ? -180 : 0 }} transition={{ duration: 0.2, ease: EASE_OUT }} className="text-white/30 flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -6, transition: { duration: 0.12, ease: EASE_OUT } }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            style={{ transformOrigin: "top center", zIndex: 200 }}
            className="absolute top-full mt-1.5 w-full bg-[#1c1b2a] border border-white/[0.12] rounded-xl overflow-hidden shadow-2xl shadow-black/40"
          >
            <div className="p-1">
              {DOC_TYPES.map((type, i) => (
                <motion.button
                  key={type.id} type="button"
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.16, ease: EASE_OUT }}
                  whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                  onClick={() => { onChange(type.id); setOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${value === type.id ? "bg-indigo-500/12 text-indigo-300" : "text-white/55 hover:bg-white/[0.05] hover:text-white/80"}`}
                >
                  <span className={value === type.id ? "text-indigo-400" : "text-white/30"}>{type.icon}</span>
                  <span className="text-[13px] font-medium flex-1 text-left">{type.label}</span>
                  <motion.span animate={{ opacity: value === type.id ? 1 : 0, scale: value === type.id ? 1 : 0.5 }} transition={{ duration: 0.15, ease: EASE_OUT }} className="text-indigo-400 flex-shrink-0">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <motion.path d="M2.5 6.5l2.8 2.8L10.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" initial={false} animate={{ pathLength: value === type.id ? 1 : 0 }} transition={{ duration: 0.2, ease: EASE_OUT }}/>
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

export default function RulesView() {
  const [rules, setRules] = useState(RULES_DATA);
  const [activeTab, setActiveTab] = useState("rps");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newRule, setNewRule] = useState({ name: "", desc: "", docType: "rps", status: "active" });
  const [ruleFile, setRuleFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => { setPage(1); }, [activeTab, search]);

  // Escape key + body scroll lock
  useEffect(() => {
    if (!showForm) return;
    const onKey = (e) => { if (e.key === "Escape") handleCancel(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [showForm]);

  const onDrag = useCallback((e) => {
    e.preventDefault();
    setIsDragging(e.type !== "dragleave" && e.type !== "drop");
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) setRuleFile(f);
  }, []);

  const handleOpenForm = () => {
    setNewRule({ name: "", desc: "", docType: activeTab, status: "active" });
    setRuleFile(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewRule({ name: "", desc: "", docType: activeTab, status: "active" });
    setRuleFile(null);
  };

  const set = (k) => (e) => setNewRule((p) => ({ ...p, [k]: e.target.value }));

  const tabRules = rules.filter((r) => r.docType === activeTab);
  const searchedRules = search.trim()
    ? tabRules.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.id.toLowerCase().includes(search.toLowerCase())
      )
    : tabRules;
  const totalPages = Math.max(1, Math.ceil(searchedRules.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRules = searchedRules.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const activeCount = tabRules.filter((r) => r.enabled).length;

  return (
    <>
      {/* ── Modal ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* Backdrop */}
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.2 }}
              onClick={handleCancel}
              className="fixed inset-0 bg-black/60 backdrop-blur-[3px]"
              style={{ zIndex: 100 }}
            />

            {/* Panel wrapper — handles centering + backdrop click */}
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 6, transition: { duration: 0.15, ease: EASE_OUT } }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
              onClick={handleCancel}
              className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
              style={{ zIndex: 101 }}
            >
              {/* Modal card — stopPropagation so clicks inside don't close */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#191820] rounded-2xl border border-white/[0.11] w-full max-w-lg flex flex-col shadow-2xl shadow-black/60"
                style={{ maxHeight: "88vh" }}
              >
                {/* Header */}
                <div className="px-5 py-4 border-b border-white/[0.07] flex items-start justify-between flex-shrink-0">
                  <div>
                    <p className="text-[14px] font-bold text-white/85">Tambah Aturan Baru</p>
                    <p className="text-[12px] text-white/35 mt-0.5">Tambahkan parameter aturan untuk validasi dokumen</p>
                  </div>
                  <motion.button
                    type="button"
                    onClick={handleCancel}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ duration: 0.12 }}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 transition-colors cursor-pointer flex-shrink-0 ml-3 mt-0.5"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </motion.button>
                </div>

                {/* Scrollable body */}
                <div className="p-5 flex flex-col gap-4 overflow-y-auto flex-1 pb-44">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Nama Aturan <span className="text-red-400/80">*</span></label>
                    <input type="text" placeholder="Contoh: Format Margin Halaman" value={newRule.name} onChange={set("name")} className={inputCls} />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Deskripsi Aturan</label>
                    <textarea placeholder="Jelaskan aturan ini dengan detail..." value={newRule.desc} onChange={set("desc")} rows={3} className={`${inputCls} resize-none`} />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Jenis Dokumen <span className="text-red-400/80">*</span></label>
                    <DocTypeSelect value={newRule.docType} onChange={(id) => setNewRule((p) => ({ ...p, docType: id }))} />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>File Aturan <span className="text-red-400/80">*</span></label>
                    <motion.label
                      htmlFor="rule-file-input"
                      onDragEnter={onDrag} onDragOver={onDrag} onDragLeave={onDrag} onDrop={onDrop}
                      animate={{
                        borderColor: isDragging ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.10)",
                        backgroundColor: isDragging ? "rgba(99,102,241,0.05)" : "rgba(255,255,255,0.02)",
                      }}
                      transition={{ duration: 0.15 }}
                      className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed py-7 cursor-pointer"
                    >
                      {ruleFile ? (
                        <>
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                          <p className="text-[12px] font-semibold text-white/65">{ruleFile.name}</p>
                          <p className="text-[10px] text-white/30">{(ruleFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </>
                      ) : (
                        <>
                          <div className={`text-white/25 ${isDragging ? "text-indigo-400" : ""}`}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M10 14V5M7 8l3-3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M3 16v1a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                            </svg>
                          </div>
                          <p className="text-[12px] font-semibold text-white/50">Upload file atau tarik ke sini</p>
                          <p className="text-[10px] text-white/25">PDF, DOC, DOCX, XLS, XLSX (Max 10MB)</p>
                        </>
                      )}
                      <input id="rule-file-input" type="file" className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={(e) => { if (e.target.files[0]) setRuleFile(e.target.files[0]); }} />
                    </motion.label>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className={labelCls}>Status Aturan <span className="text-red-400/80">*</span></label>
                    <div className="relative">
                      <select value={newRule.status} onChange={set("status")} className={selectCls}>
                        <option value="active" className="bg-[#191820]">Active</option>
                        <option value="inactive" className="bg-[#191820]">Inactive</option>
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/30" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t border-white/[0.06] flex justify-end items-center gap-3 flex-shrink-0">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-5 py-2.5 rounded-lg text-[12px] font-semibold text-white/40 hover:text-white/70 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <motion.button
                    type="button"
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.18)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    onClick={handleCancel}
                    className="px-5 py-2.5 rounded-lg text-[12px] font-bold bg-white/[0.11] border border-white/[0.15] text-white/85 cursor-pointer"
                  >
                    Tambah Aturan
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Page content ────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <div className="bg-[#191820] rounded-xl border border-white/[0.08] overflow-hidden">

          {/* Header */}
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold text-white/70">Compliance Rules</p>
              <p className="text-[11px] text-white/30 mt-0.5">{activeCount} active · {tabRules.length} total in this tab</p>
            </div>
            <motion.button
              whileHover={{ backgroundColor: "rgba(255,255,255,0.09)" }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpenForm}
              transition={{ duration: 0.15 }}
              className="text-[11px] font-semibold border border-white/[0.14] rounded-lg px-3 py-1.5 text-white/65 hover:text-white/85 transition-all cursor-pointer"
            >
              + Tambah Aturan
            </motion.button>
          </div>

          {/* Tabs + Search */}
          <div className="px-5 py-3 border-b border-white/[0.05] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center gap-1 bg-white/[0.03] rounded-lg p-1 flex-1 relative">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSearch(""); }}
                  className="relative flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md cursor-pointer z-10"
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="tab-active-bg"
                      className="absolute inset-0 bg-white/[0.09] rounded-md border border-white/[0.10]"
                      transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
                    />
                  )}
                  <span className={`relative text-[11px] font-semibold transition-colors ${activeTab === tab.id ? "text-white/80" : "text-white/35"}`}>
                    {tab.label}
                  </span>
                  <span className={`relative text-[10px] font-medium px-1 py-0.5 rounded transition-colors ${
                    activeTab === tab.id ? "bg-white/[0.12] text-white/60" : "text-white/20"
                  }`}>
                    {rules.filter((r) => r.docType === tab.id).length}
                  </span>
                </button>
              ))}
            </div>
            <div className="relative sm:w-52">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M8.5 8.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Cari aturan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/[0.05] border border-white/[0.08] rounded-lg pl-8 pr-3 py-1.5 text-[12px] text-white/65 placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
              />
            </div>
          </div>

          {/* Rules list */}
          <div className="divide-y divide-white/[0.05] min-h-[200px]">
            <AnimatePresence mode="popLayout">
              {pageRules.length > 0 ? pageRules.map((rule, i) => (
                <motion.div
                  key={rule.id}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2, ease: EASE_OUT }}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-[10px] font-mono text-white/20 w-16 flex-shrink-0">{rule.id}</span>
                  <p className={`flex-1 text-[13px] font-medium truncate transition-colors ${rule.enabled ? "text-white/75" : "text-white/30"}`}>
                    {rule.name}
                  </p>
                  <Badge variant={rule.enabled ? "active" : "inactive"}>
                    {rule.enabled ? "Active" : "Inactive"}
                  </Badge>
                  <span className="text-[11px] text-white/20 flex-shrink-0 hidden sm:block">{rule.updated}</span>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button className="text-[11px] font-medium text-white/35 hover:text-white/70 transition-colors cursor-pointer border border-white/[0.08] rounded px-2.5 py-1 hover:border-white/18">
                      Edit
                    </button>
                    <button className="text-[11px] font-medium text-red-400/40 hover:text-red-400/80 transition-colors cursor-pointer border border-red-500/[0.08] rounded px-2.5 py-1 hover:border-red-500/20">
                      Hapus
                    </button>
                  </div>
                </motion.div>
              )) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-14 text-center"
                >
                  <p className="text-[13px] text-white/25">
                    {search ? `Tidak ada aturan yang cocok dengan "${search}"` : "Belum ada aturan untuk tab ini."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-5 py-3 border-t border-white/[0.05] flex items-center justify-between">
              <p className="text-[11px] text-white/25">
                {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, searchedRules.length)} dari {searchedRules.length} aturan
              </p>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  whileTap={{ scale: safePage === 1 ? 1 : 0.95 }}
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all ${
                    safePage === 1
                      ? "border-white/[0.05] text-white/15 cursor-not-allowed"
                      : "border-white/[0.12] text-white/50 hover:border-white/25 hover:text-white/80 cursor-pointer"
                  }`}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6.5 2L4 5l2.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </motion.button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-6 h-6 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                        p === safePage
                          ? "bg-white/[0.12] text-white/80 border border-white/[0.15]"
                          : "text-white/30 hover:text-white/60"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <motion.button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  whileTap={{ scale: safePage === totalPages ? 1 : 0.95 }}
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all ${
                    safePage === totalPages
                      ? "border-white/[0.05] text-white/15 cursor-not-allowed"
                      : "border-white/[0.12] text-white/50 hover:border-white/25 hover:text-white/80 cursor-pointer"
                  }`}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3.5 2L6 5l-2.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

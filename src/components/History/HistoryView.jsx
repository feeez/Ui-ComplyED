"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatusBadge from "@/components/shared/StatusBadge";
import { Ic } from "@/components/shared/Icons";

const EASE_OUT = [0.23, 1, 0.32, 1];

const ALL_DOCS = [
  {
    id: 1, name: "RPS Pemrograman Web", docType: "RPS", size: "2.4 MB",
    status: "compliant", date: "8 May 2026", uploadTime: "08:45",
    auditReport: {
      statusKepatuhan: "PATUH", nilai: 95.0,
      wajibPatuh: 16, wajibTotal: 18, wajibKurang: 2, wajibTidak: 0,
      optional: 3, temuan: 5, daftarIsi: "Ditemukan",
      kesimpulan: "Dokumen dinyatakan patuh karena bagian wajib yang ada telah diisi dengan benar dan memenuhi standar Telkom University. Bagian opsional yang tersedia menambah nilai kualitas dokumen ini.",
    },
  },
  {
    id: 2, name: "Buku Kurikulum 2026", docType: "Buku Kurikulum", size: "1.1 MB",
    status: "pending", date: "7 May 2026", uploadTime: "14:22",
    auditReport: null,
  },
  {
    id: 3, name: "Laporan Penelitian Semester 2", docType: "Laporan Penelitian", size: "3.7 MB",
    status: "flagged", date: "5 May 2026", uploadTime: "11:13",
    auditReport: {
      statusKepatuhan: "TIDAK PATUH", nilai: 42.0,
      wajibPatuh: 7, wajibTotal: 18, wajibKurang: 4, wajibTidak: 7,
      optional: 0, temuan: 18, daftarIsi: "Tidak Ditemukan",
      kesimpulan: "Dokumen dinyatakan tidak patuh karena terdapat beberapa bagian wajib yang tidak terpenuhi. Diperlukan perbaikan sebelum dokumen dapat disetujui oleh auditor.",
    },
  },
  {
    id: 4, name: "Lembar Ujian Akhir Semester", docType: "Lembar Ujian", size: "1.8 MB",
    status: "compliant", date: "3 May 2026", uploadTime: "09:30",
    auditReport: {
      statusKepatuhan: "PATUH", nilai: 100.0,
      wajibPatuh: 18, wajibTotal: 18, wajibKurang: 0, wajibTidak: 0,
      optional: 0, temuan: 10, daftarIsi: "Ditemukan",
      kesimpulan: "Dokumen dinyatakan patuh karena semua bagian wajib telah diisi dengan benar dan memenuhi standar yang ditetapkan. Tidak ada temuan yang perlu diperbaiki.",
    },
  },
  {
    id: 5, name: "RPS Basis Data", docType: "RPS", size: "0.9 MB",
    status: "compliant", date: "29 Apr 2026", uploadTime: "16:05",
    auditReport: {
      statusKepatuhan: "PATUH", nilai: 88.0,
      wajibPatuh: 15, wajibTotal: 18, wajibKurang: 3, wajibTidak: 0,
      optional: 2, temuan: 7, daftarIsi: "Ditemukan",
      kesimpulan: "Dokumen dinyatakan patuh dengan beberapa bagian yang masih perlu ditingkatkan kualitasnya. Secara keseluruhan memenuhi standar minimum yang ditetapkan.",
    },
  },
  {
    id: 6, name: "Buku Kurikulum Teknik Sipil", docType: "Buku Kurikulum", size: "5.2 MB",
    status: "pending", date: "28 Apr 2026", uploadTime: "13:47",
    auditReport: null,
  },
  {
    id: 7, name: "Laporan Penelitian Jaringan", docType: "Laporan Penelitian", size: "2.1 MB",
    status: "flagged", date: "25 Apr 2026", uploadTime: "10:28",
    auditReport: {
      statusKepatuhan: "TIDAK PATUH", nilai: 61.0,
      wajibPatuh: 11, wajibTotal: 18, wajibKurang: 3, wajibTidak: 4,
      optional: 1, temuan: 12, daftarIsi: "Ditemukan",
      kesimpulan: "Dokumen dinyatakan tidak patuh karena beberapa bagian wajib tidak memenuhi standar yang ditetapkan. Perbaikan diperlukan pada bagian metodologi dan referensi.",
    },
  },
  {
    id: 8, name: "Lembar Ujian Tengah Semester", docType: "Lembar Ujian", size: "0.6 MB",
    status: "compliant", date: "20 Apr 2026", uploadTime: "07:55",
    auditReport: {
      statusKepatuhan: "PATUH", nilai: 91.0,
      wajibPatuh: 17, wajibTotal: 18, wajibKurang: 1, wajibTidak: 0,
      optional: 4, temuan: 8, daftarIsi: "Ditemukan",
      kesimpulan: "Dokumen dinyatakan patuh dengan satu bagian yang masih perlu penyesuaian minor. Secara keseluruhan memenuhi standar format ujian Telkom University.",
    },
  },
];

function AuditReportPanel({ report, docType }) {
  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 min-h-[280px] gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-white/20">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M5 3h8.5L17 6.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            <path d="M13.5 3v4H17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 10.5h8M7 13.5h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="text-[13px] font-semibold text-white/30">Belum ada laporan</p>
        <p className="text-[11px] text-white/20 text-center max-w-[200px] leading-relaxed">
          Laporan validasi belum tersedia untuk dokumen ini.
        </p>
      </div>
    );
  }

  const isPatuh = report.statusKepatuhan === "PATUH";

  const metrics = [
    { label: "Nama Dokumen", value: "–" },
    { label: "Status Kepatuhan", value: report.statusKepatuhan, accent: true },
    { label: "Nilai Kepatuhan", value: `${report.nilai}/100` },
    { label: "Bagian Wajib Patuh", value: `${report.wajibPatuh}/${report.wajibTotal}` },
    { label: "Bagian Wajib Kurang Patuh", value: `${report.wajibKurang}` },
    { label: "Bagian Wajib Tidak Patuh", value: `${report.wajibTidak}` },
    { label: "Optional yang Ada", value: `${report.optional}` },
    { label: "Temuan Tambahan", value: `${report.temuan}` },
    { label: "Daftar Isi", value: report.daftarIsi },
  ];

  return (
    <div className="flex flex-col gap-4 flex-1">
      {/* Document header */}
      <div className="bg-[#13121f] rounded-xl border border-white/[0.08] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.06] text-center">
          <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-white/25">
            Telkom University — Sistem Pengecekan Otomatis
          </p>
          <p className="text-[13px] font-bold text-white/75 mt-2 tracking-wide uppercase">
            Laporan Audit {docType}
          </p>
          <p className="text-[10px] text-white/30 mt-1">
            Sistem Pengecekan Otomatis Ada atau Tidaknya Bagian Dokumen
          </p>
        </div>

        {/* Metrics table */}
        <div className="divide-y divide-white/[0.05]">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`flex items-center ${i % 2 === 1 ? "bg-white/[0.02]" : ""}`}
            >
              <div className="flex-1 px-5 py-2.5 text-[11px] text-white/35">{m.label}</div>
              <div
                className={`px-5 py-2.5 text-[11px] font-semibold text-right min-w-[130px] ${
                  m.accent
                    ? isPatuh ? "text-emerald-400" : "text-red-400"
                    : "text-white/60"
                }`}
              >
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status + Kesimpulan */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.18, ease: EASE_OUT }}
        className={`rounded-xl border px-5 py-4 ${
          isPatuh
            ? "bg-emerald-500/[0.06] border-emerald-500/20"
            : "bg-red-500/[0.06] border-red-500/20"
        }`}
      >
        <div className="flex items-center gap-2 mb-2.5">
          {isPatuh ? (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-emerald-400 flex-shrink-0">
              <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M4.5 7.5l2 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-red-400 flex-shrink-0">
              <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M5.5 5.5l4 4M9.5 5.5l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          )}
          <p className={`text-[12px] font-bold ${isPatuh ? "text-emerald-400" : "text-red-400"}`}>
            Status: {report.statusKepatuhan}
          </p>
        </div>
        <p className="text-[11px] text-white/40 leading-relaxed">{report.kesimpulan}</p>
      </motion.div>
    </div>
  );
}

export default function HistoryView() {
  const [search, setSearch] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);

  const filtered = ALL_DOCS.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.docType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence mode="wait">
      {selectedDoc ? (
        /* ── DETAIL VIEW ─────────────────────────────────── */
        <motion.div
          key="detail"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 18 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="flex flex-col gap-4"
        >
          {/* Breadcrumb + back */}
          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] font-medium tracking-wide text-white/20 uppercase">
              Pages / History / Detail
            </p>
            <button
              onClick={() => setSelectedDoc(null)}
              className="flex items-center gap-1.5 text-[12px] font-semibold text-indigo-400/75 hover:text-indigo-400 transition-colors cursor-pointer w-fit"
            >
              {Ic.back}
              Kembali ke History
            </button>
          </div>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-4 items-start">
            {/* Left — Informasi Dokumen */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.05, ease: EASE_OUT }}
              className="bg-[#191820] rounded-xl border border-white/[0.08] p-5 flex flex-col gap-4 w-full lg:w-[300px] flex-shrink-0"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[14px] font-bold text-white/80">Informasi Dokumen</p>
                <button className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-[11px] font-semibold text-red-400/80 hover:bg-red-500/18 hover:text-red-400 transition-colors cursor-pointer flex-shrink-0">
                  Hapus
                </button>
              </div>

              {/* Doc icon */}
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/30">
                {Ic.doc}
              </div>

              {/* Fields */}
              <div className="flex flex-col gap-3.5">
                {[
                  { key: "NAMA DOKUMEN", val: selectedDoc.name },
                  { key: "JENIS DOKUMEN", val: selectedDoc.docType },
                  { key: "TANGGAL UPLOAD", val: `${selectedDoc.date}, ${selectedDoc.uploadTime}` },
                ].map((f) => (
                  <div key={f.key}>
                    <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-white/22 mb-1">
                      {f.key}
                    </p>
                    <p className="text-[13px] font-semibold text-white/72">{f.val}</p>
                  </div>
                ))}

                <div>
                  <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-white/22 mb-1">
                    STATUS
                  </p>
                  <StatusBadge status={selectedDoc.status} />
                </div>

                <div>
                  <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-white/22 mb-1">
                    FILE DOKUMEN ASLI
                  </p>
                  <button className="flex items-center gap-1.5 text-[12px] font-semibold text-indigo-400/70 hover:text-indigo-400 transition-colors cursor-pointer">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M7 1h4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11 1L5.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Buka File Asli
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right — Laporan Validasi */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.1, ease: EASE_OUT }}
              className="bg-[#191820] rounded-xl border border-white/[0.08] p-5 flex flex-col gap-4 flex-1 w-full"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-bold text-white/80">Laporan Validasi</p>
                  {selectedDoc.auditReport && (
                    <p className="text-[11px] text-white/30 mt-0.5">{selectedDoc.name}</p>
                  )}
                </div>
                {selectedDoc.auditReport && (
                  <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-semibold text-indigo-400 hover:bg-indigo-500/18 transition-colors cursor-pointer">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1.5v7M3 6.5L6 9.5l3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1.5 10.5h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                    Download
                  </button>
                )}
              </div>

              <AuditReportPanel
                report={selectedDoc.auditReport}
                docType={selectedDoc.docType}
              />
            </motion.div>
          </div>
        </motion.div>
      ) : (
        /* ── LIST VIEW ───────────────────────────────────── */
        <motion.div
          key="list"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          className="flex flex-col gap-4"
        >
          <div className="bg-[#191820] rounded-xl border border-white/[0.08] overflow-hidden">
            <div className="px-4 md:px-6 py-4 md:py-5 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-[15px] font-bold text-white/80">Document History</p>
                <p className="text-[11px] text-white/30 mt-0.5">{filtered.length} dokumen ditemukan</p>
              </div>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Cari dokumen..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-white/[0.05] border border-white/[0.09] rounded-lg pl-8 pr-4 py-2 text-[12px] text-white/65 placeholder-white/25 outline-none focus:border-white/22 focus:bg-white/[0.07] transition-all w-full sm:w-[200px]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr className="border-b border-white/[0.05]">
                    <th className="text-left px-6 py-3 text-[10px] font-semibold tracking-widest uppercase text-white/25 w-[40%]">Doc Name</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold tracking-widest uppercase text-white/25">Doc. Type</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold tracking-widest uppercase text-white/25">Status</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold tracking-widest uppercase text-white/25">Tanggal Upload</th>
                    <th className="text-left px-4 py-3 text-[10px] font-semibold tracking-widest uppercase text-white/25">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <p className="text-[13px] text-white/30">Tidak ada dokumen yang cocok.</p>
                        </td>
                      </tr>
                    ) : (
                      filtered.map((doc, i) => (
                        <motion.tr
                          key={doc.id}
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.22, ease: EASE_OUT }}
                          className="border-b border-white/[0.04] hover:bg-white/[0.03] active:bg-white/[0.06] transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/[0.07] flex items-center justify-center text-white/35 flex-shrink-0">
                                {Ic.doc}
                              </div>
                              <span className="text-[13px] font-medium text-white/70 truncate max-w-[220px]">{doc.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-[12px] text-white/45">{doc.docType}</td>
                          <td className="px-4 py-4"><StatusBadge status={doc.status} /></td>
                          <td className="px-4 py-4 text-[12px] text-white/35">{doc.date}</td>
                          <td className="px-4 py-4">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setSelectedDoc(doc)}
                              className="px-3.5 py-1.5 rounded-lg border border-white/[0.14] text-[11px] font-semibold text-white/55 hover:text-white/80 hover:border-white/25 hover:bg-white/[0.05] transition-all cursor-pointer"
                            >
                              View Details
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

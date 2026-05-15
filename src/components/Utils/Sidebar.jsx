"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Logo from "../shared/Logo";
import NavItem from "../shared/NavItem";
import { Ic } from "../shared/Icons";

const USER_NAV = [
  { id: "dashboard", label: "Dashboard", icon: Ic.grid,    href: "/Dashboard/User" },
  { id: "upload",    label: "Upload",    icon: Ic.upload,  href: "/Upload" },
  { id: "history",   label: "History",   icon: Ic.history, href: "/History" },
  { id: "rules",     label: "Rules",     icon: Ic.rules,   href: "/Pedoman" },
];

const ADMIN_NAV = [
  { id: "dashboard", label: "Dashboard",   icon: Ic.grid,  href: "/Dashboard/Admin" },
  { id: "rules",     label: "Rules",       icon: Ic.rules, href: "/Rules" },
  { id: "panel",     label: "Admin Panel", icon: Ic.users, href: "/AdminPanel" },
];

const USER_TITLES = {
  "/Dashboard/User": "Overview",
  "/Upload":         "Upload Document",
  "/History":        "Document History",
  "/Pedoman":        "Pedoman Dokumen",
};

const ADMIN_TITLES = {
  "/Dashboard/Admin": "Overview",
  "/Rules":           "Compliance Rules",
  "/AdminPanel":      "User Management",
};

const EASE_OUT = [0.23, 1, 0.32, 1];
const inputCls = "bg-white/[0.05] border border-white/[0.09] rounded-lg px-4 py-2.5 text-[13px] text-white/75 placeholder-white/20 outline-none focus:border-white/22 focus:bg-white/[0.08] transition-all w-full";
const labelCls = "text-[10px] font-semibold tracking-widest uppercase text-white/40";

function EyeIcon({ visible }) {
  return visible ? (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 7s2.5-4.5 6-4.5S13 7 13 7s-2.5 4.5-6 4.5S1 7 1 7Z" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2 2l10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 7s2.5-4.5 6-4.5S13 7 13 7s-2.5 4.5-6 4.5S1 7 1 7Z" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
}

export default function Sidebar({ role = "user", children }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [showPwModal, setShowPwModal] = useState(false);
  const [passwords, setPasswords] = useState({ old: "", next: "", confirm: "" });
  const [showPw, setShowPw] = useState({ old: false, next: false, confirm: false });
  const [pwError, setPwError] = useState("");
  const accountRef = useRef(null);

  const isAdmin = role === "admin";
  const nav = isAdmin ? ADMIN_NAV : USER_NAV;
  const titles = isAdmin ? ADMIN_TITLES : USER_TITLES;
  const badge = isAdmin ? "Admin" : null;
  const sectionLabel = isAdmin ? "Admin" : "Workspace";
  const navGroup = isAdmin ? "Management" : "Workspace";
  const title = titles[pathname] ?? "Overview";
  const userName = isAdmin ? "Super Admin" : "Aditya Pratama";
  const userEmail = isAdmin ? "admin@complyed.id" : "aditya@company.co.id";
  const userInitial = isAdmin ? "S" : "A";

  /* Escape to close mobile drawer */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setDrawerOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* Scroll lock for mobile drawer */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  /* Click-outside to close account dropdown */
  useEffect(() => {
    if (!accountOpen) return;
    const handler = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [accountOpen]);

  /* Close dropdown on route change */
  useEffect(() => { setAccountOpen(false); }, [pathname]);

  /* Escape + scroll lock for password modal */
  useEffect(() => {
    if (!showPwModal) return;
    const onKey = (e) => { if (e.key === "Escape") closePwModal(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [showPwModal]);

  const openPwModal = () => {
    setAccountOpen(false);
    setTimeout(() => setShowPwModal(true), 120);
  };

  const closePwModal = () => {
    setShowPwModal(false);
    setPasswords({ old: "", next: "", confirm: "" });
    setShowPw({ old: false, next: false, confirm: false });
    setPwError("");
  };

  const handleSavePassword = () => {
    if (!passwords.old || !passwords.next || !passwords.confirm) {
      setPwError("Semua field wajib diisi.");
      return;
    }
    if (passwords.next.length < 8) {
      setPwError("Password baru minimal 8 karakter.");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      setPwError("Konfirmasi password tidak cocok.");
      return;
    }
    closePwModal();
  };

  const setPw = (k) => (e) => {
    setPasswords((p) => ({ ...p, [k]: e.target.value }));
    setPwError("");
  };

  const isActive = (item) => pathname === item.href;

  const PW_FIELDS = [
    { key: "old",     label: "Password Lama",            ph: "Masukkan password lama" },
    { key: "next",    label: "Password Baru",            ph: "Minimal 8 karakter" },
    { key: "confirm", label: "Konfirmasi Password Baru", ph: "Ulangi password baru" },
  ];

  return (
    <>
      {/* ── Password Modal ───────────────────────────────── */}
      <AnimatePresence>
        {showPwModal && (
          <>
            <motion.div
              key="pw-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.2 }}
              onClick={closePwModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-[3px]"
              style={{ zIndex: 200 }}
            />
            <motion.div
              key="pw-panel"
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 6, transition: { duration: 0.15, ease: EASE_OUT } }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
              onClick={closePwModal}
              className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
              style={{ zIndex: 201 }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#191820] rounded-2xl border border-white/[0.11] w-full max-w-md flex flex-col shadow-2xl shadow-black/60"
              >
                {/* Modal header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/[0.10] flex items-center justify-center flex-shrink-0">
                      <span className="text-[13px] font-bold text-white/50">{userInitial}</span>
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-white/82">Pengaturan Akun</p>
                      <p className="text-[11px] text-white/30">{userEmail}</p>
                    </div>
                  </div>
                  <button
                    onClick={closePwModal}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.07] transition-all cursor-pointer"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>

                {/* Modal body */}
                <div className="px-6 py-5 flex flex-col gap-4">
                  <p className="text-[11px] text-white/35 -mt-1">Ubah password untuk akun ini</p>

                  {PW_FIELDS.map(({ key, label, ph }) => (
                    <div key={key} className="flex flex-col gap-1.5">
                      <label className={labelCls}>{label}</label>
                      <div className="relative">
                        <input
                          type={showPw[key] ? "text" : "password"}
                          placeholder={ph}
                          value={passwords[key]}
                          onChange={setPw(key)}
                          className={`${inputCls} pr-10`}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw((p) => ({ ...p, [key]: !p[key] }))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/55 transition-colors cursor-pointer"
                        >
                          <EyeIcon visible={showPw[key]} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {pwError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-red-400/80 -mt-1"
                    >
                      {pwError}
                    </motion.p>
                  )}
                </div>

                {/* Modal footer */}
                <div className="flex justify-end items-center gap-3 px-6 py-4 border-t border-white/[0.07]">
                  <button
                    onClick={closePwModal}
                    className="px-5 py-2.5 rounded-lg text-[12px] font-semibold text-white/40 hover:text-white/70 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.18)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    onClick={handleSavePassword}
                    className="px-5 py-2.5 rounded-lg text-[12px] font-bold bg-white/[0.11] border border-white/[0.15] text-white/85 cursor-pointer"
                  >
                    Simpan Password
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main layout ──────────────────────────────────── */}
      <div className="flex h-screen bg-[#0f0e15] overflow-hidden">

        {/* Backdrop (mobile only) */}
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setDrawerOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar / Drawer */}
        <aside
          className={`
            flex flex-col flex-shrink-0
            bg-[#0b0a10] border-r border-white/[0.07]
            fixed md:static top-0 left-0 bottom-0 z-50
            w-[260px] md:w-[220px]
            transform transition-transform duration-300
            ${drawerOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
          style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
        >
          {/* Logo + close (mobile) */}
          <div className="px-5 py-5 border-b border-white/[0.07] flex items-center justify-between">
            <Logo badge={badge} />
            <button
              onClick={() => setDrawerOpen(false)}
              className="md:hidden flex items-center justify-center w-7 h-7 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              {Ic.close}
            </button>
          </div>

          {/* Nav items */}
          <div className="flex-1 px-3 py-3 overflow-y-auto">
            <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/20 px-3 mb-2.5">
              {navGroup}
            </p>
            <nav className="flex flex-col gap-0.5">
              {nav.map((item) => (
                <NavItem
                  key={item.id}
                  {...item}
                  active={isActive(item)}
                  onClick={() => setDrawerOpen(false)}
                  layoutId={`${role}-nav-pill`}
                />
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Header */}
          <header className="h-14 bg-[#0d0c13] border-b border-white/[0.07] flex items-center justify-between px-4 md:px-6 flex-shrink-0">
            {/* Left */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDrawerOpen(true)}
                className="md:hidden flex items-center justify-center w-8 h-8 text-white/50 hover:text-white/80 transition-colors cursor-pointer"
                aria-label="Open menu"
              >
                {Ic.menu}
              </button>
              <div className="md:hidden">
                <Logo badge={badge} />
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-[11px] text-white/30 font-medium">{sectionLabel}</span>
                <span className="text-white/15">/</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={pathname}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.15 }}
                    className="text-[13px] font-semibold text-white/75"
                  >
                    {title}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <AnimatePresence mode="wait">
                <motion.span
                  key={pathname + "-m"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="md:hidden text-[13px] font-semibold text-white/50"
                >
                  {title}
                </motion.span>
              </AnimatePresence>

              {isAdmin && (
                <span className="hidden md:inline-flex text-[10px] font-semibold tracking-widest uppercase text-white/25 border border-white/[0.09] rounded-full px-3 py-1">
                  Admin Console
                </span>
              )}

              {/* Account avatar + dropdown */}
              <div ref={accountRef} className="relative">
                <button
                  onClick={() => setAccountOpen((o) => !o)}
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-white/[0.08] hover:border-white/[0.16] hover:bg-white/[0.04] transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-white/[0.09] border border-white/[0.12] flex items-center justify-center flex-shrink-0">
                    <span className="text-[11px] font-bold text-white/55">{userInitial}</span>
                  </div>
                  <span className="hidden sm:block text-[12px] font-medium text-white/55 max-w-[110px] truncate">
                    {userName}
                  </span>
                  <svg
                    width="10" height="10" viewBox="0 0 10 10" fill="none"
                    className={`text-white/25 transition-transform duration-200 ${accountOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {accountOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: -6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -6, transition: { duration: 0.13, ease: EASE_OUT } }}
                      transition={{ duration: 0.18, ease: EASE_OUT }}
                      className="fixed bg-[#1c1b2a] border border-white/[0.10] rounded-xl shadow-2xl shadow-black/50 w-56 overflow-hidden"
                      style={{ top: "3.5rem", right: "1rem", zIndex: 150, transformOrigin: "top right" }}
                    >
                      {/* User info */}
                      <div className="px-4 py-3.5 flex items-center gap-3 border-b border-white/[0.07]">
                        <div className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/[0.10] flex items-center justify-center flex-shrink-0">
                          <span className="text-[13px] font-bold text-white/50">{userInitial}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-white/75 truncate">{userName}</p>
                          <p className="text-[10px] text-white/30 truncate">{userEmail}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="py-1.5">
                        <button
                          onClick={openPwModal}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-medium text-white/55 hover:text-white/80 hover:bg-white/[0.05] transition-all cursor-pointer"
                        >
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-white/35 flex-shrink-0">
                            <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
                            <path d="M7.5 7.5L12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                            <path d="M5 3.5v1.5h1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Pengaturan Akun
                        </button>
                      </div>

                      <div className="border-t border-white/[0.07] py-1.5">
                        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-medium text-red-400/60 hover:text-red-400/90 hover:bg-red-500/[0.07] transition-all cursor-pointer">
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="flex-shrink-0">
                            <path d="M8.5 4V2.5A1.5 1.5 0 0 0 7 1H2.5A1.5 1.5 0 0 0 1 2.5v8A1.5 1.5 0 0 0 2.5 12H7a1.5 1.5 0 0 0 1.5-1.5V9" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round"/>
                            <path d="M5 6.5h7M10 4.5l2 2-2 2" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  );
}

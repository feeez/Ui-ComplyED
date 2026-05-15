"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "@/components/shared/Badge";

const EASE_OUT = [0.23, 1, 0.32, 1];

const INITIAL_USERS = [
  { id: 1, name: "Aditya Pratama",  email: "aditya@company.co.id",  role: "user"  },
  { id: 2, name: "Sari Dewi",       email: "sari.d@fintech.id",      role: "admin" },
  { id: 3, name: "Budi Kurniawan",  email: "budi.k@logistik.com",    role: "user"  },
  { id: 4, name: "Maya Anggraini",  email: "maya@healthtech.id",     role: "user"  },
  { id: 5, name: "Reza Fauzi",      email: "reza.f@manufaktur.com",  role: "user"  },
  { id: 6, name: "Dewi Lestari",    email: "dewi.l@insurance.id",    role: "user"  },
  { id: 7, name: "Fajar Nugroho",   email: "fajar.n@bank.co.id",     role: "admin" },
];

const inputCls = "bg-white/[0.05] border border-white/[0.09] rounded-lg px-4 py-2.5 text-[13px] text-white/75 placeholder-white/20 outline-none focus:border-white/22 focus:bg-white/[0.08] transition-all w-full";
const labelCls = "text-[10px] font-semibold tracking-widest uppercase text-white/40";

const ROLES = [
  { value: "user",  label: "User" },
  { value: "admin", label: "Admin" },
];

function RoleSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const selected = ROLES.find((r) => r.value === value) ?? ROLES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 bg-white/[0.05] border border-white/[0.09] rounded-lg px-4 py-2.5 text-[13px] text-white/75 hover:bg-white/[0.07] hover:border-white/[0.14] transition-all cursor-pointer"
      >
        <span>{selected.label}</span>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className={`text-white/30 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-180" : ""}`}
        >
          <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.92, y: -4 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0.92, y: -4, transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] } }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformOrigin: "top center", zIndex: 300 }}
            className="absolute top-full mt-1.5 w-full bg-[#1c1b2a] border border-white/[0.12] rounded-xl overflow-hidden shadow-2xl shadow-black/40"
          >
            {ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => { onChange(r.value); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-[13px] transition-colors cursor-pointer ${
                  r.value === value
                    ? "bg-indigo-500/20 text-white/85 font-semibold"
                    : "text-white/55 hover:bg-white/[0.06] hover:text-white/80"
                }`}
              >
                <span>{r.label}</span>
                {r.value === value && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-indigo-400 flex-shrink-0">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminPanelView() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" });
  const [nextId, setNextId] = useState(INITIAL_USERS.length + 1);
  const [editUser, setEditUser] = useState(null);
  const [editDraft, setEditDraft] = useState({ name: "", email: "", role: "user" });

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => setUsers((p) => p.filter((u) => u.id !== id));

  const handleAdd = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) return;
    setUsers((p) => [...p, { id: nextId, ...newUser }]);
    setNextId((n) => n + 1);
    setNewUser({ name: "", email: "", role: "user" });
    setShowAddForm(false);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setNewUser({ name: "", email: "", role: "user" });
  };

  const set = (k) => (e) => setNewUser((p) => ({ ...p, [k]: typeof e === "string" ? e : e.target.value }));

  const handleOpenEdit = (u) => {
    setEditUser(u);
    setEditDraft({ name: u.name, email: u.email, role: u.role });
  };

  const handleCancelEdit = () => {
    setEditUser(null);
    setEditDraft({ name: "", email: "", role: "user" });
  };

  const handleSaveEdit = () => {
    if (!editDraft.name.trim() || !editDraft.email.trim()) return;
    setUsers((p) => p.map((u) => u.id === editUser.id ? { ...u, ...editDraft } : u));
    handleCancelEdit();
  };

  const setDraft = (k) => (e) => setEditDraft((p) => ({ ...p, [k]: typeof e === "string" ? e : e.target.value }));

  useEffect(() => {
    if (!editUser) return;
    const onKey = (e) => { if (e.key === "Escape") handleCancelEdit(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [editUser]);

  return (
    <>
    {/* ── Edit Modal ─────────────────────────────────────── */}
    <AnimatePresence>
      {editUser && (
        <>
          <motion.div
            key="edit-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
            onClick={handleCancelEdit}
            className="fixed inset-0 bg-black/60 backdrop-blur-[3px]"
            style={{ zIndex: 100 }}
          />
          <motion.div
            key="edit-panel"
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6, transition: { duration: 0.15, ease: EASE_OUT } }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            onClick={handleCancelEdit}
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
            style={{ zIndex: 101 }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#191820] rounded-2xl border border-white/[0.11] w-full max-w-md flex flex-col shadow-2xl shadow-black/60"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
                <div>
                  <p className="text-[15px] font-bold text-white/82">Edit Akun</p>
                  <p className="text-[11px] text-white/30 mt-0.5">Ubah data akun pengguna</p>
                </div>
                <button
                  onClick={handleCancelEdit}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.07] transition-all cursor-pointer"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 flex flex-col gap-4">
                {/* Avatar preview */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.07]">
                  <div className="w-10 h-10 rounded-full bg-white/[0.08] border border-white/[0.10] flex items-center justify-center flex-shrink-0">
                    <span className="text-[14px] font-semibold text-white/50">
                      {editDraft.name?.[0]?.toUpperCase() || "?"}
                    </span>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-white/70">{editDraft.name || "—"}</p>
                    <p className="text-[11px] text-white/30">{editDraft.email || "—"}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Nama Lengkap <span className="text-red-400/80">*</span></label>
                  <input
                    type="text"
                    placeholder="Nama lengkap"
                    value={editDraft.name}
                    onChange={setDraft("name")}
                    className={inputCls}
                    autoFocus
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Email <span className="text-red-400/80">*</span></label>
                  <input
                    type="email"
                    placeholder="email@domain.com"
                    value={editDraft.email}
                    onChange={setDraft("email")}
                    className={inputCls}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Role</label>
                  <RoleSelect value={editDraft.role} onChange={setDraft("role")} />
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end items-center gap-3 px-6 py-4 border-t border-white/[0.07]">
                <button
                  onClick={handleCancelEdit}
                  className="px-5 py-2.5 rounded-lg text-[12px] font-semibold text-white/40 hover:text-white/70 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <motion.button
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.18)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  onClick={handleSaveEdit}
                  className="px-5 py-2.5 rounded-lg text-[12px] font-bold bg-white/[0.11] border border-white/[0.15] text-white/85 cursor-pointer"
                >
                  Simpan Perubahan
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className="flex flex-col gap-4"
    >
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="bg-[#191820] rounded-xl border border-white/[0.11] overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-white/[0.07]">
              <p className="text-[14px] font-bold text-white/80">Tambah Akun Baru</p>
              <p className="text-[12px] text-white/35 mt-0.5">Buat akun pengguna baru untuk sistem</p>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Nama Lengkap <span className="text-red-400/80">*</span></label>
                  <input type="text" placeholder="Contoh: Budi Santoso" value={newUser.name} onChange={set("name")} className={inputCls} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Email <span className="text-red-400/80">*</span></label>
                  <input type="email" placeholder="email@domain.com" value={newUser.email} onChange={set("email")} className={inputCls} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Role <span className="text-red-400/80">*</span></label>
                <div className="sm:w-48">
                  <RoleSelect value={newUser.role} onChange={set("role")} />
                </div>
              </div>
              <div className="flex justify-end items-center gap-3 pt-1 border-t border-white/[0.06] mt-1">
                <button onClick={handleCancelAdd} className="px-5 py-2.5 rounded-lg text-[12px] font-semibold text-white/40 hover:text-white/70 transition-colors cursor-pointer">
                  Batal
                </button>
                <motion.button
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.18)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  onClick={handleAdd}
                  className="px-5 py-2.5 rounded-lg text-[12px] font-bold bg-white/[0.11] border border-white/[0.15] text-white/85 cursor-pointer"
                >
                  Tambah Akun
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#191820] rounded-xl border border-white/[0.08] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold text-white/70">User Management</p>
            <p className="text-[11px] text-white/30 mt-0.5">{users.length} accounts total</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-white/65 placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all w-full sm:w-44"
            />
            <motion.button
              whileHover={{ backgroundColor: showAddForm ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.09)" }}
              whileTap={{ scale: 0.97 }}
              onClick={showAddForm ? handleCancelAdd : () => setShowAddForm(true)}
              transition={{ duration: 0.15 }}
              className={`flex-shrink-0 text-[11px] font-semibold border rounded-lg px-3 py-2 cursor-pointer transition-all whitespace-nowrap ${
                showAddForm
                  ? "text-white/35 border-white/[0.08]"
                  : "text-white/65 border-white/[0.14] hover:text-white/85"
              }`}
            >
              {showAddForm ? "✕ Batal" : "+ Add Account"}
            </motion.button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["User", "Email", "Role", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold tracking-widest uppercase text-white/25">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((u, i) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    transition={{ duration: 0.22, delay: i * 0.03, ease: EASE_OUT }}
                    className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-white/[0.07] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                          <span className="text-[11px] font-semibold text-white/45">{u.name[0]}</span>
                        </div>
                        <span className="text-[13px] font-medium text-white/75">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[12px] text-white/40">{u.email}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={u.role}>{u.role}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="text-[11px] font-medium text-white/40 hover:text-white/70 transition-colors cursor-pointer border border-white/[0.09] rounded px-2.5 py-1 hover:border-white/20"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="text-[11px] font-medium text-red-400/50 hover:text-red-400/90 transition-colors cursor-pointer border border-red-500/10 rounded px-2.5 py-1 hover:border-red-500/25"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-14 text-center text-[13px] text-white/25">No users match your search.</div>
          )}
        </div>
      </div>
    </motion.div>
    </>
  );
}

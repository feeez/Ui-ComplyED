"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";

// ─── Animated SVG Lines ────────────────────────────────────────────────────────

const TOTAL_LINES = 12;

const LINE_CFG = Array.from({ length: TOTAL_LINES }, (_, i) => ({
  opacity: [0.42, 0.20, 0.10, 0.06][i % 4],
  strokeWidth: [1.0, 0.65, 0.45, 0.28][i % 4],
}));

function makePath(i, t) {
  const frac = i / (TOTAL_LINES - 1);
  const phase = i * 0.52;
  const s = t * 0.38;

  const sx = -120;
  const sy = 490 + (i - TOTAL_LINES / 2) * 8 + Math.sin(s + phase) * 18;

  const cp1x = 175 + Math.sin(s * 0.65 + phase) * 32;
  const cp1y = 410 + (i - TOTAL_LINES / 2) * 16 + Math.cos(s * 0.5 + phase) * 26;

  const cp2x = 455 + Math.sin(s * 0.42 + phase + 0.85) * 44;
  const cp2y = 80 + frac * 390 + Math.sin(s * 0.32 + phase + 1.55) * 36;

  const ex = 880;
  const ey = 10 + frac * 560 + Math.sin(s * 0.22 + phase + 2.2) * 48;

  return `M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ex} ${ey}`;
}

function AnimatedLines() {
  const refs = useRef([]);
  const tick = useRef(0);

  useAnimationFrame((ms) => {
    tick.current++;
    if (tick.current % 2 !== 0) return; // ~30fps — lighter on CPU
    const t = ms / 5000;
    refs.current.forEach((el, i) => {
      if (el) el.setAttribute("d", makePath(i, t));
    });
  });

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {LINE_CFG.map((cfg, i) => (
        <path
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          d={makePath(i, 0)}
          stroke="white"
          strokeWidth={cfg.strokeWidth}
          fill="none"
          opacity={cfg.opacity}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

// ─── Logo ──────────────────────────────────────────────────────────────────────

const BRUSH_C = (
  <path
    d="M 27 8 C 22 1, 6 1, 3 12 C 0 17, 0 19, 3 25 C 6 33, 22 34, 27 27 L 22.5 24 C 19 30, 9 28, 7 23 C 5 19.5, 5 17, 7 13 C 9 7, 19 6, 22.5 12 Z"
    fill="currentColor"
  />
);

function Logo({ size = "sm" }) {
  const isLg = size === "lg";
  const [cW, cH] = isLg ? [44, 40] : [22, 20];
  const tSz = isLg ? "text-[30px]" : "text-[15px]";
  return (
    <div className="flex items-center gap-0 leading-none select-none">
      <svg width={cW} height={cH} viewBox="0 0 40 36" fill="none" className="text-white flex-shrink-0" aria-hidden="true">
        {BRUSH_C}
        <path d="M 26 7 L 33 3" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" opacity="0.78"/>
        <path d="M 28 10 L 36 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.58"/>
        <path d="M 27 6 L 32 2" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.42"/>
        <circle cx="34" cy="4" r="1" fill="currentColor" opacity="0.35"/>
      </svg>
      <div className={`flex items-baseline gap-0 ${isLg ? "-ml-1.5" : "-ml-1"}`}>
        <span className={`font-extralight italic text-white/55 ${tSz}`} style={{ letterSpacing: "-0.01em" }}>omply</span>
        <span className={`font-black text-white/80 ${tSz}`} style={{ letterSpacing: "0.07em" }}>ED</span>
      </div>
    </div>
  );
}

// ─── Input ─────────────────────────────────────────────────────────────────────

function Input({ label, type = "text", placeholder, value, onChange, autoComplete, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium tracking-widest uppercase text-white/40">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        className="w-full bg-white/[0.05] border border-white/[0.09] rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:border-white/25 focus:bg-white/[0.08]"
      />
    </div>
  );
}

// ─── Sign In Form ──────────────────────────────────────────────────────────────

function SignInForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <motion.form
      key="sign-in"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-4"
    >
      <Input
        label="Email address"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={set("email")}
        autoComplete="email"
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={form.password}
        onChange={set("password")}
        autoComplete="current-password"
        required
      />

      <div className="flex justify-end -mt-1">
        <button
          type="button"
          className="text-[11px] text-white/35 hover:text-white/60 transition-colors cursor-pointer"
        >
          Forgot password?
        </button>
      </div>

      <motion.button
        type="submit"
        whileHover={{ backgroundColor: "rgba(255,255,255,0.92)" }}
        whileTap={{ scale: 0.97 }}
        className="w-full bg-white text-black font-semibold text-sm py-3 rounded-lg transition-colors mt-1 cursor-pointer"
      >
        Sign In
      </motion.button>
    </motion.form>
  );
}

// ─── Register Form ─────────────────────────────────────────────────────────────

function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <motion.form
      key="register"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-4"
    >
      <Input
        label="Full name"
        placeholder="Your full name"
        value={form.name}
        onChange={set("name")}
        autoComplete="name"
        required
      />
      <Input
        label="Email address"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={set("email")}
        autoComplete="email"
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="Create a strong password"
        value={form.password}
        onChange={set("password")}
        autoComplete="new-password"
        required
      />
      <Input
        label="Confirm password"
        type="password"
        placeholder="Repeat your password"
        value={form.confirm}
        onChange={set("confirm")}
        autoComplete="new-password"
        required
      />

      <motion.button
        type="submit"
        whileHover={{ backgroundColor: "rgba(255,255,255,0.92)" }}
        whileTap={{ scale: 0.97 }}
        className="w-full bg-white text-black font-semibold text-sm py-3 rounded-lg transition-colors mt-1 cursor-pointer"
      >
        Create Account
      </motion.button>
    </motion.form>
  );
}

// ─── Login Form (main export) ──────────────────────────────────────────────────

export default function LoginForm() {
  const [tab, setTab] = useState("sign-in");

  return (
    <div className="min-h-screen flex bg-[#0f0e15]">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-[56%] relative overflow-hidden bg-[#0b0a10]">
        <AnimatedLines />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 45% 55%, transparent 30%, rgba(11,10,16,0.55) 100%)",
          }}
        />

        <div className="absolute top-8 right-8 z-10">
          <span className="text-[10px] font-medium tracking-widest uppercase text-white/25 border border-white/10 rounded-full px-3 py-1">
            Compliance · Education
          </span>
        </div>

        {/* Centered brand display */}
        <div className="absolute inset-0 flex items-center justify-start pl-12 z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <Logo size="lg" />
            <p className="text-white/28 text-[13px] mt-3 ml-1 tracking-wide">
              Academic Compliance Platform
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-8 right-10 z-10">
          <div className="w-6 h-px bg-white/20 mb-5" />
          <p className="text-white/60 text-[13px] leading-relaxed max-w-[340px]">
            &ldquo;Compliance isn&rsquo;t a burden — it&rsquo;s the architecture
            of trust. We built ComplyED to make that architecture visible.&rdquo;
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col bg-[#111018]">
        <div className="flex items-center justify-between px-8 py-6">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="hidden lg:block" />

          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] text-white/35 hover:text-white/65 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M9 11L5 7L9 3"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Home
          </a>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-[340px]">

            <div className="mb-8">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={tab + "-heading"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="text-white text-[22px] font-bold tracking-tight leading-snug mb-2"
                >
                  {tab === "sign-in" ? "Welcome back." : "Create your account."}
                </motion.h1>
              </AnimatePresence>
              <p className="text-white/35 text-[13px] leading-relaxed">
                {tab === "sign-in"
                  ? "Sign in to access your compliance workspace."
                  : "Join ComplyED and simplify compliance education."}
              </p>
            </div>

            <div className="flex relative border-b border-white/[0.08] mb-7">
              {[
                { id: "sign-in", label: "Sign In" },
                { id: "register", label: "Register" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`relative pb-3 mr-7 text-[13px] font-medium transition-colors duration-200 cursor-pointer ${
                    tab === id ? "text-white" : "text-white/30 hover:text-white/55"
                  }`}
                >
                  {label}
                  {tab === id && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-white"
                      transition={{ type: "spring", stiffness: 480, damping: 38 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {tab === "sign-in" ? (
                <SignInForm key="sign-in" />
              ) : (
                <RegisterForm key="register" />
              )}
            </AnimatePresence>

            <p className="text-center text-white/20 text-[11px] mt-8 leading-relaxed">
              By continuing, you agree to our{" "}
              <a href="#" className="underline underline-offset-2 hover:text-white/45 transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-2 hover:text-white/45 transition-colors">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

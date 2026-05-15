"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";
import Link from "next/link";

// ─── Animated SVG Lines (same as Login) ───────────────────────────────────────

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

const BRUSH_C_PATH = "M 27 8 C 22 1, 6 1, 3 12 C 0 17, 0 19, 3 25 C 6 33, 22 34, 27 27 L 22.5 24 C 19 30, 9 28, 7 23 C 5 19.5, 5 17, 7 13 C 9 7, 19 6, 22.5 12 Z";

function Logo({ size = "sm" }) {
  const isLg = size === "lg";
  const [cW, cH] = isLg ? [44, 40] : [22, 20];
  const tSz = isLg ? "text-[30px]" : "text-[15px]";
  return (
    <div className="flex items-center gap-0.5 leading-none select-none">
      <svg width={cW} height={cH} viewBox="0 0 40 36" fill="none" className="text-white flex-shrink-0" aria-hidden="true">
        <path d={BRUSH_C_PATH} fill="currentColor"/>
        <path d="M 26 7 L 33 3" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" opacity="0.78"/>
        <path d="M 28 10 L 36 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.58"/>
        <path d="M 27 6 L 32 2" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.42"/>
        <circle cx="34" cy="4" r="1" fill="currentColor" opacity="0.35"/>
      </svg>
      <div className="flex items-baseline gap-0 -ml-0.5">
        <span className={`font-extralight italic text-white/55 ${tSz}`} style={{ letterSpacing: "-0.01em" }}>omply</span>
        <span className={`font-black text-white ${tSz}`} style={{ letterSpacing: "0.07em" }}>ED</span>
      </div>
    </div>
  );
}

// ─── Field ─────────────────────────────────────────────────────────────────────

function Field({ label, type = "text", placeholder, value, onChange, onBlur, error, autoComplete, suffix }) {
  return (
    <div>
      <label className="block text-[11px] font-medium tracking-widest uppercase text-white/40 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          className={`w-full bg-white/[0.05] border rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:bg-white/[0.08] ${
            error
              ? "border-red-500/50 focus:border-red-400/70"
              : "border-white/[0.09] focus:border-white/25"
          } ${suffix ? "pr-12" : ""}`}
        />
        {suffix && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{suffix}</div>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="text-red-400/80 text-[11px] mt-1.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Eye toggle ────────────────────────────────────────────────────────────────

function EyeToggle({ show, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={show ? "Hide password" : "Show password"}
      className="text-white/30 hover:text-white/60 transition-colors duration-150 cursor-pointer"
    >
      {show ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );
}

// ─── Password strength ─────────────────────────────────────────────────────────

function getStrength(pw) {
  if (!pw) return { pct: 0, label: "", color: "transparent" };
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (s <= 1) return { pct: 22, label: "Weak", color: "#ef4444" };
  if (s <= 2) return { pct: 48, label: "Fair", color: "#f97316" };
  if (s <= 3) return { pct: 72, label: "Good", color: "#eab308" };
  return { pct: 100, label: "Strong", color: "#22c55e" };
}

function PasswordStrength({ password }) {
  const { pct, label, color } = getStrength(password);
  if (!password) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="mt-2.5"
    >
      <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          animate={{ width: `${pct}%`, backgroundColor: color }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
        />
      </div>
      <motion.p
        key={label}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="text-[10px] mt-1 text-right"
        style={{ color }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

// ─── Animation tokens ──────────────────────────────────────────────────────────

const stepVariants = {
  enter: (dir) => ({ x: dir * 36, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: (dir) => ({
    x: dir * -36,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 0.6] },
  }),
};

const fieldStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const fieldItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: "easeOut" },
  },
};


// ─── Main component ────────────────────────────────────────────────────────────

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const clearErr = (k) => setErrors((p) => ({ ...p, [k]: "" }));

  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Must be at least 8 characters";
    if (!form.confirm) e.confirm = "Please confirm your password";
    else if (form.confirm !== form.password) e.confirm = "Passwords do not match";
    return e;
  };

  const goNext = () => {
    const e = validateStep1();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setDir(1);
    setStep(2);
  };

  const goBack = () => {
    setErrors({});
    setDir(-1);
    setStep(1);
  };

  const handleSubmit = async () => {
    const e = validateStep2();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setIsLoading(false);
    setDir(1);
    setStep(3);
  };

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
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Logo size="lg" />
            <p className="text-white/28 text-[13px] mt-3 ml-1 tracking-wide">
              Academic Compliance Platform
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-8 right-10 z-10">
          <div className="w-6 h-px bg-white/20 mb-8" />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-white/20 text-[10px] font-medium tracking-[0.2em] uppercase mb-5">
              Our belief
            </p>
            <p className="text-white/72 text-[18px] font-light leading-[1.5] tracking-[-0.015em] max-w-[290px]">
              &ldquo;Where complexity ends,
              <br />confidence begins.&rdquo;
            </p>
            <p className="text-white/22 text-[12px] mt-6 leading-relaxed max-w-[270px]">
              Built for organizations that believe clarity is the foundation of trust.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col bg-[#111018]">

        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-6">
          <div className="lg:hidden"><Logo /></div>
          <div className="hidden lg:block" />
          <Link
            href="/Login"
            className="inline-flex items-center gap-1.5 text-[11px] text-white/35 hover:text-white/65 transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Sign In
          </Link>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-[340px]">

            {/* Progress bar */}
            <AnimatePresence>
              {step < 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-8"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-white/25 tracking-wide">
                      Step {step} of 2
                    </span>
                    <span className="text-[10px] text-white/25 tracking-wide">
                      {step === 1 ? "Account info" : "Security"}
                    </span>
                  </div>
                  <div className="w-full h-px bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white/35 rounded-full"
                      animate={{ width: step === 1 ? "50%" : "100%" }}
                      transition={{ type: "spring", stiffness: 280, damping: 28 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Heading */}
            <div className="mb-8">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={step + "-h"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="text-white text-[22px] font-bold tracking-tight leading-snug mb-2"
                >
                  {step === 1 && "Create your account."}
                  {step === 2 && "Secure your account."}
                  {step === 3 && "You're all set."}
                </motion.h1>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={step + "-sub"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, delay: 0.05 }}
                  className="text-white/35 text-[13px] leading-relaxed"
                >
                  {step === 1 && "Start with your basic information."}
                  {step === 2 && "Choose a strong password to protect your account."}
                  {step === 3 && "Your account is ready. Welcome to ComplyED."}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Steps */}
            <AnimatePresence mode="wait" custom={dir}>

              {/* ── Step 1: Name + Email ── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={dir}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <motion.div
                    variants={fieldStagger}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-4"
                  >
                    <motion.div variants={fieldItem}>
                      <Field
                        label="Full name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => { set("name")(e); clearErr("name"); }}
                        onBlur={() => {
                          if (!form.name.trim())
                            setErrors((p) => ({ ...p, name: "Full name is required" }));
                        }}
                        error={errors.name}
                        autoComplete="name"
                      />
                    </motion.div>

                    <motion.div variants={fieldItem}>
                      <Field
                        label="Email address"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => { set("email")(e); clearErr("email"); }}
                        onBlur={() => {
                          if (!form.email.trim())
                            setErrors((p) => ({ ...p, email: "Email is required" }));
                          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                            setErrors((p) => ({ ...p, email: "Enter a valid email address" }));
                        }}
                        error={errors.email}
                        autoComplete="email"
                      />
                    </motion.div>

                    <motion.div variants={fieldItem}>
                      <motion.button
                        type="button"
                        onClick={goNext}
                        whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.92)" }}
                        whileTap={{ scale: 0.985 }}
                        className="w-full bg-white text-black font-semibold text-sm py-3 rounded-lg mt-1 cursor-pointer transition-colors"
                      >
                        Continue
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* ── Step 2: Password ── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={dir}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <motion.div
                    variants={fieldStagger}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-4"
                  >
                    <motion.div variants={fieldItem}>
                      <Field
                        label="Password"
                        type={showPw ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={form.password}
                        onChange={(e) => { set("password")(e); clearErr("password"); }}
                        onBlur={() => {
                          if (!form.password)
                            setErrors((p) => ({ ...p, password: "Password is required" }));
                          else if (form.password.length < 8)
                            setErrors((p) => ({ ...p, password: "Must be at least 8 characters" }));
                        }}
                        error={errors.password}
                        autoComplete="new-password"
                        suffix={<EyeToggle show={showPw} onToggle={() => setShowPw((v) => !v)} />}
                      />
                      <AnimatePresence>
                        {form.password && (
                          <PasswordStrength password={form.password} />
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div variants={fieldItem}>
                      <Field
                        label="Confirm password"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Repeat your password"
                        value={form.confirm}
                        onChange={(e) => { set("confirm")(e); clearErr("confirm"); }}
                        onBlur={() => {
                          if (!form.confirm)
                            setErrors((p) => ({ ...p, confirm: "Please confirm your password" }));
                          else if (form.confirm !== form.password)
                            setErrors((p) => ({ ...p, confirm: "Passwords do not match" }));
                        }}
                        error={errors.confirm}
                        autoComplete="new-password"
                        suffix={
                          <EyeToggle
                            show={showConfirm}
                            onToggle={() => setShowConfirm((v) => !v)}
                          />
                        }
                      />
                    </motion.div>

                    <motion.div variants={fieldItem} className="flex gap-2.5 mt-1">
                      <motion.button
                        type="button"
                        onClick={goBack}
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.07)" }}
                        whileTap={{ scale: 0.985 }}
                        className="flex-1 border border-white/[0.09] text-white/55 text-sm font-medium py-3 rounded-lg cursor-pointer transition-colors"
                      >
                        Back
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        whileHover={
                          !isLoading
                            ? { scale: 1.01, backgroundColor: "rgba(255,255,255,0.92)" }
                            : {}
                        }
                        whileTap={!isLoading ? { scale: 0.985 } : {}}
                        className="flex-[2] bg-white text-black font-semibold text-sm py-3 rounded-lg cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.svg
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 0.75,
                                ease: "linear",
                                repeat: Infinity,
                                repeatType: "loop",
                              }}
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="3" strokeOpacity="0.2" />
                              <path d="M12 2a10 10 0 0 1 10 10" stroke="black" strokeWidth="3" strokeLinecap="round" />
                            </motion.svg>
                            Creating…
                          </span>
                        ) : (
                          "Create Account"
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* ── Step 3: Success ── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={dir}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-center"
                >
                  {/* Animated checkmark ring */}
                  <motion.div
                    initial={{ scale: 0.55, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.05 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-white/12 bg-white/[0.05] mb-6"
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <motion.path
                        d="M7 14l5 5 9-10"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.85 }}
                        transition={{ duration: 0.42, delay: 0.32, ease: "easeOut" }}
                      />
                    </svg>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.28, ease: "easeOut" }}
                    className="space-y-3"
                  >
                    <p className="text-white/40 text-[13px] leading-relaxed mb-5">
                      Account created for{" "}
                      <span className="text-white/70 font-medium">{form.email}</span>
                    </p>

                    <Link href="/Login" className="block">
                      <motion.div
                        whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.92)" }}
                        whileTap={{ scale: 0.985 }}
                        className="w-full bg-white text-black font-semibold text-sm py-3 rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-2"
                      >
                        Go to Sign In
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M5 3l4 4-4 4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Footer */}
            <AnimatePresence>
              {step < 3 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.35, duration: 0.2 }}
                  className="text-center text-white/20 text-[11px] mt-8 leading-relaxed"
                >
                  By continuing, you agree to our{" "}
                  <a href="#" className="underline underline-offset-2 hover:text-white/45 transition-colors">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline underline-offset-2 hover:text-white/45 transition-colors">
                    Privacy Policy
                  </a>
                  .
                </motion.p>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </div>
  );
}

const BRUSH_C_D =
  "M 27 8 C 22 1, 6 1, 3 12 C 0 17, 0 19, 3 25 C 6 33, 22 34, 27 27 L 22.5 24 C 19 30, 9 28, 7 23 C 5 19.5, 5 17, 7 13 C 9 7, 19 6, 22.5 12 Z";

export default function Logo({ badge }) {
  return (
    <div className="flex items-center gap-1.5 leading-none select-none">
      <div className="flex items-center gap-0">
        <svg width={22} height={20} viewBox="0 0 40 36" fill="none" className="text-white flex-shrink-0" aria-hidden="true">
          <path d={BRUSH_C_D} fill="currentColor" />
          <path d="M 26 7 L 33 3" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" opacity="0.78" />
          <path d="M 28 10 L 36 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.58" />
          <path d="M 27 6 L 32 2" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.42" />
          <circle cx="34" cy="4" r="1" fill="currentColor" opacity="0.35" />
        </svg>
        <div className="flex items-baseline gap-0 -ml-1">
          <span className="text-[15px] font-extralight italic text-white/55" style={{ letterSpacing: "-0.01em" }}>omply</span>
          <span className="text-[15px] font-black text-white/80" style={{ letterSpacing: "0.07em" }}>ED</span>
        </div>
      </div>
      {badge && (
        <span className="text-[9px] font-semibold tracking-widest uppercase text-white/30">{badge}</span>
      )}
    </div>
  );
}

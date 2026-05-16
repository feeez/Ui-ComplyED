// Icon set used across the dashboard. Pure SVG, no hooks → safe to import anywhere.

export const Ic = {
  // ─ App / Navigation ─
  grid: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="1" y="1" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="8.5" y="1" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="1" y="8.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  signout: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M8.5 4V2.5A1.5 1.5 0 0 0 7 1H2.5A1.5 1.5 0 0 0 1 2.5v8A1.5 1.5 0 0 0 2.5 12H7a1.5 1.5 0 0 0 1.5-1.5V9" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round"/>
      <path d="M5 6.5h7M10 4.5l2 2-2 2" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  menu: (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M2.5 5h12M2.5 8.5h12M2.5 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  close: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  // ─ User Dashboard ─
  upload: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M7.5 9.5V2.5M4.5 5.5l3-3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 11.5v1a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  history: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M7.5 4.5v4l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.5 7.5a5 5 0 1 0 .5-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M2.5 4v3H5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  doc: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 2h5.5L11 4.5V12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M8.5 2v3H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.5 7h5M4.5 9.5h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  ),

  // ─ Admin Dashboard ─
  rules: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M2 4h11M2 7.5h7M2 11h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="12.5" cy="11" r="2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M14 12.5l.8.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  users: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="5.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M1 13c0-2.485 2.015-4.5 4.5-4.5S10 10.515 10 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10.5 7a2 2 0 0 0 0-4M14 13c0-1.933-1.567-3.5-3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  back: (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M8 10.5L4 6.5L8 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

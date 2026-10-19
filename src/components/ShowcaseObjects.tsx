/** Placeholder 3D-style objects for the showcase. Swap for renders or model viewers later. */

export function Island() {
  return (
    <svg viewBox="0 0 400 360" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="isl-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5b6e5f" /><stop offset="1" stopColor="#2f3b33" /></linearGradient>
        <linearGradient id="isl-rock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a3a36" /><stop offset="1" stopColor="#141413" /></linearGradient>
      </defs>
      <ellipse cx="200" cy="140" rx="170" ry="44" fill="url(#isl-top)" />
      <path d="M30 140 Q200 200 370 140 L300 230 L240 330 L190 290 L150 340 L90 230 Z" fill="url(#isl-rock)" />
      <path d="M190 140 L190 70" stroke="#262623" strokeWidth="10" />
      <circle cx="190" cy="60" r="48" fill="#46574b" />
      <circle cx="160" cy="76" r="30" fill="#3a4a3f" />
      <rect x="252" y="112" width="22" height="26" fill="#a8322d" />
      <path d="M248 112 L263 100 L278 112 Z" fill="#262623" />
    </svg>
  );
}

export function Lantern() {
  return (
    <svg viewBox="0 0 200 340" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="stone" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#6d6d68" /><stop offset=".55" stopColor="#a9aba8" /><stop offset="1" stopColor="#4b4b47" /></linearGradient>
      </defs>
      <path d="M30 70 L100 20 L170 70 Z" fill="url(#stone)" />
      <rect x="92" y="6" width="16" height="18" rx="6" fill="url(#stone)" />
      <rect x="50" y="70" width="100" height="70" fill="url(#stone)" />
      <rect x="72" y="86" width="56" height="40" fill="#e9b26a" opacity=".9" />
      <rect x="72" y="86" width="56" height="40" fill="#ffd9a0" opacity=".5" filter="blur(6px)" />
      <rect x="40" y="140" width="120" height="16" fill="url(#stone)" />
      <rect x="82" y="156" width="36" height="120" fill="url(#stone)" />
      <rect x="44" y="276" width="112" height="24" rx="4" fill="url(#stone)" />
      <ellipse cx="100" cy="312" rx="80" ry="10" fill="#000" opacity=".35" />
    </svg>
  );
}

export function Creature() {
  return (
    <svg viewBox="0 0 260 260" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id="fur" cx="40%" cy="35%" r="70%"><stop offset="0" stopColor="#f4efe6" /><stop offset="1" stopColor="#b9b2a5" /></radialGradient>
      </defs>
      <path d="M62 92 L52 20 L108 70 Z M198 92 L208 20 L152 70 Z" fill="url(#fur)" />
      <ellipse cx="130" cy="150" rx="100" ry="88" fill="url(#fur)" />
      <circle cx="98" cy="140" r="12" fill="#111110" /><circle cx="162" cy="140" r="12" fill="#111110" />
      <circle cx="102" cy="136" r="4" fill="#fff" /><circle cx="166" cy="136" r="4" fill="#fff" />
      <ellipse cx="78" cy="170" rx="14" ry="8" fill="#a8322d" opacity=".6" /><ellipse cx="182" cy="170" rx="14" ry="8" fill="#a8322d" opacity=".6" />
      <path d="M120 168 Q130 178 140 168" stroke="#111110" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="130" cy="246" rx="80" ry="8" fill="#000" opacity=".35" />
    </svg>
  );
}

export function Materials() {
  const balls = [
    { id: 'lac', a: '#e05a4f', b: '#5a1210', x: 60 },
    { id: 'stn', a: '#c4c5c1', b: '#3b3b38', x: 170 },
    { id: 'ppr', a: '#fffaf0', b: '#a8a093', x: 280 },
  ];
  return (
    <svg viewBox="0 0 340 130" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        {balls.map((b) => (
          <radialGradient key={b.id} id={`m-${b.id}`} cx="35%" cy="30%" r="75%">
            <stop offset="0" stopColor={b.a} />
            <stop offset="1" stopColor={b.b} />
          </radialGradient>
        ))}
      </defs>
      {balls.map((b) => (
        <g key={b.id}>
          <ellipse cx={b.x} cy="118" rx="40" ry="6" fill="#000" opacity=".4" />
          <circle cx={b.x} cy="62" r="48" fill={`url(#m-${b.id})`} />
          <ellipse cx={b.x - 16} cy="40" rx="12" ry="7" fill="#fff" opacity={b.id === 'lac' ? 0.7 : 0.25} />
        </g>
      ))}
    </svg>
  );
}

export function Light() {
  return (
    <svg viewBox="0 0 420 520" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ede7dc" stopOpacity=".55" /><stop offset="1" stopColor="#ede7dc" stopOpacity="0" /></linearGradient>
      </defs>
      <polygon points="180,0 240,0 420,520 0,520" fill="url(#beam)" />
      <polygon points="200,0 220,0 300,520 120,520" fill="url(#beam)" opacity=".6" />
      <circle cx="210" cy="8" r="10" fill="#ede7dc" />
    </svg>
  );
}

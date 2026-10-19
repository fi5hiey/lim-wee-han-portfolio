/**
 * Generated placeholder artwork in the site palette.
 * Replace any art('…') call in projects.ts with a real path such as 'media/ar-aquarium.jpg'.
 */

const C = {
  night: '#111110',
  coal: '#1a1a18',
  sumi: '#282825',
  paper: '#ede7dc',
  ash: '#9e9a92',
  crimson: '#a8322d',
  moss: '#2f3b33',
  moss2: '#46574b',
  silver: '#a9aba8',
};

const GRAIN = `<filter id="g"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .05 0"/></filter>`;
const BLUR = `<filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>`;

function svg(w: number, h: number, body: string, defs = '') {
  const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs>${GRAIN}${BLUR}${defs}</defs>${body}<rect width="${w}" height="${h}" filter="url(#g)"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(s)}`;
}

// deterministic pseudo-random
function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function koi(x: number, y: number, scale: number, rot: number, body: string, spot: string) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${scale})">
    <path d="M0 0 C 60 -40, 165 -32, 215 0 C 165 32, 60 40, 0 0 Z" fill="${body}"/>
    <path d="M210 0 L282 -40 Q256 0 282 40 Z" fill="${body}" opacity=".85"/>
    <path d="M70 -26 L100 -58 L120 -24 Z M70 26 L100 58 L120 24 Z" fill="${body}" opacity=".7"/>
    <ellipse cx="70" cy="-6" rx="26" ry="14" fill="${spot}"/><ellipse cx="140" cy="6" rx="18" ry="10" fill="${spot}"/>
    <circle cx="28" cy="-6" r="4.5" fill="${C.night}"/></g>`;
}

function isoBlock(x: number, y: number, s: number, h: number, top: string, left: string, right: string, stroke: string) {
  const a = `${x},${y}`, b = `${x + s},${y + s / 2}`, c = `${x},${y + s}`, d = `${x - s},${y + s / 2}`;
  return `<polygon points="${x - s},${y + s / 2 - h} ${x},${y - h} ${x + s},${y + s / 2 - h} ${x},${y + s - h}" fill="${top}" stroke="${stroke}" stroke-width="1.5"/>
  <polygon points="${x - s},${y + s / 2 - h} ${x},${y + s - h} ${c} ${d}" fill="${left}"/>
  <polygon points="${x},${y + s - h} ${x + s},${y + s / 2 - h} ${b} ${c}" fill="${right}"/>
  <!-- ${a} -->`;
}

const covers: Record<string, () => string> = {
  aquarium: () =>
    svg(1600, 1000, `
      <rect width="1600" height="1000" fill="url(#rg)"/>
      <circle cx="800" cy="500" r="390" fill="${C.moss2}" opacity=".18"/>
      <circle cx="800" cy="500" r="390" fill="none" stroke="${C.silver}" stroke-opacity=".35" stroke-width="2"/>
      <circle cx="800" cy="500" r="300" fill="none" stroke="${C.silver}" stroke-opacity=".12" stroke-width="1.5"/>
      ${[0, 1, 2, 3, 4].map((i) => `<path d="M${500 + i * 40} ${220 + i * 120} q 120 -30 240 0 t 240 0 t 140 0" stroke="${C.paper}" stroke-opacity=".08" stroke-width="3" fill="none"/>`).join('')}
      ${koi(600, 420, 1.15, -12, C.paper, C.crimson)}
      ${koi(980, 640, 0.8, 168, C.crimson, C.paper)}
      ${koi(760, 690, 0.55, -30, C.paper, C.night)}
      ${[0, 1, 2].map((i) => `<circle cx="1040" cy="330" r="${30 + i * 26}" fill="none" stroke="${C.paper}" stroke-opacity="${0.35 - i * 0.1}"/>`).join('')}
      <path d="M110 150 V100 H160 M1490 150 V100 H1440 M110 850 V900 H160 M1490 850 V900 H1440" stroke="${C.paper}" stroke-opacity=".5" stroke-width="3" fill="none"/>`,
      `<radialGradient id="rg" cx="50%" cy="50%" r="70%"><stop offset="0" stop-color="${C.moss}"/><stop offset="1" stop-color="${C.night}"/></radialGradient>`),

  urban: () => {
    const r = rand(7);
    let blocks = '';
    for (let j = 0; j < 7; j++) {
      for (let i = 0; i < 7; i++) {
        const x = 800 + (i - j) * 92;
        const y = 300 + (i + j) * 46;
        const h = 20 + Math.floor(r() * 7) * 34;
        const hot = i === 3 && j === 2;
        blocks += isoBlock(x, y, 80, h, hot ? C.crimson : '#2b2c29', hot ? '#7d2420' : C.moss, hot ? '#5e1b18' : '#222b25', hot ? C.crimson : 'rgba(169,171,168,.35)');
      }
    }
    return svg(1600, 1000, `
      <rect width="1600" height="1000" fill="url(#lg)"/>
      ${Array.from({ length: 14 }).map((_, i) => `<line x1="0" y1="${820 + i * 14}" x2="1600" y2="${820 + i * 14}" stroke="${C.silver}" stroke-opacity="${0.04 + i * 0.008}"/>`).join('')}
      ${blocks}`,
      `<linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.night}"/><stop offset="1" stop-color="${C.coal}"/></linearGradient>`);
  },

  fishclicker: () =>
    svg(1600, 1000, `
      <rect width="1600" height="1000" fill="${C.paper}"/>
      ${[0, 1, 2, 3].map((i) => `<circle cx="820" cy="500" r="${120 + i * 90}" fill="none" stroke="${C.night}" stroke-opacity="${0.18 - i * 0.04}" stroke-width="${3 - i * 0.5}"/>`).join('')}
      ${koi(560, 500, 1.9, 0, C.night, '#2b2b28')}
      <text x="1140" y="330" font-family="Georgia, serif" font-size="120" font-weight="700" fill="${C.crimson}">+1</text>
      <text x="1220" y="440" font-family="Georgia, serif" font-size="64" fill="${C.crimson}" opacity=".6">+1</text>
      ${Array.from({ length: 10 }).map((_, i) => { const a = (i / 10) * Math.PI * 2; return `<line x1="${820 + Math.cos(a) * 70}" y1="${500 + Math.sin(a) * 70}" x2="${820 + Math.cos(a) * 110}" y2="${500 + Math.sin(a) * 110}" stroke="${C.crimson}" stroke-width="5" stroke-linecap="round"/>`; }).join('')}
      <text x="120" y="900" font-family="Georgia, serif" font-size="44" fill="${C.night}" opacity=".7">1,284 fish</text>`),

  medieval: () =>
    svg(1600, 1000, `
      <rect width="1600" height="1000" fill="url(#sky)"/>
      <circle cx="1130" cy="320" r="120" fill="${C.crimson}" opacity=".9"/>
      <path d="M0 640 L220 470 L380 560 L560 400 L760 560 L980 430 L1200 590 L1400 480 L1600 600 V1000 H0Z" fill="${C.moss}" opacity=".55"/>
      <rect y="560" width="1600" height="120" fill="${C.paper}" opacity=".05" filter="url(#b)"/>
      <path d="M0 760 L300 620 L520 700 L700 560 L900 700 L1150 640 L1600 760 V1000 H0Z" fill="#232b25"/>
      <g fill="${C.night}">
        <rect x="610" y="480" width="60" height="220"/><polygon points="600,480 640,400 680,480"/>
        <rect x="690" y="540" width="200" height="160"/>
        ${Array.from({ length: 6 }).map((_, i) => `<rect x="${690 + i * 36}" y="520" width="20" height="24"/>`).join('')}
        <rect x="900" y="440" width="70" height="260"/><polygon points="890,440 935,340 980,440"/>
        <rect x="560" y="600" width="460" height="120"/>
      </g>
      <path d="M0 860 L400 760 L800 840 L1200 770 L1600 860 V1000 H0Z" fill="${C.night}"/>`,
      `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.night}"/><stop offset=".7" stop-color="${C.moss}"/><stop offset="1" stop-color="${C.coal}"/></linearGradient>`),

  environments: () => {
    const island = (x: number, y: number, s: number, o: number) => `<g transform="translate(${x} ${y}) scale(${s})" opacity="${o}">
      <polygon points="-160,0 160,0 120,24 -120,24" fill="${C.moss2}"/>
      <polygon points="-120,24 120,24 40,170 -20,210 -70,120" fill="${C.sumi}"/>
      <polygon points="-120,24 -70,120 -20,210 -40,24" fill="#1f1f1d"/></g>`;
    const r = rand(3);
    return svg(1600, 1000, `
      <rect width="1600" height="1000" fill="url(#bg2)"/>
      <circle cx="420" cy="240" r="90" fill="${C.paper}" opacity=".85"/>
      <circle cx="420" cy="240" r="200" fill="${C.paper}" opacity=".1" filter="url(#b)"/>
      ${island(1180, 300, 0.6, 0.55)}
      ${island(380, 600, 0.8, 0.8)}
      ${island(860, 520, 1.5, 1)}
      <circle cx="900" cy="440" r="70" fill="${C.moss}"/><rect x="894" y="440" width="12" height="80" fill="${C.sumi}"/>
      <rect x="760" y="490" width="22" height="30" fill="${C.crimson}"/>
      ${Array.from({ length: 40 }).map(() => `<circle cx="${r() * 1600}" cy="${r() * 1000}" r="${1 + r() * 2.5}" fill="${C.paper}" opacity="${0.15 + r() * 0.4}"/>`).join('')}`,
      `<linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.night}"/><stop offset="1" stop-color="#1c211d"/></linearGradient>`);
  },

  uiux: () =>
    svg(1600, 1000, `
      <rect width="1600" height="1000" fill="${C.coal}"/>
      <g transform="translate(260 180) rotate(-4)">
        <rect width="620" height="660" rx="18" fill="${C.sumi}" stroke="${C.silver}" stroke-opacity=".25"/>
        <rect x="40" y="50" width="300" height="34" rx="4" fill="${C.paper}" opacity=".9"/>
        ${[0, 1, 2, 3].map((i) => `<rect x="40" y="${130 + i * 46}" width="${520 - i * 70}" height="12" rx="6" fill="${C.silver}" opacity=".3"/>`).join('')}
        <rect x="40" y="340" width="540" height="200" rx="10" fill="${C.moss}"/>
        <rect x="40" y="580" width="160" height="44" rx="22" fill="${C.crimson}"/>
      </g>
      <g transform="translate(820 280) rotate(3)">
        <rect width="520" height="560" rx="18" fill="${C.paper}"/>
        <circle cx="260" cy="190" r="110" fill="none" stroke="${C.night}" stroke-width="10" stroke-dasharray="520 700"/>
        <text x="260" y="205" text-anchor="middle" font-family="Georgia, serif" font-size="56" fill="${C.night}">72%</text>
        ${[0, 1, 2].map((i) => `<rect x="60" y="${360 + i * 50}" width="400" height="10" rx="5" fill="${C.night}" opacity=".15"/><circle cx="${140 + i * 110}" cy="${365 + i * 50}" r="14" fill="${i === 1 ? C.crimson : C.night}"/>`).join('')}
      </g>`),
};

const lab: Record<string, () => string> = {
  shader: () =>
    svg(800, 1000, `<rect width="800" height="1000" fill="${C.night}"/>${Array.from({ length: 18 }).map((_, i) => `<circle cx="400" cy="520" r="${360 - i * 20}" fill="${i % 2 ? C.moss : C.sumi}" opacity="${0.4 + i * 0.03}"/>`).join('')}<circle cx="400" cy="520" r="60" fill="${C.crimson}"/>`),
  ar: () =>
    svg(800, 1000, `<rect width="800" height="1000" fill="${C.coal}"/><rect x="230" y="180" width="340" height="640" rx="44" fill="none" stroke="${C.silver}" stroke-width="6"/>
      <g transform="translate(400 500)"><polygon points="0,-110 110,-50 0,10 -110,-50" fill="${C.paper}"/><polygon points="-110,-50 0,10 0,130 -110,70" fill="${C.ash}"/><polygon points="0,10 110,-50 110,70 0,130" fill="${C.crimson}"/></g>
      <path d="M260 240 V210 H290 M540 240 V210 H510 M260 760 V790 H290 M540 760 V790 H510" stroke="${C.paper}" stroke-width="3" fill="none" opacity=".6"/>`),
  creature: () =>
    svg(800, 1000, `<rect width="800" height="1000" fill="${C.moss}"/><ellipse cx="400" cy="560" rx="210" ry="180" fill="${C.paper}"/>
      <path d="M250 440 L230 270 L340 390Z M550 440 L570 270 L460 390Z" fill="${C.paper}"/>
      <circle cx="330" cy="540" r="26" fill="${C.night}"/><circle cx="470" cy="540" r="26" fill="${C.night}"/>
      <circle cx="338" cy="532" r="8" fill="${C.paper}"/><circle cx="478" cy="532" r="8" fill="${C.paper}"/>
      <ellipse cx="290" cy="610" rx="30" ry="16" fill="${C.crimson}" opacity=".7"/><ellipse cx="510" cy="610" rx="30" ry="16" fill="${C.crimson}" opacity=".7"/>
      <path d="M380 615 Q400 635 420 615" stroke="${C.night}" stroke-width="7" fill="none" stroke-linecap="round"/>`),
  animation: () =>
    svg(800, 1000, `<rect width="800" height="1000" fill="${C.paper}"/>${Array.from({ length: 9 }).map((_, i) => { const t = i / 8; const x = 120 + t * 560; const y = 780 - Math.sin(t * Math.PI) * 520; return `<circle cx="${x}" cy="${y}" r="${30 + (i === 8 ? 8 : 0)}" fill="${i === 8 ? C.crimson : C.night}" opacity="${0.12 + t * 0.85}"/>`; }).join('')}<line x1="80" y1="830" x2="720" y2="830" stroke="${C.night}" stroke-width="3"/>`),
  sketch: () =>
    svg(800, 1000, `<rect width="800" height="1000" fill="${C.paper}"/>
      <path d="M140 760 C 220 420, 420 260, 660 220" stroke="${C.night}" stroke-width="34" stroke-linecap="round" fill="none" opacity=".9"/>
      <path d="M240 820 C 360 640, 520 560, 680 560" stroke="${C.night}" stroke-width="14" stroke-linecap="round" fill="none" opacity=".55"/>
      <rect x="560" y="740" width="90" height="90" fill="${C.crimson}"/>`),
  uiconcept: () =>
    svg(800, 1000, `<rect width="800" height="1000" fill="${C.sumi}"/>
      <circle cx="400" cy="430" r="190" fill="none" stroke="${C.silver}" stroke-opacity=".3" stroke-width="2"/>
      <circle cx="400" cy="430" r="190" fill="none" stroke="${C.crimson}" stroke-width="10" stroke-dasharray="700 1200" transform="rotate(-90 400 430)"/>
      <text x="400" y="450" text-anchor="middle" font-family="Georgia, serif" font-size="70" fill="${C.paper}">04:12</text>
      <rect x="220" y="720" width="360" height="70" rx="35" fill="${C.paper}"/><circle cx="545" cy="755" r="26" fill="${C.crimson}"/>`),
  visual: () =>
    svg(800, 1000, `<rect width="800" height="1000" fill="${C.night}"/>${Array.from({ length: 5 }).map((_, i) => `<line x1="${120 + i * 140}" y1="120" x2="${120 + i * 140}" y2="880" stroke="${C.paper}" stroke-opacity=".35"/>`).join('')}${Array.from({ length: 6 }).map((_, i) => `<line x1="120" y1="${120 + i * 152}" x2="680" y2="${120 + i * 152}" stroke="${C.paper}" stroke-opacity=".35"/>`).join('')}<rect x="400" y="424" width="140" height="152" fill="${C.crimson}"/>`),
};

export function art(name: string): string {
  const fn = covers[name] || lab[name];
  return fn ? fn() : covers.environments();
}

/** Resolve a local path against the deploy base so it works on GitHub Pages sub-paths. */
export function asset(path: string | undefined): string | undefined {
  if (!path || /^(data:|https?:|blob:)/.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

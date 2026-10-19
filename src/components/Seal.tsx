/** Red hanko-style seal with 林 (Lim). Used as the logo mark and an easter egg. */
export default function Seal({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="2" y="2" width="36" height="36" rx="5" fill="rgb(var(--crimson))" />
      <rect x="5" y="5" width="30" height="30" rx="3" fill="none" stroke="rgb(var(--paper))" strokeOpacity=".55" strokeWidth="1" />
      <text x="20" y="21" textAnchor="middle" dominantBaseline="middle" fontFamily="'Yuji Syuku', 'Shippori Mincho B1', serif" fontSize="21" fill="rgb(var(--paper))">
        林
      </text>
    </svg>
  );
}

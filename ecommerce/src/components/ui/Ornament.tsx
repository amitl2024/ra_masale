/** Small diamond flourish used between rules. */
export function Ornament({ className = "", width = 140 }: { className?: string; width?: number }) {
  return (
    <svg viewBox="0 0 140 12" width={width} height={(width / 140) * 12} className={className} aria-hidden>
      <g stroke="currentColor" strokeWidth="0.8" fill="none">
        <line x1="0" y1="6" x2="54" y2="6" />
        <line x1="86" y1="6" x2="140" y2="6" />
        <path d="M58 6 L62 2 L66 6 L62 10 Z M74 6 L78 2 L82 6 L78 10 Z" />
      </g>
      <path d="M66 6 L70 1.5 L74 6 L70 10.5 Z" fill="currentColor" />
    </svg>
  );
}

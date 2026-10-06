const STAR = "M6 .8l1.55 3.3 3.6.42-2.66 2.46.7 3.56L6 8.77 2.8 10.54l.7-3.56L.85 4.52l3.6-.42z";

export function Stars({ rating, size = 12, className = "" }: { rating: number; size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[2px] text-gold ${className}`} role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 12 12" aria-hidden>
            <path d={STAR} fill="none" stroke="currentColor" strokeWidth=".8" />
            <path d={STAR} fill="currentColor" style={{ clipPath: `inset(0 ${100 - fill * 100}% 0 0)` }} />
          </svg>
        );
      })}
    </span>
  );
}

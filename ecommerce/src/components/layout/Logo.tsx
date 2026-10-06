import Link from "next/link";

export function Logo({ tone = "ink", compact = false }: { tone?: "ink" | "ivory"; compact?: boolean }) {
  const color = tone === "ivory" ? "text-ivory" : "text-ink";
  return (
    <Link href="/" aria-label="RA Masale — home" className={`group inline-flex flex-col items-center py-2 leading-none ${color}`}>
      <span className="flex items-center gap-1.5 min-[380px]:gap-2.5">
        <svg viewBox="0 0 40 40" className={compact ? "h-6 w-6 sm:h-7 sm:w-7" : "h-7 w-7 sm:h-9 sm:w-9"} aria-hidden>
          <path d="M20 1.5 38.5 20 20 38.5 1.5 20Z" fill="var(--color-chilli)" />
          <path d="M20 5 35 20 20 35 5 20Z" fill="none" stroke="var(--color-turmeric)" strokeWidth=".8" />
          <text
            x="20"
            y="24.6"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--color-ivory)"
            style={{ fontFamily: "var(--font-display)" }}
          >
            RA
          </text>
        </svg>
        <span
          className={`font-display font-semibold whitespace-nowrap ${
            compact ? "text-[1rem] tracking-[0.1em] min-[380px]:text-[1.15rem] min-[380px]:tracking-[0.14em] sm:text-[1.3rem] sm:tracking-[0.18em]" : "text-[1rem] tracking-[0.1em] min-[380px]:text-[1.15rem] min-[380px]:tracking-[0.14em] sm:text-[1.8rem] sm:tracking-[0.2em]"
          }`}
        >
          RA MASALE
        </span>
      </span>
      {!compact && (
        <span className="mt-1.5 hidden items-center gap-2 text-[0.52rem] tracking-[0.42em] uppercase opacity-70 sm:flex">
          <span className="h-px w-6 bg-current" />
          Sangli · Est. 1972
          <span className="h-px w-6 bg-current" />
        </span>
      )}
    </Link>
  );
}

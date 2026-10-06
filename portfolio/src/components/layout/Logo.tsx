import Link from "next/link";

export function Logo({
  tone = "ink",
  compact = false,
  align = "center",
}: {
  tone?: "ink" | "ivory";
  compact?: boolean;
  align?: "center" | "start";
}) {
  const color = tone === "ivory" ? "text-ivory" : "text-ink";
  return (
    <Link
      href="/"
      aria-label="RA Masale — home"
      className={`group inline-flex shrink-0 flex-col py-2 leading-none ${align === "start" ? "items-start" : "items-center"} ${color}`}
    >
      <span className="flex items-center gap-2 min-[380px]:gap-2.5">
        <svg viewBox="0 0 40 40" className={compact ? "h-6 w-6 min-[380px]:h-7 min-[380px]:w-7" : "h-7 w-7 min-[380px]:h-8 min-[380px]:w-8 md:h-9 md:w-9"} aria-hidden>
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
        <span className="flex flex-col">
          <span
            className={`font-display font-semibold whitespace-nowrap ${
              compact ? "text-[1.02rem] tracking-[0.1em] min-[380px]:text-[1.15rem] min-[380px]:tracking-[0.14em] md:text-[1.25rem]" : "text-[1.02rem] tracking-[0.1em] min-[380px]:text-[1.2rem] min-[380px]:tracking-[0.14em] md:text-[1.5rem] md:tracking-[0.18em]"
            }`}
          >
            RA MASALE
          </span>
          {!compact && (
            <span className="mt-1 hidden text-[0.5rem] tracking-[0.34em] uppercase opacity-65 min-[380px]:block md:text-[0.55rem]">
              Food Products · Est. 1972
            </span>
          )}
        </span>
      </span>
    </Link>
  );
}

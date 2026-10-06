import type { ReactNode } from "react";

export function VegMark({ className = "", label = true }: { className?: string; label?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[0.68rem] tracking-[0.14em] text-leaf uppercase ${className}`}>
      <span className="grid h-3.5 w-3.5 place-items-center border border-[#2F7A3A]" aria-hidden>
        <span className="h-1.5 w-1.5 rounded-full bg-[#2F7A3A]" />
      </span>
      <span className={label ? "" : "sr-only"}>Vegetarian</span>
    </span>
  );
}

export function HeatMeter({ level, className = "" }: { level: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[3px] ${className}`} role="img" aria-label={`Heat ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="8" height="12" viewBox="0 0 8 12" aria-hidden>
          <path
            d="M4 .5c.4 1 .2 1.6 1 2 1.6.8 2.5 2.6 2.5 4.6C7.5 9.6 6 11.5 4 11.5S.5 9.6.5 7.1C.5 5.3 1.6 3.4 3 2.6 3.6 2.2 3.7 1.4 4 .5z"
            fill={i < level ? "var(--color-chilli)" : "none"}
            stroke="var(--color-chilli)"
            strokeWidth=".8"
          />
        </svg>
      ))}
    </span>
  );
}

const TONES = {
  chilli: "bg-chilli text-ivory",
  ink: "bg-ink text-ivory",
  leaf: "bg-leaf text-ivory",
  gold: "bg-turmeric text-ink",
} as const;

export function Badge({ children, tone = "chilli" }: { children: ReactNode; tone?: keyof typeof TONES }) {
  return (
    <span className={`inline-block shrink-0 px-1.5 py-[5px] text-[0.6rem] leading-none font-semibold tracking-[0.1em] whitespace-nowrap uppercase sm:px-2 sm:text-[0.58rem] sm:tracking-[0.2em] ${TONES[tone]}`}>
      {children}
    </span>
  );
}

export const badgeTone = (b?: string): keyof typeof TONES =>
  b === "Signature" ? "ink" : b === "New" ? "leaf" : b === "Limited" ? "gold" : "chilli";

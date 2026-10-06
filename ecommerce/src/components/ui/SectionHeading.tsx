import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Editorial heading with a chapter marker, e.g. "Chapter II — The House Blends". */
export function SectionHeading({
  chapter,
  eyebrow,
  title,
  intro,
  align = "left",
  action,
  tone = "dark",
  as: H = "h2",
}: {
  chapter?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  tone?: "dark" | "light";
  as?: "h1" | "h2";
}) {
  const center = align === "center";
  const sub = tone === "light" ? "text-ivory/70" : "text-muted";
  const accent = tone === "light" ? "text-turmeric" : "text-chilli";
  return (
    <Reveal
      className={`flex flex-col gap-6 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}
    >
      <div className="max-w-2xl">
        {(chapter || eyebrow) && (
          <p className={`eyebrow mb-4 flex items-center gap-3 ${accent} ${center ? "justify-center" : ""}`}>
            {chapter && <span className="font-display text-[0.95rem] tracking-normal normal-case italic">{chapter}</span>}
            {chapter && eyebrow && <span className="h-px w-8 bg-current opacity-50" />}
            {eyebrow && <span>{eyebrow}</span>}
          </p>
        )}
        <H className="font-headline text-display-md leading-[1.04] tracking-[-0.01em] text-balance">{title}</H>
        {intro && (
          <p className={`mt-4 max-w-xl text-[0.98rem] leading-relaxed ${sub} ${center ? "mx-auto" : ""}`}>{intro}</p>
        )}
      </div>
      {action && <div className="w-full shrink-0 md:w-auto">{action}</div>}
    </Reveal>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { journey } from "@/lib/data/site";

/**
 * Scroll-driven journey timeline. The rule fills as you read, and each
 * milestone lights up when it reaches the middle of the screen.
 */
export function Timeline({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(-1);
  const light = tone === "light";

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let raf = 0;
    const update = () => {
      const r = list.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      setProgress(Math.max(0, Math.min(1, (mid - r.top) / r.height)));
      const items = [...list.querySelectorAll<HTMLElement>("[data-step]")];
      let a = -1;
      items.forEach((el, i) => {
        if (el.getBoundingClientRect().top < mid) a = i;
      });
      setActive(a);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const rail = light ? "bg-ivory/15" : "bg-rule";
  const fill = light ? "bg-turmeric" : "bg-chilli";
  const sub = light ? "text-ivory/65" : "text-ink-soft";
  const accent = light ? "text-turmeric" : "text-chilli";

  return (
    <ol ref={listRef} className="relative mx-auto max-w-5xl">
      <span className={`absolute top-0 bottom-0 left-[11px] w-px md:left-1/2 ${rail}`} aria-hidden />
      <span
        className={`absolute top-0 left-[11px] w-px origin-top md:left-1/2 ${fill}`}
        style={{ height: `${progress * 100}%`, transition: "height 120ms linear" }}
        aria-hidden
      />
      {journey.map((t, i) => {
        const on = i <= active;
        const right = i % 2 === 1;
        return (
          <li
            key={t.title}
            data-step
            className={`relative pb-14 pl-12 last:pb-0 md:w-1/2 md:pl-0 ${right ? "md:ml-auto md:pl-16" : "md:pr-16 md:text-right"}`}
          >
            <span
              className={`absolute top-1 left-[11px] grid h-6 w-6 -translate-x-1/2 rotate-45 place-items-center border transition-colors duration-500 ${
                on ? `${light ? "border-turmeric bg-turmeric" : "border-chilli bg-chilli"}` : `${light ? "border-ivory/30 bg-ink" : "border-rule bg-paper"}`
              } ${right ? "md:left-0" : "md:right-0 md:left-auto md:translate-x-1/2"}`}
              aria-hidden
            >
              <span className={`h-1.5 w-1.5 ${on ? (light ? "bg-ink" : "bg-ivory") : light ? "bg-ivory/30" : "bg-rule"}`} />
            </span>
            <div className={`transition-all duration-700 ease-out-soft ${on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-45"}`}>
              <p className={`font-headline text-[2.4rem] leading-none sm:text-[3rem] ${accent}`}>{t.year}</p>
              <p className={`eyebrow mt-3 ${light ? "text-ivory/60" : "text-muted"}`}>{t.label}</p>
              <h3 className="mt-2 font-display text-[1.35rem] leading-tight sm:text-[1.55rem]">{t.title}</h3>
              <p className={`mt-3 text-[0.95rem] leading-relaxed ${sub}`}>{t.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

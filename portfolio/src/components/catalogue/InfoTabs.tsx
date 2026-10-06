"use client";

import { useState, type ReactNode } from "react";

/** Product information tabs. Tabs are horizontally scrollable on phones. */
export function InfoTabs({ tabs }: { tabs: { id: string; label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  if (tabs.length === 0) return null;
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  return (
    <div>
      <div className="rail rail-inset gap-6 border-b border-rule sm:mx-0 sm:px-0 sm:after:hidden" role="tablist" aria-label="Product information">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={t.id === current.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={`relative min-h-12 text-[0.68rem] font-semibold tracking-[0.16em] whitespace-nowrap uppercase transition-colors ${
              t.id === current.id ? "text-chilli" : "text-ink-soft hover:text-ink"
            }`}
          >
            {t.label}
            <span
              className={`absolute inset-x-0 -bottom-px h-0.5 transition-transform duration-300 ${t.id === current.id ? "scale-x-100 bg-chilli" : "scale-x-0 bg-chilli"}`}
            />
          </button>
        ))}
      </div>
      <div key={current.id} id={`panel-${current.id}`} role="tabpanel" aria-labelledby={`tab-${current.id}`} className="hero-in pt-6 text-[0.96rem] leading-relaxed text-ink-soft">
        {current.content}
      </div>
    </div>
  );
}

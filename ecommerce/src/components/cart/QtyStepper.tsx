"use client";

import { MinusIcon, PlusIcon } from "@/components/ui/Icons";

export function QtyStepper({
  value,
  onChange,
  label,
  min = 0,
  size = "sm",
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
  min?: number;
  size?: "sm" | "lg";
}) {
  const h = size === "lg" ? "h-12" : "h-10";
  const w = size === "lg" ? "w-12" : "w-10";
  return (
    <div className={`inline-flex items-center border border-rule ${h}`} role="group" aria-label={`Quantity for ${label}`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`grid ${h} ${w} place-items-center transition-colors hover:bg-paper`}
        aria-label="Decrease quantity"
      >
        <MinusIcon width={14} height={14} />
      </button>
      <span className="oldstyle w-8 text-center font-display text-[1.1rem] font-semibold" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(20, value + 1))}
        className={`grid ${h} ${w} place-items-center transition-colors hover:bg-paper`}
        aria-label="Increase quantity"
      >
        <PlusIcon width={14} height={14} />
      </button>
    </div>
  );
}

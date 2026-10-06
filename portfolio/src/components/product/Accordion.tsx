import type { ReactNode } from "react";
import { PlusIcon } from "@/components/ui/Icons";

/** Native <details> accordion — accessible and works without JS. */
export function Accordion({ items }: { items: { title: string; body: ReactNode; open?: boolean }[] }) {
  return (
    <div className="border-t border-rule">
      {items.map((it) => (
        <details key={it.title} open={it.open} className="group border-b border-rule">
          <summary className="flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
            <span className="font-display text-[1.15rem]">{it.title}</span>
            <PlusIcon width={18} height={18} className="transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <div className="pb-6 text-[0.94rem] leading-relaxed text-ink-soft">{it.body}</div>
        </details>
      ))}
    </div>
  );
}

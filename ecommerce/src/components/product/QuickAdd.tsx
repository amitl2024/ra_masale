"use client";

import { useCart } from "@/lib/cart";
import { PlusIcon } from "@/components/ui/Icons";

export function QuickAdd({ slug, size, name }: { slug: string; size: string; name: string }) {
  const { add } = useCart();
  return (
    <button
      type="button"
      onClick={() => add(slug, size)}
      className="inline-flex h-10 min-w-10 items-center justify-center gap-1.5 border border-ink px-3 text-[0.64rem] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 hover:bg-ink hover:text-ivory sm:px-3.5"
      aria-label={`Add ${name} (${size}) to bag`}
    >
      <PlusIcon width={14} height={14} />
      <span className="hidden min-[360px]:inline">Add</span>
    </button>
  );
}

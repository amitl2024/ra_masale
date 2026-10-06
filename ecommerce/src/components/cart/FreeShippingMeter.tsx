"use client";

import { useCart } from "@/lib/cart";
import { shipping } from "@/lib/data/site";
import { formatPrice } from "@/lib/format";

export function FreeShippingMeter() {
  const { subtotal, toFreeShipping } = useCart();
  const pct = Math.min(100, (subtotal / shipping.freeAbove) * 100);
  return (
    <div>
      <p className="text-[0.85rem]">
        {toFreeShipping > 0 ? (
          <>
            You are <strong className="font-semibold text-chilli">{formatPrice(toFreeShipping)}</strong> away from complimentary shipping.
          </>
        ) : (
          <>
            <span className="font-display text-[1.05rem] italic">Splendid —</span> your order ships free.
          </>
        )}
      </p>
      <div className="mt-2.5 h-[3px] w-full bg-rule/70">
        <div className="h-full bg-chilli transition-[width] duration-700 ease-out-soft" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

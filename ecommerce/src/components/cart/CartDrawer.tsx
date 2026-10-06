"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { CloseIcon } from "@/components/ui/Icons";
import { CartLineItem } from "./CartLineItem";
import { FreeShippingMeter } from "./FreeShippingMeter";
import { tint } from "@/components/product/PackArt";
import { ProductVisual } from "@/components/product/ProductVisual";
import { getProduct } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";

const suggestions = ["chaat-masala", "kanda-lasun-chutney", "pav-bhaji-masala", "urad-papad", "mango-pickle"];

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, count, add } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const inBag = new Set(lines.map((l) => l.slug));
  const extras = suggestions.filter((s) => !inBag.has(s)).slice(0, 2).map((s) => getProduct(s)!);

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? "visible" : "invisible"}`} role="dialog" aria-modal="true" aria-label="Your bag">
      <button
        type="button"
        aria-label="Close bag"
        onClick={close}
        className={`absolute inset-0 bg-ink/45 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        className={`absolute inset-y-0 right-0 flex w-full max-w-[28rem] flex-col bg-ivory shadow-2xl transition-transform duration-500 ease-out-soft ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-rule px-5 py-4 sm:px-7">
          <h2 className="font-display text-[1.6rem] font-medium">
            Your Bag <span className="oldstyle text-[1.1rem] text-muted italic">({count})</span>
          </h2>
          <button type="button" onClick={close} className="-mr-2 grid h-11 w-11 place-items-center" aria-label="Close bag">
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="font-display text-[1.8rem] leading-tight italic">Your bag is empty.</p>
            <p className="mt-3 text-[0.92rem] text-muted">Start with a house favourite — Goda Masala is where most kitchens begin.</p>
            <Link href="/shop" onClick={close} className="btn btn-primary mt-8">
              Browse the pantry
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-rule/70 px-5 py-4 sm:px-7">
              <FreeShippingMeter />
            </div>
            <div className="flex-1 overflow-y-auto px-5 sm:px-7">
              <ul className="divide-y divide-rule/70">
                {lines.map((l) => (
                  <CartLineItem key={`${l.slug}-${l.size}`} line={l} onNavigate={close} />
                ))}
              </ul>
              {extras.length > 0 && (
                <div className="mt-2 mb-6 border-t border-rule pt-5">
                  <p className="eyebrow mb-3 text-chilli">Complete the thali</p>
                  <ul className="grid grid-cols-2 gap-3">
                    {extras.map((p) => (
                      <li key={p.slug} className="flex flex-col border border-rule/80 p-3">
                        <div className="grid h-24 place-items-center" style={{ background: tint(p.art.base, 0.1) }}>
                          <ProductVisual product={p} sizes="96px" shadow={false} className="h-[5.25rem] w-16" />
                        </div>
                        <p className="mt-2 font-display text-[1rem] leading-tight font-semibold">{p.name}</p>
                        <p className="text-[0.75rem] text-muted">{formatPrice(p.packSizes[0].price)}</p>
                        <button
                          type="button"
                          onClick={() => add(p.slug, p.packSizes[0].label)}
                          className="mt-2 border border-ink py-2 text-[0.62rem] tracking-[0.2em] uppercase transition-colors hover:bg-ink hover:text-ivory"
                        >
                          Add
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="border-t border-rule bg-paper/60 px-5 py-5 sm:px-7">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow text-ink-soft">Subtotal</span>
                <span className="font-display text-[1.6rem] font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-[0.78rem] text-muted">Taxes included. Shipping calculated at checkout.</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link href="/cart" onClick={close} className="btn btn-outline">
                  View bag
                </Link>
                <Link href="/checkout" onClick={close} className="btn btn-primary">
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

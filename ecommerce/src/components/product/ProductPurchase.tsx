"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { QtyStepper } from "@/components/cart/QtyStepper";
import { CheckIcon, GiftIcon, ShieldIcon, TruckIcon } from "@/components/ui/Icons";
import { formatPrice } from "@/lib/format";
import { shipping } from "@/lib/data/site";

export function ProductPurchase({ product }: { product: Product }) {
  const router = useRouter();
  const { add } = useCart();
  const [size, setSize] = useState(product.packSizes[Math.min(1, product.packSizes.length - 1)].label);
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState("");
  const [pinResult, setPinResult] = useState<string | null>(null);
  const [showBar, setShowBar] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  const pack = product.packSizes.find((s) => s.label === size)!;
  const off = pack.mrp > pack.price ? Math.round(((pack.mrp - pack.price) / pack.mrp) * 100) : 0;
  const soldOut = product.availability === "out-of-stock";

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const checkPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pin)) return setPinResult("Please enter a valid 6-digit pincode.");
    const local = pin.startsWith("41") || pin.startsWith("40");
    setPinResult(local ? "Delivers in 2–3 days · Cash on delivery available" : "Delivers in 4–6 days · Cash on delivery available");
  };

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span className="font-display text-[2.1rem] leading-none font-bold">{formatPrice(pack.price)}</span>
        {off > 0 && (
          <>
            <s className="text-[1rem] text-muted">MRP {formatPrice(pack.mrp)}</s>
            <span className="text-[0.72rem] font-semibold tracking-[0.14em] text-leaf uppercase">Save {off}%</span>
          </>
        )}
      </div>
      <p className="mt-1.5 text-[0.75rem] text-muted">Inclusive of all taxes</p>

      {/* pack sizes */}
      <fieldset className="mt-8">
        <legend className="eyebrow mb-3 text-ink-soft">
          Pack size · <span className="text-ink">{size}</span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {product.packSizes.map((s) => {
            const on = s.label === size;
            return (
              <label
                key={s.label}
                className={`relative min-w-[6.5rem] cursor-pointer border px-4 py-3 text-center transition-colors ${
                  on ? "border-ink bg-ink text-ivory" : "border-rule bg-ivory hover:border-ink/50"
                }`}
              >
                <input type="radio" name="pack" value={s.label} checked={on} onChange={() => setSize(s.label)} className="sr-only" />
                <span className="block text-[0.9rem] font-medium">{s.label}</span>
                <span className={`block text-[0.75rem] ${on ? "text-ivory/70" : "text-muted"}`}>{formatPrice(s.price)}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div ref={ctaRef} className="mt-8 flex flex-wrap gap-3">
        <QtyStepper value={qty} onChange={setQty} min={1} label={product.name} size="lg" />
        <button
          type="button"
          disabled={soldOut}
          onClick={() => add(product.slug, size, qty)}
          className="btn btn-primary min-h-12 flex-1"
        >
          {soldOut ? "Sold out" : `Add to bag — ${formatPrice(pack.price * qty)}`}
        </button>
        <button
          type="button"
          disabled={soldOut}
          onClick={() => {
            add(product.slug, size, qty);
            router.push("/checkout");
          }}
          className="btn btn-outline min-h-12 w-full"
        >
          Buy it now
        </button>
      </div>

      {product.availability === "low-stock" && (
        <p className="mt-4 flex items-center gap-2 text-[0.82rem] text-chilli">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-chilli" /> Only a few packs left from this batch
        </p>
      )}

      {/* pincode */}
      <form onSubmit={checkPin} className="mt-8 border-t border-rule pt-6">
        <label htmlFor="pin" className="eyebrow mb-3 block text-ink-soft">
          Check delivery
        </label>
        <div className="flex border border-rule bg-ivory">
          <input
            id="pin"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter pincode"
            className="h-12 w-full min-w-0 bg-transparent px-4 text-base outline-none"
          />
          <button type="submit" className="px-5 text-[0.68rem] font-semibold tracking-[0.18em] text-chilli uppercase">
            Check
          </button>
        </div>
        {pinResult && (
          <p className="mt-2.5 flex items-center gap-2 text-[0.82rem] text-ink-soft" aria-live="polite">
            <CheckIcon width={15} height={15} className="text-leaf" /> {pinResult}
          </p>
        )}
      </form>

      <ul className="mt-6 grid grid-cols-3 gap-3 text-center text-[0.72rem] leading-snug text-ink-soft">
        <li className="flex flex-col items-center gap-2 border border-rule/70 px-2 py-4">
          <TruckIcon className="text-chilli" />
          Free shipping over ₹{shipping.freeAbove}
        </li>
        <li className="flex flex-col items-center gap-2 border border-rule/70 px-2 py-4">
          <ShieldIcon className="text-chilli" />
          Sealed for freshness
        </li>
        <li className="flex flex-col items-center gap-2 border border-rule/70 px-2 py-4">
          <GiftIcon className="text-chilli" />
          Gift notes at checkout
        </li>
      </ul>

      {/* mobile sticky bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-ivory/95 px-4 py-3 backdrop-blur transition-transform duration-500 ease-out-soft lg:hidden ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!showBar}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[1rem] font-bold">{product.name}</p>
            <p className="text-[0.75rem] text-muted">
              {size} · {formatPrice(pack.price)}
            </p>
          </div>
          <button
            type="button"
            tabIndex={showBar ? 0 : -1}
            disabled={soldOut}
            onClick={() => add(product.slug, size, qty)}
            className="btn btn-primary !px-5"
          >
            Add to bag
          </button>
        </div>
      </div>
    </div>
  );
}

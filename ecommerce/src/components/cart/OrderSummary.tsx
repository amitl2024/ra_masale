"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { shipping } from "@/lib/data/site";

/** Demo coupon codes */
const COUPONS: Record<string, number> = { SANGLI10: 0.1, FIRSTJAR: 0.15 };

export function useCoupon() {
  const [code, setCode] = useState<string | null>(null);
  const rate = code ? COUPONS[code] ?? 0 : 0;
  return { code, rate, apply: (c: string) => (COUPONS[c] ? (setCode(c), true) : false), clear: () => setCode(null) };
}

export function OrderSummary({
  express = false,
  coupon,
  children,
}: {
  express?: boolean;
  coupon: ReturnType<typeof useCoupon>;
  children?: React.ReactNode;
}) {
  const { subtotal, savings, shippingFee } = useCart();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const discount = Math.round(subtotal * coupon.rate);
  const ship = express ? shipping.express : shippingFee;
  const total = subtotal - discount + ship;
  const applyCode = () => {
    const ok = coupon.apply(input.trim().toUpperCase());
    setError(ok ? "" : "That code isn’t valid. Try SANGLI10.");
  };

  return (
    <div className="border border-rule bg-ivory p-6 sm:p-8">
      <h2 className="font-display text-[1.5rem]">Order summary</h2>
      <dl className="mt-6 space-y-3 text-[0.92rem]">
        <Row label="Subtotal" value={formatPrice(subtotal)} />
        {savings > 0 && <Row label="You save on MRP" value={`– ${formatPrice(savings)}`} tone="text-leaf" />}
        {discount > 0 && <Row label={`Code ${coupon.code}`} value={`– ${formatPrice(discount)}`} tone="text-leaf" />}
        <Row label={express ? "Express shipping" : "Shipping"} value={ship === 0 ? "Complimentary" : formatPrice(ship)} />
      </dl>

      <div className="mt-6 border-t border-rule pt-5">
        {coupon.code ? (
          <p className="flex items-center justify-between text-[0.85rem]">
            <span>
              Code <strong className="font-semibold">{coupon.code}</strong> applied
            </span>
            <button type="button" onClick={coupon.clear} className="link-underline text-muted">
              Remove
            </button>
          </p>
        ) : (
          // not a <form>: this summary is also rendered inside the checkout form
          <div>
            <label htmlFor="coupon" className="label">
              Gift card or discount code
            </label>
            <div className="flex">
              <input
                id="coupon"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    applyCode();
                  }
                }}
                className="field"
                placeholder="SANGLI10"
              />
              <button type="button" onClick={applyCode} className="btn btn-dark !min-h-12 shrink-0">
                Apply
              </button>
            </div>
            {error && <p className="mt-2 text-[0.8rem] text-chilli">{error}</p>}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-baseline justify-between border-t border-ink pt-5">
        <span className="eyebrow">Total</span>
        <span className="font-display text-[1.9rem] font-bold">{formatPrice(total)}</span>
      </div>
      <p className="mt-1 text-right text-[0.75rem] text-muted">Inclusive of all taxes</p>
      {children}
    </div>
  );
}

function Row({ label, value, tone = "" }: { label: string; value: string; tone?: string }) {
  return (
    <div className={`flex justify-between ${tone}`}>
      <dt className={tone ? "" : "text-ink-soft"}>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

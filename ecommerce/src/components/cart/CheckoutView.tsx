"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart";
import { OrderSummary, useCoupon } from "./OrderSummary";
import { tint } from "@/components/product/PackArt";
import { ProductVisual } from "@/components/product/ProductVisual";
import { formatPrice } from "@/lib/format";
import { shipping } from "@/lib/data/site";
import { ShieldIcon } from "@/components/ui/Icons";

const states = [
  "Maharashtra", "Karnataka", "Goa", "Gujarat", "Madhya Pradesh", "Telangana", "Andhra Pradesh", "Tamil Nadu",
  "Kerala", "Delhi", "Rajasthan", "Uttar Pradesh", "West Bengal", "Punjab", "Haryana", "Other",
];

const payments = [
  { value: "upi", label: "UPI", note: "GPay, PhonePe, Paytm & more" },
  { value: "card", label: "Credit / Debit card", note: "Visa, Mastercard, RuPay" },
  { value: "netbanking", label: "Net banking", note: "All major Indian banks" },
  { value: "cod", label: "Cash on delivery", note: "₹30 handling fee may apply" },
];

export function CheckoutView() {
  const router = useRouter();
  const { lines, ready, clear } = useCart();
  const coupon = useCoupon();
  const [express, setExpress] = useState(false);
  const [payment, setPayment] = useState("upi");
  const [gift, setGift] = useState(false);
  const [placing, setPlacing] = useState(false);

  if (ready && lines.length === 0 && !placing) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="font-headline text-display-md">Nothing to check out yet.</h1>
        <Link href="/shop" className="btn btn-primary mt-8">
          Browse the pantry
        </Link>
      </div>
    );
  }

  const placeOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPlacing(true);
    const order = `RA${Date.now().toString().slice(-7)}`;
    setTimeout(() => {
      clear();
      router.push(`/checkout/success?order=${order}`);
    }, 900);
  };

  return (
    <div className="container-x py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-6">
        <h1 className="font-headline text-display-lg leading-none">Checkout</h1>
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.62rem] tracking-[0.14em] text-muted uppercase sm:text-[0.68rem] sm:tracking-[0.18em]">
          <li>
            <Link href="/cart" className="link-underline">Bag</Link>
          </li>
          <li aria-hidden>—</li>
          <li className="text-ink">Details &amp; payment</li>
          <li aria-hidden>—</li>
          <li>Confirmation</li>
        </ol>
      </div>

      <form onSubmit={placeOrder} className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 space-y-12 lg:col-span-7">
          <Step n="I" title="Contact">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" name="email" type="email" autoComplete="email" required className="sm:col-span-2" />
              <Field label="Mobile number" name="phone" type="tel" autoComplete="tel" inputMode="tel" required pattern="[0-9+ ]{10,14}" className="sm:col-span-2" />
            </div>
            <label className="mt-4 flex items-center gap-3 text-[0.85rem] text-ink-soft">
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-[var(--color-chilli)]" />
              Send me order updates on WhatsApp
            </label>
          </Step>

          <Step n="II" title="Delivery address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" name="firstName" autoComplete="given-name" required />
              <Field label="Last name" name="lastName" autoComplete="family-name" required />
              <Field label="Address" name="address1" autoComplete="address-line1" required className="sm:col-span-2" />
              <Field label="Apartment, landmark (optional)" name="address2" autoComplete="address-line2" className="sm:col-span-2" />
              <Field label="City" name="city" autoComplete="address-level2" required />
              <Field label="Pincode" name="pincode" autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required />
              <div className="sm:col-span-2">
                <label className="label" htmlFor="state">
                  State
                </label>
                <select id="state" name="state" className="field" defaultValue="Maharashtra" autoComplete="address-level1">
                  {states.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </Step>

          <Step n="III" title="Delivery method">
            <div className="grid gap-3">
              <Choice
                name="shipping"
                checked={!express}
                onChange={() => setExpress(false)}
                title="Standard delivery"
                note="4–6 working days"
                aside={`Free above ₹${shipping.freeAbove}`}
              />
              <Choice
                name="shipping"
                checked={express}
                onChange={() => setExpress(true)}
                title="Express delivery"
                note="1–3 working days in Maharashtra"
                aside={formatPrice(shipping.express)}
              />
            </div>
            <label className="mt-5 flex items-center gap-3 text-[0.9rem]">
              <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="h-4 w-4 accent-[var(--color-chilli)]" />
              This is a gift — add a handwritten note
            </label>
            {gift && (
              <textarea
                name="giftNote"
                maxLength={200}
                placeholder="Your note (we’ll write it by hand on a RA Masale card)"
                className="field mt-3 font-display text-[1.05rem] italic"
              />
            )}
          </Step>

          <Step n="IV" title="Payment">
            <div className="grid gap-3">
              {payments.map((p) => (
                <Choice
                  key={p.value}
                  name="payment"
                  checked={payment === p.value}
                  onChange={() => setPayment(p.value)}
                  title={p.label}
                  note={p.note}
                />
              ))}
            </div>
            <p className="mt-4 text-[0.78rem] text-muted">
              Demo storefront — no payment is taken. A payment gateway (e.g. Razorpay) would open here in production.
            </p>
          </Step>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="border border-rule bg-ivory p-6 sm:p-8">
              <h2 className="eyebrow text-ink-soft">In your bag</h2>
              <ul className="mt-4 divide-y divide-rule/70">
                {lines.map((l) => (
                  <li key={`${l.slug}-${l.size}`} className="flex items-center gap-4 py-3">
                    <span className="relative grid h-16 w-14 shrink-0 place-items-center" style={{ background: tint(l.product.art.base, 0.12) }}>
                      <ProductVisual product={l.product} sizes="56px" shadow={false} className="h-14 w-10" />
                      <span className="absolute -top-2 -right-2 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[0.62rem] text-ivory">
                        {l.qty}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-[1rem]">{l.product.name}</span>
                      <span className="block text-[0.75rem] text-muted">{l.size}</span>
                    </span>
                    <span className="text-[0.9rem]">{formatPrice(l.lineTotal)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <OrderSummary express={express} coupon={coupon}>
              <button type="submit" disabled={placing} className="btn btn-primary mt-6 w-full">
                {placing ? "Placing your order…" : "Place order"}
              </button>
              <p className="mt-4 flex items-center justify-center gap-2 text-[0.75rem] text-muted">
                <ShieldIcon width={16} height={16} /> Your details are encrypted and secure
              </p>
            </OrderSummary>
          </div>
        </div>
      </form>
    </div>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-6 flex w-full items-baseline gap-4 border-b border-rule pb-3">
        <span className="font-display text-[1.1rem] text-chilli italic">{n}.</span>
        <span className="font-display text-[1.5rem]">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  className = "",
  ...input
}: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `f-${input.name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input id={id} className="field" {...input} />
    </div>
  );
}

function Choice({
  name,
  checked,
  onChange,
  title,
  note,
  aside,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  note: string;
  aside?: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 border px-4 py-4 transition-colors sm:gap-4 sm:px-5 ${
        checked ? "border-ink bg-ivory" : "border-rule hover:border-ink/40"
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="h-4 w-4 shrink-0 accent-[var(--color-chilli)]" />
      <span className="min-w-0 flex-1">
        <span className="block text-[0.95rem] font-medium">{title}</span>
        <span className="block text-[0.8rem] text-muted">{note}</span>
      </span>
      {aside && <span className="max-w-[7rem] shrink-0 text-right text-[0.8rem] leading-snug sm:text-[0.85rem]">{aside}</span>}
    </label>
  );
}

"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { CartLineItem } from "./CartLineItem";
import { FreeShippingMeter } from "./FreeShippingMeter";
import { OrderSummary, useCoupon } from "./OrderSummary";
import { ProductCard } from "@/components/product/ProductCard";
import { featuredProducts } from "@/lib/data/products";
import { ShieldIcon } from "@/components/ui/Icons";

export function CartView() {
  const { lines, count, ready } = useCart();
  const coupon = useCoupon();
  const suggestions = featuredProducts()
    .filter((p) => !lines.some((l) => l.slug === p.slug))
    .slice(0, 4);

  return (
    <div className="container-x py-10 md:py-14">
      <h1 className="font-headline text-display-lg leading-none">
        Your Bag {ready && <span className="oldstyle font-display text-[0.5em] text-muted italic">({count})</span>}
      </h1>

      {!ready ? (
        <div className="h-64" />
      ) : lines.length === 0 ? (
        <div className="mt-10 border border-rule bg-ivory px-6 py-20 text-center">
          <p className="font-display text-[2rem] italic">Your bag is waiting to be filled.</p>
          <p className="mt-3 text-muted">Begin with the essentials — or a box of house favourites.</p>
          <Link href="/shop" className="btn btn-primary mt-8">
            Browse the pantry
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="border-y border-rule py-5">
              <FreeShippingMeter />
            </div>
            <ul className="divide-y divide-rule">
              {lines.map((l) => (
                <CartLineItem key={`${l.slug}-${l.size}`} line={l} large />
              ))}
            </ul>
            <Link href="/shop" className="link-underline mt-4 inline-flex min-h-11 items-center text-[0.72rem] tracking-[0.18em] uppercase">
              ← Continue shopping
            </Link>
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <OrderSummary coupon={coupon}>
                <Link href="/checkout" className="btn btn-primary mt-6 w-full">
                  Proceed to checkout
                </Link>
                <p className="mt-4 flex items-center justify-center gap-2 text-[0.75rem] text-muted">
                  <ShieldIcon width={16} height={16} /> Secure checkout · UPI · Cards · COD
                </p>
              </OrderSummary>
            </div>
          </div>
        </div>
      )}

      {ready && suggestions.length > 0 && (
        <section className="mt-24 border-t border-rule pt-14">
          <h2 className="font-headline text-display-md">You may also like</h2>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {suggestions.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

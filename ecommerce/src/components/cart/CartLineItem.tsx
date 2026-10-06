"use client";

import Link from "next/link";
import { useCart, type ResolvedLine } from "@/lib/cart";
import { tint } from "@/components/product/PackArt";
import { ProductVisual } from "@/components/product/ProductVisual";
import { QtyStepper } from "./QtyStepper";
import { formatPrice } from "@/lib/format";

export function CartLineItem({ line, onNavigate, large = false }: { line: ResolvedLine; onNavigate?: () => void; large?: boolean }) {
  const { setQty, remove } = useCart();
  const p = line.product;
  return (
    <li className="flex gap-4 py-5">
      <Link
        href={`/product/${p.slug}`}
        onClick={onNavigate}
        className={`grid shrink-0 place-items-center ${large ? "h-28 w-24 sm:h-36 sm:w-32" : "h-28 w-24"}`}
        style={{ background: tint(p.art.base, 0.12) }}
      >
        <ProductVisual product={p} sizes="128px" shadow={false} className="h-[84%] w-[72%]" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${p.slug}`}
              onClick={onNavigate}
              className={`font-display leading-tight font-semibold hover:text-chilli ${large ? "text-[1.35rem]" : "text-[1.15rem]"}`}
            >
              {p.name}
            </Link>
            <p className="mt-0.5 text-[0.78rem] text-muted">{line.size}</p>
          </div>
          <p className="shrink-0 text-right">
            <span className="block font-display text-[1.15rem] font-semibold">{formatPrice(line.lineTotal)}</span>
            {line.pack.mrp > line.pack.price && (
              <s className="block text-[0.75rem] text-muted">{formatPrice(line.pack.mrp * line.qty)}</s>
            )}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QtyStepper value={line.qty} onChange={(q) => setQty(p.slug, line.size, q)} label={p.name} />
          <button
            type="button"
            onClick={() => remove(p.slug, line.size)}
            className="link-underline inline-flex min-h-10 items-center text-[0.7rem] tracking-[0.16em] text-muted uppercase hover:text-chilli"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

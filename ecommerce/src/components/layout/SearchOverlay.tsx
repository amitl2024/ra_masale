"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "@/components/ui/Icons";
import { tint } from "@/components/product/PackArt";
import { ProductVisual } from "@/components/product/ProductVisual";
import { products } from "@/lib/data/products";
import { categoryName } from "@/lib/data/categories";
import { formatPrice } from "@/lib/format";

const popular = ["Goda Masala", "Kanda Lasun", "Mango Pickle", "Biryani", "Papad", "Gift box"];

export function searchProducts(q: string) {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return products.filter((p) =>
    [p.name, p.marathi, categoryName(p.category), ...p.notes, ...p.ingredients]
      .join(" ")
      .toLowerCase()
      .includes(term),
  );
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = useMemo(() => searchProducts(q).slice(0, 6), [q]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => input.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
    >
      <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Close search" onClick={onClose} />
      <div
        className={`relative max-h-[90vh] overflow-y-auto border-b border-rule bg-ivory transition-transform duration-500 ease-out-soft ${
          open ? "translate-y-0" : "-translate-y-8"
        }`}
      >
        <div className="container-x py-6 sm:py-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/shop?q=${encodeURIComponent(q)}`);
              onClose();
            }}
            className="flex items-center gap-4 border-b border-ink pb-3"
          >
            <SearchIcon width={24} height={24} className="shrink-0 text-muted" />
            <input
              ref={input}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search masalas, pickles, papads…"
              className="w-full bg-transparent font-display text-[1.6rem] outline-none placeholder:text-muted/60 sm:text-[2.2rem]"
              aria-label="Search"
            />
            <button type="button" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center" aria-label="Close search">
              <CloseIcon />
            </button>
          </form>

          {!q && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="eyebrow mr-2 text-muted">Popular</span>
              {popular.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setQ(p)}
                  className="border border-rule px-3.5 py-2 text-[0.82rem] transition-colors hover:border-ink"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {q && (
            <div className="mt-6">
              {results.length === 0 ? (
                <p className="font-display text-xl text-muted italic">Nothing in the pantry matches “{q}”.</p>
              ) : (
                <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/product/${p.slug}`} onClick={onClose} className="group flex items-center gap-4 py-2">
                        <span className="grid h-20 w-16 shrink-0 place-items-center" style={{ background: tint(p.art.base, 0.12) }}>
                          <ProductVisual product={p} sizes="64px" shadow={false} className="h-[4.25rem] w-12" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display text-[1.15rem] font-semibold group-hover:text-chilli">{p.name}</span>
                          <span className="block text-[0.78rem] text-muted">
                            {categoryName(p.category)} · {formatPrice(p.packSizes[0].price)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={`/shop?q=${encodeURIComponent(q)}`}
                onClick={onClose}
                className="eyebrow link-underline mt-6 inline-block text-chilli"
              >
                See all results →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

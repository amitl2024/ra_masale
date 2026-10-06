"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, getCategory } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { searchProducts } from "@/lib/search";
import { ProductCard } from "@/components/product/ProductCard";
import { CloseIcon, SearchIcon } from "@/components/ui/Icons";

export function ProductsView({ initialCategory, initialQuery }: { initialCategory: string; initialQuery: string }) {
  const [category, setCategory] = useState(initialCategory);
  const [sub, setSub] = useState<string>("all");
  const [q, setQ] = useState(initialQuery);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (q) params.set("q", q);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `/products?${qs}` : "/products");
  }, [category, q]);

  const active = category === "all" ? undefined : getCategory(category);

  // the React compiler memoises this derived list
  const list = (() => {
    let out = q ? searchProducts(q) : products;
    if (category !== "all") out = out.filter((p) => p.category === category);
    if (sub !== "all") out = out.filter((p) => p.subcategory === sub);
    // products with real photography first, then catalogue order
    return [...out].sort(
      (a, b) => Number(Boolean(b.images?.length)) - Number(Boolean(a.images?.length)) || a.catalogueNo - b.catalogueNo,
    );
  })();

  const pick = (slug: string) => {
    setCategory(slug);
    setSub("all");
  };

  return (
    <section className="pb-16 sm:pb-20 md:pb-28">
      {/* sticky filter bar */}
      <div className="sticky top-16 z-20 border-b border-rule bg-paper/95 backdrop-blur">
        <div className="rail gap-2 py-3">
          {[{ slug: "all", name: "All products" }, ...categories].map((c) => {
            const on = category === c.slug;
            const count = c.slug === "all" ? products.length : products.filter((p) => p.category === c.slug).length;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => pick(c.slug)}
                aria-pressed={on}
                className={`inline-flex min-h-10 items-center gap-2 border px-4 text-[0.66rem] font-semibold tracking-[0.14em] whitespace-nowrap uppercase transition-colors ${
                  on ? "border-ink bg-ink text-ivory" : "border-rule bg-ivory hover:border-ink/50"
                }`}
              >
                {c.name}
                <span className={`oldstyle font-display text-[0.8rem] tracking-normal normal-case ${on ? "text-ivory/60" : "text-muted"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="container-x pt-8 sm:pt-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <h2 className="font-headline text-display-md leading-none">{active?.name ?? "All products"}</h2>
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft">
              {active?.description ?? "Every RA Masale product in one place. Select a category or search by name."}
            </p>
          </div>
          <label className="flex w-full items-center gap-3 border-b border-ink pb-2 md:w-80 md:shrink-0">
            <SearchIcon width={18} height={18} className="shrink-0 text-muted" />
            <span className="sr-only">Search products</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products"
              className="h-9 w-full min-w-0 bg-transparent text-[1rem] outline-none placeholder:text-muted"
            />
            {q && (
              <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="-mr-2 grid h-9 w-9 place-items-center">
                <CloseIcon width={16} height={16} />
              </button>
            )}
          </label>
        </div>

        {active?.subcategories && (
          <div className="mt-6 flex flex-wrap gap-2">
            {["all", ...active.subcategories].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSub(s)}
                aria-pressed={sub === s}
                className={`min-h-9 rounded-full border px-4 text-[0.8rem] transition-colors ${
                  sub === s ? "border-chilli bg-chilli text-ivory" : "border-rule hover:border-ink/50"
                }`}
              >
                {s === "all" ? "All" : s}
              </button>
            ))}
          </div>
        )}

        <p className="mt-8 border-b border-rule pb-3 text-[0.8rem] text-muted">
          <span className="oldstyle font-display text-[1rem] text-ink">{list.length}</span> {list.length === 1 ? "product" : "products"}
          {q && <> matching “{q}”</>}
        </p>

        {list.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-[1.8rem] italic">Nothing on this shelf.</p>
            <p className="mt-3 text-muted">Try another search — or ask us, we may make it.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 min-[420px]:flex-row">
              <button type="button" onClick={() => { setQ(""); pick("all"); }} className="btn btn-outline">
                Show all products
              </button>
              <Link href="/contact#enquiry" className="btn btn-primary">
                Ask about a product
              </Link>
            </div>
          </div>
        ) : (
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {list.map((p, i) => (
              <li key={p.slug} className="hero-in" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
                <ProductCard product={p} priority={i < 4} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border border-rule bg-ivory p-6 sm:p-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-[1.4rem] leading-tight">Need pricing, pack sizes or bulk quantities?</p>
            <p className="mt-1 text-[0.9rem] text-muted">Our team responds to distributor, retail, wholesale and institutional enquiries.</p>
          </div>
          <Link href="/contact#enquiry" className="btn btn-primary w-full shrink-0 md:w-auto">
            Enquire now
          </Link>
        </div>
      </div>
    </section>
  );
}

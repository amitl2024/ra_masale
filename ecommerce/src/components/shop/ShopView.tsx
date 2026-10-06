"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { categories, getCategory } from "@/lib/data/categories";
import { priceFrom, products } from "@/lib/data/products";
import { searchProducts } from "@/components/layout/SearchOverlay";
import { ProductCard } from "@/components/product/ProductCard";
import { PackArt } from "@/components/product/PackArt";
import { CloseIcon, FilterIcon, SearchIcon } from "@/components/ui/Icons";
import { Ornament } from "@/components/ui/Ornament";

type Sort = "featured" | "price-asc" | "price-desc" | "rating" | "name";
type Heat = "mild" | "medium" | "hot";
type Price = "u100" | "100-250" | "250+";

const sorts: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "rating", label: "Top rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name A–Z" },
];

const heatOptions: { value: Heat; label: string; test: (h?: number) => boolean }[] = [
  { value: "mild", label: "Mild", test: (h) => h === undefined || h <= 2 },
  { value: "medium", label: "Medium", test: (h) => h === 3 },
  { value: "hot", label: "Hot", test: (h) => (h ?? 0) >= 4 },
];

const priceOptions: { value: Price; label: string; test: (p: number) => boolean }[] = [
  { value: "u100", label: "Under ₹100", test: (p) => p < 100 },
  { value: "100-250", label: "₹100 – ₹250", test: (p) => p >= 100 && p <= 250 },
  { value: "250+", label: "Above ₹250", test: (p) => p > 250 },
];

const badgeOptions = ["Bestseller", "Signature", "New", "Limited"] as const;

function toggle<T>(list: T[], v: T) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

export function ShopView({ initialCategory, initialQuery }: { initialCategory: string; initialQuery: string }) {
  const [category, setCategory] = useState(initialCategory);
  const [q, setQ] = useState(initialQuery);
  const [sort, setSort] = useState<Sort>("featured");
  const [heat, setHeat] = useState<Heat[]>([]);
  const [price, setPrice] = useState<Price[]>([]);
  const [badges, setBadges] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);
  const [drawer, setDrawer] = useState(false);

  // keep the URL shareable without a full navigation
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (q) params.set("q", q);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `/shop?${qs}` : "/shop");
  }, [category, q]);

  useEffect(() => {
    if (!drawer) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [drawer]);

  const list = useMemo(() => {
    let out: Product[] = q ? searchProducts(q) : products;
    if (category !== "all") out = out.filter((p) => p.category === category);
    if (heat.length) out = out.filter((p) => heatOptions.some((h) => heat.includes(h.value) && h.test(p.heat)));
    if (price.length) out = out.filter((p) => priceOptions.some((o) => price.includes(o.value) && o.test(priceFrom(p))));
    if (badges.length) out = out.filter((p) => p.badge && badges.includes(p.badge));
    if (inStock) out = out.filter((p) => p.availability !== "out-of-stock");
    const sorted = [...out];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => priceFrom(a) - priceFrom(b));
        break;
      case "price-desc":
        sorted.sort((a, b) => priceFrom(b) - priceFrom(a));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // featured first, then products with real pack photography
        sorted.sort(
          (a, b) =>
            Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
            Number(Boolean(b.images?.length)) - Number(Boolean(a.images?.length)),
        );
    }
    return sorted;
  }, [q, category, heat, price, badges, inStock, sort]);

  const active = category === "all" ? undefined : getCategory(category);
  const filterCount = heat.length + price.length + badges.length + (inStock ? 1 : 0);
  const clearAll = () => {
    setHeat([]);
    setPrice([]);
    setBadges([]);
    setInStock(false);
  };

  const filters = (
    <div className="space-y-9">
      <FilterGroup title="Collection">
        <ul className="space-y-1">
          {[{ slug: "all", name: "All products", marathi: "सर्व" }, ...categories].map((c) => {
            const count = c.slug === "all" ? products.length : products.filter((p) => p.category === c.slug).length;
            const on = category === c.slug;
            return (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => setCategory(c.slug)}
                  className={`flex w-full items-baseline justify-between py-1.5 text-left transition-colors ${on ? "text-chilli" : "hover:text-chilli"}`}
                  aria-pressed={on}
                >
                  <span className={`font-display text-[1.02rem] ${on ? "italic" : ""}`}>{c.name}</span>
                  <span className="oldstyle text-[0.75rem] text-muted">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </FilterGroup>
      <FilterGroup title="Heat">
        <CheckList options={heatOptions} selected={heat} onToggle={(v) => setHeat((s) => toggle(s, v))} />
      </FilterGroup>
      <FilterGroup title="Price">
        <CheckList options={priceOptions} selected={price} onToggle={(v) => setPrice((s) => toggle(s, v))} />
      </FilterGroup>
      <FilterGroup title="Collections">
        <CheckList
          options={badgeOptions.map((b) => ({ value: b, label: b }))}
          selected={badges}
          onToggle={(v) => setBadges((s) => toggle(s, v))}
        />
      </FilterGroup>
      <label className="flex cursor-pointer items-center justify-between border-t border-rule pt-6 text-[0.88rem]">
        In stock only
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => setInStock(e.target.checked)}
          className="peer sr-only"
        />
        <span className="relative h-5 w-9 rounded-full bg-rule transition-colors peer-checked:bg-chilli after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-ivory after:transition-transform peer-checked:after:translate-x-4" />
      </label>
    </div>
  );

  return (
    <>
      {/* page header */}
      <section className="border-b border-rule">
        <div className="container-x pt-8 pb-10 md:pt-10 md:pb-14">
          <nav aria-label="Breadcrumb" className="text-[0.7rem] tracking-[0.16em] text-muted uppercase">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="link-underline">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                {active ? (
                  <button type="button" className="link-underline uppercase" onClick={() => setCategory("all")}>
                    Shop
                  </button>
                ) : (
                  <span className="text-ink">Shop</span>
                )}
              </li>
              {active && (
                <>
                  <li aria-hidden>/</li>
                  <li className="text-ink">{active.name}</li>
                </>
              )}
            </ol>
          </nav>
          <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="font-marathi text-[1rem] text-chilli">{active?.marathi ?? "आमचे पदार्थ"}</p>
              <h1 className="mt-1 font-headline text-display-lg leading-[1]">
                {q ? (
                  <>
                    Results for <em className="text-chilli">“{q}”</em>
                  </>
                ) : (
                  active?.name ?? "The Pantry"
                )}
              </h1>
              <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink-soft">
                {active?.description ??
                  "Every RA Masale product in one place — ground spices, house blends, ready mixes, pickles, papads, festive mixes and gift boxes."}
              </p>
            </div>
            <div className="md:col-span-5 md:justify-self-end">
              <label className="flex w-full items-center gap-3 border-b border-ink pb-2 md:w-80">
                <SearchIcon width={18} height={18} className="text-muted" />
                <span className="sr-only">Search the shop</span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search the pantry"
                  className="w-full min-w-0 bg-transparent text-base outline-none placeholder:text-muted sm:text-[0.95rem]"
                />
                {q && (
                  <button type="button" onClick={() => setQ("")} aria-label="Clear search">
                    <CloseIcon width={16} height={16} />
                  </button>
                )}
              </label>
            </div>
          </div>
        </div>
        {/* category rail */}
        <div className="no-scrollbar overflow-x-auto border-t border-rule/70">
          <ul className="container-x flex min-w-max gap-6 py-0.5">
            {[{ slug: "all", name: "All" }, ...categories].map((c) => (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => setCategory(c.slug)}
                  aria-current={category === c.slug ? "true" : undefined}
                  className={`link-underline inline-flex min-h-11 items-center text-[0.7rem] font-semibold tracking-[0.18em] uppercase ${
                    category === c.slug ? "text-chilli [background-size:100%_1px]" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x grid gap-10 py-10 lg:grid-cols-[15rem_1fr] lg:gap-14 lg:py-14">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-24">{filters}</div>
        </aside>

        <div>
          <div className="mb-8 flex items-center justify-between gap-3 border-b border-rule pb-4">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="inline-flex h-11 shrink-0 items-center gap-2 border border-rule px-3 text-[0.7rem] sm:px-4 font-semibold tracking-[0.16em] uppercase lg:hidden"
            >
              <FilterIcon width={16} height={16} /> Filter {filterCount > 0 && `(${filterCount})`}
            </button>
            <p className="hidden text-[0.85rem] text-muted lg:block">
              <span className="oldstyle font-display text-[1.05rem] text-ink">{list.length}</span>{" "}
              {list.length === 1 ? "product" : "products"}
              {filterCount > 0 && (
                <button type="button" onClick={clearAll} className="link-underline ml-4 text-chilli">
                  Clear filters
                </button>
              )}
            </p>
            <label className="flex items-center gap-3 text-[0.82rem]">
              <span className="hidden text-muted sm:inline">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="field !min-h-11 !w-auto max-w-[9.5rem] !bg-transparent !py-2 !pl-3 text-base min-[380px]:max-w-none sm:text-[0.88rem]"
              >
                {sorts.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {list.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display text-[2rem] italic">Nothing on this shelf.</p>
              <p className="mt-3 text-muted">Try a different search or clear a filter.</p>
              <button
                type="button"
                onClick={() => {
                  clearAll();
                  setQ("");
                  setCategory("all");
                }}
                className="btn btn-outline mt-8"
              >
                Reset everything
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:gap-6">
              {list.flatMap((p, i) => {
                const item = (
                  <li key={p.slug} className="hero-in" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
                    <ProductCard product={p} />
                  </li>
                );
                const showEditorial = i === 5 && category === "all" && !q && filterCount === 0;
                return showEditorial
                  ? [
                      item,
                      <li key="editorial" className="col-span-2 md:col-span-3">
                        <EditorialTile />
                      </li>,
                    ]
                  : [item];
              })}
            </ul>
          )}
        </div>
      </section>

      {/* mobile filter drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden ${drawer ? "visible" : "invisible"}`} role="dialog" aria-modal="true" aria-label="Filters">
        <button
          type="button"
          aria-label="Close filters"
          onClick={() => setDrawer(false)}
          className={`absolute inset-0 bg-ink/45 transition-opacity ${drawer ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col bg-ivory transition-transform duration-500 ease-out-soft ${
            drawer ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-rule px-5 py-3">
            <p className="font-display text-[1.4rem]">Filter</p>
            <button type="button" onClick={() => setDrawer(false)} className="grid h-11 w-11 place-items-center" aria-label="Close filters">
              <CloseIcon />
            </button>
          </div>
          <div className="overflow-y-auto px-5 py-6">{filters}</div>
          <div className="grid grid-cols-2 gap-3 border-t border-rule p-4">
            <button type="button" onClick={clearAll} className="btn btn-outline">
              Clear
            </button>
            <button type="button" onClick={() => setDrawer(false)} className="btn btn-primary">
              Show {list.length}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function EditorialTile() {
  const box = products.find((p) => p.slug === "sangli-kitchen-box")!;
  return (
    <div className="grid items-center gap-8 bg-chilli-deep p-8 text-ivory sm:grid-cols-[1fr_auto] sm:p-12">
      <div>
        <p className="eyebrow text-turmeric">Not sure where to begin?</p>
        <h2 className="mt-4 font-headline text-display-md leading-[1.05]">
          Start with the <em>Sangli Kitchen Box</em> — six house favourites, one keepsake.
        </h2>
        <Ornament className="mt-6 text-turmeric/60" />
        <Link href={`/product/${box.slug}`} className="btn mt-6 bg-turmeric text-ink hover:bg-ivory">
          Discover the box
        </Link>
      </div>
      <PackArt art={box.art} name={box.name} seed={box.slug} ribbon netWt="6 × 100 g" className="hero-float mx-auto h-56 w-auto drop-shadow-[0_24px_24px_rgba(0,0,0,0.45)] sm:h-64" />
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="eyebrow mb-4 text-chilli">{title}</legend>
      {children}
    </fieldset>
  );
}

function CheckList<T extends string>({
  options,
  selected,
  onToggle,
}: {
  options: { value: T; label: string }[];
  selected: T[];
  onToggle: (v: T) => void;
}) {
  return (
    <ul className="space-y-2.5">
      {options.map((o) => {
        const on = selected.includes(o.value);
        return (
          <li key={o.value}>
            <label className="flex cursor-pointer items-center gap-3 text-[0.9rem]">
              <input type="checkbox" checked={on} onChange={() => onToggle(o.value)} className="peer sr-only" />
              <span
                className="grid h-[18px] w-[18px] place-items-center border border-ink/40 transition-colors peer-checked:border-chilli peer-checked:bg-chilli peer-focus-visible:outline-2 peer-focus-visible:outline-saffron"
                aria-hidden
              >
                {on && (
                  <svg viewBox="0 0 12 12" width="10" height="10">
                    <path d="M2 6.5l2.5 2.5L10 3.5" stroke="#faf6ee" strokeWidth="1.6" fill="none" />
                  </svg>
                )}
              </span>
              {o.label}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tabs = [
  { key: "Bestseller", label: "Bestsellers" },
  { key: "Signature", label: "House signatures" },
  { key: "New", label: "New in" },
] as const;

export function Bestsellers() {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("Bestseller");
  const photoFirst = (a: (typeof products)[number], b: (typeof products)[number]) =>
    Number(Boolean(b.images?.length)) - Number(Boolean(a.images?.length));
  const tagged = products
    .filter((p) => (tab === "New" ? p.badge === "New" || p.badge === "Limited" : p.badge === tab))
    .sort(photoFirst);
  // top up with the highest-rated products so the shelf is always a full row of four
  const fillers = [...products]
    .filter((p) => !tagged.includes(p))
    .sort((a, b) => photoFirst(a, b) || b.rating - a.rating || b.reviewCount - a.reviewCount);
  const list = [...tagged, ...fillers].slice(0, tagged.length > 4 ? 8 : 4);

  return (
    <section className="bg-ivory/60 py-16 sm:py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          chapter="Chapter II"
          eyebrow="Most loved"
          title="The jars every kitchen reaches for."
          action={
            <div className="grid w-full grid-cols-3 gap-1 border border-rule p-1 md:flex md:w-auto" role="tablist" aria-label="Product collections">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.key}
                  onClick={() => setTab(t.key)}
                  className={`min-h-10 px-1.5 py-2 text-[0.6rem] leading-tight font-semibold tracking-[0.12em] uppercase transition-colors sm:px-4 sm:text-[0.66rem] sm:tracking-[0.18em] ${
                    tab === t.key ? "bg-ink text-ivory" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          }
        />
        <div
          key={tab}
          className="rail rail-inset mt-10 gap-4 pb-2 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-5 lg:gap-6 sm:overflow-visible sm:px-0 sm:after:hidden lg:grid-cols-4"
          role="tabpanel"
        >
          {list.map((p, i) => (
            <div key={p.slug} className="hero-in w-[72%] min-[480px]:w-[46%] sm:w-auto" style={{ animationDelay: `${i * 60}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link href="/shop" className="btn btn-outline">
            Explore all {products.length} products
          </Link>
        </div>
      </div>
    </section>
  );
}

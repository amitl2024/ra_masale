"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { tint, type PackView } from "./PackArt";
import { ProductVisual, hasPhoto } from "./ProductVisual";
import { Seal } from "@/components/ui/Seal";

export function ProductGallery({ product }: { product: Product }) {
  const photo = hasPhoto(product);
  const views: { key: PackView; label: string }[] = [
    { key: "pack", label: photo ? "The pack" : "The pack" },
    { key: "label", label: "Label detail" },
    { key: "spice", label: "Inside" },
  ];
  const [view, setView] = useState<PackView>("pack");
  const current = views.find((v) => v.key === view)!;

  return (
    <div className="flex min-w-0 flex-col-reverse gap-3 sm:gap-4 lg:flex-row">
      <ul className="flex gap-2.5 sm:gap-3 lg:flex-col" role="tablist" aria-label="Product views">
        {views.map((v) => (
          <li key={v.key} className="flex-1 lg:flex-none">
            <button
              type="button"
              role="tab"
              aria-selected={view === v.key}
              aria-label={v.label}
              onClick={() => setView(v.key)}
              className={`relative block aspect-[5/6] w-full overflow-hidden border p-2 transition-colors lg:w-24 ${
                view === v.key ? "border-ink" : "border-rule hover:border-ink/40"
              }`}
              style={{ background: tint(product.art.base, 0.1) }}
            >
              <ProductVisual product={product} view={v.key} sizes="96px" shadow={false} className="h-full w-full overflow-hidden" />
            </button>
          </li>
        ))}
      </ul>
      <div
        className="relative aspect-square flex-1 overflow-hidden border border-rule/70 sm:aspect-[4/4.2]"
        style={{ background: tint(product.art.base, 0.09) }}
      >
        <div className="arch absolute inset-x-[10%] top-[8%] bottom-0" style={{ background: tint(product.art.base, 0.11) }} aria-hidden />
        <div key={view} className="hero-in absolute inset-0 px-[16%] pt-[10%] pb-[8%]">
          <ProductVisual
            product={product}
            view={view}
            priority
            sizes="(max-width: 1024px) 90vw, 50vw"
            className={`h-full w-full ${view === "label" ? "overflow-hidden" : ""}`}
          />
        </div>
        <Seal size={80} className="absolute top-4 right-4 hidden sm:block" id="pdp-seal" />
        <p className="absolute bottom-3 left-4 text-[0.6rem] tracking-[0.2em] text-muted uppercase">
          {photo && view !== "spice" ? current.label : `Illustration · ${current.label}`}
        </p>
      </div>
    </div>
  );
}

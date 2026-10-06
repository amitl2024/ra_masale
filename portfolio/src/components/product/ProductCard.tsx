import Link from "next/link";
import type { Product } from "@/lib/types";
import { tint } from "./PackArt";
import { ProductVisual } from "./ProductVisual";
import { HeatMeter } from "@/components/ui/Badges";
import { ArrowRight } from "@/components/ui/Icons";
import { pad } from "@/lib/format";
import { categoryName } from "@/lib/data/categories";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const href = `/products/${product.slug}`;
  return (
    <article className="group relative flex h-full min-w-0 flex-col border border-rule/80 bg-ivory transition-shadow duration-500 hover:shadow-[0_18px_40px_-28px_rgba(30,26,23,0.45)]">
      <Link href={href} className="relative block overflow-hidden border-b border-rule/70" aria-label={product.name}>
        <div className="flex min-h-9 items-center justify-between gap-2 border-b border-rule/70 px-3 py-1.5 text-[0.62rem] tracking-[0.12em] text-muted uppercase sm:px-4 sm:py-2 sm:tracking-[0.16em]">
          <span className="oldstyle shrink-0 font-display text-[0.78rem] tracking-[0.04em] normal-case italic">No. {pad(product.catalogueNo)}</span>
          <span className="truncate">{product.subcategory ?? categoryName(product.category)}</span>
        </div>
        <div className="relative aspect-[4/4.5] px-[16%] pt-[10%] pb-[7%]" style={{ backgroundColor: tint(product.art.base, 0.09) }}>
          <div className="arch absolute inset-x-[9%] top-[7%] bottom-0 opacity-60" style={{ backgroundColor: tint(product.art.base, 0.1) }} aria-hidden />
          <ProductVisual
            product={product}
            priority={priority}
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
            className="pack-lift h-full w-full"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-3 pt-3 pb-4 sm:px-5 sm:pt-4 sm:pb-5">
        <p className="text-[0.6rem] font-semibold tracking-[0.16em] text-chilli uppercase sm:text-[0.64rem]">{categoryName(product.category)}</p>
        <h3 className="mt-1.5 font-display text-[1.05rem] leading-tight font-semibold sm:text-[1.3rem]">
          <Link href={href} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <p className="font-marathi text-[0.78rem] text-muted sm:text-[0.84rem]">{product.marathi}</p>
          {product.heat !== undefined && product.heat > 0 && <HeatMeter level={product.heat} />}
        </div>
        <p className="mt-2.5 line-clamp-2 text-[0.88rem] leading-relaxed text-ink-soft max-sm:hidden">{product.shortDescription}</p>
        <div className="mt-auto pt-4">
          <Link
            href={href}
            className="inline-flex min-h-10 items-center gap-2 text-[0.64rem] font-semibold tracking-[0.18em] uppercase transition-colors group-hover:text-chilli sm:text-[0.68rem]"
          >
            View product <ArrowRight width={14} height={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

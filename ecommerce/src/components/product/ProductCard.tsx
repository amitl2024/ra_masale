import Link from "next/link";
import type { Product } from "@/lib/types";
import { tint } from "./PackArt";
import { ProductVisual } from "./ProductVisual";
import { QuickAdd } from "./QuickAdd";
import { Stars } from "@/components/ui/Stars";
import { Badge, badgeTone, HeatMeter } from "@/components/ui/Badges";
import { formatPrice, pad } from "@/lib/format";
import { categoryName } from "@/lib/data/categories";
import { priceFrom } from "@/lib/data/products";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const from = priceFrom(product);
  const first = product.packSizes[0];
  const multi = product.packSizes.length > 1;
  return (
    <article className="group relative flex h-full min-w-0 flex-col border border-rule/80 bg-ivory transition-shadow duration-500 hover:shadow-[0_18px_40px_-28px_rgba(30,26,23,0.45)]">
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden border-b border-rule/70"
        aria-label={product.name}
      >
        {/* catalogue header strip */}
        <div className="flex min-h-9 items-center justify-between gap-2 border-b border-rule/70 px-2.5 py-1.5 text-[0.62rem] tracking-[0.14em] text-muted uppercase sm:px-3.5 sm:py-2 sm:tracking-[0.18em]">
          <span className="oldstyle shrink-0 font-display text-[0.78rem] tracking-[0.04em] normal-case italic">
            No. {pad(product.catalogueNo)}
          </span>
          {product.badge ? (
            <Badge tone={badgeTone(product.badge)}>{product.badge}</Badge>
          ) : (
            <span className="truncate">{categoryName(product.category)}</span>
          )}
        </div>
        <div
          className="relative aspect-[4/4.6] px-[14%] pt-[10%] pb-[6%] sm:aspect-[4/4.4]"
          style={{ backgroundColor: tint(product.art.base, 0.09) }}
        >
          <div
            className="arch absolute inset-x-[8%] top-[7%] bottom-0 opacity-60"
            style={{ backgroundColor: tint(product.art.base, 0.1) }}
            aria-hidden
          />
          <ProductVisual
            product={product}
            priority={priority}
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
            className="pack-lift h-full w-full"
          />
          {product.availability === "low-stock" && (
            <span className="absolute bottom-2 left-2 bg-ivory/90 px-2 py-1 text-[0.62rem] tracking-[0.12em] text-chilli uppercase sm:bottom-3 sm:left-3">
              Only a few left
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-3 pt-3 pb-3.5 sm:px-4 sm:pt-4 sm:pb-4">
        <h3 className="font-display text-[1.05rem] leading-tight font-semibold sm:text-[1.28rem]">
          <Link href={`/product/${product.slug}`} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <p className="font-marathi text-[0.78rem] text-muted sm:text-[0.82rem]">{product.marathi}</p>
          {product.heat !== undefined && product.heat > 0 && <HeatMeter level={product.heat} />}
        </div>
        <p className="mt-2 line-clamp-2 text-[0.88rem] leading-relaxed text-ink-soft max-sm:hidden">{product.shortDescription}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.72rem] text-muted sm:mt-3 sm:text-[0.75rem]">
          <Stars rating={product.rating} size={11} />
          <span className="oldstyle">{product.rating.toFixed(1)}</span>
          <span className="oldstyle hidden sm:inline">· {product.reviewCount} reviews</span>
          <span className="oldstyle sm:hidden">({product.reviewCount})</span>
        </div>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-3 sm:pt-4">
          <p className="leading-none">
            {multi && <span className="mr-1 block text-[0.6rem] tracking-[0.16em] text-muted uppercase sm:inline sm:text-[0.68rem]">From</span>}
            <span className="font-display text-[1.2rem] font-semibold sm:text-[1.4rem]">{formatPrice(from)}</span>
            {!multi && first.mrp > first.price && (
              <s className="ml-1.5 text-[0.75rem] text-muted sm:text-[0.82rem]">{formatPrice(first.mrp)}</s>
            )}
          </p>
          <QuickAdd slug={product.slug} size={first.label} name={product.name} />
        </div>
      </div>
    </article>
  );
}

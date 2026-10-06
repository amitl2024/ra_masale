import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products, relatedProducts } from "@/lib/data/products";
import { getCategory } from "@/lib/data/categories";
import { company, reviews } from "@/lib/data/site";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductCard } from "@/components/product/ProductCard";
import { tint } from "@/components/product/PackArt";
import { ProductVisual } from "@/components/product/ProductVisual";
import { Accordion } from "@/components/product/Accordion";
import { Stars } from "@/components/ui/Stars";
import { Badge, badgeTone, HeatMeter, VegMark } from "@/components/ui/Badges";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Ornament } from "@/components/ui/Ornament";
import { pad } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} (${p.marathi})`,
    description: p.shortDescription,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { title: `${p.name} | RA Masale`, description: p.shortDescription, type: "website" },
  };
}

const heatWord = ["No heat", "Mild", "Gentle", "Medium", "Hot", "Fiery"];

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category)!;
  const related = relatedProducts(product, 4);
  const contents = (product.contents ?? []).map(getProduct).filter((p) => p !== undefined);

  // Deterministic, mock rating distribution derived from the average
  const dist = [5, 4, 3, 2, 1].map((star) => {
    const d = Math.abs(product.rating - star);
    return { star, pct: Math.max(1, Math.round(100 * Math.exp(-d * 1.6))) };
  });
  const total = dist.reduce((s, d) => s + d.pct, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    category: category.name,
    brand: { "@type": "Brand", name: company.name },
    offers: product.packSizes.map((s) => ({
      "@type": "Offer",
      priceCurrency: "INR",
      price: s.price,
      name: s.label,
      availability: product.availability === "out-of-stock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: category.name, item: `/shop?category=${category.slug}` },
      { "@type": "ListItem", position: 3, name: product.name },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbLd]) }} />

      <div className="container-x pt-6 pb-16 lg:pt-8 lg:pb-24">
        <nav aria-label="Breadcrumb" className="text-[0.7rem] tracking-[0.16em] text-muted uppercase">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="link-underline">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`/shop?category=${category.slug}`} className="link-underline inline-flex min-h-10 items-center">
                {category.name}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-10 lg:mt-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <ProductGallery product={product} />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 text-[0.7rem] tracking-[0.18em] text-muted uppercase">
              <span className="oldstyle font-display text-[0.95rem] tracking-normal normal-case italic">
                No. {pad(product.catalogueNo)}
              </span>
              <span className="h-px w-6 bg-rule" />
              <Link href={`/shop?category=${category.slug}`} className="link-underline inline-flex min-h-10 items-center">
                {category.name}
              </Link>
              {product.badge && (
                <span className="ml-auto">
                  <Badge tone={badgeTone(product.badge)}>{product.badge}</Badge>
                </span>
              )}
            </div>
            <h1 className="mt-4 font-headline text-display-lg leading-[1]">{product.name}</h1>
            <p className="mt-2 font-marathi text-[1.15rem] text-chilli">{product.marathi}</p>
            <a href="#reviews" className="mt-2 inline-flex min-h-11 items-center gap-2 text-[0.82rem] text-muted">
              <Stars rating={product.rating} size={14} />
              <span className="oldstyle">{product.rating.toFixed(1)}</span>
              <span className="link-underline">({product.reviewCount} reviews)</span>
            </a>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-ink-soft">{product.shortDescription}</p>

            <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-rule py-4 text-[0.8rem]">
              {product.vegetarian && (
                <div>
                  <dt className="sr-only">Diet</dt>
                  <dd>
                    <VegMark />
                  </dd>
                </div>
              )}
              {product.heat !== undefined && (
                <div className="flex items-center gap-2">
                  <dt className="text-[0.68rem] tracking-[0.14em] text-muted uppercase">Heat</dt>
                  <dd className="flex items-center gap-2">
                    <HeatMeter level={product.heat} /> <span className="text-ink-soft">{heatWord[product.heat]}</span>
                  </dd>
                </div>
              )}
              <div className="flex items-center gap-2">
                <dt className="text-[0.68rem] tracking-[0.14em] text-muted uppercase">Notes</dt>
                <dd className="font-display italic">{product.notes.join(" · ")}</dd>
              </div>
            </dl>

            <div className="mt-8">
              <ProductPurchase product={product} />
            </div>

            <div className="mt-10">
              <Accordion
                items={[
                  { title: "About this product", body: <p>{product.description}</p>, open: true },
                  {
                    title: "Ingredients",
                    body: (
                      <p>
                        {product.ingredients.join(", ")}.
                        <span className="mt-2 block text-[0.78rem] text-muted">
                          Ingredient lists shown are placeholders pending confirmation from RA Food Products.
                        </span>
                      </p>
                    ),
                  },
                  { title: "How to use", body: <p>{product.usage}</p> },
                  {
                    title: "Storage & shelf life",
                    body: (
                      <>
                        <p>{product.storage}</p>
                        <p className="mt-2">
                          <strong className="font-semibold text-ink">Best before:</strong> {product.shelfLife}
                        </p>
                      </>
                    ),
                  },
                  {
                    title: "Product details",
                    body: (
                      <dl className="grid grid-cols-[8rem_1fr] gap-y-2 text-[0.88rem]">
                        <dt className="text-muted">SKU</dt>
                        <dd>{product.sku}</dd>
                        <dt className="text-muted">Pack sizes</dt>
                        <dd>{product.packSizes.map((s) => s.label).join(", ")}</dd>
                        <dt className="text-muted">Manufacturer</dt>
                        <dd>
                          {company.legalName}, {company.units[0].lines.join(", ")}
                        </dd>
                        <dt className="text-muted">FSSAI Lic. No.</dt>
                        <dd className="text-muted italic">To be added</dd>
                        <dt className="text-muted">Origin</dt>
                        <dd>Made in India</dd>
                      </dl>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* gift box contents */}
      {contents.length > 0 && (
        <section className="border-t border-rule bg-ivory/60 py-16 md:py-20">
          <div className="container-x">
            <SectionHeading eyebrow="Inside the box" title={`${contents.length} house favourites, packed by hand.`} />
            <ul className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
              {contents.map((c) => (
                <li key={c.slug}>
                  <Link href={`/product/${c.slug}`} className="group block text-center">
                    <div className="arch-sm aspect-[3/4] px-5 pt-7 pb-3" style={{ background: tint(c.art.base, 0.12) }}>
                      <ProductVisual product={c} sizes="160px" className="pack-lift h-full w-full" />
                    </div>
                    <p className="mt-3 font-display text-[1rem] group-hover:text-chilli">{c.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* reviews */}
      <section id="reviews" className="scroll-mt-24 border-t border-rule py-14 sm:py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-chilli">Kitchen reviews</p>
            <p className="mt-5 font-headline text-[4.5rem] leading-none">{product.rating.toFixed(1)}</p>
            <Stars rating={product.rating} size={18} className="mt-3" />
            <p className="mt-2 text-[0.85rem] text-muted">Based on {product.reviewCount} reviews (sample data)</p>
            <ul className="mt-8 space-y-2.5">
              {dist.map((d) => (
                <li key={d.star} className="flex items-center gap-3 text-[0.8rem]">
                  <span className="oldstyle w-3 text-muted">{d.star}</span>
                  <span className="h-[3px] flex-1 bg-rule/70">
                    <span className="block h-full bg-gold" style={{ width: `${(d.pct / total) * 100}%` }} />
                  </span>
                  <span className="oldstyle w-9 text-right text-muted">{Math.round((d.pct / total) * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid gap-8 lg:col-span-8 lg:grid-cols-2">
            {reviews.slice(0, 2).map((r, i) => (
              <li key={i} className="border-t border-rule pt-6">
                <Stars rating={5} size={13} />
                <blockquote className="mt-4 font-display text-[1.25rem] leading-snug italic">“{r.quote}”</blockquote>
                <p className="mt-4 text-[0.7rem] tracking-[0.16em] text-muted uppercase">
                  {r.city} · on {r.product} <span className="tracking-normal normal-case">({r.name})</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* related */}
      {related.length > 0 && (
        <section className="border-t border-rule bg-ivory/60 py-14 sm:py-16 md:py-24">
          <div className="container-x">
            <SectionHeading
              eyebrow="Pairs well with"
              title="Complete the masala dabba."
              action={<Ornament className="hidden text-chilli/60 md:block" />}
            />
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

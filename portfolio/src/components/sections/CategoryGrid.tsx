import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { leadProduct, productsByCategory } from "@/lib/data/products";
import { tint } from "@/components/product/PackArt";
import { ProductVisual } from "@/components/product/ProductVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { roman } from "@/lib/format";

export function CategoryGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="py-16 sm:py-20 md:py-28">
      {heading && (
        <div className="container-x">
          <SectionHeading
            eyebrow="Product categories"
            title={
              <>
                Five shelves, <em className="text-chilli">one</em> family kitchen.
              </>
            }
            intro="Spices & masalas, ready-mix products, papads, pickles and other food products — made with the same care since 1972."
            action={
              <Link href="/products" className="link-underline inline-flex min-h-10 items-center text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
                View all products →
              </Link>
            }
          />
        </div>
      )}
      <div className="container-x mt-10 sm:mt-12">
        <ul className="rail rail-inset gap-3 pb-2 sm:gap-4 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0 lg:after:hidden">
          {categories.map((c, i) => {
            const lead = leadProduct(c.slug);
            const count = productsByCategory(c.slug).length;
            return (
              <li key={c.slug} className="w-[44%] sm:w-[30%] lg:w-auto">
                <Reveal delay={i * 70} className="h-full">
                  <Link href={`/products?category=${c.slug}`} className="group block h-full text-center">
                    <div className="arch relative flex aspect-[3/4.1] items-end justify-center overflow-hidden px-5 pb-5" style={{ background: tint(c.art.base, 0.14) }}>
                      <span className="absolute top-[13%] left-1/2 -translate-x-1/2 font-display text-[0.95rem] text-ink/40 italic">{roman(i + 1)}</span>
                      <ProductVisual product={lead} sizes="(max-width: 640px) 40vw, 18vw" className="pack-lift h-[66%] w-[74%]" />
                    </div>
                    <h3 className="mt-4 font-display text-[1.1rem] leading-tight font-semibold group-hover:text-chilli sm:text-[1.25rem]">{c.name}</h3>
                    <p className="mt-1 font-marathi text-[0.82rem] text-muted">{c.marathi}</p>
                    <p className="oldstyle mt-1 text-[0.64rem] tracking-[0.16em] text-muted uppercase">{count} products</p>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

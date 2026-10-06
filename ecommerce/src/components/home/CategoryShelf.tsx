import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { leadProduct, productsByCategory } from "@/lib/data/products";
import { tint } from "@/components/product/PackArt";
import { ProductVisual } from "@/components/product/ProductVisual";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { roman } from "@/lib/format";

export function CategoryShelf() {
  return (
    <section className="py-16 sm:py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          chapter="Chapter I"
          eyebrow="The Pantry"
          title={
            <>
              Seven shelves, <em className="text-chilli">one</em> family kitchen.
            </>
          }
          intro="Everything we make, arranged the way it sits in an Indian kitchen — from the everyday masala dabba to the jars that come out for guests."
          action={
            <Link href="/shop" className="link-underline inline-flex min-h-11 items-center text-[0.72rem] font-medium tracking-[0.2em] uppercase">
              View all products →
            </Link>
          }
        />
      </div>
      <div className="container-x mt-12">
        <ul className="rail rail-inset gap-3 pb-2 sm:gap-4 lg:mx-0 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0 lg:after:hidden">
          {categories.map((c, i) => {
            const lead = leadProduct(c.slug);
            const count = productsByCategory(c.slug).length;
            return (
              <li key={c.slug} className="w-[42%] sm:w-[28%] lg:w-auto">
                <Reveal delay={i * 70}>
                  <Link href={`/shop?category=${c.slug}`} className="group block text-center">
                    <div
                      className="arch relative flex aspect-[3/4.2] items-end justify-center overflow-hidden px-5 pb-5"
                      style={{ background: tint(c.art.base, 0.14) }}
                    >
                      <span className="absolute top-[14%] left-1/2 -translate-x-1/2 font-display text-[0.95rem] text-ink/40 italic">
                        {roman(i + 1)}
                      </span>
                      <ProductVisual product={lead} sizes="(max-width: 640px) 40vw, 14vw" className="pack-lift h-[68%] w-[78%]" />
                      <span className="absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-ink/20 arch" />
                    </div>
                    <h3 className="mt-4 font-display text-[1.2rem] leading-tight font-semibold group-hover:text-chilli">{c.name}</h3>
                    <p className="mt-0.5 font-marathi text-[0.8rem] text-muted">{c.marathi}</p>
                    <p className="oldstyle mt-1 text-[0.68rem] tracking-[0.18em] text-muted uppercase">{count} items</p>
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

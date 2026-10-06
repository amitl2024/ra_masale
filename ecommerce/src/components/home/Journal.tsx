import Link from "next/link";
import { recipes, reviews } from "@/lib/data/site";
import { getProduct } from "@/lib/data/products";
import { PackArt } from "@/components/product/PackArt";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stars } from "@/components/ui/Stars";

export function Journal() {
  return (
    <section className="bg-ivory/60 py-16 sm:py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          chapter="Chapter VII"
          eyebrow="The kitchen journal"
          title="Recipes worth the masala."
          action={<span className="text-[0.72rem] tracking-[0.2em] text-muted uppercase">New recipes every month</span>}
        />
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {recipes.map((r, i) => {
            const p = getProduct(r.uses)!;
            return (
              <li key={r.slug}>
                <Reveal delay={i * 100}>
                  <article className="group">
                    <Link href={`/product/${p.slug}`} className="block overflow-hidden">
                      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: r.tint }}>
                        <PackArt
                          art={p.art}
                          name={p.name}
                          seed={r.slug}
                          view="spice"
                          className="absolute -right-[12%] -bottom-[22%] h-[130%] w-auto opacity-95 transition-transform duration-[1.2s] ease-out-soft group-hover:scale-105 group-hover:-rotate-6"
                        />
                        <span className="absolute top-4 left-4 bg-ivory px-2.5 py-1.5 text-[0.6rem] tracking-[0.2em] uppercase">
                          {r.time} · {r.level}
                        </span>
                      </div>
                    </Link>
                    <h3 className="mt-5 font-display text-[1.6rem] leading-tight font-semibold">{r.title}</h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{r.excerpt}</p>
                    <p className="mt-3 text-[0.75rem] text-muted">
                      Made with{" "}
                      <Link href={`/product/${p.slug}`} className="link-underline text-chilli">
                        {p.name}
                      </Link>
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        {/* reviews */}
        <div className="mt-24 border-t border-rule pt-16">
          <p className="eyebrow text-center text-chilli">From kitchens across India</p>
          <ul className="mt-10 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-rule">
            {reviews.map((r, i) => (
              <li key={i} className="md:px-10 md:first:pl-0 md:last:pr-0">
                <Reveal delay={i * 100}>
                  <figure>
                    <Stars rating={5} size={13} />
                    <blockquote className="mt-4 font-display text-[1.45rem] leading-snug italic">“{r.quote}”</blockquote>
                    <figcaption className="mt-5 text-[0.72rem] tracking-[0.16em] text-muted uppercase">
                      {r.city} · on {r.product} <span className="normal-case tracking-normal opacity-70">({r.name})</span>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

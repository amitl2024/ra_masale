import type { Metadata } from "next";
import Link from "next/link";
import { company, process, timeline } from "@/lib/data/site";
import { categories } from "@/lib/data/categories";
import { leadProduct } from "@/lib/data/products";
import { ProductVisual } from "@/components/product/ProductVisual";
import { Reveal } from "@/components/ui/Reveal";
import { Seal } from "@/components/ui/Seal";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PackArt, tint } from "@/components/product/PackArt";
import { getProduct } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Our Story — Since 1972",
  description:
    "RA Masale was founded in 1972 by Shri Ramchandra Vasant Divate and Sou Vijaya Ramchandra Divate in Sangli, Maharashtra — beginning with a small batch of onion garlic chutney.",
  alternates: { canonical: "/our-story" },
};

const values = [
  { title: "Carefully selected raw materials", body: "Quality begins long before grinding — with the choice of what goes into every batch." },
  { title: "Traditional recipes", body: "The family’s recipes are the reference point for every blend we make." },
  { title: "Modern production", body: "Modernised processes bring consistency, hygiene and food safety at scale." },
  { title: "Customer satisfaction", body: "Fifty years of repeat kitchens is the measure we care about most." },
];

export default function OurStoryPage() {
  const chutney = getProduct("kanda-lasun-chutney")!;
  return (
    <>
      {/* opening */}
      <section className="border-b border-rule">
        <div className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-chilli">Our story · आमची कहाणी</p>
            <h1 className="mt-6 font-headline text-display-xl leading-[0.95] text-balance">
              It began with <em className="text-chilli">one</em> chutney.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[1.05rem] leading-relaxed text-ink-soft">
              In 1972, in Sangli, Bhau and Aai made a small quantity of onion-garlic chutney. More than fifty years later,
              the family still makes food the same way — with care for every ingredient and every customer.
            </p>
          </div>
        </div>
      </section>

      {/* founders */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="arch grid aspect-[4/5] place-items-end overflow-hidden bg-chilli-deep px-[18%] pb-[10%]">
                <PackArt
                  art={chutney.art}
                  name={chutney.name}
                  marathi={chutney.marathi}
                  seed={chutney.slug}
                  netWt="100 g"
                  className="hero-float w-full drop-shadow-[0_30px_30px_rgba(0,0,0,0.4)]"
                />
              </div>
              <Seal size={120} className="absolute -right-1 -bottom-8 sm:-right-4 lg:-right-8" bg="var(--color-turmeric)" color="var(--color-ink)" id="story-seal" />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
            <p className="eyebrow text-chilli">The founders</p>
            <h2 className="mt-5 font-headline text-display-md leading-[1.05]">Bhau &amp; Aai</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {company.founders.map((f) => (
                <div key={f.name} className="border-t border-ink pt-5">
                  <p className="font-display text-[1.35rem] leading-tight">{f.name}</p>
                  <p className="mt-1 text-[0.8rem] tracking-[0.16em] text-muted uppercase">Known as {f.known}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.8] text-ink-soft">
              <p>
                RA Masale was founded in {company.founded} by Shri Ramchandra Vasant Divate and Sou Vijaya Ramchandra Divate.
                The journey began with the production of a small quantity of Onion Garlic Chutney.
              </p>
              <p>
                Over the years the family expanded into spices and food products — always with the same focus on quality,
                traditional recipes and customer satisfaction that the first batch was made with.
              </p>
            </div>
            <figure className="mt-10 border-l-2 border-chilli pl-6">
              <blockquote className="font-display text-[1.45rem] leading-snug italic">
                “Traditional recipes, combined with modern production — so the taste never changes.”
              </blockquote>
              <figcaption className="mt-3 text-[0.72rem] tracking-[0.16em] text-muted uppercase">
                The RA Masale way (placeholder quote)
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* timeline */}
      <section className="bg-ink py-20 text-ivory md:py-28">
        <div className="container-x">
          <SectionHeading tone="light" eyebrow="Our journey" title="Fifty years, in five chapters." align="center" />
          <ol className="relative mx-auto mt-16 max-w-4xl">
            <span className="absolute top-0 bottom-0 left-4 w-px bg-ivory/15 md:left-1/2" aria-hidden />
            {[...timeline, { year: "Tomorrow", title: "Growing, with the same care", body: "Continued expansion — and a continued focus on quality." }].map(
              (t, i) => (
                <li key={t.title} className={`relative mb-14 pl-14 last:mb-0 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"}`}>
                  <span
                    className={`absolute top-2 left-4 h-3 w-3 -translate-x-1/2 rotate-45 border border-turmeric ${i === 0 ? "bg-turmeric" : "bg-ink"} ${
                      i % 2 ? "md:left-0" : "md:right-0 md:left-auto md:translate-x-1/2"
                    }`}
                    aria-hidden
                  />
                  <Reveal delay={60}>
                    <p className="eyebrow text-turmeric">{t.year}</p>
                    <h3 className="mt-3 font-display text-[1.6rem] leading-tight">{t.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ivory/65">{t.body}</p>
                  </Reveal>
                </li>
              ),
            )}
          </ol>
        </div>
      </section>

      {/* philosophy & quality */}
      <section id="quality" className="scroll-mt-24 py-16 sm:py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our philosophy"
            title="Quality at every step."
            intro="We don’t claim certifications here that haven’t been verified — when RA Food Products supplies FSSAI and other certificate details, they will appear in this section."
          />
          <ul className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <li key={v.title} className="bg-paper p-8">
                <Reveal delay={i * 80}>
                  <span className="font-display text-[0.95rem] text-chilli italic">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-[1.3rem] leading-tight">{v.title}</h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">{v.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-16 grid gap-6 sm:grid-cols-5">
            {process.map((p) => (
              <div key={p.title} className="text-center">
                <span className="font-display text-[2.2rem] text-chilli/70 italic">{p.no}</span>
                <p className="mt-2 font-display text-[1.1rem]">{p.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* categories */}
      <section className="border-t border-rule bg-ivory/60 py-16 sm:py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="What we make" title="From the masala dabba to the pickle shelf." align="center" />
          <Ornament className="mx-auto mt-6 text-chilli/50" />
          <ul className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-7">
            {categories.map((c) => {
              const lead = leadProduct(c.slug);
              return (
                <li key={c.slug}>
                  <Link href={`/shop?category=${c.slug}`} className="group block text-center">
                    <div className="arch grid aspect-[3/4] place-items-end px-6 pb-4" style={{ background: tint(c.art.base, 0.14) }}>
                      <ProductVisual product={lead} sizes="160px" className="pack-lift h-[70%] w-[80%]" />
                    </div>
                    <p className="mt-3 font-display text-[1.05rem] group-hover:text-chilli">{c.name}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* units */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Where it’s made" title="Three units in Sangli district." />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {company.units.map((u, i) => (
              <li key={u.name} className="border border-rule bg-ivory p-8">
                <span className="font-display text-[3rem] leading-none text-chilli/70 italic">{["I", "II", "III"][i]}</span>
                <h3 className="mt-5 font-display text-[1.35rem]">
                  {u.name} · {u.place}
                </h3>
                <address className="mt-3 text-[0.9rem] leading-relaxed text-muted not-italic">
                  {u.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                  <span className="block">Maharashtra, India</span>
                </address>
              </li>
            ))}
          </ul>
          <div className="mt-14 text-center">
            <Link href="/shop" className="btn btn-primary">
              Taste fifty years
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

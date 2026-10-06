import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Seal } from "@/components/ui/Seal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { ManufacturingFlow } from "@/components/sections/ManufacturingFlow";
import { QualitySection } from "@/components/sections/QualitySection";
import { DistributionSection } from "@/components/sections/DistributionSection";
import { WhyRA } from "@/components/sections/WhyRA";
import { ProductVisual } from "@/components/product/ProductVisual";
import { getProduct } from "@/lib/data/products";
import { company } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "About Us — A Family Food Business Since 1972",
  description:
    "RA Masale was founded in 1972 in Sangli by Shri Ramchandra Vasant Divate and Sou Vijaya Ramchandra Divate, beginning with Onion Garlic Chutney.",
  alternates: { canonical: "/about" },
};

const philosophy = [
  { title: "Recipes first", body: "Modern production serves the recipe — never the other way round." },
  { title: "Ingredients matter", body: "Carefully selected raw materials are the foundation of consistent taste." },
  { title: "Every customer counts", body: "Fifty years of trust is earned one kitchen at a time." },
];

export default function AboutPage() {
  const goda = getProduct("goda-masala")!;
  return (
    <>
      <PageHero
        eyebrow="About us · आमच्याबद्दल"
        title={
          <>
            A family kitchen that became a <em className="text-chilli">food house.</em>
          </>
        }
        lede="RA Masale / RA Food Products is a family-owned manufacturer of spices and food products in Sangli, Maharashtra — making flavours families trust since 1972."
        crumbs={[{ name: "About Us" }]}
      />

      {/* 1. Our story + 2. Founders */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="min-w-0 lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="arch relative aspect-[4/5] overflow-hidden bg-chilli-deep">
                <div className="absolute bottom-[8%] left-1/2 aspect-[305/476] h-[72%] -translate-x-1/2">
                  <div className="hero-float h-full w-full">
                    <ProductVisual product={goda} sizes="(max-width: 1024px) 60vw, 25vw" className="h-full w-full" />
                  </div>
                </div>
              </div>
              <Seal size={116} className="absolute -right-1 -bottom-8 origin-bottom-right scale-[0.8] sm:-right-6 sm:scale-100" bg="var(--color-turmeric)" color="var(--color-ink)" id="about-seal" />
            </div>
          </Reveal>
          <Reveal className="min-w-0 lg:col-span-6 lg:col-start-7" delay={120}>
            <p className="eyebrow text-chilli">Our story</p>
            <h2 className="mt-5 font-headline text-display-md leading-[1.05]">It began with one chutney.</h2>
            <div className="mt-6 space-y-5 text-[1.02rem] leading-[1.8] text-ink-soft">
              <p>
                RA Masale was founded in {company.founded} by Shri Ramchandra Vasant Divate and Sou Vijaya Ramchandra Divate.
                The journey began with the production of a small quantity of Onion Garlic Chutney.
              </p>
              <p>
                Over the years the company expanded its range into spices, masalas and food products, while keeping its focus
                on quality, traditional recipes and customer satisfaction.
              </p>
            </div>
            <p className="eyebrow mt-10 text-chilli">Our founders</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {company.founders.map((f) => (
                <div key={f.name} className="border border-rule bg-ivory p-5">
                  <p className="font-display text-[1.2rem] leading-tight">{f.name}</p>
                  <p className="mt-1.5 text-[0.72rem] tracking-[0.16em] text-muted uppercase">Fondly known as {f.known}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. 50+ years of legacy */}
      <section className="border-y border-rule bg-ivory/70">
        <div className="container-x grid gap-8 py-12 sm:grid-cols-3 md:py-16">
          {[
            [<Counter key="a" to={50} suffix="+" />, "Years of legacy", "Making food products in Sangli since 1972."],
            [<Counter key="b" to={3} />, "Manufacturing units", "Kavathe Ekand, Navjeevan Nagar and Madhavnagar."],
            [<Counter key="c" to={5} />, "Product categories", "Spices & masalas, ready-mix, papads, pickles and more."],
          ].map(([v, t, b], i) => (
            <div key={i} className={i > 0 ? "border-rule sm:border-l sm:pl-8" : ""}>
              <p className="font-headline text-[3rem] leading-none text-chilli">{v}</p>
              <p className="mt-3 font-display text-[1.2rem]">{t}</p>
              <p className="mt-1 text-[0.88rem] text-muted">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Philosophy */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Our philosophy" title="Traditional recipes. Modern care." align="center" />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {philosophy.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 90} className="h-full border border-rule bg-ivory p-7 text-center sm:p-9">
                  <span className="font-display text-[2.2rem] text-chilli/70 italic">{["I", "II", "III"][i]}</span>
                  <h3 className="mt-3 font-display text-[1.35rem]">{p.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{p.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Product categories */}
      <div className="border-t border-rule bg-ivory/50">
        <CategoryGrid />
      </div>

      {/* 6. Manufacturing */}
      <ManufacturingFlow />

      {/* 7. Quality commitment */}
      <QualitySection />

      {/* 8. Distribution network */}
      <DistributionSection />

      <WhyRA />

      {/* 9. Team / people */}
      <section className="border-t border-rule bg-ivory/60 py-16 sm:py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <p className="eyebrow text-chilli">Our team &amp; people</p>
            <h2 className="mt-5 font-headline text-display-md leading-[1.05]">The family — and the people who make it.</h2>
          </div>
          <div className="min-w-0 lg:col-span-6 lg:col-start-7">
            <p className="text-[1rem] leading-relaxed text-ink-soft">
              Behind every pack is a team across our three units — in sourcing, production, quality and dispatch — and a
              family that still runs the business founded by Bhau and Aai.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {["Leadership", "Production", "Quality"].map((r) => (
                <div key={r} className="border border-dashed border-rule p-4 text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-parchment/70" aria-hidden />
                  <p className="mt-3 text-[0.8rem] font-medium">{r}</p>
                  <p className="text-[0.7rem] text-muted">Profile to be added</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Future vision */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-chilli">Future vision</p>
            <h2 className="mt-5 font-headline text-display-lg leading-[1.02] text-balance">
              The next fifty years should taste <em className="text-chilli">just like the first.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-ink-soft">
              Continued expansion of our range and distribution network — with the same focus on quality, recipes and the
              families who trust us.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 min-[420px]:flex-row">
              <Link href="/products" className="btn btn-primary">
                Explore products
              </Link>
              <Link href="/journey" className="btn btn-outline">
                Our journey
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

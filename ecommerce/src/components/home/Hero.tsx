import Link from "next/link";
import { ProductVisual } from "@/components/product/ProductVisual";
import { Seal } from "@/components/ui/Seal";
import { getProduct, products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { ArrowRight } from "@/components/ui/Icons";
import { pad } from "@/lib/format";

export function Hero() {
  const goda = getProduct("goda-masala")!;
  const garam = getProduct("garam-masala")!;
  const sambhar = getProduct("sambhar-masala")!;

  return (
    <section className="relative overflow-hidden">
      <div className="container-x relative grid items-center gap-12 pt-8 pb-16 md:pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="hero-in eyebrow flex items-center gap-3 text-chilli" style={{ animationDelay: "60ms" }}>
            <span className="h-px w-10 bg-current" /> Sangli, Maharashtra · Since 1972
          </p>
          <h1
            className="hero-in mt-6 font-headline text-display-xl leading-[0.95] tracking-[-0.02em] text-balance"
            style={{ animationDelay: "140ms" }}
          >
            Fifty years of flavour, <em className="font-normal text-chilli">ground</em> the way it was at home.
          </h1>
          <p className="hero-in mt-7 max-w-lg text-[1.02rem] leading-relaxed text-ink-soft" style={{ animationDelay: "240ms" }}>
            From a small batch of onion-garlic chutney in 1972 to a full pantry of masalas, pickles and papads — RA Masale
            pairs family recipes and carefully chosen ingredients with modern production.
          </p>
          <div className="hero-in mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: "320ms" }}>
            <Link href="/shop" className="btn btn-primary group">
              Shop the pantry
              <ArrowRight width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/our-story" className="link-underline inline-flex min-h-11 items-center text-[0.74rem] font-medium tracking-[0.2em] uppercase">
              Read our story
            </Link>
          </div>

          <dl className="hero-in mt-12 grid max-w-lg grid-cols-3 border-t border-rule pt-6" style={{ animationDelay: "420ms" }}>
            {[
              ["50+", "Years in Sangli"],
              [String(categories.length), "Collections"],
              [String(products.length), "Kitchen staples"],
            ].map(([n, l], i) => (
              <div key={l} className={i > 0 ? "border-l border-rule pl-4 sm:pl-5" : ""}>
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="oldstyle block font-display text-[1.9rem] leading-none font-medium sm:text-[2.3rem]">{n}</span>
                  <span className="mt-2 block text-[0.62rem] tracking-[0.1em] text-muted uppercase sm:text-[0.68rem] sm:tracking-[0.18em]">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* arch vitrine */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:col-span-6 lg:max-w-none xl:pl-10">
          <div className="hero-in relative" style={{ animationDelay: "200ms" }}>
            <div className="arch relative aspect-[4/4.6] overflow-hidden bg-chilli-deep sm:aspect-[4/4.4]">
              {/* concentric arch lines */}
              <svg viewBox="0 0 400 460" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <path
                    key={i}
                    d={`M${22 + i * 26} 460 V${190 + i * 20} Q${22 + i * 26} ${30 + i * 32} 200 ${18 + i * 30} Q${378 - i * 26} ${30 + i * 32} ${378 - i * 26} ${190 + i * 20} V460`}
                    fill="none"
                    stroke="#D9A23A"
                    strokeOpacity={0.22 - i * 0.025}
                    strokeWidth="1"
                  />
                ))}
              </svg>
              {/* floor */}
              <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-black/25 to-transparent" />
              {/* real RA pouches on the shelf */}
              <div className="absolute bottom-[9%] left-[7%] h-[44%] aspect-[267/416] -rotate-[7deg]">
                <div className="hero-float h-full w-full [animation-delay:-3s]">
                  <ProductVisual product={garam} priority sizes="(max-width: 1024px) 34vw, 16vw" className="h-full w-full" />
                </div>
              </div>
              <div className="absolute right-[7%] bottom-[9%] h-[44%] aspect-[300/468] rotate-[7deg]">
                <div className="hero-float h-full w-full [animation-delay:-5s]">
                  <ProductVisual product={sambhar} priority sizes="(max-width: 1024px) 30vw, 14vw" className="h-full w-full" />
                </div>
              </div>
              <div className="absolute bottom-[7%] left-1/2 z-10 h-[60%] aspect-[305/476] -translate-x-1/2">
                <div className="hero-float h-full w-full">
                  <ProductVisual product={goda} priority sizes="(max-width: 1024px) 40vw, 18vw" className="h-full w-full" />
                </div>
              </div>
            </div>
            <Seal
              size={124}
              className="absolute -top-2 -left-1 origin-top-left scale-[0.68] sm:top-auto sm:-bottom-8 sm:-left-8 sm:origin-bottom-left sm:scale-100"
              bg="var(--color-turmeric)"
              color="var(--color-ink)"
              id="hero-seal"
            />
            {/* museum caption */}
            <Link
              href={`/product/${goda.slug}`}
              className="group absolute inset-x-3 -bottom-6 flex items-center gap-3 border border-rule bg-ivory px-4 py-3 shadow-[0_12px_30px_-18px_rgba(30,26,23,0.5)] sm:inset-x-auto sm:-right-4 sm:gap-4 sm:px-5"
            >
              <span className="oldstyle font-display text-[0.95rem] text-muted italic">No. {pad(goda.catalogueNo)}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[1.1rem] leading-tight font-semibold group-hover:text-chilli">
                  {goda.name}
                </span>
                <span className="block text-[0.66rem] tracking-[0.18em] text-muted uppercase">The house signature</span>
              </span>
              <ArrowRight width={16} height={16} className="shrink-0 text-chilli transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

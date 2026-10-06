import Link from "next/link";
import { productsByCategory } from "@/lib/data/products";
import { PackArt } from "@/components/product/PackArt";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";
import { formatPrice } from "@/lib/format";

export function GiftBand() {
  const gifts = productsByCategory("gift-boxes");
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      {/* gold hairline frame */}
      <div className="pointer-events-none absolute inset-2 border border-gold/30 sm:inset-5" aria-hidden />
      <div className="pointer-events-none absolute inset-[14px] border border-gold/15 sm:inset-[26px]" aria-hidden />
      <div className="container-x relative py-16 sm:py-20 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-turmeric">Chapter VI · The Gifting Room</p>
          <h2 className="mt-5 font-headline text-display-lg leading-[1] text-balance">
            Gifts that arrive smelling of home.
          </h2>
          <Ornament className="mx-auto mt-6 text-gold/70" />
          <p className="mt-6 text-[1rem] leading-relaxed text-ivory/70">
            Hand-packed keepsake boxes for Diwali, weddings and new homes. Add a handwritten note at checkout.
          </p>
        </Reveal>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {gifts.map((g, i) => (
            <li key={g.slug}>
              <Reveal delay={i * 100}>
                <Link href={`/product/${g.slug}`} className="group block border border-ivory/10 bg-ivory/[0.03] p-6 transition-colors duration-500 hover:border-gold/50">
                  <div className="arch-sm grid aspect-[4/3.6] place-items-center bg-ivory/[0.05] px-10 pt-8">
                    <PackArt
                      art={g.art}
                      name={g.name}
                      seed={g.slug}
                      ribbon
                      netWt={g.packSizes[0].label}
                      className="pack-lift h-full w-auto drop-shadow-[0_24px_24px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-[1.45rem] leading-tight font-semibold group-hover:text-turmeric">{g.name}</h3>
                      <p className="mt-1 text-[0.85rem] text-ivory/60">{g.shortDescription}</p>
                    </div>
                    <p className="shrink-0 font-display text-[1.35rem]">{formatPrice(g.packSizes[0].price)}</p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ProductVisual } from "@/components/product/ProductVisual";
import { Seal } from "@/components/ui/Seal";
import { getProduct } from "@/lib/data/products";
import { ArrowRight } from "@/components/ui/Icons";

export function Hero() {
  const goda = getProduct("goda-masala")!;
  const garam = getProduct("garam-masala")!;
  const sambhar = getProduct("sambhar-masala")!;

  return (
    <section className="relative overflow-hidden">
      <div className="container-x relative grid items-center gap-12 pt-8 pb-20 sm:pt-12 lg:grid-cols-12 lg:gap-10 lg:pt-16 lg:pb-24">
        <div className="min-w-0 lg:col-span-6">
          <p className="hero-in eyebrow flex items-center gap-3 text-chilli" style={{ animationDelay: "60ms" }}>
            <span className="h-px w-10 bg-current" /> RA Masale · RA Food Products
          </p>
          <h1 className="hero-in mt-6 font-headline text-display-xl leading-[0.98] tracking-[-0.015em] text-balance" style={{ animationDelay: "140ms" }}>
            50+ Years of Bringing <em className="text-chilli">Authentic Flavours</em> to Every Kitchen
          </h1>
          <p className="hero-in mt-7 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft" style={{ animationDelay: "240ms" }}>
            From our humble beginnings in 1972 to a growing food-products brand, RA Masale combines traditional recipes,
            carefully selected ingredients and modern manufacturing to deliver flavours families can trust.
          </p>
          <div className="hero-in mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap" style={{ animationDelay: "320ms" }}>
            <Link href="/products" className="btn btn-primary group">
              Explore products
              <ArrowRight width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Contact us
            </Link>
          </div>
        </div>

        {/* arch vitrine with real RA pouches */}
        <div className="relative mx-auto w-full max-w-[32rem] lg:col-span-6 lg:max-w-none xl:pl-10">
          <div className="hero-in relative" style={{ animationDelay: "200ms" }}>
            <div className="arch relative aspect-[4/4.5] overflow-hidden bg-chilli-deep">
              <svg viewBox="0 0 400 460" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <path
                    key={i}
                    d={`M${22 + i * 26} 460 V${190 + i * 20} Q${22 + i * 26} ${30 + i * 32} 200 ${18 + i * 30} Q${378 - i * 26} ${30 + i * 32} ${378 - i * 26} ${190 + i * 20} V460`}
                    fill="none"
                    stroke="#D9A23A"
                    strokeOpacity={0.22 - i * 0.025}
                  />
                ))}
              </svg>
              {/* drifting spice specks */}
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                {[
                  [18, 30, 0],
                  [72, 22, -3],
                  [40, 14, -6],
                  [84, 46, -2],
                  [12, 58, -8],
                  [60, 36, -5],
                ].map(([l, t, d], i) => (
                  <span
                    key={i}
                    className="spice-drift absolute h-1.5 w-1.5 rounded-full bg-turmeric/60"
                    style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${d}s` }}
                  />
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-[9%] left-[6%] aspect-[267/416] h-[44%] -rotate-[7deg]">
                <div className="hero-float h-full w-full [animation-delay:-3s]">
                  <ProductVisual product={garam} priority sizes="(max-width: 1024px) 34vw, 16vw" className="h-full w-full" />
                </div>
              </div>
              <div className="absolute right-[6%] bottom-[9%] aspect-[300/468] h-[44%] rotate-[7deg]">
                <div className="hero-float h-full w-full [animation-delay:-5s]">
                  <ProductVisual product={sambhar} priority sizes="(max-width: 1024px) 30vw, 14vw" className="h-full w-full" />
                </div>
              </div>
              <div className="absolute bottom-[7%] left-1/2 z-10 aspect-[305/476] h-[60%] -translate-x-1/2">
                <div className="hero-float h-full w-full">
                  <ProductVisual product={goda} priority sizes="(max-width: 1024px) 40vw, 18vw" className="h-full w-full" />
                </div>
              </div>
            </div>
            <Seal
              size={124}
              className="absolute -bottom-10 -left-1 origin-bottom-left scale-[0.7] sm:-left-8 sm:scale-100"
              bg="var(--color-turmeric)"
              color="var(--color-ink)"
              id="hero-seal"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

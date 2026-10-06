import Link from "next/link";
import { getProduct } from "@/lib/data/products";
import { PackArt } from "@/components/product/PackArt";
import { ProductVisual } from "@/components/product/ProductVisual";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";
import { Stars } from "@/components/ui/Stars";
import { AddToBagButton } from "@/components/product/AddToBagButton";
import { formatPrice } from "@/lib/format";

export function Signature() {
  const p = getProduct("goda-masala")!;
  const pack = p.packSizes[1] ?? p.packSizes[0];
  return (
    <section className="relative overflow-hidden bg-[#2a1c14] text-ivory">
      <div className="container-x grid items-center gap-12 py-16 sm:py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-2 mx-auto w-full max-w-md lg:order-1">
          <div className="relative aspect-square">
            <div className="absolute inset-0 rounded-full border border-turmeric/25" />
            <div className="absolute inset-[7%] rounded-full border border-turmeric/15" />
            <PackArt art={p.art} name={p.name} seed={p.slug} view="spice" className="absolute inset-[4%] h-[92%] w-[92%]" />
            <div className="absolute -right-[2%] -bottom-[6%] aspect-[305/476] w-[40%]">
              <div className="hero-float h-full w-full">
                <ProductVisual product={p} sizes="(max-width: 1024px) 40vw, 18vw" className="h-full w-full drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)]" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={120}>
          <p className="eyebrow flex items-center gap-3 text-turmeric">
            <span className="font-display text-[0.95rem] tracking-normal normal-case italic">Chapter III</span>
            <span className="h-px w-8 bg-current opacity-50" />
            The house signature
          </p>
          <h2 className="mt-5 font-headline text-display-lg leading-[1] text-balance">
            Goda Masala — the quiet soul of a Maharashtrian kitchen.
          </h2>
          <p className="mt-2 font-marathi text-[1.1rem] text-turmeric/80">{p.marathi}</p>
          <p className="mt-6 max-w-lg text-[1rem] leading-relaxed text-ivory/75">{p.description}</p>
          <Ornament className="mt-8 text-turmeric/60" />
          <dl className="mt-6 grid max-w-lg grid-cols-3 gap-4 text-[0.82rem]">
            {p.notes.map((n, i) => (
              <div key={n}>
                <dt className="text-[0.62rem] tracking-[0.2em] text-ivory/45 uppercase">Note {i + 1}</dt>
                <dd className="mt-1 font-display text-[1.2rem] italic">{n}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <AddToBagButton slug={p.slug} size={pack.label} className="btn bg-turmeric text-ink hover:bg-ivory">
              Add to bag — {formatPrice(pack.price)}
            </AddToBagButton>
            <Link href={`/product/${p.slug}`} className="link-underline inline-flex min-h-11 items-center text-[0.72rem] tracking-[0.2em] uppercase">
              Details &amp; recipes
            </Link>
          </div>
          <p className="mt-6 flex items-center gap-2 text-[0.78rem] text-ivory/60">
            <Stars rating={p.rating} /> {p.rating} · {p.reviewCount} kitchens reviewed
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Seal } from "@/components/ui/Seal";
import { timeline } from "@/lib/data/site";

export function Heritage() {
  return (
    <section className="py-16 sm:py-20 md:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-3 text-chilli">
            <span className="font-display text-[0.95rem] tracking-normal normal-case italic">Chapter IV</span>
            <span className="h-px w-8 bg-current opacity-50" />
            Since 1972
          </p>
          <div className="relative mt-6">
            <span
              className="block font-headline text-[7.5rem] leading-[0.8] text-transparent sm:text-[10rem]"
              style={{ WebkitTextStroke: "1.2px var(--color-chilli)" }}
              aria-hidden
            >
              1972
            </span>
            <Seal size={104} className="absolute -top-4 right-0 sm:right-6 lg:-right-4" id="heritage-seal" />
          </div>
          <h2 className="mt-6 font-headline text-display-md leading-[1.05] text-balance">
            A legacy built on taste, trust &amp; tradition.
          </h2>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
          <div className="space-y-5 text-[1.02rem] leading-[1.8] text-ink-soft">
            <p>
              <span className="float-left mt-1 mr-3 font-display text-[4.2rem] leading-[0.8] font-semibold text-chilli">R</span>
              A Masale was founded in 1972 by <strong className="font-medium text-ink">Shri Ramchandra Vasant Divate</strong>{" "}
              — Bhau — and <strong className="font-medium text-ink">Sou Vijaya Ramchandra Divate</strong> — Aai. It began with
              a small quantity of onion-garlic chutney, made with the same care as it was at home.
            </p>
            <p>
              Over five decades the family grew that single chutney into a full pantry of spices and food products, adding
              modern production while keeping the recipes, the raw-material selection and the attention to every customer
              exactly where they began.
            </p>
          </div>
          <ol className="mt-12 border-l border-rule">
            {timeline.map((t, i) => (
              <li key={t.title} className="relative pb-7 pl-8 last:pb-0">
                <span
                  className={`absolute top-1.5 -left-[5px] h-[9px] w-[9px] rotate-45 ${i === 0 ? "bg-chilli" : "border border-chilli bg-paper"}`}
                  aria-hidden
                />
                <p className="text-[0.66rem] tracking-[0.2em] text-chilli uppercase">{t.year}</p>
                <p className="mt-1 font-display text-[1.25rem] leading-tight font-semibold">{t.title}</p>
              </li>
            ))}
          </ol>
          <Link href="/our-story" className="btn btn-outline mt-10">
            The full story
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

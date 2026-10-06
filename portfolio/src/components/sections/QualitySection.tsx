import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { commitments } from "@/lib/data/site";

export function QualitySection({ cta = true }: { cta?: boolean }) {
  return (
    <section id="quality" className="scroll-mt-24 bg-[#2a1c14] py-16 text-ivory sm:py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          tone="light"
          eyebrow="Quality"
          title="Quality at Every Step"
          intro="From raw-material selection to the sealed pack, our commitment is simple: the same honest taste, every time."
          action={
            cta ? (
              <Link href="/quality" className="link-underline inline-flex min-h-10 items-center text-[0.7rem] font-semibold tracking-[0.18em] text-turmeric uppercase">
                Our quality approach →
              </Link>
            ) : undefined
          }
        />
        <ul className="mt-12 grid gap-px border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((c, i) => {
            const lead = i === 0;
            const last = i >= commitments.length - 2;
            return (
              <li
                key={c.title}
                // 7 cards → 12 cells: lead card spans 2×2 and the last two span 2 columns, so every row is full
                className={`bg-[#2a1c14] ${lead ? "sm:col-span-2 lg:row-span-2" : ""} ${last ? "lg:col-span-2" : ""}`}
              >
                <Reveal delay={i * 60} className="flex h-full flex-col p-6 sm:p-8">
                  <span className="font-display text-[0.95rem] text-turmeric italic">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={`mt-4 font-display leading-tight ${lead ? "text-[1.6rem] sm:text-[2.2rem]" : "text-[1.25rem]"}`}>{c.title}</h3>
                  <p className={`mt-3 leading-relaxed text-ivory/65 ${lead ? "max-w-md text-[1rem]" : "max-w-sm text-[0.9rem]"}`}>{c.body}</p>
                  {lead && (
                    <div className="mt-10 flex items-end justify-between gap-6 border-t border-ivory/10 pt-6 lg:mt-auto">
                      <p className="max-w-xs font-display text-[1.15rem] leading-snug text-ivory/80 italic">
                        The same honest taste, every time — since 1972.
                      </p>
                      <span className="font-headline text-[3.5rem] leading-none text-turmeric/25 sm:text-[4.5rem]" aria-hidden>
                        1972
                      </span>
                    </div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-[0.78rem] text-ivory/45">
          Certification details (e.g. FSSAI) will be published here once supplied and verified by RA Food Products.
        </p>
      </div>
    </section>
  );
}

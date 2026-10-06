import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journey } from "@/lib/data/site";

export function JourneyPreview() {
  return (
    <section className="border-t border-rule bg-ivory/60 py-16 sm:py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="50+ year journey"
          title="From one chutney to a pantry of flavours."
          action={
            <Link href="/journey" className="link-underline inline-flex min-h-10 items-center text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
              The full journey →
            </Link>
          }
        />
      </div>
      <ol className="rail mt-10 gap-0 pb-2 sm:mt-12 lg:mx-auto lg:grid lg:max-w-[88rem] lg:grid-cols-6 lg:overflow-visible lg:px-[var(--gutter)] lg:after:hidden">
        {journey.map((t, i) => (
          <li key={t.title} className="w-[68%] border-l border-rule pr-6 pl-5 first:border-l-0 first:pl-0 sm:w-[40%] lg:w-auto">
            <Reveal delay={i * 80}>
              <span className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rotate-45 ${i === 0 ? "bg-chilli" : "border border-chilli"}`} aria-hidden />
                <span className="eyebrow text-chilli">{t.label}</span>
              </span>
              <p className="mt-4 font-headline text-[2rem] leading-none sm:text-[2.3rem]">{t.year}</p>
              <p className="mt-3 font-display text-[1.1rem] leading-snug">{t.title}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

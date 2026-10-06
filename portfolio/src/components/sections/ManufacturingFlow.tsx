import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { manufacturing } from "@/lib/data/site";

export function ManufacturingFlow() {
  return (
    <section className="py-16 sm:py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Manufacturing"
          title="From raw material to your kitchen."
          intro="Traditional recipes, prepared with modernised processes. Step details are indicative and will be confirmed with RA’s production team."
          align="center"
        />
        <ol className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-7 lg:gap-0">
          {/* connecting rule on desktop */}
          <span className="absolute top-[2.15rem] right-[7%] left-[7%] hidden h-px bg-rule lg:block" aria-hidden />
          {manufacturing.map((s, i) => (
            <li key={s.title} className="relative">
              <Reveal delay={i * 80} className="flex h-full gap-4 border border-rule bg-ivory p-5 lg:flex-col lg:items-center lg:border-0 lg:bg-transparent lg:px-3 lg:text-center">
                <span className="relative z-10 grid h-[4.3rem] w-[4.3rem] shrink-0 place-items-center rounded-full border border-chilli/40 bg-paper font-headline text-[1.5rem] text-chilli">
                  {s.no}
                </span>
                <span className="min-w-0">
                  <h3 className="font-display text-[1.15rem] leading-tight lg:mt-4">{s.title}</h3>
                  <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted">{s.body}</p>
                </span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

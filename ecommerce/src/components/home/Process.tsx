import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { process } from "@/lib/data/site";

export function Process() {
  return (
    <section id="quality" className="py-16 sm:py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          chapter="Chapter V"
          eyebrow="Quality at every step"
          title="From the sack to the sealed pouch."
          intro="Carefully selected raw materials, consistent quality and traditional recipes — supported by modernised production and hygienic handling."
          align="center"
        />
        <ol className="mt-16 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-5">
          {process.map((s, i) => (
            <li key={s.title} className="bg-paper">
              <Reveal delay={i * 90} className="flex h-full flex-col p-7 lg:p-8">
                <span className="font-display text-[3.2rem] leading-none font-medium text-chilli/80 italic">{s.no}</span>
                <span className="mt-6 h-px w-10 bg-ink/30" />
                <h3 className="mt-5 font-display text-[1.4rem] leading-tight font-semibold">{s.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

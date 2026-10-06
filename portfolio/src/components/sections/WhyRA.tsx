import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyRA } from "@/lib/data/site";

export function WhyRA() {
  return (
    <section className="py-16 sm:py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Why RA Masale" title="Why Choose RA Masale?" align="center" />
        <ul className="mt-12 grid grid-cols-1 gap-px border border-rule bg-rule min-[480px]:grid-cols-2 lg:grid-cols-4">
          {whyRA.map((w, i) => (
            <li key={w.title} className="bg-paper">
              <Reveal delay={(i % 4) * 70} className="flex h-full flex-col p-6 sm:p-7">
                <span className="font-headline text-[2rem] leading-none text-chilli/70">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 font-display text-[1.2rem] leading-tight">{w.title}</h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">{w.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

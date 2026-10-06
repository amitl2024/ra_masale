import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Seal } from "@/components/ui/Seal";
import { company } from "@/lib/data/site";

export function StoryIntro() {
  return (
    <section className="py-16 sm:py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="min-w-0 lg:col-span-5">
          <p className="eyebrow text-chilli">Our story</p>
          <div className="relative mt-6">
            <span
              className="block font-headline text-[6.5rem] leading-[0.8] text-transparent sm:text-[9.5rem]"
              style={{ WebkitTextStroke: "1.2px var(--color-chilli)" }}
              aria-hidden
            >
              1972
            </span>
            <Seal size={100} className="absolute -top-6 right-0 origin-top-right scale-[0.8] sm:scale-100 lg:-right-2" id="story-seal" />
          </div>
          <h2 className="mt-7 font-headline text-display-md leading-[1.05] text-balance">A Legacy Built on Taste, Trust &amp; Tradition</h2>
        </Reveal>

        <Reveal className="min-w-0 lg:col-span-6 lg:col-start-7" delay={120}>
          <div className="space-y-5 text-[1.02rem] leading-[1.8] text-ink-soft">
            <p>
              RA Masale was founded in {company.founded} by <strong className="font-semibold text-ink">Shri Ramchandra Vasant Divate</strong>{" "}
              (Bhau) and <strong className="font-semibold text-ink">Sou Vijaya Ramchandra Divate</strong> (Aai).
            </p>
            <p>
              The journey began with the production of a small quantity of <em className="font-display text-ink">Onion Garlic Chutney</em>.
              Over the years, the company expanded its product range while keeping its focus on quality, traditional recipes
              and customer satisfaction.
            </p>
            <p>
              Today the family-owned business combines those recipes with modern production processes, careful raw-material
              selection and a distribution network across Maharashtra and parts of India.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/about" className="btn btn-dark">
              About RA Masale
            </Link>
            <Link href="/journey" className="btn btn-outline">
              Our journey
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

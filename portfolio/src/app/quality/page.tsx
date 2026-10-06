import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { QualitySection } from "@/components/sections/QualitySection";
import { ManufacturingFlow } from "@/components/sections/ManufacturingFlow";
import { WhyRA } from "@/components/sections/WhyRA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShieldIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Quality & Manufacturing",
  description:
    "Carefully selected raw materials, consistent quality, traditional recipes and modernised production — how RA Masale makes its spices and food products.",
  alternates: { canonical: "/quality" },
};

/** Fill these in only with certificate details supplied by RA Food Products */
const certifications: { name: string; number?: string; note?: string }[] = [
  { name: "FSSAI" },
  { name: "Other certifications" },
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality · गुणवत्ता"
        title={
          <>
            Quality at <em className="text-chilli">every</em> step.
          </>
        }
        lede="From carefully selected raw materials to modernised, hygienic production, every RA Masale product is made to taste the way it has for fifty years."
        crumbs={[{ name: "Quality" }]}
      />
      <QualitySection cta={false} />
      <ManufacturingFlow />

      <section className="border-t border-rule bg-ivory/60 py-16 sm:py-20 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Certifications"
            title="Licences & certifications"
            intro="We only publish certification details that have been supplied and verified by RA Food Products. This section will list licence numbers and certificates once provided."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {certifications.map((c) => (
              <li key={c.name} className="flex items-start gap-4 border border-dashed border-rule bg-ivory p-6">
                <ShieldIcon width={28} height={28} className="mt-0.5 shrink-0 text-chilli" />
                <div className="min-w-0">
                  <p className="font-display text-[1.25rem]">{c.name}</p>
                  <p className="mt-1 text-[0.88rem] text-muted">{c.number ?? "Details to be supplied by RA Food Products"}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WhyRA />

      <section className="border-t border-rule py-16 sm:py-20">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-headline text-display-md leading-[1.05] text-balance">Questions about a product’s specifications?</h2>
          <Link href="/contact?type=Product%20enquiry#enquiry" className="btn btn-primary w-full md:w-auto">
            Ask our team
          </Link>
        </div>
      </section>
    </>
  );
}

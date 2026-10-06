import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { company } from "@/lib/data/site";

export const metadata: Metadata = { title: "Terms & Conditions", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" crumbs={[{ name: "Terms & Conditions" }]} />
      <section className="container-x max-w-3xl py-14 text-[0.98rem] leading-relaxed text-ink-soft sm:py-20">
        <p className="border-l-2 border-chilli/40 pl-4 text-[0.88rem] text-muted">
          Placeholder — the final terms should be provided or approved by {company.legalName}.
        </p>
        <h2 className="mt-10 font-display text-[1.5rem] text-ink">Use of this website</h2>
        <p className="mt-3">This website provides information about {company.name} and its products. Product information is indicative and may change.</p>
        <h2 className="mt-8 font-display text-[1.5rem] text-ink">Product information</h2>
        <p className="mt-3">Always refer to the product pack for the latest ingredients, nutritional information and storage instructions.</p>
        <h2 className="mt-8 font-display text-[1.5rem] text-ink">Trademarks</h2>
        <p className="mt-3">The RA Masale name, logo and pack designs belong to {company.legalName}.</p>
      </section>
    </>
  );
}

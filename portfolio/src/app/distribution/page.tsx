import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { DistributionSection } from "@/components/sections/DistributionSection";
import { DualEnquiry } from "@/components/sections/DualEnquiry";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Distribution — Become a Distributor",
  description:
    "RA Masale’s distribution network of super stockists and distributors across Maharashtra and parts of India. Enquire to become a distributor.",
  alternates: { canonical: "/distribution" },
};

const steps = [
  { title: "Send an enquiry", body: "Share your business details and territory using the form below." },
  { title: "Conversation", body: "Our team gets in touch to understand your market and requirements." },
  { title: "Range & terms", body: "We agree the product range, supply and commercial terms." },
  { title: "Onboarding", body: "Your first order is dispatched from Sangli and we stay in touch." },
];

export default function DistributionPage() {
  return (
    <>
      <PageHero
        eyebrow="Distribution · वितरण"
        title={
          <>
            Growing across Maharashtra <em className="text-chilli">&amp; beyond.</em>
          </>
        }
        lede="RA Masale reaches kitchens through a network of super stockists and distributors across Maharashtra and some parts of India — and we are always glad to welcome new partners."
        crumbs={[{ name: "Distribution" }]}
      />
      <DistributionSection cta={false} />

      <section className="border-t border-rule py-16 sm:py-20 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title="Becoming an RA Masale partner." align="center" />
          <ol className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-paper">
                <Reveal delay={i * 80} className="flex h-full flex-col p-6 sm:p-8">
                  <span className="font-headline text-[2.6rem] leading-none text-chilli/70">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 font-display text-[1.3rem]">{s.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <DualEnquiry tone="ivory" />
    </>
  );
}

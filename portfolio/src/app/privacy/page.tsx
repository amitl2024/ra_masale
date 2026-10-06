import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { company } from "@/lib/data/site";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" crumbs={[{ name: "Privacy Policy" }]} />
      <section className="container-x max-w-3xl py-14 text-[0.98rem] leading-relaxed text-ink-soft sm:py-20">
        <p className="border-l-2 border-chilli/40 pl-4 text-[0.88rem] text-muted">
          Placeholder — the final policy text should be provided or approved by {company.legalName}.
        </p>
        <h2 className="mt-10 font-display text-[1.5rem] text-ink">Information we collect</h2>
        <p className="mt-3">When you send an enquiry we collect the details you enter, such as your name, company, phone number, email and message.</p>
        <h2 className="mt-8 font-display text-[1.5rem] text-ink">How we use it</h2>
        <p className="mt-3">We use these details only to respond to your enquiry and to discuss products, distribution or orders with you.</p>
        <h2 className="mt-8 font-display text-[1.5rem] text-ink">Contact</h2>
        <p className="mt-3">For any privacy question, please contact us through the enquiry form on the Contact page.</p>
      </section>
    </>
  );
}

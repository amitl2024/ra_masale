import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { b2bFields, distributorFields } from "@/lib/forms";

/**
 * Distributor + B2B/wholesale enquiry forms shown side by side (stacked on phones),
 * so neither column leaves empty space next to a tall form.
 */
export function DualEnquiry({ tone = "paper" }: { tone?: "paper" | "ivory" }) {
  const cards = [
    {
      id: "become-distributor",
      eyebrow: "Become a distributor",
      title: "Carry RA Masale in your region.",
      intro: "For super stockists and distributors across Maharashtra and other states.",
      fields: distributorFields,
      submit: "Submit distributor enquiry",
    },
    {
      id: "partner",
      eyebrow: "Business & wholesale",
      title: "Looking to Partner With RA Masale?",
      intro: "Distributor, retailer, wholesale and institutional enquiries, and bulk orders.",
      fields: b2bFields,
      submit: "Send enquiry",
    },
  ];

  return (
    <section className={`border-t border-rule py-16 sm:py-20 md:py-28 ${tone === "ivory" ? "bg-ivory/60" : ""}`}>
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-chilli">Partner with us</p>
          <h2 className="mt-5 font-headline text-display-md leading-[1.05] text-balance">
            Grow with a <em className="text-chilli">50-year</em> brand.
          </h2>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-soft">
            Whether you want to distribute RA Masale in your region or buy for your store, kitchen or institution — tell us
            a little about your business and our team will get back to you.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-2 lg:gap-8">
          {cards.map((c, i) => (
            <Reveal key={c.id} delay={i * 100} className="h-full">
              <article id={c.id} className="flex h-full scroll-mt-28 flex-col border border-rule bg-ivory">
                <header className="border-b border-rule px-5 py-6 sm:px-8 sm:py-7">
                  <p className="flex items-center gap-3">
                    <span className="font-display text-[1.05rem] text-chilli italic">{i === 0 ? "I." : "II."}</span>
                    <span className="eyebrow text-chilli">{c.eyebrow}</span>
                  </p>
                  <h3 className="mt-3 font-display text-[1.45rem] leading-tight sm:text-[1.7rem]">{c.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{c.intro}</p>
                </header>
                <div className="flex-1 px-5 py-6 sm:px-8 sm:py-8">
                  <EnquiryForm fields={c.fields} submitLabel={c.submit} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

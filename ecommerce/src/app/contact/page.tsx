import type { Metadata } from "next";
import { EnquiryForm, type FieldDef } from "@/components/forms/EnquiryForm";
import { Accordion } from "@/components/product/Accordion";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { company, shipping } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact RA Masale / RA Food Products — three units in Sangli district, Maharashtra.",
  alternates: { canonical: "/contact" },
};

const fields: FieldDef[] = [
  { name: "name", label: "Name", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Mobile", type: "tel", autoComplete: "tel" },
  { name: "topic", label: "Topic", type: "select", options: ["An order", "A product", "Feedback", "Trade enquiry", "Something else"], required: true },
  { name: "message", label: "Message", type: "textarea", required: true },
];

const faqs = [
  { q: "How long does delivery take?", a: "Standard delivery takes 4–6 working days across India; Express is 1–3 days within Maharashtra. (Placeholder policy.)" },
  { q: "Is shipping free?", a: `Shipping is complimentary on orders above ₹${shipping.freeAbove}. Below that, a flat ₹${shipping.standard} applies.` },
  { q: "Can I return a product?", a: "As food products are consumable, we accept returns only for damaged or incorrect items reported within 48 hours of delivery. (Placeholder policy.)" },
  { q: "Do you offer cash on delivery?", a: "Yes, cash on delivery is available on most pincodes." },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="container-x py-14 md:py-20">
          <p className="eyebrow text-chilli">Contact · संपर्क</p>
          <h1 className="mt-6 max-w-3xl font-headline text-display-xl leading-[0.95] text-balance">
            Write to us, or <em className="text-chilli">visit Sangli.</em>
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x">
          <ul className="grid gap-6 md:grid-cols-3">
            {company.units.map((u, i) => (
              <li key={u.name} className="flex flex-col border border-rule bg-ivory">
                <div className="border-b border-rule px-7 py-4">
                  <span className="font-display text-[0.95rem] text-chilli italic">{["I", "II", "III"][i]}.</span>{" "}
                  <span className="eyebrow">{u.name}</span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="font-display text-[1.45rem]">{u.place}</h2>
                  <address className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-ink-soft not-italic">
                    {u.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                    <span className="block">Dist. Sangli, Maharashtra, India</span>
                  </address>
                  <a
                    href={u.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-5 inline-flex min-h-10 items-center gap-2 self-start text-[0.7rem] font-semibold tracking-[0.18em] text-chilli uppercase"
                  >
                    <PinIcon width={16} height={16} /> Open in Google Maps
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="font-headline text-display-md">Get in touch</h2>
              <ul className="mt-8 space-y-5 text-[0.95rem]">
                <li className="flex gap-4">
                  <PhoneIcon className="mt-0.5 shrink-0 text-chilli" />
                  <span>
                    <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="link-underline">
                      {company.phone}
                    </a>
                    <span className="block text-[0.75rem] text-muted">Placeholder — awaiting verified number</span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <MailIcon className="mt-0.5 shrink-0 text-chilli" />
                  <span>
                    <a href={`mailto:${company.email}`} className="link-underline">
                      {company.email}
                    </a>
                    <span className="block text-[0.75rem] text-muted">Placeholder — awaiting verified email</span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <ClockIcon className="mt-0.5 shrink-0 text-chilli" />
                  <span>
                    {company.hours}
                    <span className="block text-[0.75rem] text-muted">Placeholder hours</span>
                  </span>
                </li>
              </ul>
              <div id="faq" className="mt-12 scroll-mt-24">
                <p className="eyebrow mb-2 text-chilli">Frequently asked</p>
                <Accordion items={faqs.map((f) => ({ title: f.q, body: <p>{f.a}</p> }))} />
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="border border-rule bg-ivory p-6 sm:p-10">
                <p className="eyebrow text-chilli">Send a message</p>
                <p className="mt-3 mb-8 font-display text-[1.5rem] leading-snug">
                  Questions about an order, a recipe or a product? We read every message.
                </p>
                <EnquiryForm fields={fields} submitLabel="Send message" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

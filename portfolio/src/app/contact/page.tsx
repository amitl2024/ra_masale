import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactCard } from "@/components/sections/ContactCard";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { ClockIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { b2bFields } from "@/lib/forms";
import { company, enquiryTypes } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact — Units in Sangli, Maharashtra",
  description: "Contact RA Masale / RA Food Products. Three units in Sangli district — Kavathe Ekand, Navjeevan Nagar and Madhavnagar.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage(props: PageProps<"/contact">) {
  const sp = await props.searchParams;
  const product = typeof sp.product === "string" ? sp.product.slice(0, 80) : "";
  const type = typeof sp.type === "string" && enquiryTypes.includes(sp.type) ? sp.type : "";
  const defaults: Record<string, string> = {};
  if (product) defaults.products = product;
  if (type) defaults.type = type;
  if (product) defaults.message = `I would like to know more about ${product} — pack sizes, pricing and availability.`;

  const contactRows = [
    company.phone && { icon: PhoneIcon, label: "Phone", value: company.phone, href: `tel:${company.phone.replace(/\s/g, "")}` },
    company.email && { icon: MailIcon, label: "Email", value: company.email, href: `mailto:${company.email}` },
    company.hours && { icon: ClockIcon, label: "Business hours", value: company.hours },
  ].filter(Boolean) as { icon: typeof PhoneIcon; label: string; value: string; href?: string }[];

  return (
    <>
      <PageHero
        eyebrow="Contact · संपर्क"
        title={
          <>
            Write to us, or <em className="text-chilli">visit Sangli.</em>
          </>
        }
        lede="For product, distributor, wholesale and institutional enquiries, send us a message below — or visit one of our three units in Sangli district."
        crumbs={[{ name: "Contact" }]}
        aside={
          contactRows.length > 0 ? (
            <ul className="mt-6 space-y-3">
              {contactRows.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-3 text-[0.95rem]">
                  <Icon className="shrink-0 text-chilli" />
                  {href ? <a href={href} className="link-underline">{value}</a> : value}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 border-l-2 border-chilli/40 pl-4 text-[0.82rem] text-muted">
              Phone, email, WhatsApp and business hours will appear here once verified by RA Food Products.
            </p>
          )
        }
      />

      <section className="py-14 sm:py-16 md:py-20">
        <div className="container-x">
          <ul className="grid gap-5 md:grid-cols-3">
            {company.units.map((u, i) => (
              <li key={u.name}>
                <ContactCard unit={u} index={i} withMap />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EnquirySection
        id="enquiry"
        tone="ivory"
        eyebrow="Send an enquiry"
        title={product ? <>Enquiry: <em className="text-chilli">{product}</em></> : "How can we help?"}
        intro="Tell us what you’re looking for — a product, pack sizes, distribution or a bulk order — and our team will get back to you."
        fields={b2bFields}
        defaults={defaults}
        submitLabel="Send enquiry"
      />
    </>
  );
}

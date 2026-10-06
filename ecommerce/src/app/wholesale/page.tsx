import type { Metadata } from "next";
import { EnquiryForm, type FieldDef } from "@/components/forms/EnquiryForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { categories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "Wholesale & Distribution",
  description:
    "Become an RA Masale distributor or retailer. Enquire about wholesale, institutional and bulk supply across Maharashtra and India.",
  alternates: { canonical: "/wholesale" },
};

const indianStates = ["Maharashtra", "Karnataka", "Goa", "Gujarat", "Madhya Pradesh", "Telangana", "Andhra Pradesh", "Other"];

const fields: FieldDef[] = [
  { name: "name", label: "Name", required: true, autoComplete: "name" },
  { name: "company", label: "Company", required: true, autoComplete: "organization" },
  { name: "mobile", label: "Mobile", type: "tel", required: true, autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "city", label: "City", required: true },
  { name: "state", label: "State", type: "select", options: indianStates, required: true },
  {
    name: "type",
    label: "Enquiry type",
    type: "select",
    options: ["Distributor", "Super stockist", "Retailer", "Wholesale", "Institutional / HoReCa", "Bulk order"],
    required: true,
  },
  { name: "years", label: "Years in business", type: "number" },
  { name: "products", label: "Products interested in", type: "select", options: ["All products", ...categories.map((c) => c.name)] },
  { name: "quantity", label: "Expected monthly quantity" },
  { name: "message", label: "Message", type: "textarea" },
];

const tiers = [
  { title: "Super stockists", body: "Regional partners who supply our distributor network across a district or zone." },
  { title: "Distributors", body: "Partners who carry the RA Masale range to retailers in their city and surrounding towns." },
  { title: "Retailers", body: "Kirana stores, supermarkets and speciality grocers stocking RA Masale on their shelves." },
  { title: "Institutions & bulk", body: "Hotels, caterers, canteens and bulk buyers ordering in larger pack formats." },
];

export default function WholesalePage() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-chilli">Trade · Distribution · Wholesale</p>
            <h1 className="mt-6 font-headline text-display-xl leading-[0.95] text-balance">
              Growing across Maharashtra <em className="text-chilli">&amp; beyond.</em>
            </h1>
          </div>
          <p className="text-[1.02rem] leading-relaxed text-ink-soft lg:col-span-5">
            RA Masale reaches kitchens through a network of super stockists and distributors across Maharashtra and parts of
            India. If you’d like to carry our range, we would be glad to hear from you.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-24">
        <div className="container-x">
          <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t, i) => (
              <li key={t.title} className="bg-paper p-8">
                <Reveal delay={i * 80}>
                  <span className="font-display text-[2.4rem] leading-none text-chilli/70 italic">{["I", "II", "III", "IV"][i]}</span>
                  <h2 className="mt-5 font-display text-[1.35rem]">{t.title}</h2>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{t.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-24 border-t border-rule bg-ivory/60 py-14 sm:py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Partner with us"
              title="Looking to partner with RA Masale?"
              intro="Tell us a little about your business. Distributor, retailer, wholesale and institutional enquiries are all welcome."
            />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm fields={fields} submitLabel="Send enquiry" />
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { Logo } from "./Logo";
import { Ornament } from "@/components/ui/Ornament";
import { categories } from "@/lib/data/categories";
import { company, mapsLink } from "@/lib/data/site";
import { MailIcon, PhoneIcon } from "@/components/ui/Icons";

const quick = [
  ["Home", "/"],
  ["About", "/about"],
  ["Products", "/products"],
  ["Quality", "/quality"],
  ["Distribution", "/distribution"],
  ["Contact", "/contact"],
];

const business = [
  ["Become a Distributor", "/distribution#become-distributor"],
  ["Wholesale Enquiry", "/contact?type=Wholesale#enquiry"],
  ["Retailer Enquiry", "/contact?type=Retailer#enquiry"],
  ["Institutional & Bulk", "/contact?type=Bulk%20order#enquiry"],
];

/** Add verified profile URLs to show social icons */
const social: { label: string; href: string }[] = [];

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-ivory">
      <div className="container-x grid gap-12 py-14 sm:grid-cols-2 md:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo tone="ivory" align="start" />
          <p className="mt-6 max-w-sm text-[0.92rem] leading-relaxed text-ivory/65">
            A family-owned food products company from Sangli, Maharashtra. Spices, masalas, ready-mix products, papads and
            pickles made with traditional recipes and modern production since {company.founded}.
          </p>
          <Ornament className="mt-6 text-gold/70" width={120} />
          {social.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline text-[0.8rem]">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <FooterCol title="Quick links" className="lg:col-span-2" links={quick} />
        <FooterCol
          title="Product categories"
          className="lg:col-span-3"
          links={categories.map((c) => [c.name, `/products?category=${c.slug}`])}
        />
        <FooterCol title="Business" className="lg:col-span-3" links={business} />
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-x grid gap-8 py-10 text-[0.82rem] text-ivory/60 sm:grid-cols-2 lg:grid-cols-4">
          {company.units.map((u) => (
            <address key={u.name} className="not-italic leading-relaxed">
              <span className="mb-1.5 block font-display text-[1.05rem] text-ivory italic">
                {u.name} · {u.place}
              </span>
              {u.lines.join(", ")}, Maharashtra
              <a href={mapsLink(u.query)} target="_blank" rel="noopener noreferrer" className="link-underline mt-1 inline-flex min-h-10 items-center text-turmeric">
                Directions →
              </a>
            </address>
          ))}
          <div className="space-y-2.5">
            <span className="mb-1.5 block font-display text-[1.05rem] text-ivory italic">Get in touch</span>
            {company.phone && (
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="flex items-center gap-2">
                <PhoneIcon width={15} height={15} /> {company.phone}
              </a>
            )}
            {company.email && (
              <a href={`mailto:${company.email}`} className="flex items-center gap-2">
                <MailIcon width={15} height={15} /> {company.email}
              </a>
            )}
            <Link href="/contact#enquiry" className="link-underline inline-flex min-h-10 items-center text-turmeric">
              Send an enquiry →
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col gap-3 py-6 text-[0.72rem] text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} RA Masale / RA Food Products. All Rights Reserved.</p>
          <p className="flex gap-5">
            <Link href="/privacy" className="link-underline inline-flex min-h-10 items-center">Privacy Policy</Link>
            <Link href="/terms" className="link-underline inline-flex min-h-10 items-center">Terms &amp; Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, className = "" }: { title: string; links: string[][]; className?: string }) {
  return (
    <nav className={className} aria-label={title}>
      <p className="eyebrow mb-5 text-turmeric">{title}</p>
      <ul className="space-y-3 text-[0.92rem] text-ivory/75">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="link-underline hover:text-ivory">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

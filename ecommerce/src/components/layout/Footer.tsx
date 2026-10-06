import Link from "next/link";
import { Logo } from "./Logo";
import { Newsletter } from "./Newsletter";
import { Ornament } from "@/components/ui/Ornament";
import { categories } from "@/lib/data/categories";
import { company } from "@/lib/data/site";

const columns = [
  {
    title: "Help",
    links: [
      ["Contact us", "/contact"],
      ["Shipping & delivery", "/contact#faq"],
      ["Returns", "/contact#faq"],
      ["Track an order", "/contact"],
    ],
  },
  {
    title: "The House",
    links: [
      ["Our story", "/our-story"],
      ["Quality", "/our-story#quality"],
      ["Become a distributor", "/wholesale"],
      ["Wholesale & bulk", "/wholesale"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-ivory">
      {/* letter band */}
      <div className="border-b border-ivory/10">
        <div className="container-x grid gap-8 py-14 md:grid-cols-2 md:items-end md:py-16">
          <div>
            <p className="eyebrow mb-3 text-turmeric">Letters from the spice room</p>
            <h2 className="font-headline text-display-md leading-[1.05] text-balance">
              Recipes, festive drops &amp; the occasional family secret.
            </h2>
          </div>
          <div className="md:justify-self-end">
            <Newsletter tone="light" />
            <p className="mt-3 text-[0.75rem] text-ivory/50">One thoughtful letter a month. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-12 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo tone="ivory" />
          <p className="mt-6 max-w-xs text-[0.9rem] leading-relaxed text-ivory/65">
            A family-owned food house from Sangli, Maharashtra. Spices, blends, pickles and papads made to traditional
            recipes since {company.founded}.
          </p>
          <Ornament className="mt-6 text-gold/70" width={120} />
        </div>
        <nav className="md:col-span-3" aria-label="Shop">
          <p className="eyebrow mb-5 text-turmeric">Shop</p>
          <ul className="space-y-2.5 text-[0.9rem] text-ivory/75">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} className="link-underline hover:text-ivory">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {columns.map((col) => (
          <nav key={col.title} className="md:col-span-2" aria-label={col.title}>
            <p className="eyebrow mb-5 text-turmeric">{col.title}</p>
            <ul className="space-y-2.5 text-[0.9rem] text-ivory/75">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="link-underline hover:text-ivory">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="md:col-span-1" />
      </div>

      <div className="container-x grid gap-6 border-t border-ivory/10 py-10 text-[0.8rem] text-ivory/60 sm:grid-cols-3">
        {company.units.map((u) => (
          <address key={u.name} className="not-italic leading-relaxed">
            <span className="mb-1 block font-display text-[1rem] text-ivory italic">
              {u.name} · {u.place}
            </span>
            {u.lines.join(", ")}
          </address>
        ))}
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col gap-3 py-6 text-[0.72rem] text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name} / {company.legalName}. All rights reserved.
          </p>
          <p className="text-ivory/40">
            Demo storefront — prices, pack sizes, ratings &amp; reviews are placeholder data.
          </p>
          <p className="flex gap-5">
            <Link href="/contact" className="link-underline inline-flex min-h-10 items-center">Privacy</Link>
            <Link href="/contact" className="link-underline inline-flex min-h-10 items-center">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbLd } from "@/lib/seo";

/** Inner-page header: breadcrumb, eyebrow, H1 and a short lede. */
export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs: { name: string; path?: string }[];
  aside?: ReactNode;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="relative overflow-hidden border-b border-rule">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(all)) }} />
      <div className="container-x py-10 sm:py-14 md:py-20">
        <nav aria-label="Breadcrumb" className="text-[0.66rem] tracking-[0.16em] text-muted uppercase">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {all.map((c, i) => (
              <li key={c.name} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {c.path && i < all.length - 1 ? (
                  <Link href={c.path} className="link-underline">
                    {c.name}
                  </Link>
                ) : (
                  <span className="text-ink" aria-current="page">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-8 grid gap-8 md:mt-10 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="min-w-0 lg:col-span-7">
            <p className="eyebrow text-chilli">{eyebrow}</p>
            <h1 className="mt-5 font-headline text-display-xl leading-[0.98] text-balance">{title}</h1>
          </div>
          {(lede || aside) && (
            <div className="min-w-0 lg:col-span-5">
              {lede && <p className="text-[1.02rem] leading-relaxed text-ink-soft">{lede}</p>}
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

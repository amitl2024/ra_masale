import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products, relatedProducts } from "@/lib/data/products";
import { getCategory } from "@/lib/data/categories";
import { company } from "@/lib/data/site";
import { breadcrumbLd, siteUrl } from "@/lib/seo";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductCard } from "@/components/product/ProductCard";
import { InfoTabs } from "@/components/catalogue/InfoTabs";
import { HeatMeter, VegMark } from "@/components/ui/Badges";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icons";
import { pad } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} (${p.marathi})`,
    description: p.shortDescription,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title: `${p.name} | RA Masale`,
      description: p.shortDescription,
      images: p.images?.[0] ? [{ url: p.images[0] }] : undefined,
    },
  };
}

const heatWord = ["No heat", "Mild", "Gentle", "Medium", "Hot", "Fiery"];

function Note() {
  return <p className="mt-4 text-[0.78rem] text-muted italic">Indicative information — to be verified by RA Food Products.</p>;
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) notFound();
  const category = getCategory(p.category)!;
  const related = relatedProducts(p, 4);
  const enquireHref = `/contact?product=${encodeURIComponent(p.name)}&type=${encodeURIComponent("Product enquiry")}#enquiry`;

  // Only fields that exist become tabs — empty fields are never shown
  const tabs = [
    p.ingredients?.length && {
      id: "ingredients",
      label: "Ingredients",
      content: (
        <>
          <p>{p.ingredients.join(", ")}.</p>
          {p.allergens && <p className="mt-3"><strong className="font-semibold text-ink">Allergens:</strong> {p.allergens}</p>}
          <Note />
        </>
      ),
    },
    p.nutritionalInformation?.length && {
      id: "nutrition",
      label: "Nutritional information",
      content: (
        <table className="w-full max-w-md text-[0.9rem]">
          <tbody>
            {p.nutritionalInformation.map((r) => (
              <tr key={r.label} className="border-b border-rule">
                <th className="py-2 text-left font-normal text-muted">{r.label}</th>
                <td className="py-2 text-right">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    p.usageInstructions && { id: "usage", label: "How to use", content: <><p>{p.usageInstructions}</p><Note /></> },
    (p.storageInstructions || p.shelfLife) && {
      id: "storage",
      label: "Storage & shelf life",
      content: (
        <>
          {p.storageInstructions && <p>{p.storageInstructions}</p>}
          {p.shelfLife && <p className="mt-3"><strong className="font-semibold text-ink">Shelf life:</strong> {p.shelfLife}</p>}
        </>
      ),
    },
    {
      id: "specs",
      label: "Specifications",
      content: (
        <dl className="grid max-w-lg grid-cols-[minmax(7rem,auto)_1fr] gap-x-6 gap-y-2.5 text-[0.92rem]">
          <dt className="text-muted">Product code</dt>
          <dd>{p.productCode}</dd>
          <dt className="text-muted">Category</dt>
          <dd>
            {category.name}
            {p.subcategory ? ` · ${p.subcategory}` : ""}
          </dd>
          {p.packSizes?.length ? (
            <>
              <dt className="text-muted">Pack sizes</dt>
              <dd>{p.packSizes.map((s) => s.label).join(", ")}</dd>
            </>
          ) : null}
          {p.netQuantity && (
            <>
              <dt className="text-muted">Net quantity</dt>
              <dd>{p.netQuantity}</dd>
            </>
          )}
          {p.vegetarian !== undefined && (
            <>
              <dt className="text-muted">Diet</dt>
              <dd>{p.vegetarian ? "Vegetarian" : "Non-vegetarian"}</dd>
            </>
          )}
          {p.barcode && (
            <>
              <dt className="text-muted">Barcode</dt>
              <dd>{p.barcode}</dd>
            </>
          )}
        </dl>
      ),
    },
    {
      id: "manufacturer",
      label: "Manufacturer",
      content: (
        <address className="not-italic">
          <strong className="font-semibold text-ink">{company.legalName}</strong>
          <span className="block">{company.units[0].lines.join(", ")}</span>
          <span className="block">Dist. Sangli, Maharashtra, India</span>
          <span className="mt-2 block text-muted">Country of origin: India</span>
        </address>
      ),
    },
  ].filter(Boolean) as { id: string; label: string; content: React.ReactNode }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    sku: p.productCode,
    category: category.name,
    brand: { "@type": "Brand", name: company.name },
    manufacturer: { "@type": "Organization", name: company.legalName },
    image: p.images?.map((i) => `${siteUrl}${i}`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            jsonLd,
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: category.name, path: `/products?category=${category.slug}` },
              { name: p.name },
            ]),
          ]),
        }}
      />

      <div className="container-x pt-6 pb-16 sm:pt-8 lg:pb-24">
        <nav aria-label="Breadcrumb" className="text-[0.66rem] tracking-[0.16em] text-muted uppercase">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li><Link href="/" className="link-underline">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/products" className="link-underline">Products</Link></li>
            <li aria-hidden>/</li>
            <li><Link href={`/products?category=${category.slug}`} className="link-underline">{category.name}</Link></li>
            <li aria-hidden>/</li>
            <li className="text-ink" aria-current="page">{p.name}</li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-10 lg:mt-8 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <ProductGallery product={p} />
            </div>
          </div>

          <div className="min-w-0 lg:col-span-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.68rem] tracking-[0.16em] text-muted uppercase">
              <span className="oldstyle font-display text-[0.95rem] tracking-normal normal-case italic">No. {pad(p.catalogueNo)}</span>
              <span className="h-px w-6 bg-rule" />
              <Link href={`/products?category=${category.slug}`} className="link-underline inline-flex min-h-10 items-center">{category.name}</Link>
              {p.subcategory && <span>· {p.subcategory}</span>}
            </div>
            <h1 className="mt-4 font-headline text-display-lg leading-[1]">{p.name}</h1>
            <p className="mt-2 font-marathi text-[1.15rem] text-chilli">{p.marathi}</p>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-ink">{p.shortDescription}</p>
            <p className="mt-4 text-[0.96rem] leading-relaxed text-ink-soft">{p.description}</p>

            <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-rule py-4 text-[0.8rem]">
              {p.vegetarian && (
                <div>
                  <dt className="sr-only">Diet</dt>
                  <dd><VegMark /></dd>
                </div>
              )}
              {p.heat !== undefined && (
                <div className="flex items-center gap-2">
                  <dt className="text-[0.66rem] tracking-[0.14em] text-muted uppercase">Heat</dt>
                  <dd className="flex items-center gap-2">
                    <HeatMeter level={p.heat} /> <span className="text-ink-soft">{heatWord[p.heat]}</span>
                  </dd>
                </div>
              )}
              {p.notes?.length ? (
                <div className="flex items-center gap-2">
                  <dt className="text-[0.66rem] tracking-[0.14em] text-muted uppercase">Notes</dt>
                  <dd className="font-display italic">{p.notes.join(" · ")}</dd>
                </div>
              ) : null}
            </dl>

            {p.packSizes?.length ? (
              <div className="mt-6">
                <p className="eyebrow text-ink-soft">Available pack sizes</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.packSizes.map((s) => (
                    <li key={s.label} className="min-w-[5.5rem] border border-rule bg-ivory px-4 py-2.5 text-center text-[0.9rem]">
                      {s.label}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[0.75rem] text-muted">Indicative — please enquire for current pack sizes and pricing.</p>
              </div>
            ) : null}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link href={enquireHref} className="btn btn-primary group sm:col-span-2">
                Enquire about this product
                <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              {p.infoSheet && (
                <a href={p.infoSheet} download className="btn btn-outline">
                  Download product information
                </a>
              )}
              <Link href="/distribution#become-distributor" className="btn btn-outline sm:col-span-2">
                Become a distributor
              </Link>
            </div>

            <div className="mt-12">
              <InfoTabs tabs={tabs} />
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-rule bg-ivory/60 py-16 sm:py-20 md:py-24">
          <div className="container-x">
            <SectionHeading eyebrow="Related products" title="You may also like" />
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {related.map((r) => (
                <li key={r.slug}>
                  <ProductCard product={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

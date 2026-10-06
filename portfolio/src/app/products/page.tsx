import type { Metadata } from "next";
import { ProductsView } from "@/components/catalogue/ProductsView";
import { PageHero } from "@/components/ui/PageHero";
import { getCategory } from "@/lib/data/categories";

export async function generateMetadata(props: PageProps<"/products">): Promise<Metadata> {
  const { category } = await props.searchParams;
  const c = typeof category === "string" ? getCategory(category) : undefined;
  return {
    title: c ? `${c.name} — Products` : "Products — Spices, Masalas, Pickles & Papads",
    description: c?.description ?? "Explore RA Masale’s spices & masalas, ready-mix masalas, papads, pickles and other food products.",
    alternates: { canonical: c ? `/products?category=${c.slug}` : "/products" },
  };
}

export default async function ProductsPage(props: PageProps<"/products">) {
  const sp = await props.searchParams;
  const category = typeof sp.category === "string" && getCategory(sp.category) ? sp.category : "all";
  const q = typeof sp.q === "string" ? sp.q : "";
  return (
    <>
      <PageHero
        eyebrow="Products · आमचे पदार्थ"
        title={
          <>
            The RA <em className="text-chilli">pantry.</em>
          </>
        }
        lede="Spices & masalas, ready-mix masalas, papads, pickles and other food products — made with traditional recipes and modern production. Enquire about any product for pack sizes, pricing and availability."
        crumbs={[{ name: "Products" }]}
      />
      <ProductsView key={`${category}|${q}`} initialCategory={category} initialQuery={q} />
    </>
  );
}

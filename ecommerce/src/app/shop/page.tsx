import type { Metadata } from "next";
import { ShopView } from "@/components/shop/ShopView";
import { getCategory } from "@/lib/data/categories";

export async function generateMetadata(props: PageProps<"/shop">): Promise<Metadata> {
  const { category } = await props.searchParams;
  const c = typeof category === "string" ? getCategory(category) : undefined;
  return {
    title: c ? `${c.name} — Shop` : "Shop the Pantry",
    description: c
      ? c.description
      : "Shop RA Masale ground spices, house blends, ready mixes, pickles, papads, festive mixes and gift boxes.",
    alternates: { canonical: c ? `/shop?category=${c.slug}` : "/shop" },
  };
}

export default async function ShopPage(props: PageProps<"/shop">) {
  const sp = await props.searchParams;
  const category = typeof sp.category === "string" && getCategory(sp.category) ? sp.category : "all";
  const q = typeof sp.q === "string" ? sp.q : "";
  return <ShopView key={`${category}|${q}`} initialCategory={category} initialQuery={q} />;
}

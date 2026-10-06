import type { MetadataRoute } from "next";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/our-story", "/wholesale", "/contact"].map((p) => ({ url: `${base}${p}` }));
  const cats = categories.map((c) => ({ url: `${base}/shop?category=${c.slug}` }));
  const items = products.map((p) => ({ url: `${base}/product/${p.slug}` }));
  return [...pages, ...cats, ...items];
}

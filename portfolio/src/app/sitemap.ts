import type { MetadataRoute } from "next";
import { products } from "@/lib/data/products";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/products", "/journey", "/quality", "/distribution", "/contact"].map((p) => ({
    url: `${siteUrl}${p}`,
    priority: p === "" ? 1 : 0.8,
  }));
  const items = products.map((p) => ({ url: `${siteUrl}/products/${p.slug}`, priority: 0.6 }));
  return [...pages, ...items];
}

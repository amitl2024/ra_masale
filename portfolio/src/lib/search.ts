import { products } from "@/lib/data/products";
import { categoryName } from "@/lib/data/categories";

export function searchProducts(q: string) {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return products.filter((p) =>
    [p.name, p.marathi, categoryName(p.category), p.subcategory ?? "", ...(p.notes ?? []), ...(p.ingredients ?? [])]
      .join(" ")
      .toLowerCase()
      .includes(term),
  );
}

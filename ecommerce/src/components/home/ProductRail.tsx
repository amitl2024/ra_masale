import type { ReactNode } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Horizontally scrolling shelf of product cards. */
export function ProductRail({
  chapter,
  eyebrow,
  title,
  intro,
  action,
  products,
}: {
  chapter?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  products: Product[];
}) {
  return (
    <section className="py-16 sm:py-20 md:py-28">
      <div className="container-x">
        <SectionHeading chapter={chapter} eyebrow={eyebrow} title={title} intro={intro} action={action} />
      </div>
      <ul className="rail mt-10 gap-4 pb-2 sm:mt-12 sm:gap-6">
        {products.map((p) => (
          <li key={p.slug} className="w-[72%] min-[480px]:w-[46%] sm:w-[40%] lg:w-[22%] xl:w-[19.5rem]">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}

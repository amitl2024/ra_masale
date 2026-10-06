import Link from "next/link";
import { featuredProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedProducts() {
  const list = featuredProducts().slice(0, 8);
  return (
    <section className="bg-ivory/60 py-16 sm:py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Featured products"
          title="Explore Our Flavours"
          intro="A few of the masalas, chutneys and pickles kitchens across Maharashtra reach for every day."
          action={
            <Link href="/products" className="link-underline inline-flex min-h-10 items-center text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
              View all products →
            </Link>
          }
        />
        <ul className="rail rail-inset mt-10 gap-4 pb-2 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:after:hidden lg:grid-cols-4 lg:gap-6">
          {list.map((p) => (
            <li key={p.slug} className="w-[72%] min-[480px]:w-[46%] sm:w-auto">
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <Link href="/products" className="btn btn-outline">
            View all products →
          </Link>
        </div>
      </div>
    </section>
  );
}

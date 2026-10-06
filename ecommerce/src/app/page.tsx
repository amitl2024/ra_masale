import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CategoryShelf } from "@/components/home/CategoryShelf";
import { Bestsellers } from "@/components/home/Bestsellers";
import { Signature } from "@/components/home/Signature";
import { ProductRail } from "@/components/home/ProductRail";
import { Heritage } from "@/components/home/Heritage";
import { Process } from "@/components/home/Process";
import { GiftBand } from "@/components/home/GiftBand";
import { Journal } from "@/components/home/Journal";
import { TradeCTA } from "@/components/home/TradeCTA";
import { productsByCategory } from "@/lib/data/products";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryShelf />
      <Bestsellers />
      <Signature />
      <ProductRail
        eyebrow="Ready Mix · Dinner, sorted"
        title={
          <>
            Sunday biryani, <em className="text-chilli">on a Tuesday.</em>
          </>
        }
        intro="Complete, measured mixes for the dishes that usually take all afternoon."
        action={
          <Link href="/shop?category=ready-mix" className="link-underline inline-flex min-h-11 items-center text-[0.72rem] font-medium tracking-[0.2em] uppercase">
            Shop ready mixes →
          </Link>
        }
        products={productsByCategory("ready-mix")}
      />
      <div className="container-x">
        <div className="rule-double" />
      </div>
      <Heritage />
      <div className="container-x">
        <div className="rule-double" />
      </div>
      <Process />
      <GiftBand />
      <Journal />
      <TradeCTA />
    </>
  );
}

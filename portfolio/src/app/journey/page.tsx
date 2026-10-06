import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Timeline } from "@/components/sections/Timeline";
import { Counter } from "@/components/ui/Counter";

export const metadata: Metadata = {
  title: "Our Journey — 1972 to Today",
  description: "From a small batch of Onion Garlic Chutney in 1972 to more than 50 years of spices and food products: the RA Masale journey.",
  alternates: { canonical: "/journey" },
};

export default function JourneyPage() {
  return (
    <>
      <PageHero
        eyebrow="Our journey · आमचा प्रवास"
        title={
          <>
            Fifty years, <em className="text-chilli">one</em> recipe for trust.
          </>
        }
        lede="Scroll through the milestones that took RA Masale from one chutney in Sangli to a food-products brand with a growing distribution network."
        crumbs={[{ name: "Our Journey" }]}
        aside={
          <p className="mt-6 flex items-baseline gap-3">
            <span className="font-headline text-[3.5rem] leading-none text-chilli">
              <Counter to={50} suffix="+" />
            </span>
            <span className="text-[0.72rem] tracking-[0.16em] text-muted uppercase">years of experience</span>
          </p>
        }
      />
      <section className="bg-ink py-16 text-ivory sm:py-24 md:py-32">
        <div className="container-x">
          <Timeline tone="light" />
        </div>
      </section>
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-headline text-display-md leading-[1.05] text-balance">Be part of the next chapter.</h2>
          <div className="flex w-full flex-col gap-3 min-[420px]:flex-row md:w-auto">
            <Link href="/distribution#become-distributor" className="btn btn-primary">
              Become a distributor
            </Link>
            <Link href="/products" className="btn btn-outline">
              Explore products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

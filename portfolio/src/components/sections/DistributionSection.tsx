import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { MaharashtraMap } from "./MaharashtraMap";

export function DistributionSection({ cta = true }: { cta?: boolean }) {
  return (
    <section className="py-16 sm:py-20 md:py-28">
      <div className="container-x">
        <Reveal className="grid overflow-hidden bg-leaf text-ivory lg:grid-cols-12">
          <div className="min-w-0 p-7 sm:p-12 lg:col-span-6 lg:p-16">
            <p className="eyebrow text-turmeric">Distribution network</p>
            <h2 className="mt-5 font-headline text-display-md leading-[1.05] text-balance">Growing Across Maharashtra &amp; Beyond</h2>
            <p className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-ivory/75">
              From our three units in Sangli district, RA Masale reaches kitchens through a network of super stockists and
              distributors across Maharashtra and some parts of India.
            </p>
            <ul className="mt-8 grid max-w-md grid-cols-2 gap-px border border-ivory/15 bg-ivory/15 text-[0.82rem]">
              {[
                ["Super stockists", "Regional supply partners"],
                ["Distributors", "City & town coverage"],
                ["Retailers", "Kirana & modern trade"],
                ["Institutions", "Bulk & HoReCa"],
              ].map(([t, b]) => (
                <li key={t} className="bg-leaf p-4">
                  <span className="block font-display text-[1.05rem]">{t}</span>
                  <span className="text-ivory/60">{b}</span>
                </li>
              ))}
            </ul>
            {cta && (
              <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
                <Link href="/distribution#become-distributor" className="btn bg-ivory text-ink hover:bg-turmeric">
                  Become a distributor
                </Link>
                <Link href="/distribution" className="btn btn-outline border-ivory/50 hover:border-ivory hover:bg-ivory hover:text-ink">
                  Our network
                </Link>
              </div>
            )}
          </div>
          <div className="relative min-h-[18rem] bg-black/10 sm:min-h-[22rem] lg:col-span-6">
            <MaharashtraMap className="absolute inset-0 h-full w-full p-4 sm:p-8" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

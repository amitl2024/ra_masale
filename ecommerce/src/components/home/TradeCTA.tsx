import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function TradeCTA() {
  return (
    <section className="py-14 sm:py-20 md:py-24">
      <div className="container-x">
        <Reveal className="relative grid overflow-hidden bg-leaf text-ivory md:grid-cols-12">
          <div className="p-8 sm:p-12 md:col-span-7 lg:p-16">
            <p className="eyebrow text-turmeric">For trade · Distributors · Retailers · Institutions</p>
            <h2 className="mt-5 font-headline text-display-md leading-[1.05] text-balance">
              Carry RA Masale in your store or region.
            </h2>
            <p className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-ivory/75">
              Our super stockists and distributors take RA Masale across Maharashtra and parts of India. We welcome enquiries
              for distribution, retail, wholesale and bulk institutional supply.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/wholesale" className="btn bg-ivory text-ink hover:bg-turmeric">
                Become a distributor
              </Link>
              <Link href="/wholesale#enquiry" className="btn btn-outline border-ivory/50 hover:border-ivory hover:bg-ivory hover:text-ink">
                Bulk enquiry
              </Link>
            </div>
          </div>
          <div className="relative hidden md:col-span-5 md:block">
            <MaharashtraMark />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Abstract, stylised Maharashtra outline with Sangli marked — decorative only. */
function MaharashtraMark() {
  return (
    <svg viewBox="0 0 400 360" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect width="400" height="360" fill="#000" opacity="0.12" />
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={i} cx="150" cy="250" r={30 + i * 32} fill="none" stroke="#D9A23A" strokeOpacity={0.28 - i * 0.025} />
      ))}
      <path
        d="M70 160 L110 120 L160 112 L205 86 L260 92 L300 70 L345 96 L352 140 L318 168 L300 210 L250 226 L222 262 L190 276 L160 300 L130 296 L112 262 L96 222 L76 196 Z"
        fill="#F3EBDD"
        fillOpacity="0.08"
        stroke="#F3EBDD"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        strokeDasharray="3 4"
      />
      <circle cx="150" cy="250" r="6" fill="#D9A23A" />
      <circle cx="150" cy="250" r="12" fill="none" stroke="#D9A23A" />
      <text x="166" y="246" fill="#F3EBDD" fontSize="15" style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
        Sangli
      </text>
      <text x="166" y="262" fill="#F3EBDD" opacity="0.6" fontSize="8" letterSpacing="2">
        THREE UNITS
      </text>
      {[
        [118, 168, "Mumbai"],
        [168, 176, "Pune"],
        [140, 296, "Kolhapur"],
        [290, 120, "Nagpur"],
        [232, 140, "Aurangabad"],
      ].map(([x, y, n]) => (
        <g key={n as string}>
          <circle cx={x as number} cy={y as number} r="2.5" fill="#F3EBDD" opacity="0.8" />
          <text x={(x as number) + 6} y={(y as number) + 3} fill="#F3EBDD" opacity="0.65" fontSize="9">
            {n}
          </text>
        </g>
      ))}
    </svg>
  );
}

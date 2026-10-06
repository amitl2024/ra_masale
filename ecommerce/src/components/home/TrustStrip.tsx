import { HomeIcon, MortarIcon, ShieldIcon, TruckIcon } from "@/components/ui/Icons";
import { shipping } from "@/lib/data/site";

const items = [
  { icon: HomeIcon, title: "Family-owned since 1972", body: "Three generations, one kitchen’s recipes" },
  { icon: MortarIcon, title: "Ground in Sangli", body: "Made across our three units" },
  { icon: TruckIcon, title: "Delivered across India", body: `Free shipping above ₹${shipping.freeAbove}` },
  { icon: ShieldIcon, title: "Secure checkout", body: "UPI, cards & cash on delivery" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-rule bg-ivory/70" aria-label="Why shop with us">
      <ul className="rail md:mx-auto md:grid md:max-w-[88rem] md:grid-cols-4 md:px-[var(--gutter)] md:after:hidden">
        {items.map(({ icon: Icon, title, body }, i) => (
          <li
            key={title}
            className={`flex w-[74%] items-center gap-3.5 py-5 pr-5 sm:w-[44%] md:w-auto md:py-6 md:pr-6 ${
              i > 0 ? "border-l border-rule pl-5 md:pl-6" : ""
            }`}
          >
            <Icon width={26} height={26} className="shrink-0 text-chilli" />
            <span>
              <span className="block font-display text-[1.08rem] leading-tight font-semibold">{title}</span>
              <span className="block text-[0.78rem] text-muted">{body}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

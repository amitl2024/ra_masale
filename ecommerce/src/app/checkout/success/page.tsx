import type { Metadata } from "next";
import Link from "next/link";
import { Seal } from "@/components/ui/Seal";
import { Ornament } from "@/components/ui/Ornament";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false },
};

export default async function SuccessPage(props: PageProps<"/checkout/success">) {
  const sp = await props.searchParams;
  const order = typeof sp.order === "string" ? sp.order.replace(/[^A-Z0-9]/gi, "").slice(0, 12) : "—";

  return (
    <div className="container-x py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Seal size={120} className="mx-auto" id="success-seal" />
        <p className="eyebrow mt-10 text-chilli">Order {order}</p>
        <h1 className="mt-4 font-headline text-display-lg leading-[1.02]">
          Thank you. <em className="text-chilli">Your masalas are on their way.</em>
        </h1>
        <Ornament className="mx-auto mt-8 text-chilli/60" />
        <p className="mt-8 text-[1rem] leading-relaxed text-ink-soft">
          We’ll pack your order in Sangli and send tracking details by email and WhatsApp. This is a demo storefront, so no
          payment was taken and nothing will ship.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/shop" className="btn btn-primary">
            Continue shopping
          </Link>
          <Link href="/our-story" className="btn btn-outline">
            Read our story
          </Link>
        </div>
      </div>
    </div>
  );
}

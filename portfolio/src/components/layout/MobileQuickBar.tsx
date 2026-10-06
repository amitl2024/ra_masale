"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { company } from "@/lib/data/site";
import { PhoneIcon, SearchIcon } from "@/components/ui/Icons";

/** Sticky bottom action bar for phones: call / WhatsApp when verified numbers exist, plus enquiry. */
export function MobileQuickBar() {
  const pathname = usePathname();
  const tel = company.phone.replace(/\s/g, "");
  const wa = company.whatsapp.replace(/\D/g, "");
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-ivory/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <div className="mx-auto grid h-16 max-w-xl grid-cols-[1fr_1fr_1.3fr] items-center gap-1.5 min-[380px]:gap-2 px-[var(--gutter)]">
        {tel ? (
          <a href={`tel:${tel}`} className="flex h-11 items-center justify-center gap-2 border border-rule text-[0.62rem] font-semibold tracking-[0.08em] uppercase min-[380px]:text-[0.64rem] min-[380px]:tracking-[0.16em]">
            <PhoneIcon width={16} height={16} /> Call
          </a>
        ) : (
          <Link
            href="/products"
            className={`flex h-11 items-center justify-center gap-2 border border-rule text-[0.62rem] font-semibold tracking-[0.08em] uppercase min-[380px]:text-[0.64rem] min-[380px]:tracking-[0.16em] ${
              pathname.startsWith("/products") ? "border-ink" : ""
            }`}
          >
            <SearchIcon width={15} height={15} className="hidden min-[380px]:block" /> Products
          </Link>
        )}
        {wa ? (
          <a
            href={`https://wa.me/${wa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center justify-center border border-rule text-[0.64rem] font-semibold tracking-[0.16em] text-leaf uppercase"
          >
            WhatsApp
          </a>
        ) : (
          <Link
            href="/distribution#become-distributor"
            className="flex h-11 items-center justify-center border border-rule text-center text-[0.6rem] leading-tight font-semibold tracking-[0.12em] uppercase"
          >
            Distributor
          </Link>
        )}
        <Link href="/contact#enquiry" className="btn btn-primary !min-h-11 !gap-1 !px-2 !text-[0.62rem] !tracking-[0.08em] min-[380px]:!px-3 min-[380px]:!text-[0.66rem] min-[380px]:!tracking-[0.16em]">
          Enquire now
        </Link>
      </div>
    </div>
  );
}

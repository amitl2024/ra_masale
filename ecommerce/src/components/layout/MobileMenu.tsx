"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Logo } from "./Logo";
import { CloseIcon } from "@/components/ui/Icons";
import { categories } from "@/lib/data/categories";
import { company } from "@/lib/data/site";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${open ? "visible" : "invisible"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/45 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-ivory transition-transform duration-500 ease-out-soft ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-rule px-4">
          <Logo compact />
          <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center" aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile">
          <p className="eyebrow mb-3 text-chilli">Shop the pantry</p>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shop?category=${c.slug}`}
                  onClick={onClose}
                  className="flex items-baseline justify-between border-b border-rule/70 py-3.5"
                >
                  <span className="font-display text-[1.35rem] font-medium">{c.name}</span>
                  <span className="font-marathi text-[0.8rem] text-muted">{c.marathi}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/shop" onClick={onClose} className="block py-3.5 font-display text-[1.35rem] text-chilli italic">
                Shop everything →
              </Link>
            </li>
          </ul>
          <div className="mt-6 grid grid-cols-2 gap-3 text-[0.72rem] tracking-[0.18em] uppercase">
            {[
              ["/our-story", "Our Story"],
              ["/wholesale", "Wholesale"],
              ["/contact", "Contact"],
              ["/cart", "Your Bag"],
            ].map(([href, label]) => (
              <Link key={href} href={href} onClick={onClose} className="border border-rule px-3 py-3.5 text-center">
                {label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="border-t border-rule px-5 py-4 text-[0.78rem] text-muted">
          {company.legalName} · Sangli, Maharashtra · Est. {company.founded}
        </div>
      </div>
    </div>
  );
}

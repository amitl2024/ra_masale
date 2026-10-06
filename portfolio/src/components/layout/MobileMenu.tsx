"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Logo } from "./Logo";
import { CloseIcon } from "@/components/ui/Icons";
import { isActive, navLinks } from "@/lib/nav";
import { company } from "@/lib/data/site";

export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-50 xl:hidden ${open ? "visible" : "invisible"}`} role="dialog" aria-modal="true" aria-label="Menu">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/45 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ivory transition-transform duration-500 ease-out-soft ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[4.25rem] items-center justify-between border-b border-rule px-[var(--gutter)]">
          <Logo compact align="start" />
          <button type="button" onClick={onClose} className="-mr-2.5 grid h-11 w-11 place-items-center" aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-[var(--gutter)] py-4" aria-label="Mobile">
          <ul>
            {navLinks.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onClose}
                  aria-current={isActive(pathname, l.href) ? "page" : undefined}
                  className={`flex items-baseline gap-4 border-b border-rule/70 py-4 ${isActive(pathname, l.href) ? "text-chilli" : ""}`}
                >
                  <span className="w-6 font-display text-[0.85rem] text-muted italic">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[1.45rem] leading-none">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link href="/contact#enquiry" onClick={onClose} className="btn btn-primary w-full">
              Enquire now
            </Link>
            <Link href="/distribution#become-distributor" onClick={onClose} className="btn btn-outline w-full">
              Become a distributor
            </Link>
          </div>
        </nav>
        <div className="border-t border-rule px-[var(--gutter)] py-4 text-[0.78rem] leading-relaxed text-muted">
          {company.legalName} · Three units in Sangli district, Maharashtra · Est. {company.founded}
        </div>
      </div>
    </div>
  );
}

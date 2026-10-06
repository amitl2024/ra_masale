"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";
import { MenuIcon, SearchIcon } from "@/components/ui/Icons";
import { isActive, navLinks } from "@/lib/nav";
import { company } from "@/lib/data/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close overlays on navigation
    setMenu(false);
    setSearch(false);
  }, [pathname]);

  return (
    <>
      {/* utility bar */}
      <div className="hidden bg-chilli-deep text-ivory/85 md:block">
        <div className="container-x flex h-9 items-center justify-between text-[0.64rem] tracking-[0.2em] uppercase">
          <p>Family-owned · Sangli, Maharashtra · Since {company.founded}</p>
          <p className="flex items-center gap-6">
            <Link href="/distribution#become-distributor" className="link-underline">
              Become a distributor
            </Link>
            <Link href="/contact#enquiry" className="link-underline">
              Trade enquiries
            </Link>
          </p>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,box-shadow] duration-500 ${
          scrolled ? "border-rule bg-ivory/95 shadow-[0_10px_30px_-22px_rgba(30,26,23,0.4)] backdrop-blur" : "border-rule/60 bg-paper"
        }`}
      >
        <div className={`container-x flex items-center justify-between gap-2 sm:gap-4 transition-[height] duration-500 ${scrolled ? "h-16" : "h-[4.25rem] md:h-20"}`}>
          <Logo compact={scrolled} align="start" />

          <nav className="hidden items-center gap-6 xl:flex 2xl:gap-8" aria-label="Primary">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(pathname, l.href) ? "page" : undefined}
                className={`link-underline py-1 text-[0.7rem] font-semibold tracking-[0.16em] uppercase transition-colors ${
                  isActive(pathname, l.href) ? "text-chilli" : "text-ink/80 hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-0 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearch(true)}
              className="grid h-11 w-10 place-items-center transition-colors hover:text-chilli sm:w-11"
              aria-label="Search products"
            >
              <SearchIcon />
            </button>
            <Link href="/contact#enquiry" className="btn btn-primary !hidden !min-h-11 !px-5 sm:!inline-flex">
              Enquire now
            </Link>
            <button
              type="button"
              className="-mr-2.5 grid h-11 w-10 place-items-center sm:w-11 xl:hidden"
              aria-label="Open menu"
              aria-expanded={menu}
              onClick={() => setMenu(true)}
            >
              <MenuIcon width={22} height={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menu} onClose={() => setMenu(false)} pathname={pathname} />
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}

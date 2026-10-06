"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { SearchOverlay } from "./SearchOverlay";
import { MobileMenu } from "./MobileMenu";
import { BagIcon, ChevronDown, MenuIcon, SearchIcon, UserIcon } from "@/components/ui/Icons";
import { tint } from "@/components/product/PackArt";
import { ProductVisual } from "@/components/product/ProductVisual";
import { categories } from "@/lib/data/categories";
import { getProduct, productsByCategory } from "@/lib/data/products";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

const leftNav = [
  { href: "/shop?category=house-blends", label: "House Blends" },
  { href: "/shop?category=pickles", label: "Pickles" },
  { href: "/shop?category=gift-boxes", label: "Gifting" },
];
const rightNav = [
  { href: "/our-story", label: "Our Story" },
  { href: "/wholesale", label: "Wholesale" },
];

const megaFeatured = ["goda-masala", "sangli-kitchen-box"];

export function Header() {
  const pathname = usePathname();
  const { count, open: openCart, ready } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close overlays on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset UI when navigating
    setMega(false);
    setSearch(false);
    setMenu(false);
  }, [pathname]);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMega(false), 120);
  };

  const navLink =
    "link-underline py-1 text-[0.72rem] font-medium tracking-[0.2em] uppercase text-ink/85 hover:text-ink";

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-500 ${
          scrolled || mega ? "border-rule bg-ivory/95 shadow-[0_10px_30px_-20px_rgba(30,26,23,0.35)] backdrop-blur" : "border-rule/60 bg-paper"
        }`}
      >
        <div
          className={`container-x grid grid-cols-[1fr_auto_1fr] items-center transition-[height] duration-500 ${
            scrolled ? "h-16" : "h-[4.5rem] sm:h-[5.5rem]"
          }`}
        >
          {/* left */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="-ml-2.5 grid h-11 w-10 place-items-center sm:w-11 lg:hidden"
              aria-label="Open menu"
              onClick={() => setMenu(true)}
            >
              <MenuIcon width={22} height={22} />
            </button>
            <nav className="hidden items-center gap-5 lg:flex xl:gap-8" aria-label="Primary">
              <div onMouseEnter={openMega} onMouseLeave={closeMega} className="relative">
                <button
                  type="button"
                  className={`${navLink} inline-flex items-center gap-1.5`}
                  aria-expanded={mega}
                  aria-controls="mega-menu"
                  onClick={() => setMega((v) => !v)}
                >
                  Shop <ChevronDown width={13} height={13} className={`transition-transform ${mega ? "rotate-180" : ""}`} />
                </button>
              </div>
              {leftNav.map((l) => (
                <Link key={l.href} href={l.href} className={navLink}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* centre */}
          <div className="flex justify-center">
            <Logo compact={scrolled} />
          </div>

          {/* right */}
          <div className="flex items-center justify-end gap-0 sm:gap-2">
            <nav className="mr-2 hidden items-center gap-5 lg:flex xl:mr-5 xl:gap-8" aria-label="Secondary">
              {rightNav.map((l) => (
                <Link key={l.href} href={l.href} className={navLink} aria-current={pathname === l.href ? "page" : undefined}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              className="grid h-11 w-10 place-items-center transition-colors hover:text-chilli sm:w-11"
              aria-label="Search"
              onClick={() => setSearch(true)}
            >
              <SearchIcon />
            </button>
            <Link
              href="/contact"
              className="hidden h-11 w-11 place-items-center transition-colors hover:text-chilli sm:grid lg:hidden xl:grid"
              aria-label="Account and help"
            >
              <UserIcon />
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative -mr-2.5 grid h-11 w-10 lg:mr-0 place-items-center transition-colors hover:text-chilli sm:w-11"
              aria-label={`Open bag, ${count} items`}
            >
              <BagIcon />
              {ready && count > 0 && (
                <span className="absolute top-1.5 right-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-chilli px-1 text-[0.6rem] font-medium text-ivory">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* mega menu */}
        <div
          id="mega-menu"
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
          className={`absolute inset-x-0 top-full hidden border-b border-rule bg-ivory transition-all duration-400 lg:block ${
            mega ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="container-x grid grid-cols-12 gap-10 py-10">
            <div className="col-span-5">
              <p className="eyebrow mb-5 text-chilli">The Pantry</p>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-1">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/shop?category=${c.slug}`}
                      className="group/item flex items-baseline justify-between border-b border-rule/60 py-3"
                    >
                      <span>
                        <span className="font-display text-[1.25rem] font-medium group-hover/item:text-chilli">{c.name}</span>
                        <span className="ml-2 font-marathi text-[0.78rem] text-muted">{c.marathi}</span>
                      </span>
                      <span className="oldstyle text-[0.75rem] text-muted">{productsByCategory(c.slug).length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/shop" className="btn btn-dark mt-8">
                Shop everything
              </Link>
            </div>
            <div className="col-span-3 border-l border-rule/70 pl-10">
              <p className="eyebrow mb-5 text-chilli">Shop by occasion</p>
              <ul className="space-y-3.5 font-display text-[1.15rem]">
                {[
                  ["Everyday essentials", "/shop?category=ground-spices"],
                  ["Sunday mutton & biryani", "/shop?category=ready-mix"],
                  ["Diwali faral", "/shop?category=festive"],
                  ["A thali’s companions", "/shop?category=papads"],
                  ["Gifts for a new home", "/shop?category=gift-boxes"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="link-underline italic hover:text-chilli">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-4 grid grid-cols-2 gap-5">
              {megaFeatured.map((slug) => {
                const p = getProduct(slug)!;
                return (
                  <Link key={slug} href={`/product/${slug}`} className="group block">
                    <div className="arch-sm aspect-[4/5] px-6 pt-8 pb-3" style={{ background: tint(p.art.base, 0.14) }}>
                      <ProductVisual product={p} sizes="200px" className="pack-lift h-full w-full" />
                    </div>
                    <p className="mt-3 font-display text-[1.1rem] font-semibold">{p.name}</p>
                    <p className="text-[0.8rem] text-muted">From {formatPrice(p.packSizes[0].price)}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
      <MobileMenu open={menu} onClose={() => setMenu(false)} />
    </>
  );
}

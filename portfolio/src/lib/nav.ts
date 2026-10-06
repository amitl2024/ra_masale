export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/journey", label: "Our Journey" },
  { href: "/quality", label: "Quality" },
  { href: "/distribution", label: "Distribution" },
  { href: "/contact", label: "Contact" },
] as const;

export const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

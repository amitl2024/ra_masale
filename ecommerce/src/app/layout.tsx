import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Display, Libre_Caslon_Text, Libre_Franklin, Tiro_Devanagari_Marathi } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { company } from "@/lib/data/site";

// Caslon (1720s) for headlines & labels, Franklin Gothic (1902) for text — a classic print-house pairing
const caslonDisplay = Libre_Caslon_Display({
  variable: "--font-caslon-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const caslonText = Libre_Caslon_Text({
  variable: "--font-caslon-text",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const franklin = Libre_Franklin({
  variable: "--font-franklin",
  subsets: ["latin"],
  display: "swap",
});

const tiro = Tiro_Devanagari_Marathi({
  variable: "--font-tiro",
  subsets: ["devanagari", "latin"],
  weight: "400",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RA Masale | Authentic Spices & Food Products Since 1972",
    template: "%s | RA Masale",
  },
  description:
    "RA Masale brings over 50 years of experience in spices, masalas, ready-mix products, papads, pickles and other food products, combining traditional recipes with modern production.",
  openGraph: {
    type: "website",
    siteName: "RA Masale",
    locale: "en_IN",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#5e1512",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  legalName: company.legalName,
  foundingDate: String(company.founded),
  founder: company.founders.map((f) => ({ "@type": "Person", name: f.name })),
  url: siteUrl,
  address: company.units.map((u) => ({
    "@type": "PostalAddress",
    streetAddress: u.lines.slice(0, -1).join(", "),
    addressLocality: "Sangli",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={`${caslonDisplay.variable} ${caslonText.variable} ${franklin.variable} ${tiro.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <CartProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory">
            Skip to content
          </a>
          <AnnouncementBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

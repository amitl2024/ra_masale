import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Display, Libre_Caslon_Text, Libre_Franklin, Tiro_Devanagari_Marathi } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileQuickBar } from "@/components/layout/MobileQuickBar";
import { company } from "@/lib/data/site";
import { siteUrl } from "@/lib/seo";

// Caslon (1720s) for headlines & labels, Franklin Gothic (1902) for text — a classic print-house pairing
const caslonDisplay = Libre_Caslon_Display({ variable: "--font-caslon-display", subsets: ["latin"], weight: "400", display: "swap" });
const caslonText = Libre_Caslon_Text({
  variable: "--font-caslon-text",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});
const franklin = Libre_Franklin({ variable: "--font-franklin", subsets: ["latin"], display: "swap" });
const tiro = Tiro_Devanagari_Marathi({ variable: "--font-tiro", subsets: ["devanagari", "latin"], weight: "400", display: "swap" });

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
    title: "RA Masale | Authentic Spices & Food Products Since 1972",
    description:
      "Over 50 years of spices, masalas, ready-mix products, papads and pickles from Sangli, Maharashtra.",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#5e1512" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  legalName: company.legalName,
  alternateName: "RA Food Products",
  foundingDate: String(company.founded),
  founder: company.founders.map((f) => ({ "@type": "Person", name: f.name })),
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
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
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${caslonDisplay.variable} ${caslonText.variable} ${franklin.variable} ${tiro.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-screen flex-col pb-16 lg:pb-0">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileQuickBar />
      </body>
    </html>
  );
}

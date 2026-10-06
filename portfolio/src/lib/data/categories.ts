import type { Category, CategorySlug } from "@/lib/types";

/**
 * Product categories.
 * NOTE: descriptive copy is placeholder and should be confirmed by RA Food Products.
 */
export const categories: Category[] = [
  {
    slug: "spices-masalas",
    name: "Spices & Masalas",
    marathi: "मसाले",
    tagline: "Ground spices & house blends",
    description:
      "Everyday ground spices and the family’s blended masalas — from chilli, turmeric and coriander to Goda, Garam and Misal masala.",
    subcategories: ["Ground Spices", "Blended Masalas", "Seasonal Masalas"],
    art: { base: "#8E1B17", accent: "#D9A23A", spice: "#B3261E", shape: "pouch" },
  },
  {
    slug: "ready-mix",
    name: "Ready-Mix Masalas",
    marathi: "तयार मसाले",
    tagline: "Complete mixes, measured for you",
    description: "Ready-mix masalas for biryani, gravies and starters — made to save time and add new flavours to everyday dishes.",
    art: { base: "#5E1512", accent: "#E7C27A", spice: "#8A3A1C", shape: "box" },
  },
  {
    slug: "papads",
    name: "Papads",
    marathi: "पापड",
    tagline: "The crackle of every thali",
    description: "Urad and disco papads made with traditional recipes — roast or fry for the perfect crunch.",
    art: { base: "#B08A3E", accent: "#5E1512", spice: "#E8D6A8", shape: "packet" },
  },
  {
    slug: "pickles",
    name: "Pickles",
    marathi: "लोणची",
    tagline: "Home-style, matured in oil",
    description: "Mango, green chilli, mixed and sweet lemon pickles crafted using traditional recipes.",
    art: { base: "#3F5B3A", accent: "#D9A23A", spice: "#C9722E", shape: "jar" },
  },
  {
    slug: "other",
    name: "Other Food Products",
    marathi: "इतर पदार्थ",
    tagline: "Chutneys, bhajani & more",
    description:
      "Chutneys, flours and festive mixes that don’t fit on any other shelf — including the onion-garlic chutney our story began with.",
    art: { base: "#C9722E", accent: "#5E1512", spice: "#D9A23A", shape: "pouch" },
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const categoryName = (slug: CategorySlug) => getCategory(slug)?.name ?? slug;

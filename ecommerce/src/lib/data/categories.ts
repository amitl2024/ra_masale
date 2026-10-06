import type { Category, CategorySlug } from "@/lib/types";

/**
 * Storefront categories.
 * NOTE: Demo content — copy is placeholder and should be confirmed by RA Food Products.
 */
export const categories: Category[] = [
  {
    slug: "ground-spices",
    name: "Ground Spices",
    marathi: "दळलेले मसाले",
    tagline: "Single-origin, finely ground",
    description:
      "Everyday essentials — chilli, turmeric, coriander and cumin — ground fine and sealed to hold their colour and aroma.",
    art: { base: "#8E1B17", accent: "#D9A23A", spice: "#B3261E", shape: "pouch" },
  },
  {
    slug: "house-blends",
    name: "House Blends",
    marathi: "घरगुती मसाले",
    tagline: "Recipes from the family kitchen",
    description:
      "Roasted, balanced blends for Maharashtrian and Indian cooking — from Goda Masala to Misal and Garam Masala.",
    art: { base: "#3F2A1E", accent: "#C9722E", spice: "#6B3B22", shape: "pouch" },
  },
  {
    slug: "ready-mix",
    name: "Ready Mix",
    marathi: "तयार मसाले",
    tagline: "Dinner, sorted in minutes",
    description:
      "Complete gravy and biryani mixes that save time without cutting corners on flavour.",
    art: { base: "#5E1512", accent: "#E7C27A", spice: "#8A3A1C", shape: "box" },
  },
  {
    slug: "pickles",
    name: "Pickles",
    marathi: "लोणची",
    tagline: "Sun-matured, home-style",
    description:
      "Mango, green chilli, lemon and mixed pickles made to traditional recipes.",
    art: { base: "#3F5B3A", accent: "#D9A23A", spice: "#C9722E", shape: "jar" },
  },
  {
    slug: "papads",
    name: "Papads",
    marathi: "पापड",
    tagline: "Thin, crisp, roasted or fried",
    description:
      "Urad and disco papads — the crackle that completes a thali.",
    art: { base: "#B08A3E", accent: "#5E1512", spice: "#E8D6A8", shape: "packet" },
  },
  {
    slug: "festive",
    name: "Festive & Seasonal",
    marathi: "सणासुदीचे",
    tagline: "For faral, fasts and feasts",
    description:
      "Chakali bhajani, chiwda masala and seasonal blends that taste like celebration.",
    art: { base: "#C9722E", accent: "#5E1512", spice: "#D9A23A", shape: "pouch" },
  },
  {
    slug: "gift-boxes",
    name: "Gift Boxes",
    marathi: "भेट संच",
    tagline: "Curated pantry sets",
    description:
      "Hand-packed boxes of our house favourites — for weddings, Diwali and new homes.",
    art: { base: "#1E1A17", accent: "#B08A3E", spice: "#8E1B17", shape: "box" },
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const categoryName = (slug: CategorySlug) => getCategory(slug)?.name ?? slug;

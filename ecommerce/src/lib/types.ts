export type CategorySlug =
  | "ground-spices"
  | "house-blends"
  | "ready-mix"
  | "pickles"
  | "papads"
  | "festive"
  | "gift-boxes";

export type PackShape = "pouch" | "jar" | "packet" | "box";

export interface PackArt {
  /** Main pack colour */
  base: string;
  /** Secondary / trim colour */
  accent: string;
  /** Colour of the spice itself (used for bowls, fills, speckles) */
  spice: string;
  shape: PackShape;
}

export interface PackSize {
  label: string;
  price: number;
  mrp: number;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  marathi: string;
  tagline: string;
  description: string;
  /** Representative art for tiles */
  art: PackArt;
}

export interface Product {
  slug: string;
  name: string;
  marathi: string;
  category: CategorySlug;
  /** Catalogue number shown on cards, e.g. "No. 014" */
  catalogueNo: number;
  sku: string;
  shortDescription: string;
  description: string;
  notes: string[];
  ingredients: string[];
  packSizes: PackSize[];
  usage: string;
  storage: string;
  shelfLife: string;
  vegetarian: boolean;
  /** 0 – 5, omitted where heat is not relevant */
  heat?: number;
  rating: number;
  reviewCount: number;
  badge?: "Bestseller" | "New" | "Signature" | "Limited";
  featured?: boolean;
  /** Real photography can be dropped in later; illustrated pack art is used when empty */
  images?: string[];
  art: PackArt;
  pairsWith?: string[];
  /** For gift boxes: slugs of contents */
  contents?: string[];
  availability: "in-stock" | "low-stock" | "out-of-stock";
}

export interface CartLine {
  slug: string;
  size: string;
  qty: number;
}

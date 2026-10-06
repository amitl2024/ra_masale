export type CategorySlug = "spices-masalas" | "ready-mix" | "papads" | "pickles" | "other";

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
  /** Optional — only shown when supplied & verified */
  mrp?: number;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  marathi: string;
  tagline: string;
  description: string;
  subcategories?: string[];
  art: PackArt;
}

export interface NutritionRow {
  label: string;
  value: string;
}

/**
 * CMS-ready product model. Every field except identity fields is optional and
 * the public site never renders a field that is empty.
 */
export interface Product {
  slug: string;
  name: string;
  marathi: string;
  category: CategorySlug;
  subcategory?: string;
  /** Catalogue number shown on cards, e.g. "No. 014" */
  catalogueNo: number;
  productCode: string;
  shortDescription: string;
  description: string;
  notes?: string[];
  images?: string[];
  ingredients?: string[];
  packSizes?: PackSize[];
  netQuantity?: string;
  nutritionalInformation?: NutritionRow[];
  allergens?: string;
  usageInstructions?: string;
  storageInstructions?: string;
  shelfLife?: string;
  barcode?: string;
  vegetarian?: boolean;
  /** 0 – 5, omitted where heat is not relevant */
  heat?: number;
  featured?: boolean;
  /** Product information sheet (PDF) — "Download" button appears only when set */
  infoSheet?: string;
  availability?: "available" | "seasonal" | "on-request";
  art: PackArt;
  pairsWith?: string[];
}

import Image from "next/image";
import type { Product } from "@/lib/types";
import { PackArt, type PackView } from "./PackArt";

/**
 * Shows the real RA pack photograph when one exists, otherwise the illustrated pack.
 * The wrapper must give it a size (height or aspect ratio); the visual fills it, centred.
 */
export function ProductVisual({
  product,
  className = "",
  sizes = "(max-width: 640px) 50vw, 25vw",
  priority = false,
  view = "pack",
  netWt,
  shadow = true,
}: {
  product: Product;
  className?: string;
  sizes?: string;
  priority?: boolean;
  view?: PackView;
  netWt?: string;
  shadow?: boolean;
}) {
  const photo = product.images?.[0];
  if (photo && view !== "spice") {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={photo}
          alt={`${product.name} — RA Masale pack`}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-contain ${view === "label" ? "origin-top scale-[1.9]" : ""} ${
            shadow ? "drop-shadow-[0_18px_16px_rgba(30,26,23,0.22)]" : ""
          }`}
        />
      </div>
    );
  }
  return (
    <div className={`relative flex items-end justify-center ${className}`}>
      <PackArt
        art={product.art}
        name={product.name}
        marathi={product.marathi}
        seed={product.slug}
        netWt={netWt ?? product.packSizes[0].label.split(" ·")[0]}
        ribbon={product.category === "gift-boxes"}
        view={view}
        className={`h-full w-full ${shadow ? "drop-shadow-[0_18px_16px_rgba(30,26,23,0.14)]" : ""}`}
      />
    </div>
  );
}

export const hasPhoto = (p: Product) => Boolean(p.images?.length);

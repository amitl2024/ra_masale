"use client";

import type { ReactNode } from "react";
import { useCart } from "@/lib/cart";

export function AddToBagButton({
  slug,
  size,
  qty = 1,
  className = "btn btn-primary",
  children,
}: {
  slug: string;
  size: string;
  qty?: number;
  className?: string;
  children: ReactNode;
}) {
  const { add } = useCart();
  return (
    <button type="button" className={className} onClick={() => add(slug, size, qty)}>
      {children}
    </button>
  );
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, PackSize, Product } from "@/lib/types";
import { getProduct } from "@/lib/data/products";
import { shipping } from "@/lib/data/site";

const STORAGE_KEY = "ra-cart-v1";

export interface ResolvedLine extends CartLine {
  product: Product;
  pack: PackSize;
  lineTotal: number;
}

interface CartContextValue {
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  savings: number;
  shippingFee: number;
  toFreeShipping: number;
  isOpen: boolean;
  ready: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, size: string, qty?: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage once on mount
      if (stored) setRaw(JSON.parse(stored));
    } catch {
      /* storage unavailable */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
    } catch {
      /* storage unavailable */
    }
  }, [raw, ready]);

  // lock page scroll synchronously so a navigation from the drawer starts at the top
  const setDrawer = useCallback((next: boolean) => {
    document.documentElement.style.overflow = next ? "hidden" : "";
    setOpen(next);
  }, []);

  const add = useCallback((slug: string, size: string, qty = 1) => {
    setRaw((prev) => {
      const hit = prev.find((l) => l.slug === slug && l.size === size);
      if (hit) {
        return prev.map((l) => (l === hit ? { ...l, qty: Math.min(l.qty + qty, 20) } : l));
      }
      return [...prev, { slug, size, qty }];
    });
    setDrawer(true);
  }, [setDrawer]);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setRaw((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.slug === slug && l.size === size))
        : prev.map((l) => (l.slug === slug && l.size === size ? { ...l, qty: Math.min(qty, 20) } : l)),
    );
  }, []);

  const remove = useCallback((slug: string, size: string) => {
    setRaw((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const lines: ResolvedLine[] = raw.flatMap((l) => {
      const product = getProduct(l.slug);
      const pack = product?.packSizes.find((s) => s.label === l.size);
      if (!product || !pack) return [];
      return [{ ...l, product, pack, lineTotal: pack.price * l.qty }];
    });
    const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
    const mrpTotal = lines.reduce((s, l) => s + l.pack.mrp * l.qty, 0);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const free = subtotal >= shipping.freeAbove;
    return {
      lines,
      count,
      subtotal,
      savings: mrpTotal - subtotal,
      shippingFee: subtotal === 0 || free ? 0 : shipping.standard,
      toFreeShipping: Math.max(0, shipping.freeAbove - subtotal),
      isOpen,
      ready,
      open: () => setDrawer(true),
      close: () => setDrawer(false),
      add,
      setQty,
      remove,
      clear: () => setRaw([]),
    };
  }, [raw, isOpen, ready, add, setQty, remove, setDrawer]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

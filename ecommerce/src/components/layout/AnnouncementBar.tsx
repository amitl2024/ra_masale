"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { shipping } from "@/lib/data/site";

const messages = [
  `Free shipping on orders above ₹${shipping.freeAbove}`,
  "Family-owned in Sangli since 1972",
  "The Diwali Faral Box is here — limited edition",
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % messages.length), 4800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-chilli-deep text-ivory">
      <div className="container-x flex h-9 items-center justify-between text-[0.6rem] tracking-[0.12em] uppercase sm:text-[0.66rem] sm:tracking-[0.2em]">
        <span className="hidden opacity-70 lg:block">Pan-India delivery</span>
        <p className="relative mx-auto h-4 w-full max-w-md overflow-hidden text-center lg:mx-0" aria-live="polite">
          {messages.map((m, n) => (
            <span
              key={m}
              className="absolute inset-0 truncate transition-all duration-700"
              style={{ opacity: n === i ? 1 : 0, transform: `translateY(${n === i ? 0 : n < i ? -12 : 12}px)` }}
              aria-hidden={n !== i}
            >
              {m}
            </span>
          ))}
        </p>
        <span className="hidden opacity-70 lg:block">
          <Link href="/wholesale" className="link-underline">Trade &amp; wholesale</Link>
        </span>
      </div>
    </div>
  );
}

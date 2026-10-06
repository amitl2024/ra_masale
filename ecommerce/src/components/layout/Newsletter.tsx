"use client";

import { useState } from "react";

export function Newsletter({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [done, setDone] = useState(false);
  const light = tone === "light";
  return done ? (
    <p className={`font-display text-[1.35rem] italic ${light ? "text-ivory" : ""}`}>
      Thank you — the first letter will reach you soon.
    </p>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className={`flex w-full max-w-md border-b ${light ? "border-ivory/50" : "border-ink"}`}
    >
      <label htmlFor={`nl-${tone}`} className="sr-only">
        Email address
      </label>
      <input
        id={`nl-${tone}`}
        type="email"
        required
        placeholder="Your email address"
        className={`h-12 w-full min-w-0 bg-transparent text-base outline-none ${light ? "text-ivory placeholder:text-ivory/50" : "placeholder:text-muted"}`}
      />
      <button type="submit" className={`shrink-0 px-2 text-[0.7rem] font-medium tracking-[0.22em] uppercase ${light ? "text-turmeric" : "text-chilli"}`}>
        Subscribe
      </button>
    </form>
  );
}

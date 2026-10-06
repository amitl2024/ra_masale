# RA Masale — E-commerce Storefront (demo)

A heritage-styled storefront for RA Masale / RA Food Products (Sangli, est. 1972), built with
Next.js 16 (App Router), TypeScript and Tailwind CSS v4.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Design system

- **Type** — Libre Caslon Display (headlines), Libre Caslon Text (labels, product names, italics),
  Libre Franklin (body & UI), Tiro Devanagari Marathi (Marathi names). Configured in `src/app/layout.tsx`.
- **Palette** — paper, ivory, ink, chilli, saffron, turmeric, gold, leaf. Tokens live in `src/app/globals.css` (`@theme`).
- **Motifs** — mehrab arches (`.arch`), catalogue numbers ("No. 007"), chapter markers, the rotating
  "Est. 1972" seal, ledger double rules, illustrated vintage pack art (`PackArt.tsx`).

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home — hero, category shelf, bestsellers, signature product, heritage, quality, gifting, journal, trade CTA |
| `/shop?category=&q=` | Catalogue with category rail, filters (heat, price, collection, stock), sort, search |
| `/product/[slug]` | Product detail — gallery, pack sizes, qty, buy now, pincode check, accordions, reviews, related |
| `/cart`, `/checkout`, `/checkout/success` | Bag, single-page checkout (demo — no payment taken), confirmation |
| `/our-story`, `/wholesale`, `/contact` | Founders & timeline, distributor / B2B enquiry, three unit addresses + FAQ |

## Data (CMS-ready)

All content is structured data — no product is hard-coded into a component.

- `src/lib/data/products.ts` — product catalogue (`Product` type in `src/lib/types.ts`)
- `src/lib/data/categories.ts` — categories
- `src/lib/data/site.ts` — company facts, unit addresses, timeline, process, sample reviews & recipes

> **Mock data:** prices, pack sizes, ingredients, ratings, reviews, shelf life, phone, email and hours are
> placeholders. Replace them with details verified by RA Food Products before going live.
> Heritage facts (1972, founders, onion garlic chutney) and the three unit addresses are from the company.

### Product photography

Real RA Masale pack photos live in `public/products/*.webp` (10 so far: Goda, Garam, Sambhar, Pav Bhaji,
Sabji, Chaat, Veg. Pulav, Chicken, Mutton and Chicken 65 Masala). They were taken from RA Masale Pvt. Ltd.'s own
IndiaMART seller listing, background-removed and converted to WebP. Replace them with original high-res pack
shots from the company when available.

To add a photo: drop `public/products/<slug>.webp` (transparent background works best) and set
`images: ["/products/<slug>.webp"]` on the product. `ProductVisual` shows the photo everywhere and falls
back to the illustrated `PackArt` when a product has no image.

### Wiring a backend

- Cart state: `src/lib/cart.tsx` (React context + localStorage).
- Checkout `placeOrder` in `src/components/cart/CheckoutView.tsx` — swap the timeout for a payment gateway (e.g. Razorpay).
- Enquiry forms: `src/components/forms/EnquiryForm.tsx` — post to an API route / CRM.

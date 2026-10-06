# RA Masale — Brand Website

The corporate / brand website for RA Masale / RA Food Products (Sangli, est. 1972).
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4. Shares its design system with the
`ra_masale_ecommerrce` storefront.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | Contents |
| --- | --- |
| `/` | Hero, Since-1972 stats, story, categories, featured products, quality, manufacturing, journey, distribution, distributor form, B2B form, contact |
| `/about` | Story, founders, 50+ years, philosophy, categories, manufacturing, quality, distribution, why RA, team, future vision |
| `/products` | Catalogue — category filter, sub-category chips, search |
| `/products/[slug]` | Gallery, pack sizes, information tabs, enquiry CTA, related products (statically generated) |
| `/journey` | Scroll-animated timeline 1972 → future |
| `/quality` | Quality commitments, manufacturing steps, certifications (placeholder slots), why RA |
| `/distribution` | Network, map, how-to-partner steps, distributor + B2B enquiry forms |
| `/contact` | Three unit cards with Google Maps, enquiry form (pre-fills from `?product=` / `?type=`) |
| `/privacy`, `/terms` | Placeholder legal copy |

## Content model (CMS-ready)

- `src/lib/types.ts` — `Product` model (name, category, subcategory, description, images, ingredients,
  packSizes, netQuantity, nutritionalInformation, usage, storage, shelfLife, mrp, productCode, barcode,
  vegetarian, featured, availability, infoSheet …).
- `src/lib/data/products.ts`, `categories.ts`, `site.ts` — all content as structured data.
- **Empty fields are never rendered.** Leave a field out and its tab / row disappears
  (e.g. add `nutritionalInformation` and a "Nutritional information" tab appears; add `infoSheet`
  and a "Download product information" button appears).

## To be supplied by RA Food Products before launch

Phone, email, WhatsApp number and business hours (`site.ts` → `company`; click-to-call and WhatsApp
buttons appear automatically once set), certifications (`app/quality/page.tsx`), verified product
details (ingredients, pack sizes, nutrition, shelf life, MRP, barcodes), team profiles, social links
(`Footer.tsx`), and final privacy/terms text. Descriptions and ingredients currently shown are
indicative placeholders and are labelled as such on product pages.

## Photography

`public/products/*.webp` — 10 real RA pack photos (from RA Masale Pvt. Ltd.'s IndiaMART listing),
background-removed. Products without a photo use the illustrated `PackArt` fallback. Add
`images: ["/products/<slug>.webp"]` to a product to use a new photo.

## Forms

`src/components/forms/EnquiryForm.tsx` is demo-only (confirms locally). Connect it to an API route,
email service or CRM before launch. Field sets live in `src/lib/forms.ts`.

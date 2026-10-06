# RA Masale — Websites

Two Next.js 16 sites for **RA Masale / RA Food Products** (Sangli, Maharashtra · est. 1972), sharing one
heritage design system (Libre Caslon + Libre Franklin, arch motifs, real RA pack photography).

| Folder | Site | Live |
| --- | --- | --- |
| [`portfolio/`](portfolio) | Brand / corporate website — products catalogue, journey, quality, distribution & enquiry forms | https://ra-masale.vercel.app |
| [`ecommerce/`](ecommerce) | Demo storefront — shop, product pages, cart & checkout (no real payments) | https://ramasaleecommerrce.vercel.app |

## Run locally

Each site is an independent Next.js app:

```bash
cd portfolio   # or: cd ecommerce
npm install
npm run dev
```

See each folder's README for structure, content model and what RA Food Products still needs to supply.

## Deploying

Both are Vercel projects. To deploy automatically from GitHub, import this repository in Vercel twice and set
the **Root Directory** to `portfolio` and `ecommerce` respectively.

## Notes

- Prices, ratings, reviews, ingredients and other product details are **placeholder / demo data** and must be
  verified by RA Food Products before going live.
- Product photos in `*/public/products/` are RA Masale's own pack shots (from RA Masale Pvt. Ltd.'s IndiaMART listing).
- Enquiry forms and checkout are front-end only — they are not connected to a backend yet.

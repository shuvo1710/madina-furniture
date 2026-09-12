# Madina Furniture — মদিনা ফার্নিচার

Handcrafted wooden furniture — beds, wardrobes, dressing tables, doors and custom pieces — made in Sherpur, Bangladesh.

## Project structure

```
madina-furniture-website/
├── index.html          # Single-page site (hero slider, collection, about, contact, footer, modal)
├── style.css           # Styles — brand color #703000, responsive breakpoints
├── script.js           # Loads products.json → grid + filters + search + hero slider + modal
├── products.json       # Product catalogue (124 items, 7 categories)
├── favicon.ico         # Site icon
├── README.md
└── assets/
    ├── logo/
    │   ├── madina-logo.png      # Brand logo (nav + footer + og:image + favicon fallback)
    │   └── whasappp-logo.png    # Floating WhatsApp button icon
    ├── products/
    │   └── product-001.jpg … product-124.jpg
    └── slider/
        ├── slider-1.jpg         # Hero slide 1
        ├── slider-2.jpg         # Hero slide 2
        └── slider-3.jpg         # Hero slide 3
```

## Asset sizes & specs

| Asset | Format | Dimensions | File size | Notes |
| --- | --- | --- | --- | --- |
| **Hero slider** | JPEG (RGB) | **2055 × 765** each | ~174 KB each | Loaded via `heroImages` in `script.js`; slides crossfade every 0.5 s. Keep slides close to this ratio (≈2.7:1) for best fit. |
| **Product photos** | JPEG (RGB) | **square 1:1, ~1024 × 1024** (sizes vary, e.g. 1024×1024, 1600×1200, 1536×1024) | ~130–270 KB each | Paths live in `products.json` (`p.image`). Lazy-loaded; the grid renders them in square cards (see `.product-img` aspect-ratio in `style.css`). |
| **Brand logo** | PNG (RGBA) | **266 × 227** | 49 KB | Used in nav + footer, `og:image`, apple-touch icon. |
| **WhatsApp icon** | PNG (RGBA) | **3840 × 3840** | 72 KB | Dimension is far larger than the 62 px it renders at — fine, just light. |
| **Favicon** | ICO + PNG | — | 7 KB | `favicon.ico` + `madina-logo.png` as type image/png. |

**Whole site weight:** ~18 MB (about 16.7 MB of it is the product photos).

## Run locally

The site fetches `products.json` at runtime, so serve it over HTTP (not `file://`):

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Customize

- Edit `products.json` to change product names, categories, descriptions, prices and images (`p.image` paths).
- Add hero slides by dropping JPGs into `assets/slider/` and listing them in the `heroImages` array in `script.js`.
- Change the brand color via the `--brand` variable in `style.css` (`:root`).
- Contact/Facebook/WhatsApp links are in `index.html` (footer + modal) and `script.js`.

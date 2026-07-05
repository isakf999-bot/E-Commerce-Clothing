# STANDARD — Modern Essentials

A flagship, production-feel clothing storefront built as a frontend portfolio piece. The full shopping journey works end to end — **browse → product → cart → multi-step checkout → confirmation** — with a restrained, editorial design language inspired by Scandinavian minimal retail (Weekday's classic look).

> **Live demo:** _add your Vercel URL here after deploying_

Frontend-only: product data comes from a public API and payments are simulated (no real processing).

---

## Highlights

- **Complete commerce flow** — category browsing, product detail with size/quantity, a slide-in cart that persists across refreshes, and a validated multi-step checkout ending in an order confirmation.
- **Real data, cleanly mapped** — product data from [DummyJSON](https://dummyjson.com) is translated through a dedicated mapping layer into clean, gender-split clothing categories. Components never see the raw API shape.
- **Design system, not a template** — a token-driven greyscale palette, deliberate type scale (Archivo + Inter), tight radii, soft motion, and a single restrained accent reserved for sale prices.
- **Accessible & responsive** — semantic markup, keyboard-navigable controls, focus rings, WCAG-minded contrast, and a mobile-first layout with bottom-sheet filters.

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 + TypeScript (strict) |
| Build tool | Vite |
| Styling | Tailwind CSS v4 (CSS-first design tokens) |
| Routing | React Router |
| Data fetching | TanStack Query (caching, loading/error states) |
| Global state | Zustand (cart, persisted to `localStorage`) |
| Forms & validation | React Hook Form + Zod |
| Animation | Framer Motion |

## Architecture

```
src/
  services/api/   Typed fetch wrapper + product service (the only place fetch is called)
  catalog/        Category-mapping module (DummyJSON → store categories) + product mapper
  checkout/       Zod schemas + step-state hook (logic decoupled from presentation)
  store/          Zustand cart store (+ persist)
  hooks/          React Query hooks
  lib/            Formatting, pricing, query client
  components/     ui · layout · product · filters · cart · checkout · home
  pages/          Home · Gender · Category · Product · Checkout · NotFound
  types/          Domain + API types
```

**Principles applied:**
- Dedicated API layer — components fetch through hooks, never `fetch` directly.
- Checkout validation (Zod) and step state live outside the UI so they're reusable and testable.
- Strong typing throughout — API responses, category mapping, cart and checkout state (no `any`).

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # typecheck + production build
npm run preview    # preview the production build
```

## Trying the checkout

Add any item to the cart, open the cart drawer, and hit **Checkout**. Every step is validated with Zod before you can continue.

Use the standard test card:

- **Card:** `4242 4242 4242 4242`
- **Expiry:** any future date, e.g. `08/28`
- **CVC:** any 3 digits

## Notes on the data

DummyJSON's fashion catalogue is small, so category pages are deliberately scoped to what has real products and imagery. No page is ever broken or empty — sparse categories simply show fewer items.

---

Built by [@isakf999-bot](https://github.com/isakf999-bot) · Product data by DummyJSON.

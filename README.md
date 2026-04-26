# Shopping Cart — React + TypeScript

🔗 **Live Demo:** https://srehan17.github.io/shoppingcart-react-ts/

## Overview

A responsive, multilingual shopping cart application built with React and TypeScript. Users can browse, search, and sort products by category, manage cart items, and switch between English, French, and Spanish — with currency formatting and product titles adapting to the selected locale.

## Features

- Browse and filter products by category
- **Search** products by localized title
- **Sort** by price (low→high, high→low) or name (A→Z, Z→A)
- Add, remove, and update cart item quantities with real-time total
- **Cart persistence** — cart is saved to localStorage and restored on page reload
- Checkout panel with empty cart state
- **Internationalization (EN/FR/ES):** UI labels, product titles, plurals, and currency formatting all respond to the selected language
- **Responsive navbar** — collapses to hamburger menu on small screens
- Dark navy + brass theme with custom typography
- Scroll-to-top button on long pages
- Type-safe throughout with TypeScript

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 18, React Bootstrap, Bootstrap 5 |
| Language | TypeScript |
| Routing | React Router v6 |
| i18n | i18next, react-i18next |
| Fonts | Playfair Display, Inter (Google Fonts) |
| Testing | Vitest, React Testing Library |
| Deployment | GitHub Pages |

## Internationalization

The app supports English (CA), French (CA), and Spanish (ES), switchable via the dropdown in the navbar. Three layers are translated:

**1. UI strings** — all labels, buttons, headings, and plural forms are managed through `src/i18n/locales/`:

```
src/i18n/
  index.ts                  # i18next initialization
  locales/
    en/translation.json     # English strings
    fr/translation.json     # French strings
    es/translation.json     # Spanish strings
```

Plural forms use i18next's built-in rules (e.g. `_one` / `_other` suffixes):

```json
"itemCount_one": "{{count}} item",
"itemCount_other": "{{count}} items"
```

**2. Product titles and descriptions** — stored as nested locale objects in `src/data/data.json`:

```json
{
  "title": {
    "en": "Mens Cotton Jacket",
    "fr": "Veste en coton pour homme",
    "es": "Chaqueta de algodón para hombre"
  }
}
```

Components resolve the active locale at render time, falling back to `en`:

```ts
item.title[i18n.language] ?? item.title.en
```

**3. Currency formatting** — uses the browser's built-in `Intl.NumberFormat`, passing the active locale so numbers render correctly per region (e.g. `$55.99` in English, `55,99 $US` in French):

```ts
new Intl.NumberFormat(locale, { currency: "USD", style: "currency" }).format(amount)
```

## Project Structure

```
src/
  components/       # Navbar, StoreItem, CartItem, ShoppingCart, skeletons
  context/          # ShoppingCartContext — cart state, localStorage persistence
  data/             # data.json — local product catalog with EN/FR/ES titles
  hooks/            # useShoppingCart
  i18n/             # i18next setup and translation files (en, fr, es)
  pages/            # MyStore (search + sort + filter), About, Contact
  utilities/        # formatCurrency
  theme.css         # Bootstrap overrides — navy/brass colour scheme
```

## Testing

Tests cover core cart interactions, store filtering, and persistence using Vitest and React Testing Library.

**Covered scenarios:**
- Rendering products from local data
- Adding, increasing, decreasing, and removing cart items
- Opening cart and verifying contents and total
- Search filtering by localized title
- Empty state when no products match search
- Search clears when a category pill is clicked
- Category filter shows only matching products
- Sort by price (low→high and high→low)
- Cart restored from localStorage on remount

```bash
npm run test
```

## Getting Started

```bash
git clone https://github.com/srehan17/shoppingcart-react-ts.git
cd shoppingcart-react-ts
npm install
npm run dev
```

Open [http://localhost:5173/shoppingcart-react-ts](http://localhost:5173/shoppingcart-react-ts) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

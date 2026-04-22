# Shopping Cart — React + TypeScript

🔗 **Live Demo:** https://srehan17.github.io/shoppingcart-react-ts/

## Overview

A responsive, multilingual shopping cart application built with React and TypeScript. Users can browse products by category, manage cart items, and switch between English and French — with currency formatting and product titles adapting to the selected locale.

## Features

- Browse and filter products by category
- Add, remove, and update cart item quantities with real-time total
- Checkout panel with empty cart state
- **Internationalization (EN/FR):** UI labels, product titles, and currency formatting all respond to the selected language
- Dark navy + brass theme with custom typography
- Scroll-to-top button on long pages
- Responsive layout across screen sizes
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

The app supports English and French, switchable via the language selector in the navbar. Three layers are translated:

**1. UI strings** — all labels, buttons, and headings are managed through `src/i18n/locales/`:

```
src/i18n/
  index.ts                  # i18next initialization
  locales/
    en/translation.json     # English strings
    fr/translation.json     # French strings
```

**2. Product titles** — since the product API only returns English, bilingual titles are stored directly in `src/data/data.json`:

```json
{
  "title": "Mens Cotton Jacket",
  "titleFr": "Veste en coton pour homme"
}
```

Components select the right field based on `i18n.language`.

**3. Currency formatting** — uses the browser's built-in `Intl.NumberFormat`, passing the active locale so numbers render correctly per region (e.g. `$55.99` in English, `55,99 $US` in French):

```ts
new Intl.NumberFormat(locale, { currency: "USD", style: "currency" }).format(amount)
```

## Project Structure

```
src/
  components/       # Navbar, StoreItem, CartItem, ShoppingCart, skeletons
  context/          # ShoppingCartContext — cart state and product data
  data/             # data.json — local product catalog with EN/FR titles
  hooks/            # useShoppingCart
  i18n/             # i18next setup and translation files
  pages/            # MyStore, About, Contact
  utilities/        # formatCurrency
  theme.css         # Bootstrap overrides — navy/brass colour scheme
```

## Testing

Component tests cover core cart interactions using Vitest and React Testing Library.

**Covered scenarios:**
- Adding items to cart
- Increasing and decreasing item quantity
- Removing items from cart
- Opening cart and verifying contents and total

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

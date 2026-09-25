# Boda Store — Design Specification

## Project Overview

**Boda Store** is a React + TypeScript e-commerce application built with Vite, Tailwind CSS v4, and Framer Motion. It sells posters/prints across categories: motivation, cars, players (sports), and anime. Features a slide-out cart sidebar, product browsing, product detail pages with related products, and smooth scroll-reveal animations.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| Animation | Framer Motion (`motion` v13) |
| Routing | React Router DOM v7 |
| State | React Context + `useReducer` (cart) |
| Icons | Lucide React |
| Linting | ESLint 10 + TypeScript ESLint |

---

## Architecture

```
src/
├── App.tsx                 # Root layout, routing, providers
├── main.tsx                # Entry point
├── index.css               # Global styles + Tailwind import
├── App.css                 # Component-specific styles
├── data.ts                 # Static product catalog (24 items)
├── context/
│   └── CartContext.tsx     # Cart state + reducer (global)
├── components/
│   ├── Navbar.tsx          # Header with cart trigger + mobile menu
│   ├── Hero.tsx            # Landing hero image section
│   ├── Footer.tsx          # Site footer with links/contact
│   ├── ScrollReveal.tsx    # IntersectionObserver animation wrapper
│   ├── LoadingSkeleton.tsx # Product detail loading placeholder
│   ├── Carousel.tsx        # 3D perspective carousel (motion)
│   └── Shots.tsx           # Homepage carousel + "View All" CTA
├── pages/
│   ├── Home.tsx            # Hero + Shots carousel
│   ├── Products.tsx        # Product grid (all products)
│   ├── ProductDetails.tsx  # Single product + related products
│   └── Cart.tsx            # Slide-out cart sidebar (CartSidebar)
├── assets/                 # Static assets (svg, png)
└── public/images/          # Product images (24+ files)
```

### Data Flow

```
CartContext (Provider) ──► Navbar (cart count, open sidebar)
                         ──► Products (add to cart)
                         ──► ProductDetails (add to cart)
                         ──► CartSidebar (read cart, dispatch actions)
```

---

## UI/UX Design System

### Color Palette

| Role | Tailwind Class | Hex | Usage |
|------|----------------|-----|-------|
| Primary | `orange-400` | `#fb923c` | CTAs, accents, cart badge, buttons |
| Primary Hover | `orange-500` / `gray-900` | `#f97316` / `#111827` | Button hover states |
| Background | `white` / `gray-50` | `#ffffff` / `#f9fafb` | Page, cards |
| Surface | `zinc-50` / `zinc-100` | `#fafafa` / `#f4f4f5` | Card backgrounds, input fields |
| Text Primary | `zinc-900` / `gray-900` | `#18181b` / `#111827` | Headings, body |
| Text Secondary | `zinc-500` / `gray-400` | `#71717a` / `#9ca3af` | Descriptions, placeholders |
| Text Muted | `zinc-400` | `#a1a1aa` | Prices (old), labels |
| Border | `zinc-200` / `gray-100` | `#e4e4e7` / `#f3f4f6` | Card borders, dividers |
| Footer BG | `zinc-950` | `#09090b` | Footer background |
| Footer Text | `white` / `zinc-400` | `#ffffff` / `#a1a1aa` | Footer content |
| Success | `green-600` | `#16a34a` | Savings amount |
| Danger | `red-500` | `#ef4444` | Remove item hover |
| Overlay | `zinc-900/40` | `rgba(23,23,23,0.4)` | Cart backdrop |

### Typography

- **Font Family**: Geist (imported via `@import` in Navbar inline style)
- **Scale**:
  - Hero/Page Title: `text-3xl` / `text-4xl` (bold)
  - Section Headings: `text-2xl` / `text-3xl` (bold)
  - Product Names: `text-sm` / `text-base` (medium)
  - Prices: `text-lg` / `text-xl` / `text-3xl` (bold)
  - Body: `text-sm` / `text-base` (normal)
  - Buttons: `text-xs` / `text-sm` (semibold, tracking-wide)

### Spacing System

- Base unit: 4px (Tailwind default)
- Common: `p-4` (16px), `p-5` (20px), `p-6` (24px), `px-6` (24px horizontal)
- Container max-width: `max-w-7xl` (1280px) with responsive padding:
  - `px-6` (mobile), `px-12` (md), `px-24` (lg), `px-40` (xl)

### Border Radius

- Small: `rounded-full` (pills, badges, avatar)
- Medium: `rounded-xl` (12px) — buttons, cart sidebar
- Large: `rounded-2xl` (16px) — product cards, images
- XL: `rounded-3xl` (24px) — product detail image container

### Shadows

- Card default: `shadow-sm` (implicit via border)
- Card hover: `hover:shadow-xl` (large elevation)
- Cart sidebar: `shadow-2xl` (deep elevation)
- Carousel items: perspective-based 3D rotation

### Animation & Motion

| Component | Animation | Library |
|-----------|-----------|---------|
| ScrollReveal | 14 animation types (fade, zoom, flip, blur) | IntersectionObserver + CSS transitions |
| Product Cards | `hover:-translate-y-1`, `hover:scale-110` (image) | CSS transitions (300ms/500ms) |
| Carousel | 3D perspective rotateY, spring physics | Framer Motion |
| Cart Sidebar | Slide from right (`translate-x-full` → `translate-x-0`) | CSS transition (300ms ease-out) |
| Cart Backdrop | Fade in/out (`opacity-0` → `opacity-100`) | CSS transition (300ms) |
| Buttons | `hover:bg-*`, `transition-colors duration-200` | CSS |
| Pagination Dots | `animate: scale 1.2` | Framer Motion |

---

## Component Specifications

### 1. Navbar (`Navbar.tsx`)

**Structure**: Fixed-position header with logo, nav pills (desktop), cart trigger, mobile hamburger menu, cart sidebar portal.

**Responsive**:
- Mobile (< md): Hamburger menu → full-width dropdown
- Desktop (≥ md): Pill-style nav links centered

**Cart Trigger**: ShoppingCart icon + badge (item count) in orange pill.

**Mobile Menu**: Animated hamburger → X (CSS transform).

**Cart Sidebar**: Renders `CartSidebar` component (always mounted, animated via CSS).

### 2. Hero (`Hero.tsx`)

**Structure**: Centered image in rounded container (`rounded-2xl`), wrapped in `ScrollReveal` (fade-up).

**Image**: `/public/images/hero.png` (950px wide).

**Spacing**: `mt-30` top margin.

### 3. Shots / Carousel (`Shots.tsx` + `Carousel.tsx`)

**Carousel Features**:
- 3D perspective rotation (`rotateY` ±90°) on side items
- Draggable (mouse/touch) with spring physics
- Autoplay (2s delay, pause on hover)
- Infinite loop (clones first/last)
- Pagination dots with active state scale animation
- Responsive: fills container up to `baseWidth` (800px)
- Round mode option (circular items)

**Shots**: Wraps Carousel in fixed-height container (600px) + "View All" button linking to `/products`.

### 4. Products Page (`Products.tsx`)

**Layout**: Responsive grid:
- 1 col (mobile), 2 col (sm), 3 col (md), 4 col (lg)
- Gap: `gap-6`, Padding: `p-4`
- Min-height: `min-h-screen`

**Product Card**:
- Aspect-square image container (`aspect-square`, `object-contain`, `group-hover:scale-110`)
- Content: name (truncate), price row (new + old strikethrough)
- CTA: Full-width "Add to Cart" button (orange → dark hover)
- Hover: `hover:-translate-y-1`, `hover:shadow-xl`

**Wrapped in**: `ScrollReveal` (fade-up).

### 5. Product Details (`ProductDetails.tsx`)

**Layout**: Two-column grid (lg):
- Left: Product image (max-w-md, rounded-3xl container, gray-100 bg)
- Right: Product info stack

**Info Stack**:
1. Category badge (pill, gray-100)
2. Product name (text-3xl/4xl, bold)
3. Price row: new price (large), old price (strikethrough), discount badge (orange-100/600)
4. Size selector (single option "30X40", pill buttons)
5. Countdown timer (hardcoded, gradient yellow/orange bg, RTL labels)
6. Viewer count (fake: 349, pill badge)
7. Purchase CTA (full-width, orange, RTL text)
8. Divider

**Related Products**: 4-col grid below, filtered by category, excludes current product.

**Loading**: `LoadingSkeleton` shown for 500ms on mount/id change.

**Error**: "Product not found" with link back to products.

### 6. Cart Sidebar (`Cart.tsx`)

**Type**: Slide-out panel (fixed, right, full height, max-w-sm).

**Backdrop**: `z-40`, blur, click to close, ESC to close, body overflow locked.

**Panel**: `z-50`, white, `shadow-2xl`, slide animation.

**Header**: Title + item count badge, close button (X icon).

**Empty State**: Illustration + "Browse Products" link.

**Item Row**:
- Thumbnail (20×20, rounded-xl, object-contain)
- Name + price row (new + old strikethrough)
- Remove button (trash icon, red hover)
- Quantity stepper (minus/plus, rounded-full, bordered)
- Line total

**Summary** (when items exist):
- Savings row (green)
- Subtotal
- Checkout button (orange → dark hover)
- "Continue shopping" link

### 7. Footer (`Footer.tsx`)

**Structure**: 4-column grid (brand, quick links, categories, contact) + bottom bar.

**Brand**: Logo, tagline, social icons (Instagram, Twitter, TikTok — SVG inline).

**Links**: Hover → orange-400.

**Contact**: Email, phone, address with icons.

**Bottom Bar**: Copyright + Privacy/Terms links.

**Animation**: `ScrollReveal` (fade-up) on entire grid.

### 8. ScrollReveal (`ScrollReveal.tsx`)

**Props**:
- `animation`: 14 types (fade-up/down/left/right/in, zoom-in/out, flip-x/y, scale-up, blur-in)
- `delay`: ms (default 0)
- `duration`: ms (default 700)
- `threshold`: IntersectionObserver threshold (default 0.15)
- `once`: boolean (default true)
- `className`: additional classes

**Implementation**: IntersectionObserver + CSS transitions on inner wrapper. `transformStyle: preserve-3d` for 3D animations.

### 9. LoadingSkeleton (`LoadingSkeleton.tsx`)

**Structure**: Mirrors ProductDetails layout with gray-200 blocks + `animate-pulse`.

---

## Page Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home` | Hero + Shots carousel |
| `/products` | `Products` | Full product grid |
| `/productdetails/:id` | `ProductDetails` | Single product + related |

---

## State Management (Cart)

### Types

```typescript
interface Book {
  id: number;
  imgsrc: string;
  name: string;
  oldPrice: number;
  newPrice: number;
  count: number; // unused in cart logic
}

interface CartItem extends Book {
  quantity: number;
}
```

### Actions

| Action | Payload | Behavior |
|--------|---------|----------|
| `ADD_TO_CART` | `Book` | Increments quantity if exists; adds new with quantity=1 |
| `REMOVE_FROM_CART` | `number` (id) | Removes item entirely |
| `INCREASE_QUANTITY` | `number` (id) | +1 quantity |
| `DECREASE_QUANTITY` | `number` (id) | -1 quantity; removes if reaches 0 |

### Derived Values (CartSidebar)

- `totalItems`: Σ quantity
- `subtotal`: Σ (newPrice × quantity)
- `savings`: Σ ((oldPrice - newPrice) × quantity)

---

## Product Data (`data.ts`)

24 products across 5 categories:

| Category | Count | IDs |
|----------|-------|-----|
| motivation | 6 | 1-6 |
| cars | 8 | 7-14 |
| players | 7 | 15-21 |
| anime | 2 | 22-23 |
| gaming | 1 | 24 (mislabeled as "gaming" but in players section) |

**Note**: All products share same pricing (old: 250, new: 200 → 20% off). Images in `/public/images/`.

---

## Accessibility

- Semantic HTML: `nav`, `main`, `footer`, `aside[role="dialog"]`, `section`
- ARIA: `aria-label` on icon buttons, `aria-modal`/`aria-label` on cart, `aria-current` on carousel dots
- Focus: `focus-visible:outline-2` on carousel dots
- Keyboard: ESC closes cart, tab navigation preserved
- Images: `alt` attributes (product name)
- `inert` on cart when closed

---

## Responsive Breakpoints (Tailwind)

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Grid 2-col |
| `md` | 768px | Nav pills show, grid 3-col |
| `lg` | 1024px | Grid 4-col, 2-col product detail |
| `xl` | 1280px | Max container padding |

---

## Known Issues / Technical Debt

1. **Hardcoded countdown** in ProductDetails — not dynamic
2. **Fake viewer count** (349) — not real-time
3. **Single size option** ("30X40") — no real variants
4. **Inline font import** in Navbar — should be in global CSS
5. **Product type named `Book`** — misleading for posters
6. **Category inconsistency**: ID 24 has `category: "gaming"` but grouped with players
7. **No checkout flow** — Checkout button non-functional
8. **No persistence** — cart resets on refresh
9. **No API layer** — static data only
10. **Hero image path** uses `/public/images/hero.png` but Vite serves from `/images/`

---

## Future Enhancement Opportunities

- Add category filtering on Products page
- Implement real countdown timer (expiry date per product)
- Add product reviews/ratings
- Wishlist functionality
- User authentication + order history
- Payment integration (Stripe)
- Image zoom/lightbox on product detail
- Search with debounce
- Cart persistence (localStorage / IndexedDB)
- Admin CMS for product management
- i18n (Arabic/English RTL support — already partial)
- Unit/integration tests (Vitest + React Testing Library)
- Storybook for component documentation
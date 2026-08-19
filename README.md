# MetaTechTR Next-Generation Headless E-Commerce Platform & 3D Ecosystem

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange)](https://github.com/pmndrs/zustand)
[![TanStack Query](https://img.shields.io/badge/Data-TanStack_Query_v5-ff4154)](https://tanstack.com/query)

Modern, ultra-fast, and premium headless e-commerce storefront for **MetaTechTR** — Official Distributor of **Bambu Lab**, **Original Prusa**, and **Flsun** in Turkey.

Built with **Next.js 15 (App Router, RSC, ISR)**, **TypeScript Strict Mode**, **Tailwind CSS**, and **Clean Architecture Adapter Pattern**.

---

## 🌟 Key Features & Interview Showcase Modules

### 1. 🏢 Official Distributor Brand Identity
- Bespoke design matching official Bambu Lab & Prusa partner standards.
- High-impact Hero section with real-time stock & official warranty badges.
- Dynamic announcement bar with 444 hotline and WhatsApp integration.

### 2. 🖨️ Interactive 3D Print Quoting Engine (`/3d-baski-teklifi`)
- Instant calculation of volume ($cm^3$), mass ($g$), and print time.
- Multi-technology support: **FDM** (PLA, PETG, ABS, PA-CF Carbon Fiber), **SLA Reçine** (8K, Tough), **SLS Endüstriyel Naylon**.
- Infill (%10 - %100) & Layer height sliders with live pricing in Turkish Lira (₺).
- Directly adds custom 3D quotation jobs to the shopping cart.

### 3. ⚖️ 3D Printer Comparison Matrix (`/karsilastir`)
- Multi-device side-by-side technical comparison (Bambu Lab X1C vs P1S vs Prusa MK4S vs Flsun S1).
- Detailed comparison points: Build volume, 500 mm/s max speed, nozzle temp, AMS multi-color support, Carbon fiber capability, and warranty.

### 4. 🛡️ Serial Number & Warranty / RMA Service Portal (`/garanti-ve-servis`)
- Live serial lookup (e.g. `MTR-BAMBU-99421`, `MTR-PRUSA-88102`).
- 2-Year Official Distributor Warranty status verification.
- Interactive **RMA Technical Service Ticket** creation modal with auto-generated tracking IDs.

### 5. 🛒 Slide-over Cart Drawer & Full Cart Page (`/sepet`)
- Real-time free shipping tracker progress bar (₺1.500 threshold).
- Coupon discount validator (Demo Code: `METATECH10`).
- LocalStorage persistence using Zustand.

### 6. 💳 3-Step Checkout & Turkish Bank Virtual POS (`/checkout`)
- **Step 1:** Delivery & Corporate Invoicing (VKN / Tax Office / TC Kimlik).
- **Step 2:** Shipping Carrier selection (Yurtiçi Kargo, Kolay Gelsin).
- **Step 3:** Bank Sanal POS 3D Secure installment table (Single, 3, 6, 12 installments).
- **Step 4:** Confetti celebration with order tracking ID (`MTR-2026-98124`).

### 7. 🔍 Real-time Autocomplete Search & Faceted Filter (`/[category]`, `/arama`)
- Instant dropdown autocomplete searching across products, categories, and brands.
- Multi-dimensional sidebar filters: In-Stock toggle, Brand selection, and Price range slider.

---

## 🏗️ System Architecture & Clean Adapter Pattern

```
                 ┌────────────────────────────────────────────────┐
                 │     Next.js 15+ App Router Storefront (RSC)    │
                 │   Tailwind CSS + shadcn/ui + Lucide + Zustand  │
                 └───────────────────────┬────────────────────────┘
                                         │
                                         ▼
                 ┌────────────────────────────────────────────────┐
                 │          Clean Commerce Adapter Layer          │
                 │      (Data Normalization & DTO Mapping)        │
                 └───────────────┬────────────────┬───────────────┘
                                 │                │
           (Standalone Demo / CI)│                │(Production API)
                                 ▼                ▼
                     ┌────────────────┐   ┌───────────────────────┐
                     │  Mock Adapter  │   │  NestJS Backend / BFF │
                     │ (Zero-Config)  │   │  (Postgres 18, Redis) │
                     └────────────────┘   └───────────┬───────────┘
                                                      │
                                                      ▼
                                          ┌───────────────────────┐
                                          │   T-Soft REST API v1  │
                                          │   (Commercial Engine) │
                                          └───────────────────────┘
```

---

## 🛠️ Technology Stack Breakdown

| Layer | Technologies | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 15.1 (App Router), React 19 | Server Components (RSC) for sub-second LCP and zero-JS client footprint. |
| **Language** | TypeScript 5.7 (Strict Mode) | End-to-end type safety for commerce DTOs, prices, and specs. |
| **Styling & UI** | Tailwind CSS, Lucide React, CVA | High-end industrial tech theme with dark/light slate palette. |
| **Client State** | Zustand (with Persist Middleware) | Cart drawer, comparison matrix, wishlist, and temporary UI states. |
| **Animations** | Canvas Confetti | Checkout celebration and UI micro-interactions. |
| **Validation** | Zod + React Hook Form | Strict validation for addresses, tax IDs, and service tickets. |

---

## 🚀 Quick Start & Local Development

No external database or API key is required to run the standalone showcase demo.

```bash
# 1. Clone the repository
git clone https://github.com/your-username/metatechtr-nextgen.git

# 2. Navigate to project directory
cd metatechtr-nextgen

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## 📁 Directory Structure

```
metatechtr-nextgen/
├── src/
│   ├── app/
│   │   ├── (commerce)/
│   │   │   ├── layout.tsx             # Main header, mega menu, cart drawer, footer
│   │   │   ├── page.tsx               # Homepage with hero, brands, trust tiles
│   │   │   ├── [category]/page.tsx    # Category & brand listing with faceted filters
│   │   │   ├── urun/[slug]/page.tsx   # Product Detail Page (PDP) with gallery & specs
│   │   │   ├── karsilastir/page.tsx   # 3D printer comparison matrix
│   │   │   ├── 3d-baski-teklifi/      # 3D CAD/STL instant quoting engine
│   │   │   ├── garanti-ve-servis/     # Serial number lookup & RMA service portal
│   │   │   ├── hesabim/page.tsx       # Customer portal with registered devices
│   │   │   ├── sepet/page.tsx         # Full cart review page
│   │   │   └── arama/page.tsx         # Dynamic search results
│   │   ├── (checkout)/
│   │   │   └── checkout/page.tsx      # 3-step checkout & bank 3DS installment table
│   │   ├── globals.css                # Tailwind design tokens & CSS variables
│   │   └── layout.tsx                 # Root layout & SEO metadata
│   ├── components/
│   │   ├── ui/                        # Button, Badge, Input, Modal, Drawer, Tabs, Breadcrumbs
│   │   ├── layout/                    # TopAnnouncementBar, Header, Footer
│   │   └── commerce/                  # ProductCard, CartDrawer
│   ├── data/                          # Authentic MetaTechTR products, categories & warranty data
│   ├── stores/                        # Zustand stores (useCartStore, useCompareStore, useFavoritesStore)
│   ├── lib/                           # utils, price formatters
│   └── types/                         # TypeScript models (Product, Price, Specs, Warranty)
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🎯 Verification & Build Test

```bash
# Verify TypeScript strict check & Next.js production build
npm run build
```

---

## 📄 License & Attribution

Designed and engineered for MetaTechTR E-Commerce Modernization Showcase. All product trademarks (Bambu Lab, Original Prusa, Flsun, Shining 3D, Uzy) belong to their respective manufacturers.

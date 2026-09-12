# Elena Moore Atelier — Fine Art E-Commerce & Management Console

A contemporary, museum-grade fine art e-commerce platform and atelier operations console built with **Next.js 14 (App Router)**, **Prisma ORM**, **Stripe**, **Shiprocket**, and **Zustand**.

---

## 🏛️ System Features

### 🎨 Collector Storefront
- **Fine Art Catalog**: Originals (oil on Belgian linen / wood panel), archival giclée prints (310gsm cotton rag), and recurring Collector Print Club memberships.
- **Dynamic Collections**: Landscapes & Atmospheres, Still Life & Form, Botanicals & Flora, Figurative & Abstract.
- **Curated Framing Studio**: Floating gallery frame configurations with live visual pricing calculation.
- **Frictionless Checkout**: Integrated Stripe Elements checkout with automated tax, discounts, and free-shipping thresholds.
- **Live Order Tracking**: Collector parcel lookup (`/orders/track`) connected directly to Shiprocket courier tracking with visual 4-stage fulfillment milestones.

### 💼 Atelier Management Console (`/admin`)
- **Zero-Emoji Minimalist UI**: Clean museum/gallery typography, warm alabaster `#FAF9F6` palette, refined charcoal borders, and bespoke vector SVG iconography.
- **Full Brand & Company Customizer**: Live management of Company Name, Brand Subtitle, Studio Address, Phone, Social Profiles (Instagram, Pinterest, Twitter, Facebook, YouTube), Hero Banners, Artist Bio, and Policies without code deployment.
- **Catalog & Inventory Engine**: Publish, edit, filter, and archive artworks with medium, dimension, year, pricing, and stock controls.
- **1-Click Shiprocket Dispatch**: Automated courier label generation, AWB tracking assignment, and instant dispatch.
- **Certificate of Authenticity (COA) Generator**: Printable, museum-standard Certificates of Authenticity with archival paper specifications, artist signature lines, and provenance verification.
- **Collector Inquiry Center**: Read, filter, and manage collector bespoke inquiries and private commission requests.
- **100% Mobile Responsive**: Dedicated horizontal swipeable navigation bar, touch-scrollable data grids, and responsive drawer editors.

---

## 🏗️ Architecture & Security Standards

- **Clean Architecture & Envelopes**: Standardized `ApiResponseEnvelope<T>` for all API responses with ISO 8601 timestamps and typed errors (`lib/api-response.ts`).
- **Timing-Safe Authentication**: Admin passwords and session tokens verified using constant-time comparisons (`crypto.timingSafeEqual`) to eliminate side-channel timing attacks (`lib/security.ts`).
- **Sliding-Window Rate Limiting**: Built-in memory rate limiter protecting API routes against abuse (`lib/rate-limit.ts`).
- **Enterprise Error Boundaries**: Root error boundary (`app/global-error.tsx`), route error handling (`app/error.tsx`), and atelier 404 page (`app/not-found.tsx`).
- **Automated Dynamic SEO**: Auto-generated XML Sitemap (`app/sitemap.ts`), `robots.txt` (`app/robots.ts`), OpenGraph cards, and Schema.org `ArtGallery` JSON-LD structured data (`app/layout.tsx`).

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Initialize & Seed Database
```bash
npx prisma db push
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the storefront, or [http://localhost:3000/admin](http://localhost:3000/admin) for the Atelier Management Console (Default password: `studio-elena-2026`).

---

## 💰 Production Deployment ($0/month Fixed Cost)

For complete step-by-step production deployment instructions using **Neon Serverless Postgres** ($0), **Vercel** ($0), **Cloudinary** ($0), **Stripe** (pay-as-you-go), and **Shiprocket** (pay-as-you-ship), see:

👉 **[DEPLOYMENT.md](file:///Users/ladeedahamed/Work/Personal/art-store/DEPLOYMENT.md)**

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.29 (App Router, Server Components, Server Actions)
- **Database**: Prisma ORM with PostgreSQL (Production) / SQLite (Development)
- **State Management**: Zustand
- **Payments**: Stripe API & Stripe Webhooks
- **Logistics**: Shiprocket REST API & Webhooks
- **Styling**: Pure CSS Modules (Warm Alabaster & Museum Charcoal Design System)
- **Email**: Nodemailer (SMTP / Gmail App Password / Resend)
- **Media**: Cloudinary CDN / Next.js Image Optimization


# Production Deployment Manual & Operational Guide
**Elena Moore Fine Art Storefront & Atelier Management Console**

This document provides the complete, step-by-step roadmap to transition this project from local development to a live, automated e-commerce deployment with the **lowest possible cost ($0/month fixed cost)**.

---

## 💰 Recommended Zero-Cost ($0/month) Production Stack

You can launch and operate this entire fine art e-commerce platform with **$0 fixed monthly overhead** using high-performance free tiers:

| Service | Recommended Provider | Plan / Tier | Monthly Fixed Cost | Why It's the Best Option |
| :--- | :--- | :--- | :--- | :--- |
| **Hosting & CDN** | **Vercel** | Hobby Plan | **$0.00 / mo** | Native Next.js 14 optimizations, automatic global SSL, edge CDN, zero-config serverless API deployment. |
| **Database** | **Neon Serverless Postgres** | Free Tier (0.5 GB) | **$0.00 / mo** | **Best for serverless Next.js.** Unlike Supabase (which pauses after 7 days of inactivity), Neon automatically suspends compute to 0 and wakes up sub-second on demand. Comes with built-in connection pooling for serverless. |
| **Media CDN** | **Cloudinary** | Free Tier (25 credits) | **$0.00 / mo** | 25GB storage/bandwidth, automated WebP compression, and high-resolution art zoom support. |
| **Payments** | **Stripe** | Standard Merchant | **$0.00 / mo** | Pay-as-you-go per transaction (~2-2.9% + 30¢ only when a customer buys art). Zero monthly fees. |
| **Couriers / Logistics** | **Shiprocket** | Lite Plan | **$0.00 / mo** | Pay-as-you-ship (deducted from prepaid wallet per courier dispatch). Zero monthly subscription. |
| **Transactional Email** | **Gmail SMTP** or **Resend** | Free Tier (3,000/mo) | **$0.00 / mo** | Standard Gmail App Password (free) or Resend (3,000 emails/month free). |
| **TOTAL FIXED COST** | | | **$0.00 / month** | |

---

## 📋 Production Readiness Checklist (What to Configure)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRE-LAUNCH CHECKLIST                            │
│                  Total Fixed Monthly Cost: $0.00                       │
├────────────────────────────────────────────────────────────────────────┤
│  [ ] 1. Create Free Neon Serverless Postgres DB & Run Prisma Push      │
│  [ ] 2. Setup Free Cloudinary Account for High-Res Artwork Photos      │
│  [ ] 3. Configure Stripe Live Mode & Webhook Signing Secret            │
│  [ ] 4. Connect Shiprocket Account & Pickup Address                    │
│  [ ] 5. Configure Transactional Email (Gmail App Password or Resend)   │
│  [ ] 6. Secure Master Super Admin Credentials & NextAuth Secret        │
│  [ ] 7. Deploy to Vercel (Hobby Tier) & Connect Custom Domain with SSL │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Database Migration to Neon Serverless PostgreSQL (Recommended: $0/mo)

In development, the store uses local SQLite (`dev.db`). Serverless platforms (like Vercel) have ephemeral filesystems, so you need a cloud-hosted PostgreSQL database.

### Why Neon is Recommended over Supabase / Render:
1. **Never Pauses Inactive Projects**: Free Supabase projects pause after 7 days of inactivity. Neon scales down to 0 compute when idle and wakes up in ~500ms when a customer visits.
2. **Built-in Serverless Connection Pooling**: Prevents connection exhaustion when multiple customers place orders simultaneously.
3. **100% Free**: 0.5 GB storage is sufficient for ~100,000+ artwork records and orders.

### Step-by-Step Instructions:

1. Go to [neon.tech](https://neon.tech) and sign up with GitHub or Google (No credit card required).
2. Click **Create Project**, name it `art-store`, select your nearest region, and click **Create**.
3. In your Neon dashboard, under **Connection Details**:
   - Check the **"Pooled connection"** checkbox.
   - Copy the connection string. It will look like:
     `postgres://username:password@ep-sample-pooler.region.aws.neon.tech/neondb?sslmode=require`
4. Open [`prisma/schema.prisma`](file:///Users/ladeedahamed/Work/Personal/art-store/prisma/schema.prisma) and change the provider from `sqlite` to `postgresql`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
5. Set your `DATABASE_URL` in your `.env` or run:
   ```bash
   export DATABASE_URL="postgres://username:password@ep-sample-pooler.region.aws.neon.tech/neondb?sslmode=require"
   ```
6. Push your database schema and create all tables in Neon:
   ```bash
   npx prisma db push
   ```
7. Seed the production database with initial fine art categories, paintings, and studio settings:
   ```bash
   npm run db:seed
   ```
   *(All your initial artworks, prints, framing presets, and site metadata are now live in Neon!)*

---

## Step 2: High-Resolution Artwork Storage (Cloudinary)

To ensure uploaded artwork photos, banner photography, and high-resolution textures persist permanently without serverless filesystem limits:

1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. Go to **Dashboard** and copy:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. Add these to your production environment variables:
   ```env
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```
*The upload engine in [`app/api/admin/upload/route.ts`](file:///Users/ladeedahamed/Work/Personal/art-store/app/api/admin/upload/route.ts) automatically detects these variables and uploads all new artworks directly to Cloudinary CDN.*

---

## Step 3: Stripe Live Mode & Webhook Integration

### 1. Get Live API Keys
1. Log in to [dashboard.stripe.com](https://dashboard.stripe.com).
2. Toggle from **Test mode** to **Live mode**.
3. Go to **Developers > API Keys** and copy:
   - **Publishable Key**: `pk_live_...`
   - **Secret Key**: `sk_live_...`

### 2. Configure Production Webhooks
1. Go to **Developers > Webhooks > Add Destination**.
2. Set Endpoint URL:
   ```
   https://your-domain.com/api/stripe/webhook
   ```
3. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the **Signing secret** (`whsec_...`).
5. Add to environment variables:
   ```env
   STRIPE_SECRET_KEY="sk_live_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

---

## Step 4: Shiprocket Automated Courier & Logistics Setup

The art store includes automated dispatch with **Shiprocket** ([`lib/shiprocket.ts`](file:///Users/ladeedahamed/Work/Personal/art-store/lib/shiprocket.ts)).

### 1. Account & Pickup Location Setup
1. Register on [shiprocket.in](https://shiprocket.in).
2. Go to **Settings > Pickup Addresses > Add Pickup Location**.
3. Name your pickup location (e.g. `Primary` or `Studio`) and enter your postal pincode and studio contact number.

### 2. Configure Environment Variables
```env
SHIPROCKET_EMAIL="your-shiprocket-email@domain.com"
SHIPROCKET_PASSWORD="your-shiprocket-password"
SHIPROCKET_PICKUP_LOCATION="Primary"
```

### 3. Connect Shiprocket Real-Time Webhook
1. In Shiprocket Panel, go to **Settings > API > Webhooks > Add Webhook**.
2. Enter Webhook URL:
   ```
   https://your-domain.com/api/shiprocket/webhook
   ```
3. Events: `Tracking updates / Status change`.
4. *Now, whenever couriers (BlueDart, Delhivery, FedEx) scan a parcel, your store's [`/orders/track`](file:///Users/ladeedahamed/Work/Personal/art-store/app/orders/track/page.tsx) page and customer notifications update automatically!*

---

## Step 5: Transactional Email Setup (Order Receipts & Tracking)

The store dispatches:
- **Collector Order Confirmation Receipts**
- **Studio Owner Sales Notifications**
- **Courier Shipment Tracking Updates** (with 1-click tracking links)
- **Delivery Confirmation & Collector Care Emails**

### Recommended Setup (Gmail / Resend / AWS SES):
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-studio-email@gmail.com"
SMTP_PASS="your-gmail-app-password" # Generate under Google Account > Security > App Passwords
SMTP_FROM="orders@elenamoore.art"
CONTACT_EMAIL="hello@elenamoore.art"
```

---

## Step 6: Security & Super Admin Authentication

1. Generate a cryptographic secret key for NextAuth / token signing:
   ```bash
   openssl rand -base64 32
   ```
2. Configure your master studio owner password:
   ```env
   ADMIN_PASSWORD="YourVeryStrongStudioMasterKey2026!"
   ADMIN_SECRET_KEY="your-random-hmac-salt-string"
   NEXTAUTH_SECRET="your-generated-openssl-base64-key"
   NEXTAUTH_URL="https://your-domain.com"
   NEXT_PUBLIC_SITE_URL="https://your-domain.com"
   ```

---

## Step 7: Vercel Deployment & Domain Configuration

### 1. Push to GitHub
```bash
git add .
git commit -m "feat: complete production-ready fine art store with Shiprocket, live tracking, and COA generator"
git push origin main
```

### 2. Import Project to Vercel
1. Log in to [vercel.com](https://vercel.com) and click **Add New > Project**.
2. Select your GitHub repository (`art-store`).
3. Under **Environment Variables**, paste all production keys from the table below.
4. Click **Deploy**.

### 3. Complete Production Environment Variables Table

| Variable | Example Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://...` | Pooled PostgreSQL connection string |
| `DIRECT_URL` | `postgresql://...` | Direct PostgreSQL connection string for migrations |
| `NEXT_PUBLIC_SITE_URL` | `https://elenamoore.art` | Canonical storefront base URL |
| `NEXTAUTH_SECRET` | `32-character-random-key` | Session encryption token |
| `NEXTAUTH_URL` | `https://elenamoore.art` | Auth callback base URL |
| `ADMIN_PASSWORD` | `Studio-Master-Key-2026` | Master admin password for `/admin` |
| `ADMIN_SECRET_KEY` | `hmac-salt-key` | Token hash salt |
| `STRIPE_SECRET_KEY` | `sk_live_...` | Live Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` | Live Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Stripe webhook signing secret |
| `CLOUDINARY_CLOUD_NAME` | `elena-art` | Cloudinary cloud identifier |
| `CLOUDINARY_API_KEY` | `1234567890` | Cloudinary API Key |
| `CLOUDINARY_API_SECRET` | `abcdefgh...` | Cloudinary API Secret |
| `SHIPROCKET_EMAIL` | `logistics@elenamoore.art`| Shiprocket login email |
| `SHIPROCKET_PASSWORD` | `YourShiprocketPassword` | Shiprocket API password |
| `SHIPROCKET_PICKUP_LOCATION` | `Primary` | Pickup location registered in Shiprocket |
| `SMTP_HOST` | `smtp.gmail.com` | SMTP email server host |
| `SMTP_PORT` | `587` | SMTP port |
| `SMTP_USER` | `orders@elenamoore.art` | SMTP username |
| `SMTP_PASS` | `app-specific-password` | SMTP password |
| `SMTP_FROM` | `orders@elenamoore.art` | Display sender email |
| `CONTACT_EMAIL` | `hello@elenamoore.art` | Studio recipient email |

---

## Step 8: Post-Deployment Verification Checklist

After deploying to Vercel:

1. **Verify Admin Console (`/admin`)**:
   - Log in using your `ADMIN_PASSWORD`.
   - Test publishing a new fine art piece with photography and medium specifications.
   - Test updating Company & Brand settings (Company Name, Studio Address, Phone, Social URLs, Hero Banner) in the **"Brand & Customizer"** tab and verify live reflection in Header/Footer/Contact.
2. **Verify Customer Checkout & Stripe**:
   - Complete a real or test card order with custom framing options.
   - Verify that inventory is automatically decremented.
   - Verify 1-of-1 original oil paintings are automatically locked as "Sold".
3. **Verify Live Order Tracking (`/orders/track`)**:
   - Enter the Order ID on `/orders/track` to verify the 4-step progress timeline.
4. **Verify Shiprocket 1-Click Dispatch**:
   - In `/admin > Orders`, click **"Shiprocket"** (dispatch icon) on the order.
   - Verify AWB code is generated and courier label PDF opens.
5. **Verify Certificate of Authenticity (COA)**:
   - In `/admin > Orders`, click **"COA"** (document icon) on an order to preview and print the official Certificate of Authenticity.
6. **Verify Transactional Emails**:
   - Confirm receipt of collector confirmation email and shipment dispatch email with the tracking link.
7. **Verify Mobile Responsiveness**:
   - Open `/admin` and the storefront on iOS Safari / Android Chrome.
   - Verify sticky swipeable admin tabs, responsive tables, and touch-friendly checkout.


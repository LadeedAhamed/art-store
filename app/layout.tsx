import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartProvider from '@/components/cart/CartProvider'
import CartDrawer from '@/components/cart/CartDrawer'
import { Toaster } from '@/components/ui/Toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elenamoore.art'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Elena Moore Art — Original Oil Paintings & Archival Prints',
    template: '%s | Elena Moore Art',
  },
  description:
    'Elena Moore is an American oil painter capturing quiet domestic moments through still life depictions of food and botanicals. Explore signed original oil paintings and archival giclée prints.',
  keywords: [
    'oil painting',
    'still life',
    'fine art prints',
    'original oil paintings',
    'food art',
    'botanical art',
    'archival giclée',
    'Hudson Valley artist',
  ],
  authors: [{ name: 'Elena Moore', url: siteUrl }],
  creator: 'Elena Moore',
  publisher: 'Elena Moore Atelier',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Elena Moore Fine Art',
    title: 'Elena Moore Art — Original Oil Paintings & Archival Prints',
    description: 'Signed original oil paintings and fine art prints celebrating quiet domestic moments.',
    images: [
      {
        url: `${siteUrl}/hero.jpg`,
        width: 1200,
        height: 630,
        alt: 'Elena Moore Fine Art Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elena Moore Fine Art',
    description: 'Signed original oil paintings and fine art prints.',
    images: [`${siteUrl}/hero.jpg`],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ArtGallery',
    name: 'Elena Moore Fine Art',
    url: siteUrl,
    description: 'Contemporary fine art studio specializing in original oil still lifes and archival prints.',
    artist: {
      '@type': 'Person',
      name: 'Elena Moore',
      jobTitle: 'Oil Painter',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kingston',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    paymentAccepted: 'Credit Card, Stripe, Apple Pay, Google Pay',
    currenciesAccepted: 'USD',
  }

  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <CartProvider>
          <Header />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import ProductCard from '@/components/shop/ProductCard'
import GiftCardSection from '@/components/shop/GiftCardSection'
import NewsletterForm from '@/components/ui/NewsletterForm'
import { INITIAL_PRODUCTS } from '@/lib/products-data'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

async function getAllCatalogProducts() {
  try {
    const dbProducts = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    })
    if (dbProducts.length > 0) return dbProducts
  } catch {}

  return INITIAL_PRODUCTS.filter((p) => p.isActive)
}

export default async function HomePage() {
  const products = await getAllCatalogProducts()

  const prints = products.filter((p) => !p.isOriginal)
  const originals = products.filter((p) => p.isOriginal)

  return (
    <>
      {/* ── 1. Hero Banner ────────────────────────── */}
      <section className={styles.heroBanner}>
        <div className={styles.heroMedia}>
          <Image
            src="/hero.jpg"
            alt="Elena Moore Original Oil Painting"
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
            sizes="100vw"
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>Original Oil Paintings & Archival Prints</p>
          <h1 className={styles.heroTitle}>Art for Lived-In Spaces</h1>
          <div className={styles.heroButtons}>
            <Link href="/collections/originals" className={styles.primaryBtn}>
              Shop Originals
            </Link>
            <Link href="/collections/prints" className={styles.outlineBtn}>
              Shop Fine Art Prints
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Bestselling Fine Art Prints ─────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <p className="label">Archival Reproductions</p>
              <h2 className={styles.sectionTitle}>Bestselling Prints</h2>
            </div>
            <Link href="/collections/prints" className="btn btn--outline btn--sm">
              View All Prints →
            </Link>
          </div>

          <div className={styles.productGrid}>
            {prints.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Original Oil Paintings ─────────────── */}
      <section className={`${styles.section} ${styles.collectorSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <p className="label">One-of-a-Kind</p>
              <h2 className={styles.sectionTitle}>Original Works</h2>
            </div>
            <Link href="/collections/originals" className="btn btn--outline btn--sm">
              View All Originals →
            </Link>
          </div>

          <div className={styles.productGrid}>
            {originals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Custom Artwork Commissions ─────────── */}
      <section className={styles.commissionsBanner}>
        <div className="container">
          <div className={styles.commissionsCard}>
            <div className={styles.commissionsLeft}>
              <p className="label">Custom Artwork</p>
              <h2 className={styles.commissionsTitle}>
                Looking for a Custom Piece?
              </h2>
              <p className={styles.commissionsSub}>
                Elena works with collectors and interior designers to create bespoke oil paintings of cocktails, celebratory tables, and favorite moments.
              </p>
              <Link href="/contact?type=commission" className={styles.commissionsBtn}>
                Commission Artwork
              </Link>
            </div>

            <div className={styles.commissionsRight}>
              <div className={styles.commissionsImage}>
                <Image
                  src="/hero.jpg"
                  alt="Custom commission oil painting"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Gift Card Section ─────────────────── */}
      <GiftCardSection />

      {/* ── 6. Print Club Monthly Subscription ─────── */}
      <section className={styles.printClub}>
        <div className="container">
          <div className={styles.printClubInner}>
            <div className={styles.printClubImages}>
              <div className={styles.printClubImg1}>
                <Image src="/aperol.jpg" alt="Aperol Spritz print" fill style={{ objectFit: 'cover' }} sizes="300px" />
              </div>
              <div className={styles.printClubImg2}>
                <Image src="/berries.jpg" alt="Blueberries print" fill style={{ objectFit: 'cover' }} sizes="220px" />
              </div>
            </div>
            <div className={styles.printClubContent}>
              <span className="badge badge--sand">Monthly Club</span>
              <h2 className={styles.printClubTitle}>
                A New Print<br />Every Month
              </h2>
              <p className={styles.printClubDesc}>
                Receive a curated 8×10 archival giclée print delivered each month — limited collector editions never
                released to the general shop. Subscribers also enjoy 15% off all purchases
                and priority access to new original collections.
              </p>
              <div className={styles.printClubPrice}>
                <span className="price">$28</span>
                <span className={styles.printClubPer}>/month</span>
              </div>
              <Link href="/subscriptions" className="btn btn--primary btn--lg">
                Join the Club
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Newsletter ─────────────────────────── */}
      <section className={styles.newsletter}>
        <div className="container container--narrow">
          <p className="label" style={{ textAlign: 'center' }}>Stay Connected</p>
          <h2 className={`${styles.newsletterTitle} text-center`}>
            From the Studio
          </h2>
          <p className={`${styles.newsletterDesc} text-center`}>
            Receive early announcements for original painting drops, studio updates, and
            collector-only print releases.
          </p>
          <NewsletterForm
            className={styles.newsletterForm}
            inputClassName={`input ${styles.newsletterInput}`}
            buttonClassName="btn btn--primary btn--lg"
            buttonText="Subscribe"
          />
        </div>
      </section>
    </>
  )
}

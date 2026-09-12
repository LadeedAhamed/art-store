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
            alt="Original Oil Painting"
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

      {/* Mini prints decorative strip */}
      <div className={styles.artStrip}>
        <div className={styles.artStripInner}>
          {['/aperol.jpg', '/berries.jpg', '/hero.jpg', '/aperol.jpg', '/berries.jpg', '/hero.jpg'].map((img, i) => (
            <div key={i} className={styles.stripThumb}>
              <Image src={img} alt="Mini art print" fill style={{ objectFit: 'cover' }} sizes="150px" />
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. Bestselling Prints ────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Bestselling Prints</h2>
            <div className={styles.carouselNav}>
              <span className={styles.arrowDisabled}>‹</span>
              <span className={styles.pageCount}>1/8</span>
              <span className={styles.arrowActive}>›</span>
            </div>
          </div>

          <div className={styles.productGrid}>
            {prints.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Become a Collector (Originals) ────── */}
      <section className={`${styles.section} ${styles.collectorSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Become a Collector</h2>
            <div className={styles.carouselNav}>
              <span className={styles.arrowDisabled}>‹</span>
              <span className={styles.pageCount}>1/8</span>
              <span className={styles.arrowActive}>›</span>
            </div>
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
              <h2 className={styles.commissionsTitle}>
                Looking for custom artwork?
              </h2>
              <p className={styles.commissionsSub}>
                I'm currently taking commissions for custom still lifes, cocktails, and family dining memories.
              </p>
              <Link href="/contact?type=commission" className={styles.commissionsBtn}>
                Work With Elena
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

      {/* ── 5. Consider a Gift Card! ──────────────── */}
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
                Receive a hand-selected 8×10 archival giclée print each month — exclusive works never
                available in the public shop. Subscribers also get 15% off all purchases
                and early access to new originals.
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

      {/* ── 7. Newsletter (From the Studio) ──────── */}
      <section className={styles.newsletter}>
        <div className="container container--narrow">
          <p className="label" style={{ textAlign: 'center' }}>Stay Connected</p>
          <h2 className={`${styles.newsletterTitle} text-center`}>
            From the Studio
          </h2>
          <p className={`${styles.newsletterDesc} text-center`}>
            Get first access to new original drops, behind-the-scenes process, and
            subscriber-only prints. No spam, ever.
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

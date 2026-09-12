import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import ProductCard from '@/components/shop/ProductCard'
import NewsletterForm from '@/components/ui/NewsletterForm'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { isFeatured: true, isActive: true },
      take: 6,
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    return []
  }
}

async function getSiteSettings() {
  try {
    return await prisma.siteSetting.findUnique({ where: { id: 'default' } })
  } catch {
    return null
  }
}

export default async function HomePage() {
  const [featured, settings] = await Promise.all([
    getFeaturedProducts(),
    getSiteSettings(),
  ])

  const heroImage = settings?.heroImage || '/hero.jpg'
  const heroLabel = settings?.heroLabel || 'Original Oil Paintings & Prints'
  const heroTitle = settings?.heroTitle || 'Fine Art for Timeless Interiors'
  const heroDesc = settings?.heroDesc || 'Capturing light, texture, and quiet atmosphere on linen and canvas.'
  const aboutBio = settings?.aboutBio || "I am an oil painter working from my studio, exploring the meditative beauty of natural light, textured brushwork, and timeless compositions. Every original piece is rendered on fine Belgian linen with museum-grade pigments."
  const marqueeItems = settings?.marqueeText
    ? settings.marqueeText.split('•').map((s) => s.trim()).filter(Boolean)
    : [
        'Free shipping over $75',
        'Archival-quality giclée prints',
        'Signed originals',
        'Collector Club memberships',
        'Private commissions available',
      ]

  return (
    <>
      {/* ── Hero ────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src={heroImage}
            alt={heroTitle}
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
            sizes="100vw"
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroLabel}>
            {heroLabel}
          </p>
          <h1 className={styles.heroTitle}>
            {heroTitle}
          </h1>
          <p className={styles.heroDesc}>
            {heroDesc}
          </p>
          <div className={styles.heroActions}>
            <Link href="/shop" className="btn btn--primary btn--lg">
              Shop Prints & Originals
            </Link>
            <Link href="/subscriptions" className={`btn btn--lg ${styles.heroSecondaryBtn}`}>
              Join Print Club
            </Link>
          </div>
        </div>
      </section>

      {/* ── Marquee Banner ──────────────────────── */}
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {Array(4).fill(marqueeItems).flat().map((text, i) => (
            <span key={i} className={styles.marqueeItem}>{text} <span className={styles.marqueeDot}>◆</span></span>
          ))}
        </div>
      </div>

      {/* ── Featured Works ───────────────────────── */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <p className="label">New Work</p>
              <h2>Featured Pieces</h2>
            </div>
            <Link href="/shop" className="btn btn--ghost">
              View All →
            </Link>
          </div>

          <div className={styles.productGrid}>
            {featured.length > 0 ? (
              featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              // Placeholder cards when DB not seeded
              [1,2,3,4,5,6].map((i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={`skeleton ${styles.skeletonImg}`} />
                  <div className={styles.skeletonBody}>
                    <div className={`skeleton ${styles.skeletonTitle}`} />
                    <div className={`skeleton ${styles.skeletonPrice}`} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── Print Club Promo ─────────────────────── */}
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
              <span className="badge badge--sky">Print Club</span>
              <h2 className={styles.printClubTitle}>
                A New Print<br />Every Month
              </h2>
              <p className={styles.printClubDesc}>
                Receive a hand-selected 8×10 giclée print each month — works never
                available in the shop. Subscribers also get 15% off all purchases
                and early access to new originals.
              </p>
              <div className={styles.printClubPrice}>
                <span className="price">$28</span>
                <span className={styles.printClubPer}>/month</span>
              </div>
              <Link href="/subscriptions" className="btn btn--sky btn--lg">
                Join the Club
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Teaser ─────────────────────────── */}
      <section className={`section ${styles.about}`}>
        <div className="container">
          <div className={styles.aboutInner}>
            <div className={styles.aboutContent}>
              <p className="label">About the Artist</p>
              <h2>Elena Moore</h2>
              <div className={styles.dividerLeft} />
              <p className={styles.aboutText}>
                {aboutBio}
              </p>
              <p className={styles.aboutText}>
                Each painting is an invitation to slow down and find joy in the small,
                beautiful things.
              </p>
              <Link href="/about" className="btn btn--secondary">
                Read More
              </Link>
            </div>
            <div className={styles.aboutImage}>
              <Image
                src="/hero.jpg"
                alt="Elena Moore in her studio"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────── */}
      <section className={`section--sm ${styles.testimonials}`}>
        <div className="container container--narrow">
          <h2 className={`${styles.testimonialsTitle} text-center`}>What Collectors Say</h2>
          <div className={styles.testimonialsGrid}>
            {[
              {
                quote: "The original landscape painting arrived in pristine museum packaging. The depth of texture and light in person is breathtaking — the centerpiece of our living room.",
                author: "Sarah M., New York",
              },
              {
                quote: "My Collector Print Club subscription is the highlight of each season. The 310gsm archival paper and rich pigments look indistinguishable from original canvas studies.",
                author: "James T., London",
              },
              {
                quote: "Elena's original oil paintings are true museum quality. The way she renders natural light across Belgian linen brings such a tranquil, elevated presence to our space.",
                author: "Priya K., Chicago",
              },
            ].map((t, i) => (
              <blockquote key={i} className={styles.testimonial}>
                <p className={styles.quote}>"{t.quote}"</p>
                <cite className={styles.author}>— {t.author}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────── */}
      <section className={styles.newsletter}>
        <div className="container container--narrow">
          <p className="label" style={{ textAlign: 'center' }}>Stay Connected</p>
          <h2 className={`${styles.newsletterTitle} text-center`}>
            From the Studio
          </h2>
          <p className={`${styles.newsletterDesc} text-center`}>
            Get first access to new works, behind-the-scenes process, and
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

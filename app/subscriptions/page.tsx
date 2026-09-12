import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Print Club — Monthly Art Subscription',
  description: 'Receive a new 8×10 giclée print from Elena Moore\'s studio every month. Cancel anytime.',
}

const included = [
  'One exclusive 8×10 giclée print each month',
  'Works never sold in the public shop',
  'First access to new original paintings',
  '15% discount on all shop purchases',
  'Behind-the-scenes studio newsletters',
  'Signed prints with handwritten note',
]

const faqs = [
  {
    q: 'When do prints ship?',
    a: 'Prints ship on the 15th of each month. You\'ll receive a tracking number as soon as your order ships.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes — cancel any time through your account page. If you cancel before the 10th of the month, you won\'t be charged for that month.',
  },
  {
    q: 'What size are the prints?',
    a: 'All Print Club prints are 8×10 inches, printed on archival-quality matte paper. They fit standard frames available at any home goods store.',
  },
  {
    q: 'Do I choose which print I receive?',
    a: 'No — part of the magic is the surprise! Each month\'s print is hand-selected from new studio work. You\'ll receive it before it\'s released publicly.',
  },
  {
    q: 'Is there a gift option?',
    a: 'Yes! You can gift a Print Club subscription from your account page after checkout. Gift subscriptions can be set for 3, 6, or 12 months.',
  },
]

export default function SubscriptionsPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <span className="badge badge--sky">Print Club</span>
              <h1 className={styles.heroTitle}>A New Print<br />Every Month</h1>
              <p className={styles.heroDesc}>
                Receive exclusive, studio-fresh oil painting prints delivered to your
                door. Works you won't find anywhere else — made for people who love
                beautiful things.
              </p>
              <div className={styles.heroPrice}>
                <span className="price price--original">$28</span>
                <span className={styles.pricePer}>/month</span>
              </div>
              <div className={styles.heroActions}>
                <Link href="/checkout?plan=monthly" className="btn btn--sky btn--lg">
                  Subscribe — $28/month
                </Link>
                <Link href="/checkout?plan=annual" className="btn btn--ghost btn--lg">
                  Annual — $280/year (save $56)
                </Link>
              </div>
              <p className={styles.heroNote}>Cancel anytime · No contracts · First print ships immediately</p>
            </div>
            <div className={styles.heroImages}>
              <div className={styles.heroImg1}>
                <Image src="/hero.jpg" alt="Print Club sample" fill style={{ objectFit: 'cover' }} sizes="400px" />
              </div>
              <div className={styles.heroImg2}>
                <Image src="/aperol.jpg" alt="Print Club sample" fill style={{ objectFit: 'cover' }} sizes="260px" />
              </div>
              <div className={styles.heroImg3}>
                <Image src="/berries.jpg" alt="Print Club sample" fill style={{ objectFit: 'cover' }} sizes="200px" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Included ─────────────────────────────── */}
      <section className={`section ${styles.included}`}>
        <div className="container container--narrow">
          <p className="label text-center">What You Get</p>
          <h2 className="text-center" style={{ marginTop: '0.5rem', marginBottom: '3rem' }}>
            Everything in Print Club
          </h2>
          <div className={styles.includedGrid}>
            {included.map((item, i) => (
              <div key={i} className={styles.includedItem}>
                <span className={styles.checkmark}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plans ────────────────────────────────── */}
      <section className={`section ${styles.plans}`}>
        <div className="container container--narrow">
          <h2 className="text-center" style={{ marginBottom: '3rem' }}>Choose Your Plan</h2>
          <div className={styles.plansGrid}>
            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <h3>Monthly</h3>
                <div className={styles.planPrice}>
                  <span className="price">$28</span>
                  <span>/month</span>
                </div>
              </div>
              <ul className={styles.planFeatures}>
                <li>One print per month</li>
                <li>Billed monthly</li>
                <li>Cancel anytime</li>
                <li>15% shop discount</li>
              </ul>
              <Link href="/checkout?plan=monthly" className="btn btn--primary btn--full">
                Subscribe Monthly
              </Link>
            </div>
            <div className={`${styles.planCard} ${styles.planCardFeatured}`}>
              <span className={styles.planBadge}>Best Value</span>
              <div className={styles.planHeader}>
                <h3>Annual</h3>
                <div className={styles.planPrice}>
                  <span className="price">$280</span>
                  <span>/year</span>
                </div>
                <p className={styles.planSavings}>Save $56 vs monthly</p>
              </div>
              <ul className={styles.planFeatures}>
                <li>One print per month (12 total)</li>
                <li>Billed annually</li>
                <li>Free to cancel at any time</li>
                <li>15% shop discount</li>
                <li>Bonus: exclusive annual print</li>
              </ul>
              <Link href="/checkout?plan=annual" className="btn btn--sky btn--full">
                Subscribe Annually
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────── */}
      <section className={`section ${styles.faq}`}>
        <div className="container container--narrow">
          <h2 className="text-center" style={{ marginBottom: '3rem' }}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqs.map((item, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqQ}>{item.q}</summary>
                <p className={styles.faqA}>{item.a}</p>
              </details>
            ))}
          </div>
          <div className={styles.faqCta}>
            <p>Still have questions?</p>
            <Link href="/contact" className="btn btn--secondary">
              Contact the Studio
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

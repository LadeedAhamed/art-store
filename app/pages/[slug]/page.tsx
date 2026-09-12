import { notFound } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.css'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

interface PageData {
  title: string
  subtitle: string
  lastUpdated: string
  sections: { title: string; content: string[] }[]
}

const pagesContent: Record<string, PageData> = {
  shipping: {
    title: 'Shipping & Returns',
    subtitle: 'Everything you need to know about delivery and care of your artwork.',
    lastUpdated: 'September 2026',
    sections: [
      {
        title: 'Packaging Standards',
        content: [
          'Every artwork is packed with museum-grade care. Fine art prints up to 11×14 inches ship flat in acid-free archival sleeves backed by rigid 4-ply conservation boards. Larger prints ship rolled in heavy-duty 4-inch mailing tubes with protective glassine interleaving.',
          'Original oil paintings are allowed full curing time before varnishing. Originals ship in custom-built wooden-reinforced crates with high-density foam suspension to guarantee perfect arrival.',
        ],
      },
      {
        title: 'Domestic Shipping (US)',
        content: [
          'Standard Shipping: Orders over $75 qualify for complimentary standard shipping (delivered in 5–7 business days). Orders under $75 ship for a flat rate of $8.95.',
          'Expedited Shipping: 2-day priority courier shipping is available at checkout for $22.',
          'All shipments include door-to-door carrier tracking via USPS Priority or FedEx Home Delivery.',
        ],
      },
      {
        title: 'Returns & Exchanges',
        content: [
          'Prints: We want you to love your art. If you are not completely delighted with your print, return it in original condition within 30 days of delivery for a full refund or exchange.',
          'Original Paintings: All original sales are final once delivered in good condition. If damage occurs during transit, please photograph the package immediately and notify elena@elenamooreart.com within 48 hours for immediate insurance resolution.',
        ],
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Answers to common questions about materials, framing, and collecting.',
    lastUpdated: 'September 2026',
    sections: [
      {
        title: 'What materials do you use for your prints?',
        content: [
          'Our prints are museum-grade giclée reproductions printed on archival 310gsm 100% cotton rag smooth paper using Epson UltraChrome HDR pigment inks. They are rated lightfast for 100+ years under standard domestic display conditions.',
        ],
      },
      {
        title: 'Do the prints come framed?',
        content: [
          'Prints are sold unframed so you can choose a frame and matting that perfectly complements your home interior. All print dimensions (8×10, 11×14, 16×20) fit standard off-the-shelf frames widely available at West Elm, Pottery Barn, Target, or your local custom framer.',
        ],
      },
      {
        title: 'How does the Print Club subscription work?',
        content: [
          'Print Club members receive an exclusive, subscriber-only 8×10 giclée print every month for $28/month. The print changes monthly and is never sold in the public store. Members also enjoy an automatic 15% discount across all store originals and open-edition prints, and can pause or cancel at any time with one click.',
        ],
      },
      {
        title: 'Are original paintings signed?',
        content: [
          'Yes, all original oil paintings are hand-signed by Elena Moore on the bottom corner and titled, dated, and signed on the reverse canvas stretcher bar. Every original comes with an embossed Certificate of Authenticity.',
        ],
      },
      {
        title: 'Can I commission a custom piece?',
        content: [
          'Yes! Elena accepts a limited number of custom still life commissions each season (e.g. favorite family heirloom recipe, celebratory bottle, botanical arrangement). You can inquire via our Contact page with your concept and preferred dimensions.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How we respect and protect your personal information.',
    lastUpdated: 'September 2026',
    sections: [
      {
        title: 'Information We Collect',
        content: [
          'When you purchase from Elena Moore Art, we collect your name, email address, shipping address, and billing information strictly necessary to fulfill your order and keep you updated on tracking.',
        ],
      },
      {
        title: 'Payment Processing via Stripe',
        content: [
          'We do not store your full credit or debit card numbers on our servers. All payments are processed directly through Stripe, a PCI-DSS Level 1 certified payment gateway utilizing industry-standard 256-bit encryption.',
        ],
      },
      {
        title: 'Newsletter & Communication',
        content: [
          'If you opt in to our studio newsletter, we will send occasional updates regarding new collections and Print Club releases. You may unsubscribe at any time using the link in the email footer.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'Terms and conditions governing use of this website and purchases.',
    lastUpdated: 'September 2026',
    sections: [
      {
        title: 'Copyright & Intellectual Property',
        content: [
          'All images, paintings, text, and artwork displayed on this website are the intellectual property of Elena Moore. Purchase of an original painting or print conveys ownership of the physical object but does not transfer copyright or reproduction rights.',
        ],
      },
      {
        title: 'Color Accuracy',
        content: [
          'We make every effort to display the colors of our paintings as accurately as possible on screen. However, due to variations in monitor calibrations and natural ambient lighting, actual pigment colors may vary slightly in person.',
        ],
      },
      {
        title: 'Order Fulfillment & Pricing',
        content: [
          'Prices are listed in USD. We reserve the right to correct any inadvertent typographical pricing errors. In the event of an inventory discrepancy, we will contact you immediately to provide a full refund or suitable alternative.',
        ],
      },
    ],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = pagesContent[params.slug]
  if (!page) return { title: 'Information' }
  return {
    title: `${page.title} — Elena Moore Art`,
    description: page.subtitle,
  }
}

export default async function StaticInfoPage({ params }: Props) {
  const { slug } = params
  const page = pagesContent[slug]
  if (!page) notFound()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container container--narrow text-center">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>{page.title}</span>
          </nav>
          <h1 className={styles.title}>{page.title}</h1>
          <p className={styles.subtitle}>{page.subtitle}</p>
          <p className={styles.meta}>Last updated: {page.lastUpdated}</p>
        </div>
      </header>

      <div className="section">
        <div className="container container--narrow">
          <div className={styles.content}>
            {page.sections.map((sec, i) => (
              <article key={i} className={styles.sectionBlock}>
                <h2 className={styles.sectionTitle}>{sec.title}</h2>
                {sec.content.map((p, j) => (
                  <p key={j} className={styles.paragraph}>{p}</p>
                ))}
              </article>
            ))}
          </div>

          <div className={styles.footerNav}>
            <h3>Need additional assistance?</h3>
            <p>Our studio team is available Monday through Friday to answer any questions.</p>
            <Link href="/contact" className="btn btn--primary">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

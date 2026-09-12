import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import ProductCard from '@/components/shop/ProductCard'
import { INITIAL_PRODUCTS, StaticProduct } from '@/lib/products-data'
import styles from './page.module.css'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

const collectionMeta: Record<string, { title: string; subtitle: string; description: string; filter: Record<string, unknown> }> = {
  originals: {
    title: 'Original Oil Paintings',
    subtitle: 'One-of-a-Kind Works',
    description: 'Each piece is hand-painted in oil on stretched Belgian linen or cradled wood panel, signed, varnished, and accompanied by a Certificate of Authenticity.',
    filter: { isOriginal: true, isActive: true },
  },
  prints: {
    title: 'Fine Art Prints',
    subtitle: 'Archival Giclée Reproductions',
    description: 'Museum-quality giclée prints produced on 310gsm heavy cotton rag paper using pigment-based inks guaranteed to resist fading for over 100 years.',
    filter: { category: 'print', isActive: true },
  },
  landscapes: {
    title: 'Landscapes & Atmospheres',
    subtitle: 'Horizon & Coastal Studies',
    description: 'Atmospheric tonal landscapes and coastal compositions exploring light, weather, and tranquility.',
    filter: { collection: 'landscapes', isActive: true },
  },
  'still-life': {
    title: 'Still Life & Form',
    subtitle: 'Studio Meditations',
    description: 'Quiet, luminous compositions exploring organic forms, rustic ceramics, and the play of shadow on linen.',
    filter: { collection: 'still-life', isActive: true },
  },
  botanicals: {
    title: 'Botanicals & Flora',
    subtitle: 'Garden & Studio Studies',
    description: 'Contemplative floral and plant still lifes celebrating transient seasonal beauty.',
    filter: { collection: 'botanicals', isActive: true },
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = collectionMeta[params.slug]
  if (!meta) return { title: 'Collection' }
  return {
    title: `${meta.title} — Elena Moore`,
    description: meta.description,
  }
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = params
  const meta = collectionMeta[slug]
  if (!meta) notFound()

  let products: StaticProduct[] = []
  try {
    const dbProducts = await prisma.product.findMany({
      where: meta.filter,
      orderBy: { createdAt: 'desc' },
    })
    if (dbProducts.length > 0) products = dbProducts
  } catch {}

  if (products.length === 0) {
    if (slug === 'originals') products = INITIAL_PRODUCTS.filter((p) => p.isOriginal && p.isActive)
    else if (slug === 'prints') products = INITIAL_PRODUCTS.filter((p) => p.category === 'print' && p.isActive)
    else products = INITIAL_PRODUCTS.filter((p) => p.collection === slug && p.isActive)
  }

  return (
    <div className={styles.page}>
      {/* Header Banner */}
      <header className={styles.header}>
        <div className="container container--narrow text-center">
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/shop">Shop</Link>
            <span>/</span>
            <span>{meta.title}</span>
          </nav>
          <span className="badge badge--sand">{meta.subtitle}</span>
          <h1 className={styles.title}>{meta.title}</h1>
          <p className={styles.desc}>{meta.description}</p>
        </div>
      </header>

      {/* Grid */}
      <section className="section">
        <div className="container">
          <div className={styles.toolbar}>
            <p className={styles.count}>{products.length} {products.length === 1 ? 'artwork' : 'artworks'} found</p>
            <div className={styles.navTabs}>
              <Link href="/shop" className={styles.tab}>All</Link>
              <Link href="/collections/originals" className={`${styles.tab} ${slug === 'originals' ? styles.tabActive : ''}`}>Originals</Link>
              <Link href="/collections/prints" className={`${styles.tab} ${slug === 'prints' ? styles.tabActive : ''}`}>Prints</Link>
              <Link href="/subscriptions" className={styles.tab}>Print Club</Link>
            </div>
          </div>

          {products.length > 0 ? (
            <div className={styles.grid}>
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>No pieces currently available in this collection.</p>
              <Link href="/shop" className="btn btn--primary">View All Available Work</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

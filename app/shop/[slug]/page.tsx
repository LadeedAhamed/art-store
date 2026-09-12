import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import AddToCartForm from '@/components/shop/AddToCartForm'
import ProductCard from '@/components/shop/ProductCard'
import ArtworkViewer from '@/components/shop/ArtworkViewer'
import { INITIAL_PRODUCTS } from '@/lib/products-data'
import styles from './page.module.css'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findUnique({ where: { slug } })
    if (product && product.isActive) return product
  } catch (err) {
    console.error('getProduct error:', err)
  }

  const fallback = INITIAL_PRODUCTS.find((p) => p.slug === slug && p.isActive)
  return fallback ?? null
}

async function getRelatedProducts(category: string, id: string) {
  try {
    const dbRelated = await prisma.product.findMany({
      where: { category, id: { not: id }, isActive: true },
      take: 4,
    })
    if (dbRelated.length > 0) return dbRelated
  } catch {}

  return INITIAL_PRODUCTS.filter((p) => p.category === category && p.id !== id && p.isActive).slice(0, 4)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const product = await getProduct(slug)
  if (!product) return {}

  let parsedImages: string[] = ['/hero.jpg']
  try {
    const imgs = JSON.parse(product.images)
    if (Array.isArray(imgs) && imgs.length > 0) parsedImages = imgs
  } catch {
    if (product.images) parsedImages = [product.images]
  }

  return {
    title: `${product.title} | Elena Moore Fine Art`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.title} | Original Art & Fine Prints`,
      description: product.description.slice(0, 160),
      images: [{ url: parsedImages[0] }],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params
  const product = await getProduct(slug)
  if (!product) notFound()

  let images: string[] = ['/hero.jpg']
  try {
    const parsed = JSON.parse(product.images)
    if (Array.isArray(parsed) && parsed.length > 0) images = parsed
    else if (typeof product.images === 'string' && product.images) images = [product.images]
  } catch {
    if (product.images) images = [product.images]
  }

  const related = await getRelatedProducts(product.category, product.id)

  // JSON-LD Structured Data for Fine Art & E-Commerce
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': product.isOriginal ? 'VisualArtwork' : 'Product',
    name: product.title,
    image: images,
    description: product.description,
    artMedium: product.medium || 'Oil on linen',
    artform: product.isOriginal ? 'Painting' : 'Fine Art Print',
    artist: {
      '@type': 'Person',
      name: 'Elena Moore',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      seller: {
        '@type': 'Organization',
        name: 'Elena Moore Fine Art',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.page}>
        <div className="container">
          <div className={styles.grid}>
            {/* Interactive High-Resolution Artwork Viewer */}
            <div className={styles.gallery}>
              <ArtworkViewer
                title={product.title}
                images={images}
                isOriginal={product.isOriginal}
                medium={product.medium}
              />
            </div>

            {/* Product Info */}
            <div className={styles.info}>
              {/* Breadcrumb */}
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <a href="/shop">Shop</a>
                <span>›</span>
                <span>
                  {product.category === 'print'
                    ? 'Prints'
                    : product.isOriginal
                    ? 'Original Paintings'
                    : 'Print Club'}
                </span>
              </nav>

              {product.isOriginal && (
                <span className="badge badge--terracotta">★ One of a Kind Original</span>
              )}
              {product.category === 'subscription' && (
                <span className="badge badge--sky">Print Club</span>
              )}

              <h1 className={styles.title}>{product.title}</h1>

              <div className={styles.priceWrap}>
                <span className="price price--original">
                  ${product.price.toLocaleString()}
                  {!product.isOriginal && product.category !== 'subscription' && (
                    <span className={styles.priceNote}> / archival print</span>
                  )}
                  {product.category === 'subscription' && (
                    <span className={styles.priceNote}> /month</span>
                  )}
                </span>
              </div>

              <div className={styles.divider} />

              <p className={styles.description}>{product.description}</p>

              {/* Details & Provenance */}
              {(product.medium || product.dimensions || product.year) && (
                <div className={styles.details}>
                  {product.medium && (
                    <div className={styles.detail}>
                      <span className={styles.detailLabel}>Medium</span>
                      <span className={styles.detailValue}>{product.medium}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className={styles.detail}>
                      <span className={styles.detailLabel}>Dimensions</span>
                      <span className={styles.detailValue}>{product.dimensions}</span>
                    </div>
                  )}
                  {product.year && (
                    <div className={styles.detail}>
                      <span className={styles.detailLabel}>Year</span>
                      <span className={styles.detailValue}>{product.year}</span>
                    </div>
                  )}
                  {product.isOriginal && (
                    <div className={styles.detail}>
                      <span className={styles.detailLabel}>Provenance</span>
                      <span className={styles.detailValue}>
                        Direct from Artist Studio • Certificate of Authenticity Included
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Add to Cart / Framing Form */}
              <AddToCartForm product={product} images={images} />

              {/* Trust Signals */}
              <div className={styles.trust}>
                {[
                  { icon: '🚚', text: 'Free standard domestic shipping on orders over $75' },
                  { icon: '🔒', text: '256-bit encrypted checkout via Stripe' },
                  { icon: '📦', text: 'Archival crating & custom protective packaging' },
                  { icon: '📜', text: 'Certificate of Authenticity included with all originals' },
                ].map((t) => (
                  <div key={t.text} className={styles.trustItem}>
                    <span>{t.icon}</span>
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className={`section ${styles.related}`}>
          <div className="container">
            <h2 className={styles.relatedTitle}>Related Studio Artworks</h2>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

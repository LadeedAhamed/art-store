import { prisma } from '@/lib/db'
import ProductCard from '@/components/shop/ProductCard'
import ShopFilters from '@/components/shop/ShopFilters'
import styles from './page.module.css'
import { INITIAL_PRODUCTS } from '@/lib/products-data'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Shop — Prints & Originals',
  description: 'Browse all original oil paintings and fine art giclée prints by Elena Moore.',
}

interface SearchParams {
  category?: string
  sort?: string
  collection?: string
}

async function getProducts(searchParams: SearchParams) {
  try {
    const where: Record<string, unknown> = { isActive: true }

    if (searchParams.category && searchParams.category !== 'all') {
      where.category = searchParams.category
    }
    if (searchParams.collection) {
      where.collection = searchParams.collection
    }

    const orderBy: Record<string, string> = {}
    if (searchParams.sort === 'price-asc') orderBy.price = 'asc'
    else if (searchParams.sort === 'price-desc') orderBy.price = 'desc'
    else orderBy.createdAt = 'desc'

    const dbProducts = await prisma.product.findMany({ where, orderBy })
    if (dbProducts.length > 0) return dbProducts
  } catch {}

  // Fallback to initial fine-art collection
  let fallback = INITIAL_PRODUCTS.filter((p) => p.isActive)
  if (searchParams.category && searchParams.category !== 'all') {
    fallback = fallback.filter((p) => p.category === searchParams.category)
  }
  if (searchParams.collection) {
    fallback = fallback.filter((p) => p.collection === searchParams.collection)
  }
  if (searchParams.sort === 'price-asc') fallback.sort((a, b) => a.price - b.price)
  else if (searchParams.sort === 'price-desc') fallback.sort((a, b) => b.price - a.price)

  return fallback
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const products = await getProducts(params)

  return (
    <>
      <div className={styles.pageHero}>
        <div className="container">
          <p className="label">Elena Moore Art</p>
          <h1>Shop</h1>
          <p>Original oil paintings and archival giclée prints</p>
        </div>
      </div>

      <div className="container section">
        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <ShopFilters currentParams={params} />
          </aside>

          {/* Products */}
          <div className={styles.products}>
            <div className={styles.resultsBar}>
              <p className="caption">{products.length} {products.length === 1 ? 'product' : 'products'}</p>
              <div className={styles.sortSelect}>
                <label htmlFor="sort-select" className="label">Sort</label>
                <select
                  id="sort-select"
                  className={styles.select}
                  defaultValue={params.sort ?? 'newest'}
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {products.length === 0 ? (
              <div className={styles.empty}>
                <p>No products found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className={styles.grid}>
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

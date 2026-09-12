'use client'

import Link from 'next/link'
import styles from './ShopFilters.module.css'

interface Props {
  currentParams: {
    category?: string
    collection?: string
    sort?: string
  }
}

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'print', label: 'Prints' },
  { value: 'original', label: 'Originals' },
]

const collections = [
  { value: 'landscapes', label: 'Landscapes & Horizon' },
  { value: 'still-life', label: 'Still Life & Form' },
  { value: 'botanicals', label: 'Botanicals & Flora' },
]

export default function ShopFilters({ currentParams }: Props) {
  const currentCategory = currentParams.category ?? 'all'
  const currentCollection = currentParams.collection

  const buildHref = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams()
    const merged = { ...currentParams, ...overrides }
    Object.entries(merged).forEach(([k, v]) => {
      if (v && v !== 'all') params.set(k, v)
    })
    const qs = params.toString()
    return `/shop${qs ? `?${qs}` : ''}`
  }

  return (
    <div className={styles.filters}>
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Category</h3>
        {categories.map((cat) => (
          <Link
            key={cat.value}
            href={buildHref({ category: cat.value, collection: currentCollection })}
            className={`${styles.filterLink} ${currentCategory === cat.value ? styles.active : ''}`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Collection</h3>
        {collections.map((col) => (
          <Link
            key={col.value}
            href={buildHref({ collection: currentCollection === col.value ? undefined : col.value })}
            className={`${styles.filterLink} ${currentCollection === col.value ? styles.active : ''}`}
          >
            {col.label}
          </Link>
        ))}
      </div>

      {(currentCategory !== 'all' || currentCollection) && (
        <Link href="/shop" className={styles.clearBtn}>
          Clear All Filters ×
        </Link>
      )}
    </div>
  )
}

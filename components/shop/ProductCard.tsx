'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useCartStore } from '@/lib/cart-store'
import styles from './ProductCard.module.css'

interface Product {
  id: string
  slug: string
  title: string
  price: number
  images: string
  category: string
  isOriginal: boolean
  sizes?: string | null
  stock?: number
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCartStore()

  const isSoldOut = product.stock !== undefined && product.stock <= 0

  let images: string[] = ['/hero.jpg']
  try {
    const parsed = JSON.parse(product.images)
    if (Array.isArray(parsed) && parsed.length > 0) images = parsed
    else if (typeof product.images === 'string' && product.images) images = [product.images]
  } catch {
    if (product.images) images = [product.images]
  }

  let sizes: string[] = []
  try {
    if (product.sizes) {
      const parsed = JSON.parse(product.sizes)
      if (Array.isArray(parsed)) sizes = parsed
      else if (typeof product.sizes === 'string') sizes = product.sizes.split(',').map((s) => s.trim())
    }
  } catch {
    if (product.sizes) sizes = product.sizes.split(',').map((s) => s.trim())
  }
  const defaultSize = sizes[1] ?? sizes[0] ?? undefined

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isSoldOut) return
    setIsAdding(true)
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: 1,
      size: defaultSize,
      image: images[0],
    })
    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <article className={styles.card}>
      <Link href={`/shop/${product.slug}`} className={styles.imageLink}>
        <div className={`${styles.imageWrap} ${isSoldOut ? styles.imageWrapSold : ''}`}>
          <Image
            src={images[0]}
            alt={product.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {images[1] && (
            <Image
              src={images[1]}
              alt={`${product.title} alternate view`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={styles.hoverImage}
            />
          )}
          {/* Badges */}
          <div className={styles.badges}>
            {isSoldOut ? (
              <span className="badge badge--charcoal">
                {product.isOriginal ? 'Sold' : 'Sold Out'}
              </span>
            ) : product.isOriginal ? (
              <span className="badge badge--terracotta">Original</span>
            ) : null}
            {product.category === 'subscription' && (
              <span className="badge badge--sky">Subscription</span>
            )}
          </div>
          {/* Customization Overlay */}
          <div className={styles.overlay}>
            <span
              className={`btn btn--primary ${styles.addBtn}`}
              style={isSoldOut ? { opacity: 0.6, cursor: 'not-allowed' } : undefined}
            >
              {isSoldOut ? 'Sold Out' : 'Select Options & Frame →'}
            </span>
          </div>
        </div>
      </Link>

      <div className={styles.info}>
        <div className={styles.titleBlock}>
          <Link href={`/shop/${product.slug}`} className={styles.titleLink}>
            <h3 className={styles.title}>{product.title}</h3>
          </Link>
          <p className={`caption ${styles.sizes}`}>
            {sizes.length > 0 && !product.isOriginal
              ? sizes.join(' · ')
              : product.isOriginal
              ? 'One-of-a-Kind Original Canvas'
              : 'Archival Fine Art Edition'}
          </p>
        </div>

        <div className={styles.priceRow}>
          <span className="price" style={isSoldOut ? { textDecoration: 'line-through', opacity: 0.6 } : undefined}>
            {product.isOriginal ? `$${product.price.toLocaleString()}` : `From $${product.price}`}
          </span>
          {isSoldOut ? (
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-terracotta)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {product.isOriginal ? 'Acquired' : 'Sold Out'}
            </span>
          ) : (
            <Link href={`/shop/${product.slug}`} className={`btn btn--secondary btn--sm`}>
              Customize & Buy
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

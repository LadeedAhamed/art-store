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
  originalPrice?: number
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
  const isSoldOut = product.stock !== undefined && product.stock <= 0
  const isSale = product.originalPrice !== undefined && product.originalPrice > product.price

  let images: string[] = ['/hero.jpg']
  try {
    const parsed = JSON.parse(product.images)
    if (Array.isArray(parsed) && parsed.length > 0) images = parsed
    else if (typeof product.images === 'string' && product.images) images = [product.images]
  } catch {
    if (product.images) images = [product.images]
  }

  return (
    <article className={styles.card}>
      <Link href={`/shop/${product.slug}`} className={styles.cardLink}>
        <div className={`${styles.imageWrap} ${isSoldOut ? styles.imageWrapSold : ''}`}>
          <Image
            src={images[0]}
            alt={product.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {images[1] && (
            <Image
              src={images[1]}
              alt={`${product.title} alternate view`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={styles.hoverImage}
            />
          )}

          {/* Badges */}
          <div className={styles.badges}>
            {isSoldOut ? (
              <span className={styles.soldBadge}>Sold Out</span>
            ) : isSale ? (
              <span className={styles.saleBadge}>Sale</span>
            ) : null}
          </div>
        </div>

        <div className={styles.info}>
          <h3 className={styles.title}>{product.title}</h3>
          <div className={styles.priceRow}>
            {isSale && product.originalPrice ? (
              <>
                <span className={styles.originalPrice}>
                  ${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                </span>
                <span className={styles.salePrice}>
                  ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                </span>
              </>
            ) : (
              <span className={styles.price}>
                {product.isOriginal
                  ? `$${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`
                  : `From $${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}

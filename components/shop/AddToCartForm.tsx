'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/cart-store'
import styles from './AddToCartForm.module.css'

interface Product {
  id: string
  slug: string
  title: string
  price: number
  sizes?: string | null
  category: string
  isOriginal: boolean
  stock: number
  medium?: string | null
  dimensions?: string | null
}

interface Props {
  product: Product
  images: string[]
}

const FRAMING_OPTIONS = [
  { id: 'unframed', label: 'Unframed (Standard)', priceDelta: 0 },
  { id: 'oak-float', label: 'Solid Natural Oak Floating Frame', priceDelta: 85 },
  { id: 'antique-gold', label: 'Hand-Finished Antique Gold Gilt', priceDelta: 120 },
  { id: 'matted-white', label: 'Archival Matted Minimal White', priceDelta: 65 },
]

export default function AddToCartForm({ product, images }: Props) {
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

  const [selectedSize, setSelectedSize] = useState(sizes[1] ?? sizes[0] ?? '')
  const [selectedFrame, setSelectedFrame] = useState(FRAMING_OPTIONS[0])
  const [qty, setQty] = useState(1)
  const [adding, setAdding] = useState(false)
  const { addItem } = useCartStore()

  const getPriceForSize = (size: string) => {
    if (product.isOriginal) return product.price
    const priceMap: Record<string, number> = {
      '5x7': product.price * 0.7,
      '8x10': product.price,
      '11x14': product.price * 1.4,
      '16x20': product.price * 1.85,
      '20x24': product.price * 2.3,
    }
    return priceMap[size] ?? product.price
  }

  const basePrice = selectedSize ? getPriceForSize(selectedSize) : product.price
  const itemUnitPrice = basePrice + selectedFrame.priceDelta
  const totalPrice = itemUnitPrice * qty

  const handleAddToCart = async () => {
    if (sizes.length > 0 && !selectedSize && !product.isOriginal) return
    setAdding(true)
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: itemUnitPrice,
      quantity: product.isOriginal ? 1 : qty,
      size: product.isOriginal ? (product.dimensions || 'Original') : selectedSize || undefined,
      frame: selectedFrame.id !== 'unframed' ? selectedFrame.label : undefined,
      image: images[0] || '/hero.jpg',
    })
    await new Promise((r) => setTimeout(r, 1000))
    setAdding(false)
  }

  if (product.stock <= 0) {
    return (
      <div className={styles.originalForm}>
        <div className="badge badge--terracotta" style={{ marginBottom: '1rem', display: 'inline-block' }}>
          Sold • Private Collection
        </div>
        <p className={styles.originalNote}>
          This artwork has been acquired by a private collector. You can commission a similar custom still life painting.
        </p>
        <a
          href={`/contact?subject=Commission Request similar to ${encodeURIComponent(product.title)}`}
          className="btn btn--primary btn--full btn--lg"
        >
          Commission Similar Piece →
        </a>
      </div>
    )
  }

  if (product.category === 'subscription') {
    return (
      <div className={styles.form}>
        <a href="/subscriptions" className="btn btn--sky btn--full btn--lg">
          Join Print Club — $28/mo
        </a>
      </div>
    )
  }

  return (
    <div className={styles.form}>
      {/* For Originals: Provenance & Dimensions Note */}
      {product.isOriginal && (
        <div style={{ background: '#FAF8F5', border: '1px solid #E8E4DC', padding: '1rem', borderRadius: 8, marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#4B280B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ★ Verified Studio Original
          </div>
          <div style={{ fontSize: '0.875rem', color: '#57534E', marginTop: '0.25rem' }}>
            Includes signed & sealed Certificate of Authenticity. Shipped in bespoke archival art crate.
          </div>
        </div>
      )}

      {/* Size Picker for Prints */}
      {!product.isOriginal && sizes.length > 0 && (
        <div className={styles.sizeGroup}>
          <label className={styles.fieldLabel}>
            Print Size
            {selectedSize && <span className={styles.selectedNote}> — {selectedSize} inches</span>}
          </label>
          <div className={styles.sizes}>
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ''}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Framing Selector */}
      <div className={styles.sizeGroup}>
        <label className={styles.fieldLabel}>
          Custom Framing
          {selectedFrame.priceDelta > 0 && (
            <span className={styles.selectedNote}> (+${selectedFrame.priceDelta})</span>
          )}
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {FRAMING_OPTIONS.map((frame) => (
            <label
              key={frame.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: selectedFrame.id === frame.id ? '1px solid #4B280B' : '1px solid #E8E4DC',
                background: selectedFrame.id === frame.id ? '#FAF8F5' : '#FFFFFF',
                cursor: 'pointer',
                fontSize: '0.8125rem',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <input
                  type="radio"
                  name="framing"
                  checked={selectedFrame.id === frame.id}
                  onChange={() => setSelectedFrame(frame)}
                  style={{ accentColor: '#4B280B' }}
                />
                <span style={{ fontWeight: selectedFrame.id === frame.id ? 600 : 400, color: '#24211D' }}>
                  {frame.label}
                </span>
              </div>
              <span style={{ color: frame.priceDelta > 0 ? '#8B4A34' : '#8C867A', fontWeight: 600 }}>
                {frame.priceDelta > 0 ? `+$${frame.priceDelta}` : 'Included'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Quantity for Prints */}
      {!product.isOriginal && (
        <div className={styles.qtyGroup}>
          <label className={styles.fieldLabel}>Quantity</label>
          <div className={styles.qty}>
            <button
              type="button"
              onClick={() => setQty(Math.max(1, qty - 1))}
              className={styles.qtyBtn}
              aria-label="Decrease quantity"
            >−</button>
            <span className={styles.qtyNum}>{qty}</span>
            <button
              type="button"
              onClick={() => setQty(qty + 1)}
              className={styles.qtyBtn}
              aria-label="Increase quantity"
            >+</button>
          </div>
        </div>
      )}

      {/* Price Display */}
      <div className={styles.priceDisplay}>
        <span className={styles.priceLabel}>Investment Total</span>
        <span className="price">${totalPrice.toFixed(2)}</span>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={handleAddToCart}
        className={`btn btn--primary btn--full btn--lg ${styles.addBtn}`}
        disabled={adding || (!product.isOriginal && sizes.length > 0 && !selectedSize)}
      >
        {adding ? (
          <>
            <svg className={styles.checkIcon} width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
            Added to Collector Cart!
          </>
        ) : product.isOriginal ? 'Acquire Original Painting' : 'Add to Cart'}
      </button>

      {product.isOriginal && (
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#8C867A', marginTop: '0.75rem' }}>
          Questions about this original piece? <a href={`/contact?subject=Question regarding ${encodeURIComponent(product.title)}`} style={{ color: '#8B4A34', textDecoration: 'underline' }}>Speak with Elena</a>
        </p>
      )}
    </div>
  )
}

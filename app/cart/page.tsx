'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/cart-store'
import styles from './page.module.css'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCartStore()
  const [mounted, setMounted] = useState(false)
  const [note, setNote] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={styles.page}>
        <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
          <p>Loading cart...</p>
        </div>
      </div>
    )
  }

  const sub = subtotal()
  const freeShippingThreshold = 75
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - sub)
  const shipping = sub >= freeShippingThreshold ? 0 : 8.95
  const total = sub + shipping

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className="container container--narrow text-center" style={{ padding: '8rem 1rem' }}>
          <div className={styles.emptyIcon}>🛍️</div>
          <h1 style={{ marginBottom: '1rem' }}>Your Shopping Bag is Empty</h1>
          <p style={{ color: 'var(--color-ink-muted)', marginBottom: '2rem', maxWidth: '440px', margin: '0 auto 2rem' }}>
            Looking for an original piece or museum print to elevate your space? Explore our current studio catalog and archival collection.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/shop" className="btn btn--primary btn--lg">
              Explore All Artworks
            </Link>
            <Link href="/collections/originals" className="btn btn--secondary btn--lg">
              View Originals
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1>Shopping Bag</h1>
          <p className={styles.itemCount}>
            {items.reduce((acc, i) => acc + i.quantity, 0)} {items.length === 1 ? 'item' : 'items'}
          </p>
        </header>

        {/* Free shipping progress bar */}
        <div className={styles.shippingBar}>
          {amountToFreeShipping > 0 ? (
            <p>
              Add <strong>${amountToFreeShipping.toFixed(2)}</strong> more to qualify for <strong>FREE standard shipping</strong>!
            </p>
          ) : (
            <p className={styles.freeUnlocked}>
              🎉 Congratulations! You have qualified for <strong>FREE shipping</strong>.
            </p>
          )}
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${Math.min(100, (sub / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>

        <div className={styles.layout}>
          {/* Items List */}
          <div className={styles.itemsList}>
            <div className={styles.tableHeader}>
              <span>Artwork</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            {items.map((item) => (
              <div key={item.id} className={styles.itemRow}>
                <div className={styles.itemDetails}>
                  <div className={styles.itemImage}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="96px"
                    />
                  </div>
                  <div>
                    <Link href={`/shop/${item.slug}`} className={styles.itemTitle}>
                      {item.title}
                    </Link>
                    {item.size && <p className={styles.itemSize}>Size: {item.size}</p>}
                    <button
                      onClick={() => removeItem(item.id)}
                      className={styles.removeBtn}
                      aria-label={`Remove ${item.title}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className={styles.itemPrice}>
                  ${item.price.toFixed(2)}
                </div>

                <div className={styles.itemQuantity}>
                  <div className={styles.qtyControl}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.itemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div className={styles.cartActions}>
              <button onClick={clearCart} className={styles.clearBtn}>
                Clear Cart
              </button>
              <Link href="/shop" className={styles.continueLink}>
                ← Continue Shopping
              </Link>
            </div>

            {/* Note to artist */}
            <div className={styles.noteSection}>
              <label htmlFor="artist-note" className={styles.noteLabel}>
                Add a gift message or special instructions (Optional)
              </label>
              <textarea
                id="artist-note"
                rows={3}
                className={styles.noteInput}
                placeholder="E.g. Please sign on the reverse side, or include a gift note to Sarah..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          {/* Order Summary Box */}
          <aside className={styles.summaryBox}>
            <h2 className={styles.summaryTitle}>Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${sub.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Estimated Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Estimated Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link href="/checkout" className="btn btn--primary btn--full btn--lg">
              Proceed to Checkout
            </Link>

            <div className={styles.guarantees}>
              <p>🔒 256-Bit Encrypted Checkout</p>
              <p>🚚 Archival protective packaging</p>
              <p>↩️ 30-day money-back guarantee on prints</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

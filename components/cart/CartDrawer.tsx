'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/lib/cart-store'
import styles from './CartDrawer.module.css'

export default function CartDrawer() {
  const pathname = usePathname()
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCartStore()

  if (pathname?.startsWith('/admin')) {
    return null
  }

  const total = subtotal()

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className={styles.backdrop} onClick={closeCart} aria-hidden="true" />
      )}

      {/* Drawer */}
      <div
        className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Your Cart</h2>
          <span className={styles.count}>{items.reduce((s, i) => s + i.quantity, 0)} items</span>
          <button
            className={styles.closeBtn}
            onClick={closeCart}
            aria-label="Close cart"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.25" viewBox="0 0 24 24">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <p className={styles.emptyText}>Your cart is empty</p>
              <Link href="/shop" className="btn btn--primary" onClick={closeCart}>
                Browse Shop
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemImage}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="88px"
                  />
                </div>
                <div className={styles.itemInfo}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  {item.size && (
                    <p className={styles.itemSize}>{item.size}</p>
                  )}
                  {item.frame && (
                    <p className={styles.itemSize} style={{ color: '#8B4A34', fontSize: '0.75rem' }}>
                      Frame: {item.frame}
                    </p>
                  )}
                  <p className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className={styles.itemActions}>
                  <div className={styles.qty}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className={styles.qtyBtn}
                    >−</button>
                    <span className={styles.qtyNum}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                      className={styles.qtyBtn}
                    >+</button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    className={styles.removeBtn}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                      <polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14H6L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotalRow}>
              <span>Subtotal</span>
              <span className={styles.subtotalAmount}>${total.toFixed(2)}</span>
            </div>
            <p className={styles.shippingNote}>Shipping & taxes calculated at checkout</p>
            <Link
              href="/checkout"
              className={`btn btn--primary btn--full btn--lg ${styles.checkoutBtn}`}
              onClick={closeCart}
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/cart"
              className={`btn btn--ghost btn--full ${styles.viewCartBtn}`}
              onClick={closeCart}
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'
import styles from './GiftCardSection.module.css'

const DENOMINATIONS = [
  { label: '$25.00', value: 25 },
  { label: '$45.00', value: 45 },
  { label: '$75.00', value: 75 },
  { label: '$100.00', value: 100 },
  { label: '$150.00', value: 150 },
  { label: '$200.00', value: 200 },
]

export default function GiftCardSection() {
  const [denomination, setDenomination] = useState(45)
  const [quantity, setQuantity] = useState(1)
  const [isGift, setIsGift] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem({
      productId: `gift-card-${denomination}`,
      slug: 'elena-moore-gift-card',
      title: `Elena Moore Art Gift Card - $${denomination}.00`,
      price: denomination,
      quantity: quantity,
      size: `$${denomination}.00`,
      image: '/hero.jpg',
    })
    setTimeout(() => setIsAdding(false), 800)
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Not sure what print or painting to gift your loved one? Consider a gift card!
        </h2>

        <div className={styles.price}>
          ${denomination.toFixed(2)} USD
        </div>

        <div className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="denomination-select" className={styles.label}>
              Denominations
            </label>
            <div className={styles.selectWrap}>
              <select
                id="denomination-select"
                className={styles.select}
                value={denomination}
                onChange={(e) => setDenomination(Number(e.target.value))}
              >
                {DENOMINATIONS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Quantity</label>
            <div className={styles.stepper}>
              <button
                type="button"
                className={styles.stepBtn}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className={styles.stepValue}>{quantity}</span>
              <button
                type="button"
                className={styles.stepBtn}
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={isGift}
              onChange={(e) => setIsGift(e.target.checked)}
              className={styles.checkbox}
            />
            <span>I want to send this as a gift</span>
          </label>

          <button
            type="button"
            className={styles.addBtn}
            onClick={handleAddToCart}
          >
            {isAdding ? 'Added to Cart!' : 'Add to cart'}
          </button>

          <Link href="/shop" className={styles.viewDetails}>
            View full details →
          </Link>
        </div>
      </div>
    </section>
  )
}

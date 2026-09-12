'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

interface OrderItem {
  id: string
  title: string
  price: number
  quantity: number
  size?: string | null
}

interface Order {
  id: string
  guestEmail: string | null
  subtotal: number
  shipping: number
  total: number
  status: string
  stripePaymentId: string | null
  shippingAddress: string | null
  createdAt: string
  items: OrderItem[]
}

export default function AccountPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<Order[] | null>(null)
  const [searched, setSearched] = useState(false)

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(email)}`)
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders || [])
      } else {
        setOrders([])
      }
    } catch {
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container container--narrow text-center">
          <span className="badge badge--sand">Collector Portal</span>
          <h1 className={styles.title}>Your Collector Account</h1>
          <p className={styles.subtitle}>
            Track order status, manage your Print Club subscription, and view certificates of authenticity.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container container--narrow">
          {/* Order Lookup Form */}
          <div className={styles.lookupCard}>
            <h2 className={styles.cardTitle}>Find Your Orders</h2>
            <p className={styles.cardDesc}>
              Enter the email address used during checkout to view recent artwork orders and tracking numbers.
            </p>
            <form onSubmit={handleLookup} className={styles.form}>
              <input
                type="email"
                className={`input ${styles.input}`}
                placeholder="collector@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn--primary" disabled={loading}>
                {loading ? 'Searching...' : 'Lookup Orders'}
              </button>
            </form>
          </div>

          {/* Results */}
          {searched && (
            <div className={styles.results}>
              <h3 className={styles.resultsTitle}>
                Orders for <em>{email}</em>
              </h3>

              {orders && orders.length > 0 ? (
                <div className={styles.ordersList}>
                  {orders.map((ord) => (
                    <div key={ord.id} className={styles.orderCard}>
                      <div className={styles.orderHeader}>
                        <div>
                          <p className={styles.orderId}>Order #{ord.id.slice(-8).toUpperCase()}</p>
                          <p className={styles.orderDate}>
                            Placed on {new Date(ord.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                          </p>
                        </div>
                        <div className={styles.statusBadge}>
                          <span className={`badge ${ord.status === 'paid' ? 'badge--sky' : 'badge--sand'}`}>
                            {ord.status.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className={styles.orderItems}>
                        {ord.items.map((item) => (
                          <div key={item.id} className={styles.itemRow}>
                            <div>
                              <span className={styles.itemTitle}>{item.title}</span>
                              {item.size && <span className={styles.itemSize}>({item.size})</span>}
                            </div>
                            <span className={styles.itemMeta}>
                              Qty {item.quantity} × ${item.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className={styles.orderFooter}>
                        <div className={styles.shippingNotice}>
                          <span>🚚 Status: Hand-packaged in archival sleeve</span>
                        </div>
                        <div className={styles.orderTotal}>
                          Total: <strong>${ord.total.toFixed(2)}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noOrders}>
                  <p>No orders found for this email address.</p>
                  <p className="caption">Try searching with the email you entered during Stripe checkout.</p>
                </div>
              )}
            </div>
          )}

          {/* Membership Card */}
          <div className={styles.clubCard}>
            <div className={styles.clubInfo}>
              <span className="badge badge--sky">Print Club</span>
              <h3>Monthly Collector Membership</h3>
              <p>
                Members receive a limited-edition 8×10 archival print shipped every month, plus 15% off all shop purchases.
              </p>
            </div>
            <Link href="/subscriptions" className="btn btn--secondary">
              View Club Details
            </Link>
          </div>

          {/* Support */}
          <div className={styles.supportCard}>
            <h3>Questions About Your Art?</h3>
            <p>
              Need framing advice, custom sizing, or have questions about hanging your original oil painting?
            </p>
            <Link href="/contact" className="btn btn--ghost">
              Contact Elena Moore →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

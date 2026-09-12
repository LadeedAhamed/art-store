'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.css'

interface OrderItem {
  id: string
  title: string
  price: number
  quantity: number
  size?: string | null
  frame?: string | null
}

interface Order {
  id: string
  guestEmail: string | null
  subtotal: number
  shipping: number
  total: number
  status: string // pending | paid | shipped | delivered | cancelled
  trackingNumber: string | null
  shippingAddress: string | null
  createdAt: string
  updatedAt: string
  items: OrderItem[]
}

function getCarrierInfo(trackingNumber: string): { carrier: string; url: string } {
  const tn = trackingNumber.trim()
  if (/^1Z[0-9A-Z]{16}$/i.test(tn)) {
    return { carrier: 'UPS', url: `https://www.ups.com/track?tracknum=${tn}` }
  }
  if (/^(94|93|92|91|95)[0-9]{20}$/.test(tn) || /^[0-9]{20,22}$/.test(tn)) {
    return { carrier: 'USPS', url: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tn}` }
  }
  if (/^[0-9]{12,15}$/.test(tn)) {
    return { carrier: 'FedEx', url: `https://www.fedex.com/fedextrack/?trknbr=${tn}` }
  }
  return { carrier: 'Art Courier', url: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tn}` }
}

function TrackContent() {
  const searchParams = useSearchParams()
  const initialOrderId = searchParams.get('orderId') || searchParams.get('id') || searchParams.get('r') || ''
  const initialTracking = searchParams.get('tracking') || ''

  const [query, setQuery] = useState(initialOrderId || initialTracking || '')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  const fetchOrder = async (searchVal: string) => {
    if (!searchVal.trim()) return
    setLoading(true)
    setError('')
    setSearched(true)

    try {
      let url = `/api/orders?orderId=${encodeURIComponent(searchVal.trim())}`
      if (searchVal.includes('@')) {
        url = `/api/orders?email=${encodeURIComponent(searchVal.trim())}`
      } else if (searchVal.startsWith('1Z') || searchVal.length >= 12) {
        url = `/api/orders?tracking=${encodeURIComponent(searchVal.trim())}`
      }

      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        if (data.order) {
          setOrder(data.order)
        } else if (data.orders && data.orders.length > 0) {
          setOrder(data.orders[0])
        } else {
          setOrder(null)
          setError('No matching artwork order was found. Please check your Order ID or tracking number.')
        }
      } else {
        setOrder(null)
        setError('Failed to retrieve order records. Please try again.')
      }
    } catch {
      setOrder(null)
      setError('An unexpected network error occurred.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialOrderId || initialTracking) {
      fetchOrder(initialOrderId || initialTracking)
    }
  }, [initialOrderId, initialTracking])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchOrder(query)
  }

  // Calculate Status Step (1 to 4)
  const getStepIndex = (status: string, hasTracking: boolean) => {
    if (status === 'delivered') return 4
    if (status === 'shipped' || hasTracking) return 3
    if (status === 'paid') return 2
    return 1 // pending
  }

  const currentStep = order ? getStepIndex(order.status, Boolean(order.trackingNumber)) : 1

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container container--narrow text-center">
          <span className="badge badge--sand">Elena Moore Studio</span>
          <h1 className={styles.title}>Artwork Shipment & Delivery Tracker</h1>
          <p className={styles.subtitle}>
            Enter your Order ID (#), Tracking Number, or email address to view live fulfillment milestones.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container container--narrow">
          {/* Lookup Input Card */}
          <div className={styles.searchCard}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                type="text"
                className={`input ${styles.input}`}
                placeholder="e.g. Order # or Tracking Number (e.g. 1Z... or 9400...)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
              <button type="submit" className="btn btn--primary" disabled={loading}>
                {loading ? 'Locating Package...' : 'Track Artwork →'}
              </button>
            </form>
          </div>

          {/* Results State */}
          {error && (
            <div className={styles.errorBanner}>
              <p>⚠️ {error}</p>
              <p className="caption" style={{ marginTop: '0.25rem' }}>
                Need assistance locating your purchase? <Link href="/contact" style={{ textDecoration: 'underline' }}>Contact Studio Support</Link>.
              </p>
            </div>
          )}

          {order && (
            <div className={styles.orderContainer}>
              {/* Order Meta Header */}
              <div className={styles.orderSummaryCard}>
                <div className={styles.orderHeaderTop}>
                  <div>
                    <div className={styles.orderIdText}>
                      Order #{order.id.slice(-8).toUpperCase()}
                    </div>
                    <div className={styles.orderDateText}>
                      Acquisition Date: {new Date(order.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
                    </div>
                  </div>
                  <div className={styles.statusPillBadge}>
                    <span
                      className={`badge ${
                        order.status === 'delivered'
                          ? 'badge--terracotta'
                          : order.status === 'shipped'
                          ? 'badge--sky'
                          : 'badge--sand'
                      }`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* 4-Step Visual Shipment Timeline */}
                <div className={styles.stepperWrap}>
                  <div className={styles.stepperBar}>
                    <div
                      className={styles.stepperFill}
                      style={{
                        width:
                          currentStep === 1
                            ? '12%'
                            : currentStep === 2
                            ? '40%'
                            : currentStep === 3
                            ? '75%'
                            : '100%',
                      }}
                    />
                  </div>

                  <div className={styles.stepNodes}>
                    {/* Step 1 */}
                    <div className={`${styles.stepNode} ${currentStep >= 1 ? styles.stepCompleted : ''}`}>
                      <div className={styles.nodeCircle}>1</div>
                      <div className={styles.nodeLabel}>Order Confirmed</div>
                      <div className={styles.nodeSub}>Payment Verified</div>
                    </div>

                    {/* Step 2 */}
                    <div className={`${styles.stepNode} ${currentStep >= 2 ? styles.stepCompleted : ''}`}>
                      <div className={styles.nodeCircle}>2</div>
                      <div className={styles.nodeLabel}>Studio Packaging</div>
                      <div className={styles.nodeSub}>Archival Wrapping & COA</div>
                    </div>

                    {/* Step 3 */}
                    <div className={`${styles.stepNode} ${currentStep >= 3 ? styles.stepCompleted : ''}`}>
                      <div className={styles.nodeCircle}>3</div>
                      <div className={styles.nodeLabel}>In Transit</div>
                      <div className={styles.nodeSub}>Carrier Dispatched</div>
                    </div>

                    {/* Step 4 */}
                    <div className={`${styles.stepNode} ${currentStep >= 4 ? styles.stepCompleted : ''}`}>
                      <div className={styles.nodeCircle}>4</div>
                      <div className={styles.nodeLabel}>Delivered</div>
                      <div className={styles.nodeSub}>Received by Collector</div>
                    </div>
                  </div>
                </div>

                {/* Live Carrier Tracking Callout Box */}
                {order.trackingNumber ? (
                  <div className={styles.carrierBox}>
                    <div>
                      <span className={styles.carrierLabel}>
                        {getCarrierInfo(order.trackingNumber).carrier} Live Tracking
                      </span>
                      <div className={styles.carrierNumber}>{order.trackingNumber}</div>
                    </div>
                    <a
                      href={getCarrierInfo(order.trackingNumber).url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--primary btn--sm"
                    >
                      Open Carrier Status ↗
                    </a>
                  </div>
                ) : (
                  <div className={styles.awaitingBox}>
                    <span>📦</span>
                    <div>
                      <strong>Hand-Package in Studio Progress</strong>
                      <p style={{ margin: 0, fontSize: '0.8125rem', color: '#78716C' }}>
                        Your artwork is currently undergoing custom archival packaging and quality inspection. Courier tracking numbers are issued within 24–48 hours of dispatch.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Two Column Grid: Package Contents & Destination */}
              <div className={styles.splitGrid}>
                {/* Left: Package Items */}
                <div className={styles.cardPanel}>
                  <h3 className={styles.cardPanelTitle}>Artworks in this Package</h3>
                  <div className={styles.itemsList}>
                    {order.items.map((it) => (
                      <div key={it.id} className={styles.itemRow}>
                        <div>
                          <strong className={styles.itemTitle}>{it.title}</strong>
                          {it.size && <div className={styles.itemMeta}>Size: {it.size} in</div>}
                          {it.frame && <div className={styles.itemMeta} style={{ color: '#8B4A34' }}>Framing: {it.frame}</div>}
                        </div>
                        <div className={styles.itemPriceText}>
                          Qty {it.quantity} • ${(it.price * it.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.totalRow}>
                    <span>Total Investment</span>
                    <strong className={styles.grandPrice}>${order.total.toFixed(2)}</strong>
                  </div>
                </div>

                {/* Right: Shipping Destination & Art Care */}
                <div className={styles.cardPanel}>
                  <h3 className={styles.cardPanelTitle}>Delivery Destination</h3>
                  <p className={styles.destText}>
                    {order.shippingAddress || 'Address on record with Stripe checkout'}
                  </p>

                  <hr style={{ border: 'none', borderTop: '1px solid #E8E4DC', margin: '1.25rem 0' }} />

                  <h4 style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8C867A', marginBottom: '0.4rem' }}>
                    Collector Art Care Notice
                  </h4>
                  <p style={{ fontSize: '0.8125rem', color: '#57534E', lineHeight: 1.6 }}>
                    Original canvases and fine art prints should be unpacked on a clean, dry surface. Avoid hanging in direct sunlight or areas of excessive humidity.
                  </p>

                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="btn btn--secondary btn--sm"
                    >
                      🖨️ Print Receipt
                    </button>
                    <Link href="/contact" className="btn btn--ghost btn--sm">
                      Contact Studio
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="container text-center" style={{ padding: '6rem 0' }}>Loading tracker...</div>}>
      <TrackContent />
    </Suspense>
  )
}

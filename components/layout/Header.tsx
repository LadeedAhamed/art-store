'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/lib/cart-store'
import styles from './Header.module.css'

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/collections/originals', label: 'Originals' },
  { href: '/orders/track', label: 'Track Order' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [companyName, setCompanyName] = useState('Elena Moore')
  const [brandSubtitle, setBrandSubtitle] = useState('Oil Paintings')
  const [announcement, setAnnouncement] = useState(
    'Free standard domestic shipping on orders over $75 • Worldwide archival crating'
  )
  const { items, openCart } = useCartStore()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  if (pathname?.startsWith('/admin')) {
    return null
  }

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings) {
          if (data.settings.topBarText) setAnnouncement(data.settings.topBarText)
          if (data.settings.companyName) setCompanyName(data.settings.companyName)
          if (data.settings.brandSubtitle) setBrandSubtitle(data.settings.brandSubtitle)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <>
      {/* Top Utility Banner */}
      <div className={styles.topBar}>
        <span>{announcement}</span>
      </div>

      <header className={styles.header}>
        <div className={styles.inner}>
          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>

          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoName}>{companyName}</span>
            <span className={styles.logoSub}>{brandSubtitle}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav} aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <Link href="/shop" aria-label="Search" className={styles.iconBtn}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </Link>
            <Link href="/account" aria-label="Account" className={styles.iconBtn}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
            <button
              aria-label={`Cart (${itemCount} items)`}
              className={styles.cartBtn}
              onClick={openCart}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
          <nav>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className={styles.mobileMenuFooter}>
            <Link href="/account" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
              Account
            </Link>
            <Link href="/cart" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
              Cart {itemCount > 0 && `(${itemCount})`}
            </Link>
          </div>
        </div>

        {menuOpen && (
          <div className={styles.mobileOverlay} onClick={() => setMenuOpen(false)} />
        )}
      </header>
    </>
  )
}

'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/lib/cart-store'
import styles from './Header.module.css'

interface SubItem {
  label: string
  href: string
}

interface NavItem {
  label: string
  href: string
  dropdown?: SubItem[]
}

const navItems: NavItem[] = [
  { href: '/shop?collection=mini-prints', label: '200+ Mini Prints' },
  { href: '/', label: 'Home' },
  { href: '/collections/originals', label: 'Originals' },
  { href: '/shop?collection=stickers', label: 'Stickers' },
  {
    href: '/collections/prints',
    label: 'Prints',
    dropdown: [
      { label: 'All Prints', href: '/collections/prints' },
      { label: 'Cocktails & Drinks', href: '/collections/cocktails' },
      { label: 'Food & Dining Still Life', href: '/collections/food-drink' },
      { label: 'Fruit & Still Life', href: '/collections/still-life' },
      { label: 'Botanicals & Flora', href: '/collections/botanicals' },
      { label: '200+ Mini Prints', href: '/shop?collection=mini-prints' },
    ],
  },
  { href: '/contact?type=commission', label: 'Commissions' },
  {
    href: '/subscriptions',
    label: 'Print Club',
    dropdown: [
      { label: 'About Print Club', href: '/subscriptions' },
      { label: 'Join Monthly Subscription ($28/mo)', href: '/subscriptions' },
      { label: 'Past Print Club Releases', href: '/shop?collection=print-club' },
    ],
  },
  { href: '/shop?collection=homewares', label: 'Apparel & Homewares' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({})
  const [companyName, setCompanyName] = useState('Elena Moore')
  const [announcement, setAnnouncement] = useState('200+ Mini Prints Available — Free Worldwide Shipping on Orders Over $75')
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
        }
      })
      .catch(() => {})
  }, [])

  const toggleMobileSub = (label: string) => {
    setMobileExpanded((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <>
      {/* Top Utility Banner */}
      <div className={styles.topBar}>
        <Link href="/shop?collection=mini-prints" className={styles.topBarLink}>
          {announcement}
        </Link>
      </div>

      <header className={styles.header}>
        {/* Tier 1: Search | Centered Logo | Actions */}
        <div className={styles.mainRow}>
          <div className={styles.leftCol}>
            {/* Hamburger on Mobile */}
            <button
              className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span /><span /><span />
            </button>
            <Link href="/shop" aria-label="Search" className={styles.iconBtn}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </Link>
          </div>

          {/* Centered Brand Title */}
          <Link href="/" className={styles.brandTitle}>
            {companyName}
          </Link>

          {/* Right Actions */}
          <div className={styles.rightCol}>
            <div className={styles.currencySelector}>
              <span>USD $</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
            </div>
            <Link href="/account" aria-label="Account" className={styles.iconBtn}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
            <button
              aria-label={`Cart (${itemCount} items)`}
              className={styles.cartBtn}
              onClick={openCart}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
            </button>
          </div>
        </div>

        {/* Tier 2: Centered Sub-Navigation */}
        <nav className={styles.subNav} aria-label="Main navigation">
          {navItems.map((item) => {
            const isHome = item.href === '/'
            const isBaseActive = isHome
              ? pathname === '/'
              : pathname === item.href || pathname?.startsWith(item.href.split('?')[0])
            const hasDropdown = !!item.dropdown

            return (
              <div
                key={item.label}
                className={styles.navItemWrapper}
                onMouseEnter={() => hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${isBaseActive ? styles.navLinkActive : ''}`}
                >
                  <span>{item.label}</span>
                  {hasDropdown && (
                    <svg className={styles.chevronIcon} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {hasDropdown && activeDropdown === item.label && (
                  <div className={styles.dropdownMenu}>
                    {item.dropdown!.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className={styles.dropdownLink}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Mobile Drawer Menu */}
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
          <nav>
            {navItems.map((item) => {
              const hasDropdown = !!item.dropdown
              const isExpanded = mobileExpanded[item.label]

              return (
                <div key={item.label} className={styles.mobileNavItem}>
                  <div className={styles.mobileLinkRow}>
                    <Link
                      href={item.href}
                      className={styles.mobileNavLink}
                      onClick={() => !hasDropdown && setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {hasDropdown && (
                      <button
                        className={styles.mobileSubToggle}
                        onClick={() => toggleMobileSub(item.label)}
                        aria-label="Toggle sub-menu"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {hasDropdown && isExpanded && (
                    <div className={styles.mobileSubList}>
                      {item.dropdown!.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className={styles.mobileSubLink}
                          onClick={() => setMenuOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
          <div className={styles.mobileMenuFooter}>
            <Link href="/account" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
              Account
            </Link>
            <button
              className={styles.mobileNavLink}
              style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer' }}
              onClick={() => {
                setMenuOpen(false)
                openCart()
              }}
            >
              Cart {itemCount > 0 && `(${itemCount})`}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className={styles.mobileOverlay} onClick={() => setMenuOpen(false)} />
        )}
      </header>
    </>
  )
}

'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { toast } from '@/components/ui/Toaster'
import styles from './page.module.css'

// ==============================================================================
// Minimalist Vector Icons (Zero Emojis)
// ==============================================================================
function IconOverview({ className }: { className?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  )
}

function IconInventory({ className }: { className?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

function IconPlus({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function IconCms({ className }: { className?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  )
}

function IconOrders({ className }: { className?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

function IconInquiries({ className }: { className?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}

function IconSync({ className }: { className?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  )
}

function IconLogout({ className }: { className?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function IconTrash({ className }: { className?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  )
}

function IconUpload({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}

function IconDollar({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  )
}

function IconShipment({ className }: { className?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

function IconDoc({ className }: { className?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function IconPrinter({ className }: { className?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  )
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function IconEdit({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

interface Product {
  id: string
  slug: string
  title: string
  price: number
  category: string
  collection: string | null
  stock: number
  isOriginal: boolean
  isFeatured: boolean
  isActive: boolean
  medium: string | null
  dimensions: string | null
  images: string
  description?: string | null
  sizes?: string | null
  year?: number | null
  createdAt: string
}

interface OrderItem {
  id: string
  title: string
  quantity: number
  price: number
  size: string | null
}

interface Order {
  id: string
  guestEmail: string | null
  total: number
  status: string
  trackingNumber: string | null
  shippingAddress: string | null
  createdAt: string
  items: OrderItem[]
}

interface Inquiry {
  id: string
  name: string
  email: string
  subject: string
  message: string
  type: string
  read: boolean
  createdAt: string
}

interface SiteSettings {
  // Company & Brand Identity
  companyName: string
  brandSubtitle: string
  ownerName: string
  brandTagline: string
  copyrightText: string

  // Contact & Studio Location
  contactEmail: string
  supportEmail: string
  studioPhone: string
  studioLocation: string
  studioAddress: string
  studioHours: string

  // Social Channels
  instagramUrl: string
  pinterestUrl: string
  twitterUrl: string
  facebookUrl: string
  youtubeUrl: string

  // Banner & Storefront Hero
  topBarText: string
  heroImage: string
  heroLabel: string
  heroTitle: string
  heroDesc: string
  marqueeText: string

  // Policies & Notices
  commissionNotice: string
  wholesaleNotice: string

  // About & Bio Story
  aboutTagline: string
  aboutBio: string
  exhibitions: string
  press: string
}

type AdminTab = 'overview' | 'catalog' | 'new_artwork' | 'cms_customizer' | 'orders' | 'inquiries'

export default function SuperAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')

  const [searchQuery, setSearchQuery] = useState('')
  const [catalogFilter, setCatalogFilter] = useState<'all' | 'original' | 'print' | 'draft' | 'sold_out' | 'in_stock'>('all')
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'pending' | 'paid' | 'shipped' | 'delivered'>('all')
  const [inquiryTypeFilter, setInquiryTypeFilter] = useState<'all' | 'commission' | 'general'>('all')

  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [settings, setSettings] = useState<SiteSettings>({
    companyName: 'Elena Moore',
    brandSubtitle: 'Oil Paintings',
    ownerName: 'Elena Moore',
    brandTagline: 'Oil painter capturing quiet domestic moments through still life depictions of food and botanicals.',
    copyrightText: '© 2026 Elena Moore Art. All rights reserved.',
    contactEmail: 'hello@elenamoore.art',
    supportEmail: 'orders@elenamoore.art',
    studioPhone: '+1 (845) 555-0192',
    studioLocation: 'Kingston, New York',
    studioAddress: '42 Atelier Way, Studio 3B, Kingston, NY 12401',
    studioHours: 'Monday–Friday, 9am–5pm EST • Replies within 2–3 business days',
    instagramUrl: 'https://instagram.com',
    pinterestUrl: 'https://pinterest.com',
    twitterUrl: 'https://twitter.com',
    facebookUrl: 'https://facebook.com',
    youtubeUrl: 'https://youtube.com',
    topBarText: 'Free standard domestic shipping on orders over $75 • Worldwide archival crating',
    heroImage: '/hero.jpg',
    heroLabel: 'Original Oil Paintings & Prints',
    heroTitle: 'Fine Art for Timeless Interiors',
    heroDesc: 'Capturing light, texture, and quiet atmosphere on linen and canvas.',
    marqueeText: 'Free shipping over $75 • Archival-quality giclée prints • Signed originals • Collector Club memberships • Private commissions available',
    commissionNotice: 'I take on a limited number of private commissions each year. If you would like a bespoke original painting or custom dimensions, please reach out with details.',
    wholesaleNotice: 'I partner with select galleries, interior designers, and curated spaces for original works and archival prints.',
    aboutTagline: 'I paint the interplay of light, atmosphere, and form — quiet moments captured on linen.',
    aboutBio: "I am an oil painter working from my studio in upstate New York, exploring the meditative beauty of natural light, textured brushwork, and timeless compositions. Every original piece is rendered on fine Belgian linen with museum-grade pigments.",
    exhibitions: 'Hudson Valley Art Fair 2024 • Contemporary Oil Salon 2024 • Catskill Atelier Gallery 2023',
    press: 'Architectural Digest, Elle Decor, Studio International',
  })

  const [isSyncing, setIsSyncing] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingBanner, setUploadingBanner] = useState(false)
  const [savingSettings, setSavingSettings] = useState(false)
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({})
  const [selectedCoaOrder, setSelectedCoaOrder] = useState<Order | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'print',
    collection: 'still-life',
    sizes: '5x7, 8x10, 11x14',
    medium: 'Archival giclée on 310gsm cotton rag',
    dimensions: '8 × 10 inches',
    year: '2026',
    stock: '50',
    imageUrl: '/hero.jpg',
    description: '',
    isOriginal: false,
    isFeatured: true,
    isActive: true,
  })

  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [savingEdit, setSavingEdit] = useState(false)
  const [uploadingEditImage, setUploadingEditImage] = useState(false)
  const [editFormData, setEditFormData] = useState({
    title: '',
    slug: '',
    price: '',
    category: 'print',
    collection: 'still-life',
    sizes: '5x7, 8x10, 11x14',
    medium: 'Archival giclée on 310gsm cotton rag',
    dimensions: '8 × 10 inches',
    year: '2026',
    stock: '50',
    imageUrl: '/hero.jpg',
    description: '',
    isOriginal: false,
    isFeatured: true,
    isActive: true,
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/auth')
      const data = await res.json()
      setIsAuthenticated(Boolean(data.authenticated))
      if (data.authenticated) {
        syncAllData()
      }
    } catch {
      setIsAuthenticated(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return

    setAuthLoading(true)
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setIsAuthenticated(true)
        toast.success('Admin Console Unlocked')
        syncAllData()
      } else {
        toast.error(data.error || 'Authentication Failed: Invalid Key')
      }
    } catch {
      toast.error('Connection error during authentication')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      setIsAuthenticated(false)
      setPassword('')
      toast.info('Session Terminated')
    } catch {
      setIsAuthenticated(false)
    }
  }

  const syncAllData = async () => {
    setIsSyncing(true)
    try {
      await Promise.all([
        fetchProducts(),
        fetchOrders(),
        fetchInquiries(),
        fetchSettings(),
      ])
      toast.success('Database Synchronized')
    } catch {
      toast.error('Sync failed')
    } finally {
      setIsSyncing(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products')
      const data = await res.json()
      if (data.products) setProducts(data.products)
    } catch {
      // ignore
    }
  }

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders')
      const data = await res.json()
      if (data.orders) {
        setOrders(data.orders)
        const initialTracking: Record<string, string> = {}
        data.orders.forEach((o: Order) => {
          if (o.trackingNumber) initialTracking[o.id] = o.trackingNumber
        })
        setTrackingInputs(initialTracking)
      }
    } catch {
      // ignore
    }
  }

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries')
      const data = await res.json()
      if (data.inquiries) setInquiries(data.inquiries)
    } catch {
      // ignore
    }
  }

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings')
      const data = await res.json()
      if (data.settings) setSettings(data.settings)
    } catch {
      // ignore
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const data = new FormData()
      data.append('file', file)
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: data,
      })
      const result = await res.json()
      if (res.ok && result.url) {
        setFormData((prev) => ({ ...prev, imageUrl: result.url }))
        toast.success('Artwork asset uploaded successfully')
      } else {
        toast.error(result.error || 'Upload failed')
      }
    } catch {
      toast.error('Failed to upload image')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingBanner(true)
    try {
      const data = new FormData()
      data.append('file', file)
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: data,
      })
      const result = await res.json()
      if (res.ok && result.url) {
        setSettings((prev) => ({ ...prev, heroImage: result.url }))
        toast.success('Hero banner uploaded. Click "Save & Publish" to apply.')
      } else {
        toast.error(result.error || 'Banner upload failed')
      }
    } catch {
      toast.error('Banner upload failed')
    } finally {
      setUploadingBanner(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.price) {
      toast.error('Title and Price are required')
      return
    }

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          images: [formData.imageUrl || '/hero.jpg'],
          sizes: formData.sizes.split(',').map((s) => s.trim()),
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        toast.success(`Artwork "${formData.title}" published`)
        fetchProducts()
        setActiveTab('catalog')
        setFormData({
          title: '',
          price: '',
          category: 'print',
          collection: 'food-drink',
          sizes: '5x7, 8x10, 11x14',
          medium: 'Archival giclée on 310gsm cotton rag',
          dimensions: '8 × 10 inches',
          year: '2026',
          stock: '50',
          imageUrl: '/hero.jpg',
          description: '',
          isOriginal: false,
          isFeatured: false,
          isActive: true,
        })
      } else {
        toast.error(data.error || 'Failed to save artwork')
      }
    } catch {
      toast.error('Network error while saving artwork')
    }
  }

  const toggleProductActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isActive: !current }),
      })
      if (res.ok) {
        toast.info(current ? 'Moved to Drafts' : 'Artwork Published Live')
        fetchProducts()
      }
    } catch {
      toast.error('Failed to update status')
    }
  }

  const handleDeleteProduct = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return

    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (res.ok && data.success) {
        toast.success(`Removed "${title}" from catalog`)
        setProducts((prev) => prev.filter((p) => p.id !== id))
      } else {
        toast.error(data.error || 'Failed to delete artwork')
      }
    } catch {
      toast.error('Network error while deleting artwork')
    }
  }

  const toggleProductSoldOut = async (product: Product) => {
    const isCurrentlySoldOut = product.stock === 0
    const newStock = isCurrentlySoldOut ? (product.isOriginal ? 1 : 50) : 0
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id, stock: newStock }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        toast.success(
          newStock === 0
            ? `Marked "${product.title}" as Sold Out`
            : `Marked "${product.title}" as In Stock (${newStock})`
        )
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, stock: newStock } : p))
        )
      } else {
        toast.error(data.error || 'Failed to update stock status')
      }
    } catch {
      toast.error('Network error updating stock status')
    }
  }

  const handleOpenEdit = (product: Product) => {
    let parsedImage = '/hero.jpg'
    try {
      const imgs = JSON.parse(product.images)
      if (Array.isArray(imgs) && imgs.length > 0) parsedImage = imgs[0]
      else if (typeof product.images === 'string' && product.images) parsedImage = product.images
    } catch {
      if (product.images) parsedImage = product.images
    }

    let parsedSizes = '5x7, 8x10, 11x14'
    try {
      if (product.sizes) {
        const parsed = JSON.parse(product.sizes)
        if (Array.isArray(parsed)) parsedSizes = parsed.join(', ')
        else if (typeof product.sizes === 'string') parsedSizes = product.sizes
      }
    } catch {
      if (product.sizes) parsedSizes = product.sizes
    }

    setEditFormData({
      title: product.title,
      slug: product.slug,
      price: product.price.toString(),
      category: product.category,
      collection: product.collection || 'still-life',
      sizes: parsedSizes,
      medium: product.medium || '',
      dimensions: product.dimensions || '',
      year: product.year ? product.year.toString() : new Date().getFullYear().toString(),
      stock: product.stock.toString(),
      imageUrl: parsedImage,
      description: product.description || '',
      isOriginal: product.isOriginal,
      isFeatured: product.isFeatured,
      isActive: product.isActive,
    })
    setEditingProduct(product)
  }

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement
      setEditFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setEditFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleEditImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingEditImage(true)
    const form = new FormData()
    form.append('file', file)

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: form,
      })
      const data = await res.json()
      if (res.ok && data.url) {
        setEditFormData((prev) => ({ ...prev, imageUrl: data.url }))
        toast.success('Artwork photo updated')
      } else {
        toast.error(data.error || 'Failed to upload artwork photo')
      }
    } catch {
      toast.error('Upload error')
    } finally {
      setUploadingEditImage(false)
    }
  }

  const handleSaveEditProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return
    setSavingEdit(true)

    try {
      const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingProduct.id,
          title: editFormData.title,
          slug: editFormData.slug,
          price: editFormData.price,
          category: editFormData.category,
          collection: editFormData.collection,
          sizes: editFormData.sizes,
          medium: editFormData.medium,
          dimensions: editFormData.dimensions,
          year: editFormData.year,
          stock: editFormData.stock,
          images: [editFormData.imageUrl],
          description: editFormData.description,
          isOriginal: editFormData.isOriginal,
          isFeatured: editFormData.isFeatured,
          isActive: editFormData.isActive,
        }),
      })

      const data = await res.json()
      if (res.ok && data.success && data.product) {
        toast.success(`Updated "${editFormData.title}" successfully`)
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? data.product : p))
        )
        setEditingProduct(null)
      } else {
        toast.error(data.error || 'Failed to update artwork')
      }
    } catch {
      toast.error('Network error while saving artwork edits')
    } finally {
      setSavingEdit(false)
    }
  }

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingSettings(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        toast.success('CMS changes saved successfully')
      } else {
        toast.error('Failed to update CMS settings')
      }
    } catch {
      toast.error('Network error saving settings')
    } finally {
      setSavingSettings(false)
    }
  }

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const tracking = trackingInputs[orderId] || undefined
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status, trackingNumber: tracking }),
      })
      if (res.ok) {
        toast.success(`Order status updated to ${status.toUpperCase()}`)
        fetchOrders()
      }
    } catch {
      toast.error('Failed to update order status')
    }
  }

  const handleSaveTracking = async (orderId: string) => {
    const tracking = trackingInputs[orderId]
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, trackingNumber: tracking }),
      })
      if (res.ok) {
        toast.success('Tracking number saved')
        fetchOrders()
      }
    } catch {
      toast.error('Failed to update tracking')
    }
  }

  const [shippingOrderId, setShippingOrderId] = useState<string | null>(null)
  const handleShiprocketDispatch = async (orderId: string) => {
    setShippingOrderId(orderId)
    try {
      const res = await fetch('/api/admin/shiprocket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        toast.success(data.message || 'Shiprocket dispatch created')
        if (data.labelUrl) {
          window.open(data.labelUrl, '_blank')
        }
        fetchOrders()
      } else {
        toast.error(data.error?.message || data.error || 'Shiprocket dispatch failed')
      }
    } catch {
      toast.error('Network error contacting Shiprocket')
    } finally {
      setShippingOrderId(null)
    }
  }

  const handleToggleInquiryRead = async (id: string, current: boolean) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: !current }),
      })
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, read: !current } : inq))
        )
      }
    } catch {
      toast.error('Failed to update inquiry status')
    }
  }

  const handleDeleteInquiry = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Inquiry removed')
        setInquiries((prev) => prev.filter((inq) => inq.id !== id))
      }
    } catch {
      toast.error('Failed to delete inquiry')
    }
  }

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase())
      if (!matchesSearch) return false

      if (catalogFilter === 'original') return p.isOriginal
      if (catalogFilter === 'print') return !p.isOriginal
      if (catalogFilter === 'draft') return !p.isActive
      if (catalogFilter === 'sold_out') return p.stock === 0
      if (catalogFilter === 'in_stock') return p.stock > 0
      return true
    })
  }, [products, searchQuery, catalogFilter])

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (o.guestEmail && o.guestEmail.toLowerCase().includes(searchQuery.toLowerCase()))
      if (!matchesSearch) return false

      if (orderStatusFilter !== 'all') return o.status === orderStatusFilter
      return true
    })
  }, [orders, searchQuery, orderStatusFilter])

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesSearch =
        inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.subject.toLowerCase().includes(searchQuery.toLowerCase())
      if (!matchesSearch) return false

      if (inquiryTypeFilter !== 'all') return inq.type === inquiryTypeFilter
      return true
    })
  }, [inquiries, searchQuery, inquiryTypeFilter])

  const grossRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const pendingFulfillments = orders.filter((o) => o.status === 'pending' || o.status === 'paid').length
  const unreadInquiries = inquiries.filter((i) => !i.read).length
  const activeCatalogCount = products.filter((p) => p.isActive).length

  // Loading Gate
  if (isAuthenticated === null) {
    return (
      <div className={styles.authGate}>
        <div style={{ textAlign: 'center' }}>
          <div className={styles.authEmblem}>EM</div>
          <p style={{ color: '#767066', fontSize: '0.8125rem' }}>Verifying Administrator Session...</p>
        </div>
      </div>
    )
  }

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className={styles.authGate}>
        <div className={styles.authCard}>
          <div className={styles.authEmblem}>EM</div>
          <span className={styles.authBadge}>Atelier Console</span>
          <h1 className={styles.authTitle}>Administrator Access</h1>
          <p className={styles.authSubtitle}>
            Elena Moore Fine Art — Core Administrative Engine & Database Management.
          </p>

          <form onSubmit={handleLogin} className={styles.authForm}>
            <div>
              <label className={styles.fieldLabel} style={{ display: 'block', marginBottom: '0.35rem' }}>
                Master Key
              </label>
              <input
                type="password"
                className={styles.inputDark}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className={styles.btnPrimaryDark}
            >
              {authLoading ? 'Verifying Key...' : 'Sign In to Console'}
            </button>
          </form>

          <div className={styles.authSecurityFooter}>
            <span>Protected by encrypted HTTP-only session tokens.</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.adminShell}>
      {/* SIDEBAR NAVIGATION */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarEmblem}>EM</div>
          <div className={styles.sidebarBrandInfo}>
            <span className={styles.sidebarTitle}>Elena Moore</span>
            <span className={styles.sidebarRoleBadge}>Atelier Admin</span>
          </div>
        </div>

        <div className={styles.statusPill}>
          <span className={styles.statusDot}></span>
          <span>SYSTEM ONLINE</span>
        </div>

        <nav className={styles.sidebarNav}>
          <div className={styles.navGroup}>
            <span className={styles.navGroupTitle}>Dashboard</span>
            <button
              onClick={() => setActiveTab('overview')}
              className={`${styles.navItem} ${activeTab === 'overview' ? styles.navItemActive : ''}`}
            >
              <div className={styles.navItemContent}>
                <span className={styles.navItemIcon}><IconOverview /></span>
                <span>Overview</span>
              </div>
            </button>
          </div>

          <div className={styles.navGroup}>
            <span className={styles.navGroupTitle}>Catalog</span>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`${styles.navItem} ${activeTab === 'catalog' ? styles.navItemActive : ''}`}
            >
              <div className={styles.navItemContent}>
                <span className={styles.navItemIcon}><IconInventory /></span>
                <span>Artworks</span>
              </div>
              <span className={styles.navBadge}>{products.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('new_artwork')}
              className={`${styles.navItem} ${activeTab === 'new_artwork' ? styles.navItemActive : ''}`}
            >
              <div className={styles.navItemContent}>
                <span className={styles.navItemIcon}><IconPlus /></span>
                <span>New Artwork</span>
              </div>
            </button>
          </div>

          <div className={styles.navGroup}>
            <span className={styles.navGroupTitle}>Storefront</span>
            <button
              onClick={() => setActiveTab('cms_customizer')}
              className={`${styles.navItem} ${activeTab === 'cms_customizer' ? styles.navItemActive : ''}`}
            >
              <div className={styles.navItemContent}>
                <span className={styles.navItemIcon}><IconCms /></span>
                <span>CMS & Layout</span>
              </div>
            </button>
          </div>

          <div className={styles.navGroup}>
            <span className={styles.navGroupTitle}>Operations</span>
            <button
              onClick={() => setActiveTab('orders')}
              className={`${styles.navItem} ${activeTab === 'orders' ? styles.navItemActive : ''}`}
            >
              <div className={styles.navItemContent}>
                <span className={styles.navItemIcon}><IconOrders /></span>
                <span>Orders</span>
              </div>
              {pendingFulfillments > 0 ? (
                <span className={`${styles.navBadge} ${styles.navBadgeAlert}`}>{pendingFulfillments}</span>
              ) : (
                <span className={styles.navBadge}>{orders.length}</span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`${styles.navItem} ${activeTab === 'inquiries' ? styles.navItemActive : ''}`}
            >
              <div className={styles.navItemContent}>
                <span className={styles.navItemIcon}><IconInquiries /></span>
                <span>Inquiries</span>
              </div>
              {unreadInquiries > 0 ? (
                <span className={`${styles.navBadge} ${styles.navBadgeAlert}`}>{unreadInquiries}</span>
              ) : (
                <span className={styles.navBadge}>{inquiries.length}</span>
              )}
            </button>
          </div>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.profileCard}>
            <div className={styles.profileAvatar}>EM</div>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>Elena Moore</span>
              <span className={styles.profileStatus}>Studio Administrator</span>
            </div>
          </div>

          <button onClick={handleLogout} className={styles.btnLogout}>
            <IconLogout />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className={styles.mainArea}>
        <header className={styles.topAppBar}>
          <div className={styles.breadcrumbGroup}>
            <span className={styles.breadcrumbRoot}>Console</span>
            <span className={styles.breadcrumbDivider}>/</span>
            <span className={styles.breadcrumbCurrent}>
              {activeTab === 'overview' && 'Overview'}
              {activeTab === 'catalog' && 'Artwork Inventory'}
              {activeTab === 'new_artwork' && 'Create Artwork'}
              {activeTab === 'cms_customizer' && 'Storefront CMS'}
              {activeTab === 'orders' && 'Orders & Fulfillment'}
              {activeTab === 'inquiries' && 'Inquiries & Commissions'}
            </span>
          </div>

          <div className={styles.topActions}>
            <button
              onClick={syncAllData}
              disabled={isSyncing}
              className={styles.btnSync}
              title="Refresh live data from database"
            >
              <span className={isSyncing ? styles.syncSpin : ''}><IconSync /></span>
              <span>{isSyncing ? 'Syncing...' : 'Sync Database'}</span>
            </button>

            <button
              onClick={handleLogout}
              className={styles.mobileLogoutBtn}
              title="Sign Out"
            >
              <IconLogout />
            </button>
          </div>
        </header>

        {/* MOBILE NAVIGATION BAR (Visible on mobile/tablet screens) */}
        <div className={styles.mobileTabBar}>
          <button
            onClick={() => setActiveTab('overview')}
            className={`${styles.mobileTabItem} ${activeTab === 'overview' ? styles.mobileTabItemActive : ''}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`${styles.mobileTabItem} ${activeTab === 'catalog' ? styles.mobileTabItemActive : ''}`}
          >
            Artworks ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('new_artwork')}
            className={`${styles.mobileTabItem} ${activeTab === 'new_artwork' ? styles.mobileTabItemActive : ''}`}
          >
            + Add
          </button>
          <button
            onClick={() => setActiveTab('cms_customizer')}
            className={`${styles.mobileTabItem} ${activeTab === 'cms_customizer' ? styles.mobileTabItemActive : ''}`}
          >
            CMS & Brand
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`${styles.mobileTabItem} ${activeTab === 'orders' ? styles.mobileTabItemActive : ''}`}
          >
            Orders {pendingFulfillments > 0 ? `(${pendingFulfillments})` : `(${orders.length})`}
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`${styles.mobileTabItem} ${activeTab === 'inquiries' ? styles.mobileTabItemActive : ''}`}
          >
            Inquiries {unreadInquiries > 0 ? `(${unreadInquiries})` : `(${inquiries.length})`}
          </button>
        </div>

        <div className={styles.contentArea}>
          {/* VIEW: EXECUTIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div className={styles.viewHeader}>
                <div>
                  <h1 className={styles.viewTitle}>Executive Overview</h1>
                  <p className={styles.viewDesc}>
                    Real-time aggregated health of the art studio, catalog stock, customer fulfillment pipeline, and collector leads.
                  </p>
                </div>
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statHeader}>
                    <span className={styles.statLabel}>Gross Revenue</span>
                    <div className={styles.statIconWrap}><IconDollar /></div>
                  </div>
                  <strong className={styles.statNumber}>${grossRevenue.toLocaleString()}</strong>
                  <div className={styles.statFooter}>
                    <span>{orders.length} collector orders</span>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statHeader}>
                    <span className={styles.statLabel}>Active Artworks</span>
                    <div className={styles.statIconWrap}><IconInventory /></div>
                  </div>
                  <strong className={styles.statNumber}>{activeCatalogCount}</strong>
                  <div className={styles.statFooter}>
                    <span>{products.filter((p) => p.isOriginal).length} Originals • {products.filter((p) => !p.isOriginal).length} Prints</span>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statHeader}>
                    <span className={styles.statLabel}>Pending Orders</span>
                    <div className={styles.statIconWrap}><IconOrders /></div>
                  </div>
                  <strong className={styles.statNumber} style={{ color: pendingFulfillments > 0 ? '#B45309' : '#2E7D32' }}>
                    {pendingFulfillments}
                  </strong>
                  <div className={styles.statFooter}>
                    <span>{pendingFulfillments > 0 ? 'Fulfillment needed' : 'All fulfilled'}</span>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statHeader}>
                    <span className={styles.statLabel}>Inquiries</span>
                    <div className={styles.statIconWrap}><IconInquiries /></div>
                  </div>
                  <strong className={styles.statNumber} style={{ color: unreadInquiries > 0 ? '#C53030' : '#2E7D32' }}>
                    {unreadInquiries}
                  </strong>
                  <div className={styles.statFooter}>
                    <span>{unreadInquiries > 0 ? `${unreadInquiries} unread messages` : 'All answered'}</span>
                  </div>
                </div>
              </div>

              {/* Action Deck */}
              <div className={styles.actionDeck}>
                <span className={styles.deckTitle}>Quick Management Actions</span>
                <div className={styles.deckButtons}>
                  <button onClick={() => setActiveTab('new_artwork')} className={`${styles.btnActionDark} ${styles.btnActionGold}`}>
                    <IconPlus /> Add Artwork
                  </button>
                  <button onClick={() => setActiveTab('cms_customizer')} className={styles.btnActionDark}>
                    <IconCms /> Edit Storefront
                  </button>
                  <button onClick={() => setActiveTab('orders')} className={styles.btnActionDark}>
                    <IconOrders /> Manage Orders
                  </button>
                  <button onClick={() => setActiveTab('inquiries')} className={styles.btnActionDark}>
                    <IconInquiries /> Review Messages
                  </button>
                </div>
              </div>

              {/* Two Column Split */}
              <div className={styles.splitGrid}>
                <div className={styles.panelCard}>
                  <div className={styles.panelHeader}>
                    <h2 className={styles.panelTitle}>Recent Orders</h2>
                    <button onClick={() => setActiveTab('orders')} className={styles.btnActionDark}>
                      View All
                    </button>
                  </div>

                  {orders.length === 0 ? (
                    <p style={{ color: '#767066', fontSize: '0.8125rem' }}>No customer orders placed yet.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {orders.slice(0, 4).map((order) => (
                        <div
                          key={order.id}
                          style={{
                            background: '#FAF9F6',
                            border: '1px solid #EBE5DA',
                            borderRadius: '6px',
                            padding: '0.65rem 0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: '#1F1D1A' }}>
                              #{order.id.slice(-6).toUpperCase()}
                            </div>
                            <div style={{ color: '#767066', fontSize: '0.75rem' }}>
                              {order.guestEmail || 'Collector'} • ${order.total.toFixed(2)}
                            </div>
                          </div>
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              background:
                                order.status === 'paid'
                                  ? '#EFF6FF'
                                  : order.status === 'shipped'
                                  ? '#F0FDF4'
                                  : '#FFFBEB',
                              color:
                                order.status === 'paid'
                                  ? '#1D4ED8'
                                  : order.status === 'shipped'
                                  ? '#15803D'
                                  : '#B45309',
                              border:
                                order.status === 'paid'
                                  ? '1px solid #BFDBFE'
                                  : order.status === 'shipped'
                                  ? '1px solid #BBF7D0'
                                  : '1px solid #FDE68A',
                            }}
                          >
                            {order.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className={styles.panelCard}>
                  <div className={styles.panelHeader}>
                    <h2 className={styles.panelTitle}>Recent Inquiries</h2>
                    <button onClick={() => setActiveTab('inquiries')} className={styles.btnActionDark}>
                      View All
                    </button>
                  </div>

                  {inquiries.length === 0 ? (
                    <p style={{ color: '#767066', fontSize: '0.8125rem' }}>No collector inquiries yet.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {inquiries.slice(0, 4).map((inq) => (
                        <div
                          key={inq.id}
                          style={{
                            background: '#FAF9F6',
                            border: inq.read ? '1px solid #EBE5DA' : '1px solid #8B4A34',
                            borderRadius: '6px',
                            padding: '0.65rem 0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: '#1F1D1A' }}>
                              {inq.name}
                              {!inq.read && (
                                <span style={{ marginLeft: '0.5rem', fontSize: '0.625rem', color: '#8B4A34', background: '#F5EFE6', padding: '0.1rem 0.35rem', borderRadius: '3px', fontWeight: 700 }}>
                                  NEW
                                </span>
                              )}
                            </div>
                            <div style={{ color: '#767066', fontSize: '0.75rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                              {inq.subject}
                            </div>
                          </div>
                          <span style={{ fontSize: '0.6875rem', color: '#8C8476' }}>
                            {inq.type === 'commission' ? 'Commission' : 'General'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* VIEW: ARTWORK INVENTORY CATALOG */}
          {activeTab === 'catalog' && (
            <div>
              <div className={styles.viewHeader}>
                <div>
                  <h1 className={styles.viewTitle}>Artwork Inventory</h1>
                  <p className={styles.viewDesc}>
                    Manage fine art oil originals and archival prints. Adjust prices, toggle storefront visibility, and monitor stock.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('new_artwork')}
                  className={styles.btnPrimaryDark}
                >
                  <IconPlus /> Add Artwork
                </button>
              </div>

              <div className={styles.tableToolbar}>
                <div className={styles.searchBox}>
                  <span className={styles.searchIcon}><IconSearch /></span>
                  <input
                    type="text"
                    className={styles.searchInputDark}
                    placeholder="Search by title or slug..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className={styles.filterPills}>
                  <button
                    onClick={() => setCatalogFilter('all')}
                    className={`${styles.filterPill} ${catalogFilter === 'all' ? styles.filterPillActive : ''}`}
                  >
                    All ({products.length})
                  </button>
                  <button
                    onClick={() => setCatalogFilter('original')}
                    className={`${styles.filterPill} ${catalogFilter === 'original' ? styles.filterPillActive : ''}`}
                  >
                    Originals ({products.filter((p) => p.isOriginal).length})
                  </button>
                  <button
                    onClick={() => setCatalogFilter('print')}
                    className={`${styles.filterPill} ${catalogFilter === 'print' ? styles.filterPillActive : ''}`}
                  >
                    Prints ({products.filter((p) => !p.isOriginal).length})
                  </button>
                  <button
                    onClick={() => setCatalogFilter('sold_out')}
                    className={`${styles.filterPill} ${catalogFilter === 'sold_out' ? styles.filterPillActive : ''}`}
                  >
                    Sold Out ({products.filter((p) => p.stock === 0).length})
                  </button>
                  <button
                    onClick={() => setCatalogFilter('draft')}
                    className={`${styles.filterPill} ${catalogFilter === 'draft' ? styles.filterPillActive : ''}`}
                  >
                    Drafts ({products.filter((p) => !p.isActive).length})
                  </button>
                </div>
              </div>

              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Artwork</th>
                      <th>Medium & Type</th>
                      <th>Price</th>
                      <th>Stock & Availability</th>
                      <th>Storefront</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#767066' }}>
                          No artworks match your search or filter.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product) => {
                        let parsedImage = '/hero.jpg'
                        try {
                          const imgs = JSON.parse(product.images)
                          if (imgs && imgs[0]) parsedImage = imgs[0]
                        } catch {
                          if (product.images) parsedImage = product.images
                        }

                        const isSoldOut = product.stock === 0

                        return (
                          <tr key={product.id}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                <div style={{ position: 'relative', width: 44, height: 44 }}>
                                  <Image
                                    src={parsedImage}
                                    alt={product.title}
                                    fill
                                    className={styles.artThumb}
                                  />
                                </div>
                                <div>
                                  <strong className={styles.productTitleText}>{product.title}</strong>
                                  <span className={styles.productSlugText}>/{product.slug}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                {product.isOriginal ? (
                                  <span className={styles.badgeOriginal}>Original</span>
                                ) : (
                                  <span className={styles.badgePrint}>Archival Print</span>
                                )}
                              </div>
                              <div style={{ color: '#767066', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                                {product.medium || 'Oil on linen'}
                              </div>
                            </td>
                            <td>
                              <span className={styles.priceTag}>${product.price.toFixed(2)}</span>
                            </td>
                            <td>
                              <button
                                type="button"
                                onClick={() => toggleProductSoldOut(product)}
                                className={`${styles.stockBadge} ${styles.stockBadgeButton} ${
                                  isSoldOut
                                    ? styles.stockOut
                                    : product.stock <= 3
                                    ? styles.stockLow
                                    : styles.stockIn
                                }`}
                                title={isSoldOut ? "Click to Restock / Mark In Stock" : "Click to Mark as Sold Out"}
                              >
                                {isSoldOut
                                  ? 'Sold Out ↺'
                                  : product.stock <= 3
                                  ? `${product.stock} left (Toggle)`
                                  : `${product.stock} in stock (Toggle)`}
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => toggleProductActive(product.id, product.isActive)}
                                className={`${styles.statusSwitch} ${
                                  product.isActive ? styles.statusSwitchActive : styles.statusSwitchDraft
                                }`}
                                title="Toggle live storefront availability"
                              >
                                {product.isActive ? 'Active' : 'Draft'}
                              </button>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.45rem' }}>
                                <button
                                  type="button"
                                  onClick={() => handleOpenEdit(product)}
                                  className={styles.btnEditDark}
                                  title="Edit artwork specifications"
                                >
                                  <IconEdit /> Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => toggleProductSoldOut(product)}
                                  className={`${styles.statusSwitch} ${isSoldOut ? styles.statusSwitchActive : styles.statusSwitchDraft}`}
                                  title={isSoldOut ? "Restock piece" : "Mark as Sold Out"}
                                  style={{ fontSize: '0.6875rem' }}
                                >
                                  {isSoldOut ? 'Restock' : 'Mark Sold'}
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id, product.title)}
                                  className={styles.btnDeleteDark}
                                  title="Permanently delete artwork"
                                >
                                  <IconTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW: CREATE NEW ARTWORK */}
          {activeTab === 'new_artwork' && (
            <div>
              <div className={styles.viewHeader}>
                <div>
                  <h1 className={styles.viewTitle}>Add Artwork</h1>
                  <p className={styles.viewDesc}>
                    Upload high-resolution photography, configure pricing, dimensions, and specifications to publish directly into the catalog.
                  </p>
                </div>
              </div>

              <div className={styles.formCard}>
                <form onSubmit={handleCreateProduct}>
                  <div className={styles.formGrid}>
                    <div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Artwork Title *</label>
                        <input
                          type="text"
                          name="title"
                          className={styles.inputDark}
                          placeholder="e.g. Afternoon Light with Persimmons"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Price ($ USD) *</label>
                          <input
                            type="number"
                            step="0.01"
                            name="price"
                            className={styles.inputDark}
                            placeholder="65.00"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Inventory Stock</label>
                          <input
                            type="number"
                            name="stock"
                            className={styles.inputDark}
                            placeholder="50"
                            value={formData.stock}
                            onChange={handleInputChange}
                          />
                          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.35rem' }}>
                            <button
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, stock: '50' }))}
                              style={{ background: '#F5F3EF', border: '1px solid #E6E1D6', padding: '0.15rem 0.4rem', borderRadius: 4, fontSize: '0.6875rem', cursor: 'pointer', color: '#5C564B' }}
                            >
                              In Stock (50)
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, stock: '1', isOriginal: true, category: 'original' }))}
                              style={{ background: '#F5F3EF', border: '1px solid #E6E1D6', padding: '0.15rem 0.4rem', borderRadius: 4, fontSize: '0.6875rem', cursor: 'pointer', color: '#5C564B' }}
                            >
                              Original (1)
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, stock: '0' }))}
                              style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '0.15rem 0.4rem', borderRadius: 4, fontSize: '0.6875rem', cursor: 'pointer', color: '#DC2626' }}
                            >
                              Sold Out (0)
                            </button>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Medium Category</label>
                          <select
                            name="category"
                            className={styles.selectDark}
                            value={formData.category}
                            onChange={handleInputChange}
                          >
                            <option value="print">Fine Art Print</option>
                            <option value="original">Original Oil Painting</option>
                            <option value="limited">Limited Edition Series</option>
                          </select>
                        </div>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Collection</label>
                          <select
                            name="collection"
                            className={styles.selectDark}
                            value={formData.collection}
                            onChange={handleInputChange}
                          >
                            <option value="still-life">Still Life & Form</option>
                            <option value="landscapes">Landscapes & Atmospheres</option>
                            <option value="botanical">Botanical & Flora</option>
                            <option value="figurative">Figurative & Abstract</option>
                            <option value="food-drink">Food & Drink Still Life</option>
                          </select>
                        </div>
                      </div>

                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Substrate & Medium Description</label>
                        <input
                          type="text"
                          name="medium"
                          className={styles.inputDark}
                          placeholder="e.g. Oil on Belgian Linen or Archival Giclée on 310gsm Cotton Rag"
                          value={formData.medium}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Dimensions</label>
                          <input
                            type="text"
                            name="dimensions"
                            className={styles.inputDark}
                            placeholder="e.g. 12 × 16 inches"
                            value={formData.dimensions}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Creation Year</label>
                          <input
                            type="text"
                            name="year"
                            className={styles.inputDark}
                            placeholder="2026"
                            value={formData.year}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Available Print Sizes (comma separated)</label>
                        <input
                          type="text"
                          name="sizes"
                          className={styles.inputDark}
                          placeholder="5x7, 8x10, 11x14"
                          value={formData.sizes}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Artwork Photography (Direct Upload)</label>
                        <div className={styles.dropzone}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className={styles.dropzoneInput}
                            disabled={uploadingImage}
                          />
                          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem', color: '#767066' }}>
                            <IconUpload />
                          </div>
                          <div style={{ fontWeight: 600, color: '#1F1D1A', fontSize: '0.8125rem', marginBottom: '0.2rem' }}>
                            {uploadingImage ? 'Uploading asset...' : 'Upload high-resolution image'}
                          </div>
                          <div className={styles.fieldHelp}>JPEG, PNG, WebP up to 10MB</div>
                        </div>

                        {formData.imageUrl && (
                          <div className={styles.previewThumbBox}>
                            <div style={{ position: 'relative', width: 50, height: 50, flexShrink: 0 }}>
                              <Image
                                src={formData.imageUrl}
                                alt="Preview"
                                fill
                                style={{ objectFit: 'cover', borderRadius: 4 }}
                              />
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                              <div style={{ fontSize: '0.75rem', color: '#2E7D32', fontWeight: 600 }}>
                                Asset Attached
                              </div>
                              <div style={{ fontSize: '0.6875rem', color: '#767066', wordBreak: 'break-all' }}>
                                {formData.imageUrl}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Artwork Description & Notes</label>
                        <textarea
                          name="description"
                          className={styles.textareaDark}
                          rows={4}
                          placeholder="A quiet study of morning light on fresh fruit. Painted from life in the studio..."
                          value={formData.description}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '1rem', background: '#FAF9F6', padding: '1rem', borderRadius: 6, border: '1px solid #EBE5DA' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            name="isOriginal"
                            checked={formData.isOriginal}
                            onChange={handleInputChange}
                            style={{ width: 16, height: 16, accentColor: '#8B4A34' }}
                          />
                          <span style={{ fontSize: '0.8125rem', color: '#1F1D1A' }}>Original One-of-a-Kind Painting (Single inventory)</span>
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={handleInputChange}
                            style={{ width: 16, height: 16, accentColor: '#8B4A34' }}
                          />
                          <span style={{ fontSize: '0.8125rem', color: '#1F1D1A' }}>Highlight in Featured Gallery Section</span>
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleInputChange}
                            style={{ width: 16, height: 16, accentColor: '#8B4A34' }}
                          />
                          <span style={{ fontSize: '0.8125rem', color: '#1F1D1A' }}>Publish Live to Storefront Immediately</span>
                        </label>
                      </div>

                      <div style={{ marginTop: '1.5rem' }}>
                        <button type="submit" className={styles.btnPrimaryDark}>
                          <IconPlus /> Publish Artwork
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* VIEW: STOREFRONT CMS CUSTOMIZER */}
          {activeTab === 'cms_customizer' && (
            <div>
              <div className={styles.viewHeader}>
                <div>
                  <h1 className={styles.viewTitle}>Storefront CMS</h1>
                  <p className={styles.viewDesc}>
                    Complete administrative control over storefront photography, announcement ribbons, marquee tickers, contact channels, and artist biography.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveSettings}>
                {/* 1. COMPANY & BRAND IDENTITY */}
                <div className={styles.formCard}>
                  <h2 className={styles.panelTitle} style={{ marginBottom: '1.25rem' }}>
                    Company & Brand Identity
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Company / Store Name</label>
                      <input
                        type="text"
                        className={styles.inputDark}
                        value={settings.companyName}
                        onChange={(e) => setSettings((s) => ({ ...s, companyName: e.target.value }))}
                        placeholder="e.g. Elena Moore"
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Brand Subtitle</label>
                      <input
                        type="text"
                        className={styles.inputDark}
                        value={settings.brandSubtitle}
                        onChange={(e) => setSettings((s) => ({ ...s, brandSubtitle: e.target.value }))}
                        placeholder="e.g. Oil Paintings"
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Owner / Principal Artist Name</label>
                      <input
                        type="text"
                        className={styles.inputDark}
                        value={settings.ownerName}
                        onChange={(e) => setSettings((s) => ({ ...s, ownerName: e.target.value }))}
                        placeholder="e.g. Elena Moore"
                      />
                    </div>
                  </div>

                  <div className={styles.formGrid} style={{ marginTop: '0.5rem' }}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Brand Tagline / Mission</label>
                      <input
                        type="text"
                        className={styles.inputDark}
                        value={settings.brandTagline}
                        onChange={(e) => setSettings((s) => ({ ...s, brandTagline: e.target.value }))}
                        placeholder="e.g. Oil painter capturing quiet domestic moments..."
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Footer Copyright Text</label>
                      <input
                        type="text"
                        className={styles.inputDark}
                        value={settings.copyrightText}
                        onChange={(e) => setSettings((s) => ({ ...s, copyrightText: e.target.value }))}
                        placeholder="e.g. © 2026 Elena Moore Art. All rights reserved."
                      />
                    </div>
                  </div>
                </div>

                {/* 2. CONTACT, ATELIER & STUDIO LOCATION */}
                <div className={styles.formCard}>
                  <h2 className={styles.panelTitle} style={{ marginBottom: '1.25rem' }}>
                    Contact, Atelier & Operations
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>General Inquiry Email</label>
                      <input
                        type="email"
                        className={styles.inputDark}
                        value={settings.contactEmail}
                        onChange={(e) => setSettings((s) => ({ ...s, contactEmail: e.target.value }))}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Orders / Support Email</label>
                      <input
                        type="email"
                        className={styles.inputDark}
                        value={settings.supportEmail}
                        onChange={(e) => setSettings((s) => ({ ...s, supportEmail: e.target.value }))}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Studio Phone / WhatsApp</label>
                      <input
                        type="text"
                        className={styles.inputDark}
                        value={settings.studioPhone}
                        onChange={(e) => setSettings((s) => ({ ...s, studioPhone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', marginTop: '0.5rem' }}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>City & State Location</label>
                      <input
                        type="text"
                        className={styles.inputDark}
                        value={settings.studioLocation}
                        onChange={(e) => setSettings((s) => ({ ...s, studioLocation: e.target.value }))}
                        placeholder="e.g. Kingston, New York"
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Full Physical Studio Address</label>
                      <input
                        type="text"
                        className={styles.inputDark}
                        value={settings.studioAddress}
                        onChange={(e) => setSettings((s) => ({ ...s, studioAddress: e.target.value }))}
                        placeholder="e.g. 42 Atelier Way, Studio 3B, Kingston, NY 12401"
                      />
                    </div>
                  </div>

                  <div className={styles.fieldGroup} style={{ marginTop: '0.5rem' }}>
                    <label className={styles.fieldLabel}>Studio Working Hours & Response Times</label>
                    <input
                      type="text"
                      className={styles.inputDark}
                      value={settings.studioHours}
                      onChange={(e) => setSettings((s) => ({ ...s, studioHours: e.target.value }))}
                      placeholder="e.g. Monday–Friday, 9am–5pm EST • Replies within 2–3 business days"
                    />
                  </div>
                </div>

                {/* 3. SOCIAL MEDIA & CHANNELS */}
                <div className={styles.formCard}>
                  <h2 className={styles.panelTitle} style={{ marginBottom: '1.25rem' }}>
                    Social Media & Public Channels
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Instagram Profile URL</label>
                      <input
                        type="url"
                        className={styles.inputDark}
                        value={settings.instagramUrl}
                        onChange={(e) => setSettings((s) => ({ ...s, instagramUrl: e.target.value }))}
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Pinterest Profile URL</label>
                      <input
                        type="url"
                        className={styles.inputDark}
                        value={settings.pinterestUrl}
                        onChange={(e) => setSettings((s) => ({ ...s, pinterestUrl: e.target.value }))}
                        placeholder="https://pinterest.com/..."
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>X / Twitter Profile URL</label>
                      <input
                        type="url"
                        className={styles.inputDark}
                        value={settings.twitterUrl}
                        onChange={(e) => setSettings((s) => ({ ...s, twitterUrl: e.target.value }))}
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                  </div>

                  <div className={styles.formGrid} style={{ marginTop: '0.5rem' }}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Facebook Page URL</label>
                      <input
                        type="url"
                        className={styles.inputDark}
                        value={settings.facebookUrl}
                        onChange={(e) => setSettings((s) => ({ ...s, facebookUrl: e.target.value }))}
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>YouTube Channel URL</label>
                      <input
                        type="url"
                        className={styles.inputDark}
                        value={settings.youtubeUrl}
                        onChange={(e) => setSettings((s) => ({ ...s, youtubeUrl: e.target.value }))}
                        placeholder="https://youtube.com/..."
                      />
                    </div>
                  </div>
                </div>

                {/* 4. HERO BANNER & HEADLINES */}
                <div className={styles.formCard}>
                  <h2 className={styles.panelTitle} style={{ marginBottom: '1.25rem' }}>
                    Hero Banner Photography & Announcements
                  </h2>

                  <div className={styles.formGrid}>
                    <div>
                      <label className={styles.fieldLabel}>Current Live Hero Banner</label>
                      <div className={styles.bannerPreviewBox}>
                        <Image
                          src={settings.heroImage || '/hero.jpg'}
                          alt="Hero Banner"
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>

                      <div className={styles.dropzone} style={{ padding: '0.85rem' }}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBannerUpload}
                          className={styles.dropzoneInput}
                          disabled={uploadingBanner}
                        />
                        <div style={{ fontWeight: 600, color: '#8B4A34', fontSize: '0.8125rem' }}>
                          {uploadingBanner ? 'Uploading Banner...' : 'Upload New Hero Banner Photo'}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Top Announcement Ribbon</label>
                        <input
                          type="text"
                          className={styles.inputDark}
                          value={settings.topBarText}
                          onChange={(e) => setSettings((s) => ({ ...s, topBarText: e.target.value }))}
                        />
                        <span className={styles.fieldHelp}>Displayed at the very top of every page.</span>
                      </div>

                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Hero Label</label>
                        <input
                          type="text"
                          className={styles.inputDark}
                          value={settings.heroLabel}
                          onChange={(e) => setSettings((s) => ({ ...s, heroLabel: e.target.value }))}
                        />
                      </div>

                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Hero Main Headline</label>
                        <input
                          type="text"
                          className={styles.inputDark}
                          value={settings.heroTitle}
                          onChange={(e) => setSettings((s) => ({ ...s, heroTitle: e.target.value }))}
                        />
                      </div>

                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Hero Description</label>
                        <textarea
                          className={styles.textareaDark}
                          rows={2}
                          value={settings.heroDesc}
                          onChange={(e) => setSettings((s) => ({ ...s, heroDesc: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.fieldGroup} style={{ marginTop: '1.25rem' }}>
                    <label className={styles.fieldLabel}>Scrolling Marquee Ticker</label>
                    <input
                      type="text"
                      className={styles.inputDark}
                      value={settings.marqueeText}
                      onChange={(e) => setSettings((s) => ({ ...s, marqueeText: e.target.value }))}
                    />
                    <span className={styles.fieldHelp}>Use bullet points (•) to separate ticker items.</span>
                  </div>
                </div>

                {/* 5. ARTIST BIOGRAPHY & PRESS */}
                <div className={styles.formCard}>
                  <h2 className={styles.panelTitle} style={{ marginBottom: '1.25rem' }}>
                    Artist Biography & Credentials
                  </h2>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>About Page Headline</label>
                    <input
                      type="text"
                      className={styles.inputDark}
                      value={settings.aboutTagline}
                      onChange={(e) => setSettings((s) => ({ ...s, aboutTagline: e.target.value }))}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Full Artist Bio</label>
                    <textarea
                      className={styles.textareaDark}
                      rows={4}
                      value={settings.aboutBio}
                      onChange={(e) => setSettings((s) => ({ ...s, aboutBio: e.target.value }))}
                    />
                  </div>

                  <div className={styles.formGrid}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Selected Exhibitions</label>
                      <input
                        type="text"
                        className={styles.inputDark}
                        value={settings.exhibitions}
                        onChange={(e) => setSettings((s) => ({ ...s, exhibitions: e.target.value }))}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Press & Publications</label>
                      <input
                        type="text"
                        className={styles.inputDark}
                        value={settings.press}
                        onChange={(e) => setSettings((s) => ({ ...s, press: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* 6. POLICIES & NOTICES */}
                <div className={styles.formCard}>
                  <h2 className={styles.panelTitle} style={{ marginBottom: '1.25rem' }}>
                    Commercial Policies & Notices
                  </h2>

                  <div className={styles.formGrid}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Commission Terms Notice</label>
                      <textarea
                        className={styles.textareaDark}
                        rows={3}
                        value={settings.commissionNotice}
                        onChange={(e) => setSettings((s) => ({ ...s, commissionNotice: e.target.value }))}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Wholesale Terms Notice</label>
                      <textarea
                        className={styles.textareaDark}
                        rows={3}
                        value={settings.wholesaleNotice}
                        onChange={(e) => setSettings((s) => ({ ...s, wholesaleNotice: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                {/* STICKY SAVE BAR */}
                <div className={styles.stickySaveBar}>
                  <div>
                    <strong style={{ color: '#1F1D1A', display: 'block', fontSize: '0.875rem' }}>Storefront CMS Configuration</strong>
                    <span style={{ fontSize: '0.75rem', color: '#767066' }}>
                      Updates will be published across all live visitor pages upon saving.
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={savingSettings}
                    className={styles.btnPrimaryDark}
                  >
                    {savingSettings ? 'Saving Changes...' : 'Save & Publish CMS'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* VIEW: COLLECTOR ORDERS */}
          {activeTab === 'orders' && (
            <div>
              <div className={styles.viewHeader}>
                <div>
                  <h1 className={styles.viewTitle}>Orders & Fulfillment</h1>
                  <p className={styles.viewDesc}>
                    Process artwork packaging, assign courier tracking numbers, dispatch via Shiprocket, and generate Certificates of Authenticity.
                  </p>
                </div>
              </div>

              <div className={styles.tableToolbar}>
                <div className={styles.searchBox}>
                  <span className={styles.searchIcon}><IconSearch /></span>
                  <input
                    type="text"
                    className={styles.searchInputDark}
                    placeholder="Search by order ID or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className={styles.filterPills}>
                  <button
                    onClick={() => setOrderStatusFilter('all')}
                    className={`${styles.filterPill} ${orderStatusFilter === 'all' ? styles.filterPillActive : ''}`}
                  >
                    All ({orders.length})
                  </button>
                  <button
                    onClick={() => setOrderStatusFilter('paid')}
                    className={`${styles.filterPill} ${orderStatusFilter === 'paid' ? styles.filterPillActive : ''}`}
                  >
                    Paid ({orders.filter((o) => o.status === 'paid').length})
                  </button>
                  <button
                    onClick={() => setOrderStatusFilter('pending')}
                    className={`${styles.filterPill} ${orderStatusFilter === 'pending' ? styles.filterPillActive : ''}`}
                  >
                    Pending ({orders.filter((o) => o.status === 'pending').length})
                  </button>
                  <button
                    onClick={() => setOrderStatusFilter('shipped')}
                    className={`${styles.filterPill} ${orderStatusFilter === 'shipped' ? styles.filterPillActive : ''}`}
                  >
                    Shipped ({orders.filter((o) => o.status === 'shipped').length})
                  </button>
                </div>
              </div>

              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Order & Date</th>
                      <th>Collector</th>
                      <th>Artworks Ordered</th>
                      <th>Total</th>
                      <th>Fulfillment Status</th>
                      <th>Tracking Number</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#767066' }}>
                          No orders found matching your search.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <strong style={{ color: '#1F1D1A', fontFamily: 'monospace' }}>
                              #{order.id.slice(-8).toUpperCase()}
                            </strong>
                            <div style={{ fontSize: '0.75rem', color: '#767066' }}>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td>
                            <div style={{ color: '#1F1D1A', fontWeight: 500 }}>
                              {order.guestEmail || 'Guest Collector'}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#767066', maxWidth: 190, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {order.shippingAddress || 'Digital / Studio Pickup'}
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                              {order.items.map((item) => (
                                <div key={item.id} style={{ fontSize: '0.8125rem', color: '#3E3831' }}>
                                  {item.quantity}× {item.title} {item.size ? `(${item.size})` : ''}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td>
                            <strong className={styles.priceTag}>${order.total.toFixed(2)}</strong>
                          </td>
                          <td>
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className={`${styles.orderStatusSelect} ${
                                order.status === 'paid'
                                  ? styles.orderStatusPaid
                                  : order.status === 'shipped'
                                  ? styles.orderStatusShipped
                                  : styles.orderStatusPending
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="paid">Paid</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </td>
                          <td>
                            <div className={styles.trackingInputGroup}>
                              <input
                                type="text"
                                placeholder="Tracking #"
                                className={styles.trackingInput}
                                value={trackingInputs[order.id] || ''}
                                onChange={(e) =>
                                  setTrackingInputs((prev) => ({ ...prev, [order.id]: e.target.value }))
                                }
                              />
                              <button
                                onClick={() => handleSaveTracking(order.id)}
                                className={styles.btnSaveTracking}
                              >
                                Save
                              </button>
                            </div>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem' }}>
                              <button
                                onClick={() => handleShiprocketDispatch(order.id)}
                                disabled={shippingOrderId === order.id}
                                className={styles.btnActionGold}
                                style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                                title="Auto-book shipment, allocate courier, generate AWB and print label with Shiprocket"
                              >
                                <IconShipment />
                                <span>{shippingOrderId === order.id ? 'Booking...' : 'Shiprocket'}</span>
                              </button>
                              <button
                                onClick={() => setSelectedCoaOrder(order)}
                                className={styles.btnActionDark}
                                style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                                title="Generate Certificate of Authenticity for collector packaging"
                              >
                                <IconDoc />
                                <span>COA</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW: INQUIRIES & COMMISSIONS */}
          {activeTab === 'inquiries' && (
            <div>
              <div className={styles.viewHeader}>
                <div>
                  <h1 className={styles.viewTitle}>Inquiries & Commissions</h1>
                  <p className={styles.viewDesc}>
                    Direct correspondence from art collectors, gallery curators, and custom painting commission requests.
                  </p>
                </div>
              </div>

              <div className={styles.tableToolbar}>
                <div className={styles.searchBox}>
                  <span className={styles.searchIcon}><IconSearch /></span>
                  <input
                    type="text"
                    className={styles.searchInputDark}
                    placeholder="Search by sender or subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className={styles.filterPills}>
                  <button
                    onClick={() => setInquiryTypeFilter('all')}
                    className={`${styles.filterPill} ${inquiryTypeFilter === 'all' ? styles.filterPillActive : ''}`}
                  >
                    All ({inquiries.length})
                  </button>
                  <button
                    onClick={() => setInquiryTypeFilter('commission')}
                    className={`${styles.filterPill} ${inquiryTypeFilter === 'commission' ? styles.filterPillActive : ''}`}
                  >
                    Commissions ({inquiries.filter((i) => i.type === 'commission').length})
                  </button>
                  <button
                    onClick={() => setInquiryTypeFilter('general')}
                    className={`${styles.filterPill} ${inquiryTypeFilter === 'general' ? styles.filterPillActive : ''}`}
                  >
                    General ({inquiries.filter((i) => i.type === 'general').length})
                  </button>
                </div>
              </div>

              <div>
                {filteredInquiries.length === 0 ? (
                  <div className={styles.panelCard} style={{ textAlign: 'center', padding: '3rem', color: '#767066' }}>
                    No messages or commissions match your filter.
                  </div>
                ) : (
                  filteredInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className={`${styles.inquiryCard} ${!inq.read ? styles.inquiryCardUnread : ''}`}
                    >
                      <div className={styles.inquiryHeader}>
                        <div className={styles.inquiryMeta}>
                          <span
                            className={`${styles.inquiryTypeBadge} ${
                              inq.type === 'commission'
                                ? styles.inquiryTypeCommission
                                : styles.inquiryTypeGeneral
                            }`}
                          >
                            {inq.type === 'commission' ? 'Commission' : 'General Inquiry'}
                          </span>
                          <strong style={{ color: '#1F1D1A', fontSize: '0.875rem' }}>{inq.name}</strong>
                          <span style={{ color: '#767066', fontSize: '0.8125rem' }}>&lt;{inq.email}&gt;</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#8C8476' }}>
                          {new Date(inq.createdAt).toLocaleDateString()} at {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div style={{ fontWeight: 600, color: '#1F1D1A', fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
                        Subject: {inq.subject}
                      </div>

                      <div className={styles.inquiryBody}>
                        {inq.message}
                      </div>

                      <div className={styles.inquiryActions}>
                        <a
                          href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                          className={styles.btnActionDark}
                          style={{ textDecoration: 'none' }}
                        >
                          <IconMail /> Reply via Email
                        </a>

                        <button
                          onClick={() => handleToggleInquiryRead(inq.id, inq.read)}
                          className={styles.btnActionDark}
                        >
                          {inq.read ? 'Mark Unread' : 'Mark Read'}
                        </button>

                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className={styles.btnDeleteDark}
                          title="Delete message"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODAL: STUDIO CERTIFICATE OF AUTHENTICITY (COA) */}
      {selectedCoaOrder && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(26, 26, 26, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1.5rem',
          }}
          onClick={() => setSelectedCoaOrder(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              maxWidth: 640,
              width: '100%',
              borderRadius: 12,
              border: '1px solid #E6E1D7',
              padding: '2.25rem',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              id="coa-printable-sheet"
              style={{
                border: '3px double #24211D',
                padding: '2rem',
                textAlign: 'center',
                background: '#FAF9F6',
                borderRadius: 6,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading), 'Cormorant Garamond', Georgia, serif",
                  fontSize: '0.8125rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#8B4A34',
                  fontWeight: 600,
                }}
              >
                Atelier Elena Moore
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-heading), 'Cormorant Garamond', Georgia, serif",
                  fontSize: '2rem',
                  color: '#24211D',
                  margin: '0.4rem 0 0.85rem',
                  fontWeight: 600,
                }}
              >
                Certificate of Authenticity
              </h2>

              <p style={{ fontSize: '0.8125rem', color: '#767066', fontStyle: 'italic', maxWidth: 420, margin: '0 auto 1.25rem' }}>
                This document certifies that the artwork detailed below is an authentic creation produced by Elena Moore.
              </p>

              <div
                style={{
                  textAlign: 'left',
                  background: '#FFFFFF',
                  border: '1px solid #E6E1D7',
                  borderRadius: 6,
                  padding: '1.15rem 1.25rem',
                  margin: '1rem 0',
                  fontSize: '0.8125rem',
                  lineHeight: 1.7,
                }}
              >
                <div><strong>Order Record:</strong> #{selectedCoaOrder.id.slice(-8).toUpperCase()}</div>
                <div><strong>Acquired By:</strong> {selectedCoaOrder.guestEmail || 'Private Collector'}</div>
                <div><strong>Date of Issue:</strong> {new Date(selectedCoaOrder.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <hr style={{ border: 'none', borderTop: '1px solid #EDE8DE', margin: '0.65rem 0' }} />
                <div>
                  <strong>Artworks in Acquisition:</strong>
                  <ul style={{ paddingLeft: '1.25rem', margin: '0.2rem 0' }}>
                    {selectedCoaOrder.items.map((it) => (
                      <li key={it.id}>
                        <em>{it.title}</em> {it.size ? `(${it.size} in)` : ''} — Quantity: {it.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div><strong>Studio Location:</strong> Kingston, Hudson Valley, New York</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '2rem', padding: '0 0.5rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 130, borderBottom: '1px solid #24211D', marginBottom: '0.35rem', height: 24 }} />
                  <span style={{ fontSize: '0.6875rem', color: '#8C8476', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Studio Wax Seal</span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "Georgia, cursive", fontSize: '1.125rem', color: '#24211D', height: 24 }}>
                    Elena Moore
                  </div>
                  <div style={{ width: 160, borderBottom: '1px solid #24211D', marginBottom: '0.35rem' }} />
                  <span style={{ fontSize: '0.6875rem', color: '#8C8476', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Artist Signature</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem', marginTop: '1.25rem' }}>
              <button
                type="button"
                onClick={() => setSelectedCoaOrder(null)}
                className={styles.btnActionDark}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className={styles.btnActionGold}
                style={{ padding: '0.45rem 1.15rem' }}
              >
                <IconPrinter /> Print Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT ARTWORK */}
      {editingProduct && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(26, 26, 26, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 110,
            padding: '1.25rem',
          }}
          onClick={() => setEditingProduct(null)}
        >
          <div
            style={{
              background: '#FAF9F6',
              maxWidth: 780,
              width: '100%',
              borderRadius: 12,
              border: '1px solid #E6E1D7',
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxHeight: '92vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #EAE5DB', paddingBottom: '1rem' }}>
              <div>
                <span className={styles.sectionBadge}>Catalog Management</span>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: '1.35rem', color: '#1F1D1A', margin: '0.35rem 0 0 0' }}>
                  Edit Artwork: {editingProduct.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className={styles.btnActionDark}
                style={{ width: 32, height: 32, borderRadius: '50%', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEditProduct}>
              <div className={styles.formGrid}>
                <div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Artwork Title *</label>
                    <input
                      type="text"
                      name="title"
                      className={styles.inputDark}
                      value={editFormData.title}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Custom URL Slug</label>
                    <input
                      type="text"
                      name="slug"
                      className={styles.inputDark}
                      value={editFormData.slug}
                      onChange={handleEditInputChange}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Price ($ USD) *</label>
                      <input
                        type="number"
                        step="0.01"
                        name="price"
                        className={styles.inputDark}
                        value={editFormData.price}
                        onChange={handleEditInputChange}
                        required
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Inventory Stock</label>
                      <input
                        type="number"
                        name="stock"
                        className={styles.inputDark}
                        value={editFormData.stock}
                        onChange={handleEditInputChange}
                      />
                      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.35rem' }}>
                        <button
                          type="button"
                          onClick={() => setEditFormData((prev) => ({ ...prev, stock: '50' }))}
                          style={{ background: '#F5F3EF', border: '1px solid #E6E1D6', padding: '0.15rem 0.4rem', borderRadius: 4, fontSize: '0.6875rem', cursor: 'pointer', color: '#5C564B' }}
                        >
                          In Stock (50)
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditFormData((prev) => ({ ...prev, stock: '1', isOriginal: true, category: 'original' }))}
                          style={{ background: '#F5F3EF', border: '1px solid #E6E1D6', padding: '0.15rem 0.4rem', borderRadius: 4, fontSize: '0.6875rem', cursor: 'pointer', color: '#5C564B' }}
                        >
                          Original (1)
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditFormData((prev) => ({ ...prev, stock: '0' }))}
                          style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '0.15rem 0.4rem', borderRadius: 4, fontSize: '0.6875rem', cursor: 'pointer', color: '#DC2626' }}
                        >
                          Sold Out (0)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Medium Category</label>
                      <select
                        name="category"
                        className={styles.selectDark}
                        value={editFormData.category}
                        onChange={handleEditInputChange}
                      >
                        <option value="print">Fine Art Print</option>
                        <option value="original">Original Oil Painting</option>
                        <option value="limited">Limited Edition Series</option>
                        <option value="subscription">Print Club Subscription</option>
                      </select>
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Collection</label>
                      <select
                        name="collection"
                        className={styles.selectDark}
                        value={editFormData.collection}
                        onChange={handleEditInputChange}
                      >
                        <option value="still-life">Still Life & Form</option>
                        <option value="landscapes">Landscapes & Atmospheres</option>
                        <option value="botanical">Botanical & Flora</option>
                        <option value="figurative">Figurative & Abstract</option>
                        <option value="food-drink">Food & Drink Still Life</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Substrate & Medium Description</label>
                    <input
                      type="text"
                      name="medium"
                      className={styles.inputDark}
                      value={editFormData.medium}
                      onChange={handleEditInputChange}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Dimensions</label>
                      <input
                        type="text"
                        name="dimensions"
                        className={styles.inputDark}
                        value={editFormData.dimensions}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Creation Year</label>
                      <input
                        type="text"
                        name="year"
                        className={styles.inputDark}
                        value={editFormData.year}
                        onChange={handleEditInputChange}
                      />
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Available Sizes (Comma-separated)</label>
                    <input
                      type="text"
                      name="sizes"
                      className={styles.inputDark}
                      value={editFormData.sizes}
                      onChange={handleEditInputChange}
                    />
                  </div>
                </div>

                <div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Artwork Photography</label>
                    <div className={styles.imageUploadArea}>
                      <div style={{ position: 'relative', width: 140, height: 160, borderRadius: 6, overflow: 'hidden', border: '1px solid #E2DBD0', margin: '0 auto 1rem' }}>
                        <Image
                          src={editFormData.imageUrl || '/hero.jpg'}
                          alt="Artwork Preview"
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <input
                        type="file"
                        id="edit-art-upload"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleEditImageUpload}
                        disabled={uploadingEditImage}
                      />
                      <label htmlFor="edit-art-upload" className={styles.btnActionGold} style={{ cursor: 'pointer', display: 'inline-flex' }}>
                        <IconUpload /> {uploadingEditImage ? 'Uploading...' : 'Replace Photo'}
                      </label>
                      <div style={{ marginTop: '0.65rem' }}>
                        <input
                          type="text"
                          name="imageUrl"
                          className={styles.inputDark}
                          value={editFormData.imageUrl}
                          onChange={handleEditInputChange}
                          placeholder="Or enter direct image URL"
                          style={{ fontSize: '0.75rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Artist Curatorial Note & Story</label>
                    <textarea
                      name="description"
                      rows={4}
                      className={styles.textareaDark}
                      value={editFormData.description}
                      onChange={handleEditInputChange}
                    />
                  </div>

                  <div style={{ background: '#F5F2EB', border: '1px solid #E2DBD0', borderRadius: 8, padding: '1rem', marginTop: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.8125rem', color: '#1F1D1A', fontWeight: 600, marginBottom: '0.5rem' }}>
                      <input
                        type="checkbox"
                        name="isOriginal"
                        checked={editFormData.isOriginal}
                        onChange={handleEditInputChange}
                      />
                      One-of-a-Kind Original Oil Painting
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.8125rem', color: '#1F1D1A', fontWeight: 600, marginBottom: '0.5rem' }}>
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={editFormData.isFeatured}
                        onChange={handleEditInputChange}
                      />
                      Feature on Homepage Atelier Showcase
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.8125rem', color: '#1F1D1A', fontWeight: 600 }}>
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={editFormData.isActive}
                        onChange={handleEditInputChange}
                      />
                      Publish Live on Storefront (Active)
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.75rem', borderTop: '1px solid #EAE5DB', paddingTop: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className={styles.btnActionDark}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className={styles.btnActionGold}
                  style={{ padding: '0.5rem 1.5rem' }}
                >
                  {savingEdit ? 'Saving Changes...' : 'Save Artwork Updates'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

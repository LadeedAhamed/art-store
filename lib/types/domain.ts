/**
 * ==============================================================================
 * DOMAIN DEFINITIONS & INTERNATIONAL ENTERPRISE TYPES
 * Elena Moore Fine Art — Atelier E-Commerce Platform
 * ==============================================================================
 */

export type ArtworkCategory = 'original' | 'print' | 'limited'
export type ArtworkCollection = 'food-drink' | 'botanical' | 'tableware'
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
export type InquiryType = 'commission' | 'general' | 'wholesale' | 'press'
export type FrameOptionType = 'none' | 'oak_float' | 'gold_leaf' | 'white_mat'

export interface ArtworkSize {
  name: string
  dimensions: string
  priceAdjustment: number
}

export interface FramingPreset {
  id: FrameOptionType
  title: string
  material: string
  priceDelta: number
  description: string
}

export interface Artwork {
  id: string
  slug: string
  title: string
  description?: string | null
  price: number
  category: string
  collection?: string | null
  images: string | string[]
  sizes: string | string[]
  medium?: string | null
  dimensions?: string | null
  year?: string | null
  isOriginal: boolean
  isFeatured: boolean
  isActive: boolean
  stock: number
  createdAt: string | Date
  updatedAt?: string | Date
}

export interface OrderItem {
  id: string
  orderId?: string
  productId?: string | null
  title: string
  quantity: number
  price: number
  size?: string | null
  frameOption?: string | null
  product?: Artwork | null
}

export interface TrackingCheckpoint {
  timestamp: string
  status: string
  location?: string
  activity: string
  courier?: string
}

export interface Order {
  id: string
  guestEmail?: string | null
  total: number
  status: OrderStatus | string
  shippingAddress?: string | null
  trackingNumber?: string | null
  courierName?: string | null
  shiprocketShipmentId?: string | null
  shiprocketAwb?: string | null
  createdAt: string | Date
  updatedAt?: string | Date
  items: OrderItem[]
  checkpoints?: TrackingCheckpoint[]
}

export interface Inquiry {
  id: string
  name: string
  email: string
  subject: string
  message: string
  type: InquiryType | string
  read: boolean
  createdAt: string | Date
}

export interface SiteSettings {
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

/**
 * Standardized API Response Envelope
 */
export interface ApiResponseEnvelope<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  meta?: {
    timestamp: string
    requestId?: string
    version?: string
  }
}

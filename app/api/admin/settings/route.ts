import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAdminRequest } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

const DEFAULT_SETTINGS = {
  id: 'default',
  // Company & Brand Identity
  companyName: 'Elena Moore',
  brandSubtitle: 'Oil Paintings',
  ownerName: 'Elena Moore',
  brandTagline: 'Oil painter capturing quiet domestic moments through still life depictions of food and botanicals.',
  copyrightText: '© 2026 Elena Moore Art. All rights reserved.',

  // Contact & Atelier Location
  contactEmail: 'hello@elenamoore.art',
  supportEmail: 'orders@elenamoore.art',
  studioPhone: '+1 (845) 555-0192',
  studioLocation: 'Kingston, New York',
  studioAddress: '42 Atelier Way, Studio 3B, Kingston, NY 12401',
  studioHours: 'Monday–Friday, 9am–5pm EST • Replies within 2–3 business days',

  // Social Channels
  instagramUrl: 'https://instagram.com',
  pinterestUrl: 'https://pinterest.com',
  twitterUrl: 'https://twitter.com',
  facebookUrl: 'https://facebook.com',
  youtubeUrl: 'https://youtube.com',

  // Banner & Storefront Hero
  topBarText: 'Free standard domestic shipping on orders over $75 • Worldwide archival crating',
  heroImage: '/hero.jpg',
  heroLabel: 'Original Oil Paintings & Prints',
  heroTitle: 'Fine Art for Timeless Interiors',
  heroDesc: 'Capturing light, texture, and quiet atmosphere on linen and canvas.',
  marqueeText: 'Free shipping over $75 • Archival-quality giclée prints • Signed originals • Collector Club memberships • Private commissions available',

  // Policies & Notices
  commissionNotice: 'I take on a limited number of private commissions each year. If you would like a bespoke original painting or custom dimensions, please reach out with details.',
  wholesaleNotice: 'I partner with select galleries, interior designers, and curated spaces for original works and archival prints.',

  // About & Bio Story
  aboutTagline: 'I paint the interplay of light, atmosphere, and form — quiet moments captured on linen.',
  aboutBio: "I am an oil painter working from my studio, exploring the meditative beauty of natural light, textured brushwork, and timeless compositions. Every original piece is rendered on fine Belgian linen with museum-grade pigments.",
  exhibitions: 'Hudson Valley Art Fair 2024 • Contemporary Oil Salon 2024 • Catskill Atelier Gallery 2023',
  press: 'Architectural Digest, Elle Decor, Studio International',
}

export async function GET() {
  try {
    let settings = await prisma.siteSetting.findUnique({
      where: { id: 'default' },
    })

    if (!settings) {
      settings = await prisma.siteSetting.create({
        data: DEFAULT_SETTINGS,
      })
    }

    return NextResponse.json({ success: true, settings })
  } catch (error) {
    console.error('Settings GET error:', error)
    return NextResponse.json({ success: true, settings: DEFAULT_SETTINGS })
  }
}

export async function PATCH(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized studio access' }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Destructure all available company settings
    const {
      companyName,
      brandSubtitle,
      ownerName,
      brandTagline,
      copyrightText,
      contactEmail,
      supportEmail,
      studioPhone,
      studioLocation,
      studioAddress,
      studioHours,
      instagramUrl,
      pinterestUrl,
      twitterUrl,
      facebookUrl,
      youtubeUrl,
      topBarText,
      heroImage,
      heroLabel,
      heroTitle,
      heroDesc,
      marqueeText,
      commissionNotice,
      wholesaleNotice,
      aboutTagline,
      aboutBio,
      exhibitions,
      press,
    } = body

    const updated = await prisma.siteSetting.upsert({
      where: { id: 'default' },
      update: {
        ...(companyName !== undefined && { companyName }),
        ...(brandSubtitle !== undefined && { brandSubtitle }),
        ...(ownerName !== undefined && { ownerName }),
        ...(brandTagline !== undefined && { brandTagline }),
        ...(copyrightText !== undefined && { copyrightText }),
        ...(contactEmail !== undefined && { contactEmail }),
        ...(supportEmail !== undefined && { supportEmail }),
        ...(studioPhone !== undefined && { studioPhone }),
        ...(studioLocation !== undefined && { studioLocation }),
        ...(studioAddress !== undefined && { studioAddress }),
        ...(studioHours !== undefined && { studioHours }),
        ...(instagramUrl !== undefined && { instagramUrl }),
        ...(pinterestUrl !== undefined && { pinterestUrl }),
        ...(twitterUrl !== undefined && { twitterUrl }),
        ...(facebookUrl !== undefined && { facebookUrl }),
        ...(youtubeUrl !== undefined && { youtubeUrl }),
        ...(topBarText !== undefined && { topBarText }),
        ...(heroImage !== undefined && { heroImage }),
        ...(heroLabel !== undefined && { heroLabel }),
        ...(heroTitle !== undefined && { heroTitle }),
        ...(heroDesc !== undefined && { heroDesc }),
        ...(marqueeText !== undefined && { marqueeText }),
        ...(commissionNotice !== undefined && { commissionNotice }),
        ...(wholesaleNotice !== undefined && { wholesaleNotice }),
        ...(aboutTagline !== undefined && { aboutTagline }),
        ...(aboutBio !== undefined && { aboutBio }),
        ...(exhibitions !== undefined && { exhibitions }),
        ...(press !== undefined && { press }),
      },
      create: {
        id: 'default',
        companyName: companyName || DEFAULT_SETTINGS.companyName,
        brandSubtitle: brandSubtitle || DEFAULT_SETTINGS.brandSubtitle,
        ownerName: ownerName || DEFAULT_SETTINGS.ownerName,
        brandTagline: brandTagline || DEFAULT_SETTINGS.brandTagline,
        copyrightText: copyrightText || DEFAULT_SETTINGS.copyrightText,
        contactEmail: contactEmail || DEFAULT_SETTINGS.contactEmail,
        supportEmail: supportEmail || DEFAULT_SETTINGS.supportEmail,
        studioPhone: studioPhone || DEFAULT_SETTINGS.studioPhone,
        studioLocation: studioLocation || DEFAULT_SETTINGS.studioLocation,
        studioAddress: studioAddress || DEFAULT_SETTINGS.studioAddress,
        studioHours: studioHours || DEFAULT_SETTINGS.studioHours,
        instagramUrl: instagramUrl || DEFAULT_SETTINGS.instagramUrl,
        pinterestUrl: pinterestUrl || DEFAULT_SETTINGS.pinterestUrl,
        twitterUrl: twitterUrl || DEFAULT_SETTINGS.twitterUrl,
        facebookUrl: facebookUrl || DEFAULT_SETTINGS.facebookUrl,
        youtubeUrl: youtubeUrl || DEFAULT_SETTINGS.youtubeUrl,
        topBarText: topBarText || DEFAULT_SETTINGS.topBarText,
        heroImage: heroImage || DEFAULT_SETTINGS.heroImage,
        heroLabel: heroLabel || DEFAULT_SETTINGS.heroLabel,
        heroTitle: heroTitle || DEFAULT_SETTINGS.heroTitle,
        heroDesc: heroDesc || DEFAULT_SETTINGS.heroDesc,
        marqueeText: marqueeText || DEFAULT_SETTINGS.marqueeText,
        commissionNotice: commissionNotice || DEFAULT_SETTINGS.commissionNotice,
        wholesaleNotice: wholesaleNotice || DEFAULT_SETTINGS.wholesaleNotice,
        aboutTagline: aboutTagline || DEFAULT_SETTINGS.aboutTagline,
        aboutBio: aboutBio || DEFAULT_SETTINGS.aboutBio,
        exhibitions: exhibitions || DEFAULT_SETTINGS.exhibitions,
        press: press || DEFAULT_SETTINGS.press,
      },
    })

    return NextResponse.json({ success: true, settings: updated })
  } catch (error) {
    console.error('Settings PATCH error:', error)
    return NextResponse.json({ error: 'Failed to update website settings' }, { status: 500 })
  }
}

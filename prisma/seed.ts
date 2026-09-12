import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  {
    slug: 'golden-hour-horizon-print',
    title: 'Golden Hour Horizon — Fine Art Print',
    description: 'An atmospheric tonal landscape capturing warm evening light over rolling coastal bluffs. Layered with soft ochres, umbers, and luminous sky. Museum-quality giclée print on 310gsm archival cotton rag.',
    price: 45,
    images: JSON.stringify(['/hero.jpg', '/hero.jpg']),
    category: 'print',
    collection: 'landscapes',
    sizes: JSON.stringify(['5x7', '8x10', '11x14', '16x20']),
    stock: 50,
    isOriginal: false,
    isFeatured: true,
    medium: 'Giclée print on 310gsm archival cotton rag',
    dimensions: 'Available in 5×7, 8×10, 11×14, 16×20 inches',
    year: 2025,
  },
  {
    slug: 'mediterranean-figs-linen-original',
    title: 'Figs & Olive Branch on Belgian Linen — Original',
    description: 'An original oil painting depicting ripe summer figs and wild olive branches bathed in northern studio light. Painted with rich textural brushwork on portrait-grade Belgian linen. Signed, varnished, and shipped with a Certificate of Authenticity.',
    price: 680,
    images: JSON.stringify(['/berries.jpg', '/berries.jpg']),
    category: 'original',
    collection: 'still-life',
    sizes: JSON.stringify(['16x20']),
    stock: 1,
    isOriginal: true,
    isFeatured: true,
    medium: 'Oil on Belgian linen canvas',
    dimensions: '16 × 20 inches (Framing available)',
    year: 2026,
  },
  {
    slug: 'nocturne-solitude-original',
    title: 'Nocturne Solitude — Original Oil',
    description: 'A contemplative evening study in deep indigo, prussian blue, and warm zinc highlights. Exploring the peaceful quiet of dusk over coastal dunes. Signed original with custom hardwood floater frame.',
    price: 1150,
    images: JSON.stringify(['/aperol.jpg', '/aperol.jpg']),
    category: 'original',
    collection: 'landscapes',
    sizes: JSON.stringify(['20x24']),
    stock: 1,
    isOriginal: true,
    isFeatured: true,
    medium: 'Oil on cradled wood panel',
    dimensions: '20 × 24 inches',
    year: 2026,
  },
  {
    slug: 'botanical-monstera-flora-print',
    title: 'Monstera & Wild Flora Print',
    description: 'A study in organic forms and cascading forest greens. Rendered with subtle brush texture and soft tonal gradients. Archival giclée reproduction on heavyweight fine art paper.',
    price: 48,
    images: JSON.stringify(['/hero.jpg', '/hero.jpg']),
    category: 'print',
    collection: 'botanicals',
    sizes: JSON.stringify(['5x7', '8x10', '11x14']),
    stock: 50,
    isOriginal: false,
    isFeatured: false,
    medium: 'Archival pigment print on 310gsm cotton rag',
    dimensions: 'Available in 5×7, 8×10, 11×14 inches',
    year: 2025,
  },
  {
    slug: 'morning-terracotta-still-life-print',
    title: 'Terracotta & Linen Study Print',
    description: 'Warm earth tones, rustic ceramics, and the delicate geometry of natural drapery. A peaceful composition designed for serene living spaces and studio walls.',
    price: 45,
    images: JSON.stringify(['/berries.jpg', '/berries.jpg']),
    category: 'print',
    collection: 'still-life',
    sizes: JSON.stringify(['5x7', '8x10', '11x14']),
    stock: 50,
    isOriginal: false,
    isFeatured: false,
    medium: 'Giclée print on archival matte paper',
    dimensions: 'Available in 5×7, 8×10, 11×14 inches',
    year: 2025,
  },
  {
    slug: 'catskill-mist-original',
    title: 'Catskill Morning Mist — Original Oil',
    description: 'A large landscape capturing dawn breaking through mountain mist. Expressive impasto palette knife work meets delicate atmospheric glazes. One-of-a-kind original.',
    price: 1400,
    images: JSON.stringify(['/hero.jpg', '/hero.jpg']),
    category: 'original',
    collection: 'landscapes',
    sizes: JSON.stringify(['24x30']),
    stock: 1,
    isOriginal: true,
    isFeatured: true,
    medium: 'Oil on heavy Belgian linen',
    dimensions: '24 × 30 inches',
    year: 2026,
  },
  {
    slug: 'coastal-solitude-print',
    title: 'Coastal Solitude Print',
    description: 'Subtle ocean blues and chalky shorelines rendered with minimalist elegance. An evocative print that brings calm and natural openness to modern interiors.',
    price: 45,
    images: JSON.stringify(['/aperol.jpg', '/aperol.jpg']),
    category: 'print',
    collection: 'landscapes',
    sizes: JSON.stringify(['8x10', '11x14', '16x20']),
    stock: 45,
    isOriginal: false,
    isFeatured: false,
    medium: 'Museum giclée print on smooth rag',
    dimensions: '8×10, 11×14, 16×20 inches',
    year: 2025,
  },
]

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()

  // Create products
  for (const product of products) {
    await prisma.product.create({ data: product })
  }

  // Ensure default site setting has clean fine-art copy
  await prisma.siteSetting.upsert({
    where: { id: 'default' },
    update: {
      heroLabel: 'Original Oil Paintings & Prints',
      heroTitle: 'Fine Art for Timeless Interiors',
      heroDesc: 'Capturing light, texture, and quiet atmosphere on linen and canvas.',
      commissionNotice: 'I take on a limited number of private commissions each year. If you would like a bespoke original painting or custom dimensions, please reach out with details.',
      aboutTagline: 'I paint the interplay of light, atmosphere, and form — quiet moments captured on linen.',
      aboutBio: 'I am an oil painter working from my studio, exploring the meditative beauty of natural light, textured brushwork, and timeless compositions. Every original piece is rendered on fine Belgian linen with museum-grade pigments.',
      exhibitions: 'Hudson Valley Art Fair 2024 • Contemporary Oil Salon 2024 • Catskill Atelier Gallery 2023',
      press: 'Architectural Digest, Elle Decor, Studio International',
    },
    create: {
      id: 'default',
      companyName: 'Elena Moore Atelier',
      brandSubtitle: 'Fine Art & Archival Editions',
      ownerName: 'Elena Moore',
      studioLocation: 'Kingston, New York',
      studioAddress: '42 Atelier Way, Studio 3B, Kingston, NY 12401',
      studioPhone: '+1 (845) 555-0192',
      contactEmail: 'hello@elenamoore.art',
      supportEmail: 'orders@elenamoore.art',
      heroLabel: 'Original Oil Paintings & Prints',
      heroTitle: 'Fine Art for Timeless Interiors',
      heroDesc: 'Capturing light, texture, and quiet atmosphere on linen and canvas.',
      commissionNotice: 'I take on a limited number of private commissions each year. If you would like a bespoke original painting or custom dimensions, please reach out with details.',
      aboutTagline: 'I paint the interplay of light, atmosphere, and form — quiet moments captured on linen.',
      aboutBio: 'I am an oil painter working from my studio, exploring the meditative beauty of natural light, textured brushwork, and timeless compositions. Every original piece is rendered on fine Belgian linen with museum-grade pigments.',
      exhibitions: 'Hudson Valley Art Fair 2024 • Contemporary Oil Salon 2024 • Catskill Atelier Gallery 2023',
      press: 'Architectural Digest, Elle Decor, Studio International',
    },
  })

  console.log(`✅ Seeded ${products.length} fine art artworks & updated studio settings`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

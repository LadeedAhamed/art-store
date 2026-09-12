import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  {
    slug: 'orange-slices-still-life-print',
    title: 'Orange Slices & Aperol Study — Fine Art Print',
    description: 'An evocative still life exploring sunlight filtering through translucent citrus slices and an iced aperitif. Rendered with luminous glazes and textured linen brushwork. Printed on 310gsm museum-grade cotton rag.',
    price: 45,
    images: JSON.stringify(['/aperol.jpg', '/aperol.jpg']),
    category: 'print',
    collection: 'food-drink',
    sizes: JSON.stringify(['5x7', '8x10', '11x14', '16x20']),
    stock: 50,
    isOriginal: false,
    isFeatured: true,
    medium: 'Archival pigment print on 310gsm heavy cotton rag',
    dimensions: '5×7, 8×10, 11×14, 16×20 inches',
    year: 2025,
  },
  {
    slug: 'figs-and-berries-belgian-linen-original',
    title: 'Summer Figs & Wild Berries on Belgian Linen — Original',
    description: 'An original oil painting depicting ripe Kadota figs, fresh berries, and morning studio light on textured Belgian linen. Signed, varnished, and shipped in custom archival crating with a Certificate of Authenticity.',
    price: 680,
    images: JSON.stringify(['/berries.jpg', '/berries.jpg']),
    category: 'original',
    collection: 'still-life',
    sizes: JSON.stringify(['16x20']),
    stock: 1,
    isOriginal: true,
    isFeatured: true,
    medium: 'Oil on primed Belgian linen canvas',
    dimensions: '16 × 20 inches (Custom floater frame optional)',
    year: 2026,
  },
  {
    slug: 'oysters-and-martini-table-print',
    title: 'Oysters & Dirty Martini Table Print',
    description: 'A celebration of conviviality — fresh briny oysters on crushed ice paired with a classic dry olive martini. A collectors favorite for dining spaces, bars, and kitchen vignettes.',
    price: 48,
    images: JSON.stringify(['/hero.jpg', '/hero.jpg']),
    category: 'print',
    collection: 'food-drink',
    sizes: JSON.stringify(['5x7', '8x10', '11x14', '16x20']),
    stock: 45,
    isOriginal: false,
    isFeatured: true,
    medium: 'Museum giclée print on 310gsm archival paper',
    dimensions: '5×7, 8×10, 11×14, 16×20 inches',
    year: 2025,
  },
  {
    slug: 'wild-blueberries-draped-linen-print',
    title: 'Wild Blueberries & Draped Linen Study Print',
    description: 'Rich prussian blues and buttery folds of natural linen. Captured in soft northern window light with expressive, tactile impasto brushwork.',
    price: 45,
    images: JSON.stringify(['/berries.jpg', '/berries.jpg']),
    category: 'print',
    collection: 'still-life',
    sizes: JSON.stringify(['5x7', '8x10', '11x14']),
    stock: 50,
    isOriginal: false,
    isFeatured: true,
    medium: 'Giclée reproduction on 310gsm velvet rag',
    dimensions: '5×7, 8×10, 11×14 inches',
    year: 2025,
  },
  {
    slug: 'assorted-fruit-peaches-original',
    title: 'Peaches & Summer Table Study — Original Oil',
    description: 'A large, radiant oil painting featuring ripe yellow peaches and rustic glazed ceramics bathed in afternoon warmth. Painted with rich impasto and luminous layered glazes.',
    price: 1400,
    images: JSON.stringify(['/hero.jpg', '/hero.jpg']),
    category: 'original',
    collection: 'still-life',
    sizes: JSON.stringify(['24x30']),
    stock: 1,
    isOriginal: true,
    isFeatured: true,
    medium: 'Oil on heavy Belgian portrait linen',
    dimensions: '24 × 30 inches',
    year: 2026,
  },
  {
    slug: 'citrus-spritz-terrace-print',
    title: 'Citrus Spritz on Sunlit Terrace Print',
    description: 'Vibrant blood oranges, sparkling glassware, and warm terracotta tiles. Brings the lively, joyful warmth of an Italian afternoon to your walls.',
    price: 45,
    images: JSON.stringify(['/aperol.jpg', '/aperol.jpg']),
    category: 'print',
    collection: 'food-drink',
    sizes: JSON.stringify(['8x10', '11x14', '16x20']),
    stock: 50,
    isOriginal: false,
    isFeatured: true,
    medium: 'Archival fine art print on 310gsm cotton paper',
    dimensions: '8×10, 11×14, 16×20 inches',
    year: 2025,
  },
  {
    slug: 'galette-and-cherries-original',
    title: 'Rustic Berry Galette & Cherries — Original Oil',
    description: 'Golden flaky pastry, glistening summer blackberries, and dark sweet cherries. A quiet, intimate celebration of simple kitchen craft and domestic beauty.',
    price: 950,
    images: JSON.stringify(['/berries.jpg', '/berries.jpg']),
    category: 'original',
    collection: 'food-drink',
    sizes: JSON.stringify(['12x16']),
    stock: 1,
    isOriginal: true,
    isFeatured: false,
    medium: 'Oil on cradled birch panel',
    dimensions: '12 × 16 inches',
    year: 2026,
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

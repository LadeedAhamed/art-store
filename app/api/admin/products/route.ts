import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAdminRequest } from '@/lib/admin-auth'
import { INITIAL_PRODUCTS } from '@/lib/products-data'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized studio access' }, { status: 401 })
  }

  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    })
    if (products.length > 0) {
      return NextResponse.json({ products })
    }
  } catch (error) {
    console.error('Admin GET products error:', error)
  }

  return NextResponse.json({ products: INITIAL_PRODUCTS })
}

export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized studio access' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      title,
      slug,
      description,
      price,
      images,
      category,
      collection,
      sizes,
      stock,
      isOriginal,
      isFeatured,
      isActive,
      medium,
      dimensions,
      year,
    } = body

    if (!title || !price || !category) {
      return NextResponse.json({ error: 'Title, price, and category are required.' }, { status: 400 })
    }

    const cleanSlug = (slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) +
      `-${Date.now().toString().slice(-4)}`

    const product = await prisma.product.create({
      data: {
        title,
        slug: cleanSlug,
        description: description || 'Original artwork by Elena Moore.',
        price: parseFloat(price),
        images: JSON.stringify(Array.isArray(images) && images.length > 0 ? images : ['/hero.jpg']),
        category: category || 'print',
        collection: collection || 'food-drink',
        sizes: sizes ? JSON.stringify(Array.isArray(sizes) ? sizes : sizes.split(',').map((s: string) => s.trim())) : JSON.stringify(['8x10', '11x14']),
        stock: parseInt(stock) || 10,
        isOriginal: Boolean(isOriginal),
        isFeatured: Boolean(isFeatured),
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        medium: medium || (isOriginal ? 'Oil on linen panel' : 'Archival giclée on 310gsm cotton rag'),
        dimensions: dimensions || '8 × 10 inches',
        year: year ? parseInt(year) : new Date().getFullYear(),
      },
    })

    return NextResponse.json({ success: true, product })
  } catch (error) {
    console.error('Admin POST product error:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized studio access' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }

    // Safely delete any associated order items first to satisfy foreign key constraints
    await prisma.$transaction(async (tx) => {
      await tx.orderItem.deleteMany({ where: { productId: id } })
      await tx.product.delete({ where: { id } })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin DELETE product error:', error)
    return NextResponse.json({ error: 'Failed to delete artwork from database' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized studio access' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = {}

    if (data.title !== undefined) updateData.title = data.title
    if (data.slug !== undefined) updateData.slug = data.slug
    if (data.description !== undefined) updateData.description = data.description
    if (data.price !== undefined) updateData.price = parseFloat(data.price)
    if (data.category !== undefined) updateData.category = data.category
    if (data.collection !== undefined) updateData.collection = data.collection
    if (data.stock !== undefined) updateData.stock = parseInt(data.stock)
    if (data.isOriginal !== undefined) updateData.isOriginal = Boolean(data.isOriginal)
    if (data.isFeatured !== undefined) updateData.isFeatured = Boolean(data.isFeatured)
    if (data.isActive !== undefined) updateData.isActive = Boolean(data.isActive)
    if (data.medium !== undefined) updateData.medium = data.medium
    if (data.dimensions !== undefined) updateData.dimensions = data.dimensions
    if (data.year !== undefined) updateData.year = parseInt(data.year)
    if (data.images !== undefined) {
      updateData.images =
        typeof data.images === 'string' && data.images.startsWith('[')
          ? data.images
          : JSON.stringify(Array.isArray(data.images) ? data.images : [data.images])
    }
    if (data.sizes !== undefined) {
      updateData.sizes =
        typeof data.sizes === 'string' && data.sizes.startsWith('[')
          ? data.sizes
          : JSON.stringify(
              Array.isArray(data.sizes)
                ? data.sizes
                : data.sizes.split(',').map((s: string) => s.trim())
            )
    }

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, product: updated })
  } catch (error) {
    console.error('Admin PATCH product error:', error)
    return NextResponse.json({ error: 'Failed to update artwork' }, { status: 500 })
  }
}

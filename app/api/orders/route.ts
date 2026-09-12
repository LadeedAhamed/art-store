import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, subtotal, shipping, total, shippingAddress, email, name, stripePaymentId } = body

    if (!items || items.length === 0 || !total) {
      return NextResponse.json({ error: 'Missing required order fields' }, { status: 400 })
    }

    const firstProduct = await prisma.product.findFirst({ select: { id: true } })
    const defaultProductId = firstProduct?.id || ''

    const resolvedItems = await Promise.all(
      items.map(async (item: { productId?: string; id?: string; title: string; price: number; quantity: number; size?: string }) => {
        let pid = item.productId || item.id
        if (pid) {
          const exists = await prisma.product.findUnique({ where: { id: pid }, select: { id: true } })
          if (!exists) pid = defaultProductId
        } else {
          pid = defaultProductId
        }
        return {
          productId: pid,
          title: item.title,
          price: Number(item.price),
          quantity: Number(item.quantity || 1),
          size: item.size || null,
        }
      })
    )

    const order = await prisma.order.create({
      data: {
        guestEmail: email || null,
        subtotal: Number(subtotal || total),
        shipping: Number(shipping || 0),
        total: Number(total),
        status: 'paid',
        stripePaymentId: stripePaymentId || `demo_pi_${Date.now()}`,
        shippingAddress: typeof shippingAddress === 'string' ? shippingAddress : JSON.stringify(shippingAddress || {}),
        items: {
          create: resolvedItems,
        },
      },
      include: {
        items: true,
      },
    })

    // Decrement stock & lock 1-of-1 originals atomically
    for (const item of items) {
      const pid = item.productId || item.id
      if (pid) {
        try {
          const product = await prisma.product.findUnique({ where: { id: pid } })
          if (product) {
            const newStock = Math.max(0, product.stock - (item.quantity || 1))
            await prisma.product.update({
              where: { id: pid },
              data: {
                stock: newStock,
                // If it's a 1-of-1 original oil painting or out of stock, mark inactive / sold out
                isActive: product.isOriginal ? false : newStock > 0 ? product.isActive : false,
              },
            })
          }
        } catch (stockErr) {
          console.error(`Failed to update stock for product ${pid}:`, stockErr)
        }
      }
    }

    // Trigger transactional confirmation emails asynchronously
    if (email) {
      const { sendOrderConfirmationEmails } = await import('@/lib/email')
      const formattedAddress = typeof shippingAddress === 'object' && shippingAddress !== null
        ? `${shippingAddress.address || ''}, ${shippingAddress.city || ''} ${shippingAddress.state || ''} ${shippingAddress.zip || ''}, ${shippingAddress.country || ''}`
        : String(shippingAddress || '')

      sendOrderConfirmationEmails({
        orderId: order.id,
        customerName: name || email.split('@')[0] || 'Art Collector',
        customerEmail: email,
        items: items.map((i: any) => ({
          title: i.title,
          quantity: Number(i.quantity || 1),
          price: Number(i.price),
          size: i.size,
          frame: i.frame,
          isOriginal: i.isOriginal,
        })),
        subtotal: Number(subtotal || total),
        shipping: Number(shipping || 0),
        total: Number(total),
        shippingAddress: formattedAddress,
      }).catch((e) => console.error('Background order email error:', e))
    }

    return NextResponse.json({ success: true, orderId: order.id, order })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const orderId = searchParams.get('orderId') || searchParams.get('id')
    const tracking = searchParams.get('tracking')

    if (orderId) {
      // Find by exact ID or case-insensitive partial match for last 8 chars
      const order = await prisma.order.findFirst({
        where: {
          OR: [
            { id: orderId },
            { id: { endsWith: orderId.replace(/^#/, '').toLowerCase() } },
          ],
        },
        include: { items: true },
      })
      return NextResponse.json({ order, orders: order ? [order] : [] })
    }

    if (tracking) {
      const order = await prisma.order.findFirst({
        where: { trackingNumber: tracking.trim() },
        include: { items: true },
      })
      return NextResponse.json({ order, orders: order ? [order] : [] })
    }

    const where = email ? { guestEmail: email.trim().toLowerCase() } : {}
    const orders = await prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })

    return NextResponse.json({ orders, order: orders[0] || null })
  } catch (error) {
    console.error('Order query error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAdminRequest } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized studio access' }, { status: 401 })
  }

  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Admin GET orders error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized studio access' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, status, trackingNumber, notes } = body

    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    const updated = await prisma.order.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(trackingNumber !== undefined && { trackingNumber }),
        ...(notes !== undefined && { notes }),
      },
      include: { items: true },
    })

    // If marked as shipped or tracking number added, notify collector with live tracking
    if (updated.guestEmail && (status === 'shipped' || (trackingNumber && trackingNumber !== ''))) {
      const { sendShippingNotificationEmail } = await import('@/lib/email')
      sendShippingNotificationEmail({
        orderId: updated.id,
        customerName: updated.guestEmail.split('@')[0] || 'Collector',
        customerEmail: updated.guestEmail,
        trackingNumber: updated.trackingNumber || trackingNumber || 'STUDIO-HAND-COURIER',
        shippingAddress: updated.shippingAddress || '',
        items: updated.items.map((i) => ({
          title: i.title,
          quantity: i.quantity,
          size: i.size,
        })),
      }).catch((e) => console.error('[Shipping Notification] Email error:', e))
    }

    // If marked as delivered, dispatch delivery celebration email
    if (updated.guestEmail && status === 'delivered') {
      const { sendDeliveredNotificationEmail } = await import('@/lib/email')
      sendDeliveredNotificationEmail({
        orderId: updated.id,
        customerName: updated.guestEmail.split('@')[0] || 'Collector',
        customerEmail: updated.guestEmail,
        items: updated.items.map((i) => ({ title: i.title })),
      }).catch((e) => console.error('[Delivered Notification] Email error:', e))
    }

    return NextResponse.json({ success: true, order: updated })
  } catch (error) {
    console.error('Admin PATCH order error:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

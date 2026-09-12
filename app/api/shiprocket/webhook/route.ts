import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendDeliveredNotificationEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { order_id, awb, current_status, scans } = body

    console.log('[Shiprocket Webhook] Received Event:', {
      order_id,
      awb,
      current_status,
    })

    if (!order_id && !awb) {
      return NextResponse.json({ error: 'Missing order_id or awb' }, { status: 400 })
    }

    // Find order by ID or AWB / Tracking number
    const order = await prisma.order.findFirst({
      where: {
        OR: [
          ...(order_id ? [{ id: String(order_id) }] : []),
          ...(awb ? [{ trackingNumber: String(awb) }] : []),
        ],
      },
      include: { items: true },
    })

    if (!order) {
      return NextResponse.json({ received: true, note: 'Order not found in store database' })
    }

    const normalizedStatus = (current_status || '').toUpperCase()

    // Map Shiprocket courier statuses to store statuses
    let newStatus = order.status
    if (normalizedStatus.includes('DELIVERED')) {
      newStatus = 'delivered'
    } else if (
      normalizedStatus.includes('IN TRANSIT') ||
      normalizedStatus.includes('OUT FOR DELIVERY') ||
      normalizedStatus.includes('PICKED UP') ||
      normalizedStatus.includes('SHIPPED')
    ) {
      newStatus = 'shipped'
    }

    if (newStatus !== order.status) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: newStatus,
          ...(awb && !order.trackingNumber ? { trackingNumber: String(awb) } : {}),
        },
      })

      // If marked as delivered, send celebration email
      if (newStatus === 'delivered' && order.guestEmail) {
        sendDeliveredNotificationEmail({
          orderId: order.id,
          customerName: order.guestEmail.split('@')[0] || 'Collector',
          customerEmail: order.guestEmail,
          items: order.items.map((i) => ({ title: i.title })),
        }).catch((e) => console.error('[Shiprocket Webhook] Delivery email error:', e))
      }
    }

    return NextResponse.json({ success: true, updatedStatus: newStatus })
  } catch (error) {
    console.error('[Shiprocket Webhook Error]:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

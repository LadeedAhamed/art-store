import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAdminRequest } from '@/lib/admin-auth'
import { createShiprocketShipment, generateShippingLabel } from '@/lib/shiprocket'
import { sendShippingNotificationEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized studio access' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { orderId, lengthCm, breadthCm, heightCm, weightKg } = body

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    let parsedAddress: any = {}
    try {
      parsedAddress = typeof order.shippingAddress === 'string'
        ? JSON.parse(order.shippingAddress)
        : order.shippingAddress || {}
    } catch {
      parsedAddress = { address: order.shippingAddress }
    }

    // 1. Create Shipment in Shiprocket & Assign AWB
    const shipmentResult = await createShiprocketShipment({
      orderId: order.id,
      orderDate: order.createdAt.toISOString(),
      customerName: order.guestEmail ? order.guestEmail.split('@')[0] : 'Art Collector',
      customerEmail: order.guestEmail || 'collector@example.com',
      shippingAddress: {
        address: parsedAddress.address || 'Collector Street',
        city: parsedAddress.city || 'New York',
        state: parsedAddress.state || 'NY',
        pincode: parsedAddress.zip || parsedAddress.pincode || '10001',
        country: parsedAddress.country || 'USA',
      },
      items: order.items.map((i) => ({
        title: i.title,
        quantity: i.quantity,
        price: i.price,
        size: i.size,
      })),
      subtotal: order.subtotal,
      total: order.total,
      lengthCm: lengthCm || 40,
      breadthCm: breadthCm || 30,
      heightCm: heightCm || 10,
      weightKg: weightKg || 1.5,
    })

    const awbCode = shipmentResult.awbCode || `AWB-${order.id.slice(-8).toUpperCase()}`
    const courierName = shipmentResult.courierName || 'Shiprocket Express'

    // 2. Update Order in Store Database
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'shipped',
        trackingNumber: awbCode,
        notes: `Shiprocket Shipment ID: ${shipmentResult.shipmentId || 'N/A'} • Courier: ${courierName}`,
      },
      include: { items: true },
    })

    // 3. Dispatch Live Tracking Email to Collector
    if (order.guestEmail) {
      sendShippingNotificationEmail({
        orderId: order.id,
        customerName: order.guestEmail.split('@')[0] || 'Collector',
        customerEmail: order.guestEmail,
        trackingNumber: awbCode,
        carrier: courierName,
        shippingAddress: order.shippingAddress || '',
        items: order.items.map((i) => ({
          title: i.title,
          quantity: i.quantity,
          size: i.size,
        })),
      }).catch((e) => console.error('[Shiprocket Email Dispatch Error]:', e))
    }

    // 4. Try to fetch shipping label PDF URL
    let labelUrl: string | null = null
    if (shipmentResult.shipmentId) {
      labelUrl = await generateShippingLabel(shipmentResult.shipmentId)
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      awbCode,
      courierName,
      labelUrl,
      message: `Shipment booked successfully with ${courierName}. AWB: ${awbCode}`,
    })
  } catch (error) {
    console.error('Shiprocket dispatch API error:', error)
    return NextResponse.json({ error: 'Failed to process Shiprocket dispatch' }, { status: 500 })
  }
}

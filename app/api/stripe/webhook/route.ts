import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object as any
        console.log(`[Stripe Webhook] Payment succeeded: ${pi.id}`)

        try {
          // 1. Update order status to paid in DB
          const order = await prisma.order.findFirst({
            where: { stripePaymentId: pi.id },
            include: { items: true },
          })

          if (order && order.status !== 'paid') {
            await prisma.order.update({
              where: { id: order.id },
              data: { status: 'paid' },
            })

            // 2. Decrement stock and lock 1-of-1 originals
            for (const item of order.items) {
              if (item.productId) {
                const product = await prisma.product.findUnique({ where: { id: item.productId } })
                if (product) {
                  const newStock = Math.max(0, product.stock - item.quantity)
                  await prisma.product.update({
                    where: { id: item.productId },
                    data: {
                      stock: newStock,
                      isActive: product.isOriginal ? false : newStock > 0 ? product.isActive : false,
                    },
                  })
                }
              }
            }

            // 3. Dispatch transactional confirmation email
            if (order.guestEmail) {
              const { sendOrderConfirmationEmails } = await import('@/lib/email')
              sendOrderConfirmationEmails({
                orderId: order.id,
                customerName: order.guestEmail.split('@')[0] || 'Collector',
                customerEmail: order.guestEmail,
                items: order.items.map((i) => ({
                  title: i.title,
                  quantity: i.quantity,
                  price: i.price,
                  size: i.size,
                })),
                subtotal: order.subtotal,
                shipping: order.shipping,
                total: order.total,
                shippingAddress: order.shippingAddress || '',
              }).catch((e) => console.error('[Stripe Webhook] Email error:', e))
            }
          }
        } catch (dbErr) {
          console.error('[Stripe Webhook] Error updating order status:', dbErr)
        }
        break
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object
        console.log(`Subscription updated: ${subscription.id}`)
        break
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        try {
          await prisma.subscription.updateMany({
            where: { stripeSubId: subscription.id },
            data: { status: 'cancelled', cancelledAt: new Date() },
          })
        } catch {}
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

import nodemailer from 'nodemailer'

interface OrderEmailData {
  orderId: string
  customerName: string
  customerEmail: string
  items: Array<{
    title: string
    quantity: number
    price: number
    size?: string | null
    frame?: string | null
    isOriginal?: boolean
  }>
  subtotal: number
  shipping: number
  total: number
  shippingAddress: string
}

interface ShippingEmailData {
  orderId: string
  customerName: string
  customerEmail: string
  trackingNumber: string
  carrier?: string
  shippingAddress: string
  items: Array<{
    title: string
    quantity: number
    size?: string | null
    frame?: string | null
  }>
}

function getTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }
  return null
}

function getCarrierTrackingUrl(trackingNumber: string, explicitCarrier?: string): { carrier: string; url: string } {
  const tn = trackingNumber.trim()
  if (explicitCarrier) {
    const c = explicitCarrier.toLowerCase()
    if (c.includes('fedex')) return { carrier: 'FedEx', url: `https://www.fedex.com/fedextrack/?trknbr=${tn}` }
    if (c.includes('ups')) return { carrier: 'UPS', url: `https://www.ups.com/track?tracknum=${tn}` }
    if (c.includes('usps')) return { carrier: 'USPS', url: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tn}` }
    if (c.includes('dhl')) return { carrier: 'DHL', url: `https://www.dhl.com/en/express/tracking.html?AWB=${tn}` }
  }

  // Auto-detect based on tracking number format
  if (/^1Z[0-9A-Z]{16}$/i.test(tn)) {
    return { carrier: 'UPS', url: `https://www.ups.com/track?tracknum=${tn}` }
  }
  if (/^(94|93|92|91|95)[0-9]{20}$/.test(tn) || /^[0-9]{20,22}$/.test(tn)) {
    return { carrier: 'USPS', url: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tn}` }
  }
  if (/^[0-9]{12,15}$/.test(tn)) {
    return { carrier: 'FedEx', url: `https://www.fedex.com/fedextrack/?trknbr=${tn}` }
  }

  return { carrier: explicitCarrier || 'Art Courier Express', url: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tn}` }
}

export async function sendOrderConfirmationEmails(data: OrderEmailData) {
  const transporter = getTransporter()
  const fromAddress = process.env.SMTP_FROM || 'orders@elenamoore.art'
  const ownerEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER || 'hello@elenamoore.art'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

  const itemsHtml = data.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #EFECE6;">
        <td style="padding: 12px 0; color: #1C1917; font-size: 14px;">
          <strong>${item.title}</strong>
          ${item.size ? `<br/><span style="color: #78716C; font-size: 12px;">Size: ${item.size} in</span>` : ''}
          ${item.frame ? `<br/><span style="color: #8B4A34; font-size: 12px;">Framing: ${item.frame}</span>` : ''}
          ${item.isOriginal ? `<br/><span style="color: #C4654A; font-size: 12px; font-weight: 600;">★ Signed Original (1 of 1)</span>` : ''}
        </td>
        <td style="padding: 12px 0; text-align: center; color: #78716C; font-size: 14px;">${item.quantity}</td>
        <td style="padding: 12px 0; text-align: right; color: #1C1917; font-weight: 600; font-size: 14px;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `
    )
    .join('')

  // Customer Email
  const customerHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAF8F5; color: #24211D; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E8E4DC; border-radius: 12px; overflow: hidden; }
          .header { padding: 36px 30px; text-align: center; background: #FAF8F5; border-bottom: 1px solid #E8E4DC; }
          .logo { font-family: Georgia, serif; font-size: 26px; font-weight: 600; color: #4B280B; letter-spacing: 0.05em; text-transform: uppercase; margin: 0; }
          .tagline { color: #8C867A; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 6px; }
          .content { padding: 30px; }
          .order-meta { background: #FAF8F5; border-radius: 8px; border: 1px solid #E8E4DC; padding: 16px; margin: 20px 0; font-size: 13px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #8C867A; padding-bottom: 8px; border-bottom: 1px solid #E8E4DC; }
          .total-row { padding-top: 16px; text-align: right; font-size: 14px; }
          .grand-total { font-size: 18px; font-weight: 700; color: #4B280B; }
          .footer { padding: 24px; text-align: center; font-size: 12px; color: #8C867A; border-top: 1px solid #EFECE6; background: #FAF8F5; }
          .btn-track { display: inline-block; background: #4B280B; color: #FAF8F5; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">Elena Moore</h1>
            <div class="tagline">Fine Art & Still Life Studio</div>
          </div>
          <div class="content">
            <h2 style="font-family: Georgia, serif; font-size: 20px; color: #24211D; margin-top: 0;">Thank you for your art acquisition, ${data.customerName || 'Collector'}.</h2>
            <p style="color: #57534E; font-size: 14px; line-height: 1.6;">
              Your order has been received and is currently being prepared with archival care in the studio. Each piece is inspected and packaged with acid-free glassine and protective materials.
            </p>
            
            <div class="order-meta">
              <strong>Order ID:</strong> #${data.orderId.slice(-8).toUpperCase()}<br/>
              <strong>Shipping To:</strong> ${data.shippingAddress || 'Address on file'}
            </div>

            <table>
              <thead>
                <tr>
                  <th>Artwork</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div class="total-row">
              <p style="margin: 4px 0; color: #78716C;">Subtotal: $${data.subtotal.toFixed(2)}</p>
              <p style="margin: 4px 0; color: #78716C;">Shipping & Handling: $${data.shipping.toFixed(2)}</p>
              <p class="grand-total" style="margin: 8px 0 0;">Total: $${data.total.toFixed(2)}</p>
            </div>

            <div style="text-align: center; margin: 30px 0 10px;">
              <a href="${siteUrl}/orders/track?orderId=${data.orderId}" class="btn-track">
                Track Live Order Status →
              </a>
            </div>

            <p style="color: #78716C; font-size: 13px; line-height: 1.6; margin-top: 25px;">
              You will receive another notification with your carrier tracking ID as soon as your parcel is dispatched from the upstate New York studio.
            </p>
          </div>
          <div class="footer">
            Elena Moore Art • Kingston, New York<br/>
            If you have any questions, reply directly to this email or reach us at ${ownerEmail}
          </div>
        </div>
      </body>
    </html>
  `

  // Owner Alert Email
  const ownerHtml = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: sans-serif; background: #FAF8F5; padding: 20px; color: #24211D;">
        <div style="max-width: 550px; margin: 0 auto; background: #fff; border: 1px solid #E8E4DC; border-radius: 10px; padding: 24px;">
          <h2 style="color: #4B280B; margin-top: 0;">🎨 New Collector Order Received!</h2>
          <p><strong>Order ID:</strong> #${data.orderId.slice(-8).toUpperCase()}</p>
          <p><strong>Collector:</strong> ${data.customerName} (${data.customerEmail})</p>
          <p><strong>Total Value:</strong> $${data.total.toFixed(2)}</p>
          <p><strong>Destination:</strong> ${data.shippingAddress}</p>
          <hr style="border: none; border-top: 1px solid #E8E4DC; margin: 16px 0;"/>
          <h4>Items Ordered:</h4>
          <table>
            ${itemsHtml}
          </table>
          <p style="margin-top: 20px;">
            <a href="${siteUrl}/admin" style="background: #4B280B; color: #FAF8F5; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">
              Open Admin Console to Fulfill & Print COA →
            </a>
          </p>
        </div>
      </body>
    </html>
  `

  if (!transporter) {
    console.log('[Email System] SMTP not configured. Simulating order confirmation dispatch:', {
      to: data.customerEmail,
      orderId: data.orderId,
    })
    return { success: true, simulated: true }
  }

  try {
    await transporter.sendMail({
      from: `Elena Moore Art <${fromAddress}>`,
      to: data.customerEmail,
      subject: `Order Confirmation #${data.orderId.slice(-8).toUpperCase()} — Elena Moore Art`,
      html: customerHtml,
    })

    await transporter.sendMail({
      from: `Elena Moore Storefront <${fromAddress}>`,
      to: ownerEmail,
      subject: `[New Sale] Order #${data.orderId.slice(-8).toUpperCase()} — $${data.total.toFixed(2)} from ${data.customerName || data.customerEmail}`,
      html: ownerHtml,
    })

    return { success: true }
  } catch (error) {
    console.error('[Email System] Failed to dispatch order emails:', error)
    return { success: false, error }
  }
}

export async function sendShippingNotificationEmail(data: ShippingEmailData) {
  const transporter = getTransporter()
  const fromAddress = process.env.SMTP_FROM || 'orders@elenamoore.art'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  const { carrier, url: carrierUrl } = getCarrierTrackingUrl(data.trackingNumber, data.carrier)

  const itemsHtml = data.items
    .map(
      (item) => `
      <li style="margin-bottom: 6px; color: #24211D; font-size: 14px;">
        <strong>${item.title}</strong>
        ${item.size ? ` — ${item.size} in` : ''}
        ${item.frame ? ` (Framed: ${item.frame})` : ''}
        (Qty: ${item.quantity})
      </li>
    `
    )
    .join('')

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAF8F5; color: #24211D; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E8E4DC; border-radius: 12px; overflow: hidden; }
          .header { padding: 36px 30px; text-align: center; background: #FAF8F5; border-bottom: 1px solid #E8E4DC; }
          .logo { font-family: Georgia, serif; font-size: 26px; font-weight: 600; color: #4B280B; letter-spacing: 0.05em; text-transform: uppercase; margin: 0; }
          .tagline { color: #8C867A; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 6px; }
          .content { padding: 30px; }
          .track-box { background: #F5EFE6; border: 1px solid #E0D5C3; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center; }
          .track-number { font-family: monospace; font-size: 18px; font-weight: 700; color: #4B280B; letter-spacing: 0.05em; margin: 8px 0; }
          .btn-track { display: inline-block; background: #4B280B; color: #FAF8F5; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px; margin-top: 12px; }
          .footer { padding: 24px; text-align: center; font-size: 12px; color: #8C867A; border-top: 1px solid #EFECE6; background: #FAF8F5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">Elena Moore</h1>
            <div class="tagline">Fine Art Studio & Gallery</div>
          </div>
          <div class="content">
            <h2 style="font-family: Georgia, serif; font-size: 22px; color: #24211D; margin-top: 0;">Your artwork is on its way, ${data.customerName || 'Collector'}!</h2>
            <p style="color: #57534E; font-size: 14px; line-height: 1.6;">
              Your parcel has completed archival packaging and has been dispatched via <strong>${carrier}</strong>.
            </p>
            
            <div class="track-box">
              <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #8C867A; font-weight: 600;">
                ${carrier} Tracking Number
              </div>
              <div class="track-number">${data.trackingNumber}</div>
              <a href="${carrierUrl}" class="btn-track" target="_blank" rel="noopener noreferrer">
                Track Package with ${carrier} →
              </a>
              <div style="margin-top: 10px;">
                <a href="${siteUrl}/orders/track?orderId=${data.orderId}" style="color: #8B4A34; font-size: 12px; text-decoration: underline;">
                  View Studio Order Timeline
                </a>
              </div>
            </div>

            <div style="background: #FAF8F5; border-radius: 8px; border: 1px solid #E8E4DC; padding: 16px; margin-bottom: 20px;">
              <strong>Delivery Address:</strong><br/>
              <span style="color: #57534E; font-size: 13px;">${data.shippingAddress || 'Address on record'}</span>
            </div>

            <h4 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #78716C; margin-bottom: 8px;">
              Artworks in Shipment:
            </h4>
            <ul style="padding-left: 20px; margin-top: 0;">
              ${itemsHtml}
            </ul>

            <div style="border-top: 1px solid #EFECE6; padding-top: 16px; margin-top: 24px; font-size: 13px; color: #78716C; line-height: 1.6;">
              <strong>Art Care & Unboxing Tip:</strong><br/>
              Please allow parcels with stretched canvas or framed art to acclimatize to room temperature before opening in cold or humid weather. Handle unframed prints by the border edges with clean, dry hands.
            </div>
          </div>
          <div class="footer">
            Elena Moore Art • Kingston, New York<br/>
            Need help? Reply to this email or visit <a href="${siteUrl}/contact" style="color: #4B280B;">our contact page</a>.
          </div>
        </div>
      </body>
    </html>
  `

  if (!transporter) {
    console.log('[Email System] SMTP not configured. Simulating shipping notification:', {
      to: data.customerEmail,
      trackingNumber: data.trackingNumber,
      carrier,
    })
    return { success: true, simulated: true }
  }

  try {
    await transporter.sendMail({
      from: `Elena Moore Art <${fromAddress}>`,
      to: data.customerEmail,
      subject: `Your Art Shipment is On Its Way (#${data.orderId.slice(-8).toUpperCase()}) — ${carrier} Tracking Inside`,
      html,
    })
    return { success: true }
  } catch (error) {
    console.error('[Email System] Failed to dispatch shipping notification:', error)
    return { success: false, error }
  }
}

export async function sendDeliveredNotificationEmail(data: {
  orderId: string
  customerName: string
  customerEmail: string
  items: Array<{ title: string }>
}) {
  const transporter = getTransporter()
  const fromAddress = process.env.SMTP_FROM || 'orders@elenamoore.art'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAF8F5; color: #24211D; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E8E4DC; border-radius: 12px; padding: 36px 30px;">
          <h1 style="font-family: Georgia, serif; font-size: 24px; color: #4B280B; margin-top: 0; text-align: center;">Your Artwork Has Arrived!</h1>
          <p style="color: #57534E; font-size: 14px; line-height: 1.6;">
            Dear ${data.customerName || 'Collector'},
          </p>
          <p style="color: #57534E; font-size: 14px; line-height: 1.6;">
            Courier records indicate that your artwork parcel (Order #${data.orderId.slice(-8).toUpperCase()}) has been delivered safely.
          </p>
          <p style="color: #57534E; font-size: 14px; line-height: 1.6;">
            I hope these pieces bring warmth and quiet beauty to your home for many years to come. If you share photos of the art in your space, feel free to tag <strong>@elenamoore.art</strong> on Instagram — I would love to see how you have styled it.
          </p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${siteUrl}/contact" style="display: inline-block; background: #4B280B; color: #FAF8F5; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px;">
              Share Feedback with Elena →
            </a>
          </div>
          <p style="color: #8C867A; font-size: 12px; text-align: center; margin-top: 24px;">
            Elena Moore Art • Kingston, New York
          </p>
        </div>
      </body>
    </html>
  `

  if (!transporter) {
    console.log('[Email System] Simulated delivery email to:', data.customerEmail)
    return { success: true, simulated: true }
  }

  try {
    await transporter.sendMail({
      from: `Elena Moore Art <${fromAddress}>`,
      to: data.customerEmail,
      subject: `Delivered: Your Elena Moore Artwork (Order #${data.orderId.slice(-8).toUpperCase()})`,
      html,
    })
    return { success: true }
  } catch (error) {
    console.error('[Email System] Delivery email failed:', error)
    return { success: false, error }
  }
}

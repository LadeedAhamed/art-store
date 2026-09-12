/**
 * ============================================================================
 * SHIPROCKET AUTOMATED FULFILLMENT & COURIER LOGISTICS ENGINE
 * ============================================================================
 * Handles automated shipment creation, courier allocation (BlueDart, Delhivery,
 * FedEx, DHL, DTDC), AWB tracking code generation, and real-time tracking.
 */

let cachedToken: string | null = null
let tokenExpiryTime = 0

const SHIPROCKET_API_BASE = 'https://apiv2.shiprocket.in/v1/external'

export async function getShiprocketToken(): Promise<string | null> {
  const email = process.env.SHIPROCKET_EMAIL
  const password = process.env.SHIPROCKET_PASSWORD

  if (!email || !password) {
    console.log('[Shiprocket] Missing SHIPROCKET_EMAIL or SHIPROCKET_PASSWORD credentials.')
    return null
  }

  // Use cached token if still valid (valid for 10 days, cache for 9 days)
  if (cachedToken && Date.now() < tokenExpiryTime) {
    return cachedToken
  }

  try {
    const res = await fetch(`${SHIPROCKET_API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (data.token) {
      cachedToken = data.token
      tokenExpiryTime = Date.now() + 9 * 24 * 60 * 60 * 1000 // 9 days
      return cachedToken
    } else {
      console.error('[Shiprocket Auth Error]:', data)
      return null
    }
  } catch (err) {
    console.error('[Shiprocket Auth Exception]:', err)
    return null
  }
}

interface ShiprocketOrderPayload {
  orderId: string
  orderDate: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  shippingAddress: {
    address?: string
    city?: string
    state?: string
    pincode?: string
    country?: string
  }
  items: Array<{
    title: string
    quantity: number
    price: number
    size?: string | null
  }>
  subtotal: number
  total: number
  pickupLocation?: string
  weightKg?: number
  lengthCm?: number
  breadthCm?: number
  heightCm?: number
}

export async function createShiprocketShipment(payload: ShiprocketOrderPayload) {
  const token = await getShiprocketToken()
  if (!token) {
    return {
      success: false,
      simulated: true,
      awbCode: `SR-${Date.now().toString().slice(-8)}`,
      courierName: 'Shiprocket Auto-Courier',
      message: 'Shiprocket credentials not provided. Operating in simulation mode.',
    }
  }

  try {
    const orderItems = payload.items.map((item, idx) => ({
      name: item.title,
      sku: `ART-${idx + 1}-${(item.size || 'STD').replace(/[^a-zA-Z0-9]/g, '')}`,
      units: item.quantity,
      selling_price: item.price,
      discount: 0,
      tax: 0,
      hsn: 9701, // Fine Art / Paintings HSN Code
    }))

    const nameParts = (payload.customerName || 'Art Collector').trim().split(' ')
    const firstName = nameParts[0] || 'Collector'
    const lastName = nameParts.slice(1).join(' ') || 'Client'

    const addr = payload.shippingAddress
    const body = {
      order_id: payload.orderId,
      order_date: new Date(payload.orderDate || Date.now()).toISOString().slice(0, 19).replace('T', ' '),
      pickup_location: payload.pickupLocation || process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary',
      channel_id: '',
      comment: 'Elena Moore Studio Fine Art Parcel - Handle with Extreme Care',
      billing_customer_name: firstName,
      billing_last_name: lastName,
      billing_address: addr.address || 'Studio Address',
      billing_address_2: '',
      billing_city: addr.city || 'New York',
      billing_pincode: addr.pincode || '10001',
      billing_state: addr.state || 'NY',
      billing_country: addr.country || 'USA',
      billing_email: payload.customerEmail,
      billing_phone: payload.customerPhone || '9999999999',
      shipping_is_billing: true,
      order_items: orderItems,
      payment_method: 'Prepaid',
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: payload.subtotal || payload.total,
      length: payload.lengthCm || 40,
      breadth: payload.breadthCm || 30,
      height: payload.heightCm || 10,
      weight: payload.weightKg || 1.5,
    }

    const res = await fetch(`${SHIPROCKET_API_BASE}/orders/create/adhoc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    const orderRes = await res.json()
    if (!orderRes.shipment_id && !orderRes.order_id) {
      console.error('[Shiprocket Order Creation Error]:', orderRes)
      return { success: false, error: orderRes }
    }

    const shipmentId = orderRes.shipment_id

    // 2. Auto-generate AWB & assign courier
    let awbCode = ''
    let courierName = 'Shiprocket Courier'
    if (shipmentId) {
      const awbRes = await assignAWB(shipmentId, token)
      if (awbRes.awbCode) {
        awbCode = awbRes.awbCode
        courierName = awbRes.courierName
      }
    }

    return {
      success: true,
      shiprocketOrderId: orderRes.order_id,
      shipmentId,
      awbCode: awbCode || `AWB-${orderRes.order_id}`,
      courierName,
      status: 'READY_TO_SHIP',
    }
  } catch (err) {
    console.error('[Shiprocket API Exception]:', err)
    return { success: false, error: err }
  }
}

export async function assignAWB(shipmentId: number | string, existingToken?: string) {
  const token = existingToken || (await getShiprocketToken())
  if (!token) return { success: false }

  try {
    const res = await fetch(`${SHIPROCKET_API_BASE}/courier/assign/awb`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ shipment_id: shipmentId }),
    })

    const data = await res.json()
    if (data.response?.data?.awb_code) {
      return {
        success: true,
        awbCode: data.response.data.awb_code,
        courierName: data.response.data.courier_name || 'Assigned Courier',
      }
    }
    return { success: false, data }
  } catch (err) {
    console.error('[Shiprocket AWB Assignment Error]:', err)
    return { success: false, error: err }
  }
}

export async function generateShippingLabel(shipmentId: number | string) {
  const token = await getShiprocketToken()
  if (!token) return null

  try {
    const res = await fetch(`${SHIPROCKET_API_BASE}/generate/label`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ shipment_id: [shipmentId] }),
    })

    const data = await res.json()
    return data.label_url || null
  } catch (err) {
    console.error('[Shiprocket Label Generation Error]:', err)
    return null
  }
}

export async function trackShiprocketAWB(awbCode: string) {
  const token = await getShiprocketToken()
  if (!token) return null

  try {
    const res = await fetch(`${SHIPROCKET_API_BASE}/courier/track/awb/${awbCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()
    return data.tracking_data || null
  } catch (err) {
    console.error('[Shiprocket Track AWB Error]:', err)
    return null
  }
}

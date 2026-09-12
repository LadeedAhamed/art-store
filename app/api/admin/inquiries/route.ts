import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAdminRequest } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized studio access' }, { status: 401 })
  }

  try {
    const inquiries = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ inquiries })
  } catch (error) {
    console.error('Admin GET inquiries error:', error)
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized studio access' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, read } = body

    if (!id) {
      return NextResponse.json({ error: 'Inquiry ID is required' }, { status: 400 })
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { read: Boolean(read) },
    })

    return NextResponse.json({ success: true, inquiry: updated })
  } catch (error) {
    console.error('Admin PATCH inquiry error:', error)
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 })
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
      return NextResponse.json({ error: 'Inquiry ID is required' }, { status: 400 })
    }

    await prisma.contactMessage.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin DELETE inquiry error:', error)
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 })
  }
}

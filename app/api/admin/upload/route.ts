import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { verifyAdminRequest } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized studio access' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Check if Cloudinary is configured
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (cloudName && apiKey && apiSecret) {
      // Direct Cloudinary upload via REST API
      const timestamp = Math.round(new Date().getTime() / 1000)
      const crypto = await import('crypto')
      const signatureString = `folder=elena-moore-art&timestamp=${timestamp}${apiSecret}`
      const signature = crypto.createHash('sha1').update(signatureString).digest('hex')

      const uploadForm = new FormData()
      uploadForm.append('file', new Blob([buffer], { type: file.type }), file.name)
      uploadForm.append('api_key', apiKey)
      uploadForm.append('timestamp', timestamp.toString())
      uploadForm.append('signature', signature)
      uploadForm.append('folder', 'elena-moore-art')

      const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: uploadForm,
      })

      const cloudData = await cloudRes.json()
      if (cloudData.secure_url) {
        return NextResponse.json({
          success: true,
          url: cloudData.secure_url,
          width: cloudData.width,
          height: cloudData.height,
        })
      }
    }

    // Local file storage fallback
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })
    const filePath = path.join(uploadsDir, filename)
    await writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 })
  }
}

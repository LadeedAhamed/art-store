import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      )
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Save to DB
    await prisma.contactMessage.create({
      data: { name, email, subject: subject ?? 'general', message },
    })

    // Send notification email (if SMTP configured)
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      try {
        const nodemailer = await import('nodemailer')
        const transporter = nodemailer.default.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT ?? '587'),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })

        await transporter.sendMail({
          from: `Elena Moore Art <${process.env.SMTP_FROM}>`,
          to: process.env.CONTACT_EMAIL ?? process.env.SMTP_USER,
          subject: `New contact: ${subject ?? 'general'} from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr/>
            <p>${message.replace(/\n/g, '<br/>')}</p>
          `,
        })

        // Auto-reply
        await transporter.sendMail({
          from: `Elena Moore Art <${process.env.SMTP_FROM}>`,
          to: email,
          subject: 'Thank you for reaching out — Elena Moore Art',
          html: `
            <p>Hi ${name},</p>
            <p>Thank you for getting in touch! I've received your message and will reply within 2–3 business days.</p>
            <p>In the meantime, feel free to browse the shop or follow along on Instagram.</p>
            <p>Warmly,<br/>Elena</p>
          `,
        })
      } catch (emailErr) {
        console.error('Email send error:', emailErr)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

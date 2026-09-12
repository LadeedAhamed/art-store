'use client'

import { useState } from 'react'

export default function ContactForm({ contactEmail }: { contactEmail?: string }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: 'general', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'var(--color-linen)', borderRadius: 'var(--radius-md)' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-terracotta)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.25rem' }}>
          ✓
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message Received!</h3>
        <p style={{ color: 'var(--color-ink-muted)', marginBottom: '1.5rem' }}>
          Thank you for reaching out. I'll be in touch within 2–3 business days.
        </p>
        <button className="btn btn--secondary" onClick={() => setStatus('idle')}>
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label htmlFor="contact-name" className="form-label">Name *</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            className="input"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-email" className="form-label">Email *</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            className="input"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contact-subject" className="form-label">Subject</label>
        <select
          id="contact-subject"
          name="subject"
          className="input"
          value={form.subject}
          onChange={handleChange}
        >
          <option value="general">General Question</option>
          <option value="commission">Commission Inquiry</option>
          <option value="shipping">Shipping & Returns</option>
          <option value="wholesale">Wholesale</option>
          <option value="press">Press & Media</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="contact-message" className="form-label">Message *</label>
        <textarea
          id="contact-message"
          name="message"
          className="input textarea"
          placeholder="Tell me about your project, question, or commission idea..."
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
        />
      </div>

      {status === 'error' && (
        <p style={{ color: '#d32f2f', fontSize: '0.875rem' }}>
          Something went wrong. Please try emailing directly at {contactEmail || 'hello@elenamoore.art'}
        </p>
      )}

      <button
        type="submit"
        className="btn btn--primary btn--full btn--lg"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

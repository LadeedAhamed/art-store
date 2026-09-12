'use client'

import { useState } from 'react'
import { toast } from './Toaster'

interface NewsletterFormProps {
  className?: string
  inputClassName?: string
  buttonClassName?: string
  buttonText?: string
  placeholder?: string
}

export default function NewsletterForm({
  className,
  inputClassName,
  buttonClassName,
  buttonText = 'Subscribe',
  placeholder = 'your@email.com',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.')
      return
    }
    setSubscribed(true)
    toast.success('Thank you for subscribing to studio updates!')
  }

  if (subscribed) {
    return (
      <p style={{ color: 'var(--color-terracotta)', fontWeight: 500, fontSize: '0.9375rem', padding: '0.5rem 0' }}>
        ✓ You’re on the list! Thank you.
      </p>
    )
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className={inputClassName}
        aria-label="Email address for newsletter"
        required
      />
      <button type="submit" className={buttonClassName}>
        {buttonText}
      </button>
    </form>
  )
}

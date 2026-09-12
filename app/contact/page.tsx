import { prisma } from '@/lib/db'
import ContactForm from '@/components/contact/ContactForm'
import styles from './page.module.css'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact & Commissions — Elena Moore',
  description: 'Inquire about original oil paintings, prints, or custom commissions.',
}

async function getContactSettings() {
  try {
    return await prisma.siteSetting.findUnique({ where: { id: 'default' } })
  } catch {
    return null
  }
}

export default async function ContactPage() {
  const settings = await getContactSettings()

  const contactEmail = settings?.contactEmail || 'hello@elenamoore.art'
  const studioHours =
    settings?.studioHours || 'Monday–Friday, 9am–5pm EST • Replies within 2–3 business days'
  const studioLocation = settings?.studioLocation || 'Kingston, New York'
  const commissionNotice =
    settings?.commissionNotice ||
    "I take on a limited number of commissions each year. If you'd like a custom painting — a favourite meal, a special occasion — please reach out with details and I'll let you know if I have availability."
  const wholesaleNotice =
    settings?.wholesaleNotice ||
    'I partner with select shops and galleries for print wholesale. Minimum order applies. Please contact for a wholesale catalog.'
  const instagramUrl = settings?.instagramUrl || 'https://instagram.com'
  const pinterestUrl = settings?.pinterestUrl || 'https://pinterest.com'

  const studioPhone = settings?.studioPhone || '+1 (845) 555-0192'
  const studioAddress = settings?.studioAddress || '42 Atelier Way, Studio 3B, Kingston, NY 12401'

  return (
    <>
      <div className={styles.pageHero}>
        <div className="container">
          <p className="label">Get in Touch</p>
          <h1>Contact</h1>
          <p>Commission an oil painting, inquire about gallery shipping, or just say hello.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {/* Interactive Form */}
            <div className={styles.formWrap}>
              <h2>Send a Message</h2>
              <ContactForm contactEmail={contactEmail} />
            </div>

            {/* Dynamic Info Panel */}
            <div className={styles.info}>
              <div className={styles.infoCard}>
                <h3>Studio Hours & Location</h3>
                <p>
                  {studioHours}
                  <br />
                  <strong>Address:</strong> {studioAddress}
                </p>
              </div>

              <div className={styles.infoCard}>
                <h3>Direct Inquiries & Phone</h3>
                <p style={{ margin: 0 }}>
                  <a href={`mailto:${contactEmail}`} className={styles.infoLink} style={{ display: 'block', marginBottom: '0.25rem' }}>
                    {contactEmail}
                  </a>
                  <a href={`tel:${studioPhone.replace(/\s+/g, '')}`} className={styles.infoLink}>
                    {studioPhone}
                  </a>
                </p>
              </div>

              <div className={styles.infoCard}>
                <h3>Commissions</h3>
                <p>{commissionNotice}</p>
              </div>

              <div className={styles.infoCard}>
                <h3>Wholesale</h3>
                <p>{wholesaleNotice}</p>
              </div>

              <div className={styles.infoCard}>
                <h3>Follow Along</h3>
                <div className={styles.socials}>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                  >
                    Instagram
                  </a>
                  <a
                    href={pinterestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                  >
                    Pinterest
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

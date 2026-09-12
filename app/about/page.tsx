import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import styles from './page.module.css'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About Elena Moore — Oil Painter',
  description: 'Elena Moore is an oil painter working from her home studio, captivated by the quiet poetry of everyday domestic life.',
}

async function getAboutSettings() {
  try {
    return await prisma.siteSetting.findUnique({ where: { id: 'default' } })
  } catch {
    return null
  }
}

export default async function AboutPage() {
  const settings = await getAboutSettings()

  const heroImage = settings?.heroImage || '/hero.jpg'
  const tagline =
    settings?.aboutTagline ||
    'I paint the interplay of light, atmosphere, and form — quiet moments captured on linen.'
  const bio =
    settings?.aboutBio ||
    "I am an oil painter working from my studio, exploring the meditative beauty of natural light, textured brushwork, and timeless compositions. Every original piece is rendered on fine Belgian linen with museum-grade pigments."
  const studioLocation = settings?.studioLocation || 'Kingston, New York'
  const exhibitions =
    settings?.exhibitions || 'Hudson Valley Art Fair 2024 • Contemporary Oil Salon 2024 • Catskill Atelier Gallery 2023'
  const press = settings?.press || 'Architectural Digest, Elle Decor, Studio International'

  return (
    <>
      {/* ── Hero ────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <Image
            src={heroImage}
            alt="Elena Moore in her studio"
            fill
            priority
            style={{ objectFit: 'cover' }}
            sizes="45vw"
          />
        </div>
        <div className={styles.heroContent}>
          <p className="label">About the Artist</p>
          <h1>Elena Moore</h1>
          <div className={styles.divider} />
          <p className={styles.heroTagline}>"{tagline}"</p>
        </div>
      </section>

      {/* ── Bio ─────────────────────────────────── */}
      <section className={`section ${styles.bio}`}>
        <div className="container container--narrow">
          <div className={styles.bioGrid}>
            <div className={styles.bioText}>
              <h2>The Atelier</h2>
              <p style={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>{bio}</p>
              <p>
                Each painting begins with intentional observation — natural light shifting across a space, architectural contours,
                and atmospheric harmony. Working in traditional oil techniques, I layer glazes and sculptural brushstrokes to create
                pieces that bring quiet contemplation and warmth to interior spaces.
              </p>
              <p>
                Archival prints are captured at ultra-high optical resolution from the original canvases and printed on 310gsm
                museum-grade cotton rag paper to preserve every nuance of pigment and linen texture.
              </p>
            </div>
            <div className={styles.bioSidebar}>
              <div className={styles.bioCard}>
                <h3>Studio</h3>
                <p>{studioLocation}</p>
              </div>
              <div className={styles.bioCard}>
                <h3>Medium</h3>
                <p>Oil on Belgian linen & cradled wood panel</p>
              </div>
              <div className={styles.bioCard}>
                <h3>Represented</h3>
                <p>Independent studio — all works sold directly</p>
              </div>
              <div className={styles.bioCard}>
                <h3>Exhibitions</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{exhibitions.replace(/•/g, '\n')}</p>
              </div>
              <div className={styles.bioCard}>
                <h3>Press & Features</h3>
                <p>{press}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ─────────────────────────────── */}
      <section className={`section ${styles.process}`}>
        <div className="container">
          <h2 className="text-center">The Atelier Process</h2>
          <div className={styles.processGrid}>
            {[
              {
                step: '01',
                title: 'Study & Composition',
                desc: 'Observing natural light and atmospheric depth. Initial charcoal sketches explore spatial balance, geometry, and evocative stillness.',
              },
              {
                step: '02',
                title: 'Layered Oil Technique',
                desc: 'Working with fine artist pigments on Belgian linen, building luminous glazes, rich impasto textures, and quiet tonal nuance.',
              },
              {
                step: '03',
                title: 'Curing & Varnish',
                desc: 'After curing in the studio, each original is sealed with archival dammar or gamvar varnish to protect the surface for generations.',
              },
              {
                step: '04',
                title: 'Museum Printing & Crating',
                desc: 'Prints are produced on 310gsm cotton rag with 100+ year pigment inks, hand-signed, and packaged in protective archival crating.',
              },
            ].map((step) => (
              <div key={step.step} className={styles.processStep}>
                <span className={styles.stepNum}>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className={styles.cta}>
        <div className="container text-center">
          <h2>Ready to Bring a Piece Home?</h2>
          <p>Browse original paintings and fine art prints in the shop.</p>
          <div className={styles.ctaButtons}>
            <Link href="/shop" className="btn btn--primary btn--lg">
              Shop Now
            </Link>
            <Link href="/contact" className="btn btn--ghost btn--lg">
              Commission a Painting
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
